export const COMPONENT = {
    "title": "Angular Component Lifecycle, Change Detection, and Smart vs Dumb Components: In-Depth Explanation",
    "tags": ["Angular", "Component Lifecycle", "Change Detection", "Smart Components", "Dumb Components", "Architecture", "Best Practices"],
    "paragraphs": [
        "Angular components are the building blocks of applications, and understanding their lifecycle, change detection mechanisms, and architectural patterns like smart vs dumb components is crucial for building efficient, maintainable, and performant apps. This comprehensive guide explores these concepts in detail, providing explanations, examples, and best practices to help developers leverage them effectively. We'll cover the component lifecycle hooks, how Angular detects and propagates changes, and the distinction between smart (container) and dumb (presentational) components, including their roles, benefits, and implementation strategies."
    ],
    "keyPoints": [
        "Component Lifecycle: A series of hooks that Angular calls at specific points in a component's life, allowing developers to hook into initialization, updates, and destruction.",
        "Change Detection: Angular's mechanism to check for data changes and update the DOM accordingly, with strategies like Default and OnPush for optimization.",
        "Smart Components: Handle business logic, data fetching, and state management; often connected to services and pass data to dumb components.",
        "Dumb Components: Focus on presentation and UI; receive data via inputs and emit events via outputs, remaining stateless and reusable."
    ],
    "sections": [
        {
            "id": "component-lifecycle",
            "heading": "Component Lifecycle",
            "content": "The Angular component lifecycle consists of a sequence of phases from creation to destruction. Angular provides lifecycle hooks—methods that are called at specific times—allowing developers to perform actions like initializing data, responding to changes, or cleaning up resources. Understanding these hooks is essential for managing component behavior efficiently.",
            "list": [
                "ngOnChanges: Called when input properties change, before ngOnInit and on subsequent changes.",
                "ngOnInit: Invoked after the first ngOnChanges, ideal for initialization logic after inputs are set.",
                "ngDoCheck: Triggered during every change detection cycle, for custom change detection.",
                "ngAfterContentInit: Called after content projection (ng-content) is initialized.",
                "ngAfterContentChecked: Invoked after every check of projected content.",
                "ngAfterViewInit: Triggered after the component's view and child views are initialized.",
                "ngAfterViewChecked: Called after every check of the view and child views.",
                "ngOnDestroy: Executed just before the component is destroyed, perfect for cleanup like unsubscribing from observables."
            ],
            "additionalExplanation": "The lifecycle hooks are called in a predictable order, enabling precise control over component behavior. For example, avoid heavy computations in ngDoCheck to prevent performance issues, as it runs frequently. In standalone components (Angular 14+), lifecycle hooks work similarly but with potentially simpler dependency management."
        },
        {
            "id": "change-detection",
            "heading": "Change Detection",
            "content": "Change detection is Angular's way of keeping the UI in sync with the data model. It checks for changes in component properties and inputs, re-rendering the view when necessary. Angular uses a tree-based detection strategy, starting from the root component and propagating down.",
            "list": [
                "Default Strategy: Checks all components on every browser event (e.g., click, timer), suitable for small apps but can be inefficient in large ones.",
                "OnPush Strategy: Only checks when input references change, an @Output event is emitted from a child, or explicitly triggered via ChangeDetectorRef; optimizes performance by reducing unnecessary checks.",
                "Change Detection Triggers: Asynchronous operations like HTTP requests, timers, or events; can be manually triggered using detectChanges() or markForCheck().",
                "Zone.js Integration: Angular patches browser APIs to automatically trigger change detection on async events."
            ],
            "additionalExplanation": "To optimize, use OnPush where possible, especially in dumb components. Immutable data structures enhance OnPush efficiency since reference changes are easier to detect. Avoid mutating inputs directly; instead, create new objects or arrays. In complex apps, detaching change detection (detach()) and reattaching when needed can further improve performance."
        },
        {
            "id": "smart-vs-dumb-components",
            "heading": "Smart vs Dumb Components",
            "content": "The smart (container) vs dumb (presentational) component pattern is an architectural best practice in Angular (and React) for separating concerns. Smart components manage state and logic, while dumb components handle rendering, promoting reusability, testability, and maintainability.",
            "list": [
                "Smart Components: Also called containers; responsible for data fetching, business logic, and orchestration; use services, handle side effects, and pass data to dumb components via @Input.",
                "Dumb Components: Also called presentational; focus solely on UI; receive data via @Input, emit actions via @Output, and avoid dependencies on services or state management.",
                "Benefits of Separation: Easier testing (dumb components are pure functions), better reusability (dumb components can be shared across features), and clearer code organization.",
                "Implementation: Smart components often use OnPush change detection for performance, while dumb components can use Default if simple."
            ],
            "additionalExplanation": "In practice, smart components are typically higher in the component tree, composing multiple dumb components. For state management in smart components, integrate with NgRx or signals (Angular 16+). This pattern aligns with the single responsibility principle, making large applications more scalable. Avoid mixing concerns; if a component needs both logic and presentation, consider splitting it."
        }
    ],
    "codeExamples": [
        {
            "title": "Component Lifecycle Hooks Example",
            "language": "typescript",
            "code": "import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Input, SimpleChanges } from '@angular/core';\n\n@Component({\n  selector: 'app-lifecycle',\n  template: `<p>Lifecycle Demo</p>`,\n  standalone: true\n})\nexport class LifecycleComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {\n  @Input() data: string;\n\n  ngOnChanges(changes: SimpleChanges) { console.log('ngOnChanges', changes); }\n  ngOnInit() { console.log('ngOnInit'); }\n  ngDoCheck() { console.log('ngDoCheck'); }\n  ngAfterContentInit() { console.log('ngAfterContentInit'); }\n  ngAfterContentChecked() { console.log('ngAfterContentChecked'); }\n  ngAfterViewInit() { console.log('ngAfterViewInit'); }\n  ngAfterViewChecked() { console.log('ngAfterViewChecked'); }\n  ngOnDestroy() { console.log('ngOnDestroy'); }\n}",
            "description": "Implements all lifecycle hooks, logging their calls to demonstrate the order and timing."
        },
        {
            "title": "Change Detection with OnPush Example",
            "language": "typescript",
            "code": "import { Component, ChangeDetectionStrategy, Input } from '@angular/core';\n\n@Component({\n  selector: 'app-onpush',\n  template: `<p>{{ data }}</p>`,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  standalone: true\n})\nexport class OnPushComponent {\n  @Input() data: string;\n}",
            "description": "A component using OnPush strategy, which only updates when the input reference changes."
        },
        {
            "title": "Smart Component Example",
            "language": "typescript",
            "code": "import { Component, OnInit } from '@angular/core';\nimport { DataService } from './data.service';\nimport { CommonModule } from '@angular/common';\nimport { DumbComponent } from './dumb.component';\n\n@Component({\n  selector: 'app-smart',\n  template: `<app-dumb [items]=\"items\" (itemSelected)=\"onItemSelected($event)\"></app-dumb>`,\n  standalone: true,\n  imports: [CommonModule, DumbComponent]\n})\nexport class SmartComponent implements OnInit {\n  items: any[];\n\n  constructor(private dataService: DataService) {}\n\n  ngOnInit() {\n    this.dataService.getData().subscribe(data => this.items = data);\n  }\n\n  onItemSelected(item: any) {\n    console.log('Selected:', item);\n  }\n}",
            "description": "A smart component that fetches data from a service and passes it to a dumb component."
        },
        {
            "title": "Dumb Component Example",
            "language": "typescript",
            "code": "import { Component, Input, Output, EventEmitter } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-dumb',\n  template: `<ul><li *ngFor=\"let item of items\" (click)=\"selectItem(item)\">{{ item.name }}</li></ul>`,\n  standalone: true,\n  imports: [CommonModule]\n})\nexport class DumbComponent {\n  @Input() items: any[];\n  @Output() itemSelected = new EventEmitter<any>();\n\n  selectItem(item: any) {\n    this.itemSelected.emit(item);\n  }\n}",
            "description": "A dumb component that renders a list and emits events on selection, without any business logic."
        }
    ],
    "bestPractices": [
        "Use lifecycle hooks judiciously: Perform initialization in ngOnInit, cleanup in ngOnDestroy, and avoid heavy logic in frequently called hooks like ngDoCheck.",
        "Optimize change detection: Prefer OnPush for components with immutable data or infrequent updates; use ChangeDetectorRef for manual control in performance-critical areas.",
        "Adopt smart-dumb pattern: Keep dumb components pure and testable; centralize logic in smart components or services to enhance reusability and separation of concerns.",
        "Handle asynchronous data: Use RxJS operators in smart components for data streams, and ensure unsubscriptions to prevent memory leaks.",
        "Monitor performance: Use Angular DevTools to profile change detection cycles and identify bottlenecks; combine with lazy loading for larger apps.",
        "Leverage signals (Angular 16+): For reactive state in smart components, reducing reliance on change detection for fine-grained updates.",
        "Test thoroughly: Write unit tests for lifecycle methods, change detection behavior, and component interactions to ensure robustness."
    ]
}