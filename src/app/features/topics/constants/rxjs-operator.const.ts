export const RXJS_OPERATOR = {
    "title": "RxJS Operators in Angular: Complete In-Depth Guide – Categories, Most Important Operators, Examples & Best Practices",
    "tags": ["Angular", "RxJS", "Operators", "Reactive Programming", "Transformation", "Filtering", "Combination", "Error Handling", "Utility", "Best Practices"],
    "paragraphs": [
        "RxJS operators are the heart of reactive programming in Angular. They allow you to transform, filter, combine, handle errors, and manage streams of data (Observables) in a clean, declarative, and powerful way. Operators are pure functions that take an Observable as input, modify its behavior or data, and return a new Observable. This comprehensive guide covers the most important RxJS operators grouped by category: transformation, filtering, combination, multicasting, error handling, utility, conditional, and mathematical. You'll find detailed explanations, real-world Angular use cases, common patterns, pitfalls, and best practices to help you write efficient, readable, and maintainable reactive code."
    ],
    "keyPoints": [
        "Operators are chained using .pipe()",
        "Most operators are pure — they do not mutate the source Observable",
        "Categories: Transformation (map, pluck), Filtering (filter, debounceTime), Combination (mergeMap, switchMap), Multicasting (shareReplay), Error Handling (catchError, retry), Utility (tap, finalize)",
        "Higher-order mapping operators: mergeMap, concatMap, switchMap, exhaustMap — critical for Angular HTTP and async operations",
        "Angular loves RxJS: HttpClient, forms valueChanges, router events, async pipe — all built around Observables and operators"
    ],
    "sections": [
        {
            "id": "transformation-operators",
            "heading": "Transformation Operators",
            "content": "Change the data emitted by the Observable.",
            "list": [
                "map: Transforms each value (like Array.map)",
                "pluck: Extracts a property from objects (deprecated → use map)",
                "mapTo: Maps every value to a constant",
                "mergeMap / flatMap: Projects each value to an Observable and flattens (concurrent)",
                "switchMap: Cancels previous inner Observable, switches to new one (most common in Angular)",
                "concatMap: Queues inner Observables, waits for completion (ordered)",
                "exhaustMap: Ignores new values while inner Observable is active (e.g. click spam protection)",
                "scan: Accumulates values like reduce over time"
            ],
            "additionalExplanation": "Higher-order mapping operators (mergeMap family) are the most important and most misused in Angular — choosing the right one prevents memory leaks and race conditions."
        },
        {
            "id": "filtering-operators",
            "heading": "Filtering Operators",
            "content": "Decide which values should pass through.",
            "list": [
                "filter: Only emit values that match condition",
                "distinctUntilChanged: Skip duplicate consecutive values",
                "debounceTime: Wait for silence before emitting (search input)",
                "throttleTime: Emit first value, then ignore for duration",
                "take(n): Take first n values then complete",
                "takeUntil(notifier): Complete when notifier emits",
                "skip(n): Skip first n values",
                "ignoreElements: Ignore all next emissions, only complete/error"
            ],
            "additionalExplanation": "debounceTime + distinctUntilChanged is the classic combo for search/autocomplete inputs."
        },
        {
            "id": "combination-operators",
            "heading": "Combination / Joining Operators",
            "content": "Combine multiple Observables.",
            "list": [
                "combineLatest: Emit when any source emits (latest values)",
                "withLatestFrom: Pair with latest value from another source",
                "forkJoin: Wait for all Observables to complete (like Promise.all)",
                "merge: Merge emissions from multiple sources concurrently",
                "concat: Concatenate Observables sequentially",
                "zip: Pair values from multiple sources by index",
                "race: Emit from the first Observable that emits"
            ],
            "additionalExplanation": "forkJoin is perfect for loading multiple independent API calls at once."
        },
        {
            "id": "multicasting-operators",
            "heading": "Multicasting & Sharing Operators",
            "content": "Share a single execution among multiple subscribers.",
            "list": [
                "share: Multicast with no replay",
                "shareReplay(bufferSize, windowTime): Replay last N values to late subscribers",
                "publish + refCount: Manual multicast (rarely used directly)",
                "multicast + refCount: Low-level control"
            ],
            "additionalExplanation": "shareReplay(1) is the go-to for caching HTTP responses or shared state."
        },
        {
            "id": "error-handling-retry",
            "heading": "Error Handling & Retry Operators",
            "content": "Manage errors and retries gracefully.",
            "list": [
                "catchError: Catch and recover from errors",
                "retry(n): Retry n times on error",
                "retryWhen: Advanced retry logic (delay, exponential backoff)",
                "finalize: Run code on complete or error (cleanup)"
            ],
            "additionalExplanation": "Always use catchError in Angular services — never let errors reach the template."
        },
        {
            "id": "utility-debugging",
            "heading": "Utility & Debugging Operators",
            "content": "Side effects, logging, debugging.",
            "list": [
                "tap: Perform side effects (logging, analytics) without changing value",
                "finalize: Cleanup regardless of complete/error",
                "delay: Delay emissions",
                "timeout: Throw error if no value within time"
            ],
            "additionalExplanation": "tap is used for debugging and side effects — never put business logic in tap."
        }
    ],
    "codeExamples": [
        {
            "title": "switchMap – Most Common Angular Pattern",
            "language": "typescript",
            "code": "this.searchTerm$.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap(term => this.http.get<User[]>(`/api/users?q=${term}`))\n).subscribe(results => this.results = results);",
            "description": "Search input → debounce → cancel previous request → new search (prevents race conditions)."
        },
        {
            "title": "forkJoin – Parallel API Calls",
            "language": "typescript",
            "code": "forkJoin({\n  user: this.http.get<User>('/api/user'),\n  posts: this.http.get<Post[]>('/api/posts'),\n  settings: this.http.get<Settings>('/api/settings')\n}).subscribe(({ user, posts, settings }) => {\n  // all completed\n});",
            "description": "Load multiple independent resources at once."
        },
        {
            "title": "shareReplay – Cache HTTP Response",
            "language": "typescript",
            "code": "private products$ = this.http.get<Product[]>('/api/products').pipe(\n  shareReplay(1)\n);\n\n// Multiple components can subscribe without new HTTP calls\nthis.products$.subscribe(...);",
            "description": "Single HTTP call, cached result for all subscribers."
        },
        {
            "title": "takeUntil + destroy$ pattern",
            "language": "typescript",
            "code": "private destroy$ = new Subject<void>();\n\nngOnInit() {\n  this.data$.pipe(\n    takeUntil(this.destroy$)\n  ).subscribe(...);\n}\n\nngOnDestroy() {\n  this.destroy$.next();\n  this.destroy$.complete();\n}",
            "description": "Safe cleanup pattern (before async pipe became dominant)."
        }
    ],
    "bestPractices": [
        "Always use .pipe() to chain operators — improves readability and type safety.",
        "Prefer switchMap for search/autocomplete/API calls — cancels outdated requests.",
        "Use concatMap when order matters (sequential operations).",
        "Use exhaustMap for click handlers where you want to ignore new clicks during processing.",
        "Never forget catchError in data services — handle errors gracefully.",
        "Use shareReplay(1) or shareReplay({ bufferSize: 1, refCount: true }) for caching.",
        "Avoid nested subscribe — flatten with mergeMap/switchMap/etc.",
        "Use async pipe in templates — automatic subscribe/unsubscribe.",
        "Combine takeUntil(destroy$) or take(1) for manual subscriptions (legacy code).",
        "Debug with tap() + console.log — but remove before production.",
        "Learn the marble diagrams — they explain operator behavior perfectly.",
        "Modern Angular (16+): Combine RxJS with signals when appropriate (toSignal, toObservable)."
    ]
}