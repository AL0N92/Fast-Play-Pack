// Основной файл, который инициализирует все модули после загрузки DOM



// Обработчик глобальных ошибок
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Обработчик необработанных обещаний
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

console.log('Renderer script started'); // Это должно появиться первым

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing modules');
    
    try {

        // Создаем экземпляры всех модулей
        window.modalManager = new ModalManager();
        window.windowManager = new WindowManager();
        window.javaChecker = new JavaChecker();
        window.folderSelector = new FolderSelector();
        window.downloadManager = new DownloadManager();
        
        // Инициализируем все модули
        window.modalManager.init();
        window.windowManager.init();
        window.javaChecker.init();
        window.folderSelector.init();
        window.downloadManager.init();

    } catch (error) {
        console.error('Error during initialization:', error);
    }
});