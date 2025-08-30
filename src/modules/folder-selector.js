// Менеджер выбора папки
class FolderSelector {
    constructor() {
        this.installPath = '';
        // Не инициализируем сразу, ждем вызова init
    }
    
    init() {
        this.setupEventListeners();
        this.loadSavedPath();
    }
    
    setupEventListeners() {
        const folderBtn = document.getElementById('folder-btn');
        if (folderBtn) {
            folderBtn.addEventListener('click', () => {
                this.selectFolder();
            });
        }
    }
    
    async selectFolder() {
        if (window.electronAPI) {
            try {
                const selectedPath = await window.electronAPI.selectFolder();
                if (selectedPath) {
                    this.savePath(selectedPath);
                    this.updateInstallPathDisplay(selectedPath);
                    console.log('Selected folder:', selectedPath);
                }
            } catch (error) {
                console.error('Error selecting folder:', error);
            }
        } else {
            // Для тестирования в браузере
            const testPath = prompt('Введите путь для установки:');
            if (testPath) {
                this.savePath(testPath);
                this.updateInstallPathDisplay(testPath);
            }
        }
    }
    
    savePath(path) {
        this.installPath = path;
        // Сохраняем в localStorage для примера
        localStorage.setItem('installPath', path);
    }
    
    loadSavedPath() {
        const savedPath = localStorage.getItem('installPath');
        if (savedPath) {
            this.installPath = savedPath;
            this.updateInstallPathDisplay(savedPath);
        }
    }
    
    updateInstallPathDisplay(path) {
        const installPathElement = document.getElementById('install-path');
        if (installPathElement) {
            installPathElement.textContent = path;
        }
    }
    
    getInstallPath() {
        return this.installPath;
    }
}

// Создаем глобальный экземпляр менеджера выбора папки
window.FolderSelector = FolderSelector;