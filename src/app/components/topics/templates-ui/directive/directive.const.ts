export const DIRECTIVE = {
  "title": "Angular Directives and Custom Directives: Comprehensive Explanation and Implementation Guide",
  "tags": ["Angular", "Directives", "Custom Directives", "Structural Directives", "Attribute Directives", "Architecture", "Best Practices"],
  "paragraphs": [
    "Directives in Angular are powerful tools that allow developers to extend HTML with custom behavior, manipulate the DOM, and create reusable UI logic. They are classified into built-in and custom directives, with custom ones enabling tailored functionality for specific application needs. This in-depth guide explores the fundamentals of directives, their types, how to create custom directives, and advanced usage scenarios. We'll delve into attribute directives for styling and behavior, structural directives for DOM manipulation, and best practices to ensure efficient, maintainable code. Whether you're a beginner or an experienced developer, this content provides detailed insights, code examples, and tips to make your Angular applications more dynamic and effective."
  ],
  "keyPoints": [
    "Directives: Instructions in the DOM that tell Angular to do something with a specific element or component.",
    "Built-in Directives: Include ngIf, ngFor, ngClass, ngStyle for common tasks like conditional rendering and styling.",
    "Custom Directives: User-defined directives to encapsulate reusable behavior, such as highlighting elements or validating inputs.",
    "Types: Attribute directives change appearance or behavior; Structural directives alter DOM layout by adding/removing elements.",
    "Lifecycle: Directives have hooks like ngOnInit and ngOnDestroy for initialization and cleanup.",
    "Standalone Directives: In Angular 14+, directives can be standalone, simplifying usage without modules."
  ],
  "sections": [
    {
      "id": "what-are-directives",
      "heading": "What Are Directives in Angular?",
      "content": "Directives are markers on DOM elements that Angular uses to attach behavior, transform the DOM, or render components. They are a core feature of Angular's declarative template syntax, allowing developers to create dynamic and interactive UIs without writing imperative JavaScript code directly in templates.",
      "list": [
        "Declared using the @Directive decorator",
        "Can be applied to elements, components, or even other directives",
        "Enhance HTML semantics, making templates more readable and maintainable",
        "Integrate seamlessly with Angular's change detection for automatic updates"
      ],
      "additionalExplanation": "Directives bridge the gap between static HTML and dynamic application logic. For instance, a directive might highlight an element on hover or lazy-load images based on viewport visibility. Understanding directives is key to mastering Angular's template-driven approach, as they promote reusability and separation of concerns."
    },
    {
      "id": "built-in-directives",
      "heading": "Built-in Directives",
      "content": "Angular provides a set of built-in directives out of the box, categorized into attribute and structural types. These handle common scenarios like conditional rendering, looping, and styling, reducing the need for custom implementations in basic cases.",
      "list": [
        "Attribute Directives: ngClass (conditional classes), ngStyle (inline styles), ngModel (two-way binding)",
        "Structural Directives: *ngIf (conditional display), *ngFor (looping over collections), *ngSwitch (switch-case logic)",
        "Other: [hidden] (toggle visibility), [attr] (dynamic attributes), [style] (dynamic styles)"
      ],
      "additionalExplanation": "Built-in directives are imported from CommonModule and can be used directly in templates. They are optimized for performance and integrate with Angular's renderer for safe DOM manipulation. For complex needs, built-in directives serve as a foundation for creating custom ones."
    },
    {
      "id": "custom-directives",
      "heading": "Custom Directives",
      "content": "Custom directives allow developers to create reusable behaviors not covered by built-in ones. They can respond to events, manipulate host elements, or inject dependencies, making them versatile for application-specific logic.",
      "list": [
        "Created with @Directive({ selector: '[appCustom]' })",
        "Can use @Input for data binding, @Output for events, @HostListener for event handling",
        "Support dependency injection via constructor for services",
        "Can be attribute-based (no template changes) or structural (with template manipulation)"
      ],
      "additionalExplanation": "Custom directives encapsulate logic that would otherwise clutter components, promoting cleaner code. For example, a custom directive could implement drag-and-drop functionality or auto-focus inputs. In larger applications, they enhance modularity by allowing behaviors to be applied declaratively across multiple components."
    },
    {
      "id": "attribute-vs-structural",
      "heading": "Attribute vs Structural Directives",
      "content": "Directives are broadly divided into attribute and structural types based on their impact on the DOM.",
      "list": [
        "Attribute Directives: Modify the appearance or behavior of an element without changing the DOM structure (e.g., changing color on hover).",
        "Structural Directives: Alter the DOM layout by adding, removing, or manipulating elements (e.g., conditionally rendering a section with *ngIf). Identified by a leading asterisk (*) in templates."
      ],
      "additionalExplanation": "Structural directives use TemplateRef and ViewContainerRef for DOM manipulation, allowing creation of embedded views. Attribute directives often use ElementRef or Renderer2 for safe access to the host element. Choosing the right type depends on whether you need to change 'what' is rendered (structural) or 'how' it's rendered (attribute)."
    },
    {
      "id": "lifecycle-and-advanced-features",
      "heading": "Lifecycle Hooks and Advanced Features",
      "content": "Custom directives inherit lifecycle hooks similar to components, enabling timed executions. Advanced features include host bindings and multi-element selectors.",
      "list": [
        "Lifecycle Hooks: ngOnChanges, ngOnInit, ngDoCheck, ngOnDestroy for managing state and resources.",
        "@HostBinding: Binds properties or classes to the host element (e.g., @HostBinding('style.backgroundColor') color: string;).",
        "@HostListener: Listens to host events (e.g., @HostListener('mouseenter') onMouseEnter() {}).",
        "Multi-Element Directives: Use selectors like '[appHighlight] p' to apply to multiple elements."
      ],
      "additionalExplanation": "Leverage hooks for initialization (e.g., setting up event listeners in ngOnInit) and cleanup (e.g., removing listeners in ngOnDestroy to prevent memory leaks). Advanced usage includes creating directive compositions or using them with Angular forms for custom validators."
    },
    {
      "id": "standalone-directives",
      "heading": "Standalone Directives",
      "content": "Introduced in Angular 14, standalone directives simplify usage by not requiring declaration in NgModules, aligning with the shift towards module-less architecture.",
      "list": [
        "Marked with standalone: true in @Directive",
        "Import dependencies directly in the imports array",
        "Easily shareable across standalone components or modules",
        "Enhance tree-shaking for smaller bundles"
      ],
      "additionalExplanation": "Standalone directives reduce boilerplate in modern Angular apps. They can be imported directly into components, making them ideal for libraries or micro-frontends. During migration, add standalone: true and move to direct imports."
    }
  ],
  "codeExamples": [
    {
      "title": "Basic Attribute Directive Example",
      "language": "typescript",
      "code": "import { Directive, ElementRef, HostListener } from '@angular/core';\n\n@Directive({\n  selector: '[appHighlight]',\n  standalone: true\n})\nexport class HighlightDirective {\n  constructor(private el: ElementRef) {}\n\n  @HostListener('mouseenter') onMouseEnter() {\n    this.highlight('yellow');\n  }\n\n  @HostListener('mouseleave') onMouseLeave() {\n    this.highlight(null);\n  }\n\n  private highlight(color: string | null) {\n    this.el.nativeElement.style.backgroundColor = color;\n  }\n}",
      "description": "A custom attribute directive that highlights the host element on mouse enter and removes it on leave."
    },
    {
      "title": "Structural Directive Example",
      "language": "typescript",
      "code": "import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';\n\n@Directive({\n  selector: '[appUnless]',\n  standalone: true\n})\nexport class UnlessDirective {\n  private hasView = false;\n\n  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}\n\n  @Input() set appUnless(condition: boolean) {\n    if (!condition && !this.hasView) {\n      this.viewContainer.createEmbeddedView(this.templateRef);\n      this.hasView = true;\n    } else if (condition && this.hasView) {\n      this.viewContainer.clear();\n      this.hasView = false;\n    }\n  }\n}",
      "description": "A custom structural directive that renders the template only if the condition is false, similar to the opposite of *ngIf."
    },
    {
      "title": "Directive with Input and HostBinding Example",
      "language": "typescript",
      "code": "import { Directive, HostBinding, Input } from '@angular/core';\n\n@Directive({\n  selector: '[appBorder]',\n  standalone: true\n})\nexport class BorderDirective {\n  @Input() appBorder: string = '1px solid black';\n\n  @HostBinding('style.border') get border() {\n    return this.appBorder;\n  }\n}",
      "description": "An attribute directive that applies a dynamic border style to the host element via input binding."
    },
    {
      "title": "Using Directives in Template Example",
      "language": "html",
      "code": "<div appHighlight>Hover me to highlight!</div>\n<p *appUnless=\"condition\">This shows if condition is false.</p>\n<button [appBorder]=\"'2px dashed red'\">Styled Button</button>",
      "description": "Template usage demonstrating application of custom directives."
    }
  ],
  "bestPractices": [
    "Keep directives focused: Follow the single responsibility principle; one directive per behavior.",
    "Use Renderer2 for DOM manipulation: Avoid direct ElementRef access for server-side rendering compatibility.",
    "Handle lifecycle properly: Always clean up in ngOnDestroy to prevent memory leaks, especially with subscriptions or event listeners.",
    "Prefer standalone directives: For new projects, use standalone to reduce module clutter and improve modularity.",
    "Test directives in isolation: Use Angular's testing utilities to verify behavior without full components.",
    "Document selectors and inputs: Clearly comment directive usage for team collaboration.",
    "Optimize for performance: Avoid expensive operations in frequently triggered hooks; leverage change detection strategies.",
    "Combine with other features: Integrate directives with pipes, services, or animations for richer functionality.",
    "Avoid overusing structural directives: They can impact performance; use attribute directives where possible for lighter DOM changes."
  ]
}