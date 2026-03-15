export const PIPE = {
  "title": "Angular Pipes: In-Depth Explanation, Built-in & Custom Pipes, Pure vs Impure, and Best Practices",
  "tags": ["Angular", "Pipes", "Custom Pipes", "Pure Pipes", "Impure Pipes", "Transformations", "Best Practices", "Performance"],
  "paragraphs": [
    "Pipes in Angular are simple yet extremely powerful tools for transforming displayed values right inside templates. They allow developers to format, filter, sort, or convert data declaratively without cluttering component logic or writing complex expressions in HTML. Pipes promote clean, readable templates and reusable transformation logic. This comprehensive guide covers everything about Angular pipes: how they work, built-in pipes, creating custom pipes, the critical difference between pure and impure pipes, performance considerations, and advanced usage patterns to help you write more maintainable and efficient Angular applications."
  ],
  "keyPoints": [
    "Pipes: Functions that transform values for display in templates using the | (pipe) operator.",
    "Built-in Pipes: Date, Currency, UpperCase, LowerCase, Decimal, Percent, Json, Async, Slice, TitleCase, and more.",
    "Custom Pipes: Developer-created pipes for application-specific transformations (e.g., formatting phone numbers, masking data).",
    "Pure vs Impure: Pure pipes run only when input reference changes (default, performant); impure pipes run on every change detection cycle.",
    "Chaining: Multiple pipes can be chained for sequential transformations.",
    "Standalone Pipes: In Angular 14+, pipes can be standalone, eliminating the need for NgModule declarations."
  ],
  "sections": [
    {
      "id": "what-are-pipes",
      "heading": "What Are Pipes in Angular?",
      "content": "Pipes are pure functions (by default) that take an input value and return a transformed output. They are applied directly in templates using the pipe operator (|), making data presentation logic declarative and easy to read. Pipes do not modify the original data — they only transform what is displayed.",
      "list": [
        "Syntax: {{ value | pipeName : arg1 : arg2 }}",
        "Can accept parameters and be chained: {{ value | pipe1 | pipe2: param }}",
        "Execute during change detection when the bound value changes",
        "Help keep components focused on business logic instead of formatting",
        "Support both synchronous and asynchronous values (especially with async pipe)"
      ],
      "additionalExplanation": "Pipes are one of Angular's most elegant features for keeping templates clean. Instead of writing complex expressions or calling component methods in templates (which can hurt performance), you delegate formatting to pipes. This improves readability, testability, and reusability across the application."
    },
    {
      "id": "built-in-pipes",
      "heading": "Built-in Pipes",
      "content": "Angular ships with a rich set of built-in pipes covering the most common formatting needs. These pipes are imported from CommonModule and ready to use in any template.",
      "list": [
        "DatePipe: Formats dates (short, medium, long, custom patterns)",
        "CurrencyPipe: Formats numbers as currency with symbol and decimal places",
        "DecimalPipe: Formats numbers with specific digits (before/after decimal)",
        "PercentPipe: Converts number to percentage",
        "UpperCasePipe / LowerCasePipe / TitleCasePipe: Changes text case",
        "JsonPipe: Pretty-prints objects for debugging",
        "AsyncPipe: Subscribes to Observables/Promises and returns latest value (unsubscribes automatically)",
        "SlicePipe: Extracts a portion of array or string",
        "KeyValuePipe: Iterates over object keys/values",
        "I18nSelectPipe / I18nPluralPipe: Handles internationalization and pluralization"
      ],
      "additionalExplanation": "The async pipe is particularly powerful — it handles subscription management and prevents memory leaks, making it a must-use with Observables in templates. Built-in pipes are pure by default and highly optimized."
    },
    {
      "id": "custom-pipes",
      "heading": "Creating Custom Pipes",
      "content": "When built-in pipes don't meet your needs, you create custom pipes. They follow the same pattern: implement the PipeTransform interface and decorate with @Pipe.",
      "list": [
        "Use @Pipe({ name: 'appCustom', pure: true })",
        "Implement transform(value: any, ...args: any[]): any",
        "Can be pure (default) or impure (pure: false)",
        "Support dependency injection (e.g., inject services for formatting rules)",
        "Standalone pipes (Angular 14+) use standalone: true and direct imports"
      ],
      "additionalExplanation": "Custom pipes are ideal for domain-specific formatting (phone numbers, credit card masking, file size conversion, status badges, etc.). They encapsulate transformation logic in one place, making it reusable across components and easy to maintain or unit test."
    },
    {
      "id": "pure-vs-impure",
      "heading": "Pure vs Impure Pipes – Performance & Behavior",
      "content": "The most important decision when creating a pipe is whether it should be pure or impure. This setting dramatically affects when the pipe executes and its performance impact.",
      "list": [
        "Pure Pipes (default, pure: true): Only re-execute when Angular detects a change in the input reference (primitive value change or object/array reference change). Extremely performant.",
        "Impure Pipes (pure: false): Execute on every change detection cycle — even if inputs haven't changed. Useful when the pipe depends on internal/external state or mutates input.",
        "When to use impure: When transforming mutable objects, using external data, or depending on time/current user settings.",
        "Performance warning: Impure pipes can cause significant overhead in large applications with frequent change detection cycles."
      ],
      "additionalExplanation": "Always prefer pure pipes whenever possible. Use immutable data patterns (create new objects/arrays) to trigger pure pipes correctly. Impure pipes should be used sparingly and only when truly necessary (e.g., a pipe that formats based on current locale or user role)."
    },
    {
      "id": "advanced-usage",
      "heading": "Advanced Pipe Usage and Patterns",
      "content": "Pipes become even more powerful when combined with other Angular features and used in creative ways.",
      "list": [
        "Chaining pipes: {{ user.name | uppercase | slice:0:10 }}",
        "Async pipe with fallback: {{ (user$ | async)?.name || 'Loading...' }}",
        "Pipes with ngFor: *ngFor=\"let item of items | filter:searchText\"",
        "Stateful pipes: Impure pipes can maintain internal state (rarely recommended)",
        "Testing pipes: Easy to unit test since they are pure functions (most cases)"
      ],
      "additionalExplanation": "Combining async pipe with map/filter operators (via rxjs) in templates can create powerful reactive displays without component code. Custom pipes can also be used in reactive forms validators or even in component logic (though template usage is preferred)."
    }
  ],
  "codeExamples": [
    {
      "title": "Built-in Pipes Usage Example",
      "language": "html",
      "code": "<p>Today: {{ today | date:'fullDate' }}</p>\n<p>Price: {{ price | currency:'USD':'symbol':'1.2-2' }}</p>\n<p>Percent: {{ ratio | percent:'1.1-1' }}</p>\n<p>JSON: {{ object | json }}</p>\n<p>Name: {{ name$ | async }}</p>",
      "description": "Common usage of built-in pipes for formatting dates, currency, percentages, debugging, and handling async data."
    },
    {
      "title": "Custom Pure Pipe – Phone Number Formatter",
      "language": "typescript",
      "code": "import { Pipe, PipeTransform } from '@angular/core';\n\n@Pipe({\n  name: 'phoneFormat',\n  standalone: true\n})\nexport class PhoneFormatPipe implements PipeTransform {\n  transform(value: string): string {\n    if (!value) return '';\n    const cleaned = value.replace(/\\D/g, '');\n    const match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);\n    if (match) {\n      return `(${match[1]}) ${match[2]}-${match[3]}`;\n    }\n    return value;\n  }\n}",
      "description": "A pure pipe that formats a 10-digit phone number into (XXX) XXX-XXXX style."
    },
    {
      "title": "Custom Impure Pipe – Filter by Search Term",
      "language": "typescript",
      "code": "import { Pipe, PipeTransform } from '@angular/core';\n\n@Pipe({\n  name: 'filterBy',\n  pure: false,\n  standalone: true\n})\nexport class FilterByPipe implements PipeTransform {\n  transform(items: any[], searchText: string): any[] {\n    if (!items || !searchText) return items;\n    searchText = searchText.toLowerCase();\n    return items.filter(item =>\n      JSON.stringify(item).toLowerCase().includes(searchText)\n    );\n  }\n}",
      "description": "An impure pipe that filters an array based on a search term. Impure because it needs to re-run when searchText changes but the items array reference stays the same."
    },
    {
      "title": "Using Custom Pipes in Template",
      "language": "html",
      "code": "<p>Phone: {{ user.phone | phoneFormat }}</p>\n<ul>\n  <li *ngFor=\"let item of items | filterBy:searchText\">\n    {{ item.name }}\n  </li>\n</ul>",
      "description": "Practical usage of custom pipes directly in templates."
    }
  ],
  "bestPractices": [
    "Always prefer pure pipes unless you have a strong reason to use impure.",
    "Avoid heavy computations in pipes — especially impure ones — as they can run frequently.",
    "Use async pipe for all Observables/Promises in templates to manage subscriptions automatically.",
    "Keep pipes focused on one transformation task (single responsibility).",
    "Create standalone pipes for modern Angular projects to reduce boilerplate.",
    "Unit test pipes thoroughly — they are easy to test as pure functions.",
    "Use immutable data patterns to make pure pipes work correctly and efficiently.",
    "Avoid calling component methods in templates; move logic to pipes when appropriate.",
    "Combine pipes with signals (Angular 16+) for even more reactive and performant templates.",
    "Document custom pipes clearly: name, purpose, parameters, and whether pure/impure."
  ]
}