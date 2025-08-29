class DownloadManager {
    constructor() {
        this.downloadInterval = null;
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.addEventListener('click', () => {
                this.startDownload();
            });
        }
    }
    
    async startDownload() {
        if (window.modalManager) {
            window.modalManager.show('download-modal');
        }
        
        // Начинаем симуляцию загрузки (замените на реальную загрузку, когда будете готовы)
        this.simulateDownload();
    }
    
    simulateDownload() {
        let progress = 0;
        
        if (this.downloadInterval) {
            clearInterval(this.downloadInterval);
        }
        
        this.downloadInterval = setInterval(() => {
            progress += 5;
            
            if (progress <= 30) {
                this.updateProgress(progress, "Загрузка модов...");
            } else if (progress <= 60) {
                this.updateProgress(progress, "Загрузка ресурс-паков...");
            } else if (progress <= 90) {
                this.updateProgress(progress, "Загрузка конфигов...");
            } else {
                this.updateProgress(progress, "Завершение установки...");
            }
            
            if (progress >= 100) {
                clearInterval(this.downloadInterval);
                setTimeout(() => {
                    if (window.modalManager) {
                        window.modalManager.hide('download-modal');
                        window.modalManager.show('success-modal');
                    }
                }, 500);
            }
        }, 200);
    }
    
    updateProgress(progress, status) {
        const progressBar = document.getElementById('download-progress');
        const statusText = document.getElementById('status-text');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (statusText && status) {
            statusText.textContent = status;
        }
    }
    
    cancelDownload() {
        if (this.downloadInterval) {
            clearInterval(this.downloadInterval);
            this.downloadInterval = null;
        }
    }
}

window.DownloadManager = DownloadManager;