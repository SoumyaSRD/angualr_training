import{b as E}from"./chunk-LDGWIROF.js";import{g as A}from"./chunk-CVNJEO4S.js";import{l as C}from"./chunk-XGBKVH7G.js";import{$a as m,Aa as r,Cb as d,Db as u,Ja as S,Nb as h,Oa as T,_a as g,ab as c,cb as l,db as p,eb as y,fb as i,gb as a,hb as w,rb as f,xa as v}from"./chunk-ESOSN4X2.js";var x={title:"CORS (Cross-Origin Resource Sharing)",tags:["Security","Web Fundamentals","HTTP","Browser","API"],paragraphs:["CORS (Cross-Origin Resource Sharing) is a critical browser security mechanism that controls how web pages loaded from one origin can request resources from a different origin. It builds on the Same-Origin Policy (SOP), a foundational security rule that restricts JavaScript from making requests to domains other than the one that served the page, preventing malicious sites from stealing data or performing unauthorized actions.","Without CORS, modern web applications would be severely limited\u2014frontend apps on one domain couldn't safely call APIs on another domain. CORS provides a controlled way for servers to explicitly allow cross-origin requests by sending specific HTTP headers. This enables secure separation of frontend and backend (e.g., React app on Vercel calling Node.js API on AWS) while maintaining strong security boundaries.",'CORS is enforced only by browsers for security reasons. Non-browser clients (Postman, curl, mobile native apps) ignore CORS entirely. Misconfigured CORS is one of the most common sources of frustration in web development, often resulting in cryptic "CORS policy" errors in the console.'],sections:[{heading:"What is an Origin?",content:"An origin is defined by the combination of protocol (scheme), host (domain), and port. Two URLs are same-origin only if all three match exactly:",list:["<strong>Same origin examples:</strong> https://example.com/app and https://example.com/api","<strong>Different origin examples:</strong>","http://example.com vs https://example.com (different protocol)","https://example.com vs https://api.example.com (different subdomain)","https://example.com:80 vs https://example.com:443 (different port)","https://example.com vs https://www.example.com (different subdomain)"],additionalExplanation:"Even a single difference makes the request cross-origin and subject to CORS restrictions."},{heading:"Simple Requests vs Preflight Requests",content:"Browsers categorize cross-origin requests into two types:",list:["<strong>Simple Requests:</strong> Allowed without preflight if they meet strict criteria:","- Method: GET, HEAD, or POST","- Headers: Only Accept, Accept-Language, Content-Language, Content-Type (limited values: application/x-www-form-urlencoded, multipart/form-data, text/plain)","- No credentials (cookies) unless explicitly allowed",'<strong>Preflight Requests:</strong> For any "non-simple" request, the browser first sends an OPTIONS request to check permissions:',"- Uses methods like PUT, DELETE, PATCH","- Custom headers (e.g., Authorization, X-API-Key)","- Content-Type like application/json","- With credentials (cookies, HTTP auth)"],additionalExplanation:"Preflight adds latency (extra round-trip), so design APIs to allow simple requests when possible."},{heading:"Key CORS Response Headers",content:"Servers use these headers to declare what cross-origin requests are permitted:",list:['<strong>Access-Control-Allow-Origin:</strong> Specifies allowed origins. Use specific domain (e.g., https://myapp.com) or "*" (wildcard, but cannot be used with credentials)',"<strong>Access-Control-Allow-Methods:</strong> Lists permitted HTTP methods (e.g., GET, POST, PUT, DELETE, OPTIONS)","<strong>Access-Control-Allow-Headers:</strong> Lists allowed request headers (e.g., Content-Type, Authorization, X-Requested-With)",'<strong>Access-Control-Allow-Credentials:</strong> Set to "true" to allow cookies/auth credentials. Requires exact origin (no "*")',"<strong>Access-Control-Expose-Headers:</strong> Allows clients to read specific response headers (by default, only basic ones are exposed)","<strong>Access-Control-Max-Age:</strong> How long (in seconds) preflight response can be cached (e.g., 86400 = 24 hours)"]},{heading:"Common CORS Scenarios",content:"Real-world patterns and pitfalls:",list:["<strong>Public API:</strong> Allow all origins with Access-Control-Allow-Origin: *","<strong>Authenticated API:</strong> Require exact origin + credentials: true","<strong>Development vs Production:</strong> Often more permissive in dev, stricter in prod","<strong>Third-party integrations:</strong> Whitelist specific partner domains","<strong>Proxies:</strong> Some developers use reverse proxies (e.g., Nginx) or CORS proxy services to bypass CORS (not recommended for production)"]}],codeExamples:[{title:"CORS Response Headers Example",language:"http",code:`# Successful response with CORS headers
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: https://myfrontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 3600

{"data": "Hello from API!"}`},{title:"Preflight Request and Response",language:"http",code:`# Browser sends preflight (OPTIONS)
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://myapp.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, Authorization

# Server response
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400`},{title:"Express.js CORS Middleware Configuration",language:"javascript",code:`const express = require('express');
const cors = require('cors');
const app = express();

// Basic: Allow specific origin
app.use(cors({
  origin: 'https://myfrontend.com',
  credentials: true
}));

// Advanced: Dynamic origin validation
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://myfrontend.com', 'https://admin.myapp.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400
}));

app.get('/api/data', (req, res) => {
  res.json({ message: 'CORS configured successfully!' });
});`},{title:"Frontend Fetch with Credentials",language:"javascript",code:`// Must include credentials: 'include' to send cookies
fetch('https://api.example.com/user/profile', {
  method: 'GET',
  credentials: 'include', // Sends cookies
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) throw new Error('Request failed');
  return response.json();
})
.then(data => console.log(data))
.catch(err => console.error('CORS or auth error:', err));`},{title:"Common CORS Error in Browser Console",language:"text",code:`Access to fetch at 'https://api.example.com/data' from origin 'https://myapp.com' has been blocked by CORS policy: 

- No 'Access-Control-Allow-Origin' header is present on the requested resource.
- Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header.
- The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.`}],keyPoints:["CORS is a browser-enforced security feature to protect users from cross-site request forgery and data theft","Same-Origin Policy is the default restriction; CORS is the opt-in relaxation","Only servers control CORS via response headers\u2014clients cannot bypass it","Simple requests (GET/POST with basic headers) skip preflight; others require OPTIONS check","Never use Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true in production","Preflight caching (Max-Age) improves performance for complex requests","CORS errors appear in browser dev tools\u2014always check Network tab for missing headers","Use middleware/libraries (cors package, Spring Security, etc.) for easy configuration"],bestPractices:['Always specify exact origins in production\u2014avoid wildcard "*" unless truly public API',"Enable credentials only when necessary (for cookie-based auth)","List only required methods and headers to minimize attack surface","Set reasonable Access-Control-Max-Age (e.g., 86400 seconds) to reduce preflight overhead","Handle OPTIONS requests properly (return 204 No Content for preflight)","Use environment-specific configs (permissive in dev, strict in prod)","Log and monitor CORS-related errors in production","For SPAs, consider using a proxy during development (e.g., Vite/React proxy)"]};var P={title:"TypeScript Data Types",tags:["TypeScript","Types","Fundamentals","Angular","Static Typing"],paragraphs:["TypeScript's powerful type system is the foundation of writing robust, maintainable, and self-documenting code in Angular applications. It extends JavaScript's dynamic types with static typing, allowing developers to define exactly what kind of data a variable, parameter, or function can hold. This catches errors early during development, improves IDE intelligence, and makes large codebases far easier to understand and refactor.","While type annotations are optional (TypeScript often infers types automatically), explicit typing is highly recommended for clarity, especially in Angular components, services, and models. Mastering TypeScript's rich set of primitive, object, and advanced types enables developers to model real-world data accurately and prevent entire classes of runtime bugs.","From basic primitives like string and number to sophisticated constructs like unions, intersections, literals, and generics, TypeScript provides tools to express complex data relationships with precision\u2014making it indispensable for enterprise-scale Angular projects."],sections:[{heading:"Primitive Types",content:"These are the basic building blocks for simple values. TypeScript enforces them strictly at compile time:",list:["<strong>string:</strong> Represents text. Use single, double, or template literals.","<strong>number:</strong> Covers integers, floats, Infinity, NaN. No separate int/float distinction.","<strong>boolean:</strong> Only true or false (lowercase).","<strong>null & undefined:</strong> Represent absence of value. null for intentional absence, undefined for uninitialized.","<strong>symbol:</strong> Unique, immutable identifiers (ES6 feature). Useful for object keys.","<strong>bigint:</strong> Arbitrary-precision integers (e.g., 123n). For numbers beyond Number.MAX_SAFE_INTEGER."],additionalExplanation:"Primitive types are immutable and passed by value."},{heading:"Object Types: Interfaces and Type Aliases",content:"TypeScript excels at describing complex object shapes using interfaces or type aliases:",list:["<strong>interface:</strong> Defines object contracts. Extensible with extends and ideal for class implementation.","<strong>type:</strong> More flexible\u2014can represent unions, primitives, or complex combinations.","<strong>Optional properties:</strong> Use ? for properties that may be missing.","<strong>Readonly properties:</strong> Use readonly to prevent mutation.","<strong>Index signatures:</strong> For dynamic keys (e.g., { [key: string]: number })"]},{heading:"Collection Types: Arrays and Tuples",content:"Typed collections for ordered data:",list:["<strong>Array<T> or T[]:</strong> Homogeneous arrays of type T.","<strong>ReadonlyArray<T>:</strong> Immutable arrays.","<strong>Tuple:</strong> Fixed-length, heterogeneous arrays with known types at each position.","<strong>Destructuring:</strong> Tuples shine when returning multiple values from functions."]},{heading:"Special Types",content:"Built-in types for edge cases and type safety:",list:["<strong>any:</strong> Opt-out of type checking. Avoid\u2014it defeats TypeScript's purpose.","<strong>unknown:</strong> Safer alternative to any. Requires type narrowing before use.","<strong>void:</strong> For functions that return nothing (or undefined).","<strong>never:</strong> For functions that never return (e.g., throw errors or infinite loops).","<strong>object:</strong> Generic non-primitive type (not very specific\u2014prefer interfaces)."]},{heading:"Advanced Types: Unions, Intersections, and Literals",content:"Powerful tools for modeling precise data:",list:["<strong>Union Types (A | B):</strong> Value can be one of several types.","<strong>Intersection Types (A & B):</strong> Combines multiple types (all properties required).",'<strong>Literal Types:</strong> Restrict to exact values (e.g., "left" | "right" | "center").',"<strong>Type Narrowing:</strong> Use typeof, instanceof, or discriminants to refine unions.","<strong>Discriminated Unions:</strong> Pattern using a common literal property for safe type narrowing."]},{heading:"Function Types",content:"TypeScript can describe function signatures precisely:",list:["<strong>Parameter & Return Types:</strong> Annotate parameters and return values.","<strong>Optional Parameters:</strong> Use ? (must come after required).","<strong>Default Parameters:</strong> Provide defaults (type inferred or explicit).","<strong>Overloads:</strong> Multiple signatures for the same function.","<strong>Rest Parameters:</strong> ...args: T[] for variable arguments."]}],codeExamples:[{title:"Primitive Types and Basic Annotations",language:"typescript",code:`let name: string = "Soumya";
let age: number = 28;
let isDeveloper: boolean = true;

let nothing: null = null;
let uninitialized: undefined = undefined;

let uniqueId: symbol = Symbol('id');
let largeNumber: bigint = 9007199254740992n;

// Type inference (no annotation needed)
let inferred = "TypeScript infers string here";`},{title:"Object Shapes with Interfaces and Types",language:"typescript",code:`interface User {
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
};`},{title:"Arrays, Tuples, and Readonly Collections",language:"typescript",code:`let scores: number[] = [95, 87, 91];
let names: Array<string> = ["Alice", "Bob"];

const immutableScores: ReadonlyArray<number> = [100, 95];
// immutableScores.push(90); // Error!

// Tuple: fixed length and types
let person: [string, number, boolean] = ["John", 30, true];
// person = ["Jane", 25]; // Error: wrong length
// person[2] = "yes";     // Error: wrong type

// Destructuring tuples
const [username, userAge] = person;`},{title:"Any vs Unknown: Type Safety",language:"typescript",code:`let flexible: any = "could be anything";
flexible = 42;
flexible.toUpperCase(); // No error at compile time (dangerous!)

let safe: unknown = "might be anything";
// safe.toUpperCase();   // Error: must narrow first

if (typeof safe === "string") {
  console.log(safe.toUpperCase()); // OK after narrowing
}`},{title:"Union Types, Literal Types, and Type Narrowing",language:"typescript",code:`type Status = "pending" | "approved" | "rejected"; // Literal union

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
entityId = "user-456";`},{title:"Discriminated Unions (Common Angular Pattern)",language:"typescript",code:`interface Success {
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
}`},{title:"Function Types and Overloads",language:"typescript",code:`function greet(name: string): string;
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
}`}],keyPoints:["Primitives: string, number, boolean, null, undefined, symbol, bigint","Use interfaces for object shapes; type aliases for unions and complex types","Arrays: T[] or Array<T>; Tuples for fixed heterogeneous collections","Union types (A | B) and literal types for precise modeling","Discriminated unions are essential for state management in Angular","Prefer unknown over any for dynamic data","Type inference reduces boilerplate but explicit types improve readability","Never use any in production code\u2014it disables type checking"],bestPractices:['Enable "strict" mode in tsconfig.json for maximum type safety',"Use interfaces for public APIs and models; type aliases for unions/intersections","Prefer const assertions and as const for literal inference","Narrow unions with typeof, instanceof, or discriminated properties","Define API response types as discriminated unions","Use readonly for immutable data and ReadonlyArray for collections","Avoid any\u2014refactor to proper types or unknown with narrowing","Leverage type inference but add annotations for function parameters and returns"]};var O={title:"TypeScript Interfaces",tags:["TypeScript","Interfaces","OOP","Angular","Type Safety"],paragraphs:["Interfaces in TypeScript are a powerful way to define contracts for object shapes, function signatures, and class structures. They specify exactly what properties, methods, or index signatures an object must (or may) have, enabling strong type checking at compile time. Unlike classes, interfaces are purely a type-level construct\u2014they are completely erased during compilation and add no runtime overhead.","In Angular applications, interfaces are indispensable for modeling data from APIs, defining component inputs/outputs, creating service contracts, and ensuring consistent shapes across components and services. They promote clean architecture, improve IDE autocomplete and refactoring, facilitate team collaboration, and catch structural errors early\u2014making code more maintainable and less prone to runtime bugs.","Interfaces are often preferred over type aliases for defining object shapes because they support declaration merging, extension via extends, and are the standard for class implementation contracts. Mastering interfaces is key to writing idiomatic, type-safe TypeScript code in Angular projects."],sections:[{heading:"Basic Interface Declaration",content:"An interface defines the required and optional properties of an object:",list:["<strong>Required properties:</strong> Must be present with correct types","<strong>Optional properties:</strong> Marked with ? and can be omitted","<strong>Readonly properties:</strong> Marked with readonly to prevent reassignment after initialization","<strong>Arbitrary properties:</strong> Use index signatures for dynamic keys"]},{heading:"Extending Interfaces",content:"Interfaces can inherit from one or more other interfaces using extends, promoting reuse and hierarchy:",list:["<strong>Single inheritance:</strong> Extend one interface","<strong>Multiple inheritance:</strong> Extend multiple interfaces (comma-separated)","<strong>Declaration merging:</strong> Same-name interfaces automatically merge (useful for augmenting third-party types)"]},{heading:"Function and Hybrid Interfaces",content:"Interfaces can describe callable signatures or combine object and function types:",list:["<strong>Function interfaces:</strong> Define parameter and return types for functions","<strong>Hybrid types:</strong> Objects that are both callable and have properties (e.g., for advanced patterns like jQuery-style APIs)"]},{heading:"Index Signatures and Dynamic Properties",content:"For objects with unknown keys but known value types:",list:["<strong>String index:</strong> [key: string]: type","<strong>Number index:</strong> [key: number]: type","<strong>Mixed:</strong> Combine with fixed properties (index signature must be compatible)"]},{heading:"Classes Implementing Interfaces",content:"Classes can implement one or more interfaces, enforcing structure:",list:["<strong>Multiple implementation:</strong> A class can implement several interfaces","<strong>Access modifiers:</strong> public, private, protected work with interface properties","<strong>Abstract vs concrete:</strong> Interfaces ensure implementation of all members"]},{heading:"Interfaces vs Type Aliases",content:"While similar for object shapes, they have key differences:",list:["<strong>Interfaces:</strong> Extensible (extends, declaration merging), ideal for object contracts and class implementation","<strong>Type aliases:</strong> Can represent unions, intersections, primitives, tuples; cannot be extended or merged","<strong>When to choose:</strong> Use interfaces for object shapes unless you need union/intersection features"]}],codeExamples:[{title:"Basic Interface with Optional, Readonly, and Array Properties",language:"typescript",code:`interface User {
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
// user.id = "one";             // Error: type mismatch`},{title:"Extending Interfaces (Single and Multiple)",language:"typescript",code:`interface Person {
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
};`},{title:"Index Signatures for Dynamic Objects",language:"typescript",code:`interface StringDictionary {
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
// const bad: StringDictionary = { count: 42 };`},{title:"Function Interfaces and Hybrid Types",language:"typescript",code:`// Function interface
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
myCounter.reset();`},{title:"Class Implementing Multiple Interfaces",language:"typescript",code:`interface Drawable {
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
myCircle.resize(1.5);`},{title:"Declaration Merging Example",language:"typescript",code:`// First declaration
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
window.debugMode = true;`}],keyPoints:["Interfaces define contracts for object shapes, functions, and classes","Support optional (?) and readonly properties","Can extend multiple interfaces and support declaration merging","Index signatures enable dynamic property typing","Classes can implement multiple interfaces for polymorphism","Purely compile-time\u2014no runtime impact","Preferred over type aliases for object shapes and public APIs","Essential in Angular for typing models, props, and service contracts"],bestPractices:["Use interfaces for object shapes and class contracts; type aliases for unions/intersections","Name interfaces with clear, noun-based names (e.g., UserProfile, ApiResponse)","Leverage optional properties and index signatures for flexible APIs","Extend base interfaces to build hierarchies (e.g., BaseEntity \u2192 User \u2192 Admin)","Use readonly for immutable data (e.g., IDs, creation timestamps)","Implement interfaces in classes for clear contracts and better documentation","Take advantage of declaration merging to augment third-party types safely","Avoid overly broad interfaces\u2014keep them focused and single-responsibility"]};var I={title:"REST APIs",tags:["Web Fundamentals","APIs","HTTP"],paragraphs:["REST (Representational State Transfer) is an architectural style for designing networked applications. Introduced by Roy Fielding in his 2000 doctoral dissertation, REST defines a set of constraints that, when applied to the design of web services, create scalable, maintainable, and performant APIs.","RESTful APIs use standard HTTP methods to perform CRUD operations (Create, Read, Update, Delete) on resources identified by URLs. They emphasize stateless communication, resource-based URLs, cacheability, and a uniform interface. This makes them predictable, scalable, and easy to integrate across different platforms.","RESTful APIs are the backbone of modern web and mobile applications. They provide a standardized, language-agnostic way for clients (browsers, mobile apps, IoT devices) to communicate with servers, enabling separation of frontend and backend concerns and facilitating third-party integrations."],sections:[{heading:"Six Guiding Principles of REST",content:"REST is defined by six architectural constraints (one optional). Adhering to these principles ensures the API is truly RESTful and gains the benefits of scalability, performance, and simplicity.",list:["<strong>Client-Server:</strong> Separates concerns \u2014 the client handles the user interface and experience, while the server manages data storage, business logic, and persistence. This improves portability and allows independent evolution of both sides.","<strong>Stateless:</strong> Each request from the client must contain all the information needed to process it. The server does not store client context between requests. This improves scalability (any server can handle any request) and reliability.","<strong>Cacheable:</strong> Responses must explicitly indicate whether they can be cached and for how long (using headers like Cache-Control and ETag). Caching reduces server load and improves performance.","<strong>Uniform Interface:</strong> The key constraint that simplifies architecture. It consists of four sub-constraints: resource identification via URIs, manipulation through representations, self-descriptive messages, and HATEOAS (Hypermedia as the Engine of Application State).","<strong>Layered System:</strong> The architecture can be composed of layers (load balancers, proxies, gateways). Clients cannot tell whether they are connected directly to the end server or an intermediary, enabling scalability and shared caching.","<strong>Code on Demand (Optional):</strong> Servers can optionally send executable code (e.g., JavaScript) to extend client functionality. This is rarely used in pure REST APIs today."]},{heading:"Resource-Based URLs and HTTP Methods",content:"In REST, resources (e.g., users, products, orders) are represented by nouns in URLs. Actions are expressed through standard HTTP methods rather than encoded in the URL. This creates clean, intuitive endpoints.",list:["<strong>GET /users</strong> \u2192 Retrieve a collection of users (safe and idempotent)","<strong>GET /users/123</strong> \u2192 Retrieve a specific user (safe and idempotent)","<strong>POST /users</strong> \u2192 Create a new user (not idempotent)","<strong>PUT /users/123</strong> \u2192 Replace the entire user resource (idempotent)","<strong>PATCH /users/123</strong> \u2192 Partially update the user (not necessarily idempotent)","<strong>DELETE /users/123</strong> \u2192 Delete the user (idempotent)","<strong>Sub-resources:</strong> GET /users/123/orders \u2192 Get orders for a specific user"],additionalExplanation:"Idempotent methods (GET, PUT, DELETE, HEAD) can be called multiple times with the same effect as calling once. Safe methods (GET, HEAD) do not modify server state."},{heading:"Common HTTP Status Codes in REST",content:"REST APIs use standard HTTP status codes to indicate the result of a request. This makes responses self-descriptive and reduces the need for custom error formats.",list:["<strong>2xx Success:</strong> 200 OK (general success), 201 Created (resource created), 204 No Content (success, no body)","<strong>3xx Redirection:</strong> 301 Moved Permanently, 304 Not Modified (for caching)","<strong>4xx Client Errors:</strong> 400 Bad Request (malformed request), 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity (validation errors)","<strong>5xx Server Errors:</strong> 500 Internal Server Error, 503 Service Unavailable"]},{heading:"HATEOAS (Hypermedia as the Engine of Application State)",content:"A key part of the uniform interface constraint. Responses include links to related resources, allowing clients to discover available actions dynamically rather than hard-coding URLs.",example:'Instead of the client knowing to go to "/reviews" next, the server includes links in the response, making the API more discoverable and evolvable.'}],codeExamples:[{title:"Common RESTful Endpoints for a Product Resource",language:"text",code:`# Collection and Individual Resources
GET    /api/products              # List all products (with optional query params: ?category=electronics&page=2)
GET    /api/products/42           # Get product with id 42
POST   /api/products              # Create new product (body: JSON payload)
PUT    /api/products/42           # Replace entire product 42
PATCH  /api/products/42           # Partial update (e.g., only change price)
DELETE /api/products/42           # Delete product 42

# Nested/Sub-resources
GET    /api/products/42/reviews   # Get reviews for product 42
POST   /api/products/42/reviews   # Add a new review`},{title:"Example JSON Response with HATEOAS Links",language:"json",code:`{
  "id": 42,
  "name": "Wireless Headphones",
  "price": 149.99,
  "description": "Premium noise-cancelling headphones",
  "inStock": true,
  "_links": {
    "self": { "href": "/api/products/42" },
    "reviews": { "href": "/api/products/42/reviews" },
    "category": { "href": "/api/categories/electronics" },
    "addToCart": { "href": "/api/cart/items", "method": "POST" }
  }
}`},{title:"Client-Side Fetch Example (JavaScript)",language:"javascript",code:`// GET request
fetch('/api/products/42')
  .then(res => {
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));

// POST request (create)
fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Smart Watch',
    price: 299.99
  })
})
  .then(res => res.status === 201 ? res.json() : Promise.reject(res.status));`},{title:"Error Response Example",language:"json",code:`{
  "error": "Validation failed",
  "status": 422,
  "details": [
    { "field": "price", "message": "Price must be positive" },
    { "field": "name", "message": "Name is required" }
  ],
  "_links": {
    "documentation": { "href": "/docs/errors#validation" }
  }
}`}],keyPoints:["REST uses standard HTTP methods for CRUD operations (GET, POST, PUT/PATCH, DELETE)","URLs represent resources (nouns), not actions (verbs)","Stateless: No server-side session storage; each request is independent","Leverages HTTP features: caching, status codes, content negotiation","Responses often use JSON (though XML, YAML, etc. are possible)","Highly scalable due to statelessness and cacheability","Self-descriptive with proper use of status codes and HATEOAS links","Versioning strategies: URL versioning (/v1/products), header-based, or media-type versioning"],bestPractices:["Use nouns for resources and plural forms (e.g., /users not /user)","Support filtering, sorting, and pagination for collection endpoints","Implement proper authentication (e.g., JWT, OAuth)","Rate limiting and throttling to prevent abuse","Consistent error format across the API","Document with OpenAPI/Swagger for discoverability"]};var R={title:"TypeScript Classes",tags:["TypeScript","OOP","Classes","Angular","Inheritance","Encapsulation"],paragraphs:["TypeScript classes are a cornerstone of object-oriented programming in modern JavaScript ecosystems. Building directly on ES6 class syntax, TypeScript adds powerful static typing features like access modifiers, parameter properties, abstract classes, and definite assignment assertions. These enhancements enable better encapsulation, inheritance, polymorphism, and code organization while maintaining full compatibility with JavaScript.","In Angular applications, classes are fundamental\u2014every component, service, directive, pipe, and module is defined as a TypeScript class decorated with metadata (@Component, @Injectable, etc.). The combination of classes and decorators allows Angular to provide dependency injection, change detection, and a structured architecture. Understanding TypeScript classes deeply is essential for writing clean, maintainable, and scalable Angular code.","Classes in TypeScript are compiled to JavaScript functions (using prototype-based inheritance under the hood) but provide a clearer, more familiar syntax for developers coming from languages like Java or C#. They support single inheritance, interfaces for multiple contract implementation, and runtime features like static members while adding compile-time safety through types."],sections:[{heading:"Class Declaration and Constructors",content:"A class defines a blueprint for creating objects with properties (fields) and methods:",list:["<strong>Constructor:</strong> Special method called when instantiating with new","<strong>Instance members:</strong> Properties and methods on this","<strong>Definite assignment:</strong> Use ! for properties initialized later (e.g., in ngOnInit)"]},{heading:"Access Modifiers",content:"TypeScript provides three access modifiers for encapsulation:",list:["<strong>public:</strong> Accessible from anywhere (default)","<strong>private:</strong> Accessible only within the class","<strong>protected:</strong> Accessible in the class and subclasses","<strong>readonly:</strong> Prevents reassignment after initialization (can be combined with access modifiers)"],additionalExplanation:"Access modifiers are enforced at compile time but erased in JavaScript (use for documentation and safety)."},{heading:"Parameter Properties (Constructor Shorthand)",content:"A concise way to declare and initialize class properties directly in the constructor:",list:["<strong>Syntax:</strong> Add access modifier before parameter name","<strong>Benefits:</strong> Reduces boilerplate significantly","<strong>Common in Angular:</strong> Used heavily in components and services"]},{heading:"Inheritance and Polymorphism",content:"Classes can extend others using extends and override methods:",list:["<strong>extends:</strong> Single inheritance from another class","<strong>super():</strong> Call parent constructor or methods","<strong>Method overriding:</strong> Subclass provides specific implementation","<strong>Polymorphism:</strong> Treat subclass instances as parent type"]},{heading:"Abstract Classes",content:"Base classes that cannot be instantiated directly and may contain abstract members:",list:["<strong>abstract keyword:</strong> On class and methods/properties","<strong>Purpose:</strong> Define common structure and force implementation in subclasses","<strong>Use case:</strong> Shared logic with required overrides"]},{heading:"Getters, Setters, and Computed Properties",content:"Special methods that look like property access but execute custom logic:",list:["<strong>get:</strong> Called when reading property","<strong>set:</strong> Called when assigning property","<strong>Validation:</strong> Common use case for input validation","<strong>Computed values:</strong> Derive values without storing state"]},{heading:"Static Members",content:"Properties and methods that belong to the class itself, not instances:",list:["<strong>static keyword:</strong> On properties and methods","<strong>Access:</strong> Via class name (ClassName.staticMethod())","<strong>Use cases:</strong> Utilities, constants, factory methods"]},{heading:"Classes and Interfaces",content:"Classes can implement interfaces to guarantee structure:",list:["<strong>implements:</strong> Check that class satisfies interface","<strong>Multiple interfaces:</strong> Comma-separated","<strong>Common in Angular:</strong> Services often implement interfaces for testability"]}],codeExamples:[{title:"Basic Class with Access Modifiers and Readonly",language:"typescript",code:`class User {
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
// user.createdAt = new Date(); // Error: readonly`},{title:"Parameter Properties Shorthand (Common in Angular)",language:"typescript",code:`class Product {
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
console.log(laptop.getPrice()); // 1499`},{title:"Inheritance with super() and Method Overriding",language:"typescript",code:`class Vehicle {
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
console.log(myCar.getAge(2026)); // 3`},{title:"Abstract Classes for Shared Structure",language:"typescript",code:`abstract class Repository<T> {
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

// const repo = new Repository(); // Error: abstract`},{title:"Getters and Setters with Validation",language:"typescript",code:`class BankAccount {
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
// account.balance = -100;    // Throws error`},{title:"Static Members and Utility Classes",language:"typescript",code:`class DateUtils {
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
console.log(DateUtils.isWeekend(new Date()));`},{title:"Angular Component Class Example",language:"typescript",code:`import { Component, OnInit } from '@angular/core';

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
}`},{title:"Class Implementing Multiple Interfaces",language:"typescript",code:`interface Identifiable {
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
task.log();`}],keyPoints:["Classes support ES6 syntax with TypeScript enhancements","Access modifiers (public, private, protected) enforce encapsulation at compile time","Parameter properties reduce constructor boilerplate","Single inheritance with extends; multiple interface implementation","Abstract classes define shared structure with required implementations","Getters/setters enable computed properties and validation","Static members belong to the class, not instances","Essential building blocks for Angular components, services, and directives"],bestPractices:["Use parameter properties in constructors to reduce boilerplate","Prefer private over protected unless inheritance is required","Mark immutable properties as readonly","Use abstract classes for shared logic with forced overrides","Implement interfaces for clear contracts and better testability","Leverage getters/setters for validation and computed values","Keep static utilities in dedicated classes (e.g., DateUtils, StringUtils)","Use definite assignment assertion (!) cautiously in Angular lifecycle hooks","Avoid deep inheritance hierarchies\u2014favor composition over inheritance"]};var k={title:"TypeScript Enums",tags:["TypeScript","Enums","Constants","Angular","Type Safety"],paragraphs:["Enums (enumerations) in TypeScript provide a way to define a set of named constants, making code more readable, self-documenting, and maintainable. Unlike most TypeScript features that are erased at compile time, enums have a runtime representation\u2014they compile to JavaScript objects, allowing reverse lookups and runtime checks.","Enums are particularly valuable when working with finite sets of distinct values, such as status codes, user roles, directions, categories, or configuration options. In Angular applications, enums are widely used for modeling state in components, services, and templates, providing strong type safety, excellent IDE autocomplete, and preventing invalid values from being assigned.","TypeScript supports several enum variants: numeric, string, heterogeneous, and const enums. Choosing the right type improves both type safety and performance. When used properly, enums make intent clear and reduce magic strings/numbers scattered throughout the codebase."],sections:[{heading:"Numeric Enums",content:"The most common enum type. Values auto-increment starting from 0 (or a custom initial value):",list:["<strong>Auto-incrementing:</strong> Subsequent members get incremental values","<strong>Custom starting value:</strong> Set first member explicitly","<strong>Manual values:</strong> Assign specific numbers to any member",'<strong>Reverse mapping:</strong> Access name from value (e.g., Direction[1] === "Up")'],additionalExplanation:"Numeric enums are useful when order matters or when interfacing with APIs that use numeric codes."},{heading:"String Enums",content:"Each member must be explicitly assigned a string value. No auto-incrementing:",list:["<strong>Explicit strings:</strong> Every member needs a string literal","<strong>No reverse mapping:</strong> Cannot get name from value at runtime","<strong>Better readability:</strong> Values are human-readable strings","<strong>Serialization friendly:</strong> Direct use in JSON, logs, APIs"],additionalExplanation:"String enums are preferred in Angular when values are displayed to users or sent over the network."},{heading:"Const Enums",content:"Declared with the const keyword. They are completely inlined at compile time:",list:["<strong>No runtime object:</strong> Values are substituted directly (better tree-shaking)","<strong>Performance optimized:</strong> Smaller bundle size","<strong>No reverse mapping:</strong> Like string enums","<strong>Limitations:</strong> Cannot use computed values; external references require preserveConstEnums"],additionalExplanation:"Use const enums for compile-time constants like HTTP status codes."},{heading:"Heterogeneous Enums and Computed Members",content:"Mixing string and number values (discouraged) or using computed expressions:",list:["<strong>Heterogeneous:</strong> Mix strings and numbers (can cause confusion)","<strong>Computed values:</strong> Use expressions (e.g., Date.now()), but only in regular enums","<strong>Best practice:</strong> Avoid heterogeneous and computed enums for clarity"]},{heading:"Enums in Angular Templates and Components",content:"Enums integrate seamlessly with Angular's template system:",list:["<strong>Exposing to templates:</strong> Assign enum to component property","<strong>Type-safe comparisons:</strong> Use in *ngIf, switch cases","<strong>Dropdowns/selects:</strong> Iterate with Object.values/keys","<strong>Pipes and directives:</strong> Can accept enum types"]},{heading:"Enums vs Alternatives",content:"Sometimes other patterns are preferable:",list:['<strong>Union of literals:</strong> type Status = "pending" | "active" | "inactive" (no runtime overhead)',"<strong>Object with as const:</strong> Better for string unions with no runtime cost","<strong>When to use enums:</strong> Need runtime values, reverse lookup, or legacy compatibility","<strong>When to avoid:</strong> Pure type-level constants (prefer literal unions)"]}],codeExamples:[{title:"Numeric Enums with Auto-Increment and Manual Values",language:"typescript",code:`enum OrderStatus {
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
}`},{title:"String Enums for Readability and Serialization",language:"typescript",code:`enum UserRole {
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
// Output: [ERROR] Something went wrong`},{title:"Const Enums for Performance (Inlined at Compile Time)",language:"typescript",code:`const enum HttpStatus {
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

// Compiled JS has no HttpStatus object - values are inlined`},{title:"Advanced Enum Usage in Angular Component",language:"typescript",code:`export enum ProductCategory {
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
}`},{title:"Enum Iteration and Type-Safe Handling",language:"typescript",code:`enum Color {
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
}`},{title:"Alternative: Literal Union Types (No Runtime Overhead)",language:"typescript",code:`type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const status: OrderStatus = 'processing';
// status = 'invalid'; // Error!

// Often preferred over string enums for pure type safety
const LOG_LEVELS = ['ERROR', 'WARN', 'INFO', 'DEBUG'] as const;
type LogLevel = typeof LOG_LEVELS[number]; // "ERROR" | "WARN" | ...`}],keyPoints:["Enums define named constant sets for improved readability","Numeric enums support auto-increment and reverse mapping","String enums provide human-readable values with no reverse mapping","Const enums are inlined for optimal performance and bundle size","Enums have runtime presence (except const enums)","Excellent for status codes, roles, categories in Angular","Provide strong typing and IDE autocomplete","Consider literal unions for type-only constants"],bestPractices:["Prefer string enums or const enums over numeric for clarity","Use const enums for HTTP codes, fixed configurations","Expose enums to Angular templates via component properties","Iterate with Object.values() for dropdowns and lists","Avoid heterogeneous enums to prevent confusion","Use literal union types when no runtime value is needed","Name enum members in UPPER_CASE for constants","Document complex enums with comments or separate files"]};var U={title:"TypeScript vs JavaScript",tags:["TypeScript","JavaScript","Fundamentals","Typing","Angular"],paragraphs:["TypeScript (TS) is a statically-typed superset of JavaScript (JS) developed and maintained by Microsoft since 2012. It adds optional static type annotations, advanced type features, and compile-time type checking on top of standard JavaScript syntax. All valid JavaScript code is also valid TypeScript, but TypeScript code is transpiled (compiled) to plain JavaScript before execution in browsers or Node.js.","The primary advantage of TypeScript is catching errors early\u2014during development rather than at runtime. This leads to fewer bugs in production, better developer experience with intelligent autocomplete and refactoring, self-documenting code through types, and easier maintenance in large-scale applications. JavaScript's dynamic typing offers flexibility and faster prototyping but can lead to subtle runtime errors that are hard to debug.","TypeScript has become the standard for enterprise and large-scale web development. Frameworks like Angular are built entirely around TypeScript, while React, Vue, and NestJS have strong TypeScript support. Adopting TypeScript significantly improves code quality, team collaboration, and long-term maintainability."],sections:[{heading:"Core Differences: Static vs Dynamic Typing",content:"The most fundamental difference lies in when type errors are detected:",list:["<strong>JavaScript (Dynamic Typing):</strong> Types are checked at runtime. Variables can hold any value, and errors surface only when code executes.","<strong>TypeScript (Static Typing):</strong> Types are checked at compile time (or in the editor). The compiler enforces type consistency, catching mismatches before code runs.","<strong>Key Benefit:</strong> TypeScript prevents entire classes of bugs (e.g., calling methods on undefined, passing wrong argument types)."],additionalExplanation:"TypeScript types are completely erased during compilation\u2014they add zero runtime overhead."},{heading:"Powerful TypeScript Features Beyond JavaScript",content:"TypeScript introduces several language features that make code more robust and expressive:",list:["<strong>Interfaces & Types:</strong> Define object shapes and contracts","<strong>Enums:</strong> Named sets of constants for better readability","<strong>Generics:</strong> Create reusable, type-safe components and functions","<strong>Union & Intersection Types:</strong> Model complex data with precision","<strong>Tuple Types:</strong> Fixed-length arrays with known types","<strong>Literal Types:</strong> Restrict values to specific strings/numbers","<strong>Access Modifiers:</strong> public, private, protected, readonly","<strong>Decorators:</strong> Metadata annotations (heavily used in Angular)","<strong>Advanced Tooling:</strong> Superior autocomplete, refactoring, and navigation"]},{heading:"Why Angular Requires TypeScript",content:"Angular (from version 2 onward) is designed and built with TypeScript from the ground up. TypeScript enables key Angular features:",list:["<strong>Decorators:</strong> @Component, @Injectable, @Input, @Output for metadata","<strong>Strong Typing:</strong> Type-safe dependency injection, services, and components","<strong>Interfaces:</strong> Clean contracts for services, models, and APIs","<strong>Better IDE Support:</strong> Autocomplete for Angular-specific APIs and templates","<strong>Compile-Time Safety:</strong> Catch template errors and injection mistakes early"],additionalExplanation:"Attempting to use plain JavaScript with Angular is not practical\u2014official templates, documentation, and tooling all assume TypeScript."},{heading:"Pros and Cons Comparison",content:"Choosing between TypeScript and JavaScript depends on project size and requirements:",list:["<strong>TypeScript Advantages:</strong> Early error detection, better refactoring, self-documenting code, excellent tooling, scalability in large teams","<strong>TypeScript Drawbacks:</strong> Initial learning curve, compilation step, stricter syntax","<strong>JavaScript Advantages:</strong> Faster prototyping, no build step, maximum flexibility","<strong>JavaScript Drawbacks:</strong> Runtime errors, weaker IDE support, harder to maintain in large codebases"]},{heading:"When to Choose TypeScript",content:"TypeScript shines in these scenarios:",list:["Large applications or codebases (>10k lines)","Team development (improves collaboration)","Projects using Angular, NestJS, or enterprise React/Vue","Applications requiring long-term maintenance","When API contracts are complex or frequently changing"],additionalExplanation:"For small scripts, prototypes, or learning JavaScript basics, plain JS is often sufficient."}],codeExamples:[{title:"Runtime Error in JavaScript vs Compile-Time Error in TypeScript",language:"typescript",code:`// JavaScript (runs but fails at runtime)
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
greet(null);       // Compile error: Argument of type 'null' is not assignable to 'string'`},{title:"Interfaces and Object Shape Enforcement",language:"typescript",code:`interface User {
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
});`},{title:"Generics: Reusable Type-Safe Functions",language:"typescript",code:`// Generic identity function
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
// logLength(42);        // Error: number has no length property`},{title:"Enums for Better Code Clarity",language:"typescript",code:`enum UserRole {
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
console.log(user.role); // UserRole.Admin`},{title:"Angular Component Example (TypeScript Required)",language:"typescript",code:`import { Component, Input, Output, EventEmitter } from '@angular/core';

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
}`}],keyPoints:["TypeScript is a superset of JavaScript\u2014all JS code is valid TS","Static typing catches errors at compile time, not runtime","Zero runtime overhead\u2014types are erased during compilation","Excellent IDE support: autocomplete, refactoring, navigation","Required for modern Angular development","Improves scalability and maintainability in large projects","Features like generics, interfaces, enums, and decorators add expressiveness","Gradual adoption possible\u2014start with .ts files and any types"],bestPractices:['Use strict mode in tsconfig.json ("strict": true) for maximum safety',"Define interfaces for API responses and component props","Leverage generics for reusable utilities and components","Use definite assignment assertion (!) or proper initialization to avoid null issues","Enable noImplicitAny to prevent implicit any types","Use ESLint + @typescript-eslint for consistent code style","Gradually migrate JS projects by renaming .js to .ts and adding types","Document complex types with JSDoc-style comments when needed"]};var N={title:"JSON (JavaScript Object Notation)",tags:["Data Format","Web Fundamentals","API","Serialization"],paragraphs:["JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. Introduced by Douglas Crockford in the early 2000s, it quickly became the standard for data exchange on the web, largely replacing XML due to its simplicity and smaller payload size.","Although derived from JavaScript object literal syntax, JSON is completely language-independent. Libraries exist for virtually every programming language, making it ideal for communication between heterogeneous systems\u2014browsers, servers, mobile apps, IoT devices, and more.","JSON's minimal syntax and strict rules make it predictable and reliable. It is the dominant format for RESTful APIs, configuration files, NoSQL databases (e.g., MongoDB documents), and client-server communication in modern web applications."],sections:[{heading:"JSON Syntax Rules",content:"JSON has a very strict and minimal syntax. Violations result in parsing errors, which enforces data integrity.",list:['<strong>Name/value pairs:</strong> Properties are written as "key": value (keys must be double-quoted strings)',"<strong>Commas:</strong> Separate items in objects and arrays (no trailing comma allowed)","<strong>Curly braces { }:</strong> Hold objects (unordered key-value collections)","<strong>Square brackets [ ]:</strong> Hold arrays (ordered lists of values)","<strong>Double quotes:</strong> Required for all strings and property names","<strong>No comments:</strong> JSON does not support comments (use a separate field if needed)","<strong>No trailing commas:</strong> Invalid in standard JSON (though some parsers tolerate them)"]},{heading:"Supported Data Types",content:"JSON supports only six primitive/value types. Complex structures are built by nesting objects and arrays.",list:['<strong>String:</strong> Unicode text in double quotes, e.g., "Hello \u{1F30D}"',"<strong>Number:</strong> Integer or floating-point (no distinction), e.g., 42, -10, 3.14, 1e5 (no NaN or Infinity)","<strong>Boolean:</strong> true or false (lowercase only)","<strong>Null:</strong> null (represents empty/no value)","<strong>Object:</strong> Unordered collection of key-value pairs enclosed in { }","<strong>Array:</strong> Ordered list of values (any type, including mixed) enclosed in [ ]"],additionalExplanation:"No support for undefined, functions, dates (use ISO strings), or binary data (use Base64 encoding)."},{heading:"JSON vs XML Comparison",content:"JSON largely replaced XML for web APIs due to several advantages:",list:["<strong>Conciseness:</strong> JSON is more compact (no closing tags)","<strong>Readability:</strong> Easier for humans to read and write","<strong>Parsing speed:</strong> Native support in JavaScript and faster parsers in most languages","<strong>Less verbosity:</strong> No namespaces, schemas, or attributes required","<strong>Drawbacks:</strong> No built-in schema validation (use JSON Schema separately), no comments"]},{heading:"Common Use Cases",content:"JSON is ubiquitous in modern development:",list:["API request/response payloads (REST/GraphQL)","Configuration files (package.json, tsconfig.json)","Data storage in NoSQL databases","Client-server communication (fetch/AJAX)","Logging and message queues (e.g., Kafka, RabbitMQ)","Internationalization files"]}],codeExamples:[{title:"Valid JSON Structure Example",language:"json",code:`{
  "user": {
    "id": 123,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "isActive": true,
    "roles": ["editor", "contributor"],
    "settings": {
      "theme": "dark",
      "notifications": true
    },
    "lastLogin": "2026-01-19T12:00:00Z",
    "metadata": null,
    "tags": ["premium", "verified"]
  },
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99
    },
    {
      "id": 2,
      "name": "Mouse",
      "price": 29.99
    }
  ]
}`},{title:"Working with JSON in TypeScript/JavaScript",language:"typescript",code:`// Parsing JSON string to object
const jsonString = '{"name":"Alice","age":28,"hobbies":["reading","coding"]}';
const user = JSON.parse(jsonString);

console.log(user.name); // "Alice"
console.log(user.hobbies[1]); // "coding"

// Stringifying object to JSON
const newUser = {
  name: "Bob",
  age: 35,
  admin: false
};

const jsonOutput = JSON.stringify(newUser, null, 2); // Pretty-print with indentation
console.log(jsonOutput);

/*
{
  "name": "Bob",
  "age": 35,
  "admin": false
}
*/

// Typed parsing
interface User {
  name: string;
  age: number;
  hobbies?: string[];
}

const typedUser: User = JSON.parse(jsonString);`},{title:"Using JSON with Fetch API",language:"typescript",code:`// Sending JSON in a POST request
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'Charlie',
    email: 'charlie@example.com'
  })
})
  .then(response => {
    if (!response.ok) throw new Error('Network error');
    return response.json(); // Parses JSON response automatically
  })
  .then(data => console.log('Created user:', data))
  .catch(err => console.error(err));`},{title:"Common JSON Parsing Errors",language:"json",code:`// Invalid examples (will throw SyntaxError when parsed)

// Single quotes (must be double)
{ 'name': 'John' }

// Trailing comma
{
  "name": "John",
  "age": 30,
}

// Missing quotes on keys
{ name: "John" }

// Using undefined or functions
{ "status": undefined, "callback": function() {} }`}],keyPoints:["Lightweight, human-readable, and machine-parsable data format","Strict syntax: double quotes, no trailing commas, no comments","Only 6 data types: string, number, boolean, null, object, array","Language-independent with native support in JavaScript","De facto standard for web APIs and configuration","Use JSON.parse() to convert string \u2192 object, JSON.stringify() to convert object \u2192 string","Always set Content-Type: application/json for API responses","Validate JSON using tools like JSON Schema for larger applications"],bestPractices:["Use double quotes consistently for keys and strings","Pretty-print with indentation during development (JSON.stringify(obj, null, 2))",'Represent dates as ISO 8601 strings (e.g., "2026-01-19T18:22:00Z")',"Handle parsing errors gracefully with try/catch","Validate incoming JSON payloads on the server","Use JSON Schema for defining and validating complex structures","Avoid deeply nested structures for better readability","Encode binary data as Base64 strings when needed"]};var D={"/prerequisites/web-fundamentals/rest-apis":I,"/prerequisites/web-fundamentals/json":N,"/prerequisites/web-fundamentals/cors":x,"/prerequisites/typescript/typescript-vs-javascript":U,"/prerequisites/typescript/data-types":P,"/prerequisites/typescript/interfaces":O,"/prerequisites/typescript/enums":k,"/prerequisites/typescript/classes":R},j=e=>({title:e,tags:["Angular","Tutorial"],paragraphs:[`This comprehensive topic on "${e}" will be covered in detail in the complete course. This section provides essential knowledge for Angular development.`,"Key concepts, best practices, and real-world examples will help you master this topic and apply it effectively in your Angular applications.","Continue exploring other topics in the sidebar to build your complete understanding of Angular development from fundamentals to advanced patterns."],keyPoints:[`Understanding ${e} is crucial for Angular development`,"Practice with hands-on examples to reinforce learning","Apply these concepts in real-world projects","Refer to official Angular documentation for more details"]});var L=()=>[];function J(e,s){if(e&1&&(i(0,"p"),d(1),a()),e&2){let t=s.$implicit;r(),u(t)}}function q(e,s){if(e&1&&w(0,"li",1),e&2){let t=s.$implicit;y("innerHTML",t,v)}}function H(e,s){if(e&1&&(i(0,"ul"),l(1,q,1,1,"li",1,c),a()),e&2){let t=f().$implicit;r(),p(t.list)}}function M(e,s){if(e&1&&(i(0,"h3"),d(1),a(),i(2,"p"),d(3),a(),g(4,H,3,0,"ul")),e&2){let t=s.$implicit;r(),u(t.heading),r(2),u(t.content),r(),m(t.list?4:-1)}}function F(e,s){if(e&1&&l(0,M,5,3,null,null,c),e&2){let t=f();p(t.content.sections)}}var pe=(()=>{class e{constructor(t){this.route=t,this.content={title:"",tags:[],paragraphs:[]},this.topicData=D}ngOnInit(){let t=this.route.snapshot.url.map(n=>n.path).join("/"),o="/"+t;if(this.topicData[o])this.content=this.topicData[o];else{let n=t.split("/").pop()?.split("-").map(b=>b.charAt(0).toUpperCase()+b.slice(1)).join(" ")||"Topic";this.content=j(n)}}static{this.\u0275fac=function(o){return new(o||e)(S(A))}}static{this.\u0275cmp=T({type:e,selectors:[["app-generic-topic"]],decls:4,vars:7,consts:[[3,"title","tags","codeExamples","keyPoints"],[3,"innerHTML"]],template:function(o,n){o&1&&(i(0,"app-topic-template",0),l(1,J,2,1,"p",null,c),g(3,F,2,0),a()),o&2&&(y("title",n.content.title)("tags",n.content.tags)("codeExamples",n.content.codeExamples||h(5,L))("keyPoints",n.content.keyPoints||h(6,L)),r(),p(n.content.paragraphs),r(2),m(n.content.sections?3:-1))},dependencies:[C,E],encapsulation:2})}}return e})();export{pe as GenericTopicComponent};
