export const TypeScriptEnums = {
    title: 'TypeScript Enums',
    tags: ['TypeScript', 'Enums', 'Constants', 'Angular', 'Type Safety'],
    paragraphs: [
        'Enums (enumerations) in TypeScript provide a way to define a set of named constants, making code more readable, self-documenting, and maintainable. Unlike most TypeScript features that are erased at compile time, enums have a runtime representation—they compile to JavaScript objects, allowing reverse lookups and runtime checks.',
        'Enums are particularly valuable when working with finite sets of distinct values, such as status codes, user roles, directions, categories, or configuration options. In Angular applications, enums are widely used for modeling state in components, services, and templates, providing strong type safety, excellent IDE autocomplete, and preventing invalid values from being assigned.',
        'TypeScript supports several enum variants: numeric, string, heterogeneous, and const enums. Choosing the right type improves both type safety and performance. When used properly, enums make intent clear and reduce magic strings/numbers scattered throughout the codebase.'
    ],
    sections: [
        {
            heading: 'Numeric Enums',
            content: 'The most common enum type. Values auto-increment starting from 0 (or a custom initial value):',
            list: [
                '<strong>Auto-incrementing:</strong> Subsequent members get incremental values',
                '<strong>Custom starting value:</strong> Set first member explicitly',
                '<strong>Manual values:</strong> Assign specific numbers to any member',
                '<strong>Reverse mapping:</strong> Access name from value (e.g., Direction[1] === "Up")'
            ],
            additionalExplanation: 'Numeric enums are useful when order matters or when interfacing with APIs that use numeric codes.'
        },
        {
            heading: 'String Enums',
            content: 'Each member must be explicitly assigned a string value. No auto-incrementing:',
            list: [
                '<strong>Explicit strings:</strong> Every member needs a string literal',
                '<strong>No reverse mapping:</strong> Cannot get name from value at runtime',
                '<strong>Better readability:</strong> Values are human-readable strings',
                '<strong>Serialization friendly:</strong> Direct use in JSON, logs, APIs'
            ],
            additionalExplanation: 'String enums are preferred in Angular when values are displayed to users or sent over the network.'
        },
        {
            heading: 'Const Enums',
            content: 'Declared with the const keyword. They are completely inlined at compile time:',
            list: [
                '<strong>No runtime object:</strong> Values are substituted directly (better tree-shaking)',
                '<strong>Performance optimized:</strong> Smaller bundle size',
                '<strong>No reverse mapping:</strong> Like string enums',
                '<strong>Limitations:</strong> Cannot use computed values; external references require preserveConstEnums'
            ],
            additionalExplanation: 'Use const enums for compile-time constants like HTTP status codes.'
        },
        {
            heading: 'Heterogeneous Enums and Computed Members',
            content: 'Mixing string and number values (discouraged) or using computed expressions:',
            list: [
                '<strong>Heterogeneous:</strong> Mix strings and numbers (can cause confusion)',
                '<strong>Computed values:</strong> Use expressions (e.g., Date.now()), but only in regular enums',
                '<strong>Best practice:</strong> Avoid heterogeneous and computed enums for clarity'
            ]
        },
        {
            heading: 'Enums in Angular Templates and Components',
            content: 'Enums integrate seamlessly with Angular\'s template system:',
            list: [
                '<strong>Exposing to templates:</strong> Assign enum to component property',
                '<strong>Type-safe comparisons:</strong> Use in *ngIf, switch cases',
                '<strong>Dropdowns/selects:</strong> Iterate with Object.values/keys',
                '<strong>Pipes and directives:</strong> Can accept enum types'
            ]
        },
        {
            heading: 'Enums vs Alternatives',
            content: 'Sometimes other patterns are preferable:',
            list: [
                '<strong>Union of literals:</strong> type Status = "pending" | "active" | "inactive" (no runtime overhead)',
                '<strong>Object with as const:</strong> Better for string unions with no runtime cost',
                '<strong>When to use enums:</strong> Need runtime values, reverse lookup, or legacy compatibility',
                '<strong>When to avoid:</strong> Pure type-level constants (prefer literal unions)'
            ]
        }
    ],
    codeExamples: [
        {
            title: 'Numeric Enums with Auto-Increment and Manual Values',
            language: 'typescript',
            code: `enum OrderStatus {
  Pending,      // 0
  Processing,   // 1
  Shipped,      // 2
  Delivered,    // 3
  Cancelled = 10
}

console.log(OrderStatus.Pending);     // 0
console.log(OrderStatus[2]);          // "Shipped" (reverse mapping)

enum Direction {
  Up = 1,
  Down,         // 2
  Left = 10,
  Right         // 11
}`
        },
        {
            title: 'String Enums for Readability and Serialization',
            language: 'typescript',
            code: `enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

enum LogLevel {
  Error = 'ERROR',
  Warn = 'WARN',
  Info = 'INFO',
  Debug = 'DEBUG'
}

function logMessage(level: LogLevel, message: string) {
  console.log(\`[\${level}] \${message}\`);
}

logMessage(LogLevel.Error, 'Something went wrong');
// Output: [ERROR] Something went wrong`
        },
        {
            title: 'Const Enums for Performance (Inlined at Compile Time)',
            language: 'typescript',
            code: `const enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500
}

function handleApiResponse(code: HttpStatus) {
  switch (code) {
    case HttpStatus.OK:
      console.log('Request successful');
      break;
    case HttpStatus.NotFound:
      console.log('Resource not found');
      break;
    default:
      console.log('Other status:', code);
  }
}

// Compiled JS has no HttpStatus object - values are inlined`
        },
        {
            title: 'Advanced Enum Usage in Angular Component',
            language: 'typescript',
            code: `export enum ProductCategory {
  Electronics = 'ELECTRONICS',
  Clothing = 'CLOTHING',
  Books = 'BOOKS',
  Home = 'HOME',
  Food = 'FOOD'
}

@Component({
  selector: 'app-product-filter',
  template: \`
    <div>
      <h3>Filter by Category</h3>
      <select [(ngModel)]="selectedCategory">
        <option *ngFor="let category of categoryValues" [value]="category">
          {{ formatCategory(category) }}
        </option>
      </select>
      <p>Selected: {{ selectedCategory }}</p>
    </div>
  \`
})
export class ProductFilterComponent {
  categories = ProductCategory;
  categoryValues = Object.values(ProductCategory);
  selectedCategory = ProductCategory.Electronics;

  formatCategory(category: ProductCategory): string {
    return category.charAt(0) + category.slice(1).toLowerCase();
  }
}`
        },
        {
            title: 'Enum Iteration and Type-Safe Handling',
            language: 'typescript',
            code: `enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE'
}

// Get all enum values
const allColors: Color[] = Object.values(Color) as Color[];

// Get all enum keys
const colorKeys: string[] = Object.keys(Color);

// Type-safe switch
function getHex(code: Color): string {
  switch (code) {
    case Color.Red:
      return '#FF0000';
    case Color.Green:
      return '#00FF00';
    case Color.Blue:
      return '#0000FF';
  }
}`
        },
        {
            title: 'Alternative: Literal Union Types (No Runtime Overhead)',
            language: 'typescript',
            code: `type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const status: OrderStatus = 'processing';
// status = 'invalid'; // Error!

// Often preferred over string enums for pure type safety
const LOG_LEVELS = ['ERROR', 'WARN', 'INFO', 'DEBUG'] as const;
type LogLevel = typeof LOG_LEVELS[number]; // "ERROR" | "WARN" | ...`
        }
    ],
    keyPoints: [
        'Enums define named constant sets for improved readability',
        'Numeric enums support auto-increment and reverse mapping',
        'String enums provide human-readable values with no reverse mapping',
        'Const enums are inlined for optimal performance and bundle size',
        'Enums have runtime presence (except const enums)',
        'Excellent for status codes, roles, categories in Angular',
        'Provide strong typing and IDE autocomplete',
        'Consider literal unions for type-only constants'
    ],
    bestPractices: [
        'Prefer string enums or const enums over numeric for clarity',
        'Use const enums for HTTP codes, fixed configurations',
        'Expose enums to Angular templates via component properties',
        'Iterate with Object.values() for dropdowns and lists',
        'Avoid heterogeneous enums to prevent confusion',
        'Use literal union types when no runtime value is needed',
        'Name enum members in UPPER_CASE for constants',
        'Document complex enums with comments or separate files'
    ]
};