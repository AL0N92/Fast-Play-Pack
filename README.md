https://img.shields.io/badge/Fast_Play_Pack-Launcher-brightgreen
https://img.shields.io/badge/Built_with-Electron-47848F?logo=electron
https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript
https://img.shields.io/badge/License-MIT-blue

<img src="https://i.imgur.com/5X5w2fE.png" alt="Fast Play Pack Launcher" width="100%"/>
Быстрый и удобный лаунчер для Minecraft, который позволяет автоматически загружать и устанавливать моды напрямую из Яндекс.Диска в ваш клиент игры. Независим от используемого вами основного лаунчера Minecraft.

✨ Особенности
🚀 Мгновенная установка модов - Загружайте моды напрямую с Яндекс.Диска

🎯 Универсальность - Работает с любым лаунчером Minecraft

📦 Автоматическое обновление - Всегда получайте самые свежие версии модов

🎨 Простой интерфейс - Интуитивно понятное управление

⚡ Легковесный - Написан на Electron, не нагружает систему

🛠 Установка
Для пользователей:
Скачайте последнюю версию лаунчера из релизов

Запустите установочный файл

Следуйте инструкциям установщика

Запустите Fast Play Pack

Для разработчиков:
bash
# Клонируйте репозиторий
git clone https://github.com/yourusername/fast-play-pack.git

# Перейдите в директорию проекта
cd fast-play-pack

# Установите зависимости
npm install

# Запустите в режиме разработки
npm start

# Соберите приложение
npm run build
📖 Как использовать
Запустите Fast Play Pack

Выбете версию Minecraft - укажите, для какой версии игры нужны моды

Настройте пути - укажите расположение папки с модами Minecraft

Синхронизируйте - нажмите кнопку синхронизации для загрузки модов

Запустите игру - используйте свой основной лаунчер для игры

🏗 Архитектура
Fast Play Pack построен на:

Electron - кроссплатформенная desktop-платформа

JavaScript (ES6+) - современный JavaScript

Yandex Disk API - для доступа к коллекции модов

🚀 Технологии
Electron

JavaScript (ES6+)

Node.js

Yandex Disk API

HTML5/CSS3

📁 Структура проекта
text
fast-play-pack/
├── src/
│   ├── main.js          # Главный процесс Electron
│   ├── preload.js       # Preload скрипт
│   └── renderer.js      # Рендерер процесс
├── ui/
│   ├── index.html       # Главный интерфейс
│   ├── styles.css       # Стили приложения
│   └── assets/          # Изображения и иконки
├── package.json
└── README.md
🔧 Настройка
Перед использованием необходимо настроить доступ к Яндекс.Диску:

Получите OAuth-токен для Яндекс.Диска API

Настройте пути к папкам с модами на диске

Укажите путь к директории Minecraft на вашем компьютере

🤝 Участие в разработке
Мы приветствуем вклад в развитие Fast Play Pack!

Форкните репозиторий

Создайте ветку для вашей функции (git checkout -b feature/AmazingFeature)

Закоммитьте изменения (git commit -m 'Add some AmazingFeature')

Запушьте в ветку (git push origin feature/AmazingFeature)

Откройте Pull Request

📝 Лицензия
Этот проект распространяется под лицензией MIT. Подробнее см. в файле LICENSE.

🐛 Сообщение об ошибках
Нашли ошибку? Сообщите о ней, и мы постараемся исправить её как можно скорее.

📞 Поддержка
Если у вас есть вопросы или предложения, создайте issue в репозитории или напишите нам на email: support@fastplaypack.com

Fast Play Pack - Быстрее играй, больше наслаждайся! 🎮