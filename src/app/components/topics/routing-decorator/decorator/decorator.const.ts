export const DECORATOR = {
    "title": "Angular Decorators: In-Depth Explanation, Types, Usage, Custom Decorators, and Best Practices",
    "tags": ["Angular", "Decorators", "TypeScript", "Metadata", "Component", "Directive", "Pipe", "Injectable", "Custom Decorators", "Best Practices"],
    "paragraphs": [
        "Decorators are a core feature of Angular and one of the most powerful capabilities borrowed from TypeScript. They are special kind of declarations that can attach metadata to classes, methods, properties, parameters, or accessors, and Angular uses them extensively to define components, directives, pipes, services, modules, and more. Decorators allow Angular to collect configuration information at design time and use it at runtime to control behavior, dependency injection, change detection, and rendering. This comprehensive guide explains decorators in detail: how they work, all the built-in Angular decorators, how to create custom decorators, parameter decorators, property decorators, method decorators, advanced patterns, and best practices for writing clean, maintainable, and powerful Angular applications."
    ],
    "keyPoints": [
        "Decorators: Functions that add metadata and modify behavior of classes/methods/properties.",
        "Built-in Angular Decorators: @Component, @Directive, @Pipe, @Injectable, @NgModule, @Input, @Output, @HostListener, @HostBinding, etc.",
        "Class Decorators: Modify or observe the class definition (most common in Angular).",
        "Property & Parameter Decorators: Used for inputs, injections, bindings (@Input, @Inject, @Optional).",
        "Method Decorators: Used for event handling (@HostListener).",
        "Custom Decorators: Create reusable behavior for validation, logging, authorization, etc.",
        "Metadata Reflection: Angular uses reflect-metadata to read decorator information at runtime."
    ],
    "sections": [
        {
            "id": "what-are-decorators",
            "heading": "What Are Decorators in Angular / TypeScript?",
            "content": "Decorators are a TypeScript feature (enabled with experimentalDecorators) that allow you to attach metadata to classes, methods, properties, or parameters using a special syntax (@expression). In Angular, decorators are the primary way to tell the framework how to process and use your classes.",
            "list": [
                "Executed at runtime when the class is defined (not when instantiated)",
                "Can modify the constructor, add metadata, or wrap behavior",
                "Angular reads decorator metadata using reflect-metadata library",
                "Syntax: @DecoratorName(options) or @DecoratorName",
                "Can be stacked (multiple decorators on the same target)"
            ],
            "additionalExplanation": "Without decorators, Angular would require much more boilerplate (manual registration, explicit configuration). Decorators make Angular declarative and expressive — you describe what something is, and Angular handles how it behaves."
        },
        {
            "id": "how-decorators-work",
            "heading": "How Decorators Work Under the Hood",
            "content": "Decorators are functions that receive specific arguments depending on what they decorate (class, property, method, parameter). They are called at definition time and can return a value to replace or modify the target.",
            "list": [
                "Class decorator receives the constructor function",
                "Property decorator receives target and property name",
                "Method decorator receives target, property name, and descriptor",
                "Parameter decorator receives target, property name, and parameter index",
                "Angular stores metadata using Reflect.defineMetadata()"
            ],
            "additionalExplanation": "The reflect-metadata polyfill is required (included by default in Angular CLI projects). Angular's compiler uses this metadata to generate efficient rendering instructions, DI tokens, and more."
        },
        {
            "id": "built-in-angular-decorators",
            "heading": "Built-in Angular Decorators",
            "content": "Angular provides a rich set of decorators for defining building blocks and configuring behavior.",
            "list": [
                "@Component — Defines a component with template, styles, selector, etc.",
                "@Directive — Defines attribute or structural directives",
                "@Pipe — Defines custom pipes (pure/impure)",
                "@Injectable — Marks a class as injectable (provides DI metadata)",
                "@NgModule — Defines Angular modules (deprecated in favor of standalone)",
                "@Input — Binds property to parent input",
                "@Output — Creates an event emitter for parent communication",
                "@HostListener — Listens to host element events",
                "@HostBinding — Binds host element properties/attributes",
                "@ViewChild / @ViewChildren — Queries view DOM",
                "@ContentChild / @ContentChildren — Queries projected content",
                "@Optional, @SkipSelf, @Self, @Inject — Fine-tune dependency injection"
            ],
            "additionalExplanation": "These decorators are the language Angular uses to describe your application's structure and behavior."
        },
        {
            "id": "custom-decorators",
            "heading": "Creating Custom Decorators",
            "content": "You can create your own decorators to encapsulate reusable behavior, such as logging, validation, authorization checks, or metadata collection.",
            "list": [
                "Class decorator: function MyDecorator(config) { return function (constructor) {...} }",
                "Property decorator: function LogProperty(target, propertyKey) {...}",
                "Method decorator: function LogMethod(target, propertyKey, descriptor) {...}",
                "Parameter decorator: function LogParameter(target, propertyKey, parameterIndex) {...}",
                "Factory pattern: function MyDecorator(options) { return function(target) {...} }"
            ],
            "additionalExplanation": "Custom decorators are especially useful in libraries, enterprise applications, or when enforcing conventions (e.g., @LogExecutionTime, @Authorize, @Deprecated)."
        },
        {
            "id": "advanced-decorator-patterns",
            "heading": "Advanced Decorator Patterns & Use Cases",
            "content": "Decorators become even more powerful when combined creatively.",
            "list": [
                "Decorator factories (accept parameters)",
                "Combining multiple decorators",
                "Storing and reading custom metadata with Reflect.getMetadata",
                "Decorators for validation (like class-validator style)",
                "Decorators for automatic subscription cleanup",
                "Decorators that enforce architectural rules"
            ],
            "additionalExplanation": "Advanced usage can dramatically reduce boilerplate and enforce consistency across large codebases."
        }
    ],
    "codeExamples": [
        {
            "title": "Basic @Component Decorator",
            "language": "typescript",
            "code": "@Component({\n  selector: 'app-hero',\n  standalone: true,\n  imports: [CommonModule],\n  template: `<h1>{{ name }}</h1>`,\n  styles: ['h1 { color: blue; }']\n})\nexport class HeroComponent {\n  name = 'Superman';\n}",
            "description": "Standard component definition using @Component."
        },
        {
            "title": "Custom Class Decorator Example",
            "language": "typescript",
            "code": "function LogClass(message: string) {\n  return function (constructor: Function) {\n    console.log(`${message}: ${constructor.name} created`);\n  };\n}\n\n@LogClass('Class Instantiation')\nexport class UserService {\n  // ...\n}",
            "description": "Simple class decorator that logs when the class is defined."
        },
        {
            "title": "Custom Method Decorator – Log Execution Time",
            "language": "typescript",
            "code": "function LogTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {\n  const originalMethod = descriptor.value;\n  descriptor.value = function (...args: any[]) {\n    console.time(propertyKey);\n    const result = originalMethod.apply(this, args);\n    console.timeEnd(propertyKey);\n    return result;\n  };\n  return descriptor;\n}\n\nexport class DataService {\n  @LogTime\n  fetchLargeData() {\n    // expensive operation\n  }\n}",
            "description": "Method decorator that measures and logs execution time."
        },
        {
            "title": "Custom Parameter Decorator – Mark Required",
            "language": "typescript",
            "code": "function Required(target: Object, propertyKey: string | symbol, parameterIndex: number) {\n  const existingRequiredParameters: number[] = Reflect.getOwnMetadata('required', target, propertyKey) || [];\n  Reflect.defineMetadata('required', [...existingRequiredParameters, parameterIndex], target, propertyKey);\n}\n\nexport class UserController {\n  createUser(@Required name: string, age: number) {\n    // validation logic can read metadata\n  }\n}",
            "description": "Parameter decorator to mark required parameters (can be used with validation logic)."
        }
    ],
    "bestPractices": [
        "Use built-in Angular decorators for their intended purpose — don't reinvent them.",
        "Keep custom decorators small and focused (single responsibility).",
        "Always document custom decorators: purpose, parameters, usage examples.",
        "Prefer decorator factories when configuration is needed.",
        "Avoid heavy logic inside decorators — they run at definition time.",
        "Use metadata reflection carefully — it's powerful but can make debugging harder.",
        "Test custom decorators thoroughly (especially method/property ones).",
        "In large teams, establish conventions for custom decorator usage.",
        "Be cautious with method decorators that replace behavior — preserve original functionality.",
        "Combine decorators sensibly — order can matter in some cases.",
        "In modern Angular (standalone), decorators remain just as important."
    ]
}