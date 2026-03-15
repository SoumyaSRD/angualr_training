export const OBSERVABLE_PROMISE = {
    "title": "Observable vs Promise in Angular: Deep Comparison, Use Cases, Performance & Best Practices",
    "tags": ["Angular", "RxJS", "Observable", "Promise", "Async", "Reactive Programming", "Comparison", "Best Practices"],
    "paragraphs": [
        "Handling asynchronous operations is at the heart of modern web applications, especially in Angular. Two of the most common tools for managing async data are **Promise** (native JavaScript) and **Observable** (from RxJS). While both can represent values that arrive over time, they differ significantly in philosophy, capabilities, flexibility, and usage patterns. This in-depth guide compares Observables and Promises head-to-head: their core differences, lifecycle, cancellation, multiple values, error handling, operators, Angular integration (especially with async pipe), when to use which, real-world use cases, performance considerations, and best practices to help you write cleaner, more powerful, and maintainable Angular applications."
    ],
    "keyPoints": [
        "Promise: Represents a single future value (or error) — one-time operation.",
        "Observable: Represents a stream of values over time — can emit 0, 1, many, or infinite values.",
        "Lazy vs Eager: Promises start executing immediately; Observables are lazy (cold) by default.",
        "Cancellation: Promises cannot be cancelled; Observables support unsubscribe().",
        "Operators: Observables come with rich RxJS operators (map, filter, switchMap, debounceTime, etc.).",
        "Angular Integration: async pipe works natively with Observables, not Promises.",
        "Multiple Values: Observables shine for real-time data, user input, HTTP retries, websockets."
    ],
    "sections": [
        {
            "id": "core-differences",
            "heading": "Core Differences – Promise vs Observable",
            "content": "The fundamental design philosophies are very different.",
            "list": [
                "Values: Promise → exactly one value (or error), Observable → zero to infinite values",
                "Creation: new Promise((resolve, reject) => …), new Observable(subscriber => …)",
                "Execution: Promise executes immediately (eager), Observable waits for subscribe() (lazy/cold)",
                "Completion: Promise always completes (success or error), Observable can complete or never complete",
                "Cancellation: Promise — no native cancellation, Observable — unsubscribe() stops emissions",
                "Chaining: Promise — .then().catch(), Observable — pipe() with operators",
                "Multiple subscribers: Promise — result is cached after completion, Observable — unicast by default (cold), multicast possible"
            ],
            "additionalExplanation": "Think of Promise as 'I will give you one answer later'. Observable is 'I will keep sending you data whenever something happens — until you tell me to stop'."
        },
        {
            "id": "lifecycle-comparison",
            "heading": "Lifecycle & Behavior Comparison",
            "content": "Understanding the lifecycle helps decide which tool fits your use case.",
            "list": [
                "Promise: Pending → Fulfilled / Rejected (terminal states)",
                "Observable: Not started → Subscribed → Next (0..n) → Error / Complete (can be long-lived)",
                "Error handling: Promise — catch(), Observable — catchError() operator",
                "Finalization: Promise — no finally (use .then().catch().finally() in modern JS), Observable — finalize() operator",
                "Retry: Promise — manual retry logic, Observable — retry(), retryWhen() operators"
            ],
            "additionalExplanation": "Observables are ideal for long-lived or repeating sources (user typing, timers, websockets, mouse moves). Promises are better for one-shot operations (simple HTTP GET without retry)."
        },
        {
            "id": "cancellation",
            "heading": "Cancellation – A Major Differentiator",
            "content": "Cancellation is where Observables shine compared to Promises.",
            "list": [
                "Promise: No built-in cancellation → runs to completion even if component is destroyed",
                "Observable: unsubscribe() stops emissions, prevents memory leaks",
                "Angular async pipe: Automatically subscribes & unsubscribes Observables",
                "take(1), first(), takeUntil(destroy$) — common patterns to limit lifetime"
            ],
            "additionalExplanation": "In Angular, forgetting to unsubscribe from Observables used to cause memory leaks — today async pipe + takeUntil(destroy$) pattern solves this elegantly."
        },
        {
            "id": "angular-integration",
            "heading": "How Angular Loves Observables",
            "content": "Angular is built with Observables in mind (thanks to RxJS being deeply integrated).",
            "list": [
                "HttpClient returns Observable by default",
                "async pipe works natively with Observable (not Promise)",
                "Forms — valueChanges, statusChanges are Observables",
                "Router events, animations, event bindings — all Observables",
                "NgRx, signals interoperability, state management — all RxJS-based"
            ],
            "additionalExplanation": "Using async pipe + Observable is the idiomatic Angular way — clean templates, automatic subscription management, no manual unsubscribe."
        }
    ],
    "codeExamples": [
        {
            "title": "Promise – Simple One-Time Operation",
            "language": "typescript",
            "code": "getUser(id: number): Promise<User> {\n  return fetch(`/api/users/${id}`)\n    .then(res => {\n      if (!res.ok) throw new Error('Failed');\n      return res.json();\n    });\n}\n\n// Usage\ngetUser(123)\n  .then(user => console.log(user))\n  .catch(err => console.error(err));",
            "description": "Classic Promise pattern — single value or error."
        },
        {
            "title": "Observable – HttpClient (Angular way)",
            "language": "typescript",
            "code": "getUser(id: number): Observable<User> {\n  return this.http.get<User>(`/api/users/${id}`).pipe(\n    catchError(err => {\n      console.error(err);\n      return throwError(() => new Error('User fetch failed'));\n    })\n  );\n}\n\n// Template\n<ng-container *ngIf=\"user$ | async as user\">\n  {{ user.name }}\n</ng-container>",
            "description": "Angular idiomatic Observable with async pipe."
        },
        {
            "title": "Observable vs Promise – Cancellation",
            "language": "typescript",
            "code": "// Observable - cancellable\nthis.subscription = this.http.get('/data').subscribe(...);\n// later\nthis.subscription.unsubscribe();\n\n// Promise - no cancellation\nconst promise = fetch('/data');\n// no way to stop it",
            "description": "Demonstrates why Observables are better for component lifecycle management."
        },
        {
            "title": "Multiple Values – Observable shines",
            "language": "typescript",
            "code": "fromEvent(document, 'mousemove')\n  .pipe(\n    throttleTime(100),\n    map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))\n  )\n  .subscribe(pos => console.log('Mouse at:', pos));\n\n// Promise cannot handle continuous values",
            "description": "Observable naturally handles streams (events, timers, websockets)."
        }
    ],
    "bestPractices": [
        "Use Observables for almost everything in Angular (HttpClient, forms, events, state).",
        "Use async pipe whenever possible — prevents memory leaks automatically.",
        "Prefer Observables over Promises when you might need retry, debounce, throttle, switchMap, etc.",
        "Use Promise only for very simple, one-time, non-Angular APIs that return Promise.",
        "Convert Promise to Observable when needed: from(promise) or defer(() => from(promise)).",
        "Always clean up long-lived Observables: takeUntil(destroy$), take(1), first(), async pipe.",
        "Use shareReplay(1) or share() when multiple subscribers should get the same data.",
        "Avoid nested subscriptions — use operators (switchMap, mergeMap, concatMap, exhaustMap).",
        "Handle errors centrally with catchError() — show user-friendly messages.",
        "Modern Angular (16+): Consider signals + toObservable() / toSignal() for simpler state."
    ]
}