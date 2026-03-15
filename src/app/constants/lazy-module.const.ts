export const LAZY_MODULES = {
    "title": "Lazy Loading in Angular: Optimizing Application Performance",
    "tags": ["Angular", "Lazy Loading", "Routing", "Performance", "Best Practices"],
    "paragraphs": [
        "Lazy loading is a powerful feature in Angular that allows you to load modules on-demand rather than all at once during the initial application bootstrap. This technique significantly improves the performance of large applications by reducing the initial bundle size and load time. This content delves into the concept, implementation, and benefits of lazy loading in Angular."
    ],
    "keyPoints": [
        "Lazy Loading: Loads feature modules only when needed, typically via routing.",
        "Benefits: Reduces initial load time, improves user experience, and optimizes resource usage.",
        "Implementation: Uses Angular Router's loadChildren property for dynamic imports.",
        "Preloading: Optional strategy to preload lazy modules in the background for faster subsequent access."
    ],
    "sections": [
        {
            "id": "what-is-lazy-loading",
            "heading": "What is Lazy Loading?",
            "content": "Lazy loading is a design pattern where resources, such as JavaScript modules, are loaded asynchronously only when they are required. In Angular, this is primarily achieved through the router, allowing feature modules to be loaded when a specific route is navigated to.",
            "list": [
                "Contrasts with eager loading, where all modules are loaded upfront",
                "Ideal for large applications with multiple features",
                "Reduces the size of the initial JavaScript bundle"
            ],
            "additionalExplanation": "By deferring the loading of non-essential modules, lazy loading ensures that users get a faster initial experience, especially on slower networks."
        },
        {
            "id": "benefits",
            "heading": "Benefits of Lazy Loading",
            "content": "Implementing lazy loading can lead to substantial performance gains, making your Angular application more efficient and user-friendly.",
            "list": [
                "Faster initial load times by splitting the application into smaller chunks",
                "Better resource management, as unused features aren't loaded unnecessarily",
                "Improved scalability for growing applications with many routes and features"
            ],
            "additionalExplanation": "Lazy loading also enhances developer productivity by encouraging modular architecture, making it easier to maintain and update specific parts of the app."
        },
        {
            "id": "implementation",
            "heading": "How to Implement Lazy Loading",
            "content": "To set up lazy loading, you configure your routes to use dynamic imports for feature modules. This involves defining child routes in a separate routing module for each feature.",
            "list": [
                "Create a feature module with its own routing module",
                "Use loadChildren in the main routing configuration to point to the feature module",
                "Ensure the feature module is not imported directly in the root module"
            ],
            "additionalExplanation": "Angular's build process will automatically create separate chunks for lazy-loaded modules, which are fetched via network requests when the route is activated."
        },
        {
            "id": "preloading-strategies",
            "heading": "Preloading Strategies",
            "content": "Angular provides preloading strategies to load lazy modules in the background after the initial load, balancing between eager and fully lazy approaches.",
            "list": [
                "PreloadAllModules: Preloads all lazy modules as soon as possible",
                "Custom preloading: Implement your own strategy based on priorities or user behavior",
                "NoPreloading: The default, where modules are loaded only on demand"
            ],
            "additionalExplanation": "Choosing the right preloading strategy depends on your application's size and user navigation patterns to optimize perceived performance."
        }
    ],
    "codeExamples": [
        {
            "title": "Main Routing Module Example",
            "language": "typescript",
            "code": "import { NgModule } from '@angular/core';\nimport { RouterModule, Routes } from '@angular/router';\n\nconst routes: Routes = [\n  { path: '', redirectTo: '/home', pathMatch: 'full' },\n  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },\n  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }\n];\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes)],\n  exports: [RouterModule]\n})\nexport class AppRoutingModule { }",
            "description": "This example shows how to configure lazy loading in the root routing module using loadChildren with dynamic imports."
        },
        {
            "title": "Feature Routing Module Example",
            "language": "typescript",
            "code": "import { NgModule } from '@angular/core';\nimport { RouterModule, Routes } from '@angular/router';\nimport { UserListComponent } from './user-list.component';\nimport { UserDetailComponent } from './user-detail.component';\n\nconst routes: Routes = [\n  { path: '', component: UserListComponent },\n  { path: ':id', component: UserDetailComponent }\n];\n\n@NgModule({\n  imports: [RouterModule.forChild(routes)],\n  exports: [RouterModule]\n})\nexport class UsersRoutingModule { }",
            "description": "A routing module for a lazy-loaded feature, using forChild to define child routes."
        },
        {
            "title": "Feature Module Example",
            "language": "typescript",
            "code": "import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { UsersRoutingModule } from './users-routing.module';\nimport { UserListComponent } from './user-list.component';\nimport { UserDetailComponent } from './user-detail.component';\n\n@NgModule({\n  declarations: [UserListComponent, UserDetailComponent],\n  imports: [CommonModule, UsersRoutingModule]\n})\nexport class UsersModule { }",
            "description": "The feature module that imports its own routing module and declares its components."
        },
        {
            "title": "Preloading Strategy Example",
            "language": "typescript",
            "code": "import { NgModule } from '@angular/core';\nimport { PreloadAllModules, RouterModule, Routes } from '@angular/router';\n\nconst routes: Routes = [\n  // ... lazy routes here\n];\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],\n  exports: [RouterModule]\n})\nexport class AppRoutingModule { }",
            "description": "Configuring the router to use PreloadAllModules strategy for background preloading of lazy modules."
        }
    ],
    "bestPractices": [
        "Organize your application into feature modules for effective lazy loading.",
        "Avoid importing lazy modules directly in the root or other modules.",
        "Use preloading strategies judiciously to balance load times and user experience.",
        "Monitor bundle sizes with Angular CLI's build analyzer to ensure optimization.",
        "Combine lazy loading with route guards for secure and efficient navigation."
    ]
}