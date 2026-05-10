export const TypeScriptDataTypes = {
    title: 'TypeScript Data Types',
    tags: ['TypeScript', 'Types', 'Fundamentals', 'Angular', 'Static Typing'],
    paragraphs: [
        'TypeScript\'s powerful type system is the foundation of writing robust, maintainable, and self-documenting code in Angular applications. It extends JavaScript\'s dynamic types with static typing, allowing developers to define exactly what kind of data a variable, parameter, or function can hold. This catches errors early during development, improves IDE intelligence, and makes large codebases far easier to understand and refactor.',
        'While type annotations are optional (TypeScript often infers types automatically), explicit typing is highly recommended for clarity, especially in Angular components, services, and models. Mastering TypeScript\'s rich set of primitive, object, and advanced types enables developers to model real-world data accurately and prevent entire classes of runtime bugs.',
        'From basic primitives like string and number to sophisticated constructs like unions, intersections, literals, and generics, TypeScript provides tools to express complex data relationships with precision—making it indispensable for enterprise-scale Angular projects.'
    ],
    sections: [
        {
            heading: 'Primitive Types',
            content: 'These are the basic building blocks for simple values. TypeScript enforces them strictly at compile time:',
            list: [
                '<strong>string:</strong> Represents text. Use single, double, or template literals.',
                '<strong>number:</strong> Covers integers, floats, Infinity, NaN. No separate int/float distinction.',
                '<strong>boolean:</strong> Only true or false (lowercase).',
                '<strong>null & undefined:</strong> Represent absence of value. null for intentional absence, undefined for uninitialized.',
                '<strong>symbol:</strong> Unique, immutable identifiers (ES6 feature). Useful for object keys.',
                '<strong>bigint:</strong> Arbitrary-precision integers (e.g., 123n). For numbers beyond Number.MAX_SAFE_INTEGER.'
            ],
            additionalExplanation: 'Primitive types are immutable and passed by value.'
        },
        {
            heading: 'Object Types: Interfaces and Type Aliases',
            content: 'TypeScript excels at describing complex object shapes using interfaces or type aliases:',
            list: [
                '<strong>interface:</strong> Defines object contracts. Extensible with extends and ideal for class implementation.',
                '<strong>type:</strong> More flexible—can represent unions, primitives, or complex combinations.',
                '<strong>Optional properties:</strong> Use ? for properties that may be missing.',
                '<strong>Readonly properties:</strong> Use readonly to prevent mutation.',
                '<strong>Index signatures:</strong> For dynamic keys (e.g., { [key: string]: number })'
            ]
        },
        {
            heading: 'Collection Types: Arrays and Tuples',
            content: 'Typed collections for ordered data:',
            list: [
                '<strong>Array<T> or T[]:</strong> Homogeneous arrays of type T.',
                '<strong>ReadonlyArray<T>:</strong> Immutable arrays.',
                '<strong>Tuple:</strong> Fixed-length, heterogeneous arrays with known types at each position.',
                '<strong>Destructuring:</strong> Tuples shine when returning multiple values from functions.'
            ]
        },
        {
            heading: 'Special Types',
            content: 'Built-in types for edge cases and type safety:',
            list: [
                '<strong>any:</strong> Opt-out of type checking. Avoid—it defeats TypeScript\'s purpose.',
                '<strong>unknown:</strong> Safer alternative to any. Requires type narrowing before use.',
                '<strong>void:</strong> For functions that return nothing (or undefined).',
                '<strong>never:</strong> For functions that never return (e.g., throw errors or infinite loops).',
                '<strong>object:</strong> Generic non-primitive type (not very specific—prefer interfaces).'
            ]
        },
        {
            heading: 'Advanced Types: Unions, Intersections, and Literals',
            content: 'Powerful tools for modeling precise data:',
            list: [
                '<strong>Union Types (A | B):</strong> Value can be one of several types.',
                '<strong>Intersection Types (A & B):</strong> Combines multiple types (all properties required).',
                '<strong>Literal Types:</strong> Restrict to exact values (e.g., "left" | "right" | "center").',
                '<strong>Type Narrowing:</strong> Use typeof, instanceof, or discriminants to refine unions.',
                '<strong>Discriminated Unions:</strong> Pattern using a common literal property for safe type narrowing.'
            ]
        },
        {
            heading: 'Function Types',
            content: 'TypeScript can describe function signatures precisely:',
            list: [
                '<strong>Parameter & Return Types:</strong> Annotate parameters and return values.',
                '<strong>Optional Parameters:</strong> Use ? (must come after required).',
                '<strong>Default Parameters:</strong> Provide defaults (type inferred or explicit).',
                '<strong>Overloads:</strong> Multiple signatures for the same function.',
                '<strong>Rest Parameters:</strong> ...args: T[] for variable arguments.'
            ]
        }
    ],
    codeExamples: [
        {
            title: 'Primitive Types and Basic Annotations',
            language: 'typescript',
            code: `let name: string = "Soumya";
let age: number = 28;
let isDeveloper: boolean = true;

let nothing: null = null;
let uninitialized: undefined = undefined;

let uniqueId: symbol = Symbol('id');
let largeNumber: bigint = 9007199254740992n;

// Type inference (no annotation needed)
let inferred = "TypeScript infers string here";`
        },
        {
            title: 'Object Shapes with Interfaces and Types',
            language: 'typescript',
            code: `interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;           // Optional
  readonly createdAt: Date;     // Cannot be reassigned
}

type Point = {
  x: number;
  y: number;
  z?: number;                   // Optional
};

type Dictionary = { [key: string]: string };

const config: Dictionary = {
  theme: "dark",
  language: "en"
};`
        },
        {
            title: 'Arrays, Tuples, and Readonly Collections',
            language: 'typescript',
            code: `let scores: number[] = [95, 87, 91];
let names: Array<string> = ["Alice", "Bob"];

const immutableScores: ReadonlyArray<number> = [100, 95];
// immutableScores.push(90); // Error!

// Tuple: fixed length and types
let person: [string, number, boolean] = ["John", 30, true];
// person = ["Jane", 25]; // Error: wrong length
// person[2] = "yes";     // Error: wrong type

// Destructuring tuples
const [username, userAge] = person;`
        },
        {
            title: 'Any vs Unknown: Type Safety',
            language: 'typescript',
            code: `let flexible: any = "could be anything";
flexible = 42;
flexible.toUpperCase(); // No error at compile time (dangerous!)

let safe: unknown = "might be anything";
// safe.toUpperCase();   // Error: must narrow first

if (typeof safe === "string") {
  console.log(safe.toUpperCase()); // OK after narrowing
}`
        },
        {
            title: 'Union Types, Literal Types, and Type Narrowing',
            language: 'typescript',
            code: `type Status = "pending" | "approved" | "rejected"; // Literal union

let orderStatus: Status = "pending";
// orderStatus = "cancelled"; // Error!

function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value; // padding is narrowed to number
  }
  return padding + value; // padding is narrowed to string
}

type ID = string | number;
let entityId: ID = 123;
entityId = "user-456";`
        },
        {
            title: 'Discriminated Unions (Common Angular Pattern)',
            language: 'typescript',
            code: `interface Success {
  kind: "success";
  data: string;
}

interface Error {
  kind: "error";
  message: string;
}

interface Loading {
  kind: "loading";
}

type ApiResponse = Success | Error | Loading;

function handleResponse(response: ApiResponse) {
  switch (response.kind) {
    case "success":
      console.log(response.data); // TypeScript knows data exists
      break;
    case "error":
      console.error(response.message);
      break;
    case "loading":
      console.log("Loading...");
      break;
  }
}`
        },
        {
            title: 'Function Types and Overloads',
            language: 'typescript',
            code: `function greet(name: string): string;
function greet(id: number): string;
function greet(input: string | number): string {
  if (typeof input === "string") {
    return \`Hello, \${input}!\`;
  }
  return \`User ID: \${input}\`;
}

greet("Soumya"); // "Hello, Soumya!"
greet(123);      // "User ID: 123"

// Optional and rest parameters
function buildName(first: string, ...rest: string[]): string {
  return first + (rest.length ? " " + rest.join(" ") : "");
}`
        }
    ],
    keyPoints: [
        'Primitives: string, number, boolean, null, undefined, symbol, bigint',
        'Use interfaces for object shapes; type aliases for unions and complex types',
        'Arrays: T[] or Array<T>; Tuples for fixed heterogeneous collections',
        'Union types (A | B) and literal types for precise modeling',
        'Discriminated unions are essential for state management in Angular',
        'Prefer unknown over any for dynamic data',
        'Type inference reduces boilerplate but explicit types improve readability',
        'Never use any in production code—it disables type checking'
    ],
    bestPractices: [
        'Enable "strict" mode in tsconfig.json for maximum type safety',
        'Use interfaces for public APIs and models; type aliases for unions/intersections',
        'Prefer const assertions and as const for literal inference',
        'Narrow unions with typeof, instanceof, or discriminated properties',
        'Define API response types as discriminated unions',
        'Use readonly for immutable data and ReadonlyArray for collections',
        'Avoid any—refactor to proper types or unknown with narrowing',
        'Leverage type inference but add annotations for function parameters and returns'
    ]
};