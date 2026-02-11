export const GUARD = {
    "title": "Angular Route Guards: In-Depth Guide – Types, Implementation, Functional Guards, Examples & Best Practices",
    "tags": ["Angular", "Route Guards", "CanActivate", "CanDeactivate", "CanMatch", "CanLoad", "Resolve", "Authentication", "Authorization", "Navigation", "Best Practices"],
    "paragraphs": [
        "Route Guards are one of the most powerful features of the Angular Router. They allow you to control navigation by deciding whether a route can be activated, loaded, or deactivated, and they enable you to fetch data before a route is displayed. Guards are essential for implementing authentication, authorization, preventing unsaved changes, restricting access to certain routes, and preloading data. This comprehensive guide covers every type of guard in detail: CanActivate, CanActivateChild, CanDeactivate, CanMatch, CanLoad, Resolve (technically a resolver but often grouped with guards), functional guards (modern approach), combining multiple guards, handling asynchronous logic, and real-world best practices to make your Angular application secure, user-friendly, and performant."
    ],
    "keyPoints": [
        "Guards: Functions or classes that run before/after navigation and return true, false, UrlTree, Observable<boolean>, Promise<boolean>, etc.",
        "CanActivate: Protects a route from being entered (most common).",
        "CanActivateChild: Protects child routes of a parent.",
        "CanDeactivate: Prevents leaving a route (e.g., unsaved form).",
        "CanMatch: Decides which of multiple matching routes to activate (Angular 14+).",
        "CanLoad: Prevents lazy-loaded modules from being loaded (great for performance + security).",
        "Resolve: Pre-fetches data before route activation (often used together with guards).",
        "Functional Guards: Modern, preferred way (no class needed) – Angular 14+.",
        "Return Types: boolean, UrlTree (redirect), Observable<boolean | UrlTree>, Promise<boolean | UrlTree>"
    ],
    "sections": [
        {
            "id": "what-are-route-guards",
            "heading": "What Are Route Guards?",
            "content": "Route guards are services or functions that Angular Router calls during navigation to decide whether the navigation should proceed, be cancelled, or redirected elsewhere. They run at specific points in the navigation lifecycle and give developers full control over access and data preparation.",
            "list": [
                "Executed before the route component is instantiated",
                "Can return synchronously or asynchronously (Promise / Observable)",
                "Can redirect to another route using UrlTree",
                "Can run multiple guards in sequence (all must pass)",
                "Support both class-based (legacy) and functional (modern) styles"
            ],
            "additionalExplanation": "Guards are the primary mechanism for implementing security (auth checks), UX improvements (confirm discard changes), and performance optimizations (prevent loading heavy modules)."
        },
        {
            "id": "guard-types",
            "heading": "Types of Route Guards",
            "content": "Angular provides several guard interfaces, each with a specific purpose.",
            "list": [
                "CanActivate: Controls whether a route can be activated",
                "CanActivateChild: Controls child routes of a component",
                "CanDeactivate: Controls whether user can leave the current route",
                "CanMatch: Chooses which route to activate when multiple paths match (v14+)",
                "CanLoad: Prevents loading of lazy-loaded modules (before download)",
                "Resolve: Fetches data before activation (not a true guard but used similarly)"
            ],
            "additionalExplanation": "CanActivate and CanLoad are the most commonly used for authentication. CanDeactivate is critical for form-heavy applications. CanMatch is powerful for role-based routing."
        },
        {
            "id": "functional-guards",
            "heading": "Functional Guards – The Modern Recommended Approach",
            "content": "Since Angular 14, functional guards are preferred over class-based guards. They are simpler, tree-shakable, and easier to test.",
            "list": [
                "Defined as plain functions (CanActivateFn, CanDeactivateFn, etc.)",
                "Use inject() to get services inside the function",
                "Return boolean, UrlTree, Observable<boolean | UrlTree>, Promise<boolean | UrlTree>",
                "No need to create injectable classes just for guards"
            ],
            "additionalExplanation": "Functional guards are now the standard in Angular documentation and community projects. They reduce boilerplate and align with standalone components."
        },
        {
            "id": "real-world-use-cases",
            "heading": "Real-World Use Cases for Guards",
            "content": "Guards solve many common application requirements.",
            "list": [
                "Authentication: Only logged-in users can access dashboard",
                "Authorization: Admins only can access /admin routes",
                "Unsaved Changes: Warn before leaving a dirty form",
                "Data Preloading: Ensure data is ready before showing component",
                "Role-Based Routing: Different layouts/routes for different user roles",
                "Prevent Lazy Module Loading: Block unauthorized users from downloading code"
            ],
            "additionalExplanation": "Combining guards with resolvers is a very common pattern for secure, smooth user experiences."
        }
    ],
    "codeExamples": [
        {
            "title": "Functional CanActivate Guard (Auth Check)",
            "language": "typescript",
            "code": "import { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\nimport { AuthService } from './auth.service';\nimport { map } from 'rxjs';\n\nexport const authGuard: CanActivateFn = (route, state) => {\n  const authService = inject(AuthService);\n  const router = inject(Router);\n\n  return authService.isAuthenticated$.pipe(\n    map(isAuth => {\n      if (isAuth) return true;\n      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });\n      return false;\n    })\n  );\n};",
            "description": "Modern async authentication guard with redirect and return URL preservation."
        },
        {
            "title": "CanDeactivate Guard – Unsaved Changes",
            "language": "typescript",
            "code": "import { inject } from '@angular/core';\nimport { CanDeactivateFn } from '@angular/router';\n\nexport interface CanComponentDeactivate {\n  canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;\n}\n\nexport const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {\n  return component.canDeactivate ? component.canDeactivate() : true;\n};",
            "description": "Guard that checks if component has unsaved changes (component implements interface)."
        },
        {
            "title": "CanLoad Guard for Lazy Modules",
            "language": "typescript",
            "code": "import { inject } from '@angular/core';\nimport { CanLoadFn, Router } from '@angular/router';\nimport { AuthService } from './auth.service';\n\nexport const adminLoadGuard: CanLoadFn = () => {\n  const authService = inject(AuthService);\n  const router = inject(Router);\n\n  if (authService.hasAdminRole()) {\n    return true;\n  }\n\n  router.navigate(['/access-denied']);\n  return false;\n};",
            "description": "Prevents downloading admin module code if user is not authorized."
        },
        {
            "title": "Using Resolve + Guard Together",
            "language": "typescript",
            "code": "{\n  path: 'profile/:id',\n  component: ProfileComponent,\n  canActivate: [authGuard],\n  resolve: { user: userResolver }\n}",
            "description": "Route config combining guard and resolver for secure, preloaded data."
        }
    ],
    "bestPractices": [
        "Prefer functional guards over class-based guards in Angular 14+.",
        "Use inject() inside functional guards to get services.",
        "Always return UrlTree for redirects instead of navigating imperatively.",
        "Preserve the attempted URL using queryParams or state for post-login redirect.",
        "Combine multiple guards when needed (they run sequentially).",
        "Keep guards fast – avoid heavy computations or long-running operations.",
        "Use CanLoad instead of CanActivate for lazy-loaded protected routes (saves bandwidth).",
        "Implement CanDeactivate for all forms that can be edited.",
        "Centralize auth logic in an AuthService – guards should only call service methods.",
        "Handle guard errors gracefully (show error page or log out).",
        "Test guards thoroughly – mock services and test all return types.",
        "Use CanMatch for advanced role-based or feature-flag routing scenarios."
    ]
}