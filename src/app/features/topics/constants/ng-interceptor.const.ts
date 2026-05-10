export const INTERCEPTOR = {
    "title": "Angular HTTP Interceptors: Complete Guide – Functional vs Class-Based, Use Cases, Examples & Best Practices (2025+)",
    "tags": ["Angular", "HTTP Interceptors", "HttpClient", "Functional Interceptors", "Auth Token", "Error Handling", "Logging", "Best Practices"],
    "paragraphs": [
        "HTTP Interceptors are middleware functions (or classes) in Angular's HttpClient that let you intercept and modify **every outgoing HTTP request** and/or **incoming HTTP response** in a centralized place. They are perfect for implementing cross-cutting concerns such as: adding authentication tokens, handling global errors, logging requests/responses, showing/hiding loaders, retrying failed requests, caching, modifying URLs, and more. Since Angular 15+ the **functional interceptor** style is the officially recommended approach because it is more predictable, tree-shakeable, and easier to reason about in complex dependency scenarios. This guide covers both styles, real-world patterns, common gotchas, and modern best practices."
    ],
    "keyPoints": [
        "Interceptors run for **every** HttpClient request (get, post, put, delete, etc.)",
        "Functional interceptors (preferred since ~v15): plain functions → provideHttpClient(withInterceptors([...]))",
        "Class-based interceptors (legacy/compatibility): implement HttpInterceptor → HTTP_INTERCEPTORS multi-provider",
        "Order matters: interceptors run in the order they are provided",
        "Chain pattern: call next.handle(modifiedReq) to continue the chain",
        "Common uses: Auth token injection, global error handling, request/response logging, loader management, API URL prefixing"
    ],
    "sections": [
        {
            "id": "what-are-http-interceptors",
            "heading": "What Are HTTP Interceptors?",
            "content": "An interceptor is middleware that sits between your application code and the backend server. It can read and modify the HttpRequest before it is sent, and/or read and modify the HttpResponse (or error) before it reaches your component/service.",
            "list": [
                "Intercept outgoing requests → add headers, change URL, clone request",
                "Intercept incoming responses → transform body, handle errors globally",
                "Intercept errors → retry, transform, log, redirect to login, show toast",
                "No need to repeat logic in every service → DRY principle"
            ],
            "additionalExplanation": "Interceptors are chainable — each one calls the next in line. The last in chain actually sends the request to the server."
        },
        {
            "id": "functional-interceptors",
            "heading": "Functional Interceptors – Modern & Recommended Style",
            "content": "Introduced in Angular 15 and strongly recommended in 2025+ (Angular 18–20 era). No class needed, just a function that receives req and next.",
            "list": [
                "Type: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => Observable<HttpEvent<unknown>>",
                "Registered via provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor]))",
                "Use inject() to get services inside the function",
                "Very predictable order and dependency resolution",
                "Better tree-shaking and no DI token conflicts in complex apps"
            ],
            "additionalExplanation": "Official Angular docs now favor functional interceptors. Class-based still work but are considered legacy for new code."
        },
        {
            "id": "class-based-interceptors",
            "heading": "Class-Based Interceptors – Legacy / DI Style",
            "content": "The classic style used in Angular 4.3 → 14. Still supported but not recommended for new projects.",
            "list": [
                "Implement HttpInterceptor interface",
                "Registered via { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }",
                "Constructor injection for services",
                "Can become unpredictable in lazy-loaded or multi-app scenarios"
            ],
            "additionalExplanation": "Use only when maintaining very old code or when you really need complex DI logic that inject() cannot easily handle."
        },
        {
            "id": "common-use-cases",
            "heading": "Most Common Real-World Use Cases",
            "content": "Interceptors solve repetitive cross-cutting concerns elegantly.",
            "list": [
                "Add Authorization: Bearer token to every request",
                "Global Error Handling: Catch 401 → logout, 500 → show toast",
                "Add API prefix: '/api/v1/' → full URL",
                "Logging: console.log every request/response in dev mode",
                "Show/Hide Loader: start spinner on request, stop on response/error",
                "Retry failed requests (with exponential backoff)",
                "Transform responses (camelCase → snake_case, etc.)"
            ],
            "additionalExplanation": "Most apps use 2–4 interceptors: auth + error + logging + loader."
        }
    ],
    "codeExamples": [
        {
            "title": "Functional Auth Interceptor – Add Bearer Token",
            "language": "typescript",
            "code": "import { HttpInterceptorFn } from '@angular/common/http';\nimport { inject } from '@angular/core';\nimport { AuthService } from './auth.service';\n\nexport const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const authService = inject(AuthService);\n  const token = authService.getToken();\n\n  if (token) {\n    const authReq = req.clone({\n      setHeaders: { Authorization: `Bearer ${token}` }\n    });\n    return next(authReq);\n  }\n\n  return next(req);\n};",
            "description": "Modern functional interceptor – adds token only when available."
        },
        {
            "title": "Register Functional Interceptors (app.config.ts)",
            "language": "typescript",
            "code": "import { ApplicationConfig } from '@angular/core';\nimport { provideHttpClient, withInterceptors } from '@angular/common/http';\nimport { authInterceptor, errorInterceptor } from './interceptors';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideHttpClient(\n      withInterceptors([authInterceptor, errorInterceptor])\n    )\n  ]\n};",
            "description": "How to register functional interceptors in standalone Angular app."
        },
        {
            "title": "Functional Error Handling Interceptor",
            "language": "typescript",
            "code": "import { HttpInterceptorFn } from '@angular/common/http';\nimport { catchError, throwError } from 'rxjs';\nimport { inject } from '@angular/core';\nimport { Router } from '@angular/router';\nimport { ToastrService } from 'ngx-toastr';\n\nexport const errorInterceptor: HttpInterceptorFn = (req, next) => {\n  const router = inject(Router);\n  const toastr = inject(ToastrService);\n\n  return next(req).pipe(\n    catchError(err => {\n      if (err.status === 401) {\n        toastr.error('Session expired. Please login again.');\n        router.navigate(['/login']);\n      } else if (err.status >= 500) {\n        toastr.error('Server error occurred. Try again later.');\n      }\n      return throwError(() => err);\n    })\n  );\n};",
            "description": "Global error handling with toast notifications and 401 redirect."
        },
        {
            "title": "Class-Based Interceptor (Legacy Style – for reference)",
            "language": "typescript",
            "code": "import { Injectable } from '@angular/core';\nimport { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';\nimport { Observable } from 'rxjs';\n\n@Injectable()\nexport class LegacyAuthInterceptor implements HttpInterceptor {\n  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n    const token = localStorage.getItem('token');\n    if (token) {\n      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });\n    }\n    return next.handle(req);\n  }\n}",
            "description": "Old class-based style – still works but not recommended for new code."
        }
    ],
    "bestPractices": [
        "Prefer **functional interceptors** in Angular 15+ / 2025+ projects",
        "Register interceptors in **app.config.ts** using provideHttpClient(withInterceptors([...]))",
        "Keep each interceptor focused on **one responsibility** (auth, error, logging, etc.)",
        "Always **clone** the request before modifying (req.clone({ ... }))",
        "Handle errors with **catchError** inside pipe() — never let them propagate unhandled",
        "Use **inject()** inside functional interceptors to get services",
        "Avoid heavy synchronous logic — interceptors should be fast",
        "Order matters: put auth before logging, error handling last in chain",
        "Combine with **retry**, **timeout**, **retryWhen** operators when needed",
        "Test interceptors independently using HttpClientTestingModule",
        "In production: disable logging / verbose interceptors",
        "For route-scoped behavior → consider withRequestsMadeViaParent() or separate HttpClient instances (advanced)"
    ]
}