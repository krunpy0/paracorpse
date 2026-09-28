# ТЕХНИЧЕСКИЙ БРИФ И АРХИТЕКТУРНЫЙ ПЛАН
## Git-Based CMS для сайта группы PARACORPSE (Без бэкенда и без сторонних баз данных)

---

### 1. Ответ на ключевые вопросы

#### 1.1. Получится ли сделать админку Git-based без базы данных?
**Да, на 100%.**
Сайт группы компилируется как статический SPA (Vite + React + GitHub Pages).
Все данные сайта (новости, тексты, состав группы, условия набора) хранятся в виде структурированного файла `src/data/siteContent.json` прямо в репозитории GitHub.
Админка работает прямо в браузере (клиентский SPA на роуте `/admin`), взаимодействует напрямую с **GitHub REST API** и делает коммит в ветку `main`.
После коммита уже настроенный GitHub Actions (`.github/workflows/deploy.yml`) автоматически за 30–50 секунд пересобирает проект и выкатывает свежую версию на GitHub Pages (или Vercel).

#### 1.2. Получится ли загружать фотографии БЕЗ бэкенда?
**Да, абсолютно надёжно.**
В Git-based архитектуре для загрузки фото **не нужен ни сервер, ни платная база данных, ни S3-хранилище**:
1. **Выбор фото в админке:** Пользователь выбирает изображение с компьютера (или перетаскивает Drag & Drop).
2. **Клиентская оптимизация (Client-side Canvas/WebP):** Браузер перед загрузкой автоматически уменьшает гигантские фото (например, 10–20 МБ с телефона) до оптимального веб-размера (~1600px, 85% качество, 150–350 КБ), чтобы не засорять Git-историю.
3. **Прямой коммит через GitHub API:** Браузер кодирует файл в Base64 и отправляет вызов `PUT /repos/krunpy0/paracorpse/contents/public/uploads/{filename}` в GitHub API с токеном авторизации.
4. **Хранение в Git:** Фотография сохраняется как бинарный файл в репозитории по пути `public/uploads/`.
5. **Публикация:** При сборке Vite всё содержимое папки `public/` автоматически попадает в корень раздачи `dist/`. Сайт обращается к фото по статическому URL (например, `/paracorpse/uploads/band-new.jpg`).
6. **Никаких внешних серверов:** Все медиафайлы навсегда принадлежат вашему репозиторию, не могут пропасть и не требуют оплаты.

---

### 2. Сравнение подходов к Git-CMS

| Критерий | Decap CMS | TinaCMS | **Собственная React Git-CMS в /admin (Рекомендуется)** | Sveltia CMS |
| :--- | :--- | :--- | :--- | :--- |
| **Бэкенд / Сервер** | Нужен OAuth-прокси для GitHub | Нужен Tina Cloud или сервер | **НЕ нужен** (0 серверов) | **НЕ нужен** (поддерживает токен) |
| **Сторонние регистрации** | Нужен Netlify или OAuth Vercel | Нужна регистрация в Tina Cloud | **НЕ нужны** (только ваш GitHub) | **НЕ нужны** |
| **Загрузка фото** | Да (через Git) | Да (через Git / Cloud) | **Да (напрямую в Git + авто-сжатие)** | Да (через Git) |
| **Кастомизация под рок-группу** | Стандартный унылый серый UI | Сложная интеграция форм | **Фирменный дизайн Paracorpse, предпросмотр** | Стандартный Decap-интерфейс |
| **Скрытие/удаление секций** | Сложно настроить | Средне | **В 1 клик (чекбокс / свитчер)** | Сложно |

**Решение:**
Мы делаем **нативную, легковесную и удобную панель `/admin` прямо на React 19** внутри проекта, а также добавляем конфиг `public/admin/` для Sveltia/Decap CMS в качестве дополнительной опции.

---

### 3. Функциональные требования к админке

1. **Авторизация владельца (GitHub Personal Access Token):**
   - Владелец вводит свой GitHub Personal Access Token (PAT) с правами на репозиторий `repo` (создаётся на GitHub за 30 секунд по прямой ссылке-инструкции).
   - Токен безопасно сохраняется в `localStorage` браузера владельца (никому не передаётся, бэкенда нет).
   - Кнопка "Выйти" очищает токен. Проверка подключения к репозиторию `krunpy0/paracorpse` в реальном времени.

2. **Новости (News Management):**
   - Просмотр списка существующих новостей.
   - Добавление новой новости (заголовок, дата, текст, загрузка обложки/фото).
   - Редактирование и удаление новостей.
   - Предпросмотр карточки новости в реальном времени.

3. **Секция Join Us (Условия набора в группу):**
   - **Главный переключатель видимости:** `[x] Отображать секцию Join Us на сайте` (если выключено — секция и ссылки на неё в шапке/подвале полностью скрываются).
   - Редактирование заголовка ("JOIN A BAND"), подзаголовка, контактного email для заявок.
   - Управление карточками вакансий (Гитарист, Вокалист, Бас и т.д.):
     - Добавление новой роли / Удаление роли.
     - Название роли, подзаголовок.
     - Описание звука и стиля (Sound & Style).
     - Список требований (Requirements) — добавление/удаление пунктов.
     - Шаблон темы и текста письма для отправки заявки.

4. **Состав группы и манифест (Band Members & About Us):**
   - Редактирование текста манифеста (заголовок, лид-текст, абзацы описания группы).
   - Управление участниками группы:
     - Добавление нового участника / Удаление.
     - Имя, роль (Drums, Keys, Guitar, etc.).
     - Биография / Описание.
     - Загрузка и замена фото участника с предпросмотром.

5. **Общие тексты и подвал (Hero & Footer):**
   - Текст логотипа / Hero.
   - Официальные ссылки (TikTok, Instagram, VK, YouTube) — редактирование URL и названий.
   - Контактный email, город, страна.
   - Копирайт в подвале.

6. **Публикация и отслеживание статуса (Publish & Deploy):**
   - Индикатор несохранённых изменений.
   - Кнопка "Опубликовать изменения на сайт" (Commit to GitHub):
     - Загружает новые фото в `public/uploads/`.
     - Записывает обновлённый `src/data/siteContent.json`.
     - Делает единый коммит с понятным описанием в ветку `main`.
     - Показывает прогресс сборки GitHub Actions и статус деплоя.

---

### 4. Структура хранения данных (`src/data/siteContent.json`)

```json
{
  "hero": {
    "title": "PARACORPSE",
    "scrollCue": "SCROLL"
  },
  "joinUs": {
    "enabled": true,
    "title": "JOIN A BAND",
    "subtitle": "Auditioning rhythm/lead guitarist and vocalist for upcoming live shows and studio sessions. Miass, Russia · Age 15+.",
    "contactEmail": "paracorpse0@gmail.com",
    "cards": [
      {
        "id": "guitarist",
        "title": "GUITARIST",
        "subtitle": "RHYTHM & LEAD GUITAR",
        "soundStyle": "Dense industrial sound, low drop tunings (Drop A / Drop B), tight synchronization with rhythm section, textural feedback, and heavy groove.",
        "requirements": [
          "Age 15+ · Based in Miass or surrounding area",
          "Own stage instrument and rehearsal gear",
          "Accurate playing with a metronome and tight timing",
          "Readiness for regular weekly rehearsals and gigs"
        ],
        "buttonText": "APPLY FOR GUITARIST"
      },
      {
        "id": "vocalist",
        "title": "VOCALIST",
        "subtitle": "FRONTMAN / VOCALS",
        "soundStyle": "Aggressive vocal drive, extreme techniques (harsh, growl, scream) and/or solid clean vocals. High stage energy, charisma, and dynamic control.",
        "requirements": [
          "Age 15+ · Based in Miass or surrounding area",
          "Vocal control, breath support, and endurance",
          "Dedication to band concepts, lyrics, and rehearsal cycles",
          "Reliability, stage confidence, and discipline"
        ],
        "buttonText": "APPLY FOR VOCALIST"
      }
    ]
  },
  "about": {
    "title": "ABOUT US",
    "lead": "PARACORPSE — MODERN METAL AND NU-METAL FROM MIASS, RUSSIA.",
    "paragraphs": [
      "Paracorpse is a modern metal and nu-metal band from Russia, formed in September 2026 by Igor and Pavel. The project is built around heavy riffs, groovy rhythms, and dynamic songwriting.",
      "The band focuses on individuality and honest self-expression. The music explores themes of mental health, inner struggles, difficult emotions, and the process of finding a way through them.",
      "Based in Miass, Russia. Currently working on new material and looking for musicians to join the project for future releases and live shows."
    ],
    "membersTitle": "MEMBERS",
    "members": [
      {
        "id": "m1",
        "name": "Igor Zaytsev",
        "role": "Drums",
        "photo": "/uploads/Igor.jpg",
        "description": "Igor is the drummer and one of the songwriters of Paracorpse, bringing a dynamic and energetic approach to the band's modern metal sound..."
      },
      {
        "id": "m2",
        "name": "Pavel Enenko",
        "role": "Keys",
        "photo": "/uploads/Pavel.jpg",
        "description": "Pavel brings a strong classical piano background to Paracorpse, combining years of academic training..."
      }
    ]
  },
  "news": [
    {
      "id": "n1",
      "headline": "NEW CHAPTER BEGINS",
      "previewImage": "/uploads/photo_2026-09-21_00-06-13.jpg",
      "content": "After being kicked out of our previous band, Igor and Pasha decided it was time to start something of their own..."
    }
  ],
  "footer": {
    "wordmark": "PARACORPSE",
    "recruitmentTitle": "RECRUITMENT",
    "contactEmail": "paracorpse0@gmail.com",
    "locationCity": "MIASS, SOUTH URAL",
    "locationCountry": "RUSSIAN FEDERATION",
    "copyright": "PARACORPSE. ALL RIGHTS RESERVED.",
    "socialLinks": [
      { "id": "tiktok", "label": "TIK TOK", "url": "https://tiktok.com/@paracorpse" },
      { "id": "instagram", "label": "INSTAGRAM", "url": "https://instagram.com/paracorpseband" },
      { "id": "vk", "label": "VK", "url": "https://vk.ru/paracorpse" }
    ]
  }
}
```

---

### 5. План реализации

1. **Создание файла брифа (выполнено: `BRIEF.MD`).**
2. **Медиа-ассеты и схема данных:**
   - Скопировать текущие изображения (`Igor.jpg`, `Pavel.jpg`, `photo_2026-09-21_00-06-13.jpg`) в `public/uploads/`.
   - Создать `src/data/siteContent.json` с полным набором данных сайта.
   - Добавить хелпер `getImageUrl()` для корректного разрешения путей как локально, так и на `github.io/paracorpse/`.
3. **Модернизация существующих компонентов:**
   - Перевести `HeroPortal.tsx`, `NewsSection.tsx`, `JoinBandSection.tsx`, `BandSection.tsx`, `Header.tsx`, `Footer.tsx` на получение данных из `siteContent.json`.
   - Сделать условие: если `siteContent.joinUs.enabled === false`, секция Join Us скрывается, а ссылки на неё в Header и Footer исчезают.
4. **Сервис взаимодействия с GitHub REST API (`src/admin/services/github.ts`):**
   - Проверка токена и прав доступа к репозиторию.
   - Загрузка бинарных изображений через GitHub Git Blobs API / Contents API.
   - Коммит изменений `siteContent.json` и фото в ветку `main`.
   - Проверка статуса запуска GitHub Actions (`/actions/runs`).
5. **Интерфейс админки (`src/admin/`):**
   - Экран входа с инструкцией по токену GitHub.
   - Табы управления: Новости (с загрузкой фото), Join Us (со свитчером видимости и карточками), Состав и О группе (с загрузкой фото участников), Общие настройки и Контакты.
   - Модальные окна добавления/редактирования с живым превью.
   - Плавающая панель публикации: кнопка "Опубликовать изменения", статус коммита и деплоя.
6. **Маршрутизация (Routing):**
   - Настройка `HashRouter` / `BrowserRouter` с поддержкой `/admin` (и `/#/admin`).
   - Добавление незаметной кнопки входа в админку в футере сайта для удобного перехода.
7. **Тестирование и проверка сборки:**
   - Проверка сборки `npm run build`.
   - Проверка работы всех форм и отображения сайта при скрытом/показанном Join Us.
