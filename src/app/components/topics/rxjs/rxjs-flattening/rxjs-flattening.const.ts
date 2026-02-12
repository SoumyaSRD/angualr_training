export const RXJS_FLATTENING = {
    "title": "RxJS Higher-Order Operators Deep Dive: mergeMap, switchMap, concatMap, exhaustMap, combineLatest & forkJoin",
    "tags": ["RxJS", "Angular", "mergeMap", "switchMap", "concatMap", "exhaustMap", "combineLatest", "forkJoin", "Higher-Order Operators", "Reactive Programming"],
    "paragraphs": [
        "Higher-order mapping operators are among the most powerful — and most frequently misunderstood — tools in RxJS. They allow you to map each value from a source Observable to a new inner Observable, and then decide how to combine/flatten the emissions from those inner Observables. Choosing the right one dramatically affects performance, memory usage, race conditions, and correctness of your application. This guide explains mergeMap, switchMap, concatMap, exhaustMap, combineLatest, and forkJoin in depth: how they behave, when to use each, real Angular use cases, marble diagrams intuition, common pitfalls, and best practices."
    ],
    "keyPoints": [
        "mergeMap → runs all inner Observables concurrently, no cancellation",
        "switchMap → cancels previous inner Observable, only latest one matters",
        "concatMap → queues inner Observables, preserves order, waits for completion",
        "exhaustMap → ignores new values while inner Observable is active",
        "combineLatest → emits when ANY source emits, combines latest values",
        "forkJoin → waits for ALL Observables to complete, emits once with all results"
    ],
    "sections": [
        {
            "id": "mergeMap",
            "heading": "mergeMap (also known as flatMap)",
            "content": "Projects each source value to an Observable and merges all emissions concurrently.",
            "list": [
                "No cancellation of previous inner Observables",
                "All inner Observables run in parallel",
                "Emits values as soon as any inner Observable emits",
                "Can produce many concurrent subscriptions",
                "Memory leak risk if inner Observables never complete"
            ],
            "additionalExplanation": "Use when you want every request/action to complete independently (parallel execution, no cancellation needed). Less common in modern Angular than switchMap."
        },
        {
            "id": "switchMap",
            "heading": "switchMap – The Most Used in Angular",
            "content": "Maps to inner Observable and switches to the new one, cancelling the previous inner subscription.",
            "list": [
                "Cancels previous inner Observable when new source value arrives",
                "Only the latest inner Observable matters",
                "Prevents race conditions",
                "Ideal for search, type-ahead, dependent API calls, user input → HTTP"
            ],
            "additionalExplanation": "switchMap is the go-to operator for most user-triggered async operations in Angular — it ensures you always get the result of the latest action."
        },
        {
            "id": "concatMap",
            "heading": "concatMap",
            "content": "Maps to inner Observable and queues them — processes one at a time, in order.",
            "list": [
                "Waits for previous inner Observable to complete before starting next",
                "Preserves order of emissions",
                "No concurrency — safe but can feel slow",
                "Good when order matters and you cannot lose requests"
            ],
            "additionalExplanation": "Use when sequence is important (e.g., save operations that must happen in order)."
        },
        {
            "id": "exhaustMap",
            "heading": "exhaustMap",
            "content": "Maps to inner Observable, but ignores new source values while inner is active.",
            "list": [
                "Only one inner Observable runs at a time",
                "New values are dropped until current inner completes",
                "Prevents overlapping / spam (great for button clicks)",
                "Common use: 'Submit' button while request is processing"
            ],
            "additionalExplanation": "exhaustMap protects against rapid repeated actions — the first action wins, others are ignored until it finishes."
        },
        {
            "id": "combineLatest",
            "heading": "combineLatest",
            "content": "Combines multiple Observables — emits whenever ANY of them emits, using the latest value from each.",
            "list": [
                "Requires all sources to have emitted at least once",
                "Emits on every change of any source",
                "Great for reactive forms with multiple dependent fields",
                "Can be memory-intensive if sources emit very frequently"
            ],
            "additionalExplanation": "Classic use case: combine form control values or multiple API states."
        },
        {
            "id": "forkJoin",
            "heading": "forkJoin",
            "content": "Waits for ALL Observables to complete, then emits once with an array/object of last values.",
            "list": [
                "Like Promise.all for Observables",
                "Only emits when every source completes",
                "If any source errors → whole forkJoin errors",
                "Perfect for loading independent data in parallel"
            ],
            "additionalExplanation": "Very common in Angular for loading user profile + roles + settings at once."
        }
    ],
    "codeExamples": [
        {
            "title": "switchMap – Search / Type-ahead (most common pattern)",
            "language": "typescript",
            "code": "this.searchTerm$.pipe(\n  debounceTime(350),\n  distinctUntilChanged(),\n  switchMap(term => \n    this.http.get<SearchResult[]>(`/api/search?q=${term}`).pipe(\n      catchError(() => of([]))\n    )\n  )\n).subscribe(results => this.results = results);",
            "description": "Latest search term cancels previous request → no race conditions"
        },
        {
            "title": "concatMap – Ordered sequential saves",
            "language": "typescript",
            "code": "this.form.valueChanges.pipe(\n  concatMap(value => this.http.post('/api/save', value))\n).subscribe(response => console.log('Saved:', response));",
            "description": "Each change is saved only after the previous save completes"
        },
        {
            "title": "exhaustMap – Prevent button spam",
            "language": "typescript",
            "code": "fromEvent(this.submitButton, 'click').pipe(\n  exhaustMap(() => this.http.post('/api/submit', this.form.value))\n).subscribe(...);",
            "description": "While submit is in progress, additional clicks are ignored"
        },
        {
            "title": "forkJoin – Load multiple independent resources",
            "language": "typescript",
            "code": "forkJoin({\n  user: this.userService.getCurrentUser(),\n  permissions: this.authService.getPermissions(),\n  config: this.configService.getAppConfig()\n}).subscribe(results => {\n  this.user = results.user;\n  this.permissions = results.permissions;\n});",
            "description": "Waits for all to finish, emits once"
        },
        {
            "title": "combineLatest – React to multiple form controls",
            "language": "typescript",
            "code": "combineLatest([\n  this.form.get('startDate')!.valueChanges,\n  this.form.get('endDate')!.valueChanges\n]).pipe(\n  filter(([start, end]) => !!start && !!end),\n  switchMap(([start, end]) => this.http.get<Report>(`/report?start=${start}&end=${end}`))\n).subscribe(report => this.report = report);",
            "description": "Re-runs query whenever either date changes"
        }
    ],
    "bestPractices": [
        "Use **switchMap** for most user-triggered async operations (search, filter, route params → data load)",
        "Use **concatMap** when order is important and you cannot afford to drop requests",
        "Use **exhaustMap** to protect against rapid repeated user actions (clicks, submits)",
        "Use **mergeMap** only when you really want all inner Observables to run in parallel without cancellation",
        "Always put **catchError** inside the inner observable in mapping operators",
        "Prefer **combineLatestWith** or **combineLatest** when combining 2–5 streams",
        "Use **forkJoin** when you need all data before proceeding (initial page load)",
        "Avoid mergeMap without limits — can create many concurrent HTTP calls",
        "Combine higher-order operators with **debounceTime**, **distinctUntilChanged**, **takeUntil**",
        "Modern Angular: Consider signals + toObservable() when simple mapping is enough"
    ]
}