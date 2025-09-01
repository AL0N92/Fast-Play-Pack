const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
    console.log('Creating main window');
    
    mainWindow = new BrowserWindow({
        width: 450,
        height: 300,
        resizable: false,
        frame: false, 
        webPreferences: {
            sandbox: false,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('src/index.html');
    // mainWindow.webContents.openDevTools();
}

// Функции для настроек
function getSettingsPath() {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'settings.json');
}

ipcMain.handle('get-settings', () => {
  try {
    const settingsPath = getSettingsPath();
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading settings:', error);
  }
  return { installPath: '' };
});

ipcMain.handle('save-settings', (event, settings) => {
  try {
    const settingsPath = getSettingsPath();
    fs.writeFileSync(settingsPath, JSON.stringify(settings), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
});

// Обработчик для скачивания файлов
ipcMain.handle('download-files', async (event, fileUrls) => {
  try {
    // Получаем настройки
    const settings = await event.sender.invoke('get-settings');
    const installPath = settings.installPath;
    
    // Проверяем, установлен ли путь
    if (!installPath) {
      throw new Error('Путь установки не указан. Пожалуйста, выберите папку для установки через настройки.');
    }

    // Создаем папку если ее нет
    if (!fs.existsSync(installPath)) {
      fs.mkdirSync(installPath, { recursive: true });
    }

    // Скачиваем каждый файл
    for (const fileUrl of fileUrls) {
      await downloadFile(fileUrl, installPath);
    }

    return { success: true };
  } catch (error) {
    console.error('Download error:', error);
    return { success: false, error: error.message };
  }
});

// Функция для скачивания файла
function downloadFile(url, downloadPath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(new URL(url).pathname);
    const filePath = path.join(downloadPath, fileName);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Ошибка загрузки: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Удаляем частично скачанный файл
      reject(err);
    });
  });
}

// Обработчик для выбора папки
ipcMain.handle('select-folder', async () => {
    console.log('IPC: select-folder called');
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    
    if (!result.canceled) {
        return result.filePaths[0];
    }
    return null;
});

// Обработчик для проверки версии Java
ipcMain.handle('check-java-version', () => {
    return new Promise((resolve, reject) => {
        exec('java -version', (error, stdout, stderr) => {
            if (error) {
                // Пробуем альтернативный способ проверки
                exec('where java', (error2, stdout2, stderr2) => {
                    if (!error2) {
                        resolve(`Java найдена по пути: ${stdout2}`);
                    } else {
                        reject(new Error('Java не найдена в системе'));
                    }
                });
            } else {
                resolve(stderr || stdout);
            }
        });
    });
});

// Обработчики для управления окном
ipcMain.on('minimize-window', () => {
    console.log('IPC: minimize-window called');
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on('close-window', () => {
    console.log('IPC: close-window called');
    if (mainWindow) {
        mainWindow.close();
    }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});