export const ALL_MODULES = {
    "title": "Angular Modules: Root, Feature, Shared, and Core",
    "tags": ["Angular", "Modules", "Architecture", "Best Practices"],
    "paragraphs": [
        "In Angular, modules are a fundamental part of the application's architecture. They help organize code, manage dependencies, and enable lazy loading for better performance. This content explores the four key types of modules: Root, Feature, Shared, and Core."
    ],
    "keyPoints": [
        "Root Module: The main module that bootstraps the Angular application.",
        "Feature Modules: Encapsulate specific features or functionalities.",
        "Shared Modules: Contain reusable components, directives, and pipes.",
        "Core Modules: House singleton services and application-wide components."
    ],
    "sections": [
        {
            "id": "root-module",
            "heading": "Root Module",
            "content": "The Root Module, typically named AppModule, is the entry point of an Angular application. It is responsible for bootstrapping the root component (usually AppComponent) and declaring the application's top-level dependencies.",
            "list": [
                "Defined in app.module.ts",
                "Imports BrowserModule for browser-specific services",
                "Bootstraps the application using Angular's bootstrapModule function"
            ],
            "additionalExplanation": "The Root Module should be kept lightweight, focusing only on application-level configurations."
        },
        {
            "id": "feature-modules",
            "heading": "Feature Modules",
            "content": "Feature Modules organize code related to a specific feature or domain, such as user management or product catalog. They promote modularity and can be lazy-loaded to improve initial load times.",
            "list": [
                "Encapsulate components, services, and routes for a feature",
                "Imported into the Root Module or other modules as needed",
                "Support lazy loading via Angular's routing module"
            ],
            "additionalExplanation": "Using Feature Modules helps in scaling large applications by dividing them into manageable parts."
        },
        {
            "id": "shared-modules",
            "heading": "Shared Modules",
            "content": "Shared Modules contain components, directives, and pipes that are used across multiple Feature Modules. They prevent code duplication by exporting reusable elements.",
            "list": [
                "Exports common UI components like buttons or forms",
                "Imported by Feature Modules that need the shared elements",
                "Does not include services to avoid multiple instances"
            ],
            "additionalExplanation": "Services should not be provided in Shared Modules; instead, use Core Modules for singleton services."
        },
        {
            "id": "core-modules",
            "heading": "Core Modules",
            "content": "Core Modules are designed for application-wide singleton services, guards, interceptors, and components that are used only once, such as headers or footers.",
            "list": [
                "Imported only once in the Root Module",
                "Provides services with providedIn: 'root' or in the module's providers array",
                "Ensures single instances of services throughout the app"
            ],
            "additionalExplanation": "Loading the Core Module eagerly ensures that singleton services are available from the start."
        }
    ],
    "codeExamples": [
        {
            "title": "Root Module Example",
            "language": "typescript",
            "code": "import { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { AppComponent } from './app.component';\n\nimport { AppRoutingModule } from './app-routing.module';\nimport { CoreModule } from './core/core.module';\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule, AppRoutingModule, CoreModule],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }",
            "description": "This is a basic example of the AppModule, importing necessary modules and bootstrapping the app."
        },
        {
            "title": "Feature Module Example",
            "language": "typescript",
            "code": "import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { UserComponent } from './user.component';\nimport { UserRoutingModule } from './user-routing.module';\n\n@NgModule({\n  declarations: [UserComponent],\n  imports: [CommonModule, UserRoutingModule]\n})\nexport class UserModule { }",
            "description": "A simple Feature Module for user-related functionality."
        },
        {
            "title": "Shared Module Example",
            "language": "typescript",
            "code": "import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { CustomButtonComponent } from './custom-button.component';\n\n@NgModule({\n  declarations: [CustomButtonComponent],\n  imports: [CommonModule],\n  exports: [CustomButtonComponent]\n})\nexport class SharedModule { }",
            "description": "Exports a reusable button component for use in other modules."
        },
        {
            "title": "Core Module Example",
            "language": "typescript",
            "code": "import { NgModule, Optional, SkipSelf } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { AuthService } from './auth.service';\n\n@NgModule({\n  imports: [CommonModule],\n  providers: [AuthService]\n})\nexport class CoreModule {\n  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {\n    if (parentModule) {\n      throw new Error('CoreModule is already loaded. Import it in the AppModule only');\n    }\n  }\n}",
            "description": "Provides singleton services and guards against multiple imports."
        }
    ],
    "bestPractices": [
        "Keep the Root Module clean and import other modules as needed.",
        "Use lazy loading for Feature Modules to optimize performance.",
        "Export only what's necessary from Shared Modules.",
        "Ensure Core Modules are imported only once to maintain singletons.",
        "Follow the SCAM (Single Component Angular Module) pattern where appropriate for better tree-shaking."
    ]
}