# Angular Academy – Enterprise Architecture (Angular 21)

This document describes the application structure, Angular 21 patterns, and conventions.

## Folder Structure

```
src/app/
├── core/                    # Singleton services, guards, interceptors
│   ├── services/            # Auth, Theme, Navigation
│   ├── guards/              # authGuard
│   └── index.ts             # Barrel: import from '@app/core'
│
├── shared/                   # Reusable UI and utilities
│   ├── models/              # Interfaces (ICodeExample, ITopicContent, ISection)
│   ├── pipes/               # CustomFilterPipe
│   ├── directives/          # VisibleIfDirective
│   └── index.ts             # Barrel: import from '@app/shared'
│
├── features/                 # Feature entry points (optional)
│   ├── home/                # Home feature
│   └── auth/                # Auth / Login feature
│
├── components/              # UI components (legacy location, still used)
│   ├── home/                # Home page
│   ├── auth/                # Login dialog
│   ├── topic-template/      # Shared topic layout
│   ├── generic-topic/       # Generic topic viewer
│   └── topics/              # Learning topics (prerequisites, rxjs, etc.)
│
├── routes/                  # Route configs (e.g. fundamentals)
├── constants/               # Topic content and app constants
├── styles/                  # Shared SCSS (mixins, topic-demo-common)
│
├── app.config.ts            # Global providers (router, animations)
├── app.routes.ts            # Root route definitions
└── app.ts                   # Root component (shell/layout)
```

## Path Aliases

Use these in imports for clear, stable references:

| Alias           | Path        | Use for                          |
|-----------------|------------|-----------------------------------|
| `@app/core`     | `app/core` | AuthService, ThemeService, NavigationService, authGuard |
| `@app/shared`   | `app/shared` | Models, pipes, directives, TopicTemplate |
| `@app/features/*` | `app/features/*` | Feature public API (e.g. HomeComponent, Login) |

**Examples**

```ts
import { AuthService, authGuard } from '@app/core';
import { ITopicContent, TopicTemplate, CustomFilterPipe } from '@app/shared';
import { HomeComponent } from '@app/features/home';
```

## Core

- **Single instance**: Services and guards are app-wide singletons.
- **No UI**: Core does not import components; it can be used from any feature.
- **Guards**: `authGuard` opens the login dialog when the user is not authenticated.

## Shared

- **Reusable**: Pipes, directives, and models used across features.
- **TopicTemplate**: Shared layout for learning topic pages; re-exported from `@app/shared`.

## Features

- **features/home** and **features/auth** expose the home and login components via barrel files.
- Learning content stays under `components/topics/` and is lazy-loaded via `app.routes.ts`.

## Bootstrapping (Angular 21)

- **main.ts** bootstraps the app with `appConfig` from `app.config.ts`.
- **app.config.ts** uses:
  - `provideZoneChangeDetection({ eventCoalescing: true })` for fewer change detection cycles
  - `provideRouter(..., withViewTransitions(), withComponentInputBinding())` for view transitions and route input binding
  - `provideAnimationsAsync()` for lazy-loaded animations

## Angular 21 patterns in use

- **Signals**: `signal()`, `computed()`, `effect()` for reactive state in App and feature components
- **toSignal()**: RxJS → Signal conversion for `router.events` and `BreakpointObserver` (no manual subscribe/takeUntil)
- **DestroyRef + takeUntilDestroyed()**: Clean teardown for any remaining subscriptions
- **New control flow**: `@if`, `@for` with `track` in templates instead of `*ngIf`/`*ngIfElse`/`*ngFor`
- **Standalone APIs**: All components and pipes are standalone; `RouterLink`, `RouterOutlet`, `RouterLinkActive` imported directly
- **inject()**: Preferred over constructor injection for services and tokens
- **Typed models**: `Topic`, `SubTopic` from `@app/core`; route paths in `ROUTE_PATHS`

## Routing

- Root routes are in **app.routes.ts** (lazy `loadComponent` / `loadChildren`).
- **routes/angualr-fundamental.routes.ts** defines child routes for the “fundamentals” section (with `authGuard` where required).

## Adding New Code

- **New global service or guard** → Implement in `core/`, export from `core/index.ts`, use `@app/core`.
- **New shared pipe/directive/model** → Implement in `shared/`, export from `shared/index.ts`, use `@app/shared`.
- **New feature** → Add a folder under `features/` with an `index.ts` that re-exports the feature’s public API.
