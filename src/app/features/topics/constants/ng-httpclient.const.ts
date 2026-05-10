export const _HTTP_CLIENT = {
    "title": "Angular HttpClient: Complete Guide to API Calls – GET, POST, PUT, DELETE, Headers, Params, Interceptors, Error Handling & Best Practices",
    "tags": ["Angular", "HttpClient", "API Calls", "HTTP Requests", "Observables", "Error Handling", "Interceptors", "Typed Responses", "Best Practices"],
    "paragraphs": [
        "HttpClient is Angular's modern, powerful, and type-safe module for making HTTP requests to REST APIs. It returns Observables by default, integrates perfectly with RxJS operators, works seamlessly with interceptors, supports typed responses, and handles most real-world API scenarios elegantly. This guide covers everything you need: setup, all major HTTP methods, query params, headers, request body, error handling, retry logic, file upload/download, progress events, typed responses, interceptors integration, and proven patterns used in 2025+ Angular applications."
    ],
    "keyPoints": [
        "HttpClient returns Observable<HttpResponse<T>> or Observable<T> (with {observe: 'response'} or without)",
        "All requests are lazy → nothing happens until you .subscribe() or use async pipe",
        "Automatic JSON parsing (responseType: 'json' is default)",
        "Supports generics for strong typing → HttpClient.get<User>(url)",
        "Interceptors can add auth tokens, handle errors, show loaders globally",
        "Modern setup: provideHttpClient() in standalone applications",
        "Best companion: RxJS operators (catchError, retry, map, tap, switchMap, etc.)"
    ],
    "sections": [
        {
            "id": "setup-httpclient",
            "heading": "Setup & Configuration (Standalone & Module-based)",
            "content": "HttpClient is provided via provideHttpClient() in modern Angular apps.",
            "list": [
                "Standalone app → provideHttpClient() in app.config.ts",
                "With interceptors → provideHttpClient(withInterceptors([...]))",
                "With fetch backend (experimental) → provideHttpClient(withFetch())",
                "Legacy NgModule → import HttpClientModule"
            ],
            "additionalExplanation": "Since Angular 14–15+, standalone + provideHttpClient() is the standard."
        },
        {
            "id": "basic-get-request",
            "heading": "GET Request – Fetching Data",
            "content": "Most common operation — retrieve resources from API.",
            "list": [
                "Simple GET with typed response",
                "With query parameters (HttpParams)",
                "With headers",
                "With observe: 'response' to get full HttpResponse"
            ],
            "additionalExplanation": "Always type your response interface for safety."
        },
        {
            "id": "post-put-delete",
            "heading": "POST, PUT, DELETE – Sending Data",
            "content": "Used to create, update, and remove resources.",
            "list": [
                "POST → create new resource",
                "PUT → full update (replace)",
                "PATCH → partial update (not always supported)",
                "DELETE → remove resource"
            ],
            "additionalExplanation": "Most APIs return the created/updated entity → type it."
        },
        {
            "id": "error-handling-retry",
            "heading": "Error Handling & Retry Patterns",
            "content": "Always handle errors — never let them crash your app.",
            "list": [
                "catchError + throwError",
                "Global error handling via interceptor",
                "retry / retryWhen operators",
                "User-friendly messages + fallback values"
            ],
            "additionalExplanation": "Centralize error handling in services or interceptors."
        },
        {
            "id": "advanced-features",
            "heading": "Advanced HttpClient Features",
            "content": "HttpClient supports many powerful options.",
            "list": [
                "File upload (FormData + reportProgress)",
                "Download files (responseType: 'blob')",
                "Custom headers & params",
                "Timeout operator",
                "withCredentials for cookies/auth"
            ],
            "additionalExplanation": "Progress events are great for UX in large file uploads/downloads."
        }
    ],
    "codeExamples": [
        {
            "title": "Modern Setup – Standalone Application (app.config.ts)",
            "language": "typescript",
            "code": "import { ApplicationConfig } from '@angular/core';\nimport { provideHttpClient, withInterceptors } from '@angular/common/http';\nimport { authInterceptor, errorInterceptor } from './interceptors';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideHttpClient(\n      withInterceptors([authInterceptor, errorInterceptor])\n    )\n  ]\n};",
            "description": "Recommended way in Angular 17+ / 2025+"
        },
        {
            "title": "GET Request – Fetch List of Users (Typed)",
            "language": "typescript",
            "code": "import { HttpClient } from '@angular/common/http';\nimport { Injectable } from '@angular/core';\nimport { Observable, catchError, of } from 'rxjs';\n\nexport interface User { id: number; name: string; email: string; }\n\n@Injectable({ providedIn: 'root' })\nexport class UserService {\n  private apiUrl = 'https://api.example.com/users';\n\n  constructor(private http: HttpClient) {}\n\n  getUsers(): Observable<User[]> {\n    return this.http.get<User[]>(this.apiUrl).pipe(\n      catchError(err => {\n        console.error('Failed to load users', err);\n        return of([]); // fallback\n      })\n    );\n  }\n\n  getUser(id: number): Observable<User> {\n    return this.http.get<User>(`${this.apiUrl}/${id}`);\n  }\n}",
            "description": "Clean, typed GET with error fallback"
        },
        {
            "title": "POST + Query Params + Headers Example",
            "language": "typescript",
            "code": "createUser(user: Omit<User, 'id'>): Observable<User> {\n  const params = new HttpParams().set('role', 'admin');\n\n  return this.http.post<User>(this.apiUrl, user, {\n    params,\n    headers: { 'X-Custom-Header': 'my-value' }\n  });\n}",
            "description": "POST with query params and custom header"
        },
        {
            "title": "File Upload with Progress",
            "language": "typescript",
            "code": "uploadFile(file: File): Observable<{ progress: number; body?: any }> {\n  const formData = new FormData();\n  formData.append('file', file);\n\n  return this.http.post('/api/upload', formData, {\n    reportProgress: true,\n    observe: 'events'\n  }).pipe(\n    map(event => {\n      if (event.type === HttpEventType.UploadProgress) {\n        return { progress: Math.round(100 * event.loaded / event.total!) };\n      }\n      if (event.type === HttpEventType.Response) {\n        return { progress: 100, body: event.body };\n      }\n      return { progress: 0 };\n    })\n  );\n}",
            "description": "Upload with real-time progress tracking"
        },
        {
            "title": "Global Error Handling via Interceptor (functional)",
            "language": "typescript",
            "code": "export const errorInterceptor: HttpInterceptorFn = (req, next) => {\n  return next(req).pipe(\n    catchError(err => {\n      if (err.status === 401) {\n        // redirect to login\n      }\n      return throwError(() => err);\n    })\n  );\n};",
            "description": "Centralized error handling"
        }
    ],
    "bestPractices": [
        "Always **type your responses** → HttpClient.get<User[]>()",
        "Centralize API base URL + endpoints in environment or constant file",
        "Use **services** for all API calls — never call HttpClient directly from components",
        "Handle errors **everywhere** — at least catchError + user feedback",
        "Prefer **functional interceptors** for auth, logging, global errors",
        "Use **async pipe** in templates → automatic subscription cleanup",
        "Avoid nested .subscribe() — flatten with switchMap/mergeMap",
        "Set **timeout** on critical requests (timeout(15000))",
        "Use **shareReplay(1)** for data fetched once and reused (profile, config)",
        "For large lists → add pagination params + infinite scroll pattern",
        "Test API services with HttpClientTestingModule"
    ]
}