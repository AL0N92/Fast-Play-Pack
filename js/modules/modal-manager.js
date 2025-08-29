// Менеджер модальных окон
class ModalManager {
    constructor() {
        this.modals = {};
    }
    
    init() {
        this.setupModalHandlers();
    }
    
    // Показать модальное окно
    show(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            this.modals[modalId] = modal;
        }
    }
    
    // Скрыть модальное окно
    hide(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // Настроить обработчики для модальных окон
    setupModalHandlers() {
        // Обработчик для кнопки отмены загрузки
        const cancelBtn = document.getElementById('cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.hide('download-modal');
                if (window.downloadManager) {
                    window.downloadManager.cancelDownload();
                }
            });
        }
        
        // Обработчик для кнопки закрытия Java модального окна
        const closeJavaBtn = document.getElementById('close-java-btn');
        if (closeJavaBtn) {
            closeJavaBtn.addEventListener('click', () => {
                this.hide('java-modal');
            });
        }
        
        // Обработчик для кнопки закрытия успешной установки
        const closeSuccessBtn = document.getElementById('close-success-btn');
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                this.hide('success-modal');
            });
        }
    }
}

// Создаем глобальный экземпляр менеджера модальных окон
window.ModalManager = ModalManager;