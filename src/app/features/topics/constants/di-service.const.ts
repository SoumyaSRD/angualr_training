export const DI_SERVICE = {
    "title": "Angular Dependency Injection (DI): Complete Guide with Deep Explanation, Examples, and Best Practices",
    "tags": ["Angular", "Dependency Injection", "DI", "Providers", "Injectors", "Services", "Injection Tokens", "Best Practices", "Architecture"],
    "paragraphs": [
        "Dependency Injection (DI) is one of the most powerful and fundamental design patterns in Angular. It is the mechanism that Angular uses to provide and manage dependencies across your application in a clean, testable, and maintainable way. DI eliminates the need to manually create instances of services, components, or other objects, allowing Angular to handle instantiation, scoping, and lifecycle automatically. This comprehensive guide covers everything you need to know about Angular's dependency injection system: how it works, the injector hierarchy, provider types, injection tokens, hierarchical injectors, providedIn syntax, standalone components DI, advanced patterns, and best practices to build scalable, testable Angular applications."
    ],
    "keyPoints": [
        "Dependency Injection: A design pattern where dependencies are provided to a class instead of the class creating them itself.",
        "Injector Hierarchy: Angular creates a tree of injectors mirroring the component tree, enabling scoped and hierarchical dependency resolution.",
        "Providers: Define how to create and provide instances (useClass, useValue, useFactory, useExisting).",
        "providedIn: 'root' vs 'providedIn: SomeModule' vs providedIn: 'platform' vs providedIn: 'any'.",
        "Injection Tokens: Used to provide and inject non-class dependencies (constants, functions, configurations).",
        "Standalone DI: Modern Angular (14+) simplifies DI with direct imports and bootstrapApplication providers.",
        "Testing: DI makes unit testing extremely easy by allowing easy mocking of dependencies."
    ],
    "sections": [
        {
            "id": "what-is-dependency-injection",
            "heading": "What is Dependency Injection?",
            "content": "Dependency Injection is a technique in which an object receives its dependencies from an external source rather than creating them itself. In Angular, the DI system is responsible for creating instances of services, resolving their dependencies, and injecting them where needed — typically into constructors of components, directives, pipes, or other services.",
            "list": [
                "Promotes loose coupling between classes",
                "Makes code easier to test (mock dependencies)",
                "Centralizes configuration and instance management",
                "Enables reusability and modularity",
                "Automatically handles singleton vs transient behavior"
            ],
            "additionalExplanation": "Without DI, you would manually instantiate services inside components (new MyService()), leading to tight coupling, hard-to-test code, and duplicated creation logic. Angular's DI solves all of these problems elegantly."
        },
        {
            "id": "how-angular-di-works",
            "heading": "How Angular's Dependency Injection Works",
            "content": "Angular maintains a hierarchical tree of injectors that parallels the component tree. When a class requests a dependency via constructor injection, Angular looks for it first in the component's injector, then walks up the tree to parent injectors, all the way to the root injector.",
            "list": [
                "Root Injector: Created at application bootstrap, provides application-wide singletons",
                "Module Injectors: Each NgModule can have its own injector (providers array)",
                "Component Injectors: Every component and directive has its own injector",
                "Resolution Path: Child → Parent → Grandparent → ... → Root",
                "providedIn: 'root' = singleton at root level"
            ],
            "additionalExplanation": "This hierarchical system allows different parts of the app to have different instances of the same service (scoped DI) or share a single instance (singleton behavior)."
        },
        {
            "id": "providers-and-registration",
            "heading": "Providers – How to Register Dependencies",
            "content": "Providers tell Angular how to create and deliver an instance when a dependency is requested. They can be defined in @NgModule, @Component, @Directive, or via providedIn.",
            "list": [
                "useClass: Provide an alternative implementation (great for mocking)",
                "useValue: Provide a static value (configs, constants)",
                "useFactory: Dynamic creation logic (useful for conditional providers)",
                "useExisting: Alias one token to another",
                "providedIn: 'root' → application-wide singleton (most common)",
                "providedIn: 'platform' → shared across multiple Angular apps",
                "providedIn: 'any' → one instance per lazy-loaded module",
                "providedIn: SomeModule → scoped to that module"
            ],
            "additionalExplanation": "The providedIn syntax (introduced in Angular 6) is now the recommended way to register services because it enables tree-shaking and eliminates the need to add services to the providers array manually."
        },
        {
            "id": "injection-tokens",
            "heading": "Injection Tokens – Non-Class Dependencies",
            "content": "Not all dependencies are classes. For values, functions, or configurations, you use InjectionToken to create a unique token that can be provided and injected.",
            "list": [
                "const API_URL = new InjectionToken<string>('API_URL');",
                "Provide using { provide: API_URL, useValue: 'https://api.example.com' }",
                "Inject using @Inject(API_URL) private apiUrl: string",
                "Very useful for environment configs, themes, feature flags, etc."
            ],
            "additionalExplanation": "InjectionToken gives type safety and prevents naming collisions when providing primitive values or objects."
        },
        {
            "id": "standalone-components-di",
            "heading": "Dependency Injection in Standalone Components",
            "content": "In modern Angular (14+), standalone components and applications eliminate NgModules in many cases. DI is configured directly at bootstrap or via imports.",
            "list": [
                "bootstrapApplication(AppComponent, { providers: [...] })",
                "Environment providers: importProvidersFrom(), provideRouter(), provideHttpClient()",
                "Component-level providers still work: @Component({ providers: [...] })",
                "Services with providedIn: 'root' continue to work seamlessly"
            ],
            "additionalExplanation": "Standalone DI reduces boilerplate, improves tree-shaking, and aligns with the direction of modern Angular development."
        },
        {
            "id": "advanced-di-patterns",
            "heading": "Advanced DI Patterns and Techniques",
            "content": "Angular's DI system supports powerful patterns for complex applications.",
            "list": [
                "Multi providers: Provide multiple values under the same token (multi: true)",
                "Optional dependencies: @Optional() – doesn't throw if missing",
                "SkipSelf: @SkipSelf() – looks only in parent injectors",
                "Self: @Self() – looks only in own injector",
                "Host: @Host() – looks up to the host component injector",
                "Factory providers with dependencies: useFactory with deps array"
            ],
            "additionalExplanation": "These modifiers give fine-grained control over where Angular looks for dependencies — critical in deeply nested or library scenarios."
        }
    ],
    "codeExamples": [
        {
            "title": "Basic Service with providedIn: 'root'",
            "language": "typescript",
            "code": "import { Injectable } from '@angular/core';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class DataService {\n  getData() {\n    return ['Item 1', 'Item 2'];\n  }\n}",
            "description": "Most common and recommended way to create a singleton service."
        },
        {
            "title": "Component-Level Provider (Scoped Instance)",
            "language": "typescript",
            "code": "@Component({\n  selector: 'app-user',\n  template: '...',\n  providers: [UserService] // new instance for this component and children\n})\nexport class UserComponent {\n  constructor(private userService: UserService) {}\n}",
            "description": "Each instance of UserComponent gets its own UserService instance."
        },
        {
            "title": "Injection Token + useValue Example",
            "language": "typescript",
            "code": "import { InjectionToken } from '@angular/core';\n\nexport const APP_CONFIG = new InjectionToken<AppConfig>('AppConfig');\n\nexport interface AppConfig {\n  apiUrl: string;\n  timeout: number;\n}\n\n// In bootstrap or module providers:\n{ provide: APP_CONFIG, useValue: { apiUrl: 'https://api.com', timeout: 5000 } }\n\n// In component/service:\nconstructor(@Inject(APP_CONFIG) private config: AppConfig) {}",
            "description": "Safe, type-safe way to inject configuration objects."
        },
        {
            "title": "Standalone Application Bootstrap with Providers",
            "language": "typescript",
            "code": "import { bootstrapApplication } from '@angular/platform-browser';\nimport { provideRouter } from '@angular/router';\nimport { provideHttpClient } from '@angular/common/http';\nimport { AppComponent } from './app.component';\nimport { routes } from './app.routes';\n\nbootstrapApplication(AppComponent, {\n  providers: [\n    provideRouter(routes),\n    provideHttpClient(),\n    { provide: 'API_KEY', useValue: 'xyz123' }\n  ]\n});",
            "description": "Modern way to bootstrap a standalone Angular application with DI."
        }
    ],
    "bestPractices": [
        "Use providedIn: 'root' for most services that should be singletons.",
        "Use component-level providers only when you intentionally need scoped instances.",
        "Prefer InjectionToken for configurations, constants, and non-class dependencies.",
        "Avoid large provider arrays in components — prefer root or module-level when possible.",
        "Leverage @Optional(), @SkipSelf(), etc. only when needed and document their usage.",
        "Always provide mocks in unit tests using TestBed.configureTestingModule({ providers: [...] }).",
        "Use environment files + InjectionToken for different build configurations (dev, prod).",
        "Keep services small and focused — follow single responsibility principle.",
        "In standalone apps, centralize most providers at bootstrapApplication level.",
        "Monitor DI tree complexity in large apps — avoid deep unnecessary scoping."
    ]
}