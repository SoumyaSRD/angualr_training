export const ROUTING = {
    "title": "Angular Routing & Navigation: Comprehensive Guide with Deep Details, Examples, and Best Practices",
    "tags": ["Angular", "Routing", "Navigation", "Router", "Lazy Loading", "Guards", "Resolvers", "Route Parameters", "Best Practices", "Performance"],
    "paragraphs": [
        "Routing and navigation are central to building modern single-page applications (SPAs) in Angular. The Angular Router enables declarative navigation, lazy loading of feature modules, parameterized routes, route guards for security and control, data pre-fetching with resolvers, and much more. Mastering routing is essential for creating scalable, performant, and user-friendly Angular applications. This in-depth guide covers every major aspect of Angular routing: core concepts, configuration patterns, route parameters, child routes, lazy loading, guards, resolvers, programmatic navigation, auxiliary routes, route reuse strategies, modern standalone routing, and proven best practices to help you build robust navigation systems."
    ],
    "keyPoints": [
        "RouterModule: The core module that provides routing capabilities.",
        "Routes Configuration: Array of route definitions with path, component, children, loadChildren, etc.",
        "Lazy Loading: Load feature modules only when needed → dramatically improves initial load time.",
        "Route Parameters & Query Params: Dynamic data in URLs (/:id, ?search=term).",
        "Route Guards: CanActivate, CanMatch, CanDeactivate, Resolve, CanLoad for security and data control.",
        "Resolvers: Pre-fetch data before activating a route.",
        "Router Events & Navigation Lifecycle: Intercept navigation, handle errors, show loaders.",
        "Standalone Routing: Modern Angular (14+) eliminates NgModule dependency for routing."
    ],
    "sections": [
        {
            "id": "what-is-angular-routing",
            "heading": "What is Angular Routing?",
            "content": "The Angular Router is a powerful service that enables navigation between different views (components) within a single-page application. Instead of full page reloads, it updates the URL and renders the appropriate component based on the current route.",
            "list": [
                "Declarative routing in templates using <router-outlet> and routerLink",
                "Supports deep linking and browser history (back/forward buttons)",
                "Handles parameterized routes, query parameters, fragments",
                "Enables lazy loading of feature modules",
                "Provides guards, resolvers, and navigation events"
            ],
            "additionalExplanation": "Routing transforms Angular from a component-based UI library into a full-featured SPA framework. It manages the entire navigation lifecycle, from URL change to component activation and data resolution."
        },
        {
            "id": "basic-routing-setup",
            "heading": "Basic Routing Setup & Configuration",
            "content": "Routing is configured using an array of Route objects, typically in a dedicated routing module or directly in standalone applications.",
            "list": [
                "RouterModule.forRoot(routes) → root-level configuration",
                "RouterModule.forChild(routes) → feature/child modules",
                "<router-outlet> → placeholder where routed components render",
                "routerLink directive → declarative navigation",
                "RouterLinkActive → highlights active route"
            ],
            "additionalExplanation": "In modern Angular (17+), routing can be fully functional and standalone with provideRouter() and createRoutesFromChildren()."
        },
        {
            "id": "route-parameters",
            "heading": "Route Parameters & Query Parameters",
            "content": "Dynamic routes use parameters to pass data through the URL.",
            "list": [
                "Path parameters: /user/:id → ActivatedRoute.snapshot.paramMap.get('id')",
                "Query parameters: /products?category=books&sort=price → ActivatedRoute.queryParams",
                "Fragment: /help#section2 → ActivatedRoute.fragment",
                "ActivatedRoute & ActivatedRouteSnapshot for accessing route data"
            ],
            "additionalExplanation": "Use paramMap for required data, queryParams for optional filters. Prefer route params for identifying resources (RESTful style)."
        },
        {
            "id": "child-routes-nested-routing",
            "heading": "Child Routes & Nested Routing",
            "content": "Child routes enable nested layouts (e.g., sidebar + content) and organized feature routing.",
            "list": [
                "children: [] array inside a parent route",
                "Named router-outlets for multiple content areas",
                "Relative navigation with routerLink=\"./child\"",
                "Common pattern: feature module with its own routing file"
            ],
            "additionalExplanation": "Nested routes are essential for complex dashboards, admin panels, and tabbed interfaces."
        },
        {
            "id": "lazy-loading",
            "heading": "Lazy Loading – Performance Optimization",
            "content": "Lazy loading defers loading of feature modules until the user navigates to them, significantly reducing initial bundle size.",
            "list": [
                "loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)",
                "Preloading strategies: PreloadAllModules, custom preloading",
                "CanLoad guard for protecting lazy routes",
                "Automatic chunk creation during build"
            ],
            "additionalExplanation": "Lazy loading is one of the most impactful performance optimizations in large Angular applications."
        },
        {
            "id": "route-guards",
            "heading": "Route Guards – Security & Control",
            "content": "Guards decide whether a route can be activated, loaded, or deactivated.",
            "list": [
                "CanActivate / CanActivateChild: protect route access",
                "CanMatch: choose which route to activate",
                "CanDeactivate: prevent leaving unsaved forms",
                "CanLoad: protect lazy-loaded modules (prevents loading)",
                "Resolve: fetch data before activation"
            ],
            "additionalExplanation": "Guards are commonly used for authentication, role-based access, and preventing data loss."
        },
        {
            "id": "resolvers",
            "heading": "Resolvers – Data Pre-fetching",
            "content": "Resolvers fetch data before a route is activated, ensuring components receive ready data.",
            "list": [
                "Implement Resolve<T> interface",
                "Return Observable, Promise, or value",
                "Data available via ActivatedRoute.snapshot.data",
                "Combine with async pipe in templates"
            ],
            "additionalExplanation": "Resolvers improve UX by avoiding loading states in components and centralize data fetching logic."
        },
        {
            "id": "standalone-routing",
            "heading": "Standalone Routing (Modern Angular)",
            "content": "Since Angular 14+, routing can be fully configured without NgModules using provideRouter().",
            "list": [
                "provideRouter(routes) in bootstrapApplication",
                "createRoutesFromChildren() for modular route definitions",
                "Functional guards, resolvers, and interceptors",
                "importProvidersFrom() for legacy module interop"
            ],
            "additionalExplanation": "Standalone routing reduces boilerplate, improves tree-shaking, and is the future direction of Angular."
        }
    ],
    "codeExamples": [
        {
            "title": "Basic Standalone Routing Setup",
            "language": "typescript",
            "code": "import { bootstrapApplication } from '@angular/platform-browser';\nimport { provideRouter } from '@angular/router';\nimport { AppComponent } from './app.component';\n\nconst routes = [\n  { path: '', redirectTo: '/home', pathMatch: 'full' },\n  { path: 'home', component: HomeComponent },\n  { path: 'about', component: AboutComponent }\n];\n\nbootstrapApplication(AppComponent, {\n  providers: [provideRouter(routes)]\n});",
            "description": "Modern way to bootstrap routing in a standalone application."
        },
        {
            "title": "Lazy Loaded Feature Route",
            "language": "typescript",
            "code": "const routes: Routes = [\n  {\n    path: 'products',\n    loadChildren: () => import('./products/products.routes').then(m => m.PRODUCTS_ROUTES)\n  }\n];\n\n// products.routes.ts\nexport const PRODUCTS_ROUTES: Routes = [\n  { path: '', component: ProductListComponent },\n  { path: ':id', component: ProductDetailComponent }\n];",
            "description": "Recommended lazy loading pattern with separate route files."
        },
        {
            "title": "Auth Guard Example",
            "language": "typescript",
            "code": "import { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\nimport { AuthService } from './auth.service';\n\nexport const authGuard: CanActivateFn = () => {\n  const authService = inject(AuthService);\n  const router = inject(Router);\n\n  if (authService.isLoggedIn()) {\n    return true;\n  }\n  router.navigate(['/login']);\n  return false;\n};",
            "description": "Functional CanActivate guard (modern style)."
        },
        {
            "title": "Resolver Example",
            "language": "typescript",
            "code": "import { ResolveFn } from '@angular/router';\nimport { inject } from '@angular/core';\nimport { UserService } from './user.service';\n\nexport const userResolver: ResolveFn<User> = (route) => {\n  const userService = inject(UserService);\n  const id = route.params['id'];\n  return userService.getUser(id);\n};",
            "description": "Resolver that fetches user data before route activation."
        }
    ],
    "bestPractices": [
        "Use standalone routing and provideRouter() for new projects.",
        "Organize routes into separate files per feature (feature.routes.ts).",
        "Always lazy load feature modules in medium/large applications.",
        "Use functional guards and resolvers in modern Angular.",
        "Centralize route constants (paths, roles) to avoid magic strings.",
        "Handle navigation errors and show loading spinners using Router events.",
        "Prefer route params over query params for required identifiers.",
        "Use pathMatch: 'full' for redirects and exact matches.",
        "Implement CanDeactivate for unsaved changes protection.",
        "Monitor bundle sizes – lazy loading should create meaningful chunks.",
        "Use title strategy or Route data for dynamic page titles.",
        "Combine with signals and async pipe for reactive route data handling."
    ]
}