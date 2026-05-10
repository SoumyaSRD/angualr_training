export const SERVICE_EG = {
    "title": "Angular Services: In-Depth Guide to Creation, Usage, Architecture, and Best Practices",
    "tags": ["Angular", "Services", "Dependency Injection", "Singleton", "Architecture", "Best Practices", "State Management"],
    "paragraphs": [
        "Services in Angular are singleton classes designed to encapsulate reusable business logic, data access, state management, and shared functionality across components, directives, and other services. They are one of the most important architectural building blocks in Angular applications. Services promote separation of concerns, improve testability, enable code reuse, and keep components focused on presentation and user interaction rather than complex logic. This comprehensive guide explores services in detail: what they are, how to create and register them, different use cases, scoped vs application-wide services, common patterns, integration with RxJS and modern Angular features (signals, standalone), and proven best practices to build clean, scalable, and maintainable Angular applications."
    ],
    "keyPoints": [
        "Services: Classes decorated with @Injectable() that handle logic, data fetching, business rules, and shared state.",
        "Dependency Injection: Services are almost always used via Angular's powerful DI system.",
        "providedIn: 'root' – The modern, recommended way to create application-wide singletons.",
        "Scoped Services: Created per component or module when isolation is needed.",
        "Common Responsibilities: HTTP communication, state management, authentication, logging, utilities, data sharing.",
        "RxJS Integration: Services are the natural place to handle Observables, Subjects, and async operations.",
        "Modern Angular: Services work seamlessly with standalone components, signals, and functional guards/interceptors."
    ],
    "sections": [
        {
            "id": "what-are-angular-services",
            "heading": "What Are Angular Services?",
            "content": "A service is a TypeScript class decorated with @Injectable() that is designed to be injectable via Angular's dependency injection system. Services are used to organize and share code across different parts of the application in a clean, reusable way.",
            "list": [
                "Encapsulate business logic, data access, and complex computations",
                "Act as a single source of truth for shared data or functionality",
                "Keep components lean and focused on UI concerns",
                "Improve testability by isolating logic from presentation",
                "Support both singleton (application-wide) and scoped (per-component) lifetime"
            ],
            "additionalExplanation": "The core philosophy is separation of concerns: components should handle rendering and user events, while services manage everything else — from API calls to caching, validation, formatting, authentication, and inter-component communication."
        },
        {
            "id": "creating-and-registering-services",
            "heading": "Creating and Registering Services",
            "content": "Services are created with the Angular CLI and registered using one of several strategies. The modern approach favors tree-shakable registration.",
            "list": [
                "ng generate service my-service → creates my-service.service.ts",
                "providedIn: 'root' — application-wide singleton (recommended)",
                "providedIn: 'platform' — shared across multiple Angular applications",
                "providedIn: 'any' — one instance per lazy-loaded module",
                "providedIn: SomeModule — scoped to a specific NgModule",
                "providers array in @Component / @Directive — scoped to that component hierarchy",
                "providers in bootstrapApplication() — for standalone applications"
            ],
            "additionalExplanation": "Since Angular 6, providedIn: 'root' is preferred over listing services in NgModule providers because it enables better tree-shaking and removes the risk of forgetting to register a service."
        },
        {
            "id": "common-use-cases-for-services",
            "heading": "Common Use Cases for Services",
            "content": "Services fulfill a wide range of responsibilities in real-world Angular applications.",
            "list": [
                "Data Services: Fetching and caching data via HttpClient",
                "Auth Services: Managing login, tokens, user state, guards",
                "State Services: Sharing data between unrelated components (without full NgRx)",
                "Utility Services: Formatting, validation, logging, notifications",
                "Business Logic Services: Complex calculations, rules engines",
                "API Services: Encapsulating backend communication patterns",
                "Theme / Config Services: Managing application-wide settings"
            ],
            "additionalExplanation": "A good rule of thumb: if logic is used in more than one place or is complex enough to test independently, it belongs in a service."
        },
        {
            "id": "services-with-rxjs",
            "heading": "Services + RxJS – The Power Combination",
            "content": "Angular services are the natural home for reactive programming patterns using RxJS.",
            "list": [
                "Exposing Observables for components to subscribe to",
                "Using BehaviorSubject / ReplaySubject for state sharing",
                "Combining API calls with operators (map, switchMap, catchError, shareReplay)",
                "Creating facades that simplify complex data flows",
                "Handling loading/error states in a consistent way"
            ],
            "additionalExplanation": "The async pipe + service pattern is extremely powerful: components stay clean and subscription management is automatic. Modern services often expose signals alongside or instead of Observables."
        },
        {
            "id": "modern-services-signals-standalone",
            "heading": "Modern Services: Signals, Standalone & Functional Patterns",
            "content": "With Angular 16+, services are evolving to leverage signals and work better in standalone applications.",
            "list": [
                "Using signal() / computed() / effect() inside services for reactive state",
                "Services as signal stores (lightweight state management)",
                "Functional interceptors, guards, and resolvers (no class needed)",
                "Inject() function for functional DI in standalone context",
                "toSignal() and toObservable() for interoperability"
            ],
            "additionalExplanation": "Signals in services provide fine-grained reactivity without zone.js overhead in zoneless mode (experimental in Angular 18+). They are simpler than Subjects for many use cases."
        }
    ],
    "codeExamples": [
        {
            "title": "Basic Data Service with providedIn: 'root'",
            "language": "typescript",
            "code": "import { Injectable } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class ProductService {\n  private apiUrl = 'https://api.example.com/products';\n\n  constructor(private http: HttpClient) {}\n\n  getProducts(): Observable<Product[]> {\n    return this.http.get<Product[]>(this.apiUrl);\n  }\n\n  getProduct(id: number): Observable<Product> {\n    return this.http.get<Product>(`${this.apiUrl}/${id}`);\n  }\n}",
            "description": "Typical data-fetching service using HttpClient."
        },
        {
            "title": "State Service with BehaviorSubject",
            "language": "typescript",
            "code": "import { Injectable } from '@angular/core';\nimport { BehaviorSubject } from 'rxjs';\n\nexport interface User { id: number; name: string; }\n\n@Injectable({ providedIn: 'root' })\nexport class UserStateService {\n  private userSubject = new BehaviorSubject<User | null>(null);\n  currentUser$ = this.userSubject.asObservable();\n\n  setUser(user: User) {\n    this.userSubject.next(user);\n  }\n\n  clearUser() {\n    this.userSubject.next(null);\n  }\n}",
            "description": "Simple shared state service using RxJS."
        },
        {
            "title": "Modern Signal-Based Service (Angular 16+)",
            "language": "typescript",
            "code": "import { Injectable, signal, computed } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CartService {\n  private items = signal<CartItem[]>([]);\n\n  cartItems = this.items.asReadonly();\n  total = computed(() =>\n    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)\n  );\n\n  addItem(item: CartItem) {\n    this.items.update(current => [...current, item]);\n  }\n\n  removeItem(id: number) {\n    this.items.update(current => current.filter(i => i.id !== id));\n  }\n}",
            "description": "Reactive cart service using Angular signals."
        },
        {
            "title": "Scoped Service (Component Level)",
            "language": "typescript",
            "code": "@Component({\n  selector: 'app-editor',\n  template: '...',\n  providers: [EditorStateService] // new instance per EditorComponent\n})\nexport class EditorComponent {\n  constructor(private editorState: EditorStateService) {}\n}",
            "description": "Service scoped to a specific component tree."
        }
    ],
    "bestPractices": [
        "Use providedIn: 'root' for most services unless you need scoped behavior.",
        "Keep services focused — one responsibility per service (Single Responsibility Principle).",
        "Name services clearly: Feature + Purpose (e.g., AuthService, ProductDataService).",
        "Expose Observables / signals, not Subjects directly — protect internal state.",
        "Use async pipe in templates instead of manual subscribe/unsubscribe.",
        "Centralize HTTP error handling and loading states in data services.",
        "Avoid putting presentation logic in services — keep it in components.",
        "Make services injectable in tests — mock them easily with TestBed.",
        "Use signals for simple state in new code; reserve Subjects for complex streams.",
        "Document public API of services (what they expose and how to use them).",
        "Consider facades when services become too large or complex."
    ]
}