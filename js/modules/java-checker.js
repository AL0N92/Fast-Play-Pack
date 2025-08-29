// Менеджер проверки Java
class JavaChecker {
    constructor() {
        // Не инициализируем сразу, ждем вызова init
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const javaBtn = document.getElementById('java-btn');
        if (javaBtn) {
            javaBtn.addEventListener('click', () => {
                this.checkJava();
            });
        }
    }
    
    async checkJava() {
        if (window.modalManager) {
            window.modalManager.show('java-modal');
        }
        
        const javaInfo = document.getElementById('java-info');
        
        if (window.electronAPI) {
            try {
                const javaVersion = await window.electronAPI.checkJavaVersion();
                if (javaInfo) {
                    javaInfo.textContent = javaVersion;
                }
            } catch (error) {
                if (javaInfo) {
                    javaInfo.textContent = 'Java не установлена или не настроена правильно!';
                }
                console.error('Java check error:', error);
            }
        } else {
            // Для тестирования в браузере
            setTimeout(() => {
                if (javaInfo) {
                    javaInfo.textContent = 'Java version 1.8.0_301 (тестовый режим)';
                }
            }, 1000);
        }
    }
}

// Создаем глобальный экземпляр менеджера проверки Java
window.JavaChecker = JavaChecker;