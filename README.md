## Пиши на русском

# Платформа тестирования (MVP)

Сначала делаем сайт для тестирования студентов:
- регистрация только по приглашению
- тест по одному вопросу за раз
- админка для создания тестов/вопросов
- RU/EN/KZ

## Документ проекта
Всё (требования, стек, план шагов, правила, QA) — в `PROJECT.md`.

## Быстрый старт

```bash
# Установка зависимостей
pnpm install

# Запуск dev-сервера
pnpm dev

# Запуск Postgres
docker compose up -d

# Проверки
pnpm lint
pnpm tsc --noEmit
pnpm build
```

## Стек
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 (cosmic-тема)
- next-intl (RU / EN / KK)
- Postgres 16 (Docker)
- pnpm
- GitHub Actions CI
