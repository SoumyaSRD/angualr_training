export const RXJS_SUBJECT = {
    "title": "RxJS Subjects in Angular: Complete Guide – Types, Behavior, Use Cases, Patterns & Best Practices",
    "tags": ["Angular", "RxJS", "Subjects", "BehaviorSubject", "ReplaySubject", "AsyncSubject", "Subject", "Multicasting", "State Management", "Best Practices"],
    "paragraphs": [
        "Subjects are a special type of Observable in RxJS that act both as an Observable (you can subscribe to them) and as an Observer (you can call .next(), .error(), .complete() on them). They are the foundation for multicasting, state sharing, and event broadcasting in Angular applications. Unlike plain Observables, Subjects allow multiple subscribers to receive the same values and enable manual emission of data. This in-depth guide explains all four main types of Subjects (Subject, BehaviorSubject, ReplaySubject, AsyncSubject), their differences in behavior, when and how to use them, common Angular patterns, memory management considerations, modern alternatives (signals), and proven best practices to avoid common pitfalls like memory leaks or unexpected behavior."
    ],
    "keyPoints": [
        "Subject: Basic multicast Observable — only emits values after subscription",
        "BehaviorSubject: Requires an initial value — new subscribers immediately receive the current (last) value",
        "ReplaySubject: Remembers and replays a buffer of previous values to new subscribers",
        "AsyncSubject: Emits only the last value when it completes (useful for 'final result' scenarios)",
        "Multicasting: All Subjects are multicast — multiple subscribers share the same execution",
        "Cold vs Hot: Plain Observables are cold (each subscriber gets fresh execution); Subjects are hot (shared execution)",
        "Angular Usage: State sharing, event buses, form value broadcasting, component communication"
    ],
    "sections": [
        {
            "id": "what-is-a-subject",
            "heading": "What is an RxJS Subject?",
            "content": "A Subject is both an Observable and an Observer. You can subscribe to it like any Observable, and you can push values into it using .next(). This dual nature makes Subjects ideal for sharing data across multiple parts of an application.",
            "list": [
                "Multicast by nature — all subscribers receive the same values",
                "Hot Observable — starts emitting only when .next() is called, regardless of subscribers",
                "Does NOT replay values to late subscribers (unless using ReplaySubject or BehaviorSubject)",
                "Can be manually completed or errored",
                "Requires explicit subscription management in Angular (or use async pipe)"
            ],
            "additionalExplanation": "Subjects are the bridge between imperative code (calling .next()) and reactive subscribers. They turn imperative events into reactive streams."
        },
        {
            "id": "types-of-subjects",
            "heading": "The Four Types of Subjects – Detailed Comparison",
            "content": "RxJS provides four main Subject variants with different replay and initial-value behaviors.",
            "list": [
                "Subject — No initial value, no replay. New subscribers only get future values.",
                "BehaviorSubject — Requires an initial value. New subscribers immediately get the current (latest) value.",
                "ReplaySubject(n) — Remembers the last n values. New subscribers get those n values immediately, then future ones.",
                "AsyncSubject — Emits only the last value, but only when .complete() is called."
            ],
            "additionalExplanation": "BehaviorSubject and ReplaySubject are by far the most commonly used in Angular applications."
        },
        {
            "id": "behavior-subject",
            "heading": "BehaviorSubject – Most Used in Angular",
            "content": "Represents state — always has a current value.",
            "list": [
                "new BehaviorSubject<T>(initialValue)",
                "Subscribers get current value immediately upon subscribe",
                ".next(value) updates the current value",
                ".value property gives current value synchronously",
                "Perfect for: user state, theme, settings, cart contents, feature flags"
            ],
            "additionalExplanation": "BehaviorSubject is the go-to for shared application state when you want new components to immediately get the current state."
        },
        {
            "id": "replay-subject",
            "heading": "ReplaySubject – For Late Subscribers",
            "content": "Remembers history of emissions.",
            "list": [
                "new ReplaySubject<T>(bufferSize?, windowTime?)",
                "ReplaySubject(1) ≈ BehaviorSubject but without mandatory initial value",
                "New subscribers receive the last N values (or all if bufferSize omitted)",
                "Useful for: logs, recent actions, last N search results"
            ],
            "additionalExplanation": "ReplaySubject(1) is often used when you want caching without forcing an initial value."
        },
        {
            "id": "subject-vs-behavior-vs-replay",
            "heading": "Subject vs BehaviorSubject vs ReplaySubject – Quick Decision Guide",
            "content": "Choosing the right Subject type is critical.",
            "list": [
                "Use plain Subject when: you only care about future events (clicks, notifications, real-time updates)",
                "Use BehaviorSubject when: you need current state immediately (user auth status, current page, app configuration)",
                "Use ReplaySubject(1) when: you want caching without initial value (last API response, recent errors)",
                "Use ReplaySubject(n) when: you need history (last 5 actions, recent notifications)",
                "Use AsyncSubject when: you only care about the final value after completion (e.g. computation result)"
            ],
            "additionalExplanation": "In Angular 90%+ of cases, you'll use BehaviorSubject or ReplaySubject(1)."
        },
        {
            "id": "common-patterns-angular",
            "heading": "Common Patterns Using Subjects in Angular",
            "content": "Subjects are frequently used for state sharing and event broadcasting.",
            "list": [
                "Global state service (BehaviorSubject)",
                "Component-to-component communication without parent-child relationship",
                "takeUntil(destroy$) pattern for cleanup",
                "Form value broadcasting to multiple components",
                "Loading / error state management",
                "Event bus (avoid overusing — prefer services + BehaviorSubject)"
            ],
            "additionalExplanation": "The most common pattern today is BehaviorSubject + asObservable() to hide the .next() method from consumers."
        }
    ],
    "codeExamples": [
        {
            "title": "BehaviorSubject – Typical State Service",
            "language": "typescript",
            "code": "import { Injectable } from '@angular/core';\nimport { BehaviorSubject } from 'rxjs';\n\nexport interface User { id: number; name: string; }\n\n@Injectable({ providedIn: 'root' })\nexport class AuthService {\n  private userSubject = new BehaviorSubject<User | null>(null);\n  currentUser$ = this.userSubject.asObservable();\n\n  get currentUserValue(): User | null {\n    return this.userSubject.value;\n  }\n\n  login(user: User) {\n    this.userSubject.next(user);\n  }\n\n  logout() {\n    this.userSubject.next(null);\n  }\n}",
            "description": "Standard auth/user state service using BehaviorSubject."
        },
        {
            "title": "ReplaySubject – Last N Actions",
            "language": "typescript",
            "code": "private actionHistory = new ReplaySubject<string>(5);\n\nlogAction(action: string) {\n  this.actionHistory.next(action);\n}\n\n// In component\nthis.actionHistory.subscribe(action => console.log('Recent action:', action));\n// New subscriber gets last 5 actions immediately",
            "description": "Keeps history of last 5 actions for new subscribers."
        },
        {
            "title": "takeUntil + Subject for Cleanup",
            "language": "typescript",
            "code": "private destroy$ = new Subject<void>();\n\nngOnInit() {\n  interval(1000)\n    .pipe(takeUntil(this.destroy$))\n    .subscribe(() => console.log('tick'));\n}\n\nngOnDestroy() {\n  this.destroy$.next();\n  this.destroy$.complete();\n}",
            "description": "Classic manual cleanup pattern (before async pipe dominance)."
        }
    ],
    "bestPractices": [
        "Always expose .asObservable() instead of the Subject directly — hide .next() from consumers.",
        "Prefer BehaviorSubject for most state management needs.",
        "Use ReplaySubject(1) when initial value is not required but caching is.",
        "Avoid plain Subject unless you intentionally want to ignore past values.",
        "Never expose Subject directly from services — breaks encapsulation.",
        "Use async pipe in templates with Subjects — automatic subscription management.",
        "Clean up long-lived Subjects with takeUntil(destroy$) or async pipe.",
        "Avoid using Subjects as a global event bus — prefer domain-specific services.",
        "Combine BehaviorSubject with shareReplay(1) when needed for cold → hot conversion.",
        "Modern Angular (16+): Consider signals instead of BehaviorSubject for simple local/component state.",
        "Document what each Subject represents and when/why it emits."
    ]
}