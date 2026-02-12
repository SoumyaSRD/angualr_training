export const TypeScriptInterfaces = {
    title: 'TypeScript Interfaces',
    tags: ['TypeScript', 'Interfaces', 'OOP', 'Angular', 'Type Safety'],
    paragraphs: [
        'Interfaces in TypeScript are a powerful way to define contracts for object shapes, function signatures, and class structures. They specify exactly what properties, methods, or index signatures an object must (or may) have, enabling strong type checking at compile time. Unlike classes, interfaces are purely a type-level construct—they are completely erased during compilation and add no runtime overhead.',
        'In Angular applications, interfaces are indispensable for modeling data from APIs, defining component inputs/outputs, creating service contracts, and ensuring consistent shapes across components and services. They promote clean architecture, improve IDE autocomplete and refactoring, facilitate team collaboration, and catch structural errors early—making code more maintainable and less prone to runtime bugs.',
        'Interfaces are often preferred over type aliases for defining object shapes because they support declaration merging, extension via extends, and are the standard for class implementation contracts. Mastering interfaces is key to writing idiomatic, type-safe TypeScript code in Angular projects.'
    ],
    sections: [
        {
            heading: 'Basic Interface Declaration',
            content: 'An interface defines the required and optional properties of an object:',
            list: [
                '<strong>Required properties:</strong> Must be present with correct types',
                '<strong>Optional properties:</strong> Marked with ? and can be omitted',
                '<strong>Readonly properties:</strong> Marked with readonly to prevent reassignment after initialization',
                '<strong>Arbitrary properties:</strong> Use index signatures for dynamic keys'
            ]
        },
        {
            heading: 'Extending Interfaces',
            content: 'Interfaces can inherit from one or more other interfaces using extends, promoting reuse and hierarchy:',
            list: [
                '<strong>Single inheritance:</strong> Extend one interface',
                '<strong>Multiple inheritance:</strong> Extend multiple interfaces (comma-separated)',
                '<strong>Declaration merging:</strong> Same-name interfaces automatically merge (useful for augmenting third-party types)'
            ]
        },
        {
            heading: 'Function and Hybrid Interfaces',
            content: 'Interfaces can describe callable signatures or combine object and function types:',
            list: [
                '<strong>Function interfaces:</strong> Define parameter and return types for functions',
                '<strong>Hybrid types:</strong> Objects that are both callable and have properties (e.g., for advanced patterns like jQuery-style APIs)'
            ]
        },
        {
            heading: 'Index Signatures and Dynamic Properties',
            content: 'For objects with unknown keys but known value types:',
            list: [
                '<strong>String index:</strong> [key: string]: type',
                '<strong>Number index:</strong> [key: number]: type',
                '<strong>Mixed:</strong> Combine with fixed properties (index signature must be compatible)'
            ]
        },
        {
            heading: 'Classes Implementing Interfaces',
            content: 'Classes can implement one or more interfaces, enforcing structure:',
            list: [
                '<strong>Multiple implementation:</strong> A class can implement several interfaces',
                '<strong>Access modifiers:</strong> public, private, protected work with interface properties',
                '<strong>Abstract vs concrete:</strong> Interfaces ensure implementation of all members'
            ]
        },
        {
            heading: 'Interfaces vs Type Aliases',
            content: 'While similar for object shapes, they have key differences:',
            list: [
                '<strong>Interfaces:</strong> Extensible (extends, declaration merging), ideal for object contracts and class implementation',
                '<strong>Type aliases:</strong> Can represent unions, intersections, primitives, tuples; cannot be extended or merged',
                '<strong>When to choose:</strong> Use interfaces for object shapes unless you need union/intersection features'
            ]
        }
    ],
    codeExamples: [
        {
            title: 'Basic Interface with Optional, Readonly, and Array Properties',
            language: 'typescript',
            code: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;                    // Optional
  readonly createdAt: Date;        // Cannot be reassigned
  tags: string[];                  // Array of strings
  metadata?: Record<string, any>;  // Optional dynamic properties
}

const user: User = {
  id: 1,
  name: "Soumya",
  email: "soumya@example.com",
  tags: ["developer", "angular"],
  createdAt: new Date()
};

// user.createdAt = new Date(); // Error: readonly
// user.id = "one";             // Error: type mismatch`
        },
        {
            title: 'Extending Interfaces (Single and Multiple)',
            language: 'typescript',
            code: `interface Person {
  name: string;
  age: number;
}

interface Contact {
  email: string;
  phone?: string;
}

interface Employee extends Person, Contact {
  employeeId: string;
  department: string;
  salary: number;
  permissions?: string[];
}

const manager: Employee = {
  name: "Raj",
  age: 35,
  email: "raj@example.com",
  employeeId: "M001",
  department: "IT",
  salary: 90000,
  permissions: ["admin", "reports"]
};`
        },
        {
            title: 'Index Signatures for Dynamic Objects',
            language: 'typescript',
            code: `interface StringDictionary {
  [key: string]: string;  // Any string key, value must be string
}

interface Config {
  apiUrl: string;
  timeout: number;
  features: { [feature: string]: boolean };  // Nested dynamic
}

const settings: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  features: {
    darkMode: true,
    notifications: false,
    analytics: true
  }
};

// Valid
settings.features["beta"] = false;

// Error: number not assignable to string
// const bad: StringDictionary = { count: 42 };`
        },
        {
            title: 'Function Interfaces and Hybrid Types',
            language: 'typescript',
            code: `// Function interface
interface Comparator<T> {
  (a: T, b: T): number;
}

const numberComparator: Comparator<number> = (a, b) => a - b;
const stringComparator: Comparator<string> = (a, b) => a.localeCompare(b);

// Hybrid interface (callable + properties)
interface Counter {
  (value?: number): number;  // Callable signature
  current: number;
  reset(): void;
}

const createCounter = (): Counter => {
  let count = 0;
  const counter = ((value?: number) => {
    if (value !== undefined) count = value;
    return count++;
  }) as Counter;
  counter.current = count;
  counter.reset = () => { count = 0; counter.current = 0; };
  return counter;
};

const myCounter = createCounter();
console.log(myCounter()); // 0
console.log(myCounter()); // 1
myCounter.reset();`
        },
        {
            title: 'Class Implementing Multiple Interfaces',
            language: 'typescript',
            code: `interface Drawable {
  draw(): void;
}

interface Resizable {
  resize(factor: number): void;
}

class Circle implements Drawable, Resizable {
  constructor(private radius: number) {}

  draw(): void {
    console.log(\`Drawing circle with radius \${this.radius}\`);
  }

  resize(factor: number): void {
    this.radius *= factor;
    console.log(\`New radius: \${this.radius}\`);
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

const myCircle = new Circle(10);
myCircle.draw();
myCircle.resize(1.5);`
        },
        {
            title: 'Declaration Merging Example',
            language: 'typescript',
            code: `// First declaration
interface Window {
  appVersion: string;
}

// Later in another file (or same) - merges automatically
interface Window {
  debugMode: boolean;
}

// Now Window has both properties
declare const window: Window;
window.appVersion = "1.0.0";
window.debugMode = true;`
        }
    ],
    keyPoints: [
        'Interfaces define contracts for object shapes, functions, and classes',
        'Support optional (?) and readonly properties',
        'Can extend multiple interfaces and support declaration merging',
        'Index signatures enable dynamic property typing',
        'Classes can implement multiple interfaces for polymorphism',
        'Purely compile-time—no runtime impact',
        'Preferred over type aliases for object shapes and public APIs',
        'Essential in Angular for typing models, props, and service contracts'
    ],
    bestPractices: [
        'Use interfaces for object shapes and class contracts; type aliases for unions/intersections',
        'Name interfaces with clear, noun-based names (e.g., UserProfile, ApiResponse)',
        'Leverage optional properties and index signatures for flexible APIs',
        'Extend base interfaces to build hierarchies (e.g., BaseEntity → User → Admin)',
        'Use readonly for immutable data (e.g., IDs, creation timestamps)',
        'Implement interfaces in classes for clear contracts and better documentation',
        'Take advantage of declaration merging to augment third-party types safely',
        'Avoid overly broad interfaces—keep them focused and single-responsibility'
    ]
};