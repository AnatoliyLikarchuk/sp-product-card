# 🍣 SushiSwipe

Мобильное веб-приложение в стиле Tinder для выбора продуктов для приготовления суши.

## Демо

Свайпай карточки товаров:
- **→ Вправо** — пропустить
- **← Влево** — назад
- **↓ Вниз** — добавить в корзину

## Возможности

- 🎴 Свайп-интерфейс с анимациями
- 🛒 Корзина с сохранением в localStorage
- 📱 Мобильный дизайн (430px)
- 🌙 Тёмная тема

## Категории товаров

| Категория | Товаров |
|-----------|---------|
| 🌿 Водоросли | 10 |
| 🥗 Салаты | 10 |
| 🦐 Морепродукты | 10 |

## Технологии

- **React 19** + TypeScript
- **Vite** — сборка
- **Tailwind CSS 4** — стили
- **Zustand** — состояние
- **Framer Motion** — анимации свайпов
- **React Router** — навигация

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build
```

Открой http://localhost:5173

## Структура проекта

```
src/
├── components/     # UI компоненты
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── SwipeContainer.tsx
│   └── CategoryTabs.tsx
├── pages/          # Страницы
│   ├── HomePage.tsx
│   ├── CatalogPage.tsx
│   └── CartPage.tsx
├── store/          # Zustand store
│   └── cartStore.ts
├── data/           # Моковые данные
│   └── products.ts
└── types/          # TypeScript типы
    └── index.ts
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка для продакшена |
| `npm run lint` | Проверка ESLint |
| `npm run preview` | Превью билда |

## Лицензия

MIT
