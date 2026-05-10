export const TypeScriptVsJavaScript = {
    title: 'TypeScript vs JavaScript',
    tags: ['TypeScript', 'JavaScript', 'Fundamentals', 'Typing', 'Angular'],
    paragraphs: [
        'TypeScript (TS) is a statically-typed superset of JavaScript (JS) developed and maintained by Microsoft since 2012. It adds optional static type annotations, advanced type features, and compile-time type checking on top of standard JavaScript syntax. All valid JavaScript code is also valid TypeScript, but TypeScript code is transpiled (compiled) to plain JavaScript before execution in browsers or Node.js.',
        'The primary advantage of TypeScript is catching errors early—during development rather than at runtime. This leads to fewer bugs in production, better developer experience with intelligent autocomplete and refactoring, self-documenting code through types, and easier maintenance in large-scale applications. JavaScript\'s dynamic typing offers flexibility and faster prototyping but can lead to subtle runtime errors that are hard to debug.',
        'TypeScript has become the standard for enterprise and large-scale web development. Frameworks like Angular are built entirely around TypeScript, while React, Vue, and NestJS have strong TypeScript support. Adopting TypeScript significantly improves code quality, team collaboration, and long-term maintainability.'
    ],
    sections: [
        {
            heading: 'Core Differences: Static vs Dynamic Typing',
            content: 'The most fundamental difference lies in when type errors are detected:',
            list: [
                '<strong>JavaScript (Dynamic Typing):</strong> Types are checked at runtime. Variables can hold any value, and errors surface only when code executes.',
                '<strong>TypeScript (Static Typing):</strong> Types are checked at compile time (or in the editor). The compiler enforces type consistency, catching mismatches before code runs.',
                '<strong>Key Benefit:</strong> TypeScript prevents entire classes of bugs (e.g., calling methods on undefined, passing wrong argument types).'
            ],
            additionalExplanation: 'TypeScript types are completely erased during compilation—they add zero runtime overhead.'
        },
        {
            heading: 'Powerful TypeScript Features Beyond JavaScript',
            content: 'TypeScript introduces several language features that make code more robust and expressive:',
            list: [
                '<strong>Interfaces & Types:</strong> Define object shapes and contracts',
                '<strong>Enums:</strong> Named sets of constants for better readability',
                '<strong>Generics:</strong> Create reusable, type-safe components and functions',
                '<strong>Union & Intersection Types:</strong> Model complex data with precision',
                '<strong>Tuple Types:</strong> Fixed-length arrays with known types',
                '<strong>Literal Types:</strong> Restrict values to specific strings/numbers',
                '<strong>Access Modifiers:</strong> public, private, protected, readonly',
                '<strong>Decorators:</strong> Metadata annotations (heavily used in Angular)',
                '<strong>Advanced Tooling:</strong> Superior autocomplete, refactoring, and navigation'
            ]
        },
        {
            heading: 'Why Angular Requires TypeScript',
            content: 'Angular (from version 2 onward) is designed and built with TypeScript from the ground up. TypeScript enables key Angular features:',
            list: [
                '<strong>Decorators:</strong> @Component, @Injectable, @Input, @Output for metadata',
                '<strong>Strong Typing:</strong> Type-safe dependency injection, services, and components',
                '<strong>Interfaces:</strong> Clean contracts for services, models, and APIs',
                '<strong>Better IDE Support:</strong> Autocomplete for Angular-specific APIs and templates',
                '<strong>Compile-Time Safety:</strong> Catch template errors and injection mistakes early'
            ],
            additionalExplanation: 'Attempting to use plain JavaScript with Angular is not practical—official templates, documentation, and tooling all assume TypeScript.'
        },
        {
            heading: 'Pros and Cons Comparison',
            content: 'Choosing between TypeScript and JavaScript depends on project size and requirements:',
            list: [
                '<strong>TypeScript Advantages:</strong> Early error detection, better refactoring, self-documenting code, excellent tooling, scalability in large teams',
                '<strong>TypeScript Drawbacks:</strong> Initial learning curve, compilation step, stricter syntax',
                '<strong>JavaScript Advantages:</strong> Faster prototyping, no build step, maximum flexibility',
                '<strong>JavaScript Drawbacks:</strong> Runtime errors, weaker IDE support, harder to maintain in large codebases'
            ]
        },
        {
            heading: 'When to Choose TypeScript',
            content: 'TypeScript shines in these scenarios:',
            list: [
                'Large applications or codebases (>10k lines)',
                'Team development (improves collaboration)',
                'Projects using Angular, NestJS, or enterprise React/Vue',
                'Applications requiring long-term maintenance',
                'When API contracts are complex or frequently changing'
            ],
            additionalExplanation: 'For small scripts, prototypes, or learning JavaScript basics, plain JS is often sufficient.'
        }
    ],
    codeExamples: [
        {
            title: 'Runtime Error in JavaScript vs Compile-Time Error in TypeScript',
            language: 'typescript',
            code: `// JavaScript (runs but fails at runtime)
function greet(name) {
  return "Hello " + name.toUpperCase();
}

greet("John");     // Works: "Hello JOHN"
greet(123);        // Runtime error: name.toUpperCase is not a function
greet(null);       // Runtime error: Cannot read property 'toUpperCase' of null

// TypeScript (catches errors during development)
function greet(name: string): string {
  return "Hello " + name.toUpperCase();
}

greet("John");     // OK
greet(123);        // Compile error: Argument of type 'number' is not assignable to 'string'
greet(null);       // Compile error: Argument of type 'null' is not assignable to 'string'`
        },
        {
            title: 'Interfaces and Object Shape Enforcement',
            language: 'typescript',
            code: `interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;  // Optional property
  roles: string[];     // Array of strings
}

function createUser(user: User): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles
  };
}

// Valid
const validUser = createUser({
  id: 1,
  name: "Jane",
  email: "jane@example.com",
  roles: ["admin"]
});

// Errors caught by TypeScript
createUser({               // Missing required properties
  name: "John"
});

createUser({               // Wrong types
  id: "one",
  name: 123,
  email: true,
  roles: "admin"
});`
        },
        {
            title: 'Generics: Reusable Type-Safe Functions',
            language: 'typescript',
            code: `// Generic identity function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);        // num: number
const str = identity<string>("hello");    // str: string
const arr = identity<number[]>([1, 2, 3]); // arr: number[]

// Generic with constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");      // OK
logLength([1, 2, 3]);    // OK
logLength({ length: 10, value: "test" }); // OK
// logLength(42);        // Error: number has no length property`
        },
        {
            title: 'Enums for Better Code Clarity',
            language: 'typescript',
            code: `enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER"
}

enum Status {
  Pending = 1,
  Approved = 2,
  Rejected = 3
}

interface User {
  name: string;
  role: UserRole;
  status: Status;
}

const user: User = {
  name: "Alice",
  role: UserRole.Admin,
  status: Status.Approved
};

// Autocomplete and type safety
console.log(user.role); // UserRole.Admin`
        },
        {
            title: 'Angular Component Example (TypeScript Required)',
            language: 'typescript',
            code: `import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-card',
  template: \`
    <div>
      <h3>{{ product.name }}</h3>
      <p>Price: \${{ product.price }}</p>
      <button (click)="addToCart.emit(product.id)">Add to Cart</button>
    </div>
  \`
})
export class ProductCardComponent {
  @Input() product!: Product;                 // Type-safe input
  @Output() addToCart = new EventEmitter<number>(); // Typed event

  // Full type checking in methods
  getDiscountedPrice(): number {
    return this.product.price * 0.9;
  }
}`
        }
    ],
    keyPoints: [
        'TypeScript is a superset of JavaScript—all JS code is valid TS',
        'Static typing catches errors at compile time, not runtime',
        'Zero runtime overhead—types are erased during compilation',
        'Excellent IDE support: autocomplete, refactoring, navigation',
        'Required for modern Angular development',
        'Improves scalability and maintainability in large projects',
        'Features like generics, interfaces, enums, and decorators add expressiveness',
        'Gradual adoption possible—start with .ts files and any types'
    ],
    bestPractices: [
        'Use strict mode in tsconfig.json ("strict": true) for maximum safety',
        'Define interfaces for API responses and component props',
        'Leverage generics for reusable utilities and components',
        'Use definite assignment assertion (!) or proper initialization to avoid null issues',
        'Enable noImplicitAny to prevent implicit any types',
        'Use ESLint + @typescript-eslint for consistent code style',
        'Gradually migrate JS projects by renaming .js to .ts and adding types',
        'Document complex types with JSDoc-style comments when needed'
    ]
};