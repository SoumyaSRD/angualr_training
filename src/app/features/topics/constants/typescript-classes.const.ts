export const TypeScriptClasses = {
    title: 'TypeScript Classes',
    tags: ['TypeScript', 'OOP', 'Classes', 'Angular', 'Inheritance', 'Encapsulation'],
    paragraphs: [
        'TypeScript classes are a cornerstone of object-oriented programming in modern JavaScript ecosystems. Building directly on ES6 class syntax, TypeScript adds powerful static typing features like access modifiers, parameter properties, abstract classes, and definite assignment assertions. These enhancements enable better encapsulation, inheritance, polymorphism, and code organization while maintaining full compatibility with JavaScript.',
        'In Angular applications, classes are fundamental—every component, service, directive, pipe, and module is defined as a TypeScript class decorated with metadata (@Component, @Injectable, etc.). The combination of classes and decorators allows Angular to provide dependency injection, change detection, and a structured architecture. Understanding TypeScript classes deeply is essential for writing clean, maintainable, and scalable Angular code.',
        'Classes in TypeScript are compiled to JavaScript functions (using prototype-based inheritance under the hood) but provide a clearer, more familiar syntax for developers coming from languages like Java or C#. They support single inheritance, interfaces for multiple contract implementation, and runtime features like static members while adding compile-time safety through types.'
    ],
    sections: [
        {
            heading: 'Class Declaration and Constructors',
            content: 'A class defines a blueprint for creating objects with properties (fields) and methods:',
            list: [
                '<strong>Constructor:</strong> Special method called when instantiating with new',
                '<strong>Instance members:</strong> Properties and methods on this',
                '<strong>Definite assignment:</strong> Use ! for properties initialized later (e.g., in ngOnInit)'
            ]
        },
        {
            heading: 'Access Modifiers',
            content: 'TypeScript provides three access modifiers for encapsulation:',
            list: [
                '<strong>public:</strong> Accessible from anywhere (default)',
                '<strong>private:</strong> Accessible only within the class',
                '<strong>protected:</strong> Accessible in the class and subclasses',
                '<strong>readonly:</strong> Prevents reassignment after initialization (can be combined with access modifiers)'
            ],
            additionalExplanation: 'Access modifiers are enforced at compile time but erased in JavaScript (use for documentation and safety).'
        },
        {
            heading: 'Parameter Properties (Constructor Shorthand)',
            content: 'A concise way to declare and initialize class properties directly in the constructor:',
            list: [
                '<strong>Syntax:</strong> Add access modifier before parameter name',
                '<strong>Benefits:</strong> Reduces boilerplate significantly',
                '<strong>Common in Angular:</strong> Used heavily in components and services'
            ]
        },
        {
            heading: 'Inheritance and Polymorphism',
            content: 'Classes can extend others using extends and override methods:',
            list: [
                '<strong>extends:</strong> Single inheritance from another class',
                '<strong>super():</strong> Call parent constructor or methods',
                '<strong>Method overriding:</strong> Subclass provides specific implementation',
                '<strong>Polymorphism:</strong> Treat subclass instances as parent type'
            ]
        },
        {
            heading: 'Abstract Classes',
            content: 'Base classes that cannot be instantiated directly and may contain abstract members:',
            list: [
                '<strong>abstract keyword:</strong> On class and methods/properties',
                '<strong>Purpose:</strong> Define common structure and force implementation in subclasses',
                '<strong>Use case:</strong> Shared logic with required overrides'
            ]
        },
        {
            heading: 'Getters, Setters, and Computed Properties',
            content: 'Special methods that look like property access but execute custom logic:',
            list: [
                '<strong>get:</strong> Called when reading property',
                '<strong>set:</strong> Called when assigning property',
                '<strong>Validation:</strong> Common use case for input validation',
                '<strong>Computed values:</strong> Derive values without storing state'
            ]
        },
        {
            heading: 'Static Members',
            content: 'Properties and methods that belong to the class itself, not instances:',
            list: [
                '<strong>static keyword:</strong> On properties and methods',
                '<strong>Access:</strong> Via class name (ClassName.staticMethod())',
                '<strong>Use cases:</strong> Utilities, constants, factory methods'
            ]
        },
        {
            heading: 'Classes and Interfaces',
            content: 'Classes can implement interfaces to guarantee structure:',
            list: [
                '<strong>implements:</strong> Check that class satisfies interface',
                '<strong>Multiple interfaces:</strong> Comma-separated',
                '<strong>Common in Angular:</strong> Services often implement interfaces for testability'
            ]
        }
    ],
    codeExamples: [
        {
            title: 'Basic Class with Access Modifiers and Readonly',
            language: 'typescript',
            code: `class User {
  public name: string;
  private id: number;
  protected email: string;
  readonly createdAt: Date;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  getInfo(): string {
    return \`\${this.name} (ID: \${this.id})\`;
  }

  private validate(): boolean {
    return this.email.includes('@');
  }
}

const user = new User(1, "Soumya", "soumya@example.com");
console.log(user.name);        // OK
// console.log(user.id);       // Error: private
// user.createdAt = new Date(); // Error: readonly`
        },
        {
            title: 'Parameter Properties Shorthand (Common in Angular)',
            language: 'typescript',
            code: `class Product {
  constructor(
    public id: number,
    public name: string,
    private price: number,
    protected category: string,
    readonly sku: string
  ) {}

  getPrice(): number {
    return this.price;
  }

  updatePrice(newPrice: number): void {
    if (newPrice > 0) this.price = newPrice;
  }
}

const laptop = new Product(101, "Gaming Laptop", 1499, "Electronics", "LAP-001");
console.log(laptop.name);   // "Gaming Laptop"
console.log(laptop.getPrice()); // 1499`
        },
        {
            title: 'Inheritance with super() and Method Overriding',
            language: 'typescript',
            code: `class Vehicle {
  constructor(protected brand: string, private year: number) {}

  start(): void {
    console.log(\`\${this.brand} vehicle starting...\`);
  }

  getAge(currentYear: number): number {
    return currentYear - this.year;
  }
}

class Car extends Vehicle {
  constructor(brand: string, year: number, private doors: number) {
    super(brand, year);
  }

  start(): void {
    super.start(); // Call parent
    console.log('Car engine roaring!');
  }

  honk(): void {
    console.log('Beep beep!');
  }
}

const myCar = new Car("Toyota", 2023, 4);
myCar.start();
console.log(myCar.getAge(2026)); // 3`
        },
        {
            title: 'Abstract Classes for Shared Structure',
            language: 'typescript',
            code: `abstract class Repository<T> {
  protected items: T[] = [];

  abstract findById(id: number): T | undefined;

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

class UserRepository extends Repository<User> {
  findById(id: number): User | undefined {
    return this.items.find(u => (u as any).id === id);
  }
}

// const repo = new Repository(); // Error: abstract`
        },
        {
            title: 'Getters and Setters with Validation',
            language: 'typescript',
            code: `class BankAccount {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  set balance(amount: number) {
    if (amount < 0) {
      throw new Error('Balance cannot be negative');
    }
    this._balance = amount;
  }

  deposit(amount: number): void {
    if (amount > 0) this._balance += amount;
  }
}

const account = new BankAccount();
account.deposit(1000);
console.log(account.balance); // 1000
// account.balance = -100;    // Throws error`
        },
        {
            title: 'Static Members and Utility Classes',
            language: 'typescript',
            code: `class DateUtils {
  static readonly DAYS_IN_WEEK = 7;

  static format(date: Date, format: string): string {
    // Simplified example
    return date.toLocaleDateString();
  }

  static isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
}

console.log(DateUtils.DAYS_IN_WEEK);
console.log(DateUtils.format(new Date(), 'en-IN'));
console.log(DateUtils.isWeekend(new Date()));`
        },
        {
            title: 'Angular Component Class Example',
            language: 'typescript',
            code: `import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-list',
  template: \`
    <h2>Products</h2>
    <ul>
      <li *ngFor="let product of products">{{ product.name }}</li>
    </ul>
  \`
})
export class ProductListComponent implements OnInit {
  products!: Product[]; // Definite assignment assertion

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}`
        },
        {
            title: 'Class Implementing Multiple Interfaces',
            language: 'typescript',
            code: `interface Identifiable {
  id: number;
}

interface Loggable {
  log(): void;
}

class Task implements Identifiable, Loggable {
  constructor(public id: number, private description: string) {}

  log(): void {
    console.log(\`Task \${this.id}: \${this.description}\`);
  }
}

const task = new Task(42, "Learn TypeScript");
task.log();`
        }
    ],
    keyPoints: [
        'Classes support ES6 syntax with TypeScript enhancements',
        'Access modifiers (public, private, protected) enforce encapsulation at compile time',
        'Parameter properties reduce constructor boilerplate',
        'Single inheritance with extends; multiple interface implementation',
        'Abstract classes define shared structure with required implementations',
        'Getters/setters enable computed properties and validation',
        'Static members belong to the class, not instances',
        'Essential building blocks for Angular components, services, and directives'
    ],
    bestPractices: [
        'Use parameter properties in constructors to reduce boilerplate',
        'Prefer private over protected unless inheritance is required',
        'Mark immutable properties as readonly',
        'Use abstract classes for shared logic with forced overrides',
        'Implement interfaces for clear contracts and better testability',
        'Leverage getters/setters for validation and computed values',
        'Keep static utilities in dedicated classes (e.g., DateUtils, StringUtils)',
        'Use definite assignment assertion (!) cautiously in Angular lifecycle hooks',
        'Avoid deep inheritance hierarchies—favor composition over inheritance'
    ]
};