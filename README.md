# Mini Trello

Простой клон Trello, сделанный в рамках производственной практики.
Можно зарегистрироваться, создать доски, добавить на доску списки (колонки) и карточки,
перетаскивать карточки между списками мышкой и редактировать описание карточки.
Все данные хранятся в Supabase, и каждый пользователь видит только свои доски.

**Деплой:** https://mini-trello-theta.vercel.app/

**Тестовый аккаунт:** `test@mail.ru` / `test12`

## Стек

- **Frontend:** React 18, TypeScript (сборка через Vite), обычный CSS, архитектура FSD
- **Backend:** Supabase (Auth + автоматический REST API)
- **База данных:** PostgreSQL в Supabase (таблицы `boards`, `lists`, `cards`, включен RLS)

## Возможности

- регистрация и вход по email и паролю
- создание и удаление досок, выбор цвета доски
- при создании доски автоматически появляются списки «Нужно сделать», «В процессе», «Готово»
- добавление, переименование и удаление списков
- добавление карточек, редактирование названия и описания в модальном окне, удаление
- перенос карточек между списками (drag and drop)
- защита данных через Row Level Security

## Как запустить локально

1. Создать проект на [supabase.com](https://supabase.com).
2. Открыть **SQL Editor**, вставить содержимое файла `supabase/schema.sql` и нажать **Run**.
3. (по желанию) В **Authentication → Providers → Email** выключить «Confirm email», чтобы не нужно было подтверждать почту.
4. Склонировать репозиторий и установить зависимости:

```bash
git clone https://github.com/USERNAME/mini-trello.git
cd mini-trello
npm install
```

5. Скопировать `.env.example` в `.env` и вставить свои ключи из **Project Settings → API**:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=ваш-anon-key
```

6. Запустить:

```bash
npm run dev
```

Приложение откроется на http://localhost:5173

## Архитектура (Feature-Sliced Design)

Код разбит на слои по методологии [FSD](https://feature-sliced.design/ru/).
Каждый слой может импортировать только слои ниже себя, а каждый слайс отдает наружу только то,
что указано в его `index.ts` (public API).

```
src/
  app/                    - инициализация приложения
    App.tsx               - проверка входа и выбор страницы
    styles/index.css      - общие стили
  pages/                  - страницы
    login/                - страница входа
    boards/               - страница «Мои доски»
    board/                - страница доски
  widgets/                - крупные самостоятельные блоки
    header/               - шапка с email и кнопкой выхода
    boards-grid/          - сетка досок + форма создания
    kanban-board/         - доска: списки, карточки, модальное окно
  features/               - действия пользователя
    auth/                 - вход, регистрация, выход, хук useSession
    create-board/         - создание доски
    create-list/          - добавление списка
    create-card/          - добавление карточки
    edit-card/            - редактирование и удаление карточки (CardModal)
    move-card/            - перенос карточки между списками (drag and drop)
  entities/               - бизнес-сущности
    board/                - тип Board, запросы boardApi, плитка BoardTile
    list/                 - тип List, запросы listApi, колонка ListColumn
    card/                 - тип Card, запросы cardApi, карточка CardItem
  shared/                 - переиспользуемый код без бизнес-логики
    api/                  - клиент Supabase
    lib/                  - простой hash-роутер
    ui/                   - Loader
supabase/
  schema.sql              - таблицы, индексы и политики RLS
```

Внутри слайса код разложен по сегментам: `ui` (компоненты), `model` (типы и логика), `api` (запросы к Supabase).
