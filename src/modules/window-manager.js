// Менеджер управления окном
class WindowManager {
    constructor() {
        // Не назначаем обработчики сразу, ждем инициализации через init
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Обработчики для кнопок управления окном
        const minimizeBtn = document.getElementById('minimize-btn');
        const closeBtn = document.getElementById('close-btn');
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                if (window.electronAPI) {
                    window.electronAPI.minimizeWindow();
                } else {
                    console.log('Minimize button clicked (test mode)');
                }
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (window.electronAPI) {
                    window.electronAPI.closeWindow();
                } else {
                    console.log('Close button clicked (test mode)');
                }
            });
        }
    }
}

// Создаем глобальный экземпляр менеджера окон
window.WindowManager = WindowManager;