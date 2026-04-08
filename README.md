<div align="center">
  <img src="public/logo.png" alt="Anti Tédio" width="80" />
  <h1>Anti Tédio — Frontend</h1>
  <p>AI-powered leisure discovery app. Tell us your mood, get the perfect recommendation.</p>

  ![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-6.x-646cff?logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?logo=tailwindcss&logoColor=white)
  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
</div>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Internationalization (i18n)](#internationalization-i18n)
- [Component Architecture](#component-architecture)
- [Routes](#routes)
- [State Management](#state-management)
- [Coding Conventions](#coding-conventions)

---

## Overview

Anti Tédio is a web application that uses artificial intelligence to suggest personalized leisure activities — movies, series, anime, books, cartoons and video games — based on the user's personality traits and current mood.

The user flow is:

```
Select traits → Select category → (Set budget if game) → Get AI recommendation → Save to history
```

Credits are consumed per recommendation. Users can purchase credit packs via Mercado Pago integration.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Language | TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| UI components | shadcn/ui (reka-ui primitives) |
| Form validation | vee-validate + Zod |
| State management | Pinia |
| Routing | Vue Router 4 |
| HTTP client | Axios |
| Internationalization | vue-i18n 9 (Composition mode) |
| Icons | Lucide Vue Next |
| Animations | tailwindcss-animate (`animate-in`) |
| Testing | Vitest |
| Linting/Formatting | ESLint + Prettier |

---

## Project Structure

```
src/
├── assets/             # Static assets (logo, images)
├── components/
│   ├── icons/          # SVG icon components (category icons, social icons)
│   ├── login/          # Auth flow: Login dialog, MethodLogin, LoginEmail,
│   │                   #   ForgotPassword, EmailVerification
│   ├── Profile/        # Profile page sub-components: UserInfo, UserPerson,
│   │                   #   HistoryCard, EditPerson, EditAvatar, ChangePassword
│   ├── result/         # Recommendation result cards: Midia, Book, VideoGame
│   └── ui/             # shadcn/ui base components (Button, Input, Dialog…)
├── locales/
│   ├── en.ts           # English translations
│   └── pt.ts           # Portuguese (Brazil) translations
├── middlewares/        # Route guards (auth, redirect logic)
├── router/
│   └── routes.ts       # Vue Router route definitions
├── stores/             # Pinia stores
│   ├── categorys.store.ts
│   ├── history.store.ts
│   ├── persons.store.ts
│   ├── product.store.ts
│   ├── suggest.store.ts
│   └── user.store.ts
├── types/
│   └── index.ts        # Shared TypeScript interfaces
├── utils/
│   └── refreshToken.ts # Token refresh logic + reactive token ref
├── views/              # Page-level components (one per route)
│   ├── HomeView.vue
│   ├── AboutView.vue
│   ├── SelectPersonView.vue
│   ├── SelectCategoryView.vue
│   ├── ExtraInfoView.vue     # Budget selector (video game only)
│   ├── ResultView.vue
│   ├── ProfileView.vue
│   ├── DeleteAccountView.vue
│   ├── ResetPasswordView.vue
│   ├── AccountRecoveryView.vue
│   ├── PaymentSuccessView.vue
│   ├── PaymentFailureView.vue
│   └── PaymentPendingView.vue
├── App.vue             # Root component (header, footer, router-view)
├── i18n.ts             # vue-i18n setup (locale detection, fallback)
└── main.ts             # App entry point
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Anti Tédio/frontend.git
cd frontend

# Install dependencies
npm install
```

### Development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production build

```bash
npm run build
```

Build output goes to `dist/`.

---

## Environment Variables

Create a `.env` file at the root of the project:

```env
VITE_API_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the Anti Tédio backend API |

All Vite environment variables must be prefixed with `VITE_` to be exposed to the client.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run type-check` | Run `vue-tsc` without emitting |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |

---

## Internationalization (i18n)

The app supports **English** (`en`) and **Portuguese Brazil** (`pt`). The active locale is auto-detected from the browser's `navigator.language` on first load, with `pt` as the fallback.

### File locations

```
src/locales/en.ts   # English
src/locales/pt.ts   # Portuguese (Brazil)
```

### Setup

```ts
// src/i18n.ts
import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import pt from '@/locales/pt'

const i18n = createI18n({
  legacy: false,        // Composition API mode
  locale: detectedLocale,
  fallbackLocale: 'pt',
  messages: { en, pt },
})
```

### Usage in components

```vue
<script setup>
const { t, locale } = useI18n()
</script>

<template>
  <p>{{ $t('home.title') }}</p>
  <p>{{ $t('nav.credits', { count: 5 }) }}</p>
</template>
```

### Changing locale at runtime

```ts
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
locale.value = 'en'
```

### Adding a new translation key

1. Add the key to **both** `src/locales/en.ts` and `src/locales/pt.ts`
2. Use it in the component with `$t('section.key')` or `t('section.key')` inside `<script setup>`

> **Convention:** Keys follow the pattern `sectionName.keyName` (camelCase). Each top-level section maps to a view or feature area (e.g. `auth`, `profile`, `selectPerson`).

---

## Component Architecture

### Naming

| Pattern | Usage |
|---|---|
| `PascalCase.vue` | All components |
| `*View.vue` | Page-level components registered in the router |
| `*Component.vue` | Reusable UI components |
| `*Store.ts` | Pinia stores |

### Composition API conventions

All components use `<script setup lang="ts">`. Avoid the Options API.

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const count = ref(0)
</script>
```

### Form validation

Forms use **vee-validate** with **Zod** schemas via `@vee-validate/zod`:

```ts
const schema = toTypedSchema(
  z.object({
    email: z.string().email(t('auth.validationEmailInvalid')),
    password: z.string().min(8, t('auth.validationPasswordMin')),
  })
)

const { handleSubmit } = useForm({ validationSchema: schema })
```

Validation error messages are always sourced from the active locale.

### shadcn/ui components

Base UI primitives (`Button`, `Input`, `Dialog`, `Card`, `Select`, etc.) come from shadcn/ui and live in `src/components/ui/`. Do not modify these files directly — regenerate them with the shadcn CLI if an update is needed.

---

## Routes

| Path | View | Auth required |
|---|---|---|
| `/` | `HomeView` | No |
| `/about` | `AboutView` | No |
| `/select-person` | `SelectPersonView` | Yes |
| `/categorys` | `SelectCategoryView` | Yes |
| `/extra-info` | `ExtraInfoView` | Yes |
| `/result` | `ResultView` | Yes |
| `/profile` | `ProfileView` | Yes |
| `/delete-account` | `DeleteAccountView` | Yes |
| `/reset-password` | `ResetPasswordView` | No |
| `/recover-account` | `AccountRecoveryView` | No |
| `/payment/success` | `PaymentSuccessView` | Yes |
| `/payment/failure` | `PaymentFailureView` | Yes |
| `/payment/pending` | `PaymentPendingView` | Yes |

Route guards live in `src/middlewares/`. The `auth` middleware redirects unauthenticated users to the home screen and triggers the login modal.

---

## State Management

Pinia stores are located in `src/stores/`. Each store is accessed via its composable:

```ts
import useUserStore from '@/stores/user.store'
const userStore = useUserStore()
```

| Store | Responsibility |
|---|---|
| `user.store` | Auth state, profile data, login/logout, avatar, password |
| `persons.store` | Personality traits list, selection, persistence |
| `categorys.store` | Categories list, active selection |
| `suggest.store` | Recommendation result, loading state, price |
| `history.store` | User recommendation history |
| `product.store` | Credit packs, purchase flow |

---

## Coding Conventions

- **Semantic HTML first** — use `<main>`, `<header>`, `<section>`, `<article>`, `<aside>`, `<nav>`, `<ul>/<li>` where appropriate
- **Accessibility** — every interactive element needs a visible or `aria-label`. Use `aria-live`, `role`, `aria-expanded`, `aria-busy` where applicable
- **Tailwind only** — no custom CSS unless strictly necessary (animation keyframes are the only exception)
- **No hardcoded strings** — all user-visible text must go through `$t()` / `t()`
- **Types always** — no `any` unless unavoidable. Extend `src/types/index.ts` for shared interfaces
- **`Record<string, string>` for multilingual fields** — `category.title`, `person.trait`, and `person.desc` are locale maps; always access them with `value[locale] ?? value['en']`
- **`router.push()` over `<a href>`** for internal navigation inside `<script>`; use `<a href>` for crawlable links in templates

---

## License

[MIT](LICENSE)