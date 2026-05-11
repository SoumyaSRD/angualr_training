import{b as fn,e as vn,f as _e,g as bn,h as yn,i as he,j as fe,k as xn}from"./chunk-6J7NVHL7.js";import{$ as zt,$a as Z,A as Vt,Ab as nt,Bb as G,Cb as d,D as Ut,Db as y,Ea as Ce,Eb as R,Fa as $t,Fb as en,G as Nt,Ha as Xe,Ia as B,Ib as tn,J as Re,Ja as Wt,Jb as nn,K as U,Kb as rn,L as $e,Lb as on,Ma as L,Mb as Ve,N as le,Na as Qe,Nb as ge,O as We,Oa as X,Ob as an,P as M,Pa as Jt,Pb as sn,Qa as pe,Ra as Kt,S as jt,Ta as Yt,Vb as ln,W as C,Wa as Ze,X as w,Xa as Q,Xb as oe,Y as Lt,Ya as Xt,Yb as A,Z as Ht,Za as h,_a as f,_b as cn,a as D,ab as ee,ac as we,b as V,bb as k,bc as Y,c as Wn,ca as Fe,cb as E,cc as te,d as Ie,da as Bt,db as I,dc as dn,eb as s,fb as l,fc as pn,ga as b,gb as g,gc as un,h as Ot,hb as u,ia as ce,ib as m,ic as mn,ja as qt,jb as S,jc as gn,k as It,ka as Je,kb as et,lb as O,lc as rt,m as Dt,ma as Ke,mb as re,nb as x,ob as H,p as De,pb as p,qb as Qt,rb as Zt,tc as hn,ua as de,v as Rt,va as Ye,vb as ue,w as ye,wa as Gt,wb as me,x as Ft,xb as tt,xc as z,ya as xe,yb as K,za as i,zb as P}from"./chunk-LWJ6XB4K.js";var ot={title:"CORS (Cross-Origin Resource Sharing)",tags:["Security","Web Fundamentals","HTTP","Browser","API"],paragraphs:["CORS (Cross-Origin Resource Sharing) is a critical browser security mechanism that controls how web pages loaded from one origin can request resources from a different origin. It builds on the Same-Origin Policy (SOP), a foundational security rule that restricts JavaScript from making requests to domains other than the one that served the page, preventing malicious sites from stealing data or performing unauthorized actions.","Without CORS, modern web applications would be severely limited\u2014frontend apps on one domain couldn't safely call APIs on another domain. CORS provides a controlled way for servers to explicitly allow cross-origin requests by sending specific HTTP headers. This enables secure separation of frontend and backend (e.g., React app on Vercel calling Node.js API on AWS) while maintaining strong security boundaries.",'CORS is enforced only by browsers for security reasons. Non-browser clients (Postman, curl, mobile native apps) ignore CORS entirely. Misconfigured CORS is one of the most common sources of frustration in web development, often resulting in cryptic "CORS policy" errors in the console.'],sections:[{heading:"What is an Origin?",content:"An origin is defined by the combination of protocol (scheme), host (domain), and port. Two URLs are same-origin only if all three match exactly:",list:["<strong>Same origin examples:</strong> https://example.com/app and https://example.com/api","<strong>Different origin examples:</strong>","http://example.com vs https://example.com (different protocol)","https://example.com vs https://api.example.com (different subdomain)","https://example.com:80 vs https://example.com:443 (different port)","https://example.com vs https://www.example.com (different subdomain)"],additionalExplanation:"Even a single difference makes the request cross-origin and subject to CORS restrictions."},{heading:"Simple Requests vs Preflight Requests",content:"Browsers categorize cross-origin requests into two types:",list:["<strong>Simple Requests:</strong> Allowed without preflight if they meet strict criteria:","- Method: GET, HEAD, or POST","- Headers: Only Accept, Accept-Language, Content-Language, Content-Type (limited values: application/x-www-form-urlencoded, multipart/form-data, text/plain)","- No credentials (cookies) unless explicitly allowed",'<strong>Preflight Requests:</strong> For any "non-simple" request, the browser first sends an OPTIONS request to check permissions:',"- Uses methods like PUT, DELETE, PATCH","- Custom headers (e.g., Authorization, X-API-Key)","- Content-Type like application/json","- With credentials (cookies, HTTP auth)"],additionalExplanation:"Preflight adds latency (extra round-trip), so design APIs to allow simple requests when possible."},{heading:"Key CORS Response Headers",content:"Servers use these headers to declare what cross-origin requests are permitted:",list:['<strong>Access-Control-Allow-Origin:</strong> Specifies allowed origins. Use specific domain (e.g., https://myapp.com) or "*" (wildcard, but cannot be used with credentials)',"<strong>Access-Control-Allow-Methods:</strong> Lists permitted HTTP methods (e.g., GET, POST, PUT, DELETE, OPTIONS)","<strong>Access-Control-Allow-Headers:</strong> Lists allowed request headers (e.g., Content-Type, Authorization, X-Requested-With)",'<strong>Access-Control-Allow-Credentials:</strong> Set to "true" to allow cookies/auth credentials. Requires exact origin (no "*")',"<strong>Access-Control-Expose-Headers:</strong> Allows clients to read specific response headers (by default, only basic ones are exposed)","<strong>Access-Control-Max-Age:</strong> How long (in seconds) preflight response can be cached (e.g., 86400 = 24 hours)"]},{heading:"Common CORS Scenarios",content:"Real-world patterns and pitfalls:",list:["<strong>Public API:</strong> Allow all origins with Access-Control-Allow-Origin: *","<strong>Authenticated API:</strong> Require exact origin + credentials: true","<strong>Development vs Production:</strong> Often more permissive in dev, stricter in prod","<strong>Third-party integrations:</strong> Whitelist specific partner domains","<strong>Proxies:</strong> Some developers use reverse proxies (e.g., Nginx) or CORS proxy services to bypass CORS (not recommended for production)"]}],codeExamples:[{title:"CORS Response Headers Example",language:"http",code:`# Successful response with CORS headers
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
- The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.`}],keyPoints:["CORS is a browser-enforced security feature to protect users from cross-site request forgery and data theft","Same-Origin Policy is the default restriction; CORS is the opt-in relaxation","Only servers control CORS via response headers\u2014clients cannot bypass it","Simple requests (GET/POST with basic headers) skip preflight; others require OPTIONS check","Never use Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true in production","Preflight caching (Max-Age) improves performance for complex requests","CORS errors appear in browser dev tools\u2014always check Network tab for missing headers","Use middleware/libraries (cors package, Spring Security, etc.) for easy configuration"],bestPractices:['Always specify exact origins in production\u2014avoid wildcard "*" unless truly public API',"Enable credentials only when necessary (for cookie-based auth)","List only required methods and headers to minimize attack surface","Set reasonable Access-Control-Max-Age (e.g., 86400 seconds) to reduce preflight overhead","Handle OPTIONS requests properly (return 204 No Content for preflight)","Use environment-specific configs (permissive in dev, strict in prod)","Log and monitor CORS-related errors in production","For SPAs, consider using a proxy during development (e.g., Vite/React proxy)"]};var it={title:"TypeScript Data Types",tags:["TypeScript","Types","Fundamentals","Angular","Static Typing"],paragraphs:["TypeScript's powerful type system is the foundation of writing robust, maintainable, and self-documenting code in Angular applications. It extends JavaScript's dynamic types with static typing, allowing developers to define exactly what kind of data a variable, parameter, or function can hold. This catches errors early during development, improves IDE intelligence, and makes large codebases far easier to understand and refactor.","While type annotations are optional (TypeScript often infers types automatically), explicit typing is highly recommended for clarity, especially in Angular components, services, and models. Mastering TypeScript's rich set of primitive, object, and advanced types enables developers to model real-world data accurately and prevent entire classes of runtime bugs.","From basic primitives like string and number to sophisticated constructs like unions, intersections, literals, and generics, TypeScript provides tools to express complex data relationships with precision\u2014making it indispensable for enterprise-scale Angular projects."],sections:[{heading:"Primitive Types",content:"These are the basic building blocks for simple values. TypeScript enforces them strictly at compile time:",list:["<strong>string:</strong> Represents text. Use single, double, or template literals.","<strong>number:</strong> Covers integers, floats, Infinity, NaN. No separate int/float distinction.","<strong>boolean:</strong> Only true or false (lowercase).","<strong>null & undefined:</strong> Represent absence of value. null for intentional absence, undefined for uninitialized.","<strong>symbol:</strong> Unique, immutable identifiers (ES6 feature). Useful for object keys.","<strong>bigint:</strong> Arbitrary-precision integers (e.g., 123n). For numbers beyond Number.MAX_SAFE_INTEGER."],additionalExplanation:"Primitive types are immutable and passed by value."},{heading:"Object Types: Interfaces and Type Aliases",content:"TypeScript excels at describing complex object shapes using interfaces or type aliases:",list:["<strong>interface:</strong> Defines object contracts. Extensible with extends and ideal for class implementation.","<strong>type:</strong> More flexible\u2014can represent unions, primitives, or complex combinations.","<strong>Optional properties:</strong> Use ? for properties that may be missing.","<strong>Readonly properties:</strong> Use readonly to prevent mutation.","<strong>Index signatures:</strong> For dynamic keys (e.g., { [key: string]: number })"]},{heading:"Collection Types: Arrays and Tuples",content:"Typed collections for ordered data:",list:["<strong>Array<T> or T[]:</strong> Homogeneous arrays of type T.","<strong>ReadonlyArray<T>:</strong> Immutable arrays.","<strong>Tuple:</strong> Fixed-length, heterogeneous arrays with known types at each position.","<strong>Destructuring:</strong> Tuples shine when returning multiple values from functions."]},{heading:"Special Types",content:"Built-in types for edge cases and type safety:",list:["<strong>any:</strong> Opt-out of type checking. Avoid\u2014it defeats TypeScript's purpose.","<strong>unknown:</strong> Safer alternative to any. Requires type narrowing before use.","<strong>void:</strong> For functions that return nothing (or undefined).","<strong>never:</strong> For functions that never return (e.g., throw errors or infinite loops).","<strong>object:</strong> Generic non-primitive type (not very specific\u2014prefer interfaces)."]},{heading:"Advanced Types: Unions, Intersections, and Literals",content:"Powerful tools for modeling precise data:",list:["<strong>Union Types (A | B):</strong> Value can be one of several types.","<strong>Intersection Types (A & B):</strong> Combines multiple types (all properties required).",'<strong>Literal Types:</strong> Restrict to exact values (e.g., "left" | "right" | "center").',"<strong>Type Narrowing:</strong> Use typeof, instanceof, or discriminants to refine unions.","<strong>Discriminated Unions:</strong> Pattern using a common literal property for safe type narrowing."]},{heading:"Function Types",content:"TypeScript can describe function signatures precisely:",list:["<strong>Parameter & Return Types:</strong> Annotate parameters and return values.","<strong>Optional Parameters:</strong> Use ? (must come after required).","<strong>Default Parameters:</strong> Provide defaults (type inferred or explicit).","<strong>Overloads:</strong> Multiple signatures for the same function.","<strong>Rest Parameters:</strong> ...args: T[] for variable arguments."]}],codeExamples:[{title:"Primitive Types and Basic Annotations",language:"typescript",code:`let name: string = "Soumya";
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
}`}],keyPoints:["Primitives: string, number, boolean, null, undefined, symbol, bigint","Use interfaces for object shapes; type aliases for unions and complex types","Arrays: T[] or Array<T>; Tuples for fixed heterogeneous collections","Union types (A | B) and literal types for precise modeling","Discriminated unions are essential for state management in Angular","Prefer unknown over any for dynamic data","Type inference reduces boilerplate but explicit types improve readability","Never use any in production code\u2014it disables type checking"],bestPractices:['Enable "strict" mode in tsconfig.json for maximum type safety',"Use interfaces for public APIs and models; type aliases for unions/intersections","Prefer const assertions and as const for literal inference","Narrow unions with typeof, instanceof, or discriminated properties","Define API response types as discriminated unions","Use readonly for immutable data and ReadonlyArray for collections","Avoid any\u2014refactor to proper types or unknown with narrowing","Leverage type inference but add annotations for function parameters and returns"]};var at={title:"TypeScript Interfaces",tags:["TypeScript","Interfaces","OOP","Angular","Type Safety"],paragraphs:["Interfaces in TypeScript are a powerful way to define contracts for object shapes, function signatures, and class structures. They specify exactly what properties, methods, or index signatures an object must (or may) have, enabling strong type checking at compile time. Unlike classes, interfaces are purely a type-level construct\u2014they are completely erased during compilation and add no runtime overhead.","In Angular applications, interfaces are indispensable for modeling data from APIs, defining component inputs/outputs, creating service contracts, and ensuring consistent shapes across components and services. They promote clean architecture, improve IDE autocomplete and refactoring, facilitate team collaboration, and catch structural errors early\u2014making code more maintainable and less prone to runtime bugs.","Interfaces are often preferred over type aliases for defining object shapes because they support declaration merging, extension via extends, and are the standard for class implementation contracts. Mastering interfaces is key to writing idiomatic, type-safe TypeScript code in Angular projects."],sections:[{heading:"Basic Interface Declaration",content:"An interface defines the required and optional properties of an object:",list:["<strong>Required properties:</strong> Must be present with correct types","<strong>Optional properties:</strong> Marked with ? and can be omitted","<strong>Readonly properties:</strong> Marked with readonly to prevent reassignment after initialization","<strong>Arbitrary properties:</strong> Use index signatures for dynamic keys"]},{heading:"Extending Interfaces",content:"Interfaces can inherit from one or more other interfaces using extends, promoting reuse and hierarchy:",list:["<strong>Single inheritance:</strong> Extend one interface","<strong>Multiple inheritance:</strong> Extend multiple interfaces (comma-separated)","<strong>Declaration merging:</strong> Same-name interfaces automatically merge (useful for augmenting third-party types)"]},{heading:"Function and Hybrid Interfaces",content:"Interfaces can describe callable signatures or combine object and function types:",list:["<strong>Function interfaces:</strong> Define parameter and return types for functions","<strong>Hybrid types:</strong> Objects that are both callable and have properties (e.g., for advanced patterns like jQuery-style APIs)"]},{heading:"Index Signatures and Dynamic Properties",content:"For objects with unknown keys but known value types:",list:["<strong>String index:</strong> [key: string]: type","<strong>Number index:</strong> [key: number]: type","<strong>Mixed:</strong> Combine with fixed properties (index signature must be compatible)"]},{heading:"Classes Implementing Interfaces",content:"Classes can implement one or more interfaces, enforcing structure:",list:["<strong>Multiple implementation:</strong> A class can implement several interfaces","<strong>Access modifiers:</strong> public, private, protected work with interface properties","<strong>Abstract vs concrete:</strong> Interfaces ensure implementation of all members"]},{heading:"Interfaces vs Type Aliases",content:"While similar for object shapes, they have key differences:",list:["<strong>Interfaces:</strong> Extensible (extends, declaration merging), ideal for object contracts and class implementation","<strong>Type aliases:</strong> Can represent unions, intersections, primitives, tuples; cannot be extended or merged","<strong>When to choose:</strong> Use interfaces for object shapes unless you need union/intersection features"]}],codeExamples:[{title:"Basic Interface with Optional, Readonly, and Array Properties",language:"typescript",code:`interface User {
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
window.debugMode = true;`}],keyPoints:["Interfaces define contracts for object shapes, functions, and classes","Support optional (?) and readonly properties","Can extend multiple interfaces and support declaration merging","Index signatures enable dynamic property typing","Classes can implement multiple interfaces for polymorphism","Purely compile-time\u2014no runtime impact","Preferred over type aliases for object shapes and public APIs","Essential in Angular for typing models, props, and service contracts"],bestPractices:["Use interfaces for object shapes and class contracts; type aliases for unions/intersections","Name interfaces with clear, noun-based names (e.g., UserProfile, ApiResponse)","Leverage optional properties and index signatures for flexible APIs","Extend base interfaces to build hierarchies (e.g., BaseEntity \u2192 User \u2192 Admin)","Use readonly for immutable data (e.g., IDs, creation timestamps)","Implement interfaces in classes for clear contracts and better documentation","Take advantage of declaration merging to augment third-party types safely","Avoid overly broad interfaces\u2014keep them focused and single-responsibility"]};var st={title:"REST APIs",tags:["Web Fundamentals","APIs","HTTP"],paragraphs:["REST (Representational State Transfer) is an architectural style for designing networked applications. Introduced by Roy Fielding in his 2000 doctoral dissertation, REST defines a set of constraints that, when applied to the design of web services, create scalable, maintainable, and performant APIs.","RESTful APIs use standard HTTP methods to perform CRUD operations (Create, Read, Update, Delete) on resources identified by URLs. They emphasize stateless communication, resource-based URLs, cacheability, and a uniform interface. This makes them predictable, scalable, and easy to integrate across different platforms.","RESTful APIs are the backbone of modern web and mobile applications. They provide a standardized, language-agnostic way for clients (browsers, mobile apps, IoT devices) to communicate with servers, enabling separation of frontend and backend concerns and facilitating third-party integrations."],sections:[{heading:"Six Guiding Principles of REST",content:"REST is defined by six architectural constraints (one optional). Adhering to these principles ensures the API is truly RESTful and gains the benefits of scalability, performance, and simplicity.",list:["<strong>Client-Server:</strong> Separates concerns \u2014 the client handles the user interface and experience, while the server manages data storage, business logic, and persistence. This improves portability and allows independent evolution of both sides.","<strong>Stateless:</strong> Each request from the client must contain all the information needed to process it. The server does not store client context between requests. This improves scalability (any server can handle any request) and reliability.","<strong>Cacheable:</strong> Responses must explicitly indicate whether they can be cached and for how long (using headers like Cache-Control and ETag). Caching reduces server load and improves performance.","<strong>Uniform Interface:</strong> The key constraint that simplifies architecture. It consists of four sub-constraints: resource identification via URIs, manipulation through representations, self-descriptive messages, and HATEOAS (Hypermedia as the Engine of Application State).","<strong>Layered System:</strong> The architecture can be composed of layers (load balancers, proxies, gateways). Clients cannot tell whether they are connected directly to the end server or an intermediary, enabling scalability and shared caching.","<strong>Code on Demand (Optional):</strong> Servers can optionally send executable code (e.g., JavaScript) to extend client functionality. This is rarely used in pure REST APIs today."]},{heading:"Resource-Based URLs and HTTP Methods",content:"In REST, resources (e.g., users, products, orders) are represented by nouns in URLs. Actions are expressed through standard HTTP methods rather than encoded in the URL. This creates clean, intuitive endpoints.",list:["<strong>GET /users</strong> \u2192 Retrieve a collection of users (safe and idempotent)","<strong>GET /users/123</strong> \u2192 Retrieve a specific user (safe and idempotent)","<strong>POST /users</strong> \u2192 Create a new user (not idempotent)","<strong>PUT /users/123</strong> \u2192 Replace the entire user resource (idempotent)","<strong>PATCH /users/123</strong> \u2192 Partially update the user (not necessarily idempotent)","<strong>DELETE /users/123</strong> \u2192 Delete the user (idempotent)","<strong>Sub-resources:</strong> GET /users/123/orders \u2192 Get orders for a specific user"],additionalExplanation:"Idempotent methods (GET, PUT, DELETE, HEAD) can be called multiple times with the same effect as calling once. Safe methods (GET, HEAD) do not modify server state."},{heading:"Common HTTP Status Codes in REST",content:"REST APIs use standard HTTP status codes to indicate the result of a request. This makes responses self-descriptive and reduces the need for custom error formats.",list:["<strong>2xx Success:</strong> 200 OK (general success), 201 Created (resource created), 204 No Content (success, no body)","<strong>3xx Redirection:</strong> 301 Moved Permanently, 304 Not Modified (for caching)","<strong>4xx Client Errors:</strong> 400 Bad Request (malformed request), 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity (validation errors)","<strong>5xx Server Errors:</strong> 500 Internal Server Error, 503 Service Unavailable"]},{heading:"HATEOAS (Hypermedia as the Engine of Application State)",content:"A key part of the uniform interface constraint. Responses include links to related resources, allowing clients to discover available actions dynamically rather than hard-coding URLs.",example:'Instead of the client knowing to go to "/reviews" next, the server includes links in the response, making the API more discoverable and evolvable.'}],codeExamples:[{title:"Common RESTful Endpoints for a Product Resource",language:"text",code:`# Collection and Individual Resources
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
}`}],keyPoints:["REST uses standard HTTP methods for CRUD operations (GET, POST, PUT/PATCH, DELETE)","URLs represent resources (nouns), not actions (verbs)","Stateless: No server-side session storage; each request is independent","Leverages HTTP features: caching, status codes, content negotiation","Responses often use JSON (though XML, YAML, etc. are possible)","Highly scalable due to statelessness and cacheability","Self-descriptive with proper use of status codes and HATEOAS links","Versioning strategies: URL versioning (/v1/products), header-based, or media-type versioning"],bestPractices:["Use nouns for resources and plural forms (e.g., /users not /user)","Support filtering, sorting, and pagination for collection endpoints","Implement proper authentication (e.g., JWT, OAuth)","Rate limiting and throttling to prevent abuse","Consistent error format across the API","Document with OpenAPI/Swagger for discoverability"]};var lt={title:"TypeScript Classes",tags:["TypeScript","OOP","Classes","Angular","Inheritance","Encapsulation"],paragraphs:["TypeScript classes are a cornerstone of object-oriented programming in modern JavaScript ecosystems. Building directly on ES6 class syntax, TypeScript adds powerful static typing features like access modifiers, parameter properties, abstract classes, and definite assignment assertions. These enhancements enable better encapsulation, inheritance, polymorphism, and code organization while maintaining full compatibility with JavaScript.","In Angular applications, classes are fundamental\u2014every component, service, directive, pipe, and module is defined as a TypeScript class decorated with metadata (@Component, @Injectable, etc.). The combination of classes and decorators allows Angular to provide dependency injection, change detection, and a structured architecture. Understanding TypeScript classes deeply is essential for writing clean, maintainable, and scalable Angular code.","Classes in TypeScript are compiled to JavaScript functions (using prototype-based inheritance under the hood) but provide a clearer, more familiar syntax for developers coming from languages like Java or C#. They support single inheritance, interfaces for multiple contract implementation, and runtime features like static members while adding compile-time safety through types."],sections:[{heading:"Class Declaration and Constructors",content:"A class defines a blueprint for creating objects with properties (fields) and methods:",list:["<strong>Constructor:</strong> Special method called when instantiating with new","<strong>Instance members:</strong> Properties and methods on this","<strong>Definite assignment:</strong> Use ! for properties initialized later (e.g., in ngOnInit)"]},{heading:"Access Modifiers",content:"TypeScript provides three access modifiers for encapsulation:",list:["<strong>public:</strong> Accessible from anywhere (default)","<strong>private:</strong> Accessible only within the class","<strong>protected:</strong> Accessible in the class and subclasses","<strong>readonly:</strong> Prevents reassignment after initialization (can be combined with access modifiers)"],additionalExplanation:"Access modifiers are enforced at compile time but erased in JavaScript (use for documentation and safety)."},{heading:"Parameter Properties (Constructor Shorthand)",content:"A concise way to declare and initialize class properties directly in the constructor:",list:["<strong>Syntax:</strong> Add access modifier before parameter name","<strong>Benefits:</strong> Reduces boilerplate significantly","<strong>Common in Angular:</strong> Used heavily in components and services"]},{heading:"Inheritance and Polymorphism",content:"Classes can extend others using extends and override methods:",list:["<strong>extends:</strong> Single inheritance from another class","<strong>super():</strong> Call parent constructor or methods","<strong>Method overriding:</strong> Subclass provides specific implementation","<strong>Polymorphism:</strong> Treat subclass instances as parent type"]},{heading:"Abstract Classes",content:"Base classes that cannot be instantiated directly and may contain abstract members:",list:["<strong>abstract keyword:</strong> On class and methods/properties","<strong>Purpose:</strong> Define common structure and force implementation in subclasses","<strong>Use case:</strong> Shared logic with required overrides"]},{heading:"Getters, Setters, and Computed Properties",content:"Special methods that look like property access but execute custom logic:",list:["<strong>get:</strong> Called when reading property","<strong>set:</strong> Called when assigning property","<strong>Validation:</strong> Common use case for input validation","<strong>Computed values:</strong> Derive values without storing state"]},{heading:"Static Members",content:"Properties and methods that belong to the class itself, not instances:",list:["<strong>static keyword:</strong> On properties and methods","<strong>Access:</strong> Via class name (ClassName.staticMethod())","<strong>Use cases:</strong> Utilities, constants, factory methods"]},{heading:"Classes and Interfaces",content:"Classes can implement interfaces to guarantee structure:",list:["<strong>implements:</strong> Check that class satisfies interface","<strong>Multiple interfaces:</strong> Comma-separated","<strong>Common in Angular:</strong> Services often implement interfaces for testability"]}],codeExamples:[{title:"Basic Class with Access Modifiers and Readonly",language:"typescript",code:`class User {
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
task.log();`}],keyPoints:["Classes support ES6 syntax with TypeScript enhancements","Access modifiers (public, private, protected) enforce encapsulation at compile time","Parameter properties reduce constructor boilerplate","Single inheritance with extends; multiple interface implementation","Abstract classes define shared structure with required implementations","Getters/setters enable computed properties and validation","Static members belong to the class, not instances","Essential building blocks for Angular components, services, and directives"],bestPractices:["Use parameter properties in constructors to reduce boilerplate","Prefer private over protected unless inheritance is required","Mark immutable properties as readonly","Use abstract classes for shared logic with forced overrides","Implement interfaces for clear contracts and better testability","Leverage getters/setters for validation and computed values","Keep static utilities in dedicated classes (e.g., DateUtils, StringUtils)","Use definite assignment assertion (!) cautiously in Angular lifecycle hooks","Avoid deep inheritance hierarchies\u2014favor composition over inheritance"]};var ct={title:"TypeScript Enums",tags:["TypeScript","Enums","Constants","Angular","Type Safety"],paragraphs:["Enums (enumerations) in TypeScript provide a way to define a set of named constants, making code more readable, self-documenting, and maintainable. Unlike most TypeScript features that are erased at compile time, enums have a runtime representation\u2014they compile to JavaScript objects, allowing reverse lookups and runtime checks.","Enums are particularly valuable when working with finite sets of distinct values, such as status codes, user roles, directions, categories, or configuration options. In Angular applications, enums are widely used for modeling state in components, services, and templates, providing strong type safety, excellent IDE autocomplete, and preventing invalid values from being assigned.","TypeScript supports several enum variants: numeric, string, heterogeneous, and const enums. Choosing the right type improves both type safety and performance. When used properly, enums make intent clear and reduce magic strings/numbers scattered throughout the codebase."],sections:[{heading:"Numeric Enums",content:"The most common enum type. Values auto-increment starting from 0 (or a custom initial value):",list:["<strong>Auto-incrementing:</strong> Subsequent members get incremental values","<strong>Custom starting value:</strong> Set first member explicitly","<strong>Manual values:</strong> Assign specific numbers to any member",'<strong>Reverse mapping:</strong> Access name from value (e.g., Direction[1] === "Up")'],additionalExplanation:"Numeric enums are useful when order matters or when interfacing with APIs that use numeric codes."},{heading:"String Enums",content:"Each member must be explicitly assigned a string value. No auto-incrementing:",list:["<strong>Explicit strings:</strong> Every member needs a string literal","<strong>No reverse mapping:</strong> Cannot get name from value at runtime","<strong>Better readability:</strong> Values are human-readable strings","<strong>Serialization friendly:</strong> Direct use in JSON, logs, APIs"],additionalExplanation:"String enums are preferred in Angular when values are displayed to users or sent over the network."},{heading:"Const Enums",content:"Declared with the const keyword. They are completely inlined at compile time:",list:["<strong>No runtime object:</strong> Values are substituted directly (better tree-shaking)","<strong>Performance optimized:</strong> Smaller bundle size","<strong>No reverse mapping:</strong> Like string enums","<strong>Limitations:</strong> Cannot use computed values; external references require preserveConstEnums"],additionalExplanation:"Use const enums for compile-time constants like HTTP status codes."},{heading:"Heterogeneous Enums and Computed Members",content:"Mixing string and number values (discouraged) or using computed expressions:",list:["<strong>Heterogeneous:</strong> Mix strings and numbers (can cause confusion)","<strong>Computed values:</strong> Use expressions (e.g., Date.now()), but only in regular enums","<strong>Best practice:</strong> Avoid heterogeneous and computed enums for clarity"]},{heading:"Enums in Angular Templates and Components",content:"Enums integrate seamlessly with Angular's template system:",list:["<strong>Exposing to templates:</strong> Assign enum to component property","<strong>Type-safe comparisons:</strong> Use in *ngIf, switch cases","<strong>Dropdowns/selects:</strong> Iterate with Object.values/keys","<strong>Pipes and directives:</strong> Can accept enum types"]},{heading:"Enums vs Alternatives",content:"Sometimes other patterns are preferable:",list:['<strong>Union of literals:</strong> type Status = "pending" | "active" | "inactive" (no runtime overhead)',"<strong>Object with as const:</strong> Better for string unions with no runtime cost","<strong>When to use enums:</strong> Need runtime values, reverse lookup, or legacy compatibility","<strong>When to avoid:</strong> Pure type-level constants (prefer literal unions)"]}],codeExamples:[{title:"Numeric Enums with Auto-Increment and Manual Values",language:"typescript",code:`enum OrderStatus {
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
type LogLevel = typeof LOG_LEVELS[number]; // "ERROR" | "WARN" | ...`}],keyPoints:["Enums define named constant sets for improved readability","Numeric enums support auto-increment and reverse mapping","String enums provide human-readable values with no reverse mapping","Const enums are inlined for optimal performance and bundle size","Enums have runtime presence (except const enums)","Excellent for status codes, roles, categories in Angular","Provide strong typing and IDE autocomplete","Consider literal unions for type-only constants"],bestPractices:["Prefer string enums or const enums over numeric for clarity","Use const enums for HTTP codes, fixed configurations","Expose enums to Angular templates via component properties","Iterate with Object.values() for dropdowns and lists","Avoid heterogeneous enums to prevent confusion","Use literal union types when no runtime value is needed","Name enum members in UPPER_CASE for constants","Document complex enums with comments or separate files"]};var dt={title:"TypeScript vs JavaScript",tags:["TypeScript","JavaScript","Fundamentals","Typing","Angular"],paragraphs:["TypeScript (TS) is a statically-typed superset of JavaScript (JS) developed and maintained by Microsoft since 2012. It adds optional static type annotations, advanced type features, and compile-time type checking on top of standard JavaScript syntax. All valid JavaScript code is also valid TypeScript, but TypeScript code is transpiled (compiled) to plain JavaScript before execution in browsers or Node.js.","The primary advantage of TypeScript is catching errors early\u2014during development rather than at runtime. This leads to fewer bugs in production, better developer experience with intelligent autocomplete and refactoring, self-documenting code through types, and easier maintenance in large-scale applications. JavaScript's dynamic typing offers flexibility and faster prototyping but can lead to subtle runtime errors that are hard to debug.","TypeScript has become the standard for enterprise and large-scale web development. Frameworks like Angular are built entirely around TypeScript, while React, Vue, and NestJS have strong TypeScript support. Adopting TypeScript significantly improves code quality, team collaboration, and long-term maintainability."],sections:[{heading:"Core Differences: Static vs Dynamic Typing",content:"The most fundamental difference lies in when type errors are detected:",list:["<strong>JavaScript (Dynamic Typing):</strong> Types are checked at runtime. Variables can hold any value, and errors surface only when code executes.","<strong>TypeScript (Static Typing):</strong> Types are checked at compile time (or in the editor). The compiler enforces type consistency, catching mismatches before code runs.","<strong>Key Benefit:</strong> TypeScript prevents entire classes of bugs (e.g., calling methods on undefined, passing wrong argument types)."],additionalExplanation:"TypeScript types are completely erased during compilation\u2014they add zero runtime overhead."},{heading:"Powerful TypeScript Features Beyond JavaScript",content:"TypeScript introduces several language features that make code more robust and expressive:",list:["<strong>Interfaces & Types:</strong> Define object shapes and contracts","<strong>Enums:</strong> Named sets of constants for better readability","<strong>Generics:</strong> Create reusable, type-safe components and functions","<strong>Union & Intersection Types:</strong> Model complex data with precision","<strong>Tuple Types:</strong> Fixed-length arrays with known types","<strong>Literal Types:</strong> Restrict values to specific strings/numbers","<strong>Access Modifiers:</strong> public, private, protected, readonly","<strong>Decorators:</strong> Metadata annotations (heavily used in Angular)","<strong>Advanced Tooling:</strong> Superior autocomplete, refactoring, and navigation"]},{heading:"Why Angular Requires TypeScript",content:"Angular (from version 2 onward) is designed and built with TypeScript from the ground up. TypeScript enables key Angular features:",list:["<strong>Decorators:</strong> @Component, @Injectable, @Input, @Output for metadata","<strong>Strong Typing:</strong> Type-safe dependency injection, services, and components","<strong>Interfaces:</strong> Clean contracts for services, models, and APIs","<strong>Better IDE Support:</strong> Autocomplete for Angular-specific APIs and templates","<strong>Compile-Time Safety:</strong> Catch template errors and injection mistakes early"],additionalExplanation:"Attempting to use plain JavaScript with Angular is not practical\u2014official templates, documentation, and tooling all assume TypeScript."},{heading:"Pros and Cons Comparison",content:"Choosing between TypeScript and JavaScript depends on project size and requirements:",list:["<strong>TypeScript Advantages:</strong> Early error detection, better refactoring, self-documenting code, excellent tooling, scalability in large teams","<strong>TypeScript Drawbacks:</strong> Initial learning curve, compilation step, stricter syntax","<strong>JavaScript Advantages:</strong> Faster prototyping, no build step, maximum flexibility","<strong>JavaScript Drawbacks:</strong> Runtime errors, weaker IDE support, harder to maintain in large codebases"]},{heading:"When to Choose TypeScript",content:"TypeScript shines in these scenarios:",list:["Large applications or codebases (>10k lines)","Team development (improves collaboration)","Projects using Angular, NestJS, or enterprise React/Vue","Applications requiring long-term maintenance","When API contracts are complex or frequently changing"],additionalExplanation:"For small scripts, prototypes, or learning JavaScript basics, plain JS is often sufficient."}],codeExamples:[{title:"Runtime Error in JavaScript vs Compile-Time Error in TypeScript",language:"typescript",code:`// JavaScript (runs but fails at runtime)
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
}`}],keyPoints:["TypeScript is a superset of JavaScript\u2014all JS code is valid TS","Static typing catches errors at compile time, not runtime","Zero runtime overhead\u2014types are erased during compilation","Excellent IDE support: autocomplete, refactoring, navigation","Required for modern Angular development","Improves scalability and maintainability in large projects","Features like generics, interfaces, enums, and decorators add expressiveness","Gradual adoption possible\u2014start with .ts files and any types"],bestPractices:['Use strict mode in tsconfig.json ("strict": true) for maximum safety',"Define interfaces for API responses and component props","Leverage generics for reusable utilities and components","Use definite assignment assertion (!) or proper initialization to avoid null issues","Enable noImplicitAny to prevent implicit any types","Use ESLint + @typescript-eslint for consistent code style","Gradually migrate JS projects by renaming .js to .ts and adding types","Document complex types with JSDoc-style comments when needed"]};var pt={title:"JSON (JavaScript Object Notation)",tags:["Data Format","Web Fundamentals","API","Serialization"],paragraphs:["JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. Introduced by Douglas Crockford in the early 2000s, it quickly became the standard for data exchange on the web, largely replacing XML due to its simplicity and smaller payload size.","Although derived from JavaScript object literal syntax, JSON is completely language-independent. Libraries exist for virtually every programming language, making it ideal for communication between heterogeneous systems\u2014browsers, servers, mobile apps, IoT devices, and more.","JSON's minimal syntax and strict rules make it predictable and reliable. It is the dominant format for RESTful APIs, configuration files, NoSQL databases (e.g., MongoDB documents), and client-server communication in modern web applications."],sections:[{heading:"JSON Syntax Rules",content:"JSON has a very strict and minimal syntax. Violations result in parsing errors, which enforces data integrity.",list:['<strong>Name/value pairs:</strong> Properties are written as "key": value (keys must be double-quoted strings)',"<strong>Commas:</strong> Separate items in objects and arrays (no trailing comma allowed)","<strong>Curly braces { }:</strong> Hold objects (unordered key-value collections)","<strong>Square brackets [ ]:</strong> Hold arrays (ordered lists of values)","<strong>Double quotes:</strong> Required for all strings and property names","<strong>No comments:</strong> JSON does not support comments (use a separate field if needed)","<strong>No trailing commas:</strong> Invalid in standard JSON (though some parsers tolerate them)"]},{heading:"Supported Data Types",content:"JSON supports only six primitive/value types. Complex structures are built by nesting objects and arrays.",list:['<strong>String:</strong> Unicode text in double quotes, e.g., "Hello \u{1F30D}"',"<strong>Number:</strong> Integer or floating-point (no distinction), e.g., 42, -10, 3.14, 1e5 (no NaN or Infinity)","<strong>Boolean:</strong> true or false (lowercase only)","<strong>Null:</strong> null (represents empty/no value)","<strong>Object:</strong> Unordered collection of key-value pairs enclosed in { }","<strong>Array:</strong> Ordered list of values (any type, including mixed) enclosed in [ ]"],additionalExplanation:"No support for undefined, functions, dates (use ISO strings), or binary data (use Base64 encoding)."},{heading:"JSON vs XML Comparison",content:"JSON largely replaced XML for web APIs due to several advantages:",list:["<strong>Conciseness:</strong> JSON is more compact (no closing tags)","<strong>Readability:</strong> Easier for humans to read and write","<strong>Parsing speed:</strong> Native support in JavaScript and faster parsers in most languages","<strong>Less verbosity:</strong> No namespaces, schemas, or attributes required","<strong>Drawbacks:</strong> No built-in schema validation (use JSON Schema separately), no comments"]},{heading:"Common Use Cases",content:"JSON is ubiquitous in modern development:",list:["API request/response payloads (REST/GraphQL)","Configuration files (package.json, tsconfig.json)","Data storage in NoSQL databases","Client-server communication (fetch/AJAX)","Logging and message queues (e.g., Kafka, RabbitMQ)","Internationalization files"]}],codeExamples:[{title:"Valid JSON Structure Example",language:"json",code:`{
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
{ "status": undefined, "callback": function() {} }`}],keyPoints:["Lightweight, human-readable, and machine-parsable data format","Strict syntax: double quotes, no trailing commas, no comments","Only 6 data types: string, number, boolean, null, object, array","Language-independent with native support in JavaScript","De facto standard for web APIs and configuration","Use JSON.parse() to convert string \u2192 object, JSON.stringify() to convert object \u2192 string","Always set Content-Type: application/json for API responses","Validate JSON using tools like JSON Schema for larger applications"],bestPractices:["Use double quotes consistently for keys and strings","Pretty-print with indentation during development (JSON.stringify(obj, null, 2))",'Represent dates as ISO 8601 strings (e.g., "2026-01-19T18:22:00Z")',"Handle parsing errors gracefully with try/catch","Validate incoming JSON payloads on the server","Use JSON Schema for defining and validating complex structures","Avoid deeply nested structures for better readability","Encode binary data as Base64 strings when needed"]};var ut={"/prerequisites/web-fundamentals/rest-apis":st,"/prerequisites/web-fundamentals/json":pt,"/prerequisites/web-fundamentals/cors":ot,"/prerequisites/typescript/typescript-vs-javascript":dt,"/prerequisites/typescript/data-types":it,"/prerequisites/typescript/interfaces":at,"/prerequisites/typescript/enums":ct,"/prerequisites/typescript/classes":lt},mt=t=>({title:t,tags:["Angular","Tutorial"],paragraphs:[`This comprehensive topic on "${t}" will be covered in detail in the complete course. This section provides essential knowledge for Angular development.`,"Key concepts, best practices, and real-world examples will help you master this topic and apply it effectively in your Angular applications.","Continue exploring other topics in the sidebar to build your complete understanding of Angular development from fundamentals to advanced patterns."],keyPoints:[`Understanding ${t} is crucial for Angular development`,"Practice with hands-on examples to reinforce learning","Apply these concepts in real-world projects","Refer to official Angular documentation for more details"]});var W=(()=>{class t{constructor(){this.username=b(localStorage.getItem("username")||"Guest"),this.userRoles=["admin","editor","reader"]}hasRole(e){return this.userRoles.includes(e)}isLoggedIn(){return!!localStorage.getItem("authToken")}logout(){this.username.set("Guest"),localStorage.clear()}login({username:e,password:n}){return this.username.set(e),localStorage.setItem("username",e),localStorage.setItem("authToken","fake-jwt-token"),!0}getUserName(){return localStorage.getItem("username")||"Guest"}getToken(){return localStorage.getItem("authToken")}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var Se=(()=>{class t{constructor(){this.document=M(zt),this.storageKey="glass-ui-theme",this.themes=[{id:"arctic",name:"Arctic Minimal",icon:"bi-snow",description:"Clean frost glass with indigo-violet accents",gradient:"linear-gradient(135deg, #f8fafc, #e8edf5, #ede9fe)"},{id:"sunset",name:"Sunset Glass",icon:"bi-sunset-fill",description:"Warm orange & pink gradients with creative energy",gradient:"linear-gradient(135deg, #fff7ed, #fde8d0, #fbcfe8)"},{id:"emerald",name:"Emerald Depth",icon:"bi-gem",description:"Nature-premium green with teal accents",gradient:"linear-gradient(135deg, #ecfdf5, #bbf7d0, #6ee7b7)"},{id:"cyber",name:"Cyber Ice",icon:"bi-cpu-fill",description:"High-contrast ultramodern with electric cyan highlights",gradient:"linear-gradient(135deg, #f0fdff, #e0f7fe, #ccf7ff)"},{id:"midnight",name:"Midnight Crystal",icon:"bi-moon-stars-fill",description:"Deep space luxury with neon violet glow",gradient:"linear-gradient(135deg, #060b18, #1a1456, #200d3a)"},{id:"aurora",name:"Aurora Frost",icon:"bi-stars",description:"Hyperreal dark with shifting cyan & magenta aura",gradient:"linear-gradient(135deg, #0a0a1a, #1a0a2e, #0a1a28)"},{id:"obsidian",name:"Obsidian",icon:"bi-circle-fill",description:"Pure refined black with silver-white accents",gradient:"linear-gradient(135deg, #0a0a0a, #111118, #0f0f18)"},{id:"blood-moon",name:"Blood Moon",icon:"bi-moon-fill",description:"Crimson dark \u2014 danger and horror aesthetic",gradient:"linear-gradient(135deg, #0d0305, #1a0408, #2d0510)"},{id:"ocean-deep",name:"Ocean Deep",icon:"bi-water",description:"Dark teal abyss with bioluminescent glow",gradient:"linear-gradient(135deg, #020e1a, #041828, #062535)"},{id:"lava",name:"Lava",icon:"bi-fire",description:"Volcanic ash surface with molten orange fire",gradient:"linear-gradient(135deg, #0c0500, #1a0800, #2d1000)"},{id:"batman",name:"Batman",icon:"bi-shield-fill",description:"Gotham darkness with the signal yellow glow",gradient:"linear-gradient(135deg, #080808, #100e08, #1a1608)"},{id:"neon-noir",name:"Neon Noir",icon:"bi-lightning-charge-fill",description:"Cyberpunk dark with hot magenta and electric cyan",gradient:"linear-gradient(135deg, #04010a, #08011a, #0a0120)"},{id:"hologram",name:"Hologram",icon:"bi-brightness-high-fill",description:"Iridescent prismatic light with shifting spectrum",gradient:"linear-gradient(135deg, #e8d5ff, #d5e8ff, #d5ffd5, #fff5d5)"},{id:"galaxy",name:"Galaxy",icon:"bi-star-fill",description:"Deep cosmos starfield with periwinkle luminescence",gradient:"linear-gradient(135deg, #03001c, #06002e, #10004a)"},{id:"sakura",name:"Sakura",icon:"bi-flower1",description:"Cherry blossom sh\u014Djo \u2014 soft pink glass & violet mist",gradient:"linear-gradient(135deg, #fff1f5, #ffe4ec, #fce7f3)"},{id:"dragonball",name:"Dragon Ball",icon:"bi-trophy-fill",description:"SSJ power aura \u2014 solar orange to saiyan gold",gradient:"linear-gradient(135deg, #0e0800, #2e1800, #441e00)"},{id:"evangelion",name:"Evangelion",icon:"bi-hexagon-fill",description:"NERV clinical dark with impact orange and scan-line flicker",gradient:"linear-gradient(135deg, #060608, #100e18, #1a1020)"},{id:"solo-leveling",name:"Solo Leveling Monarch",icon:"bi-lightning-fill",description:"Hunter's shadow realm \u2014 deep void with neon purple and a crimson plume.",gradient:"linear-gradient(135deg, #000000 0%, #300050 40%, #c060f0 100%)"}],this.currentThemeSignal=b(this.loadTheme()),this.currentTheme=A(()=>this.currentThemeSignal()),this.currentThemeConfig=A(()=>this.themes.find(e=>e.id===this.currentThemeSignal())??this.themes[0]),this.isDarkTheme=A(()=>this.currentThemeSignal()==="midnight"),this.isTransitioningSignal=b(!1),this.isTransitioning=A(()=>this.isTransitioningSignal()),ce(()=>{let e=this.currentThemeSignal();this.applyThemeWithTransition(e),this.saveTheme(e)})}setTheme(e){e!==this.currentThemeSignal()&&this.currentThemeSignal.set(e)}cycleTheme(){let n=(this.themes.findIndex(r=>r.id===this.currentThemeSignal())+1)%this.themes.length;this.setTheme(this.themes[n].id)}getTheme(e){return this.themes.find(n=>n.id===e)}applyThemeWithTransition(e){this.isTransitioningSignal.set(!0),this.document.body.classList.add("theme-transitioning"),this.applyTheme(e),this.updateMetaThemeColor(e),setTimeout(()=>{this.document.body.classList.remove("theme-transitioning"),this.isTransitioningSignal.set(!1)},300)}applyTheme(e){let n=this.document.documentElement;this.themes.forEach(r=>{n.classList.remove(`theme-${r.id}`)}),n.setAttribute("data-theme",e),n.classList.add(`theme-${e}`),console.log("[ThemeService] Setting data-theme to:",e),console.log("[ThemeService] Current data-theme value:",n.getAttribute("data-theme")),console.log("[ThemeService] Current theme classes:",n.classList.toString()),this.themes.forEach(r=>{this.document.body.classList.remove(`theme-${r.id}`)}),this.document.body.classList.add(`theme-${e}`),console.log("[ThemeService] Applied theme:",e)}updateMetaThemeColor(e){let n=this.document.querySelector('meta[name="theme-color"]');if(!n)return;let r={arctic:"#f8fafc",sunset:"#fff7ed",emerald:"#ecfdf5",cyber:"#f0fdff",midnight:"#060b18",aurora:"#0a0a1a",obsidian:"#0a0a0a","blood-moon":"#0d0305","ocean-deep":"#020e1a",lava:"#0c0500",batman:"#080808","neon-noir":"#04010a",hologram:"#f0f4ff",galaxy:"#03001c",sakura:"#fff1f5",dragonball:"#0e0800",evangelion:"#060608","solo-leveling":"#0a0b14"};n.setAttribute("content",r[e])}loadTheme(){if(typeof window>"u")return"solo-leveling";try{let e=document.documentElement.getAttribute("data-theme");if(e&&this.isValidTheme(e))return console.log("[ThemeService] Loaded theme from HTML attribute:",e),e;let n=localStorage.getItem(this.storageKey);if(n&&this.isValidTheme(n))return console.log("[ThemeService] Loaded theme from localStorage:",n),n}catch(e){console.error("[ThemeService] Error loading theme:",e)}return console.log("[ThemeService] Using default theme: solo-leveling"),"solo-leveling"}saveTheme(e){if(!(typeof window>"u"))try{localStorage.setItem(this.storageKey,e),console.log("[ThemeService] Saved theme to localStorage:",e)}catch(n){console.error("[ThemeService] Error saving theme:",n)}}isValidTheme(e){return this.themes.some(n=>n.id===e)}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var gt=(()=>{class t{constructor(){this.topicsData=[{title:"Prerequisites",icon:"bi bi-mortarboard-fill",subTopics:[{title:"How Browsers Work",route:"/prerequisites/web-fundamentals/how-browsers-work",icon:"bi bi-display"},{title:"HTTP & HTTPS",route:"/prerequisites/web-fundamentals/http-https",icon:"bi bi-shield-lock-fill"},{title:"REST APIs",route:"/prerequisites/web-fundamentals/rest-apis",icon:"bi bi-arrow-left-right"},{title:"JSON",route:"/prerequisites/web-fundamentals/json",icon:"bi bi-braces"},{title:"CORS",route:"/prerequisites/web-fundamentals/cors",icon:"bi bi-globe"},{title:"TypeScript",route:"/prerequisites/typescript/typescript-vs-javascript",icon:"bi bi-filetype-ts"}]},{title:"Fundamentals",icon:"bi bi-code-square",subTopics:[{title:"What is Angular",route:"/fundamentals/introduction/what-is-angular",icon:"bi bi-info-circle-fill"},{title:"Architecture",route:"/fundamentals/introduction/architecture-overview",icon:"bi bi-diagram-3-fill"},{title:"Setup & CLI",route:"/fundamentals/setup/cli-installation",icon:"bi bi-terminal-fill"},{title:"First App",route:"/fundamentals/setup/first-app",icon:"bi bi-play-circle-fill"}]},{title:"Core Concepts",icon:"bi bi-boxes",subTopics:[{title:"Modules",route:"/core/modules/module-types",icon:"bi bi-puzzle-fill"},{title:"Components",route:"/core/components/component",icon:"bi bi-layers-fill"},{title:"Templates",route:"/core/templates/data-binding",icon:"bi bi-file-earmark-code-fill"},{title:"Directives",route:"/core/directives/structural-directives",icon:"bi bi-sliders2"}]},{title:"Templates & Rendering",icon:"bi bi-layout-text-window-reverse",subTopics:[{title:"Data Binding",route:"/templates/data-binding",icon:"bi bi-link-45deg"},{title:"Directives",route:"/templates/directives",icon:"bi bi-sliders"},{title:"Pipes",route:"/templates/pipes",icon:"bi bi-funnel-fill"}]},{title:"Dependency Injection & Services",icon:"bi bi-gear-wide-connected",subTopics:[{title:"DI Concepts",route:"/services/di/concepts",icon:"bi bi-bezier2"},{title:"Injectable Services",route:"/services/di/injectable-providers",icon:"bi bi-plug-fill"}]},{title:"Routing & Navigation",icon:"bi bi-signpost-2-fill",subTopics:[{title:"Routing Basics",route:"/routing/basics",icon:"bi bi-signpost-fill"},{title:"Route Guards",route:"/routing/basics/guard",icon:"bi bi-shield-fill-check"},{title:"Decorators",route:"/decorators",icon:"bi bi-at"}]},{title:"Forms",icon:"bi bi-ui-checks-grid",subTopics:[{title:"Forms Module",route:"/forms/form-module",icon:"bi bi-card-checklist"},{title:"Reactive Forms",route:"/forms/reactive-forms",icon:"bi bi-input-cursor-text"},{title:"Form Validation",route:"/forms/form-validation",icon:"bi bi-check2-circle"}]},{title:"RxJS & HTTP",icon:"bi bi-activity",subTopics:[{title:"Observables vs Promises",route:"/rxjs/core/observables-vs-promises",icon:"bi bi-arrow-repeat"},{title:"Subjects",route:"/rxjs/core/subjects",icon:"bi bi-broadcast"},{title:"Basic Operators",route:"/rxjs/operators/basic",icon:"bi bi-funnel"},{title:"Flattening Operators",route:"/rxjs/operators/flattening",icon:"bi bi-diagram-2-fill"},{title:"HTTP Interceptors",route:"/interceptor",icon:"bi bi-shield-fill"},{title:"HTTP Client",route:"/http-client",icon:"bi bi-cloud-arrow-up-fill"}]}],this.topics=b(this.topicsData.map(e=>V(D({},e),{expanded:!1,subTopics:e.subTopics}))),this.allRoutes=A(()=>this.topics().flatMap(e=>e.subTopics.map(n=>n.route)))}toggleTopic(e){let r=[...this.topics()];r[e]=V(D({},r[e]),{expanded:!r[e].expanded}),this.topics.set(r)}expandTopic(e){let r=[...this.topics()];r[e]=V(D({},r[e]),{expanded:!0}),this.topics.set(r)}collapseTopic(e){let r=[...this.topics()];r[e]=V(D({},r[e]),{expanded:!1}),this.topics.set(r)}collapseAll(){let e=this.topics().map(n=>V(D({},n),{expanded:!1}));this.topics.set(e)}getAllRoutes(){return this.allRoutes()}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var ne=(()=>{class t{constructor(){this.toastsSignal=b([]),this.toasts=A(()=>this.toastsSignal())}generateId(){return`toast-${Date.now()}-${Math.random().toString(36).substr(2,9)}`}show(e,n="info",r=3e3,a=!0){let c=this.generateId(),v={id:c,message:e,type:n,duration:r,dismissible:a};return this.toastsSignal.update(_=>[..._,v]),r>0&&setTimeout(()=>this.dismiss(c),r),c}success(e,n){return this.show(e,"success",n)}error(e,n){return this.show(e,"error",n)}warning(e,n){return this.show(e,"warning",n)}info(e,n){return this.show(e,"info",n)}dismiss(e){this.toastsSignal.update(n=>n.filter(r=>r.id!==e))}dismissAll(){this.toastsSignal.set([])}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var ie=(()=>{class t{constructor(e,n){this.appRef=e,this.injector=n,this.activeModalsSignal=b([]),this.hasOpenModals=A(()=>this.activeModalsSignal().length>0)}open(e,n={}){let r=`modal-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,a=D({size:"md",backdrop:!0,keyboard:!0,centered:!1,scrollable:!1},n),c=document.createElement("div");c.className="modal fade",c.setAttribute("tabindex","-1"),c.setAttribute("aria-hidden","true"),c.id=r,a.backdrop==="static"?c.setAttribute("data-bs-backdrop","static"):a.backdrop===!1&&c.setAttribute("data-bs-backdrop","false"),a.keyboard===!1&&c.setAttribute("data-bs-keyboard","false");let v=document.createElement("div");v.className=`modal-dialog modal-${a.size}`,a.centered&&v.classList.add("modal-dialog-centered"),a.scrollable&&v.classList.add("modal-dialog-scrollable");let _=document.createElement("div");_.className="modal-content",v.appendChild(_),c.appendChild(v),document.body.appendChild(c);let F=gn(e,{environmentInjector:this.injector,hostElement:_});this.appRef.attachView(F.hostView);let T,$,se=new Promise((q,Ge)=>{T=q,$=Ge}),$n={id:r,componentRef:F,resolve:T,reject:$};if(this.activeModalsSignal.update(q=>[...q,$n]),c.classList.add("show"),c.style.display="block",document.body.classList.add("modal-open"),a.backdrop!==!1){let q=document.createElement("div");q.className="modal-backdrop fade show",q.id=`${r}-backdrop`,document.body.appendChild(q)}if(a.keyboard!==!1){let q=Ge=>{Ge.key==="Escape"&&(this.closeModal(r,void 0),document.removeEventListener("keydown",q))};document.addEventListener("keydown",q)}return a.backdrop!=="static"&&c.addEventListener("click",q=>{q.target===c&&this.closeModal(r,void 0)}),{close:q=>this.closeModal(r,q),dismiss:()=>this.closeModal(r,void 0),afterClosed:()=>se}}closeModal(e,n){let r=this.activeModalsSignal().find(v=>v.id===e);if(!r)return;let a=document.getElementById(e),c=document.getElementById(`${e}-backdrop`);a&&(a.classList.remove("show"),setTimeout(()=>{a.remove()},150)),c&&c.remove(),this.appRef.detachView(r.componentRef.hostView),r.componentRef.destroy(),r.resolve(n),this.activeModalsSignal.update(v=>v.filter(_=>_.id!==e)),this.activeModalsSignal().length===0&&document.body.classList.remove("modal-open")}closeAll(){[...this.activeModalsSignal()].forEach(n=>this.closeModal(n.id,void 0))}static{this.\u0275fac=function(n){return new(n||t)(We(Ze),We(jt))}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var ht=(()=>{class t{constructor(){this.loaderSignal=b({isLoading:!1}),this.state=A(()=>this.loaderSignal()),this.isLoading=A(()=>this.loaderSignal().isLoading)}show(e){this.loaderSignal.set({isLoading:!0,message:e})}hide(){this.loaderSignal.set({isLoading:!1})}updateProgress(e){this.loaderSignal.update(n=>V(D({},n),{progress:Math.min(100,Math.max(0,e))}))}withLoader(e,n){return this.show(n),e.finally(()=>this.hide())}withLoaderAsync(e,n){return Ie(this,null,function*(){this.show(n);try{return yield e()}finally{this.hide()}})}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var j=(function(t){return t[t.DEBUG=0]="DEBUG",t[t.INFO=1]="INFO",t[t.WARN=2]="WARN",t[t.ERROR=3]="ERROR",t[t.NONE=4]="NONE",t})(j||{}),Me=(()=>{class t{constructor(){this.logs=[],this.maxLogs=100,this.minLevel=pn()?j.DEBUG:j.WARN}debug(e,n,r){this.log(j.DEBUG,e,n,r)}info(e,n,r){this.log(j.INFO,e,n,r)}warn(e,n,r){this.log(j.WARN,e,n,r)}error(e,n,r){this.log(j.ERROR,e,n,r)}getLogs(){return[...this.logs]}getLogsByLevel(e){return this.logs.filter(n=>n.level===e)}clearLogs(){this.logs.length=0}exportLogs(){return JSON.stringify(this.logs,null,2)}log(e,n,r,a){if(e<this.minLevel)return;let c={timestamp:new Date,level:e,message:n,context:a,data:r};this.logs.push(c),this.logs.length>this.maxLogs&&this.logs.shift(),this.outputToConsole(c)}outputToConsole(e){let{timestamp:n,level:r,message:a,context:c,data:v}=e,_=n.toISOString().split("T")[1].split(".")[0],F=c?`[${c}]`:"",T=this.getConsoleStyles(r),$=j[r].padStart(5),se=`%c${_} %c${$}%c ${F}`;switch(r){case j.DEBUG:console.debug(se,"color: #6b7280",T,"",a,v??"");break;case j.INFO:console.info(se,"color: #6b7280",T,"",a,v??"");break;case j.WARN:console.warn(se,"color: #6b7280",T,"",a,v??"");break;case j.ERROR:console.error(se,"color: #6b7280",T,"",a,v??"");break}}getConsoleStyles(e){let n="padding: 2px 6px; border-radius: 3px; font-weight: bold;";switch(e){case j.DEBUG:return`${n} background: #e5e7eb; color: #374151;`;case j.INFO:return`${n} background: #dbeafe; color: #1d4ed8;`;case j.WARN:return`${n} background: #fef3c7; color: #b45309;`;case j.ERROR:return`${n} background: #fee2e2; color: #b91c1c;`;default:return n}}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var J=(function(t){return t.HTTP="HTTP",t.VALIDATION="VALIDATION",t.RUNTIME="RUNTIME",t.UNKNOWN="UNKNOWN",t})(J||{}),Jn=(()=>{class t{constructor(){this.logger=M(Me),this.toastService=M(ne),this.ngZone=M(Bt),this.userFriendlyMessages={401:"Your session has expired. Please sign in again.",403:"You do not have permission to perform this action.",404:"The requested resource was not found.",500:"An internal server error occurred. Please try again later.",502:"The server is temporarily unavailable. Please try again later.",503:"The service is currently unavailable. Please try again later.",504:"The request timed out. Please check your connection and try again.",NETWORK_ERROR:"Unable to connect to the server. Please check your internet connection.",TIMEOUT:"The request took too long to complete. Please try again.",VALIDATION_ERROR:"Please check your input and try again.",UNKNOWN_ERROR:"An unexpected error occurred. Please try again."}}handleError(e){let n=this.categorizeError(e);this.logger.error(n.message,e,n.category),this.shouldShowToast(n)&&this.ngZone.run(()=>{this.toastService.show(this.getUserFriendlyMessage(n),n.category===J.HTTP?"error":"warning",5e3)}),this.isProduction()||console.error("Error details:",e)}handleHttpError(e){let n={category:J.HTTP,message:e.message,code:e.status,details:e.error,timestamp:new Date};return this.handleError(n),n}handleValidationError(e,n){let r={category:J.VALIDATION,message:e,details:n,timestamp:new Date};return this.handleError(r),r}categorizeError(e){return e instanceof fn?{category:J.HTTP,message:e.message,code:e.status,details:e.error,timestamp:new Date}:this.isAppError(e)?e:e instanceof Error?{category:J.RUNTIME,message:e.message,details:e.stack,timestamp:new Date}:{category:J.UNKNOWN,message:String(e)||"An unknown error occurred",timestamp:new Date}}isAppError(e){return typeof e=="object"&&e!==null&&"category"in e&&"message"in e&&"timestamp"in e}shouldShowToast(e){return!(e.category===J.VALIDATION||e.code===401)}getUserFriendlyMessage(e){if(e.code&&this.userFriendlyMessages[String(e.code)])return this.userFriendlyMessages[String(e.code)];let n=String(e.message).toUpperCase();if(n.includes("TIMEOUT")||n.includes("ETIMEDOUT"))return this.userFriendlyMessages.TIMEOUT;if(n.includes("NETWORK")||n.includes("ECONNREFUSED"))return this.userFriendlyMessages.NETWORK_ERROR;switch(e.category){case J.HTTP:return this.userFriendlyMessages[500];case J.RUNTIME:return"An application error occurred. Please refresh the page and try again.";default:return this.userFriendlyMessages.UNKNOWN_ERROR}}isProduction(){try{let e=window.__env;return e?e.production:!1}catch(e){return!0}}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var Kn=(t,o)=>{let e=M(Me),n=M(ht),r=M(ne),a=M(W),c=t.headers.has("X-Skip-Loader"),v=t,_=a.getToken();_&&(v=t.clone({headers:t.headers.set("Authorization",`Bearer ${_}`)})),v.headers.has("Content-Type")||(v=v.clone({headers:v.headers.set("Content-Type","application/json")})),c||n.show(),e.debug(`HTTP ${t.method}`,{url:t.url,body:t.body},"HTTP");let F=performance.now();return o(v).pipe(Nt(T=>{let $=performance.now()-F;e.debug(`HTTP ${t.method} completed`,{url:t.url,duration:`${$.toFixed(2)}ms`},"HTTP")}),Ft(T=>{let $=performance.now()-F;return e.error(`HTTP ${t.method} failed`,{url:t.url,status:T.status,error:T.error,duration:`${$.toFixed(2)}ms`},"HTTP"),T.status===401?(a.logout(),r.show("Your session has expired. Please sign in again.","warning",5e3)):T.status===403?r.show("You do not have permission to perform this action.","error",5e3):T.status===0&&r.show("Network error. Please check your connection.","error",5e3),Dt(()=>T)}),Vt(()=>{c||n.hide()}))};var Pe=(t,o)=>o.id;function Yn(t,o){if(t&1){let e=O();s(0,"button",47),x("click",function(){C(e);let r=p();return w(r.logout())}),g(1,"i",48),d(2," Sign out "),l()}}function Xn(t,o){if(t&1){let e=O();s(0,"button",47),x("click",function(){C(e);let r=p();return w(r.login())}),g(1,"i",49),d(2," Sign in "),l()}}function Qn(t,o){t&1&&g(0,"i",53)}function Zn(t,o){if(t&1){let e=O();s(0,"button",50),x("click",function(){let r=C(e).$implicit,a=p();return w(a.setTheme(r.id))}),g(1,"div",51),s(2,"span",52),d(3),l(),h(4,Qn,1,0,"i",53),l()}if(t&2){let e=o.$implicit,n=p();P("active",n.themeService.currentTheme()===e.id),I("title",e.description),i(),K("background",e.gradient),i(2),y(e.name),i(),f(n.themeService.currentTheme()===e.id?4:-1)}}function er(t,o){t&1&&g(0,"i",53)}function tr(t,o){if(t&1){let e=O();s(0,"button",50),x("click",function(){let r=C(e).$implicit,a=p();return w(a.setTheme(r.id))}),g(1,"div",51),s(2,"span",52),d(3),l(),h(4,er,1,0,"i",53),l()}if(t&2){let e=o.$implicit,n=p();P("active",n.themeService.currentTheme()===e.id),I("title",e.description),i(),K("background",e.gradient),i(2),y(e.name),i(),f(n.themeService.currentTheme()===e.id?4:-1)}}function nr(t,o){t&1&&g(0,"i",53)}function rr(t,o){if(t&1){let e=O();s(0,"button",50),x("click",function(){let r=C(e).$implicit,a=p();return w(a.setTheme(r.id))}),g(1,"div",51),s(2,"span",52),d(3),l(),h(4,nr,1,0,"i",53),l()}if(t&2){let e=o.$implicit,n=p();P("active",n.themeService.currentTheme()===e.id),I("title",e.description),i(),K("background",e.gradient),i(2),y(e.name),i(),f(n.themeService.currentTheme()===e.id?4:-1)}}function or(t,o){t&1&&g(0,"i",53)}function ir(t,o){if(t&1){let e=O();s(0,"button",50),x("click",function(){let r=C(e).$implicit,a=p();return w(a.setTheme(r.id))}),g(1,"div",51),s(2,"span",52),d(3),l(),h(4,or,1,0,"i",53),l()}if(t&2){let e=o.$implicit,n=p();P("active",n.themeService.currentTheme()===e.id),I("title",e.description),i(),K("background",e.gradient),i(2),y(e.name),i(),f(n.themeService.currentTheme()===e.id?4:-1)}}function ar(t,o){t&1&&g(0,"i",53)}function sr(t,o){if(t&1){let e=O();s(0,"button",50),x("click",function(){let r=C(e).$implicit,a=p();return w(a.setTheme(r.id))}),g(1,"div",51),s(2,"span",52),d(3),l(),h(4,ar,1,0,"i",53),l()}if(t&2){let e=o.$implicit,n=p();P("active",n.themeService.currentTheme()===e.id),I("title",e.description),i(),K("background",e.gradient),i(2),y(e.name),i(),f(n.themeService.currentTheme()===e.id?4:-1)}}var ft=(()=>{class t{constructor(){this.themeService=M(Se),this.authService=M(W),this.menuToggle=we(),this.bsOffcanvas=null,this.offcanvasInstance=null,this.lightThemes=b(this.themeService.themes.filter(e=>["arctic","sunset","emerald","cyber"].includes(e.id))),this.darkThemes=b(this.themeService.themes.filter(e=>["midnight","aurora","obsidian","blood-moon","ocean-deep","lava"].includes(e.id))),this.batmanThemes=b(this.themeService.themes.filter(e=>["batman"].includes(e.id))),this.coolThemes=b(this.themeService.themes.filter(e=>["neon-noir","hologram","galaxy"].includes(e.id))),this.animeThemes=b(this.themeService.themes.filter(e=>["sakura","dragonball","evangelion","solo-leveling"].includes(e.id)))}openThemePanel(){let e=document.getElementById("themeOffcanvas");e&&(this.offcanvasInstance||(this.offcanvasInstance=new bootstrap.Offcanvas(e,{backdrop:!0,scroll:!1})),this.offcanvasInstance.show())}closeThemePanel(){this.offcanvasInstance?.hide()}setTheme(e){this.themeService.setTheme(e)}onToggleMenu(){this.menuToggle.emit()}logout(){this.authService.logout()}login(){window.dispatchEvent(new CustomEvent("app:login"))}ngOnDestroy(){this.offcanvasInstance?.dispose()}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=L({type:t,selectors:[["app-header"]],outputs:{menuToggle:"menuToggle"},decls:81,vars:9,consts:[["themeOffcanvas",""],[1,"glass-header"],[1,"header-left"],["aria-label","Toggle navigation",1,"menu-toggle",3,"click"],[1,"bi","bi-list"],["routerLink","/",1,"header-brand"],[1,"angular-logo"],["viewBox","0 0 250 250",1,"logo-svg"],["d","M125 0L0 45l20 160 105 45 105-45 20-160L125 0z",1,"logo-shield"],["d","M125 25L30 60l15 130 80 35 80-35 15-130-95-35z",1,"logo-inner"],["d","M125 50L85 170h25l10-35h30l10 35h25L145 50h-20zm10 45l10 35h-20l10-35z",1,"logo-a"],["d","M125 15L125 35M60 55L75 65M190 55L175 65",1,"logo-accent"],[1,"logo-glow"],[1,"brand-text"],[1,"brand-title"],[1,"brand-subtitle"],[1,"header-right"],["aria-label","Choose theme",1,"theme-btn",3,"click","title"],[1,"theme-name"],[1,"bi","bi-sliders2"],[1,"user-dropdown"],[1,"user-btn"],[1,"user-avatar"],[1,"bi","bi-person-fill"],[1,"user-name"],[1,"bi","bi-chevron-down"],[1,"user-menu"],[1,"user-header"],[1,"user-avatar","user-avatar--lg"],[1,"user-info"],[1,"user-display-name"],[1,"user-role"],[1,"menu-divider"],["routerLink","/settings",1,"menu-item"],[1,"bi","bi-gear"],[1,"menu-item"],["tabindex","-1","id","themeOffcanvas","aria-labelledby","themeOffcanvasLabel",1,"offcanvas","offcanvas-end","theme-offcanvas"],[1,"offcanvas-header-glass"],[1,"offcanvas-title-group"],["id","themeOffcanvasLabel",1,"offcanvas-title"],[1,"offcanvas-subtitle"],["aria-label","Close theme panel",1,"offcanvas-close",3,"click"],[1,"bi","bi-x-lg"],[1,"offcanvas-body-glass"],[1,"theme-category"],[1,"theme-grid"],[1,"theme-option",3,"active","title"],[1,"menu-item",3,"click"],[1,"bi","bi-box-arrow-right"],[1,"bi","bi-box-arrow-in-right"],[1,"theme-option",3,"click","title"],[1,"theme-preview"],[1,"theme-label"],[1,"bi","bi-check-circle-fill","check-icon"]],template:function(n,r){n&1&&(s(0,"header",1)(1,"div",2)(2,"button",3),x("click",function(){return r.onToggleMenu()}),g(3,"i",4),l(),s(4,"a",5)(5,"div",6),Lt(),s(6,"svg",7),g(7,"path",8)(8,"path",9)(9,"path",10)(10,"path",11),l(),Ht(),g(11,"div",12),l(),s(12,"div",13)(13,"span",14),d(14,"Angular"),l(),s(15,"span",15),d(16,"Academy"),l()()()(),s(17,"div",16)(18,"button",17),x("click",function(){return r.openThemePanel()}),g(19,"i"),s(20,"span",18),d(21),l(),g(22,"i",19),l(),s(23,"div",20)(24,"button",21)(25,"div",22),g(26,"i",23),l(),s(27,"span",24),d(28),l(),g(29,"i",25),l(),s(30,"div",26)(31,"div",27)(32,"div",28),g(33,"i",23),l(),s(34,"div",29)(35,"span",30),d(36),l(),s(37,"span",31),d(38,"Student"),l()()(),g(39,"div",32),s(40,"a",33),g(41,"i",34),d(42," Settings "),l(),h(43,Yn,3,0,"button",35)(44,Xn,3,0,"button",35),l()()()(),s(45,"div",36,0)(47,"div",37)(48,"div",38)(49,"span",39),d(50," Choose Theme "),l(),s(51,"span",40),d(52),l()(),s(53,"button",41),x("click",function(){return r.closeThemePanel()}),g(54,"i",42),l()(),s(55,"div",43)(56,"p",44),d(57,"Light"),l(),s(58,"div",45),k(59,Zn,5,7,"button",46,Pe),l(),s(61,"p",44),d(62,"Dark"),l(),s(63,"div",45),k(64,tr,5,7,"button",46,Pe),l(),s(66,"p",44),d(67,"Batman"),l(),s(68,"div",45),k(69,rr,5,7,"button",46,Pe),l(),s(71,"p",44),d(72,"Cool"),l(),s(73,"div",45),k(74,ir,5,7,"button",46,Pe),l(),s(76,"p",44),d(77,"Anime"),l(),s(78,"div",45),k(79,sr,5,7,"button",46,Pe),l()()()),n&2&&(i(18),I("title","Theme: "+r.themeService.currentThemeConfig().name),i(),G(on("bi ",r.themeService.currentThemeConfig().icon," theme-icon")),i(2),y(r.themeService.currentThemeConfig().name),i(7),y(r.authService.username()),i(8),y(r.authService.username()),i(7),f(r.authService.isLoggedIn()?43:44),i(9),R(" ",r.themeService.themes.length," themes available "),i(7),E(r.lightThemes()),i(5),E(r.darkThemes()),i(5),E(r.batmanThemes()),i(5),E(r.coolThemes()),i(5),E(r.animeThemes()))},dependencies:[z,fe],styles:['[_nghost-%COMP%]{display:contents}.glass-header[_ngcontent-%COMP%]{position:sticky;top:0;height:70px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;z-index:1020;background:var(--glass-bg);backdrop-filter:blur(var(--glass-blur)) saturate(1.8);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(1.8);border:1px solid var(--glass-border);box-shadow:var(--shadow-md),var(--glass-inner-shadow);border-top:none;border-left:none;border-right:none;border-radius:0}.glass-header[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:-1px;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,var(--glass-border-strong),transparent);border-radius:var(--radius-full)}.header-left[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px}.menu-toggle[_ngcontent-%COMP%]{width:42px;height:42px;border-radius:var(--radius-md);border:1px solid var(--glass-border);background:var(--glass-bg);color:var(--text-primary);font-size:1.25rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all var(--duration-fast) var(--ease-smooth)}.menu-toggle[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover);border-color:var(--glass-border-strong);box-shadow:var(--shadow-glow)}.header-brand[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;color:var(--text-primary);text-decoration:none}.header-brand[_ngcontent-%COMP%]:hover   .angular-logo[_ngcontent-%COMP%]{transform:rotate(-5deg) scale(1.05)}.header-brand[_ngcontent-%COMP%]:hover   .logo-glow[_ngcontent-%COMP%]{opacity:.6;transform:scale(1.2)}.header-brand[_ngcontent-%COMP%]:hover   .brand-title[_ngcontent-%COMP%]{background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.angular-logo[_ngcontent-%COMP%]{position:relative;width:42px;height:42px;flex-shrink:0;transition:transform var(--duration-base) var(--ease-smooth)}.angular-logo[_ngcontent-%COMP%]   .logo-svg[_ngcontent-%COMP%]{width:100%;height:100%;filter:drop-shadow(0 2px 8px rgba(221,0,49,.3));animation:_ngcontent-%COMP%_logoFloat 3s ease-in-out infinite}.angular-logo[_ngcontent-%COMP%]   .logo-shield[_ngcontent-%COMP%]{fill:#dd0031;transition:fill var(--duration-base) var(--ease-smooth)}.angular-logo[_ngcontent-%COMP%]   .logo-inner[_ngcontent-%COMP%]{fill:#c3002f}.angular-logo[_ngcontent-%COMP%]   .logo-a[_ngcontent-%COMP%]{fill:#fff;filter:drop-shadow(0 1px 2px rgba(0,0,0,.2))}.angular-logo[_ngcontent-%COMP%]   .logo-accent[_ngcontent-%COMP%]{stroke:#fff9;stroke-width:3;stroke-linecap:round;fill:none}.angular-logo[_ngcontent-%COMP%]   .logo-glow[_ngcontent-%COMP%]{position:absolute;inset:-8px;background:radial-gradient(circle,rgba(221,0,49,.4) 0%,transparent 70%);border-radius:50%;opacity:0;transition:opacity,transform var(--duration-base) var(--ease-smooth);pointer-events:none;z-index:-1}.brand-text[_ngcontent-%COMP%]{display:flex;flex-direction:column;line-height:1.1}.brand-title[_ngcontent-%COMP%]{font-family:var(--font-display, "Syne", sans-serif);font-size:1.25rem;font-weight:800;letter-spacing:-.02em;color:var(--text-primary);transition:all var(--duration-fast) var(--ease-smooth)}.brand-subtitle[_ngcontent-%COMP%]{font-family:var(--font-display, "Syne", sans-serif);font-size:.6875rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--text-secondary);margin-top:2px}@keyframes _ngcontent-%COMP%_logoFloat{0%,to{transform:translateY(0)}50%{transform:translateY(-3px)}}.header-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.theme-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:8px 16px;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-md);color:var(--text-primary);font-family:var(--font-body, inherit);font-size:.9rem;font-weight:600;cursor:pointer;transition:all var(--duration-fast) var(--ease-smooth)}.theme-btn[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover);border-color:var(--glass-border-strong);box-shadow:var(--shadow-glow)}.theme-btn[_ngcontent-%COMP%]   .theme-icon[_ngcontent-%COMP%]{font-size:1.125rem;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}@media(max-width:767px){.theme-btn[_ngcontent-%COMP%]   .theme-name[_ngcontent-%COMP%]{display:none}}.theme-btn[_ngcontent-%COMP%]   .bi-chevron-down[_ngcontent-%COMP%]{font-size:.75rem;color:var(--text-muted);transition:transform var(--duration-base) var(--ease-smooth)}.user-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:5px 14px 5px 5px;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-full);color:var(--text-primary);font-family:var(--font-body, inherit);font-size:.9rem;font-weight:500;cursor:pointer;transition:all var(--duration-fast) var(--ease-smooth)}.user-btn[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover);border-color:var(--glass-border-strong);box-shadow:var(--shadow-glow)}@media(max-width:767px){.user-btn[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%]{display:none}}.user-avatar[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:50%;background:var(--accent-gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;flex-shrink:0;box-shadow:0 2px 10px var(--accent-glow)}.user-avatar--lg[_ngcontent-%COMP%]{width:46px;height:46px;font-size:1.3rem}.user-dropdown[_ngcontent-%COMP%]{position:relative}.user-menu[_ngcontent-%COMP%]{position:absolute;top:calc(100% + 10px);right:0;min-width:240px;border-radius:var(--radius-lg);padding:10px;z-index:1060;opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity,visibility,transform var(--duration-base) var(--ease-smooth);background:var(--glass-bg-hover);backdrop-filter:blur(var(--glass-blur-heavy)) saturate(1.8);-webkit-backdrop-filter:blur(var(--glass-blur-heavy)) saturate(1.8);border:1px solid var(--glass-border);box-shadow:var(--shadow-md),var(--glass-inner-shadow)}.user-dropdown[_ngcontent-%COMP%]:hover   .user-menu[_ngcontent-%COMP%]{opacity:1;visibility:visible;transform:translateY(0)}.user-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:10px 12px 14px}.user-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px}.user-info[_ngcontent-%COMP%]   .user-display-name[_ngcontent-%COMP%]{font-family:var(--font-display, "Syne", sans-serif);font-size:.9375rem;font-weight:700;color:var(--text-primary)}.user-info[_ngcontent-%COMP%]   .user-role[_ngcontent-%COMP%]{font-size:.75rem;color:var(--text-muted)}.menu-divider[_ngcontent-%COMP%]{height:1px;background:linear-gradient(90deg,transparent,var(--glass-border-strong),transparent);margin:6px 0}.menu-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--radius-sm);color:var(--text-secondary);text-decoration:none;font-size:.9rem;border:none;background:transparent;width:100%;cursor:pointer;transition:all var(--duration-fast) var(--ease-smooth)}.menu-item[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover);color:var(--text-primary)}.menu-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1rem;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.theme-offcanvas[_ngcontent-%COMP%]{--bs-offcanvas-width: 360px;--bs-offcanvas-bg: transparent;--bs-offcanvas-border-color: transparent;background:var(--glass-bg-hover)!important;backdrop-filter:blur(var(--glass-blur-heavy)) saturate(2)!important;-webkit-backdrop-filter:blur(var(--glass-blur-heavy)) saturate(2)!important;border-left:1px solid var(--glass-border-strong)!important;box-shadow:var(--shadow-xl)!important;transition:transform var(--duration-slow) var(--ease-smooth)!important}.theme-offcanvas[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.08) 0%,transparent 50%);pointer-events:none}.offcanvas-header-glass[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:20px 20px 16px;border-bottom:1px solid var(--glass-border);position:relative}.offcanvas-header-glass[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:-1px;left:15%;right:15%;height:1px;background:var(--accent-gradient);opacity:.5;border-radius:var(--radius-full)}.offcanvas-title-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px}.offcanvas-title[_ngcontent-%COMP%]{font-family:var(--font-display, "Syne", sans-serif);font-size:1rem;font-weight:800;letter-spacing:-.01em;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.offcanvas-subtitle[_ngcontent-%COMP%]{font-size:.75rem;color:var(--text-muted)}.offcanvas-close[_ngcontent-%COMP%]{width:34px;height:34px;border-radius:var(--radius-sm);border:1px solid var(--glass-border);background:var(--glass-bg);color:var(--text-muted);font-size:1rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all var(--duration-fast) var(--ease-smooth)}.offcanvas-close[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover);border-color:var(--glass-border-strong);color:var(--text-primary);box-shadow:var(--shadow-glow)}.offcanvas-body-glass[_ngcontent-%COMP%]{padding:18px 16px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--glass-border-strong) transparent}.offcanvas-body-glass[_ngcontent-%COMP%]::-webkit-scrollbar{width:3px}.offcanvas-body-glass[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:var(--glass-border-strong);border-radius:var(--radius-full)}.theme-category[_ngcontent-%COMP%]{font-family:var(--font-display, "Syne", sans-serif);font-size:.6875rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);padding:0 4px;margin:16px 0 8px;display:flex;align-items:center;gap:8px}.theme-category[_ngcontent-%COMP%]:first-child{margin-top:0}.theme-category[_ngcontent-%COMP%]:after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--glass-border),transparent)}.theme-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.theme-option[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 10px;background:var(--glass-bg);border:1.5px solid transparent;border-radius:var(--radius-lg);cursor:pointer;position:relative;overflow:hidden;transition:all var(--duration-base) var(--ease-spring)}.theme-option[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(145deg,rgba(255,255,255,.12) 0%,transparent 60%);pointer-events:none}.theme-option[_ngcontent-%COMP%]:hover{transform:translateY(-3px) scale(1.02);background:var(--glass-bg-hover);border-color:var(--glass-border-strong);box-shadow:var(--shadow-md)}.theme-option.active[_ngcontent-%COMP%]{border-color:var(--accent-primary);background:var(--glass-bg-hover);box-shadow:var(--shadow-glow)}.theme-preview[_ngcontent-%COMP%]{width:52px;height:52px;border-radius:var(--radius-md);box-shadow:0 4px 14px #0000002e;flex-shrink:0}.theme-label[_ngcontent-%COMP%]{font-family:var(--font-display, "Syne", sans-serif);font-size:.6875rem;font-weight:700;color:var(--text-secondary);text-align:center;line-height:1.3;letter-spacing:.01em}.check-icon[_ngcontent-%COMP%]{position:absolute;top:7px;right:7px;font-size:.8125rem;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}@media(max-width:480px){.glass-header[_ngcontent-%COMP%]{padding:0 14px}.theme-offcanvas[_ngcontent-%COMP%]{--bs-offcanvas-width: 100vw}}@media(prefers-reduced-motion:reduce){.theme-option[_ngcontent-%COMP%], .theme-btn[_ngcontent-%COMP%], .user-btn[_ngcontent-%COMP%], .menu-toggle[_ngcontent-%COMP%]{transition:none}}'],changeDetection:0})}}return t})();var lr=()=>({exact:!0}),cr=(t,o)=>o.title,Cn=(t,o)=>o.route;function dr(t,o){t&1&&(s(0,"span",5),d(1,"Angular"),l())}function pr(t,o){t&1&&(s(0,"span",10),d(1,"Dashboard"),l())}function ur(t,o){if(t&1){let e=O();s(0,"a",22),x("click",function(){C(e);let r=p(4);return w(r.onItemClick())}),s(1,"div",23),g(2,"i",24),l(),s(3,"span",25),d(4),l(),s(5,"div",26),g(6,"i",27),l()()}if(t&2){let e=o.$implicit;I("routerLink",e.route),i(4),y(e.title)}}function mr(t,o){if(t&1&&(s(0,"div",20),k(1,ur,7,2,"a",21,Cn),l()),t&2){let e=p(2).$implicit;i(),E(e.subTopics)}}function gr(t,o){if(t&1){let e=O();s(0,"button",18),x("click",function(){C(e);let r=p().$implicit,a=p();return a.toggleTopic(r.title),w(a.navigateToFirstSubtopic(r))}),s(1,"div",8),g(2,"i"),l(),s(3,"span",10),d(4),l(),g(5,"i",19),l(),h(6,mr,3,0,"div",20)}if(t&2){let e=p().$implicit,n=p();P("expanded",n.isTopicExpanded(e.title)),i(2),G(e.icon),i(2),y(e.title),i(2),f(n.isTopicExpanded(e.title)?6:-1)}}function hr(t,o){if(t&1){let e=O();s(0,"a",28),x("mouseenter",function(r){C(e);let a=p().$implicit,c=p();return w(c.showTooltip(a,r))})("mouseleave",function(){C(e);let r=p(2);return w(r.hideTooltip())})("click",function(){C(e);let r=p(2);return w(r.onItemClick())}),s(1,"div",8),g(2,"i"),l(),s(3,"div",29),d(4),l()()}if(t&2){let e=p().$implicit;I("routerLink",e.subTopics[0]==null?null:e.subTopics[0].route),i(2),G(e.icon),i(2),y(e.title)}}function fr(t,o){if(t&1&&(s(0,"div",11),h(1,gr,7,6)(2,hr,5,4,"a",17),l()),t&2){let e=o.$implicit,n=p();Q("data-topic",e.title),i(),f(n.isCollapsed()?2:1)}}function vr(t,o){t&1&&(s(0,"span",10),d(1,"Collapse"),l())}function br(t,o){if(t&1){let e=O();s(0,"a",39),x("click",function(){C(e);let r=p(2);return w(r.onTooltipItemClick())}),g(1,"i",40),s(2,"span"),d(3),l()()}if(t&2){let e=o.$implicit;I("routerLink",e.route),i(3),y(e.title)}}function yr(t,o){if(t&1){let e=O();s(0,"div",30),x("mouseenter",function(){C(e);let r=p();return w(r.onTooltipEnter())})("mouseleave",function(){C(e);let r=p();return w(r.hideTooltip())}),s(1,"div",31)(2,"div",32),g(3,"i"),l(),s(4,"span",33),d(5),l()(),s(6,"div",34),k(7,br,4,2,"a",35,Cn),l(),s(9,"div",36)(10,"a",37),x("click",function(){C(e);let r=p();return w(r.onTooltipItemClick())}),s(11,"span"),d(12,"View Topic"),l(),g(13,"i",38),l()()()}if(t&2){let e,n=p();K("top",n.tooltipPosition().top,"px")("left",n.tooltipPosition().left,"px"),i(3),G(n.activeTooltip().icon),i(2),y(n.activeTooltip().title),i(2),E(n.activeTooltip().subTopics),i(3),I("routerLink",(e=n.activeTooltip().subTopics[0])==null?null:e.route)}}function xr(t,o){if(t&1){let e=O();s(0,"div",41),x("click",function(){C(e);let r=p();return w(r.closeMobile())}),l()}}var vt=(()=>{class t{constructor(){this.navigationService=M(gt),this.router=M(he),this.isCollapsed=b(!1),this.isMobileOpen=b(!1),this.expandedTopics=b(new Set),this.activeTooltip=b(null),this.tooltipPosition=b({top:0,left:0}),this.hideTimer=null,this.itemSelected=we(),this.collapseChanged=we()}ngOnInit(){this.router.events.pipe(ye(e=>e instanceof _e)).subscribe(e=>{this.expandTopicForRoute(e.url)})}expandTopicForRoute(e){for(let n of this.navigationService.topics())if(n.subTopics.some(a=>e.startsWith(a.route)||a.route===e)){let a=this.navigationService.topics().findIndex(c=>c.title===n.title);a!==-1&&this.navigationService.expandTopic(a),setTimeout(()=>this.scrollToTopic(n.title),100);break}}scrollToTopic(e){let n=document.querySelector(`[data-topic="${e}"]`);n&&n.scrollIntoView({behavior:"smooth",block:"center"})}toggleCollapse(){this.isCollapsed.update(e=>!e),this.collapseChanged.emit(this.isCollapsed()),this.isCollapsed()||this.activeTooltip.set(null)}toggleTopic(e){let n=this.navigationService.topics().findIndex(r=>r.title===e);n!==-1&&this.navigationService.toggleTopic(n)}isTopicExpanded(e){let n=this.navigationService.topics().findIndex(r=>r.title===e);return n!==-1&&this.navigationService.topics()[n].expanded||!1}showTooltip(e,n){this._clearHideTimer();let r=n.currentTarget.getBoundingClientRect();this.tooltipPosition.set({top:r.top,left:r.right+10}),this.activeTooltip.set(e)}onTooltipEnter(){this._clearHideTimer()}hideTooltip(){this.hideTimer=setTimeout(()=>this.activeTooltip.set(null),160)}_clearHideTimer(){this.hideTimer!==null&&(clearTimeout(this.hideTimer),this.hideTimer=null)}onTooltipItemClick(){this.activeTooltip.set(null),this.onItemClick()}onItemClick(){this.itemSelected.emit(),window.innerWidth<992&&this.isMobileOpen.set(!1)}closeMobile(){this.isMobileOpen.set(!1)}openMobile(){this.isMobileOpen.set(!0)}navigateToFirstSubtopic(e){e.subTopics.length>0&&this.router.navigate([e.subTopics[0].route])}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=L({type:t,selectors:[["app-sidebar"]],outputs:{itemSelected:"itemSelected",collapseChanged:"collapseChanged"},decls:20,vars:15,consts:[[1,"sidebar"],[1,"sidebar-logo"],["routerLink","/",1,"logo-link"],[1,"logo-icon"],[1,"bi","bi-code-square"],[1,"logo-text"],[1,"sidebar-nav"],["routerLink","/","routerLinkActive","active",1,"nav-link",3,"click","routerLinkActiveOptions"],[1,"nav-icon"],[1,"bi","bi-grid-fill"],[1,"nav-label"],[1,"nav-group"],[1,"sidebar-footer"],[1,"nav-link",3,"click"],[1,"bi"],[1,"nav-tooltip",3,"top","left"],[1,"sidebar-overlay"],["routerLinkActive","active",1,"nav-link",3,"routerLink"],[1,"nav-link","nav-group-toggle",3,"click"],[1,"bi","bi-chevron-right","arrow-icon"],[1,"submenu"],["routerLinkActive","active",1,"submenu-link",3,"routerLink"],["routerLinkActive","active",1,"submenu-link",3,"click","routerLink"],[1,"submenu-icon"],[1,"bi","bi-chevron-right"],[1,"submenu-text"],[1,"submenu-arrow"],[1,"bi","bi-arrow-right-short"],["routerLinkActive","active",1,"nav-link",3,"mouseenter","mouseleave","click","routerLink"],[1,"nav-tooltip-title"],[1,"nav-tooltip",3,"mouseenter","mouseleave"],[1,"tooltip-header"],[1,"tooltip-icon"],[1,"tooltip-title"],[1,"tooltip-content"],[1,"tooltip-item",3,"routerLink"],[1,"tooltip-footer"],[1,"tooltip-view-all",3,"click","routerLink"],[1,"bi","bi-arrow-right"],[1,"tooltip-item",3,"click","routerLink"],[1,"bi","bi-circle-fill","tooltip-dot"],[1,"sidebar-overlay",3,"click"]],template:function(n,r){n&1&&(s(0,"aside",0)(1,"div",1)(2,"a",2)(3,"div",3),g(4,"i",4),l(),h(5,dr,2,0,"span",5),l()(),s(6,"nav",6)(7,"a",7),x("click",function(){return r.onItemClick()}),s(8,"div",8),g(9,"i",9),l(),h(10,pr,2,0,"span",10),l(),k(11,fr,3,2,"div",11,cr),l(),s(13,"div",12)(14,"button",13),x("click",function(){return r.toggleCollapse()}),s(15,"div",8),g(16,"i",14),l(),h(17,vr,2,0,"span",10),l()(),h(18,yr,14,8,"div",15),l(),h(19,xr,1,0,"div",16)),n&2&&(P("collapsed",r.isCollapsed())("mobile-open",r.isMobileOpen()),i(5),f(r.isCollapsed()?-1:5),i(2),I("routerLinkActiveOptions",ge(14,lr)),i(3),f(r.isCollapsed()?-1:10),i(),E(r.navigationService.topics()),i(5),P("bi-chevron-double-left",!r.isCollapsed())("bi-chevron-double-right",r.isCollapsed()),i(),f(r.isCollapsed()?-1:17),i(),f(r.activeTooltip()&&r.isCollapsed()?18:-1),i(),f(r.isMobileOpen()?19:-1))},dependencies:[z,fe,xn],styles:['@keyframes _ngcontent-%COMP%_slideDown{0%{opacity:0;transform:translateY(-10px) scaleY(.96)}to{opacity:1;transform:translateY(0) scaleY(1)}}@keyframes _ngcontent-%COMP%_tooltipIn{0%{opacity:0;transform:scale(.94) translate(-8px)}to{opacity:1;transform:scale(1) translate(0)}}@keyframes _ngcontent-%COMP%_pulseGlow{0%,to{box-shadow:0 4px 14px var(--accent-glow)}50%{box-shadow:0 4px 28px var(--accent-glow),0 0 40px var(--accent-glow)}}[_nghost-%COMP%]{display:contents;font-family:var(--font-body, "DM Sans", sans-serif)}.sidebar[_ngcontent-%COMP%]{left:0;top:0;height:100vh;width:260px;display:flex;flex-direction:column;z-index:1030;overflow:hidden;transition:width var(--duration-slow) var(--ease-smooth);position:fixed;background:var(--glass-bg);backdrop-filter:blur(var(--glass-blur)) saturate(1.8);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(1.8);border:1px solid var(--glass-border);box-shadow:var(--shadow-md),var(--glass-inner-shadow)}.sidebar[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(160deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,.04) 50%,transparent 100%);pointer-events:none}.sidebar[_ngcontent-%COMP%]{border-right:1px solid var(--glass-border-strong);border-top:none;border-bottom:none;border-left:none;border-radius:0 var(--radius-xl) var(--radius-xl) 0}.sidebar[_ngcontent-%COMP%]:after{content:"";position:absolute;top:10%;bottom:10%;right:-1px;width:2px;background:var(--accent-gradient);border-radius:var(--radius-full);opacity:.35;pointer-events:none}.sidebar.collapsed[_ngcontent-%COMP%]{width:72px;border-radius:0 var(--radius-lg) var(--radius-lg) 0}.sidebar.collapsed[_ngcontent-%COMP%]   .nav-label[_ngcontent-%COMP%], .sidebar.collapsed[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%], .sidebar.collapsed[_ngcontent-%COMP%]   .arrow-icon[_ngcontent-%COMP%]{opacity:0;width:0;pointer-events:none;overflow:hidden}.sidebar.mobile-open[_ngcontent-%COMP%]{transform:translate(0)!important;box-shadow:var(--shadow-xl),0 0 60px var(--accent-glow)}.sidebar-logo[_ngcontent-%COMP%]{height:70px;display:flex;align-items:center;padding:0 18px;border-bottom:1px solid var(--glass-border);flex-shrink:0;position:relative}.sidebar-logo[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:-1px;left:20%;right:20%;height:1px;background:var(--accent-gradient);opacity:.5;border-radius:var(--radius-full)}.logo-link[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;outline:none}.logo-icon[_ngcontent-%COMP%]{width:40px;height:40px;background:var(--accent-gradient);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.25rem;flex-shrink:0;box-shadow:0 4px 16px var(--accent-glow);animation:_ngcontent-%COMP%_pulseGlow 3.5s var(--ease-smooth) infinite;transition:transform var(--duration-base) var(--ease-smooth)}.logo-link[_ngcontent-%COMP%]:hover   .logo-icon[_ngcontent-%COMP%]{transform:scale(1.08) rotate(-4deg)}.logo-text[_ngcontent-%COMP%]{font-family:var(--font-display, "Syne", sans-serif);font-size:1.1875rem;font-weight:800;letter-spacing:-.02em;white-space:nowrap;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;transition:opacity,width var(--duration-base) var(--ease-smooth)}.sidebar-nav[_ngcontent-%COMP%]{flex:1;overflow-y:auto;overflow-x:hidden;padding:14px 10px;scrollbar-width:thin;scrollbar-color:var(--glass-border-strong) transparent}.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar{width:3px}.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:transparent}.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:var(--glass-border-strong);border-radius:var(--radius-full)}.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:var(--accent-primary)}.nav-link[_ngcontent-%COMP%]{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:var(--radius-md);color:var(--text-muted);text-decoration:none;cursor:pointer;border:1px solid transparent;background:transparent;width:100%;font-size:.9rem;font-weight:500;font-family:var(--font-body, inherit);position:relative;overflow:hidden;transition:all var(--duration-fast) var(--ease-smooth);margin-bottom:2px}.nav-link[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%);transform:translate(-100%);transition:transform .45s var(--ease-smooth);pointer-events:none;border-radius:inherit}.nav-link[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--accent-primary) 9%,transparent);color:var(--accent-primary);border-color:color-mix(in srgb,var(--accent-primary) 14%,transparent)}.nav-link[_ngcontent-%COMP%]:hover:after{transform:translate(100%)}.nav-link[_ngcontent-%COMP%]:hover   .nav-icon[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--accent-primary) 14%,transparent);color:var(--accent-primary);transform:scale(1.06)}.nav-link.active[_ngcontent-%COMP%]{background:var(--accent-gradient);color:var(--text-on-accent, #fff);box-shadow:0 4px 20px var(--accent-glow),var(--glass-inner-shadow)}.nav-link.active[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%]{background:#ffffff38;color:inherit;box-shadow:inset 0 1px #ffffff4d}.nav-icon[_ngcontent-%COMP%]{width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-sm);font-size:1.0625rem;flex-shrink:0;background:transparent;transition:all var(--duration-fast) var(--ease-spring)}.nav-label[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;flex:1;text-align:left;transition:opacity,width var(--duration-base) var(--ease-smooth)}.nav-group[_ngcontent-%COMP%]{margin-bottom:2px}.nav-group-toggle[_ngcontent-%COMP%]{justify-content:flex-start}.arrow-icon[_ngcontent-%COMP%]{margin-left:auto;font-size:.6875rem;opacity:.5;flex-shrink:0;transition:transform var(--duration-base) var(--ease-spring)}.nav-group-toggle.expanded[_ngcontent-%COMP%]{color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 7%,transparent)}.nav-group-toggle.expanded[_ngcontent-%COMP%]   .arrow-icon[_ngcontent-%COMP%]{transform:rotate(90deg);opacity:.9}.nav-group-toggle.expanded[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--accent-primary) 14%,transparent);color:var(--accent-primary)}.submenu[_ngcontent-%COMP%]{margin:3px 0 6px 44px;padding-left:14px;border-left:1.5px solid color-mix(in srgb,var(--accent-primary) 30%,transparent);animation:_ngcontent-%COMP%_slideDown var(--duration-base) var(--ease-smooth) both;transform-origin:top}.submenu-link[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:var(--radius-md);color:var(--text-muted);text-decoration:none;font-size:.85rem;position:relative;transition:all var(--duration-fast) var(--ease-smooth)}.submenu-link[_ngcontent-%COMP%]:hover{color:var(--accent-primary);background:color-mix(in srgb,var(--accent-primary) 10%,transparent);padding-left:16px}.submenu-link[_ngcontent-%COMP%]:hover   .submenu-icon[_ngcontent-%COMP%]{color:var(--accent-primary);transform:scale(1.2)}.submenu-link[_ngcontent-%COMP%]:hover   .submenu-arrow[_ngcontent-%COMP%]{opacity:1;transform:translate(0)}.submenu-link.active[_ngcontent-%COMP%]{color:var(--accent-primary);font-weight:600;background:color-mix(in srgb,var(--accent-primary) 12%,transparent)}.submenu-link.active[_ngcontent-%COMP%]   .submenu-icon[_ngcontent-%COMP%]{color:var(--accent-primary)}.submenu-icon[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:18px;height:18px;font-size:.7rem;color:var(--text-muted);transition:all var(--duration-fast) var(--ease-spring)}.submenu-text[_ngcontent-%COMP%]{flex:1}.submenu-arrow[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;font-size:1rem;color:var(--accent-primary);opacity:0;transform:translate(-4px);transition:all var(--duration-fast) var(--ease-smooth)}.sidebar-footer[_ngcontent-%COMP%]{padding:10px;border-top:1px solid var(--glass-border);flex-shrink:0;position:relative}.sidebar-footer[_ngcontent-%COMP%]:before{content:"";position:absolute;top:-1px;left:20%;right:20%;height:1px;background:var(--accent-gradient);opacity:.35;border-radius:var(--radius-full)}.sidebar-footer[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]{color:var(--text-muted);font-size:.8125rem;font-weight:600;letter-spacing:.02em}.sidebar-footer[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover{color:var(--accent-secondary)}.nav-link[_ngcontent-%COMP%]{position:relative}.nav-link[_ngcontent-%COMP%]   .nav-tooltip-title[_ngcontent-%COMP%]{position:absolute;left:calc(100% + 12px);top:50%;transform:translateY(-50%) scale(.9);padding:6px 12px;background:var(--glass-bg-hover);border:1px solid var(--glass-border);border-radius:var(--radius-md);font-size:.8125rem;font-weight:600;color:var(--text-primary);white-space:nowrap;opacity:0;visibility:hidden;pointer-events:none;transition:all var(--duration-fast) var(--ease-smooth);box-shadow:var(--shadow-lg);z-index:1050}.nav-link[_ngcontent-%COMP%]   .nav-tooltip-title[_ngcontent-%COMP%]:before{content:"";position:absolute;left:-5px;top:50%;transform:translateY(-50%);border-width:5px 5px 5px 0;border-style:solid;border-color:transparent var(--glass-border) transparent transparent}.nav-link[_ngcontent-%COMP%]:hover   .nav-tooltip-title[_ngcontent-%COMP%]{opacity:1;visibility:visible;transform:translateY(-50%) scale(1)}.nav-tooltip[_ngcontent-%COMP%]{position:fixed;left:82px;z-index:1060;min-width:220px;border-radius:var(--radius-lg);overflow:hidden;animation:_ngcontent-%COMP%_tooltipIn var(--duration-base) var(--ease-spring) both;background:var(--glass-bg-hover);backdrop-filter:blur(var(--glass-blur-heavy)) saturate(1.8);-webkit-backdrop-filter:blur(var(--glass-blur-heavy)) saturate(1.8);border:1px solid var(--glass-border);box-shadow:var(--shadow-md),var(--glass-inner-shadow)}.nav-tooltip[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(160deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,.04) 50%,transparent 100%);pointer-events:none}.nav-tooltip[_ngcontent-%COMP%]{box-shadow:var(--shadow-xl),0 0 24px var(--accent-glow)}.tooltip-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--glass-border)}.tooltip-header[_ngcontent-%COMP%]   .tooltip-icon[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:var(--radius-md);background:color-mix(in srgb,var(--accent-primary) 15%,transparent);display:flex;align-items:center;justify-content:center}.tooltip-header[_ngcontent-%COMP%]   .tooltip-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1rem;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.tooltip-header[_ngcontent-%COMP%]   .tooltip-title[_ngcontent-%COMP%]{font-family:var(--font-display, "Syne", sans-serif);font-size:.875rem;font-weight:700;letter-spacing:.02em;color:var(--text-primary)}.tooltip-content[_ngcontent-%COMP%]{padding:8px;max-height:280px;overflow-y:auto}.tooltip-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:var(--radius-sm);color:var(--text-secondary);text-decoration:none;font-size:.85rem;transition:all var(--duration-fast) var(--ease-smooth)}.tooltip-item[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--accent-primary) 10%,transparent);color:var(--accent-primary);padding-left:16px}.tooltip-item[_ngcontent-%COMP%]:hover   .tooltip-dot[_ngcontent-%COMP%]{transform:scale(1.3);color:var(--accent-primary)}.tooltip-item[_ngcontent-%COMP%]   .tooltip-dot[_ngcontent-%COMP%]{font-size:6px;color:var(--text-muted);transition:all var(--duration-fast) var(--ease-smooth)}.tooltip-footer[_ngcontent-%COMP%]{padding:10px 12px;border-top:1px solid var(--glass-border);background:color-mix(in srgb,var(--accent-primary) 5%,transparent)}.tooltip-view-all[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:var(--radius-sm);color:var(--accent-primary);text-decoration:none;font-size:.85rem;font-weight:600;transition:all var(--duration-fast) var(--ease-smooth)}.tooltip-view-all[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--accent-primary) 15%,transparent);padding-right:8px}.tooltip-view-all[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%]{transform:translate(4px)}.tooltip-view-all[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{transition:transform var(--duration-fast) var(--ease-smooth)}.sidebar-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background:#00000059;backdrop-filter:blur(6px) saturate(.8);-webkit-backdrop-filter:blur(6px) saturate(.8);z-index:1025;animation:_ngcontent-%COMP%_fade-in var(--duration-base) var(--ease-smooth) both}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0}to{opacity:1}}@media(max-width:991.98px){.sidebar[_ngcontent-%COMP%]{transform:translate(-100%);width:280px!important;border-radius:0 var(--radius-xl) var(--radius-xl) 0;transition:transform var(--duration-slow) var(--ease-spring)}.sidebar.collapsed[_ngcontent-%COMP%]   .nav-label[_ngcontent-%COMP%], .sidebar.collapsed[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]{opacity:1;width:auto;pointer-events:auto;overflow:visible}.sidebar.collapsed[_ngcontent-%COMP%]   .arrow-icon[_ngcontent-%COMP%]{opacity:.5;width:auto}}@media(prefers-reduced-motion:reduce){.logo-icon[_ngcontent-%COMP%]{animation:none}.nav-link[_ngcontent-%COMP%]:after, .submenu[_ngcontent-%COMP%], .nav-tooltip[_ngcontent-%COMP%]{animation:none;transition:none}}'],changeDetection:0})}}return t})();var bt=(()=>{class t{constructor(){this.currentYear=new Date().getFullYear()}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=L({type:t,selectors:[["app-footer"]],decls:16,vars:1,consts:[[1,"footer","py-3","mt-auto"],[1,"container-fluid"],[1,"d-flex","flex-wrap","justify-content-between","align-items-center"],[1,"d-flex","align-items-center","gap-2"],[1,"bi","bi-code-square","text-primary"],[1,"text-muted"],[1,"d-flex","gap-3"],["href","https://github.com/SoumyaSRD/angualr_training","target","_blank",1,"text-muted","text-decoration-none"],[1,"bi","bi-github"],["href","https://www.linkedin.com/in/soumyasrd/","target","_blank",1,"text-muted","text-decoration-none"],[1,"bi","bi-twitter"],[1,"bi","bi-linkedin"],[1,"text-muted","small"]],template:function(n,r){n&1&&(u(0,"footer",0)(1,"div",1)(2,"div",2)(3,"div",3),S(4,"i",4),u(5,"span",5),d(6,"Angular Academy"),m()(),u(7,"div",6)(8,"a",7),S(9,"i",8),m(),u(10,"a",9),S(11,"i",10),m(),u(12,"a",9),S(13,"i",11),m()(),u(14,"div",12),d(15),m()()()()),n&2&&(i(15),R(" \xA9 ",r.currentYear," All rights reserved. "))},dependencies:[z],styles:[".footer[_ngcontent-%COMP%]{background:var(--surface-color);border-top:1px solid var(--border-color)}"]})}}return t})();function Cr(t,o){if(t&1&&(u(0,"div",18),d(1),m()),t&2){let e=p();i(),y(e.emailError())}}function wr(t,o){if(t&1&&(u(0,"div",18),d(1),m()),t&2){let e=p();i(),y(e.passwordError())}}function _r(t,o){if(t&1&&(u(0,"div",29),S(1,"i",31),u(2,"div",32),d(3),m()()),t&2){let e=p();i(3),y(e.loginError())}}function Sr(t,o){t&1&&(S(0,"span",33),d(1," Signing in... "))}function Mr(t,o){t&1&&(S(0,"i",34),d(1," Sign In "))}var Ue=(()=>{class t{constructor(){this.modalService=M(ie),this.authService=M(W),this.themeService=M(Se),this.currentTheme=this.themeService.currentTheme,this.isDarkTheme=this.themeService.isDarkTheme,this.email=b(""),this.password=b(""),this.rememberMe=b(!1),this.hidePassword=b(!0),this.emailTouched=b(!1),this.passwordTouched=b(!1),this.isSubmitting=b(!1),this.loginError=b(null),this.emailError=A(()=>this.email().trim()?null:"Username is required"),this.passwordError=A(()=>{let e=this.password();return e?e.length<6?"Password must be at least 6 characters":null:"Password is required"}),this.isFormValid=A(()=>!this.emailError()&&!this.passwordError()),ce(()=>{let e=this.currentTheme();console.log("[Login] Current theme:",e)})}login(){this.emailTouched.set(!0),this.passwordTouched.set(!0),this.isFormValid()&&(this.isSubmitting.set(!0),this.loginError.set(null),setTimeout(()=>{this.authService.login({username:this.email().trim(),password:this.password()})?this.modalService.closeAll():this.loginError.set("Invalid username or password. Please try again."),this.isSubmitting.set(!1)},1500))}cancel(){this.modalService.closeAll()}handleOverlayClick(e){e.target===e.currentTarget&&this.cancel()}onEmailInput(e){let n=e.target.value;this.email.set(n)}onPasswordInput(e){let n=e.target.value;this.password.set(n)}onHidePasswordToggle(){this.hidePassword.update(e=>!e)}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=L({type:t,selectors:[["app-login-dialog"]],decls:43,vars:18,consts:[[1,"login-overlay",3,"click"],[1,"login-modal"],[1,"login-header"],["type","button","aria-label","Close login dialog",1,"close-button",3,"click"],[1,"bi","bi-x-lg"],[1,"login-body"],[1,"login-brand"],[1,"brand-icon"],[1,"bi","bi-person-lock"],[1,"brand-title"],[1,"brand-subtitle"],[1,"login-form",3,"submit"],[1,"form-group"],["for","email",1,"form-label"],[1,"input-wrapper"],[1,"input-icon"],[1,"bi","bi-person"],["type","text","id","email","placeholder","Enter your username","autocomplete","username",1,"form-input",3,"input","blur","value"],[1,"error-message"],["for","password",1,"form-label"],[1,"bi","bi-lock"],["id","password","placeholder","Enter your password","autocomplete","current-password",1,"form-input",3,"input","blur","type","value"],["type","button",1,"password-toggle",3,"click"],[1,"bi"],[1,"form-options"],[1,"checkbox-group"],["type","checkbox","id","rememberMe",1,"form-checkbox",3,"change","checked"],["for","rememberMe",1,"checkbox-label"],["href","#",1,"forgot-link",3,"click"],["role","alert",1,"alert","alert-error"],["type","submit",1,"submit-button",3,"disabled"],[1,"bi","bi-exclamation-triangle-fill","alert-icon"],[1,"alert-content"],["role","status","aria-hidden","true",1,"spinner"],[1,"bi","bi-box-arrow-in-right","button-icon"]],template:function(n,r){n&1&&(u(0,"div",0),H("click",function(c){return r.handleOverlayClick(c)}),u(1,"div",1)(2,"div",2)(3,"button",3),H("click",function(){return r.cancel()}),S(4,"i",4),m()(),u(5,"div",5)(6,"div",6)(7,"div",7),S(8,"i",8),m(),u(9,"h2",9),d(10,"Welcome Back"),m(),u(11,"p",10),d(12,"Sign in to continue your learning journey"),m()(),u(13,"form",11),H("submit",function(c){return c.preventDefault(),r.login()}),u(14,"div",12)(15,"label",13),d(16,"Username"),m(),u(17,"div",14)(18,"span",15),S(19,"i",16),m(),u(20,"input",17),H("input",function(c){return r.onEmailInput(c)})("blur",function(){return r.emailTouched.set(!0)}),m()(),h(21,Cr,2,1,"div",18),m(),u(22,"div",12)(23,"label",19),d(24,"Password"),m(),u(25,"div",14)(26,"span",15),S(27,"i",20),m(),u(28,"input",21),H("input",function(c){return r.onPasswordInput(c)})("blur",function(){return r.passwordTouched.set(!0)}),m(),u(29,"button",22),H("click",function(){return r.onHidePasswordToggle()}),S(30,"i",23),m()(),h(31,wr,2,1,"div",18),m(),u(32,"div",24)(33,"div",25)(34,"input",26),H("change",function(c){return r.rememberMe.set(c.target.checked)}),m(),u(35,"label",27),d(36,"Remember me"),m()(),u(37,"a",28),H("click",function(c){return c.preventDefault()}),d(38,"Forgot password?"),m()(),h(39,_r,4,1,"div",29),u(40,"button",30),h(41,Sr,2,0)(42,Mr,2,0),m()()()()()),n&2&&(i(20),P("input-error",r.emailError()&&r.emailTouched()),re("value",r.email()),i(),f(r.emailError()&&r.emailTouched()?21:-1),i(7),P("input-error",r.passwordError()&&r.passwordTouched()),re("type",r.hidePassword()?"password":"text")("value",r.password()),i(),Q("aria-label",r.hidePassword()?"Show password":"Hide password"),i(),P("bi-eye-slash",r.hidePassword())("bi-eye",!r.hidePassword()),i(),f(r.passwordError()&&r.passwordTouched()?31:-1),i(3),re("checked",r.rememberMe()),i(5),f(r.loginError()?39:-1),i(),re("disabled",!r.isFormValid()||r.isSubmitting()),i(),f(r.isSubmitting()?41:42))},dependencies:[z],styles:['[_nghost-%COMP%]{display:block;width:100%;height:100%}.login-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background:color-mix(in srgb,var(--bg-primary, #f8fafc) 85%,transparent);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:var(--space-md, 16px);z-index:1050;animation:_ngcontent-%COMP%_fadeIn .3s var(--ease-smooth, cubic-bezier(.4, 0, .2, 1))}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}.login-modal[_ngcontent-%COMP%]{width:100%;max-width:420px;border-radius:var(--radius-xl, 28px);background:var(--glass-bg, rgba(255, 255, 255, .55));-webkit-backdrop-filter:blur(var(--glass-blur, 20px));backdrop-filter:blur(var(--glass-blur, 20px));border:1px solid var(--glass-border, rgba(255, 255, 255, .5));box-shadow:var(--elev-4, 0 16px 40px rgba(0,0,0,.12)),var(--glass-inner-shadow, inset 0 1px 0 rgba(255,255,255,.6));overflow:hidden;transform:translateY(0);transition:all .4s var(--ease-spring, cubic-bezier(.175, .885, .32, 1.275));animation:_ngcontent-%COMP%_slideUp .4s var(--ease-spring)}@keyframes _ngcontent-%COMP%_slideUp{0%{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}.login-modal[_ngcontent-%COMP%]:hover{transform:translateY(-4px);box-shadow:var(--elev-5, 0 28px 64px rgba(0,0,0,.16))}.login-header[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding:var(--space-md, 16px)}.close-button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--radius-full, 9999px);border:none;background:var(--glass-bg-deep, rgba(255, 255, 255, .25));color:var(--text-muted, #94a3b8);cursor:pointer;transition:all .2s var(--ease-smooth);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.close-button[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover, rgba(255, 255, 255, .8));color:var(--text-primary, #0f172a);transform:rotate(90deg) scale(1.1);box-shadow:var(--shadow-sm, 0 2px 8px rgba(0,0,0,.06))}.login-body[_ngcontent-%COMP%]{padding:var(--space-xl, 40px) var(--space-lg, 24px) var(--space-lg, 24px)}.login-brand[_ngcontent-%COMP%]{text-align:center;margin-bottom:var(--space-xl, 40px)}.brand-icon[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:var(--radius-full, 9999px);background:var(--accent-gradient, linear-gradient(135deg, #6366f1, #8b5cf6));margin-bottom:var(--space-md, 16px);box-shadow:var(--shadow-md, 0 8px 24px rgba(0,0,0,.08));position:relative;overflow:hidden}.brand-icon[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;background:var(--glass-refract-light, rgba(255,255,255,.55));opacity:.7;transform:rotate(45deg) translate(-20%)}.brand-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:var(--type-xl, 1.5rem);color:var(--text-on-accent, white);position:relative;z-index:1}.brand-title[_ngcontent-%COMP%]{font-size:var(--type-2xl, 2rem);font-weight:700;color:var(--text-primary, #0f172a);margin:0 0 var(--space-xs, 4px);letter-spacing:var(--type-tracking-tight, -.03em)}.brand-subtitle[_ngcontent-%COMP%]{font-size:var(--type-base, 1rem);color:var(--text-secondary, #475569);margin:0;line-height:var(--type-leading-snug, 1.25)}.login-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--space-lg, 24px)}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--space-xs, 4px)}.form-label[_ngcontent-%COMP%]{font-size:var(--type-sm, .875rem);font-weight:600;color:var(--text-primary, #0f172a);letter-spacing:var(--type-tracking-wide, .04em)}.input-wrapper[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center}.input-icon[_ngcontent-%COMP%]{position:absolute;left:var(--space-md, 16px);display:flex;align-items:center;color:var(--text-muted, #94a3b8);z-index:2;font-size:var(--type-base, 1rem)}.form-input[_ngcontent-%COMP%]{width:100%;padding:var(--space-md, 16px) var(--space-md, 16px) var(--space-md, 16px) var(--space-2xl, 64px);border-radius:var(--radius-lg, 20px);border:1px solid var(--glass-border, rgba(255, 255, 255, .5));background:var(--glass-bg, rgba(255, 255, 255, .55));color:var(--text-primary, #0f172a);font-size:var(--type-base, 1rem);font-family:var(--font-body, "DM Sans", sans-serif);-webkit-backdrop-filter:blur(var(--glass-blur, 20px));backdrop-filter:blur(var(--glass-blur, 20px));transition:all .2s var(--ease-smooth);box-shadow:var(--glass-inner-shadow)}.form-input[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--accent-primary, #6366f1);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent-primary, #6366f1) 15%,transparent),var(--glass-inner-shadow);background:var(--glass-bg-hover, rgba(255, 255, 255, .8));transform:translateY(-1px)}.form-input.input-error[_ngcontent-%COMP%]{border-color:var(--error, #ef4444);box-shadow:0 0 0 3px color-mix(in srgb,var(--error, #ef4444) 15%,transparent),var(--glass-inner-shadow)}.form-input[_ngcontent-%COMP%]::placeholder{color:var(--text-muted, #94a3b8)}.password-toggle[_ngcontent-%COMP%]{position:absolute;right:var(--space-sm, 8px);display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:var(--radius-md, 12px);border:none;background:var(--glass-bg-deep, rgba(255, 255, 255, .25));color:var(--text-muted, #94a3b8);cursor:pointer;transition:all .2s var(--ease-smooth);z-index:2;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.password-toggle[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover, rgba(255, 255, 255, .8));color:var(--text-primary, #0f172a);transform:scale(1.05)}.error-message[_ngcontent-%COMP%]{font-size:var(--type-sm, .875rem);color:var(--error, #ef4444);margin-top:var(--space-xs, 4px);display:flex;align-items:center;gap:var(--space-xs, 4px)}.error-message[_ngcontent-%COMP%]:before{content:"\\26a0";font-size:.8em}.form-options[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:var(--space-sm, 8px) 0}.checkbox-group[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--space-xs, 4px)}.form-checkbox[_ngcontent-%COMP%]{width:18px;height:18px;border-radius:var(--radius-sm, 8px);border:1px solid var(--glass-border, rgba(255, 255, 255, .5));background:var(--glass-bg, rgba(255, 255, 255, .55));accent-color:var(--accent-primary, #6366f1);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.form-checkbox[_ngcontent-%COMP%]:checked{background:var(--accent-primary, #6366f1);border-color:var(--accent-primary, #6366f1)}.checkbox-label[_ngcontent-%COMP%]{font-size:var(--type-sm, .875rem);color:var(--text-secondary, #475569);cursor:pointer;-webkit-user-select:none;user-select:none}.forgot-link[_ngcontent-%COMP%]{font-size:var(--type-sm, .875rem);color:var(--accent-primary, #6366f1);text-decoration:none;transition:all .2s var(--ease-smooth);font-weight:500}.forgot-link[_ngcontent-%COMP%]:hover{color:var(--accent-secondary, #8b5cf6);text-decoration:underline;transform:translateY(-1px)}.alert[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:var(--space-sm, 8px);padding:var(--space-md, 16px);border-radius:var(--radius-lg, 20px);background:var(--error-bg, rgba(239, 68, 68, .12));border:1px solid color-mix(in srgb,var(--error, #ef4444) 30%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.alert-icon[_ngcontent-%COMP%]{color:var(--error, #ef4444);font-size:1.125rem;margin-top:2px;flex-shrink:0}.alert-content[_ngcontent-%COMP%]{color:var(--error, #ef4444);font-size:var(--type-sm, .875rem);line-height:var(--type-leading-snug, 1.25)}.submit-button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:var(--space-sm, 8px);width:100%;padding:var(--space-md, 16px);border-radius:var(--radius-lg, 20px);border:none;background:var(--accent-gradient, linear-gradient(135deg, #6366f1, #8b5cf6));color:var(--text-on-accent, white);font-size:var(--type-base, 1rem);font-weight:600;font-family:var(--font-body, "DM Sans", sans-serif);cursor:pointer;transition:all .3s var(--ease-spring);box-shadow:var(--shadow-md, 0 8px 24px rgba(0,0,0,.08)),0 0 0 1px #ffffff1a;position:relative;overflow:hidden}.submit-button[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;background:linear-gradient(145deg,rgba(255,255,255,.3) 0%,transparent 50%,rgba(0,0,0,.1) 100%);opacity:0;transition:opacity .3s ease}.submit-button[_ngcontent-%COMP%]:hover:not(:disabled){transform:translateY(-2px) scale(1.02);box-shadow:var(--shadow-lg, 0 20px 40px rgba(0,0,0,.1)),var(--shadow-glow, 0 0 0 1px rgba(99,102,241,.3), 0 8px 32px rgba(99,102,241,.3))}.submit-button[_ngcontent-%COMP%]:hover:not(:disabled):before{opacity:1}.submit-button[_ngcontent-%COMP%]:active:not(:disabled){transform:translateY(0) scale(.98)}.submit-button[_ngcontent-%COMP%]:disabled{opacity:.7;cursor:not-allowed;transform:none;box-shadow:var(--shadow-sm, 0 2px 8px rgba(0,0,0,.06))}.button-icon[_ngcontent-%COMP%]{font-size:1.125rem}.spinner[_ngcontent-%COMP%]{width:1.25rem;height:1.25rem;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}@media(max-width:576px){.login-overlay[_ngcontent-%COMP%]{padding:var(--space-sm, 8px)}.login-body[_ngcontent-%COMP%]{padding:var(--space-lg, 24px) var(--space-md, 16px)}.brand-title[_ngcontent-%COMP%]{font-size:var(--type-xl, 1.5rem)}}@media(prefers-color-scheme:dark){.form-input[_ngcontent-%COMP%]{background:var(--glass-bg-deep, rgba(255, 255, 255, .25))}.form-input[_ngcontent-%COMP%]:focus{background:var(--glass-bg-hover, rgba(255, 255, 255, .8))}}']})}}return t})();var Pr=(()=>{class t{transform(e,n,r=[]){if(!e)return[];if(!n)return e;let a=n.toLowerCase();return r.length===0?e.filter(c=>JSON.stringify(c).toLowerCase().includes(a)):e.filter(c=>r.some(v=>{let _=c[v];return _!=null&&String(_).toLowerCase().includes(a)}))}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275pipe=Jt({name:"customFilter",type:t,pure:!1})}}return t})();var Tr=(()=>{class t{constructor(){this.templateRef=M($t),this.viewContainer=M(Wt),this.authService=M(W),this.hasView=!1}set appVisibleIf(e){let n=typeof e=="string"?this.authService.hasRole(e):!!e;n&&!this.hasView?(this.viewContainer.createEmbeddedView(this.templateRef),this.hasView=!0):!n&&this.hasView&&(this.viewContainer.clear(),this.hasView=!1)}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275dir=X({type:t,selectors:[["","appVisibleIf",""]],inputs:{appVisibleIf:"appVisibleIf"}})}}return t})();var kn=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,n){this._renderer=e,this._elementRef=n}setProperty(e,n){this._renderer.setProperty(this._elementRef.nativeElement,e,n)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(n){return new(n||t)(B(Xe),B(Ke))};static \u0275dir=X({type:t})}return t})(),En=(()=>{class t extends kn{static \u0275fac=(()=>{let e;return function(r){return(e||(e=Je(t)))(r||t)}})();static \u0275dir=X({type:t,features:[pe]})}return t})(),St=new le(""),Ar={provide:St,useExisting:Re(()=>kr),multi:!0},kr=(()=>{class t extends En{writeValue(e){this.setProperty("checked",e)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Je(t)))(r||t)}})();static \u0275dir=X({type:t,selectors:[["input","type","checkbox","formControlName",""],["input","type","checkbox","formControl",""],["input","type","checkbox","ngModel",""]],hostBindings:function(n,r){n&1&&x("change",function(c){return r.onChange(c.target.checked)})("blur",function(){return r.onTouched()})},standalone:!1,features:[Ve([Ar]),pe]})}return t})(),Er={provide:St,useExisting:Re(()=>ze),multi:!0};function Or(){let t=rt()?rt().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var Ir=new le(""),ze=(()=>{class t extends kn{_compositionMode;_composing=!1;constructor(e,n,r){super(e,n),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!Or())}writeValue(e){let n=e??"";this.setProperty("value",n)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(n){return new(n||t)(B(Xe),B(Ke),B(Ir,8))};static \u0275dir=X({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(n,r){n&1&&x("input",function(c){return r._handleInput(c.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(c){return r._compositionEnd(c.target.value)})},standalone:!1,features:[Ve([Er]),pe]})}return t})();var Dr=new le(""),Rr=new le("");function On(t){return t!=null}function In(t){return Yt(t)?It(t):t}function Dn(t){let o={};return t.forEach(e=>{o=e!=null?D(D({},o),e):o}),Object.keys(o).length===0?null:o}function Rn(t,o){return o.map(e=>e(t))}function Fr(t){return!t.validate}function Fn(t){return t.map(o=>Fr(o)?o:e=>o.validate(e))}function Vr(t){if(!t)return null;let o=t.filter(On);return o.length==0?null:function(e){return Dn(Rn(e,o))}}function Vn(t){return t!=null?Vr(Fn(t)):null}function Ur(t){if(!t)return null;let o=t.filter(On);return o.length==0?null:function(e){let n=Rn(e,o).map(In);return Rt(n).pipe(De(Dn))}}function Un(t){return t!=null?Ur(Fn(t)):null}function wn(t,o){return t===null?[o]:Array.isArray(t)?[...t,o]:[t,o]}function Nr(t){return t._rawValidators}function jr(t){return t._rawAsyncValidators}function yt(t){return t?Array.isArray(t)?t:[t]:[]}function je(t,o){return Array.isArray(t)?t.includes(o):t===o}function _n(t,o){let e=yt(o);return yt(t).forEach(r=>{je(e,r)||e.push(r)}),e}function Sn(t,o){return yt(o).filter(e=>!je(t,e))}var Le=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(o){this._rawValidators=o||[],this._composedValidatorFn=Vn(this._rawValidators)}_setAsyncValidators(o){this._rawAsyncValidators=o||[],this._composedAsyncValidatorFn=Un(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(o){this._onDestroyCallbacks.push(o)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(o=>o()),this._onDestroyCallbacks=[]}reset(o=void 0){this.control?.reset(o)}hasError(o,e){return this.control?this.control.hasError(o,e):!1}getError(o,e){return this.control?this.control.getError(o,e):null}},xt=class extends Le{name;get formDirective(){return null}get path(){return null}},Oe=class extends Le{_parent=null;name=null;valueAccessor=null},Ct=class{_cd;constructor(o){this._cd=o}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Nn=(()=>{class t extends Ct{constructor(e){super(e)}static \u0275fac=function(n){return new(n||t)(B(Oe,2))};static \u0275dir=X({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,r){n&2&&P("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[pe]})}return t})();var Te="VALID",Ne="INVALID",ve="PENDING",Ae="DISABLED",ae=class{},He=class extends ae{value;source;constructor(o,e){super(),this.value=o,this.source=e}},ke=class extends ae{pristine;source;constructor(o,e){super(),this.pristine=o,this.source=e}},Ee=class extends ae{touched;source;constructor(o,e){super(),this.touched=o,this.source=e}},be=class extends ae{status;source;constructor(o,e){super(),this.status=o,this.source=e}};var wt=class extends ae{source;constructor(o){super(),this.source=o}};function Lr(t){return(Be(t)?t.validators:t)||null}function Hr(t){return Array.isArray(t)?Vn(t):t||null}function zr(t,o){return(Be(o)?o.asyncValidators:t)||null}function Br(t){return Array.isArray(t)?Un(t):t||null}function Be(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}var _t=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(o,e){this._assignValidators(o),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(o){this._rawValidators=this._composedValidatorFn=o}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(o){this._rawAsyncValidators=this._composedAsyncValidatorFn=o}get parent(){return this._parent}get status(){return oe(this.statusReactive)}set status(o){oe(()=>this.statusReactive.set(o))}_status=A(()=>this.statusReactive());statusReactive=b(void 0);get valid(){return this.status===Te}get invalid(){return this.status===Ne}get pending(){return this.status===ve}get disabled(){return this.status===Ae}get enabled(){return this.status!==Ae}errors;get pristine(){return oe(this.pristineReactive)}set pristine(o){oe(()=>this.pristineReactive.set(o))}_pristine=A(()=>this.pristineReactive());pristineReactive=b(!0);get dirty(){return!this.pristine}get touched(){return oe(this.touchedReactive)}set touched(o){oe(()=>this.touchedReactive.set(o))}_touched=A(()=>this.touchedReactive());touchedReactive=b(!1);get untouched(){return!this.touched}_events=new Ot;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(o){this._assignValidators(o)}setAsyncValidators(o){this._assignAsyncValidators(o)}addValidators(o){this.setValidators(_n(o,this._rawValidators))}addAsyncValidators(o){this.setAsyncValidators(_n(o,this._rawAsyncValidators))}removeValidators(o){this.setValidators(Sn(o,this._rawValidators))}removeAsyncValidators(o){this.setAsyncValidators(Sn(o,this._rawAsyncValidators))}hasValidator(o){return je(this._rawValidators,o)}hasAsyncValidator(o){return je(this._rawAsyncValidators,o)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(o={}){let e=this.touched===!1;this.touched=!0;let n=o.sourceControl??this;o.onlySelf||this._parent?.markAsTouched(V(D({},o),{sourceControl:n})),e&&o.emitEvent!==!1&&this._events.next(new Ee(!0,n))}markAllAsDirty(o={}){this.markAsDirty({onlySelf:!0,emitEvent:o.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(o))}markAllAsTouched(o={}){this.markAsTouched({onlySelf:!0,emitEvent:o.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(o))}markAsUntouched(o={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=o.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:o.emitEvent,sourceControl:n})}),o.onlySelf||this._parent?._updateTouched(o,n),e&&o.emitEvent!==!1&&this._events.next(new Ee(!1,n))}markAsDirty(o={}){let e=this.pristine===!0;this.pristine=!1;let n=o.sourceControl??this;o.onlySelf||this._parent?.markAsDirty(V(D({},o),{sourceControl:n})),e&&o.emitEvent!==!1&&this._events.next(new ke(!1,n))}markAsPristine(o={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=o.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:o.emitEvent})}),o.onlySelf||this._parent?._updatePristine(o,n),e&&o.emitEvent!==!1&&this._events.next(new ke(!0,n))}markAsPending(o={}){this.status=ve;let e=o.sourceControl??this;o.emitEvent!==!1&&(this._events.next(new be(this.status,e)),this.statusChanges.emit(this.status)),o.onlySelf||this._parent?.markAsPending(V(D({},o),{sourceControl:e}))}disable(o={}){let e=this._parentMarkedDirty(o.onlySelf);this.status=Ae,this.errors=null,this._forEachChild(r=>{r.disable(V(D({},o),{onlySelf:!0}))}),this._updateValue();let n=o.sourceControl??this;o.emitEvent!==!1&&(this._events.next(new He(this.value,n)),this._events.next(new be(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(V(D({},o),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(o={}){let e=this._parentMarkedDirty(o.onlySelf);this.status=Te,this._forEachChild(n=>{n.enable(V(D({},o),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:o.emitEvent}),this._updateAncestors(V(D({},o),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(o,e){o.onlySelf||(this._parent?.updateValueAndValidity(o),o.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(o){this._parent=o}getRawValue(){return this.value}updateValueAndValidity(o={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Te||this.status===ve)&&this._runAsyncValidator(n,o.emitEvent)}let e=o.sourceControl??this;o.emitEvent!==!1&&(this._events.next(new He(this.value,e)),this._events.next(new be(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),o.onlySelf||this._parent?.updateValueAndValidity(V(D({},o),{sourceControl:e}))}_updateTreeValidity(o={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(o)),this.updateValueAndValidity({onlySelf:!0,emitEvent:o.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ae:Te}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(o,e){if(this.asyncValidator){this.status=ve,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:o!==!1};let n=In(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:o})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let o=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,o}return!1}setErrors(o,e={}){this.errors=o,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(o){let e=o;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((n,r)=>n&&n._find(r),this)}getError(o,e){let n=e?this.get(e):this;return n?.errors?n.errors[o]:null}hasError(o,e){return!!this.getError(o,e)}get root(){let o=this;for(;o._parent;)o=o._parent;return o}_updateControlsErrors(o,e,n){this.status=this._calculateStatus(),o&&this.statusChanges.emit(this.status),(o||n)&&this._events.next(new be(this.status,e)),this._parent&&this._parent._updateControlsErrors(o,e,n)}_initObservables(){this.valueChanges=new Fe,this.statusChanges=new Fe}_calculateStatus(){return this._allControlsDisabled()?Ae:this.errors?Ne:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(ve)?ve:this._anyControlsHaveStatus(Ne)?Ne:Te}_anyControlsHaveStatus(o){return this._anyControls(e=>e.status===o)}_anyControlsDirty(){return this._anyControls(o=>o.dirty)}_anyControlsTouched(){return this._anyControls(o=>o.touched)}_updatePristine(o,e){let n=!this._anyControlsDirty(),r=this.pristine!==n;this.pristine=n,o.onlySelf||this._parent?._updatePristine(o,e),r&&this._events.next(new ke(this.pristine,e))}_updateTouched(o={},e){this.touched=this._anyControlsTouched(),this._events.next(new Ee(this.touched,e)),o.onlySelf||this._parent?._updateTouched(o,e)}_onDisabledChange=[];_registerOnCollectionChange(o){this._onCollectionChange=o}_setUpdateStrategy(o){Be(o)&&o.updateOn!=null&&(this._updateOn=o.updateOn)}_parentMarkedDirty(o){return!o&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(o){return null}_assignValidators(o){this._rawValidators=Array.isArray(o)?o.slice():o,this._composedValidatorFn=Hr(this._rawValidators)}_assignAsyncValidators(o){this._rawAsyncValidators=Array.isArray(o)?o.slice():o,this._composedAsyncValidatorFn=Br(this._rawAsyncValidators)}};var jn=new le("",{factory:()=>Mt}),Mt="always";function qr(t,o){return[...o.path,t]}function Gr(t,o,e=Mt){Wr(t,o),o.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&o.valueAccessor.setDisabledState?.(t.disabled),Jr(t,o),Yr(t,o),Kr(t,o),$r(t,o)}function Mn(t,o){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(o)})}function $r(t,o){if(o.valueAccessor.setDisabledState){let e=n=>{o.valueAccessor.setDisabledState(n)};t.registerOnDisabledChange(e),o._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function Wr(t,o){let e=Nr(t);o.validator!==null?t.setValidators(wn(e,o.validator)):typeof e=="function"&&t.setValidators([e]);let n=jr(t);o.asyncValidator!==null?t.setAsyncValidators(wn(n,o.asyncValidator)):typeof n=="function"&&t.setAsyncValidators([n]);let r=()=>t.updateValueAndValidity();Mn(o._rawValidators,r),Mn(o._rawAsyncValidators,r)}function Jr(t,o){o.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&Ln(t,o)})}function Kr(t,o){o.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&Ln(t,o),t.updateOn!=="submit"&&t.markAsTouched()})}function Ln(t,o){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),o.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function Yr(t,o){let e=(n,r)=>{o.valueAccessor.writeValue(n),r&&o.viewToModelUpdate(n)};t.registerOnChange(e),o._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function Xr(t,o){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(o,e.currentValue)}function Qr(t){return Object.getPrototypeOf(t.constructor)===En}function Zr(t,o){if(!o)return null;Array.isArray(o);let e,n,r;return o.forEach(a=>{a.constructor===ze?e=a:Qr(a)?n=a:r=a}),r||n||e||null}function Pn(t,o){let e=t.indexOf(o);e>-1&&t.splice(e,1)}function Tn(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var eo=class extends _t{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(o=null,e,n){super(Lr(e),zr(n,e)),this._applyFormState(o),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Be(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Tn(o)?this.defaultValue=o.value:this.defaultValue=o)}setValue(o,e={}){this.value=this._pendingValue=o,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(o,e={}){this.setValue(o,e)}reset(o=this.defaultValue,e={}){this._applyFormState(o),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new wt(this))}_updateValue(){}_anyControls(o){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(o){this._onChange.push(o)}_unregisterOnChange(o){Pn(this._onChange,o)}registerOnDisabledChange(o){this._onDisabledChange.push(o)}_unregisterOnDisabledChange(o){Pn(this._onDisabledChange,o)}_forEachChild(o){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(o){Tn(o)?(this.value=this._pendingValue=o.value,o.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=o}};var to={provide:Oe,useExisting:Re(()=>Pt)},An=Promise.resolve(),Pt=(()=>{class t extends Oe{_changeDetectorRef;callSetDisabledState;control=new eo;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new Fe;constructor(e,n,r,a,c,v){super(),this._changeDetectorRef=c,this.callSetDisabledState=v,this._parent=e,this._setValidators(n),this._setAsyncValidators(r),this.valueAccessor=Zr(this,a)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let n=e.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),Xr(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){Gr(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){An.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let n=e.isDisabled.currentValue,r=n!==0&&mn(n);An.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?qr(e,this._parent):[e]}static \u0275fac=function(n){return new(n||t)(B(xt,9),B(Dr,10),B(Rr,10),B(St,10),B(un,8),B(jn,8))};static \u0275dir=X({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[Ve([to]),pe,qt]})}return t})();var no=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=Qe({type:t});static \u0275inj=$e({})}return t})();var Hn=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:jn,useValue:e.callSetDisabledState??Mt}]}}static \u0275fac=function(n){return new(n||t)};static \u0275mod=Qe({type:t});static \u0275inj=$e({imports:[no]})}return t})();function qe(t,o){return{id:`msg-${Date.now()}-${Math.random().toString(36).substring(2,9)}`,text:t,sender:"bot",contents:o,timestamp:new Date}}function zn(t){return{id:`msg-${Date.now()}-${Math.random().toString(36).substring(2,9)}`,text:t,sender:"user",timestamp:new Date}}var Tt={};Wn(Tt,{ALL_MODULES:()=>oo,ANGULAR_ARCHITECTURE_OVERVIEW:()=>uo,ANGULAR_CLI_OVERVIEW:()=>ho,ANGULAR_DATA_BINDING_GUIDE:()=>vo,ANGULAR_INTRODUCTION_TUTORIAL:()=>ao,ARCHITECTURE_PATTERNS:()=>go,ARCHITECTURE_VISUALIZATION:()=>mo,AngularIntroduction:()=>io,BrowserPrerequisites:()=>Fo,COMMON_SCENARIOS:()=>Oo,COMPARISON_TABLE:()=>ko,COMPONENT:()=>fo,Cors:()=>ot,DECORATOR:()=>bo,DIRECTIVE:()=>xo,DI_SERVICE:()=>yo,FORMS_MODULE_DEEP_DIVE:()=>Co,FORM_VALIDATION_COMPLETE:()=>wo,FRAMEWORK_COMPARISON:()=>so,FRAMEWORK_DECISION_GUIDE:()=>co,FRAMEWORK_FUTURE_TRENDS:()=>po,FRAMEWORK_PERSONALITIES:()=>lo,GENERIC_TOPIC_DATA:()=>ut,GUARD:()=>_o,GenerateContent:()=>mt,HttpPrerequisites:()=>Vo,INTERCEPTOR:()=>To,LAZY_MODULES:()=>So,MODULE_STANDALONE:()=>Mo,NODEJS_VS_NPM:()=>Ao,OBSERVABLE_PROMISE:()=>Do,PIPE:()=>Ro,REACTIVE_FORMS_MODULE_DEEP_DIVE:()=>Uo,ROUTING:()=>No,RXJS_FLATTENING:()=>jo,RXJS_OPERATOR:()=>Lo,RXJS_SUBJECT:()=>Ho,RestApi:()=>st,SERVICE_EG:()=>zo,SETUP_GUIDE:()=>Eo,STANDALONE:()=>qo,StandAloneExample:()=>Bo,TROUBLESHOOTING:()=>Io,TypeScriptClasses:()=>lt,TypeScriptDataTypes:()=>it,TypeScriptEnums:()=>ct,TypeScriptInterfaces:()=>at,TypeScriptVsJavaScript:()=>dt,WebFundamental:()=>pt,_HTTP_CLIENT:()=>Po});var oo={title:"Angular Modules: Root, Feature, Shared, and Core",tags:["Angular","Modules","Architecture","Best Practices"],paragraphs:["In Angular, modules are a fundamental part of the application's architecture. They help organize code, manage dependencies, and enable lazy loading for better performance. This content explores the four key types of modules: Root, Feature, Shared, and Core."],keyPoints:["Root Module: The main module that bootstraps the Angular application.","Feature Modules: Encapsulate specific features or functionalities.","Shared Modules: Contain reusable components, directives, and pipes.","Core Modules: House singleton services and application-wide components."],sections:[{id:"root-module",heading:"Root Module",content:"The Root Module, typically named AppModule, is the entry point of an Angular application. It is responsible for bootstrapping the root component (usually AppComponent) and declaring the application's top-level dependencies.",list:["Defined in app.module.ts","Imports BrowserModule for browser-specific services","Bootstraps the application using Angular's bootstrapModule function"],additionalExplanation:"The Root Module should be kept lightweight, focusing only on application-level configurations."},{id:"feature-modules",heading:"Feature Modules",content:"Feature Modules organize code related to a specific feature or domain, such as user management or product catalog. They promote modularity and can be lazy-loaded to improve initial load times.",list:["Encapsulate components, services, and routes for a feature","Imported into the Root Module or other modules as needed","Support lazy loading via Angular's routing module"],additionalExplanation:"Using Feature Modules helps in scaling large applications by dividing them into manageable parts."},{id:"shared-modules",heading:"Shared Modules",content:"Shared Modules contain components, directives, and pipes that are used across multiple Feature Modules. They prevent code duplication by exporting reusable elements.",list:["Exports common UI components like buttons or forms","Imported by Feature Modules that need the shared elements","Does not include services to avoid multiple instances"],additionalExplanation:"Services should not be provided in Shared Modules; instead, use Core Modules for singleton services."},{id:"core-modules",heading:"Core Modules",content:"Core Modules are designed for application-wide singleton services, guards, interceptors, and components that are used only once, such as headers or footers.",list:["Imported only once in the Root Module","Provides services with providedIn: 'root' or in the module's providers array","Ensures single instances of services throughout the app"],additionalExplanation:"Loading the Core Module eagerly ensures that singleton services are available from the start."}],codeExamples:[{title:"Root Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }`,description:"This is a basic example of the AppModule, importing necessary modules and bootstrapping the app."},{title:"Feature Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule]
})
export class UserModule { }`,description:"A simple Feature Module for user-related functionality."},{title:"Shared Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './custom-button.component';

@NgModule({
  declarations: [CustomButtonComponent],
  imports: [CommonModule],
  exports: [CustomButtonComponent]
})
export class SharedModule { }`,description:"Exports a reusable button component for use in other modules."},{title:"Core Module Example",language:"typescript",code:`import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}`,description:"Provides singleton services and guards against multiple imports."}],bestPractices:["Keep the Root Module clean and import other modules as needed.","Use lazy loading for Feature Modules to optimize performance.","Export only what's necessary from Shared Modules.","Ensure Core Modules are imported only once to maintain singletons.","Follow the SCAM (Single Component Angular Module) pattern where appropriate for better tree-shaking."]};var io={title:"Introduction to Angular",tags:["Angular","Framework","TypeScript","Standalone","Components","Modern Web"],paragraphs:["Angular is a full-featured, open-source front-end framework developed and maintained by Google. First released in 2010 as AngularJS and completely rewritten in 2016 as Angular (version 2+), it has evolved into one of the most powerful platforms for building scalable, enterprise-grade single-page applications (SPAs), progressive web apps (PWAs), and even desktop/mobile apps via Electron or NativeScript.",'Unlike lightweight libraries like React or Vue, Angular is a complete framework that provides everything you need out of the box: a component-based architecture, dependency injection, reactive templating, powerful routing, state management tools, forms handling, HTTP client, internationalization, testing utilities, and a robust CLI for scaffolding and builds. This "batteries-included" approach reduces decision fatigue and ensures consistency across large teams.',"Since Angular 14 (2022), the framework has shifted toward standalone components as the default and recommended pattern. Standalone components are self-contained\u2014no need for NgModules\u2014making code simpler, more tree-shakable, and easier to lazy-load. By Angular 17+ (current as of 2026), most new projects use standalone APIs exclusively, with NgModules retained only for backward compatibility.","Angular is built entirely on TypeScript, leveraging its static typing for better developer experience, early error detection, and superior IDE support. Combined with decorators, RxJS observables, and Ahead-of-Time (AOT) compilation, Angular delivers high performance, excellent maintainability, and long-term support (Google commits to LTS for 18 months per major version)."],sections:[{heading:"Why Choose Angular?",content:"Angular stands out for large-scale applications due to its opinionated structure and comprehensive tooling:",list:["<strong>Full Framework:</strong> Built-in solutions for routing, forms, HTTP, animations, and more\u2014no need to choose third-party libraries","<strong>Dependency Injection:</strong> Powerful hierarchical DI system for services and testability","<strong>Reactive Programming:</strong> First-class RxJS support for handling asynchronous data streams","<strong>CLI Powerhouse:</strong> ng generate, build, test, deploy\u2014all streamlined","<strong>Enterprise Ready:</strong> Excellent for complex apps with authentication, state management, accessibility, and internationalization","<strong>Strong Typing:</strong> TypeScript ensures robust code in large teams","<strong>Performance:</strong> Ivy renderer, AOT compilation, lazy loading, and change detection optimization"]},{heading:"Standalone Components: The Modern Default",content:"Standalone components (introduced in Angular 14) eliminate NgModules for most use cases. They declare their own dependencies via the imports array:",list:["<strong>Simpler:</strong> No separate module files","<strong>Tree-shakable:</strong> Better bundle sizes","<strong>Lazy-loadable:</strong> Easy route-level lazy loading","<strong>Flexible:</strong> Can still import NgModules when needed (e.g., legacy libraries)"],additionalExplanation:"Most Angular Material modules, forms, and common modules are now standalone-compatible."},{heading:"Bootstrapping an Angular Application",content:"Modern Angular apps bootstrap directly with bootstrapApplication() instead of NgModule-based main.ts:",list:["<strong>Providers:</strong> Configure router, HTTP client, animations, interceptors globally","<strong>Environment:</strong> Inject environment variables or feature flags","<strong>Error Handling:</strong> Centralized error catching"]},{heading:"Key Building Blocks",content:"Angular applications are composed of:",list:["<strong>Components:</strong> UI building blocks with templates and logic","<strong>Services:</strong> Singleton or scoped providers for business logic and data","<strong>Pipes:</strong> Transform displayed values (e.g., date, currency)","<strong>Directives:</strong> Custom behavior (structural like *ngIf, attribute like ngClass)","<strong>Routing:</strong> Deep linking and lazy loading with Angular Router","<strong>Forms:</strong> Template-driven or reactive forms with validation"]},{heading:"NgModule vs Standalone: Migration Path",content:"While NgModules are still supported, standalone is the future:",list:["<strong>Legacy (NgModule):</strong> Declarations, imports, exports, providers in module files","<strong>Modern (Standalone):</strong> Everything in component imports array","<strong>Migration:</strong> Use ng generate @angular/core:standalone to convert gradually"]}],codeExamples:[{title:"Basic Standalone Component",language:"typescript",description:"A simple counter component demonstrating two-way binding and event handling",code:`import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: \`
    <mat-card>
      <mat-card-header>
        <mat-card-title>Counter: {{ count }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <button mat-raised-button color="primary" (click)="increment()">+1</button>
        <button mat-raised-button color="accent" (click)="decrement()">-1</button>
        <button mat-button (click)="reset()">Reset</button>
      </mat-card-content>
    </mat-card>
  \`
})
export class CounterComponent {
  count = 0;

  increment() { this.count++; }
  decrement() { this.count--; }
  reset() { this.count = 0; }
}`},{title:"Standalone Component with Inputs/Outputs",language:"typescript",description:"Reusable component with @Input() and @Output() for parent-child communication",code:`import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <button (click)="edit.emit(user)">Edit</button>
      <button (click)="delete.emit(user.id)">Delete</button>
    </div>
  \`,
  styles: [\`.card { border: 1px solid #ccc; padding: 16px; margin: 8px; border-radius: 8px; }\`]
})
export class UserCardComponent {
  @Input() user!: { id: number; name: string; email: string };
  @Output() edit = new EventEmitter<{ id: number; name: string; email: string }>();
  @Output() delete = new EventEmitter<number>();
}`},{title:"Bootstrapping a Modern Angular App (main.ts)",language:"typescript",description:"Complete bootstrapping with routing, HTTP, animations, and interceptors",code:`import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule)
  ]
}).catch(err => console.error(err));`},{title:"Simple Routing with Lazy Loading",language:"typescript",description:"app.routes.ts showing standalone routes with lazy loading",code:`import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
    children: [
      {
        path: ':id',
        loadComponent: () => import('./users/user-detail.component').then(m => m.UserDetailComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];`},{title:"Injectable Service (Standalone Compatible)",language:"typescript",description:"A simple data service using HttpClient",code:`import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'  // Singleton across app
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}`},{title:"NgModule vs Standalone Comparison",language:"typescript",description:"Side-by-side view of old vs new approach",code:`// Standalone (Modern - Recommended)
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  template: '<h2>{{ title }}</h2>'
})
export class ProductComponent {
  title = 'Product Details';
}

// NgModule (Legacy)
@Component({
  selector: 'app-product-old',
  template: '<h2>{{ title }}</h2>'
})
export class ProductOldComponent {
  title = 'Product Details';
}

@NgModule({
  declarations: [ProductOldComponent],
  imports: [CommonModule, FormsModule, MatButtonModule],
  exports: [ProductOldComponent]
})
export class ProductModule { }`}],keyPoints:["Angular is a complete, opinionated framework with built-in solutions","TypeScript-first for type safety and excellent tooling","Standalone components are the default since Angular 14+","No NgModules required for most new projects","Powerful CLI for generation, building, and testing","Hierarchical dependency injection system","RxJS integration for reactive programming","Excellent for large-scale, enterprise applications","Long-term support and regular updates from Google","Strong focus on performance, accessibility, and testing"],bestPractices:["Use standalone components exclusively in new projects","Leverage the Angular CLI for scaffolding (ng generate component/service/etc)","Follow the official style guide for consistency","Use reactive forms over template-driven for complex scenarios","Implement OnPush change detection for performance","Lazy-load routes to improve initial load time",'Use providedIn: "root" for singleton services',"Write unit tests with Jasmine/Karma and e2e tests with Cypress","Structure projects with feature modules or domain-based folders","Keep components small and focused on single responsibility"]};var ao={title:"Angular Application Architecture: A Comprehensive Guide to Modern Folder Structure",tags:["Angular","Folder Structure","Project Architecture","Standalone Components","Best Practices","Code Organization","Scalability","Maintainability"],paragraphs:["A well-crafted folder structure is the foundation of maintainable Angular applications. In the standalone era, Angular offers both simplicity for beginners and sophistication for enterprise-scale applications.","This guide explores three complementary approaches to Angular project organization, from minimalist setups suitable for small projects to sophisticated domain-driven architectures designed for large teams and complex business requirements.","Understanding these patterns empowers you to make intentional architectural decisions that align with your project's scope, team size, and long-term vision."],keyPoints:["Folder structure is architecture made visible\u2014it communicates intent and relationships","Standalone components enable both flat and deeply organized structures with equal elegance","Different organizational patterns serve different project scales and team dynamics",'Consistency within a project is more important than absolute "correctness"',"The structure should evolve with your application's complexity and team growth","Clear boundaries between domains reduce coupling and improve testability"],sections:[{id:"philosophy",heading:"The Philosophy of Angular Project Structure",content:"Great software architecture begins with intentional organization. Angular's flexibility allows multiple valid approaches, each with distinct advantages for different contexts.",list:["Structure should reveal the application's domain, not just its technology","Folder depth should correspond to conceptual complexity, not arbitrary rules","Import paths should tell a story about dependencies and relationships","Naming should be consistent, descriptive, and aligned with team vocabulary","The structure should facilitate both feature isolation and global discovery"],additionalExplanation:"Think of your folder structure as a map of your application's conceptual landscape. Good maps help developers navigate quickly to their destination, understand relationships between different areas, and add new features without getting lost."},{id:"minimalist-approach",heading:"Pattern 1: The Minimalist Approach (Ideal for Learning & Small Projects)",content:"For tutorials, prototypes, and small applications, a flat structure minimizes cognitive overhead while demonstrating Angular's standalone elegance.",list:["src/","\u251C\u2500\u2500 app/","\u2502   \u251C\u2500\u2500 app.component.ts","\u2502   \u251C\u2500\u2500 app.component.html","\u2502   \u251C\u2500\u2500 app.component.scss","\u2502   \u251C\u2500\u2500 app.routes.ts","\u2502   \u251C\u2500\u2500 app.config.ts","\u2502   \u251C\u2500\u2500 main.ts","\u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u251C\u2500\u2500 header/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 header.component.ts","\u2502   \u2502   \u2502   \u251C\u2500\u2500 header.component.html","\u2502   \u2502   \u2502   \u2514\u2500\u2500 header.component.scss","\u2502   \u2502   \u251C\u2500\u2500 footer/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 footer.component.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 footer.component.html","\u2502   \u2502   \u2514\u2500\u2500 user-card/","\u2502   \u2502       \u251C\u2500\u2500 user-card.component.ts","\u2502   \u2502       \u2514\u2500\u2500 user-card.component.html","\u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u251C\u2500\u2500 api.service.ts","\u2502   \u2502   \u2514\u2500\u2500 auth.service.ts","\u2502   \u251C\u2500\u2500 models/","\u2502   \u2502   \u251C\u2500\u2500 user.model.ts","\u2502   \u2502   \u2514\u2500\u2500 product.model.ts","\u2502   \u2514\u2500\u2500 utils/","\u2502       \u251C\u2500\u2500 formatters.ts","\u2502       \u2514\u2500\u2500 validators.ts","\u251C\u2500\u2500 assets/","\u2502   \u251C\u2500\u2500 images/","\u2502   \u2502   \u251C\u2500\u2500 logo.svg","\u2502   \u2502   \u2514\u2500\u2500 icons/","\u2502   \u2502       \u251C\u2500\u2500 home.svg","\u2502   \u2502       \u2514\u2500\u2500 settings.svg","\u2502   \u251C\u2500\u2500 fonts/","\u2502   \u2502   \u251C\u2500\u2500 inter.woff2","\u2502   \u2502   \u2514\u2500\u2500 inter.woff","\u2502   \u2514\u2500\u2500 locales/","\u2502       \u251C\u2500\u2500 en.json","\u2502       \u2514\u2500\u2500 es.json","\u251C\u2500\u2500 environments/","\u2502   \u251C\u2500\u2500 environment.ts","\u2502   \u2514\u2500\u2500 environment.prod.ts","\u251C\u2500\u2500 styles/","\u2502   \u251C\u2500\u2500 _variables.scss","\u2502   \u251C\u2500\u2500 _mixins.scss","\u2502   \u2514\u2500\u2500 _global.scss","\u2514\u2500\u2500 index.html"],additionalExplanation:"This structure shines in its simplicity. Everything is discoverable within 2-3 clicks, making it perfect for solo developers, learning projects, or applications with fewer than 20 components. The flat hierarchy reduces import path complexity while maintaining clear separation of concerns."},{id:"feature-based",heading:"Pattern 2: Feature-Based Structure (The Pragmatic Standard)",content:"For mid-sized applications with clear functional boundaries, organizing by feature creates natural isolation and facilitates team parallelization.",list:["src/","\u251C\u2500\u2500 app/","\u2502   \u251C\u2500\u2500 core/                          # Singleton services, global state","\u2502   \u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 auth.service.ts","\u2502   \u2502   \u2502   \u251C\u2500\u2500 notification.service.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 api-interceptor.service.ts","\u2502   \u2502   \u251C\u2500\u2500 guards/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 auth.guard.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 role.guard.ts","\u2502   \u2502   \u251C\u2500\u2500 interceptors/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 auth.interceptor.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 logging.interceptor.ts","\u2502   \u2502   \u2514\u2500\u2500 models/","\u2502   \u2502       \u251C\u2500\u2500 app-state.model.ts","\u2502   \u2502       \u2514\u2500\u2500 api-response.model.ts","\u2502   \u251C\u2500\u2500 shared/                       # Reusable UI components & utilities","\u2502   \u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 ui/","\u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 button/","\u2502   \u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 button.component.ts","\u2502   \u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 button.component.html","\u2502   \u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 button.component.scss","\u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 card/","\u2502   \u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 card.component.ts","\u2502   \u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 card.component.html","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 modal/","\u2502   \u2502   \u2502   \u2502       \u251C\u2500\u2500 modal.component.ts","\u2502   \u2502   \u2502   \u2502       \u2514\u2500\u2500 modal.component.html","\u2502   \u2502   \u2502   \u2514\u2500\u2500 layout/","\u2502   \u2502   \u2502       \u251C\u2500\u2500 header/","\u2502   \u2502   \u2502       \u2502   \u251C\u2500\u2500 header.component.ts","\u2502   \u2502   \u2502       \u2502   \u2514\u2500\u2500 header.component.html","\u2502   \u2502   \u2502       \u2514\u2500\u2500 footer/","\u2502   \u2502   \u2502           \u251C\u2500\u2500 footer.component.ts","\u2502   \u2502   \u2502           \u2514\u2500\u2500 footer.component.html","\u2502   \u2502   \u251C\u2500\u2500 directives/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 click-outside.directive.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 auto-focus.directive.ts","\u2502   \u2502   \u251C\u2500\u2500 pipes/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 currency-format.pipe.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 date-format.pipe.ts","\u2502   \u2502   \u2514\u2500\u2500 utils/","\u2502   \u2502       \u251C\u2500\u2500 formatters.ts","\u2502   \u2502       \u2514\u2500\u2500 validators.ts","\u2502   \u251C\u2500\u2500 features/                     # Domain-specific feature modules","\u2502   \u2502   \u251C\u2500\u2500 dashboard/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 stats-card/","\u2502   \u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 stats-card.component.ts","\u2502   \u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 stats-card.component.html","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 recent-activity/","\u2502   \u2502   \u2502   \u2502       \u251C\u2500\u2500 recent-activity.component.ts","\u2502   \u2502   \u2502   \u2502       \u2514\u2500\u2500 recent-activity.component.html","\u2502   \u2502   \u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 dashboard.service.ts","\u2502   \u2502   \u2502   \u251C\u2500\u2500 models/","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 dashboard.model.ts","\u2502   \u2502   \u2502   \u251C\u2500\u2500 routes/","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 dashboard.routes.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 pages/","\u2502   \u2502   \u2502       \u251C\u2500\u2500 dashboard-page/","\u2502   \u2502   \u2502       \u2502   \u251C\u2500\u2500 dashboard-page.component.ts","\u2502   \u2502   \u2502       \u2502   \u2514\u2500\u2500 dashboard-page.component.html","\u2502   \u2502   \u2502       \u2514\u2500\u2500 analytics-page/","\u2502   \u2502   \u2502           \u251C\u2500\u2500 analytics-page.component.ts","\u2502   \u2502   \u2502           \u2514\u2500\u2500 analytics-page.component.html","\u2502   \u2502   \u251C\u2500\u2500 users/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 models/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 routes/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 pages/","\u2502   \u2502   \u2502       \u251C\u2500\u2500 user-list/","\u2502   \u2502   \u2502       \u2514\u2500\u2500 user-detail/","\u2502   \u2502   \u2514\u2500\u2500 products/","\u2502   \u2502       \u251C\u2500\u2500 components/","\u2502   \u2502       \u251C\u2500\u2500 services/","\u2502   \u2502       \u251C\u2500\u2500 models/","\u2502   \u2502       \u251C\u2500\u2500 routes/","\u2502   \u2502       \u2514\u2500\u2500 pages/","\u2502   \u2502           \u251C\u2500\u2500 product-catalog/","\u2502   \u2502           \u2514\u2500\u2500 product-detail/","\u2502   \u251C\u2500\u2500 app.component.ts","\u2502   \u251C\u2500\u2500 app.routes.ts","\u2502   \u251C\u2500\u2500 app.config.ts","\u2502   \u2514\u2500\u2500 main.ts","\u251C\u2500\u2500 assets/","\u251C\u2500\u2500 environments/","\u2514\u2500\u2500 styles/"],additionalExplanation:"This structure introduces clear boundaries between different application domains. Features can be developed in parallel by different teams, each with their own isolated folders. The shared folder prevents duplication while core maintains global application state and services. This pattern scales well to applications with 50-200 components."},{id:"domain-driven",heading:"Pattern 3: Domain-Driven Design (Enterprise Scale)",content:"For complex business applications with large teams, a domain-driven approach aligns folder structure with business capabilities and bounded contexts.",list:["src/","\u251C\u2500\u2500 domains/                          # Business capability domains","\u2502   \u251C\u2500\u2500 identity/                     # Authentication, authorization, users","\u2502   \u2502   \u251C\u2500\u2500 application/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 commands/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 queries/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 events/","\u2502   \u2502   \u251C\u2500\u2500 infrastructure/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 repositories/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 adapters/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 gateways/","\u2502   \u2502   \u2514\u2500\u2500 presentation/","\u2502   \u2502       \u251C\u2500\u2500 components/","\u2502   \u2502       \u251C\u2500\u2500 pages/","\u2502   \u2502       \u2514\u2500\u2500 routes/","\u2502   \u251C\u2500\u2500 inventory/                    # Product catalog, stock management","\u2502   \u2502   \u251C\u2500\u2500 domain/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 entities/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 value-objects/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 aggregates/","\u2502   \u2502   \u251C\u2500\u2500 application/","\u2502   \u2502   \u2514\u2500\u2500 presentation/","\u2502   \u2514\u2500\u2500 ordering/                     # Shopping cart, checkout, payments","\u2502       \u251C\u2500\u2500 domain/","\u2502       \u251C\u2500\u2500 application/","\u2502       \u2514\u2500\u2500 presentation/","\u251C\u2500\u2500 shared/                           # Cross-cutting concerns","\u2502   \u251C\u2500\u2500 kernel/                       # Framework abstractions","\u2502   \u2502   \u251C\u2500\u2500 base/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 base.component.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 base.service.ts","\u2502   \u2502   \u2514\u2500\u2500 contracts/","\u2502   \u2502       \u251C\u2500\u2500 repository.contract.ts","\u2502   \u2502       \u2514\u2500\u2500 service.contract.ts","\u2502   \u251C\u2500\u2500 ui/                           # Design system implementation","\u2502   \u2502   \u251C\u2500\u2500 foundation/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 tokens/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 typography/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 grid/","\u2502   \u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 atoms/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 molecules/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 organisms/","\u2502   \u2502   \u2514\u2500\u2500 templates/","\u2502   \u2502       \u251C\u2500\u2500 dashboard.template.ts","\u2502   \u2502       \u2514\u2500\u2500 form.template.ts","\u2502   \u2514\u2500\u2500 infrastructure/","\u2502       \u251C\u2500\u2500 logging/","\u2502       \u251C\u2500\u2500 monitoring/","\u2502       \u251C\u2500\u2500 configuration/","\u2502       \u2514\u2500\u2500 http/","\u251C\u2500\u2500 app/","\u2502   \u251C\u2500\u2500 shell/                        # Application shell & composition root","\u2502   \u2502   \u251C\u2500\u2500 layout/","\u2502   \u2502   \u251C\u2500\u2500 navigation/","\u2502   \u2502   \u2514\u2500\u2500 shell.component.ts","\u2502   \u251C\u2500\u2500 bootstrap/","\u2502   \u2502   \u251C\u2500\u2500 app.config.ts","\u2502   \u2502   \u251C\u2500\u2500 app.routes.ts","\u2502   \u2502   \u2514\u2500\u2500 dependency-injection.config.ts","\u2502   \u2514\u2500\u2500 main.ts","\u2514\u2500\u2500 environments/"],additionalExplanation:"This sophisticated structure implements clean architecture principles. Domains represent business capabilities with clear boundaries. Each domain contains its own domain logic, application services, and presentation layers. The shared folder contains truly cross-cutting concerns, while the app folder serves as the composition root. This pattern supports hundreds of components, multiple teams, and complex business rules."},{id:"common-conventions",heading:"Universal Conventions & Best Practices",content:"Regardless of which pattern you choose, certain conventions improve maintainability and developer experience across all Angular projects.",list:["File Naming: Use kebab-case for files (user-profile.component.ts), PascalCase for classes","Component Organization: Keep component files together (component.ts, .html, .scss, .spec.ts)","Barrel Files: Use index.ts exports sparingly for truly public APIs, not for hiding complexity","Import Paths: Prefer relative imports for closely related files, absolute for shared resources","Test Files: Co-locate spec files with their source files for discoverability","Type Definitions: Place interfaces/types near where they're primarily used, not in a global dump","Configuration: Keep environment-specific configs in environments/, build configs in angular.json","Assets: Organize static assets by type (images/, fonts/, icons/) not by feature"]},{id:"evolution",heading:"Evolving Your Structure Intentionally",content:"Successful projects start with simple structures and evolve intentionally as complexity grows. Recognize these signals that indicate it's time to reorganize:",list:["Multiple developers frequently modify the same folders simultaneously","Import paths become excessively long and difficult to reason about","Finding related files requires extensive searching or memorization","Feature boundaries become blurred with components serving multiple domains","Testing becomes difficult due to tight coupling between unrelated features","New team members take more than a day to understand the basic structure"],additionalExplanation:"Refactoring folder structure is a significant investment. When you do reorganize, do it all at once rather than piecemeal. Update imports systematically, communicate changes clearly to the team, and ensure your CI/CD pipeline handles the transition smoothly."}],codeExamples:[{title:"Barrel File Example for Feature Module",description:"Clean public API exposure for a feature module",language:"typescript",code:`// features/dashboard/index.ts
// Export public API for the dashboard feature

// Components
export { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
export { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';

// Services
export { DashboardService } from './services/dashboard.service';

// Models
export type { DashboardStats, RecentActivity } from './models/dashboard.model';

// Routes
export { DASHBOARD_ROUTES } from './routes/dashboard.routes';`},{title:"Smart vs Dumb Component Organization",language:"typescript",code:`// features/users/components/user-list/ (Smart/Container Component)
// user-list.component.ts
@Component({
  standalone: true,
  imports: [UserCardComponent, CommonModule, ReactiveFormsModule],
  template: \`
    <div class="user-list">
      <app-user-card 
        *ngFor="let user of users$ | async" 
        [user]="user"
        (userSelected)="onUserSelected($event)">
      </app-user-card>
    </div>
  \`
})
export class UserListComponent {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) {}
}

// shared/components/ui/user-card/ (Dumb/Presentational Component)
// user-card.component.ts
@Component({
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="user-card" (click)="selectUser()">
      <img [src]="user.avatar" [alt]="user.name">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  \`
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() userSelected = new EventEmitter<User>();
  
  selectUser() {
    this.userSelected.emit(this.user);
  }
}`},{title:"Domain-Driven Component with Clean Architecture",language:"typescript",code:`// domains/identity/presentation/components/login-form/
// login-form.component.ts
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  template: \`
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <app-input 
        label="Email" 
        type="email"
        formControlName="email">
      </app-input>
      
      <app-input 
        label="Password" 
        type="password"
        formControlName="password">
      </app-input>
      
      <app-button 
        type="submit" 
        [loading]="isSubmitting$ | async">
        Sign In
      </app-button>
    </form>
  \`
})
export class LoginFormComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  
  isSubmitting$ = this.authFacade.isSubmitting$;
  
  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade
  ) {}
  
  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as LoginCredentials;
      this.authFacade.login(credentials);
    }
  }
}

// domains/identity/application/auth.facade.ts
// Abstraction layer between presentation and domain
@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private store = inject(Store);
  
  isSubmitting$ = this.store.select(AuthSelectors.selectIsSubmitting);
  
  login(credentials: LoginCredentials) {
    this.store.dispatch(AuthActions.login({ credentials }));
  }
}`},{title:"Environment-Aware Service Configuration",language:"typescript",code:`// shared/infrastructure/http/api.config.ts
import { isDevMode } from '@angular/core';

export const API_CONFIG = {
  // Base URLs - use environment variables or build-time replacements
  baseUrl: isDevMode() ? 'https://api.dev.example.com/v1' : 'https://api.example.com/v1',
  authUrl: isDevMode() ? 'https://auth.dev.example.com' : 'https://auth.example.com',

  // Endpoints
  endpoints: {
    users: '/users',
    products: '/products',
    orders: '/orders'
  },

  // Timeouts
  defaultTimeout: 30000,
  uploadTimeout: 120000,

  // Retry configuration
  retryAttempts: 3,
  retryDelay: 1000
};`}],bestPractices:["Start simple and evolve intentionally\u2014don't over-engineer from day one","Let your business domain dictate structure, not technical concerns","Keep components small, focused, and co-located with their dependencies","Use meaningful folder names that reveal intent (features/, domains/, shared/)","Maintain consistent naming conventions across the entire codebase","Organize for the developer experience, not just the build system","Create clear boundaries between features to enable parallel development","Document your architectural decisions and folder conventions","Regularly refactor the structure as the application evolves","Balance abstraction with practicality\u2014not every component needs a facade","Keep test files alongside their source files for discoverability","Use barrel files judiciously\u2014they should simplify, not obscure","Consider the cognitive load on new team members when designing structure","Align folder structure with your team's workflow and communication patterns","Remember that the best structure is the one your team can maintain consistently"]};var so={title:"Angular vs React vs Vue: The Framework Kitchen Showdown",tags:["frontend","frameworks","comparison","javascript","typescript"],paragraphs:["Imagine building web applications is like running a restaurant kitchen. Angular is a fully-equipped professional kitchen with every appliance labeled and procedures manualized. React is a chef's table where you bring your own tools but have an expert chef guiding your technique. Vue is the modern food truck with a perfectly curated set of tools that just work together intuitively.","Each framework represents a different philosophy in how we structure, build, and maintain our digital 'meals' (applications). Let's explore how they differ in their approaches to common web development challenges."],keyPoints:["Angular: The enterprise-grade kitchen with built-in everything","React: The flexible chef's toolkit - bring what you need","Vue: The progressive framework that scales with your needs","Different mental models for solving the same problems","Ecosystem maturity vs developer experience trade-offs"],sections:[{heading:"Architecture: Kitchen Layout & Organization",content:"How each framework structures your application's 'kitchen'",list:["Angular: Pre-designed kitchen blueprint (opinionated architecture)","React: Open floor plan - you design the kitchen layout (unopinionated)","Vue: Modular kitchen units that snap together (progressive framework)"],additionalExplanation:"Angular tells you where everything goes, React lets you decide, and Vue gives you sensible defaults that you can override."},{heading:"Learning Curve: From Line Cook to Executive Chef",content:"The journey from beginner to expert in each framework",list:["Angular: Steep climb but structured path (TypeScript, RxJS, decorators)","React: Gentle slope but wide plateau (JSX, hooks, ecosystem choices)","Vue: Smooth ascent with guardrails (template syntax, single-file components)"],additionalExplanation:"Vue is often praised for its gentle learning curve, while Angular's comprehensive nature requires more upfront learning but provides more guidance."},{heading:"State Management: Inventory Control Systems",content:"How each framework handles application state",list:["Angular: Centralized pantry with RxJS observables","React: Component fridges with optional Redux freezer","Vue: Reactive pantry that updates everything automatically"]}],codeExamples:[{title:"Creating a Component: Different Cooking Styles",language:"typescript",code:`// ANGULAR - The Structured Recipe
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input() user: User;
  @Output() saved = new EventEmitter<User>();
  
  constructor(private userService: UserService) {}
}

// REACT - The Functional Recipe
const UserProfile = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleSave = () => {
    onSave(user);
  };
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      {isEditing ? <EditForm user={user} /> : <ProfileView user={user} />}
    </div>
  );
};

// VUE - The Declarative Recipe
<template>
  <div class="user-profile">
    <h2>{{ user.name }}</h2>
    <button @click="isEditing = !isEditing">
      {{ isEditing ? 'Cancel' : 'Edit' }}
    </button>
    <component :is="currentComponent" :user="user" @save="handleSave" />
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return { isEditing: false };
  },
  computed: {
    currentComponent() {
      return this.isEditing ? EditForm : ProfileView;
    }
  },
  methods: {
    handleSave(updatedUser) {
      this.$emit('save', updatedUser);
    }
  }
};
<\/script>`,description:"Three different approaches to the same problem: Angular uses decorators and dependency injection, React uses functions and hooks, Vue uses single-file components with clear separation of concerns."},{title:"Data Binding: Communicating Between Kitchen Stations",language:"typescript",code:`// ANGULAR - Two-way binding with [(ngModel)]
@Component({
  template: \`
    <input [(ngModel)]="username" (ngModelChange)="onUsernameChange()">
    <p>Hello, {{ username }}!</p>
  \`
})
export class GreetingComponent {
  username = 'Guest';
  onUsernameChange() {
    console.log('Username changed to:', this.username);
  }
}

// REACT - One-way data flow
const Greeting = () => {
  const [username, setUsername] = useState('Guest');
  
  const handleChange = (event) => {
    setUsername(event.target.value);
    console.log('Username changed to:', event.target.value);
  };
  
  return (
    <>
      <input value={username} onChange={handleChange} />
      <p>Hello, {username}!</p>
    </>
  );
};

// VUE - Reactive two-way binding with v-model
<template>
  <div>
    <input v-model="username" @input="onUsernameChange">
    <p>Hello, {{ username }}!</p>
  </div>
</template>

<script>
export default {
  data() {
    return { username: 'Guest' };
  },
  methods: {
    onUsernameChange() {
      console.log('Username changed to:', this.username);
    }
  }
};
<\/script>`,description:"Different approaches to synchronizing data between the view and the component logic."},{title:"Dependency Injection: Kitchen Supply Chain",language:"typescript",code:`// ANGULAR - Built-in dependency injection
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  
  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
}

@Component({
  selector: 'app-user-list',
  template: '<div *ngFor="let user of users">{{user.name}}</div>'
})
export class UserListComponent {
  users: User[] = [];
  
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}

// REACT - Props drilling or Context
const UserServiceContext = createContext();

const UserServiceProvider = ({ children }) => {
  const getUsers = async () => {
    const response = await fetch('/api/users');
    return response.json();
  };
  
  return (
    <UserServiceContext.Provider value={{ getUsers }}>
      {children}
    </UserServiceContext.Provider>
  );
};

const UserList = () => {
  const { getUsers } = useContext(UserServiceContext);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getUsers().then(setUsers);
  }, [getUsers]);
  
  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};

// VUE - Provide/Inject pattern
// In parent component
export default {
  provide() {
    return {
      getUserService: () => ({
        getUsers: () => fetch('/api/users').then(r => r.json())
      })
    };
  }
};

// In child component
export default {
  inject: ['getUserService'],
  data() {
    return { users: [] };
  },
  async created() {
    const service = this.getUserService();
    this.users = await service.getUsers();
  }
};`,description:"Different approaches to managing dependencies and sharing services across components."}],bestPractices:["Choose Angular for: Large enterprise applications, teams needing structure, projects requiring comprehensive tooling out-of-the-box","Choose React for: Maximum flexibility, teams that want to choose their own tools, projects where UI interactivity is the primary focus","Choose Vue for: Rapid prototyping, smaller to medium-sized projects, teams valuing developer experience and gradual adoption","Consider your team's existing skills and preferences - the best framework is the one your team can use effectively","Remember that all three frameworks can solve the same problems - they just approach them differently","Don't let 'framework wars' distract you from building great user experiences"]},lo=[{heading:"Angular: The Seasoned Executive Chef",content:"Angular brings order, structure, and predictability to large-scale application development.",list:["Loves: Type safety, comprehensive documentation, built-in solutions","Dislikes: Ad-hoc solutions, inconsistent patterns, magical code","Signature move: @Decorators everywhere","Catchphrase: 'There's a module for that'"]},{heading:"React: The Innovative Fusion Chef",content:"React focuses on component composition and functional programming principles.",list:["Loves: Functional purity, composable components, minimal API surface","Dislikes: Magic, unnecessary abstractions, boilerplate","Signature move: const [state, setState] = useState(initial)","Catchphrase: 'It's just JavaScript'"]},{heading:"Vue: The Approachable Master Chef",content:"Vue balances power with approachability, making sophisticated features accessible.",list:["Loves: Developer experience, progressive enhancement, sensible defaults","Dislikes: Complexity for complexity's sake, steep learning curves","Signature move: v-directives in templates","Catchphrase: 'The Progressive Framework'"]}],co={title:"Framework Selection Algorithm (in pseudocode)",language:"javascript",code:`function chooseFramework(projectRequirements) {
  const { 
    teamSize, 
    projectScale, 
    timeline,
    teamExperience,
    needForStructure,
    longTermMaintainability 
  } = projectRequirements;

  if (teamSize === 'large' && projectScale === 'enterprise') {
    // Angular shines with large teams and complex requirements
    if (teamExperience.includes('TypeScript') || timeline === 'long') {
      return 'Angular';
    }
  }

  if (projectScale === 'startup' || timeline === 'aggressive') {
    // React's ecosystem and hiring pool can accelerate development
    if (teamExperience.includes('React') || needForStructure === 'flexible') {
      return 'React';
    }
    // Vue's gentle learning curve helps small teams move fast
    if (teamSize === 'small' || teamExperience === 'mixed') {
      return 'Vue';
    }
  }

  if (teamExperience === 'greenfield') {
    // New teams can choose based on learning preferences
    if (prefers === 'guided-structure') return 'Angular';
    if (prefers === 'max-flexibility') return 'React';
    if (prefers === 'gradual-learning') return 'Vue';
  }

  // When in doubt, prototype with each and see what feels right
  return 'PrototypeWithAllThreeThenDecide';
}`,description:"A humorous but practical guide to framework selection based on project and team characteristics."},po={title:"Convergence and Specialization: Where Frameworks Are Heading",paragraphs:["Interestingly, all three frameworks are learning from each other. Angular has adopted more reactive patterns, React has embraced more structure with frameworks like Next.js, and Vue has borrowed concepts from both.","The future isn't about one framework 'winning' but about each specializing in what it does best while adopting the best ideas from the ecosystem."],sections:[{heading:"Common Trends Across All Frameworks",content:"What all modern frameworks are moving toward",list:["Better TypeScript support (even Vue 3 is written in TypeScript!)","Improved developer experience with better tooling","Performance optimizations (smaller bundles, faster updates)","Better server-side rendering and static generation","Improved mobile and native capabilities"]},{heading:"Unique Innovations",content:"Framework-specific innovations influencing the ecosystem",list:["Angular: Ivy renderer, improved bundle sizes, strict typing","React: Concurrent features, server components, React Forget compiler","Vue: Composition API, Vite build tool, Pinia state management"]}],bestPractices:["Learn concepts, not just syntax - reactive programming, component design, state management","Consider using a meta-framework (Next.js, Nuxt.js, Angular Universal) for production apps","Don't rewrite everything - sometimes incremental adoption is better","Focus on user experience first, framework choices second","The best framework for your next project might not be the one you know best"]};var uo={title:"Angular Architecture: A Complete Guide",tags:["angular","architecture","components","modules","services","dependency-injection"],paragraphs:["Angular follows a component-based architecture with a clear separation of concerns. Think of it as building with LEGO blocks - each piece has a specific purpose and connects to others in predictable ways.","The architecture is built around modules, components, services, and templates, all working together through Angular's powerful dependency injection system."],keyPoints:["Component-based architecture","Hierarchical component tree","Dependency injection system","Unidirectional data flow","Modular design with lazy loading","TypeScript-first approach"],sections:[{heading:"Core Building Blocks",content:"The essential pieces of every Angular application",list:["Modules: Organize code into cohesive blocks","Components: Control views and user interaction","Templates: Define HTML views with Angular syntax","Services: Handle business logic and data","Directives: Extend HTML with custom behavior"],additionalExplanation:"Each building block has a specific role, making the application easy to understand, maintain, and scale."},{heading:"Component Tree Structure",content:"How components organize into a hierarchy",list:["Root component starts the application","Parent components contain child components","Data flows down via @Input bindings","Events bubble up via @Output emitters","Services provide shared functionality"]},{heading:"Data Flow & Communication",content:"How different parts of the application communicate",list:["@Input() - Parent to child data binding","@Output() - Child to parent event emitting","Services - Cross-component communication","RxJS Observables - Reactive data streams","Template Reference Variables - Local component references"]}],codeExamples:[{title:"Complete Architecture Example",language:"typescript",code:`// 1. MODULE - app.module.ts
@NgModule({
  declarations: [AppComponent, HeaderComponent, UserListComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [UserService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule {}

// 2. SERVICE - user.service.ts (Business Logic)
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://api.example.com/users';
  
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}

// 3. COMPONENT - user-list.component.ts (Presentation)
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() title = 'Users';  // Data from parent
  @Output() userSelected = new EventEmitter<User>();  // Events to parent
  
  users: User[] = [];
  isLoading = false;
  
  constructor(private userService: UserService) {}  // Dependency injection
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  private loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        this.isLoading = false;
      }
    });
  }
  
  selectUser(user: User): void {
    this.userSelected.emit(user);  // Emit event to parent
  }
}

// 4. TEMPLATE - user-list.component.html (View)
<div class="user-list">
  <h2>{{ title }}</h2>
  
  <div *ngIf="isLoading" class="loading">
    Loading users...
  </div>
  
  <div *ngIf="!isLoading && users.length === 0" class="empty">
    No users found.
  </div>
  
  <div *ngFor="let user of users" class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button (click)="selectUser(user)">Select</button>
  </div>
</div>`,description:"A complete example showing how modules, services, components, and templates work together."},{title:"Component Communication Patterns",language:"typescript",code:`// Parent Component
@Component({
  selector: 'app-dashboard',
  template: \`
    <h1>Dashboard</h1>
    
    <!-- Parent to child: Pass data via @Input -->
    <app-user-stats 
      [totalUsers]="totalUsers"
      [activeUsers]="activeUsers">
    </app-user-stats>
    
    <!-- Child to parent: Handle events via @Output -->
    <app-user-list 
      (userSelected)="onUserSelected($event)">
    </app-user-list>
    
    <!-- Service communication -->
    <app-notifications></app-notifications>
  \`
})
export class Dashboard {
  totalUsers = 100;
  activeUsers = 85;
  
  onUserSelected(user: User): void {
    console.log('Selected user:', user);
    // Handle the selection
  }
}

// Child Component 1 - User Stats
@Component({
  selector: 'app-user-stats',
  template: \`
    <div class="stats">
      <div>Total: {{ totalUsers }}</div>
      <div>Active: {{ activeUsers }}</div>
      <div>Percentage: {{ activeUsers / totalUsers | percent }}</div>
    </div>
  \`
})
export class UserStatsComponent {
  @Input() totalUsers!: number;
  @Input() activeUsers!: number;
}

// Child Component 2 - User List
@Component({
  selector: 'app-user-list',
  template: \`
    <div *ngFor="let user of users">
      <span>{{ user.name }}</span>
      <button (click)="selectUser(user)">Select</button>
    </div>
  \`
})
export class UserListComponent {
  users: User[] = [...];
  @Output() userSelected = new EventEmitter<User>();
  
  selectUser(user: User): void {
    this.userSelected.emit(user);
  }
}

// Service for cross-component communication
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = new BehaviorSubject<string[]>([]);
  notifications$ = this.notifications.asObservable();
  
  addNotification(message: string): void {
    const current = this.notifications.value;
    this.notifications.next([...current, message]);
  }
}

// Component using the service
@Component({
  selector: 'app-notifications',
  template: \`
    <div *ngFor="let message of notifications$ | async">
      {{ message }}
    </div>
  \`
})
export class NotificationsComponent {
  notifications$ = this.notificationService.notifications$;
  
  constructor(private notificationService: NotificationService) {}
}`,description:"Different patterns for component communication: @Input/@Output, services, and RxJS observables."}],bestPractices:["Keep components focused and single-purpose (Single Responsibility Principle)","Use services for business logic and data operations","Prefer @Input/@Output for parent-child communication","Use services with RxJS for cross-component communication","Organize code by feature, not by type","Implement lazy loading for feature modules","Use TypeScript interfaces for type safety","Follow the Angular style guide for consistency","Write unit tests for services and components","Use Angular CLI for project generation and maintenance"]},mo=[{heading:"Application Structure",content:"Visual representation of Angular architecture",list:["\u{1F4C1} app/","  \u251C\u2500\u2500 \u{1F4C1} core/           (Singleton services, guards)","  \u251C\u2500\u2500 \u{1F4C1} shared/         (Components, pipes, directives)","  \u251C\u2500\u2500 \u{1F4C1} features/       (Feature modules)","  \u2502   \u251C\u2500\u2500 \u{1F4C1} users/","  \u2502   \u251C\u2500\u2500 \u{1F4C1} dashboard/","  \u2502   \u2514\u2500\u2500 \u{1F4C1} settings/","  \u251C\u2500\u2500 \u{1F4C4} app.module.ts   (Root module)","  \u2514\u2500\u2500 \u{1F4C4} app.component.ts (Root component)"],additionalExplanation:"This structure organizes code by responsibility, making it easier to find and maintain."},{heading:"Data Flow Diagram",content:"How data moves through the application",list:["API Server \u2192 HTTP Service \u2192 Observable","Observable \u2192 Service Method \u2192 Component","Component \u2192 @Input() \u2192 Child Component","Child Component \u2192 @Output() \u2192 Parent Component","Component \u2192 Template \u2192 User View","User Action \u2192 Event Binding \u2192 Component Method"]}],go={title:"Architectural Patterns & Anti-Patterns",sections:[{heading:"Recommended Patterns",content:"Patterns that lead to maintainable applications",list:["Smart/Dumb Components: Separate logic from presentation","Feature Modules: Organize by business capability","Lazy Loading: Load modules on-demand","Service Layers: Centralize business logic","Reactive State: Use RxJS for state management"]},{heading:"Patterns to Avoid",content:"Common mistakes in Angular architecture",list:["God Components: Components that do too much","Tight Coupling: Direct component dependencies","Logic in Templates: Complex expressions in HTML","Service as Data Store: Using services like global variables","Over-engineering: Adding complexity prematurely"]}],codeExamples:[{title:"Good vs Bad Practices",language:"typescript",code:`// \u274C BAD: Logic in template
@Component({
  template: \`
    <div *ngIf="users && users.length > 0 && !isLoading">
      {{ users.filter(u => u.active).map(u => u.name).join(', ') }}
    </div>
  \`
})
export class BadComponent {}

// \u2705 GOOD: Logic in component
@Component({
  template: \`
    <div *ngIf="showActiveUsers">
      {{ activeUserNames }}
    </div>
  \`
})
export class GoodComponent {
  users: User[] = [];
  isLoading = false;
  
  get showActiveUsers(): boolean {
    return this.users.length > 0 && !this.isLoading;
  }
  
  get activeUserNames(): string {
    return this.users
      .filter(user => user.active)
      .map(user => user.name)
      .join(', ');
  }
}

// \u274C BAD: Tight coupling
@Component({
  template: '<app-user-details></app-user-details>'
})
export class ParentComponent {
  // Directly manipulating child component
  @ViewChild(UserDetailsComponent) userDetails!: UserDetailsComponent;
  
  ngOnInit() {
    this.userDetails.loadData();  // Direct method call
  }
}

// \u2705 GOOD: Loose coupling
@Component({
  template: \`
    <app-user-details 
      [userId]="selectedUserId"
      (dataLoaded)="onDataLoaded($event)">
    </app-user-details>
  \`
})
export class ParentComponent {
  selectedUserId = '123';
  
  onDataLoaded(data: any): void {
    // Handle event from child
  }
}`,description:"Examples of good architectural patterns vs common anti-patterns."}]};var ho={title:"Angular CLI: Your Development Assistant",tags:["angular","cli","command-line","tools","development"],paragraphs:["Angular CLI is a command-line tool that helps you create, develop, and maintain Angular applications. Think of it as a Swiss Army knife for Angular developers.","It automates common tasks like creating components, building projects, and running tests - saving you time and ensuring consistency."],keyPoints:["Command-line interface for Angular","Generates files and structure","Builds and serves applications","Runs tests and linting","Manages dependencies and updates"],sections:[{heading:"What Angular CLI Does",content:"The main jobs of Angular CLI",list:["\u{1F680} Creates new Angular projects","\u{1F527} Generates components, services, modules","\u{1F3D7}\uFE0F Builds for development and production","\u{1F310} Serves apps with live reload","\u2705 Runs tests and linting","\u{1F4E6} Adds and removes packages"]},{heading:"Why Use Angular CLI",content:"Benefits of using the CLI",list:["Saves time on repetitive tasks","Ensures consistent project structure","Follows Angular best practices","Reduces configuration headaches","Integrates with other tools"]}],codeExamples:[{title:"Basic Installation & Setup",language:"bash",code:`# 1. Install Angular CLI globally
npm install -g @angular/cli

# 2. Check installation
ng version

# 3. Create a new Angular project
ng new my-app

# Answer questions:
# \u2713 Add Angular routing? Yes
# \u2713 Which stylesheet format? CSS

# 4. Navigate to project
cd my-app

# 5. Run the application
ng serve --open`,description:"Complete setup from zero to running app"},{title:"Common Commands",language:"bash",code:`# Project Management
ng new app-name         # Create new app
ng serve               # Start dev server
ng build               # Build for production
ng test                # Run tests
ng lint                # Check code quality

# Generating Files
ng generate component user-list
ng generate service auth
ng generate module admin
ng generate pipe format-date

# Short versions
ng g c user-list      # Component
ng g s auth           # Service
ng g m admin          # Module
ng g p format-date    # Pipe

# Updating & Managing
ng update             # Update packages
ng add @angular/pwa   # Add features`,description:"Essential commands for daily development"}],bestPractices:["Use ng new for consistent project structure","Generate files with CLI instead of creating manually","Use --dry-run to preview changes before applying","Regularly update CLI with npm update -g @angular/cli","Use ng lint before committing code","Add flags like --skip-tests for faster prototyping","Use --style flag to choose CSS preprocessor"]};var fo={title:"Angular Component Lifecycle, Change Detection, and Smart vs Dumb Components: In-Depth Explanation",tags:["Angular","Component Lifecycle","Change Detection","Smart Components","Dumb Components","Architecture","Best Practices"],paragraphs:["Angular components are the building blocks of applications, and understanding their lifecycle, change detection mechanisms, and architectural patterns like smart vs dumb components is crucial for building efficient, maintainable, and performant apps. This comprehensive guide explores these concepts in detail, providing explanations, examples, and best practices to help developers leverage them effectively. We'll cover the component lifecycle hooks, how Angular detects and propagates changes, and the distinction between smart (container) and dumb (presentational) components, including their roles, benefits, and implementation strategies."],keyPoints:["Component Lifecycle: A series of hooks that Angular calls at specific points in a component's life, allowing developers to hook into initialization, updates, and destruction.","Change Detection: Angular's mechanism to check for data changes and update the DOM accordingly, with strategies like Default and OnPush for optimization.","Smart Components: Handle business logic, data fetching, and state management; often connected to services and pass data to dumb components.","Dumb Components: Focus on presentation and UI; receive data via inputs and emit events via outputs, remaining stateless and reusable."],sections:[{id:"component-lifecycle",heading:"Component Lifecycle",content:"The Angular component lifecycle consists of a sequence of phases from creation to destruction. Angular provides lifecycle hooks\u2014methods that are called at specific times\u2014allowing developers to perform actions like initializing data, responding to changes, or cleaning up resources. Understanding these hooks is essential for managing component behavior efficiently.",list:["ngOnChanges: Called when input properties change, before ngOnInit and on subsequent changes.","ngOnInit: Invoked after the first ngOnChanges, ideal for initialization logic after inputs are set.","ngDoCheck: Triggered during every change detection cycle, for custom change detection.","ngAfterContentInit: Called after content projection (ng-content) is initialized.","ngAfterContentChecked: Invoked after every check of projected content.","ngAfterViewInit: Triggered after the component's view and child views are initialized.","ngAfterViewChecked: Called after every check of the view and child views.","ngOnDestroy: Executed just before the component is destroyed, perfect for cleanup like unsubscribing from observables."],additionalExplanation:"The lifecycle hooks are called in a predictable order, enabling precise control over component behavior. For example, avoid heavy computations in ngDoCheck to prevent performance issues, as it runs frequently. In standalone components (Angular 14+), lifecycle hooks work similarly but with potentially simpler dependency management."},{id:"change-detection",heading:"Change Detection",content:"Change detection is Angular's way of keeping the UI in sync with the data model. It checks for changes in component properties and inputs, re-rendering the view when necessary. Angular uses a tree-based detection strategy, starting from the root component and propagating down.",list:["Default Strategy: Checks all components on every browser event (e.g., click, timer), suitable for small apps but can be inefficient in large ones.","OnPush Strategy: Only checks when input references change, an @Output event is emitted from a child, or explicitly triggered via ChangeDetectorRef; optimizes performance by reducing unnecessary checks.","Change Detection Triggers: Asynchronous operations like HTTP requests, timers, or events; can be manually triggered using detectChanges() or markForCheck().","Zone.js Integration: Angular patches browser APIs to automatically trigger change detection on async events."],additionalExplanation:"To optimize, use OnPush where possible, especially in dumb components. Immutable data structures enhance OnPush efficiency since reference changes are easier to detect. Avoid mutating inputs directly; instead, create new objects or arrays. In complex apps, detaching change detection (detach()) and reattaching when needed can further improve performance."},{id:"smart-vs-dumb-components",heading:"Smart vs Dumb Components",content:"The smart (container) vs dumb (presentational) component pattern is an architectural best practice in Angular (and React) for separating concerns. Smart components manage state and logic, while dumb components handle rendering, promoting reusability, testability, and maintainability.",list:["Smart Components: Also called containers; responsible for data fetching, business logic, and orchestration; use services, handle side effects, and pass data to dumb components via @Input.","Dumb Components: Also called presentational; focus solely on UI; receive data via @Input, emit actions via @Output, and avoid dependencies on services or state management.","Benefits of Separation: Easier testing (dumb components are pure functions), better reusability (dumb components can be shared across features), and clearer code organization.","Implementation: Smart components often use OnPush change detection for performance, while dumb components can use Default if simple."],additionalExplanation:"In practice, smart components are typically higher in the component tree, composing multiple dumb components. For state management in smart components, integrate with NgRx or signals (Angular 16+). This pattern aligns with the single responsibility principle, making large applications more scalable. Avoid mixing concerns; if a component needs both logic and presentation, consider splitting it."}],codeExamples:[{title:"Component Lifecycle Hooks Example",language:"typescript",code:`import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: \`<p>Lifecycle Demo</p>\`,
  standalone: true
})
export class LifecycleComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() data: string;

  ngOnChanges(changes: SimpleChanges) { console.log('ngOnChanges', changes); }
  ngOnInit() { console.log('ngOnInit'); }
  ngDoCheck() { console.log('ngDoCheck'); }
  ngAfterContentInit() { console.log('ngAfterContentInit'); }
  ngAfterContentChecked() { console.log('ngAfterContentChecked'); }
  ngAfterViewInit() { console.log('ngAfterViewInit'); }
  ngAfterViewChecked() { console.log('ngAfterViewChecked'); }
  ngOnDestroy() { console.log('ngOnDestroy'); }
}`,description:"Implements all lifecycle hooks, logging their calls to demonstrate the order and timing."},{title:"Change Detection with OnPush Example",language:"typescript",code:`import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-onpush',
  template: \`<p>{{ data }}</p>\`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class OnPushComponent {
  @Input() data: string;
}`,description:"A component using OnPush strategy, which only updates when the input reference changes."},{title:"Smart Component Example",language:"typescript",code:`import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { DumbComponent } from './dumb.component';

@Component({
  selector: 'app-smart',
  template: \`<app-dumb [items]="items" (itemSelected)="onItemSelected($event)"></app-dumb>\`,
  standalone: true,
  imports: [CommonModule, DumbComponent]
})
export class SmartComponent implements OnInit {
  items: any[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(data => this.items = data);
  }

  onItemSelected(item: any) {
    console.log('Selected:', item);
  }
}`,description:"A smart component that fetches data from a service and passes it to a dumb component."},{title:"Dumb Component Example",language:"typescript",code:`import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dumb',
  template: \`<ul><li *ngFor="let item of items" (click)="selectItem(item)">{{ item.name }}</li></ul>\`,
  standalone: true,
  imports: [CommonModule]
})
export class DumbComponent {
  @Input() items: any[];
  @Output() itemSelected = new EventEmitter<any>();

  selectItem(item: any) {
    this.itemSelected.emit(item);
  }
}`,description:"A dumb component that renders a list and emits events on selection, without any business logic."}],bestPractices:["Use lifecycle hooks judiciously: Perform initialization in ngOnInit, cleanup in ngOnDestroy, and avoid heavy logic in frequently called hooks like ngDoCheck.","Optimize change detection: Prefer OnPush for components with immutable data or infrequent updates; use ChangeDetectorRef for manual control in performance-critical areas.","Adopt smart-dumb pattern: Keep dumb components pure and testable; centralize logic in smart components or services to enhance reusability and separation of concerns.","Handle asynchronous data: Use RxJS operators in smart components for data streams, and ensure unsubscriptions to prevent memory leaks.","Monitor performance: Use Angular DevTools to profile change detection cycles and identify bottlenecks; combine with lazy loading for larger apps.","Leverage signals (Angular 16+): For reactive state in smart components, reducing reliance on change detection for fine-grained updates.","Test thoroughly: Write unit tests for lifecycle methods, change detection behavior, and component interactions to ensure robustness."]};var vo={title:"Angular Data Binding: Traditional vs Signals",tags:["angular","data-binding","signals","ngmodel","reactivity","comparison"],paragraphs:["Angular offers two approaches for handling data flow: Traditional binding (ngModel, @Input/@Output) and modern Signals (Angular 17+).","Both methods connect your data to the UI, but Signals offer better performance with automatic reactivity."],keyPoints:["Traditional: Uses @Input/@Output and ngModel","Modern: Uses signal(), computed(), and model()","Signals are reactive and update automatically","Traditional binding updates whole components","Choose based on your Angular version and needs"],sections:[{heading:"Traditional Data Binding",content:"The classic approach used in Angular 2-16",list:["\u{1F4E5} @Input() - Pass data from parent to child","\u{1F4E4} @Output() - Send events from child to parent","\u{1F504} [(ngModel)] - Two-way binding for forms","\u{1F3F7}\uFE0F Property binding - [property]='value'","\u{1F3AF} Event binding - (event)='handler()'","\u{1F9F5} Requires manual change detection","\u{1F4E6} Updates entire component on changes"]},{heading:"Modern Signals (Angular 17+)",content:"Reactive approach with automatic updates",list:["\u26A1 signal() - Create reactive values","\u{1F9EE} computed() - Create derived values","\u{1F3AF} effect() - Handle side effects","\u{1F504} model() - Two-way binding with Signals","\u{1F680} Automatic dependency tracking","\u{1F3AF} Fine-grained updates (only what changed)","\u{1F4C8} Better performance for complex apps"]},{heading:"Quick Comparison Table",content:"When to use each approach",list:["\u{1F535} Use Traditional if: Maintaining Angular 16 or older app","\u{1F535} Use Traditional if: Team is familiar with old approach","\u{1F535} Use Traditional if: Simple forms and basic data flow","\u{1F7E2} Use Signals if: Starting new Angular 17+ project","\u{1F7E2} Use Signals if: Need better performance","\u{1F7E2} Use Signals if: Complex state management","\u{1F7E1} Use Both if: Gradually migrating to Signals","\u{1F7E1} Use Both if: Mixing old and new components"]},{heading:"Performance Differences",content:"How they affect your app's speed",list:["Traditional: Updates entire component tree","Traditional: Can cause unnecessary re-renders","Traditional: Manual optimization needed","Signals: Updates only specific DOM elements","Signals: Automatic optimization","Signals: Better for large, dynamic apps","Signals: Less boilerplate code"]}],codeExamples:[{title:"Traditional Binding Examples",language:"typescript",code:`// Parent to Child with @Input
@Component({
  selector: 'app-parent',
  template: \`<app-child [message]="parentMessage"></app-child>\`
})
export class ParentComponent {
  parentMessage = 'Hello from parent!';
}

@Component({
  selector: 'app-child',
  template: \`<p>{{message}}</p>\`
})
export class ChildComponent {
  @Input() message!: string;
}

// Child to Parent with @Output
@Component({
  selector: 'app-child',
  template: \`
    <button (click)="sendMessage()">Send Message</button>
  \`
})
export class ChildComponent {
  @Output() messageSent = new EventEmitter<string>();
  
  sendMessage() {
    this.messageSent.emit('Hello from child!');
  }
}

// Two-way binding with ngModel
@Component({
  template: \`
    <input [(ngModel)]="username">
    <p>Welcome, {{username}}!</p>
  \`
})
export class UserFormComponent {
  username = 'Guest';
}`,description:"Classic Angular data binding patterns"},{title:"Signals Examples (Angular 17+)",language:"typescript",code:`// Basic signal usage
import { signal, computed } from '@angular/core';

@Component({
  template: \`
    <input [value]="firstName()" (input)="firstName.set($event.target.value)">
    <input [value]="lastName()" (input)="lastName.set($event.target.value)">
    <p>Full Name: {{fullName()}}</p>
  \`
})
export class UserComponent {
  firstName = signal('John');
  lastName = signal('Doe');
  
  // Automatically updates when dependencies change
  fullName = computed(() => \`\${this.firstName()} \${this.lastName()}\`);
}

// Two-way binding with model() (Angular 17.3+)
import { model } from '@angular/core';

@Component({
  template: \`
    <input [(ngModel)]="email">
    <p>Your email: {{email()}}</p>
  \`
})
export class FormComponent {
  email = model('user@example.com');
}

// Effect for side operations
import { effect } from '@angular/core';

@Component({
  template: \`<p>Count: {{count()}}</p>\`
})
export class CounterComponent {
  count = signal(0);
  
  constructor() {
    // Runs when count changes
    effect(() => {
      console.log('Count changed to:', this.count());
    });
  }
}`,description:"Modern reactive programming with Signals"},{title:"Migration Example: Converting Old to New",language:"typescript",code:`// OLD WAY (Traditional)
@Component({
  template: \`
    <input [(ngModel)]="searchQuery">
    <p>Results: {{filteredItems.length}}</p>
  \`
})
export class OldSearchComponent {
  searchQuery = '';
  items = ['Apple', 'Banana', 'Cherry'];
  
  get filteredItems() {
    return this.items.filter(item => 
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

// NEW WAY (Signals)
@Component({
  template: \`
    <input [value]="searchQuery()" (input)="searchQuery.set($event.target.value)">
    <p>Results: {{filteredItems().length}}</p>
  \`
})
export class NewSearchComponent {
  searchQuery = signal('');
  items = signal(['Apple', 'Banana', 'Cherry']);
  
  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.items().filter(item => 
      item.toLowerCase().includes(query)
    );
  });
}

// MIXED APPROACH (During Migration)
@Component({
  template: \`
    <!-- Still using old ngModel for now -->
    <input [(ngModel)]="legacyValue">
    
    <!-- New components use signals -->
    <app-new-component [data]="newSignal()"></app-new-component>
  \`
})
export class MixedComponent {
  legacyValue = 'Old value';  // Will migrate later
  newSignal = signal('New reactive value');
}`,description:"How to transition from traditional to Signals"}],bestPractices:["For new Angular 17+ projects, start with Signals","For existing projects, gradually migrate to Signals","Use computed() for values derived from other signals","Avoid using effect() for UI updates - use templates instead","Combine both approaches during migration phase","Update Angular regularly to get latest features","Use model() for two-way binding with Signals","Keep traditional binding for simple, isolated cases","Test both approaches to see performance differences","Follow Angular team recommendations for best practices"]};var bo={title:"Angular Decorators: In-Depth Explanation, Types, Usage, Custom Decorators, and Best Practices",tags:["Angular","Decorators","TypeScript","Metadata","Component","Directive","Pipe","Injectable","Custom Decorators","Best Practices"],paragraphs:["Decorators are a core feature of Angular and one of the most powerful capabilities borrowed from TypeScript. They are special kind of declarations that can attach metadata to classes, methods, properties, parameters, or accessors, and Angular uses them extensively to define components, directives, pipes, services, modules, and more. Decorators allow Angular to collect configuration information at design time and use it at runtime to control behavior, dependency injection, change detection, and rendering. This comprehensive guide explains decorators in detail: how they work, all the built-in Angular decorators, how to create custom decorators, parameter decorators, property decorators, method decorators, advanced patterns, and best practices for writing clean, maintainable, and powerful Angular applications."],keyPoints:["Decorators: Functions that add metadata and modify behavior of classes/methods/properties.","Built-in Angular Decorators: @Component, @Directive, @Pipe, @Injectable, @NgModule, @Input, @Output, @HostListener, @HostBinding, etc.","Class Decorators: Modify or observe the class definition (most common in Angular).","Property & Parameter Decorators: Used for inputs, injections, bindings (@Input, @Inject, @Optional).","Method Decorators: Used for event handling (@HostListener).","Custom Decorators: Create reusable behavior for validation, logging, authorization, etc.","Metadata Reflection: Angular uses reflect-metadata to read decorator information at runtime."],sections:[{id:"what-are-decorators",heading:"What Are Decorators in Angular / TypeScript?",content:"Decorators are a TypeScript feature (enabled with experimentalDecorators) that allow you to attach metadata to classes, methods, properties, or parameters using a special syntax (@expression). In Angular, decorators are the primary way to tell the framework how to process and use your classes.",list:["Executed at runtime when the class is defined (not when instantiated)","Can modify the constructor, add metadata, or wrap behavior","Angular reads decorator metadata using reflect-metadata library","Syntax: @DecoratorName(options) or @DecoratorName","Can be stacked (multiple decorators on the same target)"],additionalExplanation:"Without decorators, Angular would require much more boilerplate (manual registration, explicit configuration). Decorators make Angular declarative and expressive \u2014 you describe what something is, and Angular handles how it behaves."},{id:"how-decorators-work",heading:"How Decorators Work Under the Hood",content:"Decorators are functions that receive specific arguments depending on what they decorate (class, property, method, parameter). They are called at definition time and can return a value to replace or modify the target.",list:["Class decorator receives the constructor function","Property decorator receives target and property name","Method decorator receives target, property name, and descriptor","Parameter decorator receives target, property name, and parameter index","Angular stores metadata using Reflect.defineMetadata()"],additionalExplanation:"The reflect-metadata polyfill is required (included by default in Angular CLI projects). Angular's compiler uses this metadata to generate efficient rendering instructions, DI tokens, and more."},{id:"built-in-angular-decorators",heading:"Built-in Angular Decorators",content:"Angular provides a rich set of decorators for defining building blocks and configuring behavior.",list:["@Component \u2014 Defines a component with template, styles, selector, etc.","@Directive \u2014 Defines attribute or structural directives","@Pipe \u2014 Defines custom pipes (pure/impure)","@Injectable \u2014 Marks a class as injectable (provides DI metadata)","@NgModule \u2014 Defines Angular modules (deprecated in favor of standalone)","@Input \u2014 Binds property to parent input","@Output \u2014 Creates an event emitter for parent communication","@HostListener \u2014 Listens to host element events","@HostBinding \u2014 Binds host element properties/attributes","@ViewChild / @ViewChildren \u2014 Queries view DOM","@ContentChild / @ContentChildren \u2014 Queries projected content","@Optional, @SkipSelf, @Self, @Inject \u2014 Fine-tune dependency injection"],additionalExplanation:"These decorators are the language Angular uses to describe your application's structure and behavior."},{id:"custom-decorators",heading:"Creating Custom Decorators",content:"You can create your own decorators to encapsulate reusable behavior, such as logging, validation, authorization checks, or metadata collection.",list:["Class decorator: function MyDecorator(config) { return function (constructor) {...} }","Property decorator: function LogProperty(target, propertyKey) {...}","Method decorator: function LogMethod(target, propertyKey, descriptor) {...}","Parameter decorator: function LogParameter(target, propertyKey, parameterIndex) {...}","Factory pattern: function MyDecorator(options) { return function(target) {...} }"],additionalExplanation:"Custom decorators are especially useful in libraries, enterprise applications, or when enforcing conventions (e.g., @LogExecutionTime, @Authorize, @Deprecated)."},{id:"advanced-decorator-patterns",heading:"Advanced Decorator Patterns & Use Cases",content:"Decorators become even more powerful when combined creatively.",list:["Decorator factories (accept parameters)","Combining multiple decorators","Storing and reading custom metadata with Reflect.getMetadata","Decorators for validation (like class-validator style)","Decorators for automatic subscription cleanup","Decorators that enforce architectural rules"],additionalExplanation:"Advanced usage can dramatically reduce boilerplate and enforce consistency across large codebases."}],codeExamples:[{title:"Basic @Component Decorator",language:"typescript",code:`@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: \`<h1>{{ name }}</h1>\`,
  styles: ['h1 { color: blue; }']
})
export class HeroComponent {
  name = 'Superman';
}`,description:"Standard component definition using @Component."},{title:"Custom Class Decorator Example",language:"typescript",code:`function LogClass(message: string) {
  return function (constructor: Function) {
    console.log(\`\${message}: \${constructor.name} created\`);
  };
}

@LogClass('Class Instantiation')
export class UserService {
  // ...
}`,description:"Simple class decorator that logs when the class is defined."},{title:"Custom Method Decorator \u2013 Log Execution Time",language:"typescript",code:`function LogTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.time(propertyKey);
    const result = originalMethod.apply(this, args);
    console.timeEnd(propertyKey);
    return result;
  };
  return descriptor;
}

export class DataService {
  @LogTime
  fetchLargeData() {
    // expensive operation
  }
}`,description:"Method decorator that measures and logs execution time."},{title:"Custom Parameter Decorator \u2013 Mark Required",language:"typescript",code:`function Required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata('required', target, propertyKey) || [];
  Reflect.defineMetadata('required', [...existingRequiredParameters, parameterIndex], target, propertyKey);
}

export class UserController {
  createUser(@Required name: string, age: number) {
    // validation logic can read metadata
  }
}`,description:"Parameter decorator to mark required parameters (can be used with validation logic)."}],bestPractices:["Use built-in Angular decorators for their intended purpose \u2014 don't reinvent them.","Keep custom decorators small and focused (single responsibility).","Always document custom decorators: purpose, parameters, usage examples.","Prefer decorator factories when configuration is needed.","Avoid heavy logic inside decorators \u2014 they run at definition time.","Use metadata reflection carefully \u2014 it's powerful but can make debugging harder.","Test custom decorators thoroughly (especially method/property ones).","In large teams, establish conventions for custom decorator usage.","Be cautious with method decorators that replace behavior \u2014 preserve original functionality.","Combine decorators sensibly \u2014 order can matter in some cases.","In modern Angular (standalone), decorators remain just as important."]};var yo={title:"Angular Dependency Injection (DI): Complete Guide with Deep Explanation, Examples, and Best Practices",tags:["Angular","Dependency Injection","DI","Providers","Injectors","Services","Injection Tokens","Best Practices","Architecture"],paragraphs:["Dependency Injection (DI) is one of the most powerful and fundamental design patterns in Angular. It is the mechanism that Angular uses to provide and manage dependencies across your application in a clean, testable, and maintainable way. DI eliminates the need to manually create instances of services, components, or other objects, allowing Angular to handle instantiation, scoping, and lifecycle automatically. This comprehensive guide covers everything you need to know about Angular's dependency injection system: how it works, the injector hierarchy, provider types, injection tokens, hierarchical injectors, providedIn syntax, standalone components DI, advanced patterns, and best practices to build scalable, testable Angular applications."],keyPoints:["Dependency Injection: A design pattern where dependencies are provided to a class instead of the class creating them itself.","Injector Hierarchy: Angular creates a tree of injectors mirroring the component tree, enabling scoped and hierarchical dependency resolution.","Providers: Define how to create and provide instances (useClass, useValue, useFactory, useExisting).","providedIn: 'root' vs 'providedIn: SomeModule' vs providedIn: 'platform' vs providedIn: 'any'.","Injection Tokens: Used to provide and inject non-class dependencies (constants, functions, configurations).","Standalone DI: Modern Angular (14+) simplifies DI with direct imports and bootstrapApplication providers.","Testing: DI makes unit testing extremely easy by allowing easy mocking of dependencies."],sections:[{id:"what-is-dependency-injection",heading:"What is Dependency Injection?",content:"Dependency Injection is a technique in which an object receives its dependencies from an external source rather than creating them itself. In Angular, the DI system is responsible for creating instances of services, resolving their dependencies, and injecting them where needed \u2014 typically into constructors of components, directives, pipes, or other services.",list:["Promotes loose coupling between classes","Makes code easier to test (mock dependencies)","Centralizes configuration and instance management","Enables reusability and modularity","Automatically handles singleton vs transient behavior"],additionalExplanation:"Without DI, you would manually instantiate services inside components (new MyService()), leading to tight coupling, hard-to-test code, and duplicated creation logic. Angular's DI solves all of these problems elegantly."},{id:"how-angular-di-works",heading:"How Angular's Dependency Injection Works",content:"Angular maintains a hierarchical tree of injectors that parallels the component tree. When a class requests a dependency via constructor injection, Angular looks for it first in the component's injector, then walks up the tree to parent injectors, all the way to the root injector.",list:["Root Injector: Created at application bootstrap, provides application-wide singletons","Module Injectors: Each NgModule can have its own injector (providers array)","Component Injectors: Every component and directive has its own injector","Resolution Path: Child \u2192 Parent \u2192 Grandparent \u2192 ... \u2192 Root","providedIn: 'root' = singleton at root level"],additionalExplanation:"This hierarchical system allows different parts of the app to have different instances of the same service (scoped DI) or share a single instance (singleton behavior)."},{id:"providers-and-registration",heading:"Providers \u2013 How to Register Dependencies",content:"Providers tell Angular how to create and deliver an instance when a dependency is requested. They can be defined in @NgModule, @Component, @Directive, or via providedIn.",list:["useClass: Provide an alternative implementation (great for mocking)","useValue: Provide a static value (configs, constants)","useFactory: Dynamic creation logic (useful for conditional providers)","useExisting: Alias one token to another","providedIn: 'root' \u2192 application-wide singleton (most common)","providedIn: 'platform' \u2192 shared across multiple Angular apps","providedIn: 'any' \u2192 one instance per lazy-loaded module","providedIn: SomeModule \u2192 scoped to that module"],additionalExplanation:"The providedIn syntax (introduced in Angular 6) is now the recommended way to register services because it enables tree-shaking and eliminates the need to add services to the providers array manually."},{id:"injection-tokens",heading:"Injection Tokens \u2013 Non-Class Dependencies",content:"Not all dependencies are classes. For values, functions, or configurations, you use InjectionToken to create a unique token that can be provided and injected.",list:["const API_URL = new InjectionToken<string>('API_URL');","Provide using { provide: API_URL, useValue: 'https://api.example.com' }","Inject using @Inject(API_URL) private apiUrl: string","Very useful for environment configs, themes, feature flags, etc."],additionalExplanation:"InjectionToken gives type safety and prevents naming collisions when providing primitive values or objects."},{id:"standalone-components-di",heading:"Dependency Injection in Standalone Components",content:"In modern Angular (14+), standalone components and applications eliminate NgModules in many cases. DI is configured directly at bootstrap or via imports.",list:["bootstrapApplication(AppComponent, { providers: [...] })","Environment providers: importProvidersFrom(), provideRouter(), provideHttpClient()","Component-level providers still work: @Component({ providers: [...] })","Services with providedIn: 'root' continue to work seamlessly"],additionalExplanation:"Standalone DI reduces boilerplate, improves tree-shaking, and aligns with the direction of modern Angular development."},{id:"advanced-di-patterns",heading:"Advanced DI Patterns and Techniques",content:"Angular's DI system supports powerful patterns for complex applications.",list:["Multi providers: Provide multiple values under the same token (multi: true)","Optional dependencies: @Optional() \u2013 doesn't throw if missing","SkipSelf: @SkipSelf() \u2013 looks only in parent injectors","Self: @Self() \u2013 looks only in own injector","Host: @Host() \u2013 looks up to the host component injector","Factory providers with dependencies: useFactory with deps array"],additionalExplanation:"These modifiers give fine-grained control over where Angular looks for dependencies \u2014 critical in deeply nested or library scenarios."}],codeExamples:[{title:"Basic Service with providedIn: 'root'",language:"typescript",code:`import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return ['Item 1', 'Item 2'];
  }
}`,description:"Most common and recommended way to create a singleton service."},{title:"Component-Level Provider (Scoped Instance)",language:"typescript",code:`@Component({
  selector: 'app-user',
  template: '...',
  providers: [UserService] // new instance for this component and children
})
export class UserComponent {
  constructor(private userService: UserService) {}
}`,description:"Each instance of UserComponent gets its own UserService instance."},{title:"Injection Token + useValue Example",language:"typescript",code:`import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('AppConfig');

export interface AppConfig {
  apiUrl: string;
  timeout: number;
}

// In bootstrap or module providers:
{ provide: APP_CONFIG, useValue: { apiUrl: 'https://api.com', timeout: 5000 } }

// In component/service:
constructor(@Inject(APP_CONFIG) private config: AppConfig) {}`,description:"Safe, type-safe way to inject configuration objects."},{title:"Standalone Application Bootstrap with Providers",language:"typescript",code:`import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: 'API_KEY', useValue: 'xyz123' }
  ]
});`,description:"Modern way to bootstrap a standalone Angular application with DI."}],bestPractices:["Use providedIn: 'root' for most services that should be singletons.","Use component-level providers only when you intentionally need scoped instances.","Prefer InjectionToken for configurations, constants, and non-class dependencies.","Avoid large provider arrays in components \u2014 prefer root or module-level when possible.","Leverage @Optional(), @SkipSelf(), etc. only when needed and document their usage.","Always provide mocks in unit tests using TestBed.configureTestingModule({ providers: [...] }).","Use environment files + InjectionToken for different build configurations (dev, prod).","Keep services small and focused \u2014 follow single responsibility principle.","In standalone apps, centralize most providers at bootstrapApplication level.","Monitor DI tree complexity in large apps \u2014 avoid deep unnecessary scoping."]};var xo={title:"Angular Directives and Custom Directives: Comprehensive Explanation and Implementation Guide",tags:["Angular","Directives","Custom Directives","Structural Directives","Attribute Directives","Architecture","Best Practices"],paragraphs:["Directives in Angular are powerful tools that allow developers to extend HTML with custom behavior, manipulate the DOM, and create reusable UI logic. They are classified into built-in and custom directives, with custom ones enabling tailored functionality for specific application needs. This in-depth guide explores the fundamentals of directives, their types, how to create custom directives, and advanced usage scenarios. We'll delve into attribute directives for styling and behavior, structural directives for DOM manipulation, and best practices to ensure efficient, maintainable code. Whether you're a beginner or an experienced developer, this content provides detailed insights, code examples, and tips to make your Angular applications more dynamic and effective."],keyPoints:["Directives: Instructions in the DOM that tell Angular to do something with a specific element or component.","Built-in Directives: Include ngIf, ngFor, ngClass, ngStyle for common tasks like conditional rendering and styling.","Custom Directives: User-defined directives to encapsulate reusable behavior, such as highlighting elements or validating inputs.","Types: Attribute directives change appearance or behavior; Structural directives alter DOM layout by adding/removing elements.","Lifecycle: Directives have hooks like ngOnInit and ngOnDestroy for initialization and cleanup.","Standalone Directives: In Angular 14+, directives can be standalone, simplifying usage without modules."],sections:[{id:"what-are-directives",heading:"What Are Directives in Angular?",content:"Directives are markers on DOM elements that Angular uses to attach behavior, transform the DOM, or render components. They are a core feature of Angular's declarative template syntax, allowing developers to create dynamic and interactive UIs without writing imperative JavaScript code directly in templates.",list:["Declared using the @Directive decorator","Can be applied to elements, components, or even other directives","Enhance HTML semantics, making templates more readable and maintainable","Integrate seamlessly with Angular's change detection for automatic updates"],additionalExplanation:"Directives bridge the gap between static HTML and dynamic application logic. For instance, a directive might highlight an element on hover or lazy-load images based on viewport visibility. Understanding directives is key to mastering Angular's template-driven approach, as they promote reusability and separation of concerns."},{id:"built-in-directives",heading:"Built-in Directives",content:"Angular provides a set of built-in directives out of the box, categorized into attribute and structural types. These handle common scenarios like conditional rendering, looping, and styling, reducing the need for custom implementations in basic cases.",list:["Attribute Directives: ngClass (conditional classes), ngStyle (inline styles), ngModel (two-way binding)","Structural Directives: *ngIf (conditional display), *ngFor (looping over collections), *ngSwitch (switch-case logic)","Other: [hidden] (toggle visibility), [attr] (dynamic attributes), [style] (dynamic styles)"],additionalExplanation:"Built-in directives are imported from CommonModule and can be used directly in templates. They are optimized for performance and integrate with Angular's renderer for safe DOM manipulation. For complex needs, built-in directives serve as a foundation for creating custom ones."},{id:"custom-directives",heading:"Custom Directives",content:"Custom directives allow developers to create reusable behaviors not covered by built-in ones. They can respond to events, manipulate host elements, or inject dependencies, making them versatile for application-specific logic.",list:["Created with @Directive({ selector: '[appCustom]' })","Can use @Input for data binding, @Output for events, @HostListener for event handling","Support dependency injection via constructor for services","Can be attribute-based (no template changes) or structural (with template manipulation)"],additionalExplanation:"Custom directives encapsulate logic that would otherwise clutter components, promoting cleaner code. For example, a custom directive could implement drag-and-drop functionality or auto-focus inputs. In larger applications, they enhance modularity by allowing behaviors to be applied declaratively across multiple components."},{id:"attribute-vs-structural",heading:"Attribute vs Structural Directives",content:"Directives are broadly divided into attribute and structural types based on their impact on the DOM.",list:["Attribute Directives: Modify the appearance or behavior of an element without changing the DOM structure (e.g., changing color on hover).","Structural Directives: Alter the DOM layout by adding, removing, or manipulating elements (e.g., conditionally rendering a section with *ngIf). Identified by a leading asterisk (*) in templates."],additionalExplanation:"Structural directives use TemplateRef and ViewContainerRef for DOM manipulation, allowing creation of embedded views. Attribute directives often use ElementRef or Renderer2 for safe access to the host element. Choosing the right type depends on whether you need to change 'what' is rendered (structural) or 'how' it's rendered (attribute)."},{id:"lifecycle-and-advanced-features",heading:"Lifecycle Hooks and Advanced Features",content:"Custom directives inherit lifecycle hooks similar to components, enabling timed executions. Advanced features include host bindings and multi-element selectors.",list:["Lifecycle Hooks: ngOnChanges, ngOnInit, ngDoCheck, ngOnDestroy for managing state and resources.","@HostBinding: Binds properties or classes to the host element (e.g., @HostBinding('style.backgroundColor') color: string;).","@HostListener: Listens to host events (e.g., @HostListener('mouseenter') onMouseEnter() {}).","Multi-Element Directives: Use selectors like '[appHighlight] p' to apply to multiple elements."],additionalExplanation:"Leverage hooks for initialization (e.g., setting up event listeners in ngOnInit) and cleanup (e.g., removing listeners in ngOnDestroy to prevent memory leaks). Advanced usage includes creating directive compositions or using them with Angular forms for custom validators."},{id:"standalone-directives",heading:"Standalone Directives",content:"Introduced in Angular 14, standalone directives simplify usage by not requiring declaration in NgModules, aligning with the shift towards module-less architecture.",list:["Marked with standalone: true in @Directive","Import dependencies directly in the imports array","Easily shareable across standalone components or modules","Enhance tree-shaking for smaller bundles"],additionalExplanation:"Standalone directives reduce boilerplate in modern Angular apps. They can be imported directly into components, making them ideal for libraries or micro-frontends. During migration, add standalone: true and move to direct imports."}],codeExamples:[{title:"Basic Attribute Directive Example",language:"typescript",code:`import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}`,description:"A custom attribute directive that highlights the host element on mouse enter and removes it on leave."},{title:"Structural Directive Example",language:"typescript",code:`import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
  standalone: true
})
export class UnlessDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}`,description:"A custom structural directive that renders the template only if the condition is false, similar to the opposite of *ngIf."},{title:"Directive with Input and HostBinding Example",language:"typescript",code:`import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBorder]',
  standalone: true
})
export class BorderDirective {
  @Input() appBorder: string = '1px solid black';

  @HostBinding('style.border') get border() {
    return this.appBorder;
  }
}`,description:"An attribute directive that applies a dynamic border style to the host element via input binding."},{title:"Using Directives in Template Example",language:"html",code:`<div appHighlight>Hover me to highlight!</div>
<p *appUnless="condition">This shows if condition is false.</p>
<button [appBorder]="'2px dashed red'">Styled Button</button>`,description:"Template usage demonstrating application of custom directives."}],bestPractices:["Keep directives focused: Follow the single responsibility principle; one directive per behavior.","Use Renderer2 for DOM manipulation: Avoid direct ElementRef access for server-side rendering compatibility.","Handle lifecycle properly: Always clean up in ngOnDestroy to prevent memory leaks, especially with subscriptions or event listeners.","Prefer standalone directives: For new projects, use standalone to reduce module clutter and improve modularity.","Test directives in isolation: Use Angular's testing utilities to verify behavior without full components.","Document selectors and inputs: Clearly comment directive usage for team collaboration.","Optimize for performance: Avoid expensive operations in frequently triggered hooks; leverage change detection strategies.","Combine with other features: Integrate directives with pipes, services, or animations for richer functionality.","Avoid overusing structural directives: They can impact performance; use attribute directives where possible for lighter DOM changes."]};var Co={title:"Angular Template-Driven Forms: Complete Implementation Guide \u2014 [(ngModel)], Validation, and Lifecycle",tags:["Angular","FormsModule","ngModel","Template-Driven Forms","Validation","Form State"],paragraphs:["Template-driven forms are the primary way to handle simple forms in Angular, leveraging directives in the template to manage data binding and validation. This approach is best suited for forms with straightforward requirements and minimal dynamic logic. By using the FormsModule and ngModel directive, Angular automatically creates a form model that mirrors the template structure, providing properties for value tracking, validation status (valid/invalid), and user interaction state (pristine/dirty/touched)."],keyPoints:["FormsModule: Must be imported into the component's imports array or NgModule","[(ngModel)]: Two-way data binding that synchronizes the template value with the component model","name Attribute: Required on each form element for Angular to register it with the parent form","ngForm: Template reference variable (#form='ngForm') used to access the entire form's state and value","Validation Directives: Built-in attributes like required, minlength, maxlength, and pattern","Form State: pristine (not changed), dirty (changed), touched (blurred), untouched (not blurred)","Control State: Individual controls also have their own validity and interaction state variables","onSubmit: Standard event handler typically bound to (ngSubmit) on the form element","reset(): Method available on ngForm to clear the form value and validation state"],sections:[{id:"template-forms-basics",heading:"Basic Setup and [(ngModel)]",content:"To use template-driven forms, import FormsModule and use ngModel for binding.",list:["Import FormsModule from @angular/forms","Add [(ngModel)]='property' to form inputs","Ensure each input has a unique 'name' attribute","Use a template reference variable: <form #userForm='ngForm'>","Access form data: userForm.value","Check form validity: userForm.valid"],additionalExplanation:"The [(ngModel)] directive is the heart of template-driven forms. It creates a FormControl instance behind the scenes and binds it to the element. The 'name' attribute is crucial because it acts as the key in the form.value object."},{id:"validation-feedback",heading:"Validation and User Feedback",content:"Angular provides CSS classes and status properties for real-time validation feedback.",list:["HTML Validators: required, minlength='3', pattern='[a-z]*'","Status Classes: .ng-valid, .ng-invalid, .ng-touched, .ng-dirty","Error Messages: Show errors only after user interaction (*ngIf='ctrl.invalid && ctrl.touched')","Control Reference: #nameCtrl='ngModel' to access individual control state","Submit Control: Disable button until valid: [disabled]='!userForm.valid'"],additionalExplanation:"Always wait for the 'touched' or 'dirty' state before showing error messages to avoid 'yelling' at the user as soon as the page loads. The .ng-invalid class can be used to style borders or backgrounds for immediate visual cues."}],codeExamples:[{title:"Complete Template-Driven Form Implementation",language:"typescript",code:`import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: \`
    <form #regForm='ngForm' (ngSubmit)='onRegister(regForm)'>
      <div class='field'>
        <label>Username</label>
        <input 
          name='username' 
          [(ngModel)]='user.name' 
          required 
          minlength='4'
          #userCtrl='ngModel'>
        <span *ngIf='userCtrl.invalid && userCtrl.touched' class='error'>
          Username must be at least 4 characters
        </span>
      </div>

      <div class='field'>
        <label>Email</label>
        <input 
          name='email' 
          type='email'
          [(ngModel)]='user.email' 
          required 
          email
          #emailCtrl='ngModel'>
        <span *ngIf='emailCtrl.invalid && emailCtrl.touched' class='error'>
          Valid email is required
        </span>
      </div>

      <button type='submit' [disabled]='regForm.invalid'>Register</button>
      <button type='button' (click)='regForm.reset()'>Reset</button>
    </form>
  \`
})
export class RegistrationComponent {
  user = { name: '', email: '' };

  onRegister(form: NgForm) {
    if (form.valid) {
      console.log('User registered:', form.value);
      // Actual registration logic
    }
  }
}`}],bestPractices:["Always export ngForm via template reference (#form='ngForm') to access form state in template","Use one-way binding [ngModel] instead of [(ngModel)] when immediate sync isn't needed (better performance)","Always expose control state variables (#ctrl='ngModel') for accurate validation feedback","Group related fields with ngModelGroup to create structured form values and sectional validation","Create reusable custom validator directives for validation logic used across multiple forms","Use trackBy with ngFor + ngModelGroup to prevent performance issues in dynamic sections","Reset forms using form.reset() rather than manually clearing model (resets validation state too)","Prefer Reactive Forms when form structure is dynamic or exceeds 30-50 fields","Combine FormsModule with OnPush change detection using immutable data updates","Implement ControlValueAccessor for custom form controls to work seamlessly with ngModel","Use form.submitted property to show validation errors after first submission attempt","Keep template logic minimal - extract complex validation conditions to component getters"]};var wo={title:"Angular Form Validation: Complete Guide \u2013 Built-in Validators, Custom Sync Validators, Async Validators, Cross-Field Validation, Dynamic Validation, Error Handling, and UX Patterns",tags:["Angular","Validation","Custom Validators","Async Validators","Cross-Field Validation","Error Handling","Form Validation","Validator Functions"],paragraphs:["Form validation is the cornerstone of good user experience and data integrity. Angular provides a comprehensive validation system that works seamlessly with both Template-Driven and Reactive Forms. This complete guide covers every aspect of form validation: built-in validators (required, email, minlength, pattern, etc.), creating reusable custom synchronous validators, implementing async validators for server-side checks (unique username, available dates), cross-field validation (password confirmation, date ranges), dynamic validation rules that change based on form state, conditional validation, proper error message display strategies, accessibility considerations, and performance optimization for validation. You'll learn how to create a validation system that's both user-friendly and maintainable."],keyPoints:["Built-in validators cover common cases: required, email, min, max, minLength, maxLength, pattern, requiredTrue","Custom sync validators: pure functions returning ValidationErrors | null","Custom async validators: return Observable<ValidationErrors | null> (server-side checks)","Cross-field validation: implemented at FormGroup/FormArray level, not individual FormControl","Validation runs on every value change by default (updateOn: 'change' | 'blur' | 'submit')","Error objects contain metadata: pattern required pattern, minlength includes required/actual lengths","Status flags: valid, invalid, pending, disabled, enabled","Validator composition: multiple validators execute in parallel","Async validators show 'pending' status while validating","Dynamic validation: add/remove validators at runtime"],sections:[{id:"built-in-validators",heading:"Built-in Validators \u2013 Complete API Reference",content:"Angular ships with a comprehensive set of built-in validators covering the most common validation scenarios. Understanding their precise behavior is crucial for correct implementation.",list:["Validators.required: Fails if value is null, undefined, empty string, or empty array","Validators.requiredTrue: Specifically for checkboxes requiring true value","Validators.email: RFC 5322 compliant email pattern validation","Validators.minLength(n): Valid only if value.length >= n (string or array)","Validators.maxLength(n): Valid only if value.length <= n","Validators.min(n): Valid only if numeric value >= n","Validators.max(n): Valid only if numeric value <= n","Validators.pattern(regex|string): Valid if value matches regex pattern","Validators.nullValidator: Does nothing (useful for conditional validation)","Validators.compose([...]): Combine multiple validators into one","Validators.composeAsync([...]): Combine multiple async validators"],additionalExplanation:"Important nuances: required treats empty string as invalid, while whitespace is considered valid (use custom pattern to reject whitespace). email validator is strict - 'test@test' fails because no TLD. min/max work with numbers only - string numbers like '5' won't work without conversion. minLength/maxLength work with arrays too (useful for FormArray)."},{id:"custom-sync-validators",heading:"Custom Synchronous Validators \u2013 Factory Functions and Parameterization",content:"Custom synchronous validators are pure functions that take an AbstractControl and return either null (valid) or a ValidationErrors object (invalid). The factory pattern enables parameterized validators.",list:["Basic validator: function forbiddenName(control: AbstractControl): ValidationErrors | null","Factory pattern: export function forbiddenNameValidator(forbiddenRegex: RegExp): ValidatorFn","Return format: { errorKey: true } or { errorKey: { value: 'failedValue', ...metadata } }","Multiple errors: Can return multiple errors simultaneously","Control types: Handle different control types gracefully (FormControl, FormGroup, FormArray)","Composition: Combine with built-in validators using Validators.compose","Registration: Use directly in FormControl validators array","Testing: Pure functions are trivially testable"],additionalExplanation:"Custom validators should be pure functions with no side effects. Factory functions are essential for validators that need configuration (like a forbidden word list). ValidationErrors objects should be descriptive - include the invalid value, expected format, or other metadata to help templates display meaningful error messages. Always handle null/undefined values gracefully - typically pass validation (return null) for empty values unless combined with required."},{id:"async-validators",heading:"Async Validators \u2013 Server-Side Validation Patterns",content:"Async validators handle validation that requires server communication, such as checking username availability, validating credit cards, or verifying zip codes. They return Observables or Promises.",list:["Implementation: (control: AbstractControl) => Observable<ValidationErrors | null>","Pending state: control.pending = true while async validation in progress","Debouncing: Always debounce async validators to prevent API spam","DistinctUntilChanged: Only validate when value actually changes","SwitchMap: Cancel in-flight requests when new value arrives","Error handling: Catch server errors and return null (or specific error)","Timing: Async validators run after sync validators pass","Multiple async validators: Run in parallel via Validators.composeAsync","Update strategy: Consider updateOn: 'blur' for async validation","Loading indicators: Show spinner while control.pending === true"],additionalExplanation:"Async validators are often misunderstood. They only run if all synchronous validators pass. Always include takeUntil or proper unsubscription to prevent memory leaks. The pending state is automatically managed - use it to show loading spinners. For optimal UX, combine with debounceTime(300-500) and distinctUntilChanged, and consider updateOn: 'blur' to avoid validating on every keystroke."},{id:"cross-field-validation",heading:"Cross-Field Validation \u2013 FormGroup and FormArray Level",content:"Cross-field validation validates relationships between multiple controls. Since individual FormControls don't know about each other, these validators must be attached at the FormGroup or FormArray level.",list:["FormGroup validator: function that receives entire FormGroup, accesses child controls via .get()","Password confirmation: Compare password and confirmPassword fields","Date ranges: Ensure end date >= start date","Conditional required: Field A required if Field B has certain value","FormArray validation: Ensure unique values across array items","Implementation: Validator receives AbstractControl (cast to FormGroup/FormArray)","Error attachment: Errors appear on the group/array, not individual controls","Template display: Access errors via form.get('groupName')?.errors"],additionalExplanation:"Cross-field validators are often implemented incorrectly. Remember: the error is attached to the group, not the individual controls. When showing error messages, you need to check the group's errors. For password confirmation, the error should appear near the confirm password field, but the validator runs on the group. A common pattern is to set the error on the specific sub-control manually, but the clean approach is to display group errors near the relevant field."},{id:"dynamic-validation",heading:"Dynamic Validation \u2013 Runtime Validator Changes",content:"Dynamic validation adapts validation rules based on form state, user roles, or application conditions. Angular provides APIs to add, remove, and replace validators at runtime.",list:["Add validator: control.addValidators(validatorFn)","Remove validator: control.removeValidators(validatorFn)","Replace all: control.setValidators([...])","Clear validators: control.setValidators(null)","Update validity: Must call control.updateValueAndValidity() after changes","Conditional validation: Add/remove required based on checkbox value","Role-based validation: Different validation rules for admin vs user","Async dynamic: Change async validators based on selected validation method","Performance: Avoid frequent validator changes on high-frequency events","Factory reset: Remember to clear old validators before adding new ones"],additionalExplanation:"Dynamic validation is powerful but easy to misuse. The most common mistake is forgetting to call updateValueAndValidity() after modifying validators - the form continues using the old validation rules. Also, when replacing validators, clear the old ones first with setValidators([]) or setValidators(null). For complex conditional validation, consider creating a single validator that internally checks conditions rather than dynamically adding/removing validators."},{id:"error-display-ux",heading:"Error Display Strategies \u2013 UX Patterns and Accessibility",content:"How and when to display validation errors significantly impacts user experience. Angular provides status flags to implement sophisticated error display strategies.",list:["Immediate feedback: Show errors as user types (valid but aggressive)","On blur: Show errors when field loses focus (balanced approach)","On submit: Show all errors after form submission (patient approach)","Conditional display: *ngIf='control.invalid && (control.touched || form.submitted)'","Error aggregation: Show all form errors in summary at top/bottom","Inline errors: Display error next to each field","Tooltip errors: Show errors on hover/focus (space-efficient)","Accessibility: aria-describedby, aria-invalid, role='alert', live regions","Styling: Visual indicators (red border) + text + icons","Debounced validation: Wait for pause in typing before showing errors"],additionalExplanation:"The consensus best practice is: show field-level errors after the field has been touched AND is invalid, and show all errors after form submission attempt. This avoids overwhelming users with errors before they've had a chance to complete the form. The markAllAsTouched() method is essential for showing all errors on submit. Always combine visual indicators with text explanations, and ensure error messages are accessible to screen readers."}],codeExamples:[{title:"Complete Validation Library \u2013 Reusable Validators",language:"typescript",code:`import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, FormArray } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// ==================== SYNC VALIDATORS ====================

export class CustomValidators {
  
  /**
   * Validates that value contains at least one uppercase, one lowercase, one number
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      
      const valid = hasUpperCase && hasLowerCase && hasNumeric;
      return valid ? null : { weakPassword: true };
    };
  }

  /**
   * Validates that value is not only whitespace
   */
  static notOnlyWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const isValid = value.trim().length > 0;
      return isValid ? null : { whitespace: true };
    };
  }

  /**
   * Validates that value is a valid phone number (configurable)
   */
  static phoneNumber(countryCode: string = 'US'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const patterns: Record<string, RegExp> = {
        'US': /^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$/,
        'UK': /^((\\+44)|(0))\\d{10}$/,
        'DE': /^\\+49\\d{10,11}$/
      };
      
      const pattern = patterns[countryCode] || patterns['US'];
      const isValid = pattern.test(value);
      
      return isValid ? null : { 
        phone: { 
          value, 
          countryCode,
          message: \`Invalid phone format for \${countryCode}\` 
        } 
      };
    };
  }

  /**
   * Validates that value matches a regex pattern with custom error message
   */
  static patternWithMessage(pattern: RegExp, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const isValid = pattern.test(value);
      return isValid ? null : { pattern: { requiredPattern: pattern, actualValue: value, message } };
    };
  }

  /**
   * Validates that array has no duplicate values (for FormArray)
   */
  static uniqueValues(): ValidatorFn {
    return (array: AbstractControl): ValidationErrors | null => {
      if (!(array instanceof FormArray)) return null;
      
      const values = array.controls
        .map(control => control.value)
        .filter(v => v != null && v !== '');
      
      const hasDuplicates = new Set(values).size !== values.length;
      return hasDuplicates ? { duplicateValues: true } : null;
    };
  }

  /**
   * Validates that selected date is not in the past
   */
  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return date >= today ? null : { pastDate: { value: control.value } };
    };
  }

  // ==================== ASYNC VALIDATORS ====================

  /**
   * Async validator to check username availability
   */
  static usernameAvailable(userService: any): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.length < 3) {
        return of(null); // Don't check if too short
      }

      return control.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(username => userService.checkUsername(username)),
        map(isAvailable => isAvailable ? null : { usernameTaken: true }),
        catchError(() => of(null)) // Return null (valid) on API error
      );
    };
  }

  /**
   * Async validator to validate credit card
   */
  static creditCard(paymentService: any): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const cardNumber = control.value?.replace(/\\s/g, '');
      
      if (!cardNumber || cardNumber.length < 15) {
        return of(null);
      }

      return paymentService.validateCard(cardNumber).pipe(
        map(response => response.valid ? null : { 
          creditCard: { 
            message: response.message || 'Invalid card number' 
          } 
        }),
        catchError(() => of(null))
      );
    };
  }

  // ==================== CROSS-FIELD VALIDATORS ====================

  /**
   * Cross-field validator for password confirmation
   */
  static passwordMatch(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirm = group.get(confirmPasswordKey)?.value;
      
      return password === confirm ? null : { 
        passwordMismatch: { 
          message: 'Passwords do not match' 
        } 
      };
    };
  }

  /**
   * Cross-field validator for date range
   */
  static dateRange(startKey: string, endKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = new Date(group.get(startKey)?.value);
      const end = new Date(group.get(endKey)?.value);
      
      if (!start || !end) return null;
      
      return start <= end ? null : { 
        dateRange: { 
          message: 'End date must be after start date' 
        } 
      };
    };
  }

  /**
   * Conditional required validator
   */
  static requiredIf(conditionField: string, conditionValue: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;
      
      const conditionControl = control.parent.get(conditionField);
      const conditionMet = conditionControl?.value === conditionValue;
      
      if (conditionMet && !control.value) {
        return { required: true };
      }
      
      return null;
    };
  }
}

// ==================== VALIDATION ERROR HANDLER ====================

export class ValidationErrorHandler {
  private static errorMessages: Record<string, (error: any) => string> = {
    required: () => 'This field is required',
    email: () => 'Please enter a valid email address',
    minlength: (error) => \`Minimum length is \${error.requiredLength} characters\`,
    maxlength: (error) => \`Maximum length is \${error.requiredLength} characters\`,
    pattern: (error) => error.message || 'Invalid format',
    weakPassword: () => 'Password must contain uppercase, lowercase, and number',
    whitespace: () => 'Cannot be only whitespace',
    phone: (error) => error.message,
    usernameTaken: () => 'Username is already taken',
    passwordMismatch: (error) => error.message,
    dateRange: (error) => error.message,
    pastDate: () => 'Date must be in the future',
    duplicateValues: () => 'Duplicate values are not allowed',
    creditCard: (error) => error.message,
    forbiddenName: (error) => \`'\${error.value}' is not allowed\`
  };

  static getErrorMessage(control: AbstractControl): string | null {
    if (!control.errors) return null;
    
    const firstError = Object.keys(control.errors)[0];
    const errorValue = control.errors[firstError];
    
    return this.errorMessages[firstError]?.(errorValue) || 'Invalid value';
  }

  static getFormErrors(form: FormGroup): Record<string, string[]> {
    const errors: Record<string, string[]> = {};
    
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormGroup) {
        errors[key] = Object.values(this.getFormErrors(control)).flat();
      } else if (control instanceof FormArray) {
        control.controls.forEach((item, index) => {
          if (item instanceof FormGroup) {
            errors[\`\${key}[\${index}]\`] = Object.values(this.getFormErrors(item)).flat();
          }
        });
      } else {
        const error = this.getErrorMessage(control!);
        if (error) {
          errors[key] = [error];
        }
      }
    });
    
    return errors;
  }
}

// ==================== USAGE EXAMPLE ====================
/*
@Component({
  template: \`
    <form [formGroup]='registrationForm'>
      <input formControlName='username' placeholder='Username'>
      <div *ngIf='registrationForm.get("username")?.pending'>
        Checking availability...
      </div>
      <div *ngIf='registrationForm.get("username")?.errors as errors'>
        {{ ValidationErrorHandler.getErrorMessage(registrationForm.get("username")) }}
      </div>
      
      <div formGroupName='passwordGroup'>
        <input formControlName='password' type='password'>
        <input formControlName='confirmPassword' type='password'>
        <div *ngIf='registrationForm.get("passwordGroup")?.errors?.["passwordMismatch"]'>
          Passwords do not match
        </div>
      </div>
    </form>
  \`
})
export class RegistrationComponent {
  ValidationErrorHandler = ValidationErrorHandler;
  
  registrationForm = this.fb.group({
    username: ['', 
      [Validators.required, Validators.minLength(3)],
      [CustomValidators.usernameAvailable(this.userService)]
    ],
    passwordGroup: this.fb.group({
      password: ['', [Validators.required, CustomValidators.strongPassword()]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: CustomValidators.passwordMatch('password', 'confirmPassword')
    }),
    phone: ['', CustomValidators.phoneNumber('US')],
    date: ['', CustomValidators.futureDate()],
    email: ['', [Validators.email]]
  });
}
*/`},{title:"Advanced Validation Directive for Template-Driven Forms",language:"typescript",code:`import { Directive, Input, forwardRef, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { 
  NG_VALIDATORS, 
  NG_ASYNC_VALIDATORS, 
  Validator, 
  AsyncValidator, 
  AbstractControl, 
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appAdvancedValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdvancedValidationDirective),
      multi: true
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AdvancedValidationDirective),
      multi: true
    }
  ]
})
export class AdvancedValidationDirective implements Validator, AsyncValidator, OnDestroy {
  @Input('appAdvancedValidation') validationType: 'username' | 'email' | 'phone' | 'password' = 'username';
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() pattern?: string;
  @Input() customMessage?: string;
  
  private validator: ValidatorFn;
  private asyncValidator: AsyncValidatorFn;
  private subscription?: Subscription;

  constructor(private userService: UserService, private el: ElementRef, private renderer: Renderer2) {
    this.validator = this.createValidator();
    this.asyncValidator = this.createAsyncValidator();
    
    // Add real-time validation feedback
    this.renderer.listen(this.el.nativeElement, 'focus', () => {
      this.renderer.addClass(this.el.nativeElement, 'validation-focused');
    });
    
    this.renderer.listen(this.el.nativeElement, 'blur', () => {
      this.renderer.removeClass(this.el.nativeElement, 'validation-focused');
    });
  }

  private createValidator(): ValidatorFn {
    switch (this.validationType) {
      case 'password':
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value || '';
          const errors: ValidationErrors = {};
          
          if (this.minLength && value.length < this.minLength) {
            errors['minlength'] = { 
              requiredLength: this.minLength, 
              actualLength: value.length 
            };
          }
          
          if (this.maxLength && value.length > this.maxLength) {
            errors['maxlength'] = { 
              requiredLength: this.maxLength, 
              actualLength: value.length 
            };
          }
          
          if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
          if (!/[a-z]/.test(value)) errors['lowercase'] = true;
          if (!/[0-9]/.test(value)) errors['number'] = true;
          if (!/[!@#$%^&*]/.test(value)) errors['special'] = true;
          
          return Object.keys(errors).length > 0 ? errors : null;
        };
        
      case 'phone':
        return CustomValidators.phoneNumber('US');
        
      default:
        return Validators.pattern(this.pattern || '.*');
    }
  }

  private createAsyncValidator(): AsyncValidatorFn {
    switch (this.validationType) {
      case 'username':
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          if (!control.value || control.value.length < 3) {
            return of(null);
          }
          
          return this.userService.checkUsername(control.value).pipe(
            debounceTime(400),
            distinctUntilChanged(),
            map(isAvailable => isAvailable ? null : { usernameTaken: true }),
            catchError(() => of(null))
          );
        };
        
      case 'email':
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          if (!control.value || !Validators.email(control.value)) {
            return of(null);
          }
          
          return this.userService.checkEmail(control.value).pipe(
            debounceTime(400),
            map(isAvailable => isAvailable ? null : { emailTaken: true }),
            catchError(() => of(null))
          );
        };
        
      default:
        return () => of(null);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control);
  }

  validateAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.asyncValidator(control);
  }

  registerOnValidatorChange?(fn: () => void): void {
    // Handle dynamic input changes
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

// Usage in template:
/*
<input 
  name='username'
  [(ngModel)]='user.username'
  appAdvancedValidation='username'
  minLength='3'
  #usernameCtrl='ngModel'>
  
<div *ngIf='usernameCtrl.pending'>Checking availability...</div>
<div *ngIf='usernameCtrl.errors?.usernameTaken'>Username is taken</div>
<div *ngIf='usernameCtrl.errors?.minlength'>
  Minimum length is {{usernameCtrl.errors.minlength.requiredLength}}
</div>
*/
`},{title:"Dynamic Validation Service \u2013 JSON-Based Validation Rules",language:"typescript",code:`import { Injectable } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message?: string;
  condition?: string; // JavaScript expression
  dependsOn?: string; // Field name this validation depends on
}

interface FieldValidationConfig {
  fieldName: string;
  rules: ValidationRule[];
  asyncRules?: AsyncValidationRule[];
  crossFieldRules?: CrossFieldRule[];
}

interface AsyncValidationRule {
  type: string;
  endpoint: string;
  debounceMs?: number;
  message?: string;
}

interface CrossFieldRule {
  type: 'dateRange' | 'passwordMatch' | 'conditional';
  fields: string[];
  message: string;
  condition?: string;
}

@Injectable({ providedIn: 'root' })
export class DynamicValidationService {
  
  private validationConfigs: Map<string, FieldValidationConfig[]> = new Map();

  registerFormValidation(formKey: string, config: FieldValidationConfig[]): void {
    this.validationConfigs.set(formKey, config);
  }

  applyValidation(form: FormGroup, formKey: string): void {
    const configs = this.validationConfigs.get(formKey);
    if (!configs) return;

    configs.forEach(config => {
      const control = form.get(config.fieldName);
      if (control) {
        this.applyFieldValidation(control, config);
      }
    });

    // Apply cross-field validation
    this.applyCrossFieldValidation(form, configs);
  }

  private applyFieldValidation(control: AbstractControl, config: FieldValidationConfig): void {
    const validators: ValidatorFn[] = [];

    config.rules.forEach(rule => {
      // Check conditional validation
      if (rule.condition) {
        try {
          const conditionMet = new Function('control', \`return \${rule.condition}\`)(control);
          if (!conditionMet) return;
        } catch (e) {
          console.error('Invalid validation condition:', rule.condition);
          return;
        }
      }

      const validator = this.createValidator(rule);
      if (validator) validators.push(validator);
    });

    control.setValidators(validators);
    control.updateValueAndValidity();

    // Apply async validators if present
    if (config.asyncRules?.length) {
      const asyncValidators = config.asyncRules.map(rule => this.createAsyncValidator(rule));
      control.setAsyncValidators(asyncValidators);
      control.updateValueAndValidity();
    }

    // Watch dependent fields for conditional validation
    config.rules
      .filter(rule => rule.dependsOn)
      .forEach(rule => {
        const dependentControl = control.parent?.get(rule.dependsOn!);
        dependentControl?.valueChanges.subscribe(() => {
          this.applyFieldValidation(control, config);
        });
      });
  }

  private createValidator(rule: ValidationRule): ValidatorFn | null {
    switch (rule.type) {
      case 'required':
        return Validators.required;
      case 'email':
        return Validators.email;
      case 'min':
        return Validators.min(rule.value);
      case 'max':
        return Validators.max(rule.value);
      case 'minLength':
        return Validators.minLength(rule.value);
      case 'maxLength':
        return Validators.maxLength(rule.value);
      case 'pattern':
        return Validators.pattern(rule.value);
      case 'custom':
        return (control: AbstractControl): ValidationErrors | null => {
          try {
            const validatorFn = new Function('control', \`return \${rule.value}\`);
            return validatorFn(control) || null;
          } catch {
            return null;
          }
        };
      default:
        return null;
    }
  }

  private createAsyncValidator(rule: AsyncValidationRule): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      
      // Implementation would call API endpoint
      return of(null).pipe(
        debounceTime(rule.debounceMs || 400),
        switchMap(() => this.callValidationEndpoint(rule.endpoint, control.value))
      );
    };
  }

  private applyCrossFieldValidation(form: FormGroup, configs: FieldValidationConfig[]): void {
    const allCrossFieldRules = configs
      .flatMap(c => c.crossFieldRules || [])
      .filter((rule, index, self) => 
        index === self.findIndex(r => JSON.stringify(r) === JSON.stringify(rule))
      );

    allCrossFieldRules.forEach(rule => {
      const validator = this.createCrossFieldValidator(rule);
      
      if (rule.fields.every(field => form.get(field))) {
        // Find common parent for these fields
        const parent = this.findCommonParent(form, rule.fields);
        if (parent) {
          const existingValidators = parent.validator ? [parent.validator] : [];
          parent.setValidators([...existingValidators, validator]);
          parent.updateValueAndValidity();
        }
      }
    });
  }

  private createCrossFieldValidator(rule: CrossFieldRule): ValidatorFn {
    switch (rule.type) {
      case 'passwordMatch':
        return (group: AbstractControl): ValidationErrors | null => {
          const [password, confirm] = rule.fields;
          return group.get(password)?.value === group.get(confirm)?.value
            ? null : { passwordMismatch: { message: rule.message } };
        };
        
      case 'dateRange':
        return (group: AbstractControl): ValidationErrors | null => {
          const [start, end] = rule.fields;
          const startDate = new Date(group.get(start)?.value);
          const endDate = new Date(group.get(end)?.value);
          
          return startDate && endDate && startDate <= endDate
            ? null : { dateRange: { message: rule.message } };
        };
        
      case 'conditional':
        return (group: AbstractControl): ValidationErrors | null => {
          if (!rule.condition) return null;
          
          try {
            const conditionMet = new Function('group', \`return \${rule.condition}\`)(group);
            return conditionMet ? null : { conditional: { message: rule.message } };
          } catch {
            return null;
          }
        };
        
      default:
        return () => null;
    }
  }

  private findCommonParent(form: FormGroup, fields: string[]): FormGroup | null {
    const paths = fields.map(f => f.split('.'));
    let commonPath: string[] = [];
    
    for (let i = 0; i < paths[0].length; i++) {
      const segment = paths[0][i];
      if (paths.every(path => path[i] === segment)) {
        commonPath.push(segment);
      } else {
        break;
      }
    }
    
    // Remove last segment (the field itself)
    commonPath = commonPath.slice(0, -1);
    
    let parent: FormGroup = form;
    for (const segment of commonPath) {
      const control = parent.get(segment);
      if (control instanceof FormGroup) {
        parent = control;
      } else {
        return null;
      }
    }
    
    return parent;
  }

  private callValidationEndpoint(endpoint: string, value: any): Observable<ValidationErrors | null> {
    // Implementation would call actual HTTP endpoint
    return of(null);
  }
}

// JSON Configuration Example:
/*
const registrationValidation: FieldValidationConfig[] = [
  {
    fieldName: 'username',
    rules: [
      { type: 'required', message: 'Username is required' },
      { type: 'minLength', value: 3, message: 'Minimum 3 characters' }
    ],
    asyncRules: [
      { 
        type: 'unique', 
        endpoint: '/api/check-username',
        debounceMs: 400,
        message: 'Username already taken'
      }
    ]
  },
  {
    fieldName: 'email',
    rules: [
      { type: 'required' },
      { type: 'email', message: 'Invalid email format' }
    ],
    asyncRules: [
      { 
        type: 'unique', 
        endpoint: '/api/check-email',
        debounceMs: 400,
        message: 'Email already registered'
      }
    ]
  },
  {
    fieldName: 'age',
    rules: [
      { type: 'min', value: 18, message: 'Must be 18 or older' },
      { type: 'max', value: 120, message: 'Invalid age' }
    ]
  },
  {
    fieldName: 'passwordGroup.password',
    rules: [
      { type: 'required' },
      { type: 'minLength', value: 8 },
      { 
        type: 'custom', 
        value: 'control => /[A-Z]/.test(control.value) ? null : { uppercase: true }',
        message: 'Must contain uppercase'
      }
    ]
  },
  {
    fieldName: 'passwordGroup.confirmPassword',
    rules: [
      { type: 'required' }
    ],
    crossFieldRules: [
      {
        type: 'passwordMatch',
        fields: ['passwordGroup.password', 'passwordGroup.confirmPassword'],
        message: 'Passwords do not match'
      }
    ]
  }
];
*/
`}],bestPractices:["Always combine custom validators with required - don't validate empty values unless specifically required","Return descriptive error objects with metadata (actual value, expected format) for better error messages","Use factory functions for configurable validators to promote reusability","Debounce async validators with at least 300-400ms to prevent API spam","Use switchMap to cancel in-flight async validation requests when value changes","Display pending state with loading indicators for async validation","Implement cross-field validation at the FormGroup/FormArray level, not individual controls","Call updateValueAndValidity() after dynamically adding/removing validators","Centralize error messages in a service or constants file for consistency","Use control.markAllAsTouched() on form submit to show all validation errors","Consider updateOn: 'blur' for expensive validation operations","Test validators as pure functions - they're easily unit testable","Create a validation error handler service to transform error objects to messages","Use Validators.compose to combine multiple validators programmatically","Set validation asynchronously for forms loaded with initial data","Provide clear, specific error messages that tell users how to fix the problem","Use CSS classes (ng-valid, ng-invalid) for visual feedback, not just error text","Make validation accessible with aria-invalid and aria-describedby","Consider using a validation library like class-validator for complex domain validation"]};var _o={title:"Angular Route Guards: In-Depth Guide \u2013 Types, Implementation, Functional Guards, Examples & Best Practices",tags:["Angular","Route Guards","CanActivate","CanDeactivate","CanMatch","CanLoad","Resolve","Authentication","Authorization","Navigation","Best Practices"],paragraphs:["Route Guards are one of the most powerful features of the Angular Router. They allow you to control navigation by deciding whether a route can be activated, loaded, or deactivated, and they enable you to fetch data before a route is displayed. Guards are essential for implementing authentication, authorization, preventing unsaved changes, restricting access to certain routes, and preloading data. This comprehensive guide covers every type of guard in detail: CanActivate, CanActivateChild, CanDeactivate, CanMatch, CanLoad, Resolve (technically a resolver but often grouped with guards), functional guards (modern approach), combining multiple guards, handling asynchronous logic, and real-world best practices to make your Angular application secure, user-friendly, and performant."],keyPoints:["Guards: Functions or classes that run before/after navigation and return true, false, UrlTree, Observable<boolean>, Promise<boolean>, etc.","CanActivate: Protects a route from being entered (most common).","CanActivateChild: Protects child routes of a parent.","CanDeactivate: Prevents leaving a route (e.g., unsaved form).","CanMatch: Decides which of multiple matching routes to activate (Angular 14+).","CanLoad: Prevents lazy-loaded modules from being loaded (great for performance + security).","Resolve: Pre-fetches data before route activation (often used together with guards).","Functional Guards: Modern, preferred way (no class needed) \u2013 Angular 14+.","Return Types: boolean, UrlTree (redirect), Observable<boolean | UrlTree>, Promise<boolean | UrlTree>"],sections:[{id:"what-are-route-guards",heading:"What Are Route Guards?",content:"Route guards are services or functions that Angular Router calls during navigation to decide whether the navigation should proceed, be cancelled, or redirected elsewhere. They run at specific points in the navigation lifecycle and give developers full control over access and data preparation.",list:["Executed before the route component is instantiated","Can return synchronously or asynchronously (Promise / Observable)","Can redirect to another route using UrlTree","Can run multiple guards in sequence (all must pass)","Support both class-based (legacy) and functional (modern) styles"],additionalExplanation:"Guards are the primary mechanism for implementing security (auth checks), UX improvements (confirm discard changes), and performance optimizations (prevent loading heavy modules)."},{id:"guard-types",heading:"Types of Route Guards",content:"Angular provides several guard interfaces, each with a specific purpose.",list:["CanActivate: Controls whether a route can be activated","CanActivateChild: Controls child routes of a component","CanDeactivate: Controls whether user can leave the current route","CanMatch: Chooses which route to activate when multiple paths match (v14+)","CanLoad: Prevents loading of lazy-loaded modules (before download)","Resolve: Fetches data before activation (not a true guard but used similarly)"],additionalExplanation:"CanActivate and CanLoad are the most commonly used for authentication. CanDeactivate is critical for form-heavy applications. CanMatch is powerful for role-based routing."},{id:"functional-guards",heading:"Functional Guards \u2013 The Modern Recommended Approach",content:"Since Angular 14, functional guards are preferred over class-based guards. They are simpler, tree-shakable, and easier to test.",list:["Defined as plain functions (CanActivateFn, CanDeactivateFn, etc.)","Use inject() to get services inside the function","Return boolean, UrlTree, Observable<boolean | UrlTree>, Promise<boolean | UrlTree>","No need to create injectable classes just for guards"],additionalExplanation:"Functional guards are now the standard in Angular documentation and community projects. They reduce boilerplate and align with standalone components."},{id:"real-world-use-cases",heading:"Real-World Use Cases for Guards",content:"Guards solve many common application requirements.",list:["Authentication: Only logged-in users can access dashboard","Authorization: Admins only can access /admin routes","Unsaved Changes: Warn before leaving a dirty form","Data Preloading: Ensure data is ready before showing component","Role-Based Routing: Different layouts/routes for different user roles","Prevent Lazy Module Loading: Block unauthorized users from downloading code"],additionalExplanation:"Combining guards with resolvers is a very common pattern for secure, smooth user experiences."}],codeExamples:[{title:"Functional CanActivate Guard (Auth Check)",language:"typescript",code:`import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuth => {
      if (isAuth) return true;
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  );
};`,description:"Modern async authentication guard with redirect and return URL preservation."},{title:"CanDeactivate Guard \u2013 Unsaved Changes",language:"typescript",code:`import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};`,description:"Guard that checks if component has unsaved changes (component implements interface)."},{title:"CanLoad Guard for Lazy Modules",language:"typescript",code:`import { inject } from '@angular/core';
import { CanLoadFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminLoadGuard: CanLoadFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasAdminRole()) {
    return true;
  }

  router.navigate(['/access-denied']);
  return false;
};`,description:"Prevents downloading admin module code if user is not authorized."},{title:"Using Resolve + Guard Together",language:"typescript",code:`{
  path: 'profile/:id',
  component: ProfileComponent,
  canActivate: [authGuard],
  resolve: { user: userResolver }
}`,description:"Route config combining guard and resolver for secure, preloaded data."}],bestPractices:["Prefer functional guards over class-based guards in Angular 14+.","Use inject() inside functional guards to get services.","Always return UrlTree for redirects instead of navigating imperatively.","Preserve the attempted URL using queryParams or state for post-login redirect.","Combine multiple guards when needed (they run sequentially).","Keep guards fast \u2013 avoid heavy computations or long-running operations.","Use CanLoad instead of CanActivate for lazy-loaded protected routes (saves bandwidth).","Implement CanDeactivate for all forms that can be edited.","Centralize auth logic in an AuthService \u2013 guards should only call service methods.","Handle guard errors gracefully (show error page or log out).","Test guards thoroughly \u2013 mock services and test all return types.","Use CanMatch for advanced role-based or feature-flag routing scenarios."]};var So={title:"Lazy Loading in Angular: Optimizing Application Performance",tags:["Angular","Lazy Loading","Routing","Performance","Best Practices"],paragraphs:["Lazy loading is a powerful feature in Angular that allows you to load modules on-demand rather than all at once during the initial application bootstrap. This technique significantly improves the performance of large applications by reducing the initial bundle size and load time. This content delves into the concept, implementation, and benefits of lazy loading in Angular."],keyPoints:["Lazy Loading: Loads feature modules only when needed, typically via routing.","Benefits: Reduces initial load time, improves user experience, and optimizes resource usage.","Implementation: Uses Angular Router's loadChildren property for dynamic imports.","Preloading: Optional strategy to preload lazy modules in the background for faster subsequent access."],sections:[{id:"what-is-lazy-loading",heading:"What is Lazy Loading?",content:"Lazy loading is a design pattern where resources, such as JavaScript modules, are loaded asynchronously only when they are required. In Angular, this is primarily achieved through the router, allowing feature modules to be loaded when a specific route is navigated to.",list:["Contrasts with eager loading, where all modules are loaded upfront","Ideal for large applications with multiple features","Reduces the size of the initial JavaScript bundle"],additionalExplanation:"By deferring the loading of non-essential modules, lazy loading ensures that users get a faster initial experience, especially on slower networks."},{id:"benefits",heading:"Benefits of Lazy Loading",content:"Implementing lazy loading can lead to substantial performance gains, making your Angular application more efficient and user-friendly.",list:["Faster initial load times by splitting the application into smaller chunks","Better resource management, as unused features aren't loaded unnecessarily","Improved scalability for growing applications with many routes and features"],additionalExplanation:"Lazy loading also enhances developer productivity by encouraging modular architecture, making it easier to maintain and update specific parts of the app."},{id:"implementation",heading:"How to Implement Lazy Loading",content:"To set up lazy loading, you configure your routes to use dynamic imports for feature modules. This involves defining child routes in a separate routing module for each feature.",list:["Create a feature module with its own routing module","Use loadChildren in the main routing configuration to point to the feature module","Ensure the feature module is not imported directly in the root module"],additionalExplanation:"Angular's build process will automatically create separate chunks for lazy-loaded modules, which are fetched via network requests when the route is activated."},{id:"preloading-strategies",heading:"Preloading Strategies",content:"Angular provides preloading strategies to load lazy modules in the background after the initial load, balancing between eager and fully lazy approaches.",list:["PreloadAllModules: Preloads all lazy modules as soon as possible","Custom preloading: Implement your own strategy based on priorities or user behavior","NoPreloading: The default, where modules are loaded only on demand"],additionalExplanation:"Choosing the right preloading strategy depends on your application's size and user navigation patterns to optimize perceived performance."}],codeExamples:[{title:"Main Routing Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }`,description:"This example shows how to configure lazy loading in the root routing module using loadChildren with dynamic imports."},{title:"Feature Routing Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }`,description:"A routing module for a lazy-loaded feature, using forChild to define child routes."},{title:"Feature Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [CommonModule, UsersRoutingModule]
})
export class UsersModule { }`,description:"The feature module that imports its own routing module and declares its components."},{title:"Preloading Strategy Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // ... lazy routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }`,description:"Configuring the router to use PreloadAllModules strategy for background preloading of lazy modules."}],bestPractices:["Organize your application into feature modules for effective lazy loading.","Avoid importing lazy modules directly in the root or other modules.","Use preloading strategies judiciously to balance load times and user experience.","Monitor bundle sizes with Angular CLI's build analyzer to ensure optimization.","Combine lazy loading with route guards for secure and efficient navigation."]};var Mo={title:"Angular Modules vs Standalone Components: A Detailed Comparison",tags:["Angular","Modules","Standalone Components","Architecture","Comparison","Best Practices"],paragraphs:["Angular offers two primary ways to organize and structure components: traditional NgModules and the newer standalone components. Introduced in Angular 14 and made default in later versions, standalone components simplify development by reducing boilerplate and improving modularity. This content provides a detailed comparison between Angular modules and standalone components, highlighting their differences, benefits, use cases, and migration strategies."],keyPoints:["Modules: Group related components, directives, pipes, and services; require declarations and imports in NgModule.","Standalone Components: Self-contained with direct imports; no need for NgModules, reducing boilerplate.","Key Differences: Boilerplate, tree-shaking, dependency management, and application structure.","Benefits: Modules for grouping tightly coupled features; Standalone for simplicity and better optimization.","Migration: Incremental adoption possible, with tools to convert from modules to standalone."],sections:[{id:"what-are-modules",heading:"What Are Angular Modules?",content:"Angular modules (NgModules) are containers that group related components, directives, pipes, and services. They have been a core part of Angular since version 2, providing a way to organize code, manage dependencies, and enable features like lazy loading.",list:["Declared using @NgModule decorator","Include declarations, imports, exports, and providers arrays","Support module types like root, feature, shared, and core","Enable compilation contexts for components"],additionalExplanation:"Modules promote modularity but can lead to more boilerplate code, especially in larger applications."},{id:"what-are-standalone-components",heading:"What Are Standalone Components?",content:"Standalone components, introduced in Angular 14, allow components, directives, and pipes to exist independently without being declared in an NgModule. They are marked with 'standalone: true' and handle their own dependencies via an imports array.",list:["Default in Angular 17+ for new projects","Simplify structure by eliminating module files","Support direct imports of other standalone entities or modules","Compatible with routing and lazy loading without modules"],additionalExplanation:"Standalone components streamline development, making Angular more accessible to newcomers and reducing unnecessary code."},{id:"key-differences",heading:"Key Differences",content:"While both approaches serve to organize Angular applications, they differ in setup, flexibility, and performance implications.",list:["Boilerplate: Modules require separate module files; Standalone integrates everything in the component file.","Dependency Management: Modules use imports/declarations at module level; Standalone uses imports directly in the component.","Tree-Shaking: Standalone components are more tree-shakeable, leading to smaller bundles.","Grouping: Modules excel at bundling related features; Standalone promotes individual, reusable entities.","Compatibility: Modules are backward-compatible; Standalone can be mixed with modules."],additionalExplanation:"In large projects, standalone components allow for finer-grained control, ensuring components are only loaded where needed."},{id:"benefits-and-use-cases",heading:"Benefits and Use Cases",content:"Choosing between modules and standalone depends on project size, team preferences, and specific requirements.",list:["Modules: Ideal for grouping tightly coupled components (e.g., a feature module with multiple related views).","Standalone: Better for simple apps, micro-frontends, or when minimizing boilerplate; enhances tree-shaking and scalability.","Hybrid Approach: Use modules for legacy code and standalone for new features."],additionalExplanation:"For large enterprises, standalone reduces complexity, while modules provide structure for complex shared logic."},{id:"migration",heading:"Migration from Modules to Standalone",content:"Angular supports incremental migration, allowing coexistence of both approaches.",list:["Use Angular CLI schematics like ng generate --standalone","Convert components by adding standalone: true and moving imports","Update bootstrapping to use bootstrapApplication for module-less apps","Remove unnecessary NgModules after conversion"],additionalExplanation:"The standalone migration schematic automates much of the process, making it easier to modernize existing applications."}],codeExamples:[{title:"Module-Based Component Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';

@NgModule({
  declarations: [ExampleComponent],
  imports: [CommonModule],
  exports: [ExampleComponent]
})
export class ExampleModule { }`,description:"A traditional module declaring and exporting a component."},{title:"Standalone Component Example",language:"typescript",code:`import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: \`<p>Example Standalone Component</p>\`
})
export class ExampleComponent { }`,description:"A standalone component with direct imports, no module required."},{title:"Module-Based Bootstrap Example",language:"typescript",code:`import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));`,description:"Bootstrapping an application using a root module."},{title:"Standalone Bootstrap Example",language:"typescript",code:`import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));`,description:"Bootstrapping an application directly with a standalone component."}],bestPractices:["Use standalone components for new projects to reduce boilerplate and improve performance.","Reserve modules for grouping components that are always used together.","Adopt a hybrid approach during migration to avoid disruptions.","Leverage Angular's migration tools for converting existing module-based code.","Monitor bundle sizes and tree-shaking effectiveness when choosing an approach.","Follow Angular Architects' recommendation: Prefer standalone for new components."]};var Po={title:"Angular HttpClient: Complete Guide to API Calls \u2013 GET, POST, PUT, DELETE, Headers, Params, Interceptors, Error Handling & Best Practices",tags:["Angular","HttpClient","API Calls","HTTP Requests","Observables","Error Handling","Interceptors","Typed Responses","Best Practices"],paragraphs:["HttpClient is Angular's modern, powerful, and type-safe module for making HTTP requests to REST APIs. It returns Observables by default, integrates perfectly with RxJS operators, works seamlessly with interceptors, supports typed responses, and handles most real-world API scenarios elegantly. This guide covers everything you need: setup, all major HTTP methods, query params, headers, request body, error handling, retry logic, file upload/download, progress events, typed responses, interceptors integration, and proven patterns used in 2025+ Angular applications."],keyPoints:["HttpClient returns Observable<HttpResponse<T>> or Observable<T> (with {observe: 'response'} or without)","All requests are lazy \u2192 nothing happens until you .subscribe() or use async pipe","Automatic JSON parsing (responseType: 'json' is default)","Supports generics for strong typing \u2192 HttpClient.get<User>(url)","Interceptors can add auth tokens, handle errors, show loaders globally","Modern setup: provideHttpClient() in standalone applications","Best companion: RxJS operators (catchError, retry, map, tap, switchMap, etc.)"],sections:[{id:"setup-httpclient",heading:"Setup & Configuration (Standalone & Module-based)",content:"HttpClient is provided via provideHttpClient() in modern Angular apps.",list:["Standalone app \u2192 provideHttpClient() in app.config.ts","With interceptors \u2192 provideHttpClient(withInterceptors([...]))","With fetch backend (experimental) \u2192 provideHttpClient(withFetch())","Legacy NgModule \u2192 import HttpClientModule"],additionalExplanation:"Since Angular 14\u201315+, standalone + provideHttpClient() is the standard."},{id:"basic-get-request",heading:"GET Request \u2013 Fetching Data",content:"Most common operation \u2014 retrieve resources from API.",list:["Simple GET with typed response","With query parameters (HttpParams)","With headers","With observe: 'response' to get full HttpResponse"],additionalExplanation:"Always type your response interface for safety."},{id:"post-put-delete",heading:"POST, PUT, DELETE \u2013 Sending Data",content:"Used to create, update, and remove resources.",list:["POST \u2192 create new resource","PUT \u2192 full update (replace)","PATCH \u2192 partial update (not always supported)","DELETE \u2192 remove resource"],additionalExplanation:"Most APIs return the created/updated entity \u2192 type it."},{id:"error-handling-retry",heading:"Error Handling & Retry Patterns",content:"Always handle errors \u2014 never let them crash your app.",list:["catchError + throwError","Global error handling via interceptor","retry / retryWhen operators","User-friendly messages + fallback values"],additionalExplanation:"Centralize error handling in services or interceptors."},{id:"advanced-features",heading:"Advanced HttpClient Features",content:"HttpClient supports many powerful options.",list:["File upload (FormData + reportProgress)","Download files (responseType: 'blob')","Custom headers & params","Timeout operator","withCredentials for cookies/auth"],additionalExplanation:"Progress events are great for UX in large file uploads/downloads."}],codeExamples:[{title:"Modern Setup \u2013 Standalone Application (app.config.ts)",language:"typescript",code:`import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, errorInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ]
};`,description:"Recommended way in Angular 17+ / 2025+"},{title:"GET Request \u2013 Fetch List of Users (Typed)",language:"typescript",code:`import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

export interface User { id: number; name: string; email: string; }

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Failed to load users', err);
        return of([]); // fallback
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }
}`,description:"Clean, typed GET with error fallback"},{title:"POST + Query Params + Headers Example",language:"typescript",code:`createUser(user: Omit<User, 'id'>): Observable<User> {
  const params = new HttpParams().set('role', 'admin');

  return this.http.post<User>(this.apiUrl, user, {
    params,
    headers: { 'X-Custom-Header': 'my-value' }
  });
}`,description:"POST with query params and custom header"},{title:"File Upload with Progress",language:"typescript",code:`uploadFile(file: File): Observable<{ progress: number; body?: any }> {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post('/api/upload', formData, {
    reportProgress: true,
    observe: 'events'
  }).pipe(
    map(event => {
      if (event.type === HttpEventType.UploadProgress) {
        return { progress: Math.round(100 * event.loaded / event.total!) };
      }
      if (event.type === HttpEventType.Response) {
        return { progress: 100, body: event.body };
      }
      return { progress: 0 };
    })
  );
}`,description:"Upload with real-time progress tracking"},{title:"Global Error Handling via Interceptor (functional)",language:"typescript",code:`export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // redirect to login
      }
      return throwError(() => err);
    })
  );
};`,description:"Centralized error handling"}],bestPractices:["Always **type your responses** \u2192 HttpClient.get<User[]>()","Centralize API base URL + endpoints in environment or constant file","Use **services** for all API calls \u2014 never call HttpClient directly from components","Handle errors **everywhere** \u2014 at least catchError + user feedback","Prefer **functional interceptors** for auth, logging, global errors","Use **async pipe** in templates \u2192 automatic subscription cleanup","Avoid nested .subscribe() \u2014 flatten with switchMap/mergeMap","Set **timeout** on critical requests (timeout(15000))","Use **shareReplay(1)** for data fetched once and reused (profile, config)","For large lists \u2192 add pagination params + infinite scroll pattern","Test API services with HttpClientTestingModule"]};var To={title:"Angular HTTP Interceptors: Complete Guide \u2013 Functional vs Class-Based, Use Cases, Examples & Best Practices (2025+)",tags:["Angular","HTTP Interceptors","HttpClient","Functional Interceptors","Auth Token","Error Handling","Logging","Best Practices"],paragraphs:["HTTP Interceptors are middleware functions (or classes) in Angular's HttpClient that let you intercept and modify **every outgoing HTTP request** and/or **incoming HTTP response** in a centralized place. They are perfect for implementing cross-cutting concerns such as: adding authentication tokens, handling global errors, logging requests/responses, showing/hiding loaders, retrying failed requests, caching, modifying URLs, and more. Since Angular 15+ the **functional interceptor** style is the officially recommended approach because it is more predictable, tree-shakeable, and easier to reason about in complex dependency scenarios. This guide covers both styles, real-world patterns, common gotchas, and modern best practices."],keyPoints:["Interceptors run for **every** HttpClient request (get, post, put, delete, etc.)","Functional interceptors (preferred since ~v15): plain functions \u2192 provideHttpClient(withInterceptors([...]))","Class-based interceptors (legacy/compatibility): implement HttpInterceptor \u2192 HTTP_INTERCEPTORS multi-provider","Order matters: interceptors run in the order they are provided","Chain pattern: call next.handle(modifiedReq) to continue the chain","Common uses: Auth token injection, global error handling, request/response logging, loader management, API URL prefixing"],sections:[{id:"what-are-http-interceptors",heading:"What Are HTTP Interceptors?",content:"An interceptor is middleware that sits between your application code and the backend server. It can read and modify the HttpRequest before it is sent, and/or read and modify the HttpResponse (or error) before it reaches your component/service.",list:["Intercept outgoing requests \u2192 add headers, change URL, clone request","Intercept incoming responses \u2192 transform body, handle errors globally","Intercept errors \u2192 retry, transform, log, redirect to login, show toast","No need to repeat logic in every service \u2192 DRY principle"],additionalExplanation:"Interceptors are chainable \u2014 each one calls the next in line. The last in chain actually sends the request to the server."},{id:"functional-interceptors",heading:"Functional Interceptors \u2013 Modern & Recommended Style",content:"Introduced in Angular 15 and strongly recommended in 2025+ (Angular 18\u201320 era). No class needed, just a function that receives req and next.",list:["Type: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => Observable<HttpEvent<unknown>>","Registered via provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor]))","Use inject() to get services inside the function","Very predictable order and dependency resolution","Better tree-shaking and no DI token conflicts in complex apps"],additionalExplanation:"Official Angular docs now favor functional interceptors. Class-based still work but are considered legacy for new code."},{id:"class-based-interceptors",heading:"Class-Based Interceptors \u2013 Legacy / DI Style",content:"The classic style used in Angular 4.3 \u2192 14. Still supported but not recommended for new projects.",list:["Implement HttpInterceptor interface","Registered via { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }","Constructor injection for services","Can become unpredictable in lazy-loaded or multi-app scenarios"],additionalExplanation:"Use only when maintaining very old code or when you really need complex DI logic that inject() cannot easily handle."},{id:"common-use-cases",heading:"Most Common Real-World Use Cases",content:"Interceptors solve repetitive cross-cutting concerns elegantly.",list:["Add Authorization: Bearer token to every request","Global Error Handling: Catch 401 \u2192 logout, 500 \u2192 show toast","Add API prefix: '/api/v1/' \u2192 full URL","Logging: console.log every request/response in dev mode","Show/Hide Loader: start spinner on request, stop on response/error","Retry failed requests (with exponential backoff)","Transform responses (camelCase \u2192 snake_case, etc.)"],additionalExplanation:"Most apps use 2\u20134 interceptors: auth + error + logging + loader."}],codeExamples:[{title:"Functional Auth Interceptor \u2013 Add Bearer Token",language:"typescript",code:`import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: \`Bearer \${token}\` }
    });
    return next(authReq);
  }

  return next(req);
};`,description:"Modern functional interceptor \u2013 adds token only when available."},{title:"Register Functional Interceptors (app.config.ts)",language:"typescript",code:`import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, errorInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ]
};`,description:"How to register functional interceptors in standalone Angular app."},{title:"Functional Error Handling Interceptor",language:"typescript",code:`import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        toastr.error('Session expired. Please login again.');
        router.navigate(['/login']);
      } else if (err.status >= 500) {
        toastr.error('Server error occurred. Try again later.');
      }
      return throwError(() => err);
    })
  );
};`,description:"Global error handling with toast notifications and 401 redirect."},{title:"Class-Based Interceptor (Legacy Style \u2013 for reference)",language:"typescript",code:`import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LegacyAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } });
    }
    return next.handle(req);
  }
}`,description:"Old class-based style \u2013 still works but not recommended for new code."}],bestPractices:["Prefer **functional interceptors** in Angular 15+ / 2025+ projects","Register interceptors in **app.config.ts** using provideHttpClient(withInterceptors([...]))","Keep each interceptor focused on **one responsibility** (auth, error, logging, etc.)","Always **clone** the request before modifying (req.clone({ ... }))","Handle errors with **catchError** inside pipe() \u2014 never let them propagate unhandled","Use **inject()** inside functional interceptors to get services","Avoid heavy synchronous logic \u2014 interceptors should be fast","Order matters: put auth before logging, error handling last in chain","Combine with **retry**, **timeout**, **retryWhen** operators when needed","Test interceptors independently using HttpClientTestingModule","In production: disable logging / verbose interceptors","For route-scoped behavior \u2192 consider withRequestsMadeViaParent() or separate HttpClient instances (advanced)"]};var Ao={title:"Node.js vs NPM: Understanding the Difference",tags:["nodejs","npm","javascript","backend","package-manager"],paragraphs:["Node.js is a JavaScript runtime that lets you run JavaScript on your computer or server. NPM (Node Package Manager) is a tool that comes with Node.js to help you install and manage packages (libraries).","Think of Node.js as the engine of a car, and NPM as the toolbox and spare parts you need to build and maintain that car."],keyPoints:["Node.js: JavaScript runtime environment","NPM: Package manager for Node.js","NPM comes bundled with Node.js","Node.js executes code, NPM manages packages","Both essential for modern JavaScript development"],sections:[{heading:"What is Node.js?",content:"Node.js is a platform for building server-side applications with JavaScript",list:["Runs JavaScript outside the browser","Uses Chrome's V8 JavaScript engine","Event-driven, non-blocking I/O model","Perfect for building APIs, servers, and tools","Includes core modules for file system, HTTP, etc."]},{heading:"What is NPM?",content:"NPM is the world's largest software registry and package manager",list:["Default package manager for Node.js","Manages project dependencies","Hosts over 2 million packages","Manages versions and updates","Handles project scripts and configurations"]},{heading:"How They Work Together",content:"The relationship between Node.js and NPM",list:["Install Node.js \u2192 Get NPM automatically","Use NPM to install packages for Node.js projects","Node.js uses packages installed by NPM","NPM manages the node_modules folder","package.json acts as the project blueprint"]}],codeExamples:[{title:"Installation & Setup Commands",language:"bash",code:`# 1. Check if Node.js and NPM are installed
node --version
npm --version

# 2. Install a package locally (for one project)
npm install express

# 3. Install a package globally (for all projects)
npm install -g nodemon

# 4. Initialize a new Node.js project
npm init                 # Interactive setup
npm init -y              # Quick setup with defaults

# 5. Install and save to package.json
npm install axios --save
npm install typescript --save-dev`,description:"Essential commands to get started with Node.js and NPM"}],bestPractices:["Always start with 'npm init' to create package.json","Use 'npm install --save' for production dependencies","Use 'npm install --save-dev' for development dependencies","Never commit node_modules folder to Git","Use .gitignore to exclude node_modules","Regularly update packages with 'npm update'","Use specific version numbers in package.json","Create separate scripts in package.json for different tasks","Use 'npx' to run packages without installing globally"]},ko=[{heading:"Node.js vs NPM: Quick Comparison",content:"Understanding their different roles",list:["Node.js \u2192 Runtime Environment | NPM \u2192 Package Manager","Node.js \u2192 Executes JavaScript code | NPM \u2192 Installs JavaScript packages","Node.js \u2192 Built on Chrome's V8 engine | NPM \u2192 Registry of packages","Node.js \u2192 Can work without NPM | NPM \u2192 Needs Node.js to function","Node.js \u2192 For running applications | NPM \u2192 For managing dependencies"]},{heading:"File Structure Explained",content:"Key files and folders in a Node.js project",list:["package.json \u2192 Project configuration and dependencies","package-lock.json \u2192 Exact versions of installed packages","node_modules/ \u2192 Folder where NPM installs packages",".js files \u2192 Your application code (run by Node.js)",".gitignore \u2192 File to exclude node_modules from Git"]}],Eo={title:"Complete Setup Guide: From Zero to Running",sections:[{heading:"Step 1: Install Node.js & NPM",content:"Get both tools with one installation",list:["Download Node.js from nodejs.org","Choose LTS (Long Term Support) version","Run the installer (includes NPM automatically)","Verify installation in terminal: node -v and npm -v"]},{heading:"Step 2: Create Your First Project",content:"Set up a new Node.js project from scratch",list:["Create project folder: mkdir my-project && cd my-project","Initialize NPM: npm init -y","Create main file: touch index.js","Write your first code: console.log('Hello Node.js!')","Run it: node index.js"]},{heading:"Step 3: Add Dependencies with NPM",content:"Enhance your project with packages",list:["Install packages: npm install package-name","Check package.json to see installed dependencies","Explore node_modules folder structure","Use the packages in your code with require()"]}],codeExamples:[{title:"Complete Project Setup Example",language:"bash",code:`# Complete workflow example
# -------------------------------------------------
# 1. Create and navigate to project folder
mkdir my-first-node-project
cd my-first-node-project

# 2. Initialize package.json
npm init -y

# 3. Install necessary packages
npm install express
npm install dotenv --save-dev
npm install nodemon --save-dev

# 4. Create .gitignore file
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore

# 5. Create environment file
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env

# 6. Create main application file
cat > app.js << 'EOF'
require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Node.js project is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
EOF

# 7. Update package.json scripts
# Add this to package.json:
# "scripts": {
#   "start": "node app.js",
#   "dev": "nodemon app.js"
# }

# 8. Run the project
npm run dev  # For development with auto-restart
# OR
npm start    # For production`,description:"Complete step-by-step setup for a Node.js project"}]},Oo=[{title:"Scenario 1: Creating a Basic API",language:"javascript",code:`// Install: npm install express body-parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(\`API server running at http://localhost:\${PORT}\`);
});`,description:"Building a REST API with Node.js and Express"},{title:"Scenario 2: Reading/Writing Files",language:"javascript",code:`// Using Node.js built-in modules (no NPM needed)
const fs = require('fs');
const path = require('path');

// Read a file
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// Write to a file
const content = 'Hello, this is written by Node.js!';
fs.writeFile('output.txt', content, (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully!');
});

// Read JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    console.log('JSON data:', jsonData);
});`,description:"Using Node.js core modules for file operations"},{title:"Scenario 3: Using External NPM Packages",language:"javascript",code:`// First install packages: npm install axios chalk
const axios = require('axios');
const chalk = require('chalk');

// Make HTTP request with axios
async function fetchData() {
    try {
        console.log(chalk.blue('Fetching data from API...'));
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
        console.log(chalk.green('Success! Received data:'));
        console.log(chalk.yellow(\`Number of posts: \${response.data.length}\`));
        
        // Display first 3 posts
        response.data.slice(0, 3).forEach(post => {
            console.log(chalk.cyan(\`Title: \${post.title}\`));
        });
        
    } catch (error) {
        console.log(chalk.red('Error fetching data:'), error.message);
    }
}

// Using moment.js for dates (install: npm install moment)
const moment = require('moment');
console.log('Current date:', moment().format('MMMM Do YYYY, h:mm:ss a'));
console.log('Two days from now:', moment().add(2, 'days').format('LL'));

fetchData();`,description:"Using popular NPM packages in your Node.js application"}],Io={title:"Common Issues and Solutions",sections:[{heading:"Installation Problems",content:"Fixing common installation issues",list:["'node' is not recognized \u2192 Reinstall Node.js or add to PATH","Permission errors \u2192 Use sudo (macOS/Linux) or Run as Administrator (Windows)","Version conflicts \u2192 Use nvm (Node Version Manager)","Slow installation \u2192 Check internet connection, use npm cache clean"]},{heading:"Package Issues",content:"Solving NPM package problems",list:["Package not found \u2192 Check spelling, ensure package exists","Version conflicts \u2192 Delete node_modules and package-lock.json, run npm install","Missing dependencies \u2192 Check if package.json is correct","Global vs local confusion \u2192 Use npx for one-time commands"]}],bestPractices:["Always use version control (Git)","Document your project with a README.md","Use environment variables for configuration","Implement error handling in your code","Write tests for your application","Use logging for debugging","Keep dependencies updated regularly","Follow semantic versioning","Use ESLint for code quality","Set up continuous integration"]};var Do={title:"Observable vs Promise in Angular: Deep Comparison, Use Cases, Performance & Best Practices",tags:["Angular","RxJS","Observable","Promise","Async","Reactive Programming","Comparison","Best Practices"],paragraphs:["Handling asynchronous operations is at the heart of modern web applications, especially in Angular. Two of the most common tools for managing async data are **Promise** (native JavaScript) and **Observable** (from RxJS). While both can represent values that arrive over time, they differ significantly in philosophy, capabilities, flexibility, and usage patterns. This in-depth guide compares Observables and Promises head-to-head: their core differences, lifecycle, cancellation, multiple values, error handling, operators, Angular integration (especially with async pipe), when to use which, real-world use cases, performance considerations, and best practices to help you write cleaner, more powerful, and maintainable Angular applications."],keyPoints:["Promise: Represents a single future value (or error) \u2014 one-time operation.","Observable: Represents a stream of values over time \u2014 can emit 0, 1, many, or infinite values.","Lazy vs Eager: Promises start executing immediately; Observables are lazy (cold) by default.","Cancellation: Promises cannot be cancelled; Observables support unsubscribe().","Operators: Observables come with rich RxJS operators (map, filter, switchMap, debounceTime, etc.).","Angular Integration: async pipe works natively with Observables, not Promises.","Multiple Values: Observables shine for real-time data, user input, HTTP retries, websockets."],sections:[{id:"core-differences",heading:"Core Differences \u2013 Promise vs Observable",content:"The fundamental design philosophies are very different.",list:["Values: Promise \u2192 exactly one value (or error), Observable \u2192 zero to infinite values","Creation: new Promise((resolve, reject) => \u2026), new Observable(subscriber => \u2026)","Execution: Promise executes immediately (eager), Observable waits for subscribe() (lazy/cold)","Completion: Promise always completes (success or error), Observable can complete or never complete","Cancellation: Promise \u2014 no native cancellation, Observable \u2014 unsubscribe() stops emissions","Chaining: Promise \u2014 .then().catch(), Observable \u2014 pipe() with operators","Multiple subscribers: Promise \u2014 result is cached after completion, Observable \u2014 unicast by default (cold), multicast possible"],additionalExplanation:"Think of Promise as 'I will give you one answer later'. Observable is 'I will keep sending you data whenever something happens \u2014 until you tell me to stop'."},{id:"lifecycle-comparison",heading:"Lifecycle & Behavior Comparison",content:"Understanding the lifecycle helps decide which tool fits your use case.",list:["Promise: Pending \u2192 Fulfilled / Rejected (terminal states)","Observable: Not started \u2192 Subscribed \u2192 Next (0..n) \u2192 Error / Complete (can be long-lived)","Error handling: Promise \u2014 catch(), Observable \u2014 catchError() operator","Finalization: Promise \u2014 no finally (use .then().catch().finally() in modern JS), Observable \u2014 finalize() operator","Retry: Promise \u2014 manual retry logic, Observable \u2014 retry(), retryWhen() operators"],additionalExplanation:"Observables are ideal for long-lived or repeating sources (user typing, timers, websockets, mouse moves). Promises are better for one-shot operations (simple HTTP GET without retry)."},{id:"cancellation",heading:"Cancellation \u2013 A Major Differentiator",content:"Cancellation is where Observables shine compared to Promises.",list:["Promise: No built-in cancellation \u2192 runs to completion even if component is destroyed","Observable: unsubscribe() stops emissions, prevents memory leaks","Angular async pipe: Automatically subscribes & unsubscribes Observables","take(1), first(), takeUntil(destroy$) \u2014 common patterns to limit lifetime"],additionalExplanation:"In Angular, forgetting to unsubscribe from Observables used to cause memory leaks \u2014 today async pipe + takeUntil(destroy$) pattern solves this elegantly."},{id:"angular-integration",heading:"How Angular Loves Observables",content:"Angular is built with Observables in mind (thanks to RxJS being deeply integrated).",list:["HttpClient returns Observable by default","async pipe works natively with Observable (not Promise)","Forms \u2014 valueChanges, statusChanges are Observables","Router events, animations, event bindings \u2014 all Observables","NgRx, signals interoperability, state management \u2014 all RxJS-based"],additionalExplanation:"Using async pipe + Observable is the idiomatic Angular way \u2014 clean templates, automatic subscription management, no manual unsubscribe."}],codeExamples:[{title:"Promise \u2013 Simple One-Time Operation",language:"typescript",code:`getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(res => {
      if (!res.ok) throw new Error('Failed');
      return res.json();
    });
}

// Usage
getUser(123)
  .then(user => console.log(user))
  .catch(err => console.error(err));`,description:"Classic Promise pattern \u2014 single value or error."},{title:"Observable \u2013 HttpClient (Angular way)",language:"typescript",code:`getUser(id: number): Observable<User> {
  return this.http.get<User>(\`/api/users/\${id}\`).pipe(
    catchError(err => {
      console.error(err);
      return throwError(() => new Error('User fetch failed'));
    })
  );
}

// Template
<ng-container *ngIf="user$ | async as user">
  {{ user.name }}
</ng-container>`,description:"Angular idiomatic Observable with async pipe."},{title:"Observable vs Promise \u2013 Cancellation",language:"typescript",code:`// Observable - cancellable
this.subscription = this.http.get('/data').subscribe(...);
// later
this.subscription.unsubscribe();

// Promise - no cancellation
const promise = fetch('/data');
// no way to stop it`,description:"Demonstrates why Observables are better for component lifecycle management."},{title:"Multiple Values \u2013 Observable shines",language:"typescript",code:`fromEvent(document, 'mousemove')
  .pipe(
    throttleTime(100),
    map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
  )
  .subscribe(pos => console.log('Mouse at:', pos));

// Promise cannot handle continuous values`,description:"Observable naturally handles streams (events, timers, websockets)."}],bestPractices:["Use Observables for almost everything in Angular (HttpClient, forms, events, state).","Use async pipe whenever possible \u2014 prevents memory leaks automatically.","Prefer Observables over Promises when you might need retry, debounce, throttle, switchMap, etc.","Use Promise only for very simple, one-time, non-Angular APIs that return Promise.","Convert Promise to Observable when needed: from(promise) or defer(() => from(promise)).","Always clean up long-lived Observables: takeUntil(destroy$), take(1), first(), async pipe.","Use shareReplay(1) or share() when multiple subscribers should get the same data.","Avoid nested subscriptions \u2014 use operators (switchMap, mergeMap, concatMap, exhaustMap).","Handle errors centrally with catchError() \u2014 show user-friendly messages.","Modern Angular (16+): Consider signals + toObservable() / toSignal() for simpler state."]};var Ro={title:"Angular Pipes: In-Depth Explanation, Built-in & Custom Pipes, Pure vs Impure, and Best Practices",tags:["Angular","Pipes","Custom Pipes","Pure Pipes","Impure Pipes","Transformations","Best Practices","Performance"],paragraphs:["Pipes in Angular are simple yet extremely powerful tools for transforming displayed values right inside templates. They allow developers to format, filter, sort, or convert data declaratively without cluttering component logic or writing complex expressions in HTML. Pipes promote clean, readable templates and reusable transformation logic. This comprehensive guide covers everything about Angular pipes: how they work, built-in pipes, creating custom pipes, the critical difference between pure and impure pipes, performance considerations, and advanced usage patterns to help you write more maintainable and efficient Angular applications."],keyPoints:["Pipes: Functions that transform values for display in templates using the | (pipe) operator.","Built-in Pipes: Date, Currency, UpperCase, LowerCase, Decimal, Percent, Json, Async, Slice, TitleCase, and more.","Custom Pipes: Developer-created pipes for application-specific transformations (e.g., formatting phone numbers, masking data).","Pure vs Impure: Pure pipes run only when input reference changes (default, performant); impure pipes run on every change detection cycle.","Chaining: Multiple pipes can be chained for sequential transformations.","Standalone Pipes: In Angular 14+, pipes can be standalone, eliminating the need for NgModule declarations."],sections:[{id:"what-are-pipes",heading:"What Are Pipes in Angular?",content:"Pipes are pure functions (by default) that take an input value and return a transformed output. They are applied directly in templates using the pipe operator (|), making data presentation logic declarative and easy to read. Pipes do not modify the original data \u2014 they only transform what is displayed.",list:["Syntax: {{ value | pipeName : arg1 : arg2 }}","Can accept parameters and be chained: {{ value | pipe1 | pipe2: param }}","Execute during change detection when the bound value changes","Help keep components focused on business logic instead of formatting","Support both synchronous and asynchronous values (especially with async pipe)"],additionalExplanation:"Pipes are one of Angular's most elegant features for keeping templates clean. Instead of writing complex expressions or calling component methods in templates (which can hurt performance), you delegate formatting to pipes. This improves readability, testability, and reusability across the application."},{id:"built-in-pipes",heading:"Built-in Pipes",content:"Angular ships with a rich set of built-in pipes covering the most common formatting needs. These pipes are imported from CommonModule and ready to use in any template.",list:["DatePipe: Formats dates (short, medium, long, custom patterns)","CurrencyPipe: Formats numbers as currency with symbol and decimal places","DecimalPipe: Formats numbers with specific digits (before/after decimal)","PercentPipe: Converts number to percentage","UpperCasePipe / LowerCasePipe / TitleCasePipe: Changes text case","JsonPipe: Pretty-prints objects for debugging","AsyncPipe: Subscribes to Observables/Promises and returns latest value (unsubscribes automatically)","SlicePipe: Extracts a portion of array or string","KeyValuePipe: Iterates over object keys/values","I18nSelectPipe / I18nPluralPipe: Handles internationalization and pluralization"],additionalExplanation:"The async pipe is particularly powerful \u2014 it handles subscription management and prevents memory leaks, making it a must-use with Observables in templates. Built-in pipes are pure by default and highly optimized."},{id:"custom-pipes",heading:"Creating Custom Pipes",content:"When built-in pipes don't meet your needs, you create custom pipes. They follow the same pattern: implement the PipeTransform interface and decorate with @Pipe.",list:["Use @Pipe({ name: 'appCustom', pure: true })","Implement transform(value: any, ...args: any[]): any","Can be pure (default) or impure (pure: false)","Support dependency injection (e.g., inject services for formatting rules)","Standalone pipes (Angular 14+) use standalone: true and direct imports"],additionalExplanation:"Custom pipes are ideal for domain-specific formatting (phone numbers, credit card masking, file size conversion, status badges, etc.). They encapsulate transformation logic in one place, making it reusable across components and easy to maintain or unit test."},{id:"pure-vs-impure",heading:"Pure vs Impure Pipes \u2013 Performance & Behavior",content:"The most important decision when creating a pipe is whether it should be pure or impure. This setting dramatically affects when the pipe executes and its performance impact.",list:["Pure Pipes (default, pure: true): Only re-execute when Angular detects a change in the input reference (primitive value change or object/array reference change). Extremely performant.","Impure Pipes (pure: false): Execute on every change detection cycle \u2014 even if inputs haven't changed. Useful when the pipe depends on internal/external state or mutates input.","When to use impure: When transforming mutable objects, using external data, or depending on time/current user settings.","Performance warning: Impure pipes can cause significant overhead in large applications with frequent change detection cycles."],additionalExplanation:"Always prefer pure pipes whenever possible. Use immutable data patterns (create new objects/arrays) to trigger pure pipes correctly. Impure pipes should be used sparingly and only when truly necessary (e.g., a pipe that formats based on current locale or user role)."},{id:"advanced-usage",heading:"Advanced Pipe Usage and Patterns",content:"Pipes become even more powerful when combined with other Angular features and used in creative ways.",list:["Chaining pipes: {{ user.name | uppercase | slice:0:10 }}","Async pipe with fallback: {{ (user$ | async)?.name || 'Loading...' }}",'Pipes with ngFor: *ngFor="let item of items | filter:searchText"',"Stateful pipes: Impure pipes can maintain internal state (rarely recommended)","Testing pipes: Easy to unit test since they are pure functions (most cases)"],additionalExplanation:"Combining async pipe with map/filter operators (via rxjs) in templates can create powerful reactive displays without component code. Custom pipes can also be used in reactive forms validators or even in component logic (though template usage is preferred)."}],codeExamples:[{title:"Built-in Pipes Usage Example",language:"html",code:`<p>Today: {{ today | date:'fullDate' }}</p>
<p>Price: {{ price | currency:'USD':'symbol':'1.2-2' }}</p>
<p>Percent: {{ ratio | percent:'1.1-1' }}</p>
<p>JSON: {{ object | json }}</p>
<p>Name: {{ name$ | async }}</p>`,description:"Common usage of built-in pipes for formatting dates, currency, percentages, debugging, and handling async data."},{title:"Custom Pure Pipe \u2013 Phone Number Formatter",language:"typescript",code:`import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const cleaned = value.replace(/\\D/g, '');
    const match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);
    if (match) {
      return \`(\${match[1]}) \${match[2]}-\${match[3]}\`;
    }
    return value;
  }
}`,description:"A pure pipe that formats a 10-digit phone number into (XXX) XXX-XXXX style."},{title:"Custom Impure Pipe \u2013 Filter by Search Term",language:"typescript",code:`import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false,
  standalone: true
})
export class FilterByPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item =>
      JSON.stringify(item).toLowerCase().includes(searchText)
    );
  }
}`,description:"An impure pipe that filters an array based on a search term. Impure because it needs to re-run when searchText changes but the items array reference stays the same."},{title:"Using Custom Pipes in Template",language:"html",code:`<p>Phone: {{ user.phone | phoneFormat }}</p>
<ul>
  <li *ngFor="let item of items | filterBy:searchText">
    {{ item.name }}
  </li>
</ul>`,description:"Practical usage of custom pipes directly in templates."}],bestPractices:["Always prefer pure pipes unless you have a strong reason to use impure.","Avoid heavy computations in pipes \u2014 especially impure ones \u2014 as they can run frequently.","Use async pipe for all Observables/Promises in templates to manage subscriptions automatically.","Keep pipes focused on one transformation task (single responsibility).","Create standalone pipes for modern Angular projects to reduce boilerplate.","Unit test pipes thoroughly \u2014 they are easy to test as pure functions.","Use immutable data patterns to make pure pipes work correctly and efficiently.","Avoid calling component methods in templates; move logic to pipes when appropriate.","Combine pipes with signals (Angular 16+) for even more reactive and performant templates.","Document custom pipes clearly: name, purpose, parameters, and whether pure/impure."]};var Fo={title:"Browser Fundamentals and Rendering Process",tags:["Web Fundamentals","Browser","DOM","Rendering","Performance","JavaScript"],paragraphs:["Modern web browsers are sophisticated software engines responsible for fetching resources, parsing HTML/CSS/JavaScript, building internal representations, and rendering pixels on the screen. Understanding how browsers work is crucial for web developers, especially when building performant Angular applications that rely heavily on efficient DOM manipulation and change detection.","The browser's primary job is to transform HTML, CSS, and JavaScript into an interactive visual experience. This involves several steps known as the Critical Rendering Path (CRP): parsing HTML into DOM, parsing CSS into CSSOM, combining them into a Render Tree, performing Layout (reflow), and finally Painting the pixels. JavaScript can interrupt this process, making optimization essential for fast-loading pages.","Browsers use multi-process architectures (e.g., Chrome's site isolation) for security and stability. Each tab or site runs in separate processes. They also implement sophisticated optimizations like speculative parsing, preload scanners, and GPU acceleration. Knowledge of these internals helps developers avoid common performance pitfalls in single-page applications like Angular."],sections:[{heading:"Critical Rendering Path (CRP)",content:"The sequence of steps the browser takes to convert code into pixels:",list:["<strong>HTML Parsing \u2192 DOM Tree:</strong> Byte stream \u2192 tokens \u2192 nodes \u2192 DOM","<strong>CSS Parsing \u2192 CSSOM Tree:</strong> Stylesheets are parsed into a tree structure","<strong>Render Tree:</strong> Combination of DOM and CSSOM (only visible nodes)","<strong>Layout (Reflow):</strong> Calculate geometry (positions and sizes)","<strong>Paint:</strong> Rasterize elements into pixels (layers for compositing)","<strong>Composite:</strong> GPU combines layers for final display"],additionalExplanation:"Any change that affects geometry triggers reflow (expensive), while only visual changes trigger repaint."},{heading:"Parser Blocking vs Non-Blocking Resources",content:"How different resources affect parsing:",list:["<strong>HTML:</strong> Primary document\u2014parsing is sequential","<strong>CSS:</strong> Render-blocking by default (browser waits for CSSOM)","<strong>JavaScript:</strong> Parser-blocking by default (can modify DOM/CSSOM)","<strong>async/defer:</strong> Make scripts non-blocking","<strong>Images/Fonts:</strong> Non-blocking but can cause FOUC/FOUT"]},{heading:"Reflow and Repaint Triggers",content:"Operations that force the browser to recalculate layout or redraw:",list:["<strong>Reflow triggers:</strong> Geometry changes (width, height, margin, display, font-size)","<strong>Repaint triggers:</strong> Visual changes (color, background, visibility)","<strong>Composite-only:</strong> GPU-friendly (transform, opacity)","<strong>Forced reflow:</strong> Reading offsetWidth/Height after style change"]},{heading:"Browser Architecture",content:"Modern browsers use multi-process models:",list:["<strong>Main Process:</strong> Coordinates UI, network, storage","<strong>Renderer Processes:</strong> One per site/frame (for isolation)","<strong>GPU Process:</strong> Handles graphics acceleration","<strong>Network Process:</strong> Manages HTTP requests","<strong>Security benefits:</strong> Site isolation prevents cross-origin attacks"]},{heading:"Performance Implications for Angular",content:"Angular-specific considerations:",list:["<strong>Change Detection:</strong> Angular runs in zones\u2014understanding rendering helps optimize OnPush strategy","<strong>Virtual Scrolling:</strong> Reduces DOM nodes to prevent reflow costs","<strong>Lazy Loading:</strong> Delays resource fetching","<strong>AOT Compilation:</strong> Pre-compiles templates for faster initial render"]}],codeExamples:[{title:"Basic HTML Structure and Browser Parsing",language:"html",description:"Browser builds DOM tree sequentially, pausing for blocking resources",code:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Browser Parsing Demo</title>
    <!-- Render-blocking CSS -->
    <link rel="stylesheet" href="styles.css">
    <!-- Parser-blocking script -->
    <script src="blocking.js"><\/script>
    <!-- Non-blocking with defer -->
    <script defer src="deferred.js"><\/script>
    <!-- Non-blocking with async -->
    <script async src="analytics.js"><\/script>
  </head>
  <body>
    <h1>Welcome to the Page</h1>
    <p>This content appears after CSS and blocking JS load</p>
    <img src="hero.jpg" alt="Hero image">
  </body>
</html>`},{title:"Triggering Reflow and Repaint",language:"javascript",description:"Demonstrates expensive operations and forced synchronous layout",code:`const box = document.getElementById('box');

// These changes queue reflow/repaint
box.style.width = '300px';        // Triggers reflow
box.style.backgroundColor = 'red'; // Triggers repaint
box.style.transform = 'scale(1.1)'; // Composite-only (GPU-friendly)

// Forced reflow - reading layout properties
console.log(box.offsetHeight);     // Forces immediate reflow

// Bad pattern: multiple reads/writes
function badResize() {
  box.style.height = box.offsetHeight + 10 + 'px'; // Read + write = reflow
}

// Better: batch reads, then writes
function goodResize() {
  const currentHeight = box.offsetHeight; // Read once
  box.style.height = currentHeight + 10 + 'px'; // Write once
}`},{title:"Optimizing with requestAnimationFrame",language:"javascript",description:"Batch DOM changes for smooth animations and minimal reflows",code:`let width = 100;

function animate() {
  width += 1;
  const element = document.getElementById('animated');

  // All changes batched in one frame
  element.style.width = width + 'px';
  element.style.transform = \`translateX(\${width}px)\`;

  if (width < 500) {
    requestAnimationFrame(animate); // Sync with browser repaint
  }
}

requestAnimationFrame(animate); // Start animation`},{title:"Preload and Prefetch Resources",language:"html",description:"Modern hints to optimize resource loading",code:`<head>
  <!-- Preload critical resources -->
  <link rel="preload" href="critical.css" as="style">
  <link rel="preload" href="hero.jpg" as="image">
  <link rel="preload" href="main.js" as="script">

  <!-- Prefetch for future navigation -->
  <link rel="prefetch" href="next-page.html">

  <!-- Preconnect to third-party origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://api.example.com">
</head>`}],keyPoints:["Critical Rendering Path: DOM \u2192 CSSOM \u2192 Render Tree \u2192 Layout \u2192 Paint \u2192 Composite","CSS is render-blocking; JavaScript is parser-blocking unless async/defer","Minimize reflows by batching DOM reads/writes and using composite properties","Use preload/prefetch for performance optimization","Modern browsers use multi-process architecture for security","requestAnimationFrame aligns with browser repaint cycle","Understanding rendering helps optimize Angular change detection and animations"],bestPractices:["Place CSS in <head> and JavaScript at end of <body> or use async/defer","Minimize DOM manipulations\u2014use virtual scrolling in large lists","Prefer transform/opacity for animations (composite-only)","Use Chrome DevTools Performance tab to analyze reflows","Leverage preload for critical resources and prefetch for likely next pages","Batch style changes with classList instead of individual style properties","In Angular, use OnPush change detection and trackBy in *ngFor"]},Vo={title:"HTTP/HTTPS Fundamentals",tags:["HTTP","HTTPS","Networking","API","Security","Web Fundamentals"],paragraphs:["HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the web. It defines how clients (browsers) and servers exchange messages. HTTPS is HTTP secured with TLS/SSL encryption, essential for protecting sensitive data. Understanding HTTP is crucial for building robust Angular applications that communicate with backend APIs.","HTTP is stateless\u2014each request/response pair is independent. Servers use cookies, tokens, or sessions to maintain state. Modern web apps rely heavily on RESTful APIs over HTTP/HTTPS, using JSON payloads. Angular's HttpClient module abstracts these interactions while providing interceptors, typing, and RxJS integration.","Key concepts include methods (GET, POST, etc.), status codes (200, 404, 500), headers (Content-Type, Authorization), caching, and security considerations. Poorly designed HTTP usage can lead to security vulnerabilities (e.g., lack of HTTPS) or performance issues (e.g., missing caching)."],sections:[{heading:"HTTP Request Structure",content:"An HTTP request consists of:",list:["<strong>Request Line:</strong> Method + URI + Version (e.g., GET /users HTTP/1.1)","<strong>Headers:</strong> Metadata (Host, User-Agent, Accept, Authorization)","<strong>Body:</strong> Optional payload (for POST, PUT, PATCH)"]},{heading:"HTTP Response Structure",content:"An HTTP response includes:",list:["<strong>Status Line:</strong> Version + Status Code + Reason (e.g., HTTP/1.1 200 OK)","<strong>Headers:</strong> Metadata (Content-Type, Content-Length, Cache-Control)","<strong>Body:</strong> Response data (JSON, HTML, etc.)"]},{heading:"Common HTTP Methods",content:"Standard methods and their semantics:",list:["<strong>GET:</strong> Retrieve resource (safe, idempotent)","<strong>POST:</strong> Create resource","<strong>PUT:</strong> Replace resource (idempotent)","<strong>PATCH:</strong> Partial update","<strong>DELETE:</strong> Remove resource (idempotent)","<strong>HEAD/OPTIONS:</strong> Metadata or preflight"]},{heading:"Status Code Categories",content:"Standard response classifications:",list:["<strong>2xx Success:</strong> 200 OK, 201 Created, 204 No Content","<strong>3xx Redirection:</strong> 301 Moved Permanently, 304 Not Modified","<strong>4xx Client Error:</strong> 400 Bad Request, 401 Unauthorized, 404 Not Found","<strong>5xx Server Error:</strong> 500 Internal, 503 Service Unavailable"]},{heading:"HTTPS and Security",content:"HTTPS adds encryption and authentication:",list:["<strong>TLS Handshake:</strong> Negotiates encryption keys","<strong>Certificates:</strong> Verify server identity","<strong>Benefits:</strong> Confidentiality, integrity, authentication","<strong>HSTS:</strong> Forces HTTPS usage"]},{heading:"HTTP in Angular Context",content:"Angular-specific considerations:",list:["<strong>HttpClient:</strong> Typed, RxJS-based HTTP client","<strong>Interceptors:</strong> Modify requests/responses globally","<strong>CORS:</strong> Browser-enforced for cross-origin requests","<strong>Error Handling:</strong> Centralized with retry/catchError"]}],codeExamples:[{title:"Complete HTTP Request Example",language:"http",description:"Full GET request with headers",code:`GET /api/v1/users/123 HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Accept-Encoding: gzip, deflate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
Cache-Control: no-cache
Connection: keep-alive`},{title:"Complete HTTP Response Example",language:"http",description:"200 OK response with JSON payload and caching headers",code:`HTTP/1.1 200 OK
Date: Mon, 20 Jan 2026 05:00:00 GMT
Server: nginx/1.18.0
Content-Type: application/json; charset=utf-8
Content-Length: 238
ETag: "abc123xyz"
Cache-Control: public, max-age=3600
Vary: Accept-Encoding

{
  "id": 123,
  "name": "Soumya Ranjan",
  "email": "soumya@example.com",
  "createdAt": "2026-01-01T00:00:00Z",
  "roles": ["admin", "developer"]
}`},{title:"Fetch API Usage (Modern JavaScript)",language:"javascript",description:"Native browser HTTP client with error handling",code:`async function fetchUser(id) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${id}\`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      credentials: 'include' // Send cookies
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const user = await response.json();
    console.log('User:', user);
    return user;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

fetchUser(123);`},{title:"POST Request with JSON Body",language:"javascript",description:"Creating a resource with proper headers",code:`async function createPost(title, body) {
  const response = await fetch('https://api.example.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 1
    })
  });

  if (response.status === 201) {
    const newPost = await response.json();
    console.log('Created:', newPost);
  }
}

createPost('My First Post', 'Hello Angular developers!');`},{title:"Angular HttpClient Example",language:"typescript",description:"Typed HTTP request in Angular service",code:`import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  createUser(user: Partial<User>): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User>(this.apiUrl, user, { headers });
  }
}`}],keyPoints:["HTTP is stateless; HTTPS adds encryption via TLS","Methods: GET (safe/idempotent), POST (create), PUT/PATCH (update), DELETE","Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error","Headers carry metadata; bodies carry payloads","Always use HTTPS in production to protect data","CORS restricts cross-origin requests in browsers","Caching headers (Cache-Control, ETag) improve performance","Modern APIs use JSON with proper Content-Type headers"],bestPractices:["Always use HTTPS in production (enforce with HSTS)","Use appropriate HTTP methods following REST conventions","Set proper Content-Type and Accept headers","Handle errors gracefully with status code checks","Implement authentication with secure tokens (JWT, not cookies for APIs)","Use HTTP caching headers for static resources","In Angular, prefer HttpClient with interceptors for auth/logging","Validate and sanitize all server responses"]};var Uo={title:"Angular ReactiveFormsModule: Complete Programmatic Forms Guide \u2013 FormBuilder, FormControl, FormGroup, FormArray, Typed Forms, Value Changes, Status Changes, and Enterprise Patterns",tags:["Angular","ReactiveFormsModule","FormBuilder","FormControl","FormGroup","FormArray","Typed Forms","ValueChanges","StatusChanges","Form Record"],paragraphs:["ReactiveFormsModule is Angular's programmatic approach to form handling, providing explicit control over form structure, validation, and data flow. Unlike template-driven forms, Reactive Forms are defined in the component class, offering complete predictability, immutability, and seamless integration with RxJS. This comprehensive guide covers everything from basic FormControl creation to advanced typed forms (Angular 14+), form arrays, dynamic form generation, custom value accessors, and enterprise-level form architecture patterns. Master the reactive paradigm for complex, testable, and scalable Angular forms."],keyPoints:["ReactiveFormsModule provides directives (formGroup, formControlName, formArrayName) but form classes are defined in component","FormBuilder service reduces boilerplate for creating FormGroup, FormControl, FormArray instances","FormControl: Tracks value and validation status of individual form control","FormGroup: Aggregates controls as object, validates at group level, creates nested structures","FormArray: Manages ordered collection of controls (dynamic rows, repeatable sections)","Typed Forms (Angular 14.1+): FormGroup<{ name: FormControl<string> }> provides type safety","NonNullableFormBuilder: Creates controls that cannot be null","FormRecord: For dynamic groups with unknown keys at compile time (Angular 15+)","valueChanges & statusChanges: Observable streams for reactive programming with RxJS","Explicit control creation leads to better testability and predictability"],sections:[{id:"reactive-forms-setup",heading:"ReactiveFormsModule \u2013 Setup and Core Directives",content:"ReactiveFormsModule provides the directives that connect component form models to the template, while form classes are explicitly instantiated in the component.",list:["Import ReactiveFormsModule: standalone: imports: [ReactiveFormsModule] or @NgModule imports","Create FormGroup in component: this.form = this.fb.group({...})","Template binding: <form [formGroup]='form'> connects template to component form instance","formControlName: <input formControlName='name'> binds input to specific control in the group","formGroupName: <div formGroupName='address'> for nested groups","formArrayName: <div formArrayName='phones'> for dynamic arrays","No ngModel! Reactive forms use explicit value and status streams"],additionalExplanation:"The key distinction from FormsModule is that ReactiveFormsModule directives only connect existing form instances to the DOM - they never create controls automatically. This separation of model (component) and view (template) is what makes reactive forms predictable and testable."},{id:"formbuilder-patterns",heading:"FormBuilder \u2013 Advanced Patterns and Typed Forms",content:"FormBuilder is a dependency-injected service that provides syntactic sugar for creating form controls with less boilerplate.",list:["Basic injection: constructor(private fb: FormBuilder) {}","Standard syntax: this.fb.group({ name: ['', Validators.required] })","Nested groups: this.fb.group({ address: this.fb.group({ street: '' }) })","Form arrays: this.fb.array([this.fb.control('')])","Typed FormBuilder (Angular 14+): this.fb.group<{ name: FormControl<string> }>({...})","NonNullableFormBuilder: controls that can't be set to null (Angular 14+)","FormBuilder.record(): creates FormRecord for dynamic property names (Angular 15+)"],additionalExplanation:"FormBuilder doesn't add new functionality - it's purely syntactic sugar. Each this.fb.control('') is equivalent to new FormControl(''). However, FormBuilder significantly reduces code verbosity and improves readability, especially with nested structures and arrays."},{id:"formcontrol-deep-dive",heading:"FormControl \u2013 Complete API and Advanced Usage",content:"FormControl is the atomic unit of reactive forms, managing the value, validation state, and disabled status of a single form field.",list:["Constructor: new FormControl(initialValue, [validators], [asyncValidators])","Value operations: setValue(), patchValue(), reset(), getRawValue() (includes disabled controls)","Status: valid, invalid, pending, disabled, enabled, pristine, dirty, touched, untouched","Errors: errors property returns null or validation error object","Events: valueChanges (Observable), statusChanges (Observable), events (Observable of all changes)","Parent communication: root, parent properties for tree navigation","Disable/Enable: disable(), enable() with emitEvent option to control valueChanges emission","UpdateOn: 'change' (default) | 'blur' | 'submit' - when validation/value updates occur"],additionalExplanation:"FormControl is a powerful class that extends AbstractControl. Understanding its full API is essential for advanced form manipulation. The getRawValue() method is particularly useful when you need the form value including disabled controls. The updateOn strategy can dramatically improve UX for expensive validation (e.g., server-side validation on blur instead of every keystroke)."},{id:"formgroup-mastery",heading:"FormGroup \u2013 Aggregation, Nesting, and Cross-Field Validation",content:"FormGroup aggregates multiple controls into a single object, enabling hierarchical form structures and validation across multiple fields.",list:["Constructor: new FormGroup({ name: new FormControl('') })","Control retrieval: .get('name'), .get('address.street'), .get(['address', 'street'])","Add/remove controls: addControl(name, control), removeControl(name), setControl(name, control)","Contains: contains(name) checks if control exists","SetValue: Requires exact shape matching all controls (throws error if mismatch)","PatchValue: Partial updates, only updates specified controls","Cross-field validation: Validator function receives the entire FormGroup","Nested groups: Access nested validation state: form.get('address').valid"],additionalExplanation:"FormGroup is not just a container - it's a validation and value aggregation engine. Cross-field validation (e.g., password confirmation) must be implemented at the FormGroup level because individual FormControls don't know about each other. The validator function receives the entire group and can access all child controls."},{id:"formarray-expert",heading:"FormArray \u2013 Dynamic Collections and Repeatable Sections",content:"FormArray manages an ordered list of AbstractControl instances (FormControl, FormGroup, or even nested FormArrays), essential for dynamic forms.",list:["Creation: this.fb.array([this.fb.control(''), this.fb.control('')])","Dynamic addition: .push(this.fb.control('')), .insert(index, control)","Removal: .removeAt(index), .clear() (removes all), .pop()","Replacement: .setControl(index, control)","Length: .length property (not a method!)","Iteration: .controls.forEach(), or *ngFor with formArrayName","Validation: ValidatorFn receives entire array, can validate min length, unique values, etc.","Performance: Use .at(index) for direct access, avoid recreating entire array"],additionalExplanation:"FormArray is often misunderstood. It doesn't require all controls to be of the same type - you can mix FormControl, FormGroup, and even other FormArrays. For complex dynamic forms (e.g., order items with name, price, quantity), each array element should be a FormGroup. Always create factory functions for array items to ensure clean, reusable code."},{id:"typed-forms",heading:"Typed Forms \u2013 Full Type Safety (Angular 14+)",content:"Angular 14 introduced typed forms, eliminating the any type for form.value and providing compile-time type checking for form structures.",list:["FormGroup<T>: T is an object type where each property extends AbstractControl","FormControl<T>: Generic type parameter defines the control's value type","FormArray<T>: Generic type parameter defines the type of each control in the array","Typed FormBuilder: this.fb.group<{ name: FormControl<string> }>({...})","NonNullableFormBuilder: Controls that cannot be null or undefined","FormRecord<T>: For dynamic groups with string keys and same value type (Angular 15+)","Untyped fallbacks: UntypedFormGroup, UntypedFormControl for gradual migration","Type-safe value: form.value.name is now string instead of any"],additionalExplanation:"Typed forms represent a major improvement in Angular's type safety. Previously, form.value was implicitly any, leading to runtime errors. Now, the type system ensures you never access non-existent properties or assign wrong types. Migration can be incremental using untyped variants for legacy code while adopting typed forms in new components."}],codeExamples:[{title:"Complete Typed Reactive Form with Nested Groups and FormArray",language:"typescript",code:`import { Component, inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Define the form shape with full type safety
interface PhoneForm {
  number: FormControl<string>;
  type: FormControl<'mobile' | 'home' | 'work'>;
}

interface AddressForm {
  street: FormControl<string>;
  city: FormControl<string>;
  zipCode: FormControl<string>;
  country: FormControl<string>;
}

interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
  address: FormGroup<AddressForm>;
  phones: FormArray<FormGroup<PhoneForm>>;
  preferences: FormRecord<FormControl<boolean>>;
}

@Component({
  selector: 'app-typed-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]='userForm' (ngSubmit)='onSubmit()'>
      <!-- Basic Fields -->
      <input formControlName='name' placeholder='Name'>
      <div *ngIf='userForm.controls.name.invalid && userForm.controls.name.touched'>
        Name is required
      </div>

      <input formControlName='email' type='email' placeholder='Email'>
      
      <!-- Nested FormGroup -->
      <div formGroupName='address'>
        <input formControlName='street' placeholder='Street'>
        <input formControlName='city' placeholder='City'>
      </div>

      <!-- FormArray -->
      <div formArrayName='phones'>
        <div *ngFor='let phone of phones.controls; let i=index'>
          <div [formGroupName]='i'>
            <input formControlName='number' placeholder='Phone number'>
            <select formControlName='type'>
              <option value='mobile'>Mobile</option>
              <option value='home'>Home</option>
              <option value='work'>Work</option>
            </select>
            <button type='button' (click)='removePhone(i)'>Remove</button>
          </div>
        </div>
        <button type='button' (click)='addPhone()'>Add Phone</button>
      </div>

      <!-- FormRecord -->
      <div formGroupName='preferences'>
        <label>
          <input type='checkbox' formControlName='newsletter'>
          Receive Newsletter
        </label>
        <label>
          <input type='checkbox' formControlName='promotions'>
          Receive Promotions
        </label>
      </div>

      <button type='submit' [disabled]='userForm.invalid'>Submit</button>
    </form>
  \`
})
export class TypedUserFormComponent {
  private fb = inject(NonNullableFormBuilder);

  // Fully typed form group
  userForm: FormGroup<UserForm> = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    age: this.fb.control<number | null>(null),
    address: this.fb.group<AddressForm>({
      street: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      zipCode: this.fb.control('', Validators.pattern(/^[0-9]{5}$/)),
      country: this.fb.control('USA')
    }),
    phones: this.fb.array<FormGroup<PhoneForm>>([]),
    preferences: this.fb.record<boolean>({
      newsletter: true,
      promotions: false
    })
  });

  get phones(): FormArray<FormGroup<PhoneForm>> {
    return this.userForm.controls.phones;
  }

  addPhone(): void {
    const phoneGroup = this.fb.group<PhoneForm>({
      number: this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      type: this.fb.control('mobile', Validators.required)
    });
    this.phones.push(phoneGroup);
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      // TypeScript knows userForm.value has correct types
      const formValue: UserForm = this.userForm.getRawValue();
      console.log(formValue.name.toUpperCase()); // Safe: name is string
      console.log(formValue.phones[0].type); // Safe: type is 'mobile' | 'home' | 'work'
    }
  }
}`},{title:"Advanced RxJS Integration with valueChanges",language:"typescript",code:`import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil, filter, map, pairwise, startWith } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-rxjs-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]='searchForm'>
      <input formControlName='username' placeholder='Username'>
      <span *ngIf='checking$ | async'>Checking availability...</span>
      <span *ngIf='usernameAvailable$ | async as available'>
        {{ available ? '\u2705 Available' : '\u274C Taken' }}
      </span>
      
      <input formControlName='search' placeholder='Search...'>
      <div>Search results: {{ searchResults$ | async | json }}</div>
    </form>
  \`
})
export class RxjsFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private destroy$ = new Subject<void>();

  searchForm: FormGroup = this.fb.group({
    username: ['', Validators.required, [this.usernameAvailabilityValidator.bind(this)]],
    search: ['']
  });

  checking$ = new Subject<boolean>();
  usernameAvailable$ = this.searchForm.controls.username.statusChanges.pipe(
    map(status => status === 'VALID'),
    startWith(false)
  );

  searchResults$ = this.searchForm.controls.search.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(query => query.length >= 3),
    switchMap(query => this.userService.searchUsers(query)),
    takeUntil(this.destroy$)
  );

  ngOnInit(): void {
    // Monitor form changes over time
    this.searchForm.valueChanges.pipe(
      pairwise(),
      takeUntil(this.destroy$)
    ).subscribe(([prev, curr]) => {
      console.log('Form changed from', prev, 'to', curr);
    });

    // Conditional field enabling
    this.searchForm.controls.username.statusChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      if (status === 'VALID') {
        this.searchForm.controls.search.enable();
      } else {
        this.searchForm.controls.search.disable();
      }
    });
  }

  usernameAvailabilityValidator(control: AbstractControl) {
    this.checking$.next(true);
    return control.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(username => this.userService.checkUsername(username)),
      map(isAvailable => isAvailable ? null : { unavailable: true }),
      takeUntil(this.destroy$),
      tap(() => this.checking$.next(false))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`},{title:"Dynamic Form Generation from JSON Schema",language:"typescript",code:`import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'array';
  label: string;
  validators?: string[];
  options?: Array<{ value: any; label: string }>;
  fields?: FormFieldConfig[]; // For nested groups
  arrayConfig?: FormFieldConfig[]; // For array items
  defaultValue?: any;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <form [formGroup]='form' (ngSubmit)='onSubmit()'>
      <ng-container *ngFor='let field of config'>
        <ng-container [ngSwitch]='field.type'>
          <!-- Simple Input -->
          <div *ngSwitchCase='"text"' class='form-field'>
            <label>{{field.label}}</label>
            <input [formControlName]='field.name' [type]='field.type'>
          </div>

          <!-- Select Dropdown -->
          <div *ngSwitchCase='"select"'>
            <label>{{field.label}}</label>
            <select [formControlName]='field.name'>
              <option *ngFor='let opt of field.options' [value]='opt.value'>
                {{opt.label}}
              </option>
            </select>
          </div>

          <!-- Nested FormGroup -->
          <div *ngSwitchCase='"group"' [formGroupName]='field.name'>
            <h3>{{field.label}}</h3>
            <app-dynamic-form 
              [config]='field.fields || []' 
              [form]='form.get(field.name)'>
            </app-dynamic-form>
          </div>

          <!-- FormArray -->
          <div *ngSwitchCase='"array"' [formArrayName]='field.name'>
            <label>{{field.label}}</label>
            <div *ngFor='let _ of getFormArray(field.name).controls; let i=index'>
              <app-dynamic-form 
                [config]='field.arrayConfig || []' 
                [form]='getFormArray(field.name).at(i)'>
              </app-dynamic-form>
              <button type='button' (click)='removeArrayItem(field.name, i)'>Remove</button>
            </div>
            <button type='button' (click)='addArrayItem(field.name)'>Add</button>
          </div>
        </ng-container>
      </ng-container>
      
      <button type='submit' [disabled]='form.invalid'>Submit</button>
    </form>
  \`
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormFieldConfig[] = [];
  @Input() form?: FormGroup;
  
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.createForm(this.config);
    }
  }

  createForm(config: FormFieldConfig[]): FormGroup {
    const group: any = {};
    
    config.forEach(field => {
      switch (field.type) {
        case 'array':
          group[field.name] = this.fb.array([]);
          break;
        case 'group':
          group[field.name] = this.createForm(field.fields || []);
          break;
        default:
          group[field.name] = this.fb.control(
            field.defaultValue || '',
            this.mapValidators(field.validators || [])
          );
      }
    });
    
    return this.fb.group(group);
  }

  getFormArray(name: string): FormArray {
    return this.form?.get(name) as FormArray;
  }

  addArrayItem(name: string): void {
    const array = this.getFormArray(name);
    const fieldConfig = this.config.find(c => c.name === name);
    
    if (fieldConfig?.arrayConfig) {
      const itemGroup = this.createForm(fieldConfig.arrayConfig);
      array.push(itemGroup);
    }
  }

  removeArrayItem(name: string, index: number): void {
    this.getFormArray(name).removeAt(index);
  }

  private mapValidators(validators: string[]): any[] {
    const validatorMap: Record<string, any> = {
      'required': Validators.required,
      'email': Validators.email,
      'minLength3': Validators.minLength(3),
      'minLength8': Validators.minLength(8),
      'phone': Validators.pattern(/^[0-9]{10}$/)
    };
    
    return validators.map(v => validatorMap[v]).filter(Boolean);
  }

  onSubmit(): void {
    if (this.form?.valid) {
      console.log('Dynamic form value:', this.form.value);
    }
  }
}`}],bestPractices:["Always use FormBuilder instead of manually creating new FormControl/FormGroup instances","Use typed forms (FormGroup<T>) in Angular 14+ for compile-time type safety","Inject NonNullableFormBuilder for controls that should never be null","Create factory functions for FormArray items to ensure consistent structure","Use getter properties for FormArray access to reduce template complexity","Implement OnPush change detection strategy with immutable form updates","Always unsubscribe from valueChanges (or use takeUntil pattern) to prevent memory leaks","Use patchValue for partial updates, setValue when you must update entire form structure","Prefer async pipe over manual subscriptions for valueChanges in templates","Implement custom ControlValueAccessor for reusable form controls","Use FormRecord over dynamic FormGroup when all controls share the same type","Centralize validation logic in separate validator functions for reusability","Mark forms as touched on submit (markAllAsTouched()) to show validation errors","Use updateOn: 'blur' or 'submit' for expensive validation operations","Break extremely large forms into child components with @Input() formGroup"]};var No={title:"Angular Routing & Navigation: Comprehensive Guide with Deep Details, Examples, and Best Practices",tags:["Angular","Routing","Navigation","Router","Lazy Loading","Guards","Resolvers","Route Parameters","Best Practices","Performance"],paragraphs:["Routing and navigation are central to building modern single-page applications (SPAs) in Angular. The Angular Router enables declarative navigation, lazy loading of feature modules, parameterized routes, route guards for security and control, data pre-fetching with resolvers, and much more. Mastering routing is essential for creating scalable, performant, and user-friendly Angular applications. This in-depth guide covers every major aspect of Angular routing: core concepts, configuration patterns, route parameters, child routes, lazy loading, guards, resolvers, programmatic navigation, auxiliary routes, route reuse strategies, modern standalone routing, and proven best practices to help you build robust navigation systems."],keyPoints:["RouterModule: The core module that provides routing capabilities.","Routes Configuration: Array of route definitions with path, component, children, loadChildren, etc.","Lazy Loading: Load feature modules only when needed \u2192 dramatically improves initial load time.","Route Parameters & Query Params: Dynamic data in URLs (/:id, ?search=term).","Route Guards: CanActivate, CanMatch, CanDeactivate, Resolve, CanLoad for security and data control.","Resolvers: Pre-fetch data before activating a route.","Router Events & Navigation Lifecycle: Intercept navigation, handle errors, show loaders.","Standalone Routing: Modern Angular (14+) eliminates NgModule dependency for routing."],sections:[{id:"what-is-angular-routing",heading:"What is Angular Routing?",content:"The Angular Router is a powerful service that enables navigation between different views (components) within a single-page application. Instead of full page reloads, it updates the URL and renders the appropriate component based on the current route.",list:["Declarative routing in templates using <router-outlet> and routerLink","Supports deep linking and browser history (back/forward buttons)","Handles parameterized routes, query parameters, fragments","Enables lazy loading of feature modules","Provides guards, resolvers, and navigation events"],additionalExplanation:"Routing transforms Angular from a component-based UI library into a full-featured SPA framework. It manages the entire navigation lifecycle, from URL change to component activation and data resolution."},{id:"basic-routing-setup",heading:"Basic Routing Setup & Configuration",content:"Routing is configured using an array of Route objects, typically in a dedicated routing module or directly in standalone applications.",list:["RouterModule.forRoot(routes) \u2192 root-level configuration","RouterModule.forChild(routes) \u2192 feature/child modules","<router-outlet> \u2192 placeholder where routed components render","routerLink directive \u2192 declarative navigation","RouterLinkActive \u2192 highlights active route"],additionalExplanation:"In modern Angular (17+), routing can be fully functional and standalone with provideRouter() and createRoutesFromChildren()."},{id:"route-parameters",heading:"Route Parameters & Query Parameters",content:"Dynamic routes use parameters to pass data through the URL.",list:["Path parameters: /user/:id \u2192 ActivatedRoute.snapshot.paramMap.get('id')","Query parameters: /products?category=books&sort=price \u2192 ActivatedRoute.queryParams","Fragment: /help#section2 \u2192 ActivatedRoute.fragment","ActivatedRoute & ActivatedRouteSnapshot for accessing route data"],additionalExplanation:"Use paramMap for required data, queryParams for optional filters. Prefer route params for identifying resources (RESTful style)."},{id:"child-routes-nested-routing",heading:"Child Routes & Nested Routing",content:"Child routes enable nested layouts (e.g., sidebar + content) and organized feature routing.",list:["children: [] array inside a parent route","Named router-outlets for multiple content areas",'Relative navigation with routerLink="./child"',"Common pattern: feature module with its own routing file"],additionalExplanation:"Nested routes are essential for complex dashboards, admin panels, and tabbed interfaces."},{id:"lazy-loading",heading:"Lazy Loading \u2013 Performance Optimization",content:"Lazy loading defers loading of feature modules until the user navigates to them, significantly reducing initial bundle size.",list:["loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)","Preloading strategies: PreloadAllModules, custom preloading","CanLoad guard for protecting lazy routes","Automatic chunk creation during build"],additionalExplanation:"Lazy loading is one of the most impactful performance optimizations in large Angular applications."},{id:"route-guards",heading:"Route Guards \u2013 Security & Control",content:"Guards decide whether a route can be activated, loaded, or deactivated.",list:["CanActivate / CanActivateChild: protect route access","CanMatch: choose which route to activate","CanDeactivate: prevent leaving unsaved forms","CanLoad: protect lazy-loaded modules (prevents loading)","Resolve: fetch data before activation"],additionalExplanation:"Guards are commonly used for authentication, role-based access, and preventing data loss."},{id:"resolvers",heading:"Resolvers \u2013 Data Pre-fetching",content:"Resolvers fetch data before a route is activated, ensuring components receive ready data.",list:["Implement Resolve<T> interface","Return Observable, Promise, or value","Data available via ActivatedRoute.snapshot.data","Combine with async pipe in templates"],additionalExplanation:"Resolvers improve UX by avoiding loading states in components and centralize data fetching logic."},{id:"standalone-routing",heading:"Standalone Routing (Modern Angular)",content:"Since Angular 14+, routing can be fully configured without NgModules using provideRouter().",list:["provideRouter(routes) in bootstrapApplication","createRoutesFromChildren() for modular route definitions","Functional guards, resolvers, and interceptors","importProvidersFrom() for legacy module interop"],additionalExplanation:"Standalone routing reduces boilerplate, improves tree-shaking, and is the future direction of Angular."}],codeExamples:[{title:"Basic Standalone Routing Setup",language:"typescript",code:`import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});`,description:"Modern way to bootstrap routing in a standalone application."},{title:"Lazy Loaded Feature Route",language:"typescript",code:`const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then(m => m.PRODUCTS_ROUTES)
  }
];

// products.routes.ts
export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetailComponent }
];`,description:"Recommended lazy loading pattern with separate route files."},{title:"Auth Guard Example",language:"typescript",code:`import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};`,description:"Functional CanActivate guard (modern style)."},{title:"Resolver Example",language:"typescript",code:`import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';

export const userResolver: ResolveFn<User> = (route) => {
  const userService = inject(UserService);
  const id = route.params['id'];
  return userService.getUser(id);
};`,description:"Resolver that fetches user data before route activation."}],bestPractices:["Use standalone routing and provideRouter() for new projects.","Organize routes into separate files per feature (feature.routes.ts).","Always lazy load feature modules in medium/large applications.","Use functional guards and resolvers in modern Angular.","Centralize route constants (paths, roles) to avoid magic strings.","Handle navigation errors and show loading spinners using Router events.","Prefer route params over query params for required identifiers.","Use pathMatch: 'full' for redirects and exact matches.","Implement CanDeactivate for unsaved changes protection.","Monitor bundle sizes \u2013 lazy loading should create meaningful chunks.","Use title strategy or Route data for dynamic page titles.","Combine with signals and async pipe for reactive route data handling."]};var jo={title:"RxJS Higher-Order Operators Deep Dive: mergeMap, switchMap, concatMap, exhaustMap, combineLatest & forkJoin",tags:["RxJS","Angular","mergeMap","switchMap","concatMap","exhaustMap","combineLatest","forkJoin","Higher-Order Operators","Reactive Programming"],paragraphs:["Higher-order mapping operators are among the most powerful \u2014 and most frequently misunderstood \u2014 tools in RxJS. They allow you to map each value from a source Observable to a new inner Observable, and then decide how to combine/flatten the emissions from those inner Observables. Choosing the right one dramatically affects performance, memory usage, race conditions, and correctness of your application. This guide explains mergeMap, switchMap, concatMap, exhaustMap, combineLatest, and forkJoin in depth: how they behave, when to use each, real Angular use cases, marble diagrams intuition, common pitfalls, and best practices."],keyPoints:["mergeMap \u2192 runs all inner Observables concurrently, no cancellation","switchMap \u2192 cancels previous inner Observable, only latest one matters","concatMap \u2192 queues inner Observables, preserves order, waits for completion","exhaustMap \u2192 ignores new values while inner Observable is active","combineLatest \u2192 emits when ANY source emits, combines latest values","forkJoin \u2192 waits for ALL Observables to complete, emits once with all results"],sections:[{id:"mergeMap",heading:"mergeMap (also known as flatMap)",content:"Projects each source value to an Observable and merges all emissions concurrently.",list:["No cancellation of previous inner Observables","All inner Observables run in parallel","Emits values as soon as any inner Observable emits","Can produce many concurrent subscriptions","Memory leak risk if inner Observables never complete"],additionalExplanation:"Use when you want every request/action to complete independently (parallel execution, no cancellation needed). Less common in modern Angular than switchMap."},{id:"switchMap",heading:"switchMap \u2013 The Most Used in Angular",content:"Maps to inner Observable and switches to the new one, cancelling the previous inner subscription.",list:["Cancels previous inner Observable when new source value arrives","Only the latest inner Observable matters","Prevents race conditions","Ideal for search, type-ahead, dependent API calls, user input \u2192 HTTP"],additionalExplanation:"switchMap is the go-to operator for most user-triggered async operations in Angular \u2014 it ensures you always get the result of the latest action."},{id:"concatMap",heading:"concatMap",content:"Maps to inner Observable and queues them \u2014 processes one at a time, in order.",list:["Waits for previous inner Observable to complete before starting next","Preserves order of emissions","No concurrency \u2014 safe but can feel slow","Good when order matters and you cannot lose requests"],additionalExplanation:"Use when sequence is important (e.g., save operations that must happen in order)."},{id:"exhaustMap",heading:"exhaustMap",content:"Maps to inner Observable, but ignores new source values while inner is active.",list:["Only one inner Observable runs at a time","New values are dropped until current inner completes","Prevents overlapping / spam (great for button clicks)","Common use: 'Submit' button while request is processing"],additionalExplanation:"exhaustMap protects against rapid repeated actions \u2014 the first action wins, others are ignored until it finishes."},{id:"combineLatest",heading:"combineLatest",content:"Combines multiple Observables \u2014 emits whenever ANY of them emits, using the latest value from each.",list:["Requires all sources to have emitted at least once","Emits on every change of any source","Great for reactive forms with multiple dependent fields","Can be memory-intensive if sources emit very frequently"],additionalExplanation:"Classic use case: combine form control values or multiple API states."},{id:"forkJoin",heading:"forkJoin",content:"Waits for ALL Observables to complete, then emits once with an array/object of last values.",list:["Like Promise.all for Observables","Only emits when every source completes","If any source errors \u2192 whole forkJoin errors","Perfect for loading independent data in parallel"],additionalExplanation:"Very common in Angular for loading user profile + roles + settings at once."}],codeExamples:[{title:"switchMap \u2013 Search / Type-ahead (most common pattern)",language:"typescript",code:`this.searchTerm$.pipe(
  debounceTime(350),
  distinctUntilChanged(),
  switchMap(term => 
    this.http.get<SearchResult[]>(\`/api/search?q=\${term}\`).pipe(
      catchError(() => of([]))
    )
  )
).subscribe(results => this.results = results);`,description:"Latest search term cancels previous request \u2192 no race conditions"},{title:"concatMap \u2013 Ordered sequential saves",language:"typescript",code:`this.form.valueChanges.pipe(
  concatMap(value => this.http.post('/api/save', value))
).subscribe(response => console.log('Saved:', response));`,description:"Each change is saved only after the previous save completes"},{title:"exhaustMap \u2013 Prevent button spam",language:"typescript",code:`fromEvent(this.submitButton, 'click').pipe(
  exhaustMap(() => this.http.post('/api/submit', this.form.value))
).subscribe(...);`,description:"While submit is in progress, additional clicks are ignored"},{title:"forkJoin \u2013 Load multiple independent resources",language:"typescript",code:`forkJoin({
  user: this.userService.getCurrentUser(),
  permissions: this.authService.getPermissions(),
  config: this.configService.getAppConfig()
}).subscribe(results => {
  this.user = results.user;
  this.permissions = results.permissions;
});`,description:"Waits for all to finish, emits once"},{title:"combineLatest \u2013 React to multiple form controls",language:"typescript",code:`combineLatest([
  this.form.get('startDate')!.valueChanges,
  this.form.get('endDate')!.valueChanges
]).pipe(
  filter(([start, end]) => !!start && !!end),
  switchMap(([start, end]) => this.http.get<Report>(\`/report?start=\${start}&end=\${end}\`))
).subscribe(report => this.report = report);`,description:"Re-runs query whenever either date changes"}],bestPractices:["Use **switchMap** for most user-triggered async operations (search, filter, route params \u2192 data load)","Use **concatMap** when order is important and you cannot afford to drop requests","Use **exhaustMap** to protect against rapid repeated user actions (clicks, submits)","Use **mergeMap** only when you really want all inner Observables to run in parallel without cancellation","Always put **catchError** inside the inner observable in mapping operators","Prefer **combineLatestWith** or **combineLatest** when combining 2\u20135 streams","Use **forkJoin** when you need all data before proceeding (initial page load)","Avoid mergeMap without limits \u2014 can create many concurrent HTTP calls","Combine higher-order operators with **debounceTime**, **distinctUntilChanged**, **takeUntil**","Modern Angular: Consider signals + toObservable() when simple mapping is enough"]};var Lo={title:"RxJS Operators in Angular: Complete In-Depth Guide \u2013 Categories, Most Important Operators, Examples & Best Practices",tags:["Angular","RxJS","Operators","Reactive Programming","Transformation","Filtering","Combination","Error Handling","Utility","Best Practices"],paragraphs:["RxJS operators are the heart of reactive programming in Angular. They allow you to transform, filter, combine, handle errors, and manage streams of data (Observables) in a clean, declarative, and powerful way. Operators are pure functions that take an Observable as input, modify its behavior or data, and return a new Observable. This comprehensive guide covers the most important RxJS operators grouped by category: transformation, filtering, combination, multicasting, error handling, utility, conditional, and mathematical. You'll find detailed explanations, real-world Angular use cases, common patterns, pitfalls, and best practices to help you write efficient, readable, and maintainable reactive code."],keyPoints:["Operators are chained using .pipe()","Most operators are pure \u2014 they do not mutate the source Observable","Categories: Transformation (map, pluck), Filtering (filter, debounceTime), Combination (mergeMap, switchMap), Multicasting (shareReplay), Error Handling (catchError, retry), Utility (tap, finalize)","Higher-order mapping operators: mergeMap, concatMap, switchMap, exhaustMap \u2014 critical for Angular HTTP and async operations","Angular loves RxJS: HttpClient, forms valueChanges, router events, async pipe \u2014 all built around Observables and operators"],sections:[{id:"transformation-operators",heading:"Transformation Operators",content:"Change the data emitted by the Observable.",list:["map: Transforms each value (like Array.map)","pluck: Extracts a property from objects (deprecated \u2192 use map)","mapTo: Maps every value to a constant","mergeMap / flatMap: Projects each value to an Observable and flattens (concurrent)","switchMap: Cancels previous inner Observable, switches to new one (most common in Angular)","concatMap: Queues inner Observables, waits for completion (ordered)","exhaustMap: Ignores new values while inner Observable is active (e.g. click spam protection)","scan: Accumulates values like reduce over time"],additionalExplanation:"Higher-order mapping operators (mergeMap family) are the most important and most misused in Angular \u2014 choosing the right one prevents memory leaks and race conditions."},{id:"filtering-operators",heading:"Filtering Operators",content:"Decide which values should pass through.",list:["filter: Only emit values that match condition","distinctUntilChanged: Skip duplicate consecutive values","debounceTime: Wait for silence before emitting (search input)","throttleTime: Emit first value, then ignore for duration","take(n): Take first n values then complete","takeUntil(notifier): Complete when notifier emits","skip(n): Skip first n values","ignoreElements: Ignore all next emissions, only complete/error"],additionalExplanation:"debounceTime + distinctUntilChanged is the classic combo for search/autocomplete inputs."},{id:"combination-operators",heading:"Combination / Joining Operators",content:"Combine multiple Observables.",list:["combineLatest: Emit when any source emits (latest values)","withLatestFrom: Pair with latest value from another source","forkJoin: Wait for all Observables to complete (like Promise.all)","merge: Merge emissions from multiple sources concurrently","concat: Concatenate Observables sequentially","zip: Pair values from multiple sources by index","race: Emit from the first Observable that emits"],additionalExplanation:"forkJoin is perfect for loading multiple independent API calls at once."},{id:"multicasting-operators",heading:"Multicasting & Sharing Operators",content:"Share a single execution among multiple subscribers.",list:["share: Multicast with no replay","shareReplay(bufferSize, windowTime): Replay last N values to late subscribers","publish + refCount: Manual multicast (rarely used directly)","multicast + refCount: Low-level control"],additionalExplanation:"shareReplay(1) is the go-to for caching HTTP responses or shared state."},{id:"error-handling-retry",heading:"Error Handling & Retry Operators",content:"Manage errors and retries gracefully.",list:["catchError: Catch and recover from errors","retry(n): Retry n times on error","retryWhen: Advanced retry logic (delay, exponential backoff)","finalize: Run code on complete or error (cleanup)"],additionalExplanation:"Always use catchError in Angular services \u2014 never let errors reach the template."},{id:"utility-debugging",heading:"Utility & Debugging Operators",content:"Side effects, logging, debugging.",list:["tap: Perform side effects (logging, analytics) without changing value","finalize: Cleanup regardless of complete/error","delay: Delay emissions","timeout: Throw error if no value within time"],additionalExplanation:"tap is used for debugging and side effects \u2014 never put business logic in tap."}],codeExamples:[{title:"switchMap \u2013 Most Common Angular Pattern",language:"typescript",code:`this.searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.http.get<User[]>(\`/api/users?q=\${term}\`))
).subscribe(results => this.results = results);`,description:"Search input \u2192 debounce \u2192 cancel previous request \u2192 new search (prevents race conditions)."},{title:"forkJoin \u2013 Parallel API Calls",language:"typescript",code:`forkJoin({
  user: this.http.get<User>('/api/user'),
  posts: this.http.get<Post[]>('/api/posts'),
  settings: this.http.get<Settings>('/api/settings')
}).subscribe(({ user, posts, settings }) => {
  // all completed
});`,description:"Load multiple independent resources at once."},{title:"shareReplay \u2013 Cache HTTP Response",language:"typescript",code:`private products$ = this.http.get<Product[]>('/api/products').pipe(
  shareReplay(1)
);

// Multiple components can subscribe without new HTTP calls
this.products$.subscribe(...);`,description:"Single HTTP call, cached result for all subscribers."},{title:"takeUntil + destroy$ pattern",language:"typescript",code:`private destroy$ = new Subject<void>();

ngOnInit() {
  this.data$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(...);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}`,description:"Safe cleanup pattern (before async pipe became dominant)."}],bestPractices:["Always use .pipe() to chain operators \u2014 improves readability and type safety.","Prefer switchMap for search/autocomplete/API calls \u2014 cancels outdated requests.","Use concatMap when order matters (sequential operations).","Use exhaustMap for click handlers where you want to ignore new clicks during processing.","Never forget catchError in data services \u2014 handle errors gracefully.","Use shareReplay(1) or shareReplay({ bufferSize: 1, refCount: true }) for caching.","Avoid nested subscribe \u2014 flatten with mergeMap/switchMap/etc.","Use async pipe in templates \u2014 automatic subscribe/unsubscribe.","Combine takeUntil(destroy$) or take(1) for manual subscriptions (legacy code).","Debug with tap() + console.log \u2014 but remove before production.","Learn the marble diagrams \u2014 they explain operator behavior perfectly.","Modern Angular (16+): Combine RxJS with signals when appropriate (toSignal, toObservable)."]};var Ho={title:"RxJS Subjects in Angular: Complete Guide \u2013 Types, Behavior, Use Cases, Patterns & Best Practices",tags:["Angular","RxJS","Subjects","BehaviorSubject","ReplaySubject","AsyncSubject","Subject","Multicasting","State Management","Best Practices"],paragraphs:["Subjects are a special type of Observable in RxJS that act both as an Observable (you can subscribe to them) and as an Observer (you can call .next(), .error(), .complete() on them). They are the foundation for multicasting, state sharing, and event broadcasting in Angular applications. Unlike plain Observables, Subjects allow multiple subscribers to receive the same values and enable manual emission of data. This in-depth guide explains all four main types of Subjects (Subject, BehaviorSubject, ReplaySubject, AsyncSubject), their differences in behavior, when and how to use them, common Angular patterns, memory management considerations, modern alternatives (signals), and proven best practices to avoid common pitfalls like memory leaks or unexpected behavior."],keyPoints:["Subject: Basic multicast Observable \u2014 only emits values after subscription","BehaviorSubject: Requires an initial value \u2014 new subscribers immediately receive the current (last) value","ReplaySubject: Remembers and replays a buffer of previous values to new subscribers","AsyncSubject: Emits only the last value when it completes (useful for 'final result' scenarios)","Multicasting: All Subjects are multicast \u2014 multiple subscribers share the same execution","Cold vs Hot: Plain Observables are cold (each subscriber gets fresh execution); Subjects are hot (shared execution)","Angular Usage: State sharing, event buses, form value broadcasting, component communication"],sections:[{id:"what-is-a-subject",heading:"What is an RxJS Subject?",content:"A Subject is both an Observable and an Observer. You can subscribe to it like any Observable, and you can push values into it using .next(). This dual nature makes Subjects ideal for sharing data across multiple parts of an application.",list:["Multicast by nature \u2014 all subscribers receive the same values","Hot Observable \u2014 starts emitting only when .next() is called, regardless of subscribers","Does NOT replay values to late subscribers (unless using ReplaySubject or BehaviorSubject)","Can be manually completed or errored","Requires explicit subscription management in Angular (or use async pipe)"],additionalExplanation:"Subjects are the bridge between imperative code (calling .next()) and reactive subscribers. They turn imperative events into reactive streams."},{id:"types-of-subjects",heading:"The Four Types of Subjects \u2013 Detailed Comparison",content:"RxJS provides four main Subject variants with different replay and initial-value behaviors.",list:["Subject \u2014 No initial value, no replay. New subscribers only get future values.","BehaviorSubject \u2014 Requires an initial value. New subscribers immediately get the current (latest) value.","ReplaySubject(n) \u2014 Remembers the last n values. New subscribers get those n values immediately, then future ones.","AsyncSubject \u2014 Emits only the last value, but only when .complete() is called."],additionalExplanation:"BehaviorSubject and ReplaySubject are by far the most commonly used in Angular applications."},{id:"behavior-subject",heading:"BehaviorSubject \u2013 Most Used in Angular",content:"Represents state \u2014 always has a current value.",list:["new BehaviorSubject<T>(initialValue)","Subscribers get current value immediately upon subscribe",".next(value) updates the current value",".value property gives current value synchronously","Perfect for: user state, theme, settings, cart contents, feature flags"],additionalExplanation:"BehaviorSubject is the go-to for shared application state when you want new components to immediately get the current state."},{id:"replay-subject",heading:"ReplaySubject \u2013 For Late Subscribers",content:"Remembers history of emissions.",list:["new ReplaySubject<T>(bufferSize?, windowTime?)","ReplaySubject(1) \u2248 BehaviorSubject but without mandatory initial value","New subscribers receive the last N values (or all if bufferSize omitted)","Useful for: logs, recent actions, last N search results"],additionalExplanation:"ReplaySubject(1) is often used when you want caching without forcing an initial value."},{id:"subject-vs-behavior-vs-replay",heading:"Subject vs BehaviorSubject vs ReplaySubject \u2013 Quick Decision Guide",content:"Choosing the right Subject type is critical.",list:["Use plain Subject when: you only care about future events (clicks, notifications, real-time updates)","Use BehaviorSubject when: you need current state immediately (user auth status, current page, app configuration)","Use ReplaySubject(1) when: you want caching without initial value (last API response, recent errors)","Use ReplaySubject(n) when: you need history (last 5 actions, recent notifications)","Use AsyncSubject when: you only care about the final value after completion (e.g. computation result)"],additionalExplanation:"In Angular 90%+ of cases, you'll use BehaviorSubject or ReplaySubject(1)."},{id:"common-patterns-angular",heading:"Common Patterns Using Subjects in Angular",content:"Subjects are frequently used for state sharing and event broadcasting.",list:["Global state service (BehaviorSubject)","Component-to-component communication without parent-child relationship","takeUntil(destroy$) pattern for cleanup","Form value broadcasting to multiple components","Loading / error state management","Event bus (avoid overusing \u2014 prefer services + BehaviorSubject)"],additionalExplanation:"The most common pattern today is BehaviorSubject + asObservable() to hide the .next() method from consumers."}],codeExamples:[{title:"BehaviorSubject \u2013 Typical State Service",language:"typescript",code:`import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User { id: number; name: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  get currentUserValue(): User | null {
    return this.userSubject.value;
  }

  login(user: User) {
    this.userSubject.next(user);
  }

  logout() {
    this.userSubject.next(null);
  }
}`,description:"Standard auth/user state service using BehaviorSubject."},{title:"ReplaySubject \u2013 Last N Actions",language:"typescript",code:`private actionHistory = new ReplaySubject<string>(5);

logAction(action: string) {
  this.actionHistory.next(action);
}

// In component
this.actionHistory.subscribe(action => console.log('Recent action:', action));
// New subscriber gets last 5 actions immediately`,description:"Keeps history of last 5 actions for new subscribers."},{title:"takeUntil + Subject for Cleanup",language:"typescript",code:`private destroy$ = new Subject<void>();

ngOnInit() {
  interval(1000)
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => console.log('tick'));
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}`,description:"Classic manual cleanup pattern (before async pipe dominance)."}],bestPractices:["Always expose .asObservable() instead of the Subject directly \u2014 hide .next() from consumers.","Prefer BehaviorSubject for most state management needs.","Use ReplaySubject(1) when initial value is not required but caching is.","Avoid plain Subject unless you intentionally want to ignore past values.","Never expose Subject directly from services \u2014 breaks encapsulation.","Use async pipe in templates with Subjects \u2014 automatic subscription management.","Clean up long-lived Subjects with takeUntil(destroy$) or async pipe.","Avoid using Subjects as a global event bus \u2014 prefer domain-specific services.","Combine BehaviorSubject with shareReplay(1) when needed for cold \u2192 hot conversion.","Modern Angular (16+): Consider signals instead of BehaviorSubject for simple local/component state.","Document what each Subject represents and when/why it emits."]};var zo={title:"Angular Services: In-Depth Guide to Creation, Usage, Architecture, and Best Practices",tags:["Angular","Services","Dependency Injection","Singleton","Architecture","Best Practices","State Management"],paragraphs:["Services in Angular are singleton classes designed to encapsulate reusable business logic, data access, state management, and shared functionality across components, directives, and other services. They are one of the most important architectural building blocks in Angular applications. Services promote separation of concerns, improve testability, enable code reuse, and keep components focused on presentation and user interaction rather than complex logic. This comprehensive guide explores services in detail: what they are, how to create and register them, different use cases, scoped vs application-wide services, common patterns, integration with RxJS and modern Angular features (signals, standalone), and proven best practices to build clean, scalable, and maintainable Angular applications."],keyPoints:["Services: Classes decorated with @Injectable() that handle logic, data fetching, business rules, and shared state.","Dependency Injection: Services are almost always used via Angular's powerful DI system.","providedIn: 'root' \u2013 The modern, recommended way to create application-wide singletons.","Scoped Services: Created per component or module when isolation is needed.","Common Responsibilities: HTTP communication, state management, authentication, logging, utilities, data sharing.","RxJS Integration: Services are the natural place to handle Observables, Subjects, and async operations.","Modern Angular: Services work seamlessly with standalone components, signals, and functional guards/interceptors."],sections:[{id:"what-are-angular-services",heading:"What Are Angular Services?",content:"A service is a TypeScript class decorated with @Injectable() that is designed to be injectable via Angular's dependency injection system. Services are used to organize and share code across different parts of the application in a clean, reusable way.",list:["Encapsulate business logic, data access, and complex computations","Act as a single source of truth for shared data or functionality","Keep components lean and focused on UI concerns","Improve testability by isolating logic from presentation","Support both singleton (application-wide) and scoped (per-component) lifetime"],additionalExplanation:"The core philosophy is separation of concerns: components should handle rendering and user events, while services manage everything else \u2014 from API calls to caching, validation, formatting, authentication, and inter-component communication."},{id:"creating-and-registering-services",heading:"Creating and Registering Services",content:"Services are created with the Angular CLI and registered using one of several strategies. The modern approach favors tree-shakable registration.",list:["ng generate service my-service \u2192 creates my-service.service.ts","providedIn: 'root' \u2014 application-wide singleton (recommended)","providedIn: 'platform' \u2014 shared across multiple Angular applications","providedIn: 'any' \u2014 one instance per lazy-loaded module","providedIn: SomeModule \u2014 scoped to a specific NgModule","providers array in @Component / @Directive \u2014 scoped to that component hierarchy","providers in bootstrapApplication() \u2014 for standalone applications"],additionalExplanation:"Since Angular 6, providedIn: 'root' is preferred over listing services in NgModule providers because it enables better tree-shaking and removes the risk of forgetting to register a service."},{id:"common-use-cases-for-services",heading:"Common Use Cases for Services",content:"Services fulfill a wide range of responsibilities in real-world Angular applications.",list:["Data Services: Fetching and caching data via HttpClient","Auth Services: Managing login, tokens, user state, guards","State Services: Sharing data between unrelated components (without full NgRx)","Utility Services: Formatting, validation, logging, notifications","Business Logic Services: Complex calculations, rules engines","API Services: Encapsulating backend communication patterns","Theme / Config Services: Managing application-wide settings"],additionalExplanation:"A good rule of thumb: if logic is used in more than one place or is complex enough to test independently, it belongs in a service."},{id:"services-with-rxjs",heading:"Services + RxJS \u2013 The Power Combination",content:"Angular services are the natural home for reactive programming patterns using RxJS.",list:["Exposing Observables for components to subscribe to","Using BehaviorSubject / ReplaySubject for state sharing","Combining API calls with operators (map, switchMap, catchError, shareReplay)","Creating facades that simplify complex data flows","Handling loading/error states in a consistent way"],additionalExplanation:"The async pipe + service pattern is extremely powerful: components stay clean and subscription management is automatic. Modern services often expose signals alongside or instead of Observables."},{id:"modern-services-signals-standalone",heading:"Modern Services: Signals, Standalone & Functional Patterns",content:"With Angular 16+, services are evolving to leverage signals and work better in standalone applications.",list:["Using signal() / computed() / effect() inside services for reactive state","Services as signal stores (lightweight state management)","Functional interceptors, guards, and resolvers (no class needed)","Inject() function for functional DI in standalone context","toSignal() and toObservable() for interoperability"],additionalExplanation:"Signals in services provide fine-grained reactivity without zone.js overhead in zoneless mode (experimental in Angular 18+). They are simpler than Subjects for many use cases."}],codeExamples:[{title:"Basic Data Service with providedIn: 'root'",language:"typescript",code:`import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.example.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(\`\${this.apiUrl}/\${id}\`);
  }
}`,description:"Typical data-fetching service using HttpClient."},{title:"State Service with BehaviorSubject",language:"typescript",code:`import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User { id: number; name: string; }

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }
}`,description:"Simple shared state service using RxJS."},{title:"Modern Signal-Based Service (Angular 16+)",language:"typescript",code:`import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  cartItems = this.items.asReadonly();
  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addItem(item: CartItem) {
    this.items.update(current => [...current, item]);
  }

  removeItem(id: number) {
    this.items.update(current => current.filter(i => i.id !== id));
  }
}`,description:"Reactive cart service using Angular signals."},{title:"Scoped Service (Component Level)",language:"typescript",code:`@Component({
  selector: 'app-editor',
  template: '...',
  providers: [EditorStateService] // new instance per EditorComponent
})
export class EditorComponent {
  constructor(private editorState: EditorStateService) {}
}`,description:"Service scoped to a specific component tree."}],bestPractices:["Use providedIn: 'root' for most services unless you need scoped behavior.","Keep services focused \u2014 one responsibility per service (Single Responsibility Principle).","Name services clearly: Feature + Purpose (e.g., AuthService, ProductDataService).","Expose Observables / signals, not Subjects directly \u2014 protect internal state.","Use async pipe in templates instead of manual subscribe/unsubscribe.","Centralize HTTP error handling and loading states in data services.","Avoid putting presentation logic in services \u2014 keep it in components.","Make services injectable in tests \u2014 mock them easily with TestBed.","Use signals for simple state in new code; reserve Subjects for complex streams.","Document public API of services (what they expose and how to use them).","Consider facades when services become too large or complex."]};var Bo=[{title:"Standalone Component Example",language:"TypeScript",description:"A complete standalone component with imports",code:`import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule
  ],
  template: \`
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ user.name }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Email: {{ user.email }}</p>
        <input [(ngModel)]="user.name" />
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="save()">Save</button>
      </mat-card-actions>
    </mat-card>
  \`
})
export class UserCardComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  save() {
    console.log('Saving user:', this.user);
  }
}`},{title:"Bootstrapping Standalone App",language:"TypeScript",description:"Modern way to bootstrap Angular applications",code:`import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));`},{title:"NgModule vs Standalone Comparison",language:"TypeScript",description:"Traditional vs modern approach",code:`@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductComponent { }

@Component({
  selector: 'app-product-old',
  standalone: false
})
export class ProductOldComponent { }

@NgModule({
  declarations: [ProductOldComponent],
  imports: [CommonModule, FormsModule]
})
export class ProductModule { }`}];var qo={title:"Standalone Components in Angular: Simplifying Application Structure",tags:["Angular","Standalone Components","Architecture","Components","Best Practices"],paragraphs:["Standalone components in Angular represent a shift towards a module-less architecture, allowing developers to create components, directives, and pipes that can be used independently without declaring them in an NgModule. Introduced in Angular 14, this feature simplifies project structure, reduces boilerplate, and enhances tree-shaking for better performance. This content provides a detailed explanation of standalone components, their usage, and integration."],keyPoints:["Standalone: Components, directives, and pipes that don't require an NgModule declaration.","Simplification: Reduces the need for modules, making apps easier to build and maintain.","Imports: Directly import dependencies within the component itself.","Bootstrap: Applications can be bootstrapped without a root module using standalone components."],sections:[{id:"what-are-standalone-components",heading:"What Are Standalone Components?",content:"Standalone components are self-contained units in Angular that encapsulate their own dependencies, templates, and styles. Unlike traditional components, they are marked with the 'standalone: true' flag and handle their imports directly.",list:["Introduced in Angular v14 to streamline development","Can be used for components, directives, and pipes","Eliminate the need for NgModules in many scenarios"],additionalExplanation:"This approach promotes a more functional style of programming in Angular, where each entity manages its own concerns."},{id:"benefits",heading:"Benefits of Standalone Components",content:"Adopting standalone components offers several advantages, particularly in terms of code organization, build optimization, and developer experience.",list:["Reduced boilerplate by avoiding unnecessary module files","Improved tree-shaking, leading to smaller bundle sizes","Easier lazy loading and routing without module dependencies","Simplified migration and scalability for large applications"],additionalExplanation:"Standalone components make it easier to reason about dependencies at a granular level, reducing errors and improving maintainability."},{id:"implementation",heading:"How to Implement Standalone Components",content:"To create a standalone component, set the 'standalone' property to true in the @Component decorator and list dependencies in the 'imports' array.",list:["Mark the component with standalone: true","Import modules, components, or other standalone entities directly","Use in routing or other components by importing them"],additionalExplanation:"Standalone components can be imported into other standalone components or legacy modules, providing flexibility during transitions."},{id:"migration-and-integration",heading:"Migration and Integration",content:"Migrating to standalone components involves refactoring existing module-based code. Angular provides tools like schematics to assist in this process.",list:["Use ng generate component --standalone to create new ones","Convert existing components by adding standalone: true and moving declarations","Integrate with existing modules by importing standalone components into NgModules","Bootstrap the app using bootstrapApplication for fully standalone apps"],additionalExplanation:"For hybrid applications, standalone and module-based components can coexist, allowing gradual migration."}],codeExamples:[{title:"Basic Standalone Component Example",language:"typescript",code:`import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: \`<p>Hello, Standalone Component!</p>\`
})
export class HelloComponent { }`,description:"A simple standalone component that imports CommonModule for directives like ngIf or ngFor."},{title:"Standalone Component with Dependencies Example",language:"typescript",code:`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component'; // Assuming ButtonComponent is also standalone

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  template: \`
    <input [(ngModel)]="name" />
    <app-button (click)="submit()">Submit</app-button>
  \`
})
export class FormComponent {
  name: string = '';
  submit() { console.log(this.name); }
}`,description:"Demonstrates importing Angular modules and other standalone components."},{title:"Routing with Standalone Components Example",language:"typescript",code:`import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

const routes = [
  { path: '', component: AppComponent },
  { path: 'hello', component: HelloComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});`,description:"Shows how to set up routing and bootstrap an application using standalone components without an AppModule."},{title:"Standalone Directive Example",language:"typescript",code:`import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}`,description:"An example of a standalone directive that can be imported directly into components."}],bestPractices:["Use standalone components for new projects to minimize module overhead.","Import only necessary dependencies to keep components lightweight.","Leverage Angular's migration schematics for converting module-based code.","Combine with lazy loading for optimal performance in routed applications.","Test standalone components in isolation to ensure self-containment."]};var Bn=Object.values(Tt).filter(t=>typeof t=="object"&&t!==null&&"title"in t);var qn=(()=>{class t{constructor(){this.dataUrl="assets/data/angular21-chatbot.json",this.chatbotResource=cn({loader:()=>Ie(this,null,function*(){let e=yield fetch(this.dataUrl);if(!e.ok)throw new Error(`Failed to load data: ${e.status}`);return e.json()})}),this.searchQuery=b(""),this.isSearching=b(!1),this.activeSuggestion=b(null),this.allMessages=A(()=>{let e=this.chatbotResource.value()?.messages??[],n=Bn.map((r,a)=>this.mapTopicToMessage(r,`const-${a}`));return[...e,...n]}),this.isLoading=A(()=>this.chatbotResource.isLoading()),this.error=A(()=>this.chatbotResource.error()),this.searchResults=A(()=>{let e=this.searchQuery().toLowerCase().trim(),n=this.allMessages();if(!e||e.length<2)return[];let r=[];for(let a of n){let c=this.scoreMessage(a,e);c<=0||r.push({message:a,relevanceScore:c,matchedKeywords:this.getMatchedKeywords(a,e),hasCodeExamples:this.hasCodeExamples(a),relatedTopics:this.getRelatedTopics(a,n)})}return r.sort((a,c)=>c.relevanceScore-a.relevanceScore)}),this.topSearchResults=A(()=>this.searchResults().slice(0,5).map(e=>e.message)),this.allTopics=A(()=>{let e=new Set;for(let n of this.allMessages())n.keywords?.forEach(r=>e.add(r));return Array.from(e).sort()}),this.currentSuggestions=A(()=>{let e=this.searchResults();if(!e.length)return[];let n=e[0],r=[];n.hasCodeExamples&&r.push({type:"code",label:"\u{1F4BB} Show me code examples",action:"show_code_examples",messageId:n.message.id});for(let a of n.relatedTopics.slice(0,2))r.push({type:"related",label:`\u{1F517} Explore: ${a}`,action:`search_${a}`,messageId:n.message.id});return r.push({type:"practice",label:"\u{1F3AF} Try a practice exercise",action:"practice_mode",messageId:n.message.id},{type:"read_more",label:"\u{1F4DA} Read more about this",action:"read_more",messageId:n.message.id}),r})}mapTopicToMessage(e,n){let r=[];e.paragraphs?.length&&r.push({type:"text",text:e.paragraphs.join(" ")}),e.sections?.length&&e.sections.forEach(c=>{let v=[];c.content&&v.push({type:"text",text:c.content}),c.list?.length&&v.push({type:"list",items:c.list,ordered:!1}),c.additionalExplanation&&v.push({type:"quote",text:c.additionalExplanation}),r.push({type:"section",title:c.heading||"Details",contents:v})}),e.codeExamples?.length&&e.codeExamples.forEach(c=>{r.push({type:"section",title:`Example: ${c.title}`,contents:[{type:"text",text:c.description||""},{type:"code",code:c.code,language:c.language?.toLowerCase()||"typescript",filename:c.title}]})}),e.bestPractices?.length&&r.push({type:"section",title:"Best Practices",contents:[{type:"list",items:e.bestPractices,ordered:!1}]});let a=new Set([...e.title?[e.title]:[],...e.tags||[]]);return e.sections?.forEach(c=>{c.heading&&a.add(c.heading)}),{id:n,sender:"bot",timestamp:new Date,text:`## ${e.title}

${e.paragraphs?.[0]||""}`,keywords:Array.from(a),contents:r}}search(e){let n=e.trim();this.searchQuery.set(n),this.isSearching.set(n.length>=2)}clearSearch(){this.searchQuery.set(""),this.isSearching.set(!1),this.activeSuggestion.set(null)}handleSuggestion(e){switch(this.activeSuggestion.set(e),e.type){case"code":this.searchQuery.set("code");break;case"example":this.searchQuery.set("example");break;case"practice":this.launchPracticeMode();break;case"related":e.action.startsWith("search_")&&this.search(e.action.replace("search_","").replace(/_/g," "));break;case"read_more":if(e.messageId){let n=this.getMessageById(e.messageId);n&&this.searchQuery.set(n.keywords?.[0]||n.text||"")}break}}getMessagesByKeyword(e){return this.allMessages().filter(n=>n.keywords?.some(r=>r.toLowerCase()===e.toLowerCase()))}getMessageById(e){return this.allMessages().find(n=>n.id===e)}getWelcomeMessage(){return{id:"welcome",sender:"bot",timestamp:new Date,text:`\u{1F44B} Hi! I'm NEXUS \u2014 your Angular 21 intelligence assistant.

I can now search through all the **training modules** dynamically! Try searching for things like:
- **Signals**
- **Forms**
- **RxJS**
- **Standalone Components**`,suggestions:[{type:"example",label:"\u26A1 Signals",action:"search_signals"},{type:"example",label:"\u{1F9E9} Components",action:"search_components"},{type:"example",label:"\u{1F501} Routing",action:"search_routing"},{type:"example",label:"\u{1F4DD} Forms",action:"search_forms"},{type:"practice",label:"\u{1F3AF} Start practice",action:"practice_mode"}]}}reload(){this.chatbotResource.reload()}scoreMessage(e,n){let r=n.toLowerCase().trim(),a=r.split(/\s+/).filter(_=>_.length>=2),c=0;for(let _ of e.keywords??[]){let F=_.toLowerCase(),T=0;F===r?T=Math.max(T,30):F.startsWith(r)?T=Math.max(T,20):F.includes(r)?T=Math.max(T,15):r.startsWith(F)&&F.length>=3&&(T=Math.max(T,10));for(let $ of a)F===$?T=Math.max(T,20):F.startsWith($)?T=Math.max(T,12):F.includes($)&&(T=Math.max(T,8));c+=T}e.text?.toLowerCase().includes(r)&&(c+=5);let v=JSON.stringify(e.contents??[]).toLowerCase();v.includes(r)&&(c+=10);for(let _ of a)v.includes(_)&&_.length>=3&&(c+=4);return c}getMatchedKeywords(e,n){let r=n.toLowerCase(),a=r.split(/\s+/).filter(c=>c.length>=2);return(e.keywords??[]).filter(c=>{let v=c.toLowerCase();return v.includes(r)||r.includes(v)||a.some(_=>v.includes(_)||_.includes(v))})}hasCodeExamples(e){return(e.contents??[]).some(n=>n.type==="code"||n.type==="section"&&"contents"in n&&n.contents?.some(r=>r.type==="code"))}getRelatedTopics(e,n){let r=[],a=new Set((e.keywords??[]).map(c=>c.toLowerCase()));for(let c of n)if(c.id!==e.id)for(let v of c.keywords??[]){let _=v.toLowerCase();if(a.has(_)&&!r.includes(v)&&(r.push(v),r.length>=4))return r}return r}launchPracticeMode(){let e=this.allMessages().find(n=>n.keywords?.some(r=>r.toLowerCase().includes("practice")||r.toLowerCase().includes("exercise")));e?this.search(e.keywords?.[0]||"practice"):this.search("practice")}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=U({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var Go=["chatBody"],$o=["textarea"],Wo=["searchInput"],Jo=["toggleBtn"],Ko=t=>({$implicit:t,depth:0}),Yo=(t,o)=>({$implicit:t,depth:o}),Gn=(t,o)=>o.action;function Xo(t,o){if(t&1){let e=O();s(0,"button",43),x("click",function(){C(e);let r=p(2);return w(r.deleteHistory())}),g(1,"i",44),l()}}function Qo(t,o){if(t&1){let e=O();s(0,"button",48),x("click",function(){C(e);let r=p(3);return w(r.clearSearch())}),g(1,"i",49),l()}}function Zo(t,o){if(t&1){let e=O();s(0,"div",26),g(1,"i",45),s(2,"input",46,4),x("input",function(r){C(e);let a=p(2);return w(a.onSearchInput(r))}),l(),s(4,"span",17),d(5),l(),h(6,Qo,2,0,"button",47),l()}if(t&2){let e=p(2);i(2),I("value",e.chatbotService.searchQuery()),i(3),R("",e.chatbotService.topSearchResults().length," results"),i(),f(e.chatbotService.searchQuery()?6:-1)}}function ei(t,o){if(t&1){let e=O();s(0,"button",54),x("click",function(){let r=C(e).$implicit,a=p(3);return w(a.onSuggestionClick(r))}),d(1),l()}if(t&2){let e=o.$implicit;P("nexus-chip--code",e.type==="code"),i(),R(" ",e.label," ")}}function ti(t,o){if(t&1&&(s(0,"div",27)(1,"div",50),g(2,"i",51),d(3," Suggestions "),l(),s(4,"div",52),k(5,ei,2,3,"button",53,Gn),l()()),t&2){let e=p(2);i(5),E(e.chatbotService.currentSuggestions())}}function ni(t,o){if(t&1){let e=O();s(0,"div",28),g(1,"i",55),s(2,"span",56),d(3),l(),s(4,"button",48),x("click",function(){C(e);let r=p(2);return w(r.chatbotService.reload())}),g(5,"i",57),d(6," Retry "),l()()}if(t&2){let e=p(2);i(3),y(e.loadError())}}function ri(t,o){t&1&&(s(0,"div",30),g(1,"i",58),s(2,"p",59),d(3,"Start a conversation\u2026"),l()())}function oi(t,o){if(t&1&&g(0,"div",63),t&2){let e=p().$implicit,n=p(2);I("innerHTML",n.formatMessage(e.text),de)}}function ii(t,o){if(t&1&&et(0,66),t&2){let e=o.$implicit;p(4);let n=tt(5);I("ngTemplateOutlet",n)("ngTemplateOutletContext",an(2,Ko,e))}}function ai(t,o){if(t&1&&(s(0,"div",64),k(1,ii,1,4,"ng-container",66,Z),l()),t&2){let e=p().$implicit;i(),E(e.contents)}}function si(t,o){if(t&1){let e=O();s(0,"button",54),x("click",function(){let r=C(e).$implicit,a=p(4);return w(a.onSuggestionClick(r))}),d(1),l()}if(t&2){let e=o.$implicit;i(),R(" ",e.label," ")}}function li(t,o){if(t&1&&(s(0,"div",65),k(1,si,2,1,"button",67,Gn),l()),t&2){let e=p().$implicit;i(),E(e.suggestions)}}function ci(t,o){if(t&1&&(s(0,"div",60)(1,"div",61),g(2,"i"),l(),s(3,"div",62),h(4,oi,1,1,"div",63),h(5,ai,3,0,"div",64),h(6,li,3,0,"div",65),l()()),t&2){let e=o.$implicit;P("nexus-msg--user",e.sender==="user")("nexus-msg--bot",e.sender==="bot"),i(),P("nexus-msg__avatar--user",e.sender==="user"),i(),G(e.sender==="user"?"bi bi-person-fill":"bi bi-cpu-fill"),i(),P("nexus-bubble--user",e.sender==="user")("nexus-bubble--bot",e.sender==="bot"),i(),f(e.text?4:-1),i(),f(e.contents?5:-1),i(),f(e.suggestions!=null&&e.suggestions.length?6:-1)}}function di(t,o){t&1&&(s(0,"div",32)(1,"div",61),g(2,"i",12),l(),s(3,"div",68),g(4,"span",69)(5,"span",69)(6,"span",69),l()())}function pi(t,o){if(t&1&&(s(0,"div",34),g(1,"i",70),d(2),l()),t&2){let e=p(2);i(2),R(" ",e.listeningError()," ")}}function ui(t,o){t&1&&g(0,"span",71)(1,"i",72)}function mi(t,o){t&1&&g(0,"i",38)}function gi(t,o){if(t&1){let e=O();s(0,"div",8),x("pointermove",function(r){C(e);let a=p();return w(a.onPointerMove(r))})("pointerup",function(){C(e);let r=p();return w(r.onPointerUp())})("pointerleave",function(){C(e);let r=p();return w(r.onPointerUp())}),s(1,"header",9),x("pointerdown",function(r){C(e);let a=p();return w(a.onPointerDown(r))}),s(2,"div",10)(3,"div",11),g(4,"i",12)(5,"span",13),l(),s(6,"div")(7,"div",14),d(8),l(),s(9,"div",15),g(10,"i",16),s(11,"span",17),d(12,"Angular 21 \xB7 Online"),l()()()(),g(13,"i",18),s(14,"div",19)(15,"button",20),x("click",function(){C(e);let r=p();return w(r.toggleSearch())}),g(16,"i",21),l(),h(17,Xo,2,0,"button",22),s(18,"button",23),x("click",function(){C(e);let r=p();return w(r.toggleExpand())}),g(19,"i"),l(),s(20,"button",24),x("click",function(){C(e);let r=p();return w(r.toggleChat())}),g(21,"i",25),l()()(),h(22,Zo,7,3,"div",26),h(23,ti,7,0,"div",27),h(24,ni,7,1,"div",28),s(25,"div",29,2),h(27,ri,4,0,"div",30),k(28,ci,7,15,"div",31,Xt().trackByMsgId,!0),h(30,di,7,0,"div",32),l(),s(31,"footer",33),h(32,pi,3,1,"div",34),s(33,"div",35)(34,"textarea",36,3),rn("ngModelChange",function(r){C(e);let a=p();return nn(a.userInput,r)||(a.userInput=r),w(r)}),x("input",function(r){C(e);let a=p();return w(a.autoResize(r))})("keydown",function(r){C(e);let a=p();return w(a.handleEnter(r))}),d(36,"        "),l(),s(37,"button",37),x("click",function(){C(e);let r=p();return w(r.toggleVoice())}),h(38,ui,2,0)(39,mi,1,0,"i",38),l(),s(40,"button",39),x("click",function(){C(e);let r=p();return w(r.sendMessage())}),g(41,"i",40),l()(),s(42,"small",41),g(43,"i",42),d(44," Shift+Enter for new line \xA0\xB7\xA0 Partial keywords work "),l()()()}if(t&2){let e=p();nt(e.getContainerStyle()),P("nexus-panel--expanded",e.expanded())("dragging",e.isDragging()),Q("aria-label",e.config().title||"NEXUS Chat"),i(8),R(" ",e.config().title||"NEXUS"," "),i(7),P("bg-accent",e.showSearch()),i(2),f(e.hasMessages()?17:-1),i(),I("title",e.expanded()?"Collapse":"Expand"),i(),G(e.expanded()?"bi bi-arrows-angle-contract":"bi bi-arrows-angle-expand"),i(3),f(e.showSearch()?22:-1),i(),f(e.chatbotService.isSearching()&&e.chatbotService.currentSuggestions().length>0?23:-1),i(),f(e.loadError()?24:-1),i(3),f(!e.hasMessages()&&!e.loading()?27:-1),i(),E(e.visibleMessages()),i(2),f(e.loading()?30:-1),i(2),f(e.listeningError()?32:-1),i(2),I("placeholder",e.config().placeholder||"Ask about signals, routing, components\u2026"),tn("ngModel",e.userInput),i(3),P("nexus-icon-btn--recording",e.isListening()),Q("aria-label",e.isListening()?"Stop voice input":"Start voice input"),i(),f(e.isListening()?38:39),i(2),I("disabled",!e.userInput().trim()||e.loading())}}function hi(t,o){if(t&1&&(s(0,"p",73),d(1),l()),t&2){let e=p().$implicit;i(),y(e.text)}}function fi(t,o){if(t&1&&(s(0,"span",84),d(1),l()),t&2){let e=p(2).$implicit;i(),y(e.filename)}}function vi(t,o){if(t&1){let e=O();s(0,"div",74)(1,"div",82),g(2,"i",83),h(3,fi,2,1,"span",84),s(4,"span",85),d(5),l(),s(6,"button",86),x("click",function(){C(e);let r=p().$implicit,a=p();return w(a.copyToClipboard(r.code,r.filename||r.language))}),g(7,"i"),l()(),s(8,"pre",87)(9,"code"),d(10),l()()()}if(t&2){let e=p().$implicit,n=p();i(3),f(e.filename?3:-1),i(2),y(e.language),i(),I("title",n.isCopied(e.filename||e.language)?"Copied!":"Copy"),i(),G(n.isCopied(e.filename||e.language)?"bi bi-check2 text-success":"bi bi-clipboard"),i(3),y(e.code)}}function bi(t,o){if(t&1&&(s(0,"th",89),d(1),l()),t&2){let e=o.$implicit;i(),R("",e," ")}}function yi(t,o){if(t&1&&(s(0,"td",91),d(1),l()),t&2){let e=o.$implicit;i(),y(e)}}function xi(t,o){if(t&1&&(s(0,"tr",90),k(1,yi,2,1,"td",91,Z),l()),t&2){let e=o.$implicit;i(),E(e)}}function Ci(t,o){if(t&1&&(s(0,"div",75)(1,"table",88)(2,"thead")(3,"tr"),k(4,bi,2,1,"th",89,ee),l()(),s(6,"tbody"),k(7,xi,3,0,"tr",90,Z),l()()()),t&2){let e=p().$implicit;i(4),E(e.headers),i(3),E(e.rows)}}function wi(t,o){if(t&1&&(s(0,"li",94),g(1,"i",95),d(2),l()),t&2){let e=o.$implicit;i(2),R(" ",e," ")}}function _i(t,o){if(t&1&&(s(0,"ul",92),k(1,wi,3,1,"li",94,ee),l()),t&2){let e=p(2).$implicit;i(),E(e.items)}}function Si(t,o){if(t&1&&(s(0,"li",94),d(1),l()),t&2){let e=o.$implicit;i(),y(e)}}function Mi(t,o){if(t&1&&(s(0,"ol",93),k(1,Si,2,1,"li",94,ee),l()),t&2){let e=p(2).$implicit;i(),E(e.items)}}function Pi(t,o){if(t&1&&(s(0,"div",76),h(1,_i,3,0,"ul",92)(2,Mi,3,0,"ol",93),l()),t&2){let e=p().$implicit;i(),f(e.ordered?2:1)}}function Ti(t,o){if(t&1&&(s(0,"cite",99),d(1),l()),t&2){let e=p(3).$implicit;i(),R("\u2014 ",e.author)}}function Ai(t,o){if(t&1&&(s(0,"span",100),d(1),l()),t&2){let e=p(3).$implicit;i(),R("(",e.citation,")")}}function ki(t,o){if(t&1&&(s(0,"footer",98),h(1,Ti,2,1,"cite",99),h(2,Ai,2,1,"span",100),l()),t&2){let e=p(2).$implicit;i(),f(e.author?1:-1),i(),f(e.citation?2:-1)}}function Ei(t,o){if(t&1&&(s(0,"blockquote",77),g(1,"i",96),s(2,"p",97),d(3),l(),h(4,ki,3,2,"footer",98),l()),t&2){let e=p().$implicit;i(3),y(e.text),i(),f(e.author||e.citation?4:-1)}}function Oi(t,o){if(t&1&&(s(0,"figcaption",102),d(1),l()),t&2){let e=p(2).$implicit;i(),y(e.caption)}}function Ii(t,o){if(t&1&&(s(0,"figure",78),g(1,"img",101),h(2,Oi,2,1,"figcaption",102),l()),t&2){let e=p().$implicit;i(),I("src",e.src,Ye)("alt",e.alt),i(),f(e.caption?2:-1)}}function Di(t,o){if(t&1&&(s(0,"span"),d(1),l()),t&2){let e=p(2).$implicit;i(),y(e.icon)}}function Ri(t,o){t&1&&g(0,"i",103)}function Fi(t,o){if(t&1&&(s(0,"a",79),h(1,Di,2,1,"span"),s(2,"span"),d(3),l(),h(4,Ri,1,0,"i",103),l()),t&2){let e=p().$implicit;I("href",e.url,Ye)("target",e.external?"_blank":"_self"),i(),f(e.icon?1:-1),i(2),y(e.text),i(),f(e.external?4:-1)}}function Vi(t,o){if(t&1&&(s(0,"div",80),g(1,"iframe",104),l()),t&2){let e=p().$implicit;i(),I("src",e.url,Gt)("title",e.title||"Video")}}function Ui(t,o){if(t&1&&(s(0,"h4",106),g(1,"i",109),d(2),l()),t&2){let e=p(2).$implicit;i(2),R(" ",e.title," ")}}function Ni(t,o){if(t&1&&(s(0,"p",107),d(1),l()),t&2){let e=p(2).$implicit;i(),y(e.subtitle)}}function ji(t,o){if(t&1&&et(0,66),t&2){let e=o.$implicit,n=p(2).depth;p();let r=tt(5);I("ngTemplateOutlet",r)("ngTemplateOutletContext",sn(2,Yo,e,n+1))}}function Li(t,o){if(t&1&&(s(0,"section",105),h(1,Ui,3,1,"h4",106),h(2,Ni,2,1,"p",107),s(3,"div",108),k(4,ji,1,5,"ng-container",66,Z),l()()),t&2){let e=p(),n=e.$implicit,r=e.depth;P("nexus-section--nested",r>0),i(),f(n.title?1:-1),i(),f(n.subtitle?2:-1),i(2),E(n.contents)}}function Hi(t,o){if(t&1&&(h(0,hi,2,1,"p",73),h(1,vi,11,6,"div",74),h(2,Ci,9,0,"div",75),h(3,Pi,3,1,"div",76),h(4,Ei,5,2,"blockquote",77),h(5,Ii,3,3,"figure",78),h(6,Fi,5,5,"a",79),h(7,Vi,2,2,"div",80),h(8,Li,6,4,"section",81)),t&2){let e=o.$implicit,n=p();f(n.isTextContent(e)?0:-1),i(),f(n.isCodeBlock(e)?1:-1),i(),f(n.isTableContent(e)?2:-1),i(),f(n.isListContent(e)?3:-1),i(),f(n.isQuoteContent(e)?4:-1),i(),f(n.isImageContent(e)?5:-1),i(),f(n.isLinkContent(e)?6:-1),i(),f(n.isVideoContent(e)?7:-1),i(),f(n.isSectionContent(e)?8:-1)}}var At=(()=>{class t{constructor(){this.chatbotService=M(qn),this.config=Y({title:"NEXUS",placeholder:"Ask about signals, components, routing\u2026",welcomeMessage:"\u{1F44B} Hi! I'm NEXUS \u2014 your Angular 21 intelligence assistant.",enableVoice:!0,enableSourceLinks:!0,enableSyntaxHighlight:!0,apiTimeout:600,maxMessages:100,theme:"dark"}),this.chatBodyRef=te("chatBody"),this.textareaRef=te("textarea"),this.searchInputRef=te("searchInput"),this.toggleBtnRef=te("toggleBtn"),this.messages=b([]),this.userInput=dn(""),this.isOpen=b(!1),this.loading=b(!1),this.expanded=b(!1),this.showSearch=b(!1),this.isListening=b(!1),this.listeningError=b(""),this.isDragging=b(!1),this.dragPosition=b({x:0,y:0}),this.dragStartPos={x:0,y:0},this.initialDragPos={x:0,y:0},this.isToggleDragging=b(!1),this.toggleDragPosition=b({x:0,y:0}),this.toggleDragStartPos={x:0,y:0},this.initialTogglePos={x:0,y:0},this.copiedId=b(null),this.visibleMessages=A(()=>{if(this.chatbotService.isSearching()&&this.chatbotService.searchQuery())return this.chatbotService.topSearchResults();let e=this.messages(),n=this.config().maxMessages??100;return e.slice(Math.max(0,e.length-n))}),this.hasMessages=A(()=>this.visibleMessages().length>0),this.isLoadingData=A(()=>this.chatbotService.isLoading()),this.loadError=A(()=>this.chatbotService.error()),this.isTextContent=e=>e.type==="text",this.isCodeBlock=e=>e.type==="code",this.isTableContent=e=>e.type==="table",this.isImageContent=e=>e.type==="image",this.isLinkContent=e=>e.type==="link",this.isVideoContent=e=>e.type==="video",this.isListContent=e=>e.type==="list",this.isQuoteContent=e=>e.type==="quote",this.isSectionContent=e=>e.type==="section",Ce(()=>{this.scrollToBottom(),this.initVoiceRecognition()})}ngOnInit(){this.messages.set([this.chatbotService.getWelcomeMessage()])}initVoiceRecognition(){let e=window.SpeechRecognition||window.webkitSpeechRecognition;e&&(this.recognition=new e,this.recognition.continuous=!1,this.recognition.interimResults=!1,this.recognition.lang="en-US",this.recognition.onresult=n=>{this.userInput.set(n.results[0][0].transcript),this.isListening.set(!1),setTimeout(()=>this.sendMessage(),100)},this.recognition.onerror=n=>{this.listeningError.set(`Speech error: ${n.error}`),this.isListening.set(!1)},this.recognition.onend=()=>this.isListening.set(!1))}toggleVoice(){if(!this.recognition){this.listeningError.set("Voice input not supported in this browser.");return}this.isListening()?this.recognition.stop():(this.listeningError.set(""),this.isListening.set(!0),this.recognition.start())}toggleSearch(){this.showSearch.update(e=>!e),this.showSearch()?setTimeout(()=>this.searchInputRef()?.nativeElement?.focus({preventScroll:!0}),50):this.clearSearch()}onSearchInput(e){let n=e.target.value;this.chatbotService.search(n)}clearSearch(){this.chatbotService.clearSearch()}toggleChat(){let e=this.isOpen();if(this.isOpen.set(!e),!e){let n=this.toggleBtnRef()?.nativeElement;if(n){let r=n.getBoundingClientRect(),a=this.expanded()?920:440,c=660,v=r.left+r.width/2-a/2,_=r.top-c-20;v=Math.max(10,Math.min(v,window.innerWidth-a-10)),_<10&&(_=10),this.dragPosition.set({x:v,y:_})}setTimeout(()=>{this.textareaRef()?.nativeElement?.focus({preventScroll:!0}),this.scrollToBottom()},100)}}onIconClick(){this.isToggleDragging()||this.toggleChat()}toggleExpand(){this.expanded.update(e=>!e),setTimeout(()=>{let e=this.dragPosition();this.updateDragPosition(e.x,e.y),this.scrollToBottom()},50)}sendMessage(){let e=this.userInput().trim();if(!e||this.loading())return;let n=zn(e);this.messages.update(a=>[...a,n]),this.userInput.set(""),this.loading.set(!0),this.chatbotService.clearSearch(),this.scrollToBottom();let r=this.config().apiTimeout??600;setTimeout(()=>{this.chatbotService.search(e);let a=this.chatbotService.searchResults();if(a.length>0){let c=a[0],v=V(D({},qe(c.message.text,c.message.contents)),{suggestions:c.message.suggestions,keywords:c.message.keywords});this.messages.update(_=>[..._,v])}else{let c=qe(`I couldn't find specific info about "${e}". Try one of these topics:`);c.suggestions=[{type:"example",label:"\u26A1 Signals",action:"search_signals"},{type:"example",label:"\u{1F9E9} Components",action:"search_components"},{type:"example",label:"\u{1F501} Routing",action:"search_routing"},{type:"example",label:"\u{1F4DD} Forms",action:"search_forms"},{type:"practice",label:"\u{1F3AF} Start practice",action:"practice_mode"}],this.messages.update(v=>[...v,c])}this.loading.set(!1),this.chatbotService.clearSearch(),this.scrollToBottom()},r)}deleteHistory(){this.messages.set([this.chatbotService.getWelcomeMessage()])}handleEnter(e){e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.sendMessage())}autoResize(e){let n=e.target;n.style.height="auto",n.style.height=`${Math.min(n.scrollHeight,120)}px`}onSuggestionClick(e){if(e.action.startsWith("search_")){let n=e.action.replace("search_","").replace(/_/g," ");this.userInput.set(n),this.sendMessage()}else if(e.action==="practice_mode"){let n=qe("\u{1F3AF} Practice mode activated! Type any Angular topic you want to explore and I'll give you detailed examples.");this.messages.update(r=>[...r,n]),this.scrollToBottom()}else this.chatbotService.handleSuggestion(e)}copyToClipboard(e,n){navigator.clipboard.writeText(e).then(()=>{n&&(this.copiedId.set(n),setTimeout(()=>this.copiedId.set(null),2e3))})}isCopied(e){return this.copiedId()===e}onTogglePointerDown(e){let n=e.currentTarget,r=n.getBoundingClientRect();this.toggleDragStartPos={x:e.clientX,y:e.clientY},this.initialTogglePos={x:r.left,y:r.top},this.isToggleDragging.set(!1),n.setPointerCapture(e.pointerId)}onTogglePointerMove(e){if(!this.toggleDragStartPos.x)return;let n=e.clientX-this.toggleDragStartPos.x,r=e.clientY-this.toggleDragStartPos.y;if(!this.isToggleDragging()&&(Math.abs(n)>5||Math.abs(r)>5)&&this.isToggleDragging.set(!0),this.isToggleDragging()){let a=Math.max(0,Math.min(this.initialTogglePos.x+n,window.innerWidth-65)),c=Math.max(0,Math.min(this.initialTogglePos.y+r,window.innerHeight-65));this.toggleDragPosition.set({x:a,y:c})}}onTogglePointerUp(e){this.toggleDragStartPos={x:0,y:0},setTimeout(()=>this.isToggleDragging.set(!1),50)}getToggleStyle(){let{x:e,y:n}=this.toggleDragPosition();return!e&&!n?{}:{position:"fixed",left:`${e}px`,top:`${n}px`,right:"auto",bottom:"auto",margin:"0"}}onPointerDown(e){let n=e.target;if(n.closest("button")||n.closest("input"))return;let r=e.currentTarget.closest(".nexus-panel"),a=r.getBoundingClientRect();this.dragStartPos={x:e.clientX,y:e.clientY},this.initialDragPos={x:a.left,y:a.top},this.isDragging.set(!0),r.setPointerCapture(e.pointerId),e.preventDefault()}onPointerMove(e){if(!this.isDragging())return;let n=e.clientX-this.dragStartPos.x,r=e.clientY-this.dragStartPos.y;this.updateDragPosition(this.initialDragPos.x+n,this.initialDragPos.y+r)}onPointerUp(){this.isDragging.set(!1)}updateDragPosition(e,n){let r=this.expanded()?920:440,a=660,c=Math.max(0,Math.min(e,window.innerWidth-40)),v=Math.max(0,Math.min(n,window.innerHeight-80));this.dragPosition.set({x:c,y:v})}getContainerStyle(){let{x:e,y:n}=this.dragPosition();return!e&&!n?{}:{position:"fixed",left:`${e}px`,top:`${n}px`,right:"auto",bottom:"auto",margin:"0"}}formatUrl(e){return e?e.replace("frontend/public","").replace(/^\/+/,"/"):"#"}fileName(e){try{return new URL(e,window.location.origin).pathname.split("/").pop()||"download"}catch(n){return"download"}}trackByMsgId(e,n){return n.id??String(e)}formatMessage(e){return e?e.replace(/^## (.*$)/gm,'<h2 class="text-gradient font-bold mt-sm mb-xs">$1</h2>').replace(/^### (.*$)/gm,'<h3 class="text-accent font-bold mt-sm mb-xs">$1</h3>').replace(/\*\*(.*?)\*\*/g,'<strong class="text-primary">$1</strong>').replace(/`(.*?)`/g,'<code class="glass-deep px-xs rounded text-accent">$1</code>').replace(/\n/g,"<br>"):""}scrollToBottom(){let e=this.chatBodyRef()?.nativeElement;e&&e.scrollTo({top:e.scrollHeight,behavior:"smooth"})}setTransparentDragImage(e){let n=new Image;n.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",e.dataTransfer?.setDragImage(n,0,0)}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=L({type:t,selectors:[["lib-nexus-chatbot"]],viewQuery:function(n,r){n&1&&ue(r.chatBodyRef,Go,5)(r.textareaRef,$o,5)(r.searchInputRef,Wo,5)(r.toggleBtnRef,Jo,5),n&2&&me(4)},inputs:{config:[1,"config"],userInput:[1,"userInput"]},outputs:{userInput:"userInputChange"},decls:6,vars:8,consts:[["toggleBtn",""],["contentTpl",""],["chatBody",""],["textarea",""],["searchInput",""],["type","button",1,"nexus-toggle","glass-button-primary","rounded-full","lift-md","z-modal",2,"touch-action","none",3,"click","pointerdown","pointermove","pointerup"],[1,"toggle-icon"],["role","dialog",1,"nexus-panel","glass-card","rounded-xl","d-flex","flex-column","overflow-hidden","animate-scale-in","elev-5","z-modal",3,"nexus-panel--expanded","dragging","style"],["role","dialog",1,"nexus-panel","glass-card","rounded-xl","d-flex","flex-column","overflow-hidden","animate-scale-in","elev-5","z-modal",3,"pointermove","pointerup","pointerleave"],[1,"nexus-header","glass-sm","d-flex","align-center","gap-sm","px-md","border-b","select-none",2,"touch-action","none",3,"pointerdown"],[1,"d-flex","align-center","gap-sm","flex-1"],[1,"nexus-avatar"],[1,"bi","bi-cpu-fill"],[1,"nexus-avatar__dot"],[1,"nexus-brand","text-gradient","font-bold","tracking-wide"],[1,"d-flex","align-center","gap-xs"],[1,"bi","bi-circle-fill","text-success",2,"font-size","6px"],[1,"text-xs","text-muted"],[1,"bi","bi-grip-horizontal","text-muted","nexus-drag-grip"],[1,"d-flex","gap-xs"],["type","button","title","Search topics",1,"glass-button","nexus-hbtn","lift-sm","rounded-md",3,"click"],[1,"bi","bi-search"],["type","button","title","Clear chat",1,"glass-button","nexus-hbtn","lift-sm","rounded-md"],["type","button",1,"glass-button","nexus-hbtn","lift-sm","rounded-md",3,"click","title"],["type","button","title","Close",1,"glass-button","nexus-hbtn","nexus-hbtn--close","lift-sm","rounded-md",3,"click"],[1,"bi","bi-x-lg"],[1,"glass-sm","d-flex","align-center","gap-sm","px-md","border-b","animate-fade-up",2,"padding-top","10px","padding-bottom","10px"],[1,"glass-sm","border-b","px-md",2,"padding-top","8px","padding-bottom","8px"],[1,"d-flex","align-center","gap-sm","px-md","py-sm","text-sm",2,"background","var(--error-bg)","border-bottom","1px solid var(--error)","color","var(--error)"],[1,"nexus-body","flex-1","overflow-y-auto","p-md","d-flex","flex-column","gap-md"],[1,"d-flex","flex-column","align-center","justify-center","text-muted","p-2xl",2,"flex","1"],[1,"nexus-msg","d-flex","gap-sm",3,"nexus-msg--user","nexus-msg--bot"],[1,"nexus-msg","nexus-msg--bot","d-flex","gap-sm"],[1,"glass-sm","border-t","p-md","d-flex","flex-column","gap-sm","flex-shrink-0"],[1,"d-flex","align-center","gap-xs","text-xs","rounded-md","px-sm","py-xs",2,"background","var(--error-bg)","color","var(--error)"],[1,"d-flex","gap-sm","align-end"],["rows","1",1,"nexus-textarea","glass","flex-1","rounded-lg","p-sm","px-md","text-sm","font-body","leading-normal",3,"ngModelChange","input","keydown","placeholder","ngModel"],["type","button",1,"nexus-icon-btn","glass-button","rounded-full","lift-sm","position-relative","flex-shrink-0",3,"click"],[1,"bi","bi-mic-fill"],["type","button",1,"nexus-icon-btn","nexus-icon-btn--send","glass-button-primary","rounded-full","flex-shrink-0",3,"click","disabled"],[1,"bi","bi-send-fill"],[1,"text-xs","text-muted","text-center","d-flex","align-center","justify-center","gap-xs"],[1,"bi","bi-keyboard",2,"font-size","11px"],["type","button","title","Clear chat",1,"glass-button","nexus-hbtn","lift-sm","rounded-md",3,"click"],[1,"bi","bi-trash3"],[1,"bi","bi-search","text-muted","text-sm"],["type","text","placeholder","Search Angular topics\u2026","autocomplete","off",1,"nexus-search-input","flex-1","text-sm","text-primary",3,"input","value"],["type","button",1,"glass-button","nexus-hbtn","rounded-md","text-xs"],["type","button",1,"glass-button","nexus-hbtn","rounded-md","text-xs",3,"click"],[1,"bi","bi-x"],[1,"d-flex","align-center","gap-xs","text-xs","text-muted","font-semibold","mb-xs"],[1,"bi","bi-stars","text-accent",2,"font-size","11px"],[1,"d-flex","flex-wrap","gap-xs"],["type","button",1,"nexus-chip","lift-sm","rounded-full","text-xs",3,"nexus-chip--code"],["type","button",1,"nexus-chip","lift-sm","rounded-full","text-xs",3,"click"],[1,"bi","bi-exclamation-triangle-fill"],[1,"flex-1"],[1,"bi","bi-arrow-clockwise"],[1,"bi","bi-chat-square-dots","text-4xl","opacity-40","mb-sm"],[1,"m-0","text-sm"],[1,"nexus-msg","d-flex","gap-sm"],[1,"nexus-msg__avatar","rounded-full","d-flex","align-center","justify-center","flex-shrink-0"],[1,"nexus-bubble","rounded-lg","p-sm","px-md","text-sm","leading-relaxed","shadow-sm"],[1,"m-0","nexus-markdown",3,"innerHTML"],[1,"nexus-rich","d-flex","flex-column","gap-md","mt-sm"],[1,"d-flex","flex-wrap","gap-xs","mt-md"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["type","button",1,"nexus-chip","lift-sm","rounded-full","text-xs"],[1,"nexus-typing","glass","rounded-lg","p-sm","px-md","d-flex","gap-xs","align-center"],[1,"nexus-dot"],[1,"bi","bi-exclamation-circle"],[1,"nexus-record-ring"],[1,"bi","bi-stop-circle-fill"],[1,"m-0","text-secondary","text-sm","leading-normal"],[1,"nexus-code","glass-deep","rounded-md","overflow-hidden"],[1,"glass","rounded-md","overflow-hidden","overflow-x-auto"],[1,"nexus-list"],[1,"nexus-quote","glass","rounded-md","px-md","position-relative",2,"padding-top","10px","padding-bottom","10px"],[1,"m-0"],["rel","noopener noreferrer",1,"glass-button","d-flex","align-center","gap-xs","rounded-md","px-sm","text-sm","lift-sm",2,"padding-top","6px","padding-bottom","6px","display","inline-flex",3,"href","target"],[1,"nexus-video","rounded-md","overflow-hidden"],[1,"nexus-section",3,"nexus-section--nested"],[1,"nexus-code__head","d-flex","align-center","gap-sm","px-sm",2,"padding-top","6px","padding-bottom","6px"],[1,"bi","bi-code-slash","text-accent",2,"font-size","12px"],[1,"font-mono","text-muted","nexus-code__file","text-xs","flex-1","text-truncate"],[1,"nexus-code__lang","rounded","text-xs","uppercase","tracking-wide"],["type","button",1,"glass-button","nexus-hbtn","rounded","text-xs",3,"click","title"],[1,"nexus-code__pre","m-0","font-mono","overflow-x-auto"],[1,"w-full","nexus-table"],[1,"text-xs","text-left","px-sm","font-semibold",2,"padding-top","7px","padding-bottom","7px"],[1,"nexus-table__row"],[1,"text-xs","text-secondary","px-sm","border-t",2,"padding-top","6px","padding-bottom","6px"],[1,"d-flex","flex-column","gap-xs","m-0",2,"padding","0","list-style","none"],[1,"nexus-list__ol","d-flex","flex-column","gap-xs","m-0"],[1,"d-flex","gap-xs","align-start","text-sm","text-secondary"],[1,"bi","bi-chevron-right","text-accent","flex-shrink-0",2,"font-size","10px","margin-top","4px"],[1,"bi","bi-quote","nexus-quote__icon","text-accent"],[1,"m-0","text-secondary","text-sm","leading-normal",2,"font-style","italic"],[1,"text-xs","text-muted","mt-xs"],[1,"font-medium",2,"font-style","normal"],[1,"ml-xs"],["loading","lazy",1,"w-full","rounded-md",3,"src","alt"],[1,"text-xs","text-muted","text-center","mt-xs"],[1,"bi","bi-box-arrow-up-right",2,"font-size","11px","opacity",".7"],["allowfullscreen","","loading","lazy",2,"border","none",3,"src","title"],[1,"nexus-section"],[1,"d-flex","align-center","gap-xs","text-sm","font-bold","text-primary","m-0","mb-xs"],[1,"text-xs","text-muted","m-0","mb-sm"],[1,"d-flex","flex-column","gap-sm"],[1,"bi","bi-bookmark-fill","text-accent",2,"font-size","10px"]],template:function(n,r){n&1&&(s(0,"button",5,0),x("click",function(){return r.onIconClick()})("pointerdown",function(c){return r.onTogglePointerDown(c)})("pointermove",function(c){return r.onTogglePointerMove(c)})("pointerup",function(c){return r.onTogglePointerUp(c)}),g(2,"i",6),l(),h(3,gi,45,27,"div",7),Kt(4,Hi,9,9,"ng-template",null,1,ln)),n&2&&(nt(r.getToggleStyle()),P("dragging",r.isToggleDragging()),Q("aria-label",r.isOpen()?"Close NEXUS":"Open NEXUS"),i(2),G(r.isOpen()?"bi bi-x-lg":"bi bi-cpu-fill"),i(),f(r.isOpen()?3:-1))},dependencies:[z,hn,Hn,ze,Nn,Pt],styles:['[_ngcontent-%COMP%]:root{--font-display: "Syne", sans-serif;--font-body: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;--font-mono: "JetBrains Mono", "Fira Code", Consolas, monospace;--type-xs: clamp(.65rem, .6rem + .2vw, .75rem);--type-sm: clamp(.8rem, .75rem + .25vw, .875rem);--type-base: clamp(.9375rem, .875rem + .3vw, 1rem);--type-md: clamp(1.0625rem, .95rem + .45vw, 1.25rem);--type-lg: clamp(1.25rem, 1.05rem + .8vw, 1.75rem);--type-xl: clamp(1.5rem, 1.15rem + 1.4vw, 2.5rem);--type-2xl: clamp(2rem, 1.4rem + 2.2vw, 4rem);--type-3xl: clamp(2.5rem, 1.6rem + 3.2vw, 6rem);--type-4xl: clamp(3rem, 1.8rem + 4.5vw, 9rem);--type-tracking-tighter: -.04em;--type-tracking-tight: -.03em;--type-tracking-normal: 0em;--type-tracking-wide: .04em;--type-tracking-wider: .08em;--type-tracking-widest: .14em;--type-tracking-ultra: .22em;--type-leading-none: 1;--type-leading-tight: 1.1;--type-leading-snug: 1.25;--type-leading-normal: 1.55;--type-leading-loose: 1.8;--type-leading-ultra: 2.2;--space-xs: 4px;--space-sm: 8px;--space-md: 16px;--space-lg: 24px;--space-xl: 32px;--space-2xl: 48px;--space-3xl: 64px;--space-4xl: 96px;--space-5xl: 128px;--space-6xl: 160px;--radius-xs: 4px;--radius-sm: 8px;--radius-md: 12px;--radius-lg: 20px;--radius-xl: 28px;--radius-2xl: 40px;--radius-3xl: 56px;--radius-full: 9999px;--glass-bg-primary: rgba(255, 255, 255, .65);--glass-bg-secondary: rgba(255, 255, 255, .5);--glass-bg-tertiary: rgba(255, 255, 255, .25);--glass-bg: rgba(255, 255, 255, .55);--glass-bg-hover: rgba(255, 255, 255, .8);--glass-bg-active: rgba(255, 255, 255, .95);--glass-bg-deep: rgba(255, 255, 255, .25);--glass-border: rgba(255, 255, 255, .5);--glass-border-strong: rgba(255, 255, 255, .85);--glass-border-subtle: rgba(255, 255, 255, .2);--glass-blur: 20px;--glass-blur-heavy: 40px;--glass-inner-shadow: inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(0,0,0,.04);--glass-refract-angle: 145deg;--glass-refract-light: rgba(255, 255, 255, .55);--glass-refract-mid: rgba(255, 255, 255, .08);--glass-refract-dark: rgba(0, 0, 0, .03);--glass-specular: rgba(255, 255, 255, .9);--glass-specular-size: 30%;--prism-border: linear-gradient( 145deg, rgba(255,100,100,.5) 0%, rgba(255,180,50,.4) 14%, rgba(200,255,60,.35) 28%, rgba(50,230,255,.45) 42%, rgba(120,100,255,.5) 56%, rgba(240,80,200,.45) 70%, rgba(255,100,100,.5) 100% );--light-x: 50%;--light-y: 30%;--light-primary: rgba(255, 255, 255, .22);--light-scatter: rgba(255, 255, 255, .08);--light-ambient: rgba(255, 255, 255, .04);--depth-light-1: radial-gradient(ellipse 50% 35% at var(--light-x) var(--light-y), var(--light-primary) 0%, var(--light-scatter) 50%, transparent 100%);--depth-light-deep: radial-gradient(ellipse 80% 60% at 50% 0%, var(--light-ambient) 0%, transparent 70%);--elev-0: none;--elev-1: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);--elev-2: 0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.05), 0 0 0 1px rgba(255,255,255,.08);--elev-3: 0 8px 24px rgba(0,0,0,.1), 0 4px 8px rgba(0,0,0,.06), 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.12);--elev-4: 0 16px 40px rgba(0,0,0,.12), 0 8px 16px rgba(0,0,0,.07), 0 0 0 1px rgba(255,255,255,.12), inset 0 1px 0 rgba(255,255,255,.16);--elev-5: 0 28px 64px rgba(0,0,0,.16), 0 12px 24px rgba(0,0,0,.09), 0 0 0 1px rgba(255,255,255,.14), inset 0 1px 0 rgba(255,255,255,.2);--edge-glow-sm: 0 0 12px -2px var(--accent-glow, rgba(99,102,241,.35));--edge-glow-md: 0 0 24px -4px var(--accent-glow, rgba(99,102,241,.35)), 0 0 48px -8px var(--accent-glow, rgba(99,102,241,.35));--edge-glow-lg: 0 0 40px -6px var(--accent-glow, rgba(99,102,241,.35)), 0 0 80px -12px var(--accent-glow, rgba(99,102,241,.35)), 0 0 120px -20px var(--accent-glow, rgba(99,102,241,.35));--aura-near: 0 0 0 1px color-mix(in srgb, var(--accent-primary, #6366f1) 22%, transparent);--aura-mid: 0 4px 20px color-mix(in srgb, var(--accent-primary, #6366f1) 30%, transparent);--aura-far: 0 12px 48px color-mix(in srgb, var(--accent-primary, #6366f1) 18%, transparent);--aura-stack: var(--aura-near), var(--aura-mid), var(--aura-far);--scatter-soft: inset 0 1px 0 rgba(255,255,255,.8), inset 0 -1px 0 rgba(0,0,0,.06), inset 1px 0 0 rgba(255,255,255,.3), inset -1px 0 0 rgba(255,255,255,.1);--scatter-dark: inset 0 1px 0 rgba(255,255,255,.12), inset 0 -1px 0 rgba(0,0,0,.3), inset 1px 0 0 rgba(255,255,255,.06), inset -1px 0 0 rgba(0,0,0,.06);--lift-sm: translateY(-2px) scale(1.005);--lift-md: translateY(-4px) scale(1.01);--lift-lg: translateY(-8px) scale(1.016);--lift-press: translateY(1px) scale(.975);--contrast-boost-light: brightness(1.05) contrast(1.08);--contrast-boost-dark: brightness(1.08) contrast(1.12);--mesh-speed: 18s;--mesh-opacity: .6;--text-primary: #1a1a2e;--text-secondary: #4a4a6a;--text-muted: #7a7a9a;--text-inverse: #ffffff;--text-on-accent: #ffffff;--accent-primary: #6366f1;--accent-secondary: #8b5cf6;--accent-tertiary: #ec4899;--accent-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);--accent-glow: rgba(99, 102, 241, .35);--accent-success: #10b981;--accent-warning: #f59e0b;--accent-error: #ef4444;--success: #10b981;--success-bg: rgba(16,185,129,.12);--warning: #f59e0b;--warning-bg: rgba(245,158,11,.12);--error: #ef4444;--error-bg: rgba(239,68,68,.12);--info: #3b82f6;--info-bg: rgba(59,130,246,.12);--bg-body: #f0f4f8;--bg-surface: rgba(255, 255, 255, .8);--bg-primary: #f8fafc;--bg-secondary: #f1f5f9;--bg-tertiary: #e2e8f0;--bg-gradient: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #ede9fe 100%);--glow-primary: 0 0 20px rgba(99,102,241,.4);--glow-accent: 0 0 20px rgba(139,92,246,.4);--shadow-glow: 0 0 0 1px var(--accent-glow), 0 8px 32px var(--accent-glow);--shadow-inset: inset 0 2px 8px rgba(0,0,0,.06);--gradient-primary: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));--gradient-surface: linear-gradient(135deg, var(--glass-bg), var(--glass-bg-deep));--sidebar-bg: var(--glass-bg);--sidebar-text: var(--text-primary);--sidebar-text-active: var(--accent-primary);--sidebar-bg-active: color-mix(in srgb, var(--accent-primary) 10%, transparent);--header-bg: var(--glass-bg);--header-text: var(--text-primary);--ease-spring: cubic-bezier(.175, .885, .32, 1.275);--ease-spring-heavy: cubic-bezier(.34, 1.56, .64, 1);--ease-smooth: cubic-bezier(.4, 0, .2, 1);--ease-in: cubic-bezier(.4, 0, 1, 1);--ease-out: cubic-bezier(0, 0, .2, 1);--ease-elastic: cubic-bezier(.68, -.55, .27, 1.55);--duration-fast: .12s;--duration-base: .24s;--duration-slow: .4s;--duration-xslow: .7s;--transition-theme: .3s ease-in-out;--aspect-square: 1 / 1;--aspect-video: 16 / 9;--aspect-wide: 21 / 9;--aspect-portrait: 3 / 4;--aspect-golden: 1.618 / 1}.nexus-toggle[_ngcontent-%COMP%]{position:fixed;bottom:var(--space-lg, 24px);right:var(--space-lg, 24px);z-index:var(--z-modal, 1050);width:62px;height:62px;display:flex;align-items:center;justify-content:center;cursor:grab;animation:_ngcontent-%COMP%_power-aura-anim 3s var(--ease-smooth) infinite}@keyframes _ngcontent-%COMP%_power-aura-anim{0%,to{box-shadow:var(--elev-3),var(--edge-glow-sm)}50%{box-shadow:var(--elev-5),var(--edge-glow-lg),0 0 100px var(--accent-glow)}}.nexus-toggle[_ngcontent-%COMP%]{transition:all var(--duration-base) var(--ease-smooth)}.nexus-toggle[_ngcontent-%COMP%]:hover{transform:scale(1.1) rotate(5deg);box-shadow:0 0 24px -4px var(--accent-glow),0 0 48px -8px var(--accent-glow)}.nexus-toggle[_ngcontent-%COMP%]:active{transform:scale(.92);cursor:grabbing}.nexus-toggle.dragging[_ngcontent-%COMP%]{opacity:.85;cursor:grabbing;animation-play-state:paused}.nexus-toggle[_ngcontent-%COMP%]   .toggle-icon[_ngcontent-%COMP%]{font-size:24px;color:var(--text-on-accent, #fff);filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}.nexus-panel[_ngcontent-%COMP%]{position:fixed;bottom:calc(var(--space-lg, 24px) + 75px);right:var(--space-lg, 24px);z-index:calc(var(--z-modal, 1050) - 1);width:440px;height:660px;background:var(--glass-bg);backdrop-filter:blur(16px) saturate(1.8) brightness(1.02);-webkit-backdrop-filter:blur(16px) saturate(1.8) brightness(1.02);border:1px solid var(--glass-border);position:relative;isolation:isolate;overflow:hidden}.nexus-panel[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(var(--glass-refract-angle, 145deg),var(--glass-refract-light, rgba(255, 255, 255, .55)) 0%,var(--glass-refract-mid, rgba(255, 255, 255, .08)) 22%,transparent 55%);mix-blend-mode:screen;opacity:1;pointer-events:none;z-index:0;transition:opacity var(--duration-base) var(--ease-smooth)}.nexus-panel[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(ellipse 80% 60% at 50% 0%,var(--light-primary) 0%,var(--light-scatter) 40%,transparent 70%);pointer-events:none;mix-blend-mode:screen;z-index:0;opacity:.6;transition:opacity var(--duration-slow) var(--ease-smooth)}.nexus-panel[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{position:relative;z-index:1}.nexus-panel[_ngcontent-%COMP%]:hover:before{opacity:1}.nexus-panel[_ngcontent-%COMP%]:hover:after{opacity:1}.nexus-panel[_ngcontent-%COMP%]{box-shadow:0 28px 64px #00000029,0 12px 24px #00000017,0 0 0 1px #ffffff24,inset 0 1px #fff3;transition:all var(--duration-base) var(--ease-smooth)}.nexus-panel[_ngcontent-%COMP%]:hover{transform:none!important}.nexus-panel--expanded[_ngcontent-%COMP%]{width:min(920px,95vw);height:min(88vh,880px)}.nexus-panel.dragging[_ngcontent-%COMP%]{opacity:.94;transition:none;box-shadow:0 0 12px -2px var(--accent-glow)}@media(max-width:575.98px){.nexus-panel[_ngcontent-%COMP%]{width:calc(100vw - 24px);right:12px;bottom:84px;height:calc(100dvh - 100px)}}.nexus-header[_ngcontent-%COMP%]{height:64px;background:var(--glass-bg-deep);box-shadow:inset 0 1px #fffc,inset 0 -1px #0000000f,inset 1px 0 #ffffff4d,inset -1px 0 #ffffff1a;cursor:grab;flex-shrink:0}.nexus-header[_ngcontent-%COMP%]:active{cursor:grabbing}.nexus-brand[_ngcontent-%COMP%]{font-family:var(--font-display);font-size:var(--type-xs, .6875rem);font-weight:700;letter-spacing:var(--type-tracking-widest, .14em);text-transform:uppercase;color:var(--text-muted);font-size:14px;font-weight:800;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:.15em}.nexus-drag-grip[_ngcontent-%COMP%]{font-size:20px;color:var(--text-muted);opacity:.4;transition:all var(--duration-base) var(--ease-smooth)}.nexus-drag-grip[_ngcontent-%COMP%]:hover{opacity:1;color:var(--accent-primary)}.nexus-avatar[_ngcontent-%COMP%]{position:relative;width:40px;height:40px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--accent-gradient);box-shadow:0 4px 12px #00000014,0 2px 4px #0000000d,0 0 0 1px #ffffff14;box-shadow:0 0 12px -2px var(--accent-glow)}.nexus-avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:20px;color:var(--text-on-accent, #fff);filter:drop-shadow(0 2px 4px rgba(0,0,0,.25))}.nexus-avatar__dot[_ngcontent-%COMP%]{position:absolute;bottom:2px;right:2px;width:11px;height:11px;border-radius:50%;background:var(--success);border:2px solid var(--glass-bg-deep)}.nexus-avatar__dot[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:-2px;border-radius:50%;background:var(--success);opacity:.5;animation:_ngcontent-%COMP%_nx-dot-pulse 2s cubic-bezier(.4,0,.2,1) infinite}@keyframes _ngcontent-%COMP%_nx-dot-pulse{0%{transform:scale(1);opacity:.6}to{transform:scale(2);opacity:0}}.nexus-hbtn[_ngcontent-%COMP%]{width:34px;height:34px;display:flex;align-items:center;justify-content:center;transition:all var(--duration-base) var(--ease-smooth)}.nexus-hbtn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:15px;color:var(--text-muted)}.nexus-hbtn[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover)}.nexus-hbtn[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%]{color:var(--text-primary);filter:drop-shadow(0 0 6px var(--accent-glow))}.nexus-hbtn.bg-accent[_ngcontent-%COMP%]{background:var(--accent-primary)}.nexus-hbtn.bg-accent[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--text-on-accent, #fff)}.nexus-hbtn--close[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--error) 15%,transparent)!important}.nexus-hbtn--close[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%]{color:var(--error)!important;filter:drop-shadow(0 0 6px var(--error))}.nexus-search-input[_ngcontent-%COMP%]{background:transparent;border:none;outline:none;font-family:var(--font-body);color:var(--text-primary);font-size:14px}.nexus-search-input[_ngcontent-%COMP%]::placeholder{color:var(--text-muted)}.nexus-chip[_ngcontent-%COMP%]{background:var(--glass-bg);backdrop-filter:blur(4px) saturate(1.8) brightness(1.02);-webkit-backdrop-filter:blur(4px) saturate(1.8) brightness(1.02);border:1px solid var(--glass-border);border-radius:var(--radius-full);padding:11px 24px;font-family:var(--font-display);font-size:var(--type-sm, .875rem);font-weight:600;letter-spacing:var(--type-tracking-wide, .04em);cursor:pointer;position:relative;overflow:hidden;isolation:isolate;transition:filter var(--duration-base) var(--ease-smooth),box-shadow var(--duration-base) var(--ease-smooth),transform var(--duration-fast) var(--ease-spring-heavy, cubic-bezier(.34, 1.56, .64, 1))}.nexus-chip[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(160deg,rgba(255,255,255,.3) 0%,rgba(255,255,255,.08) 30%,transparent 60%);pointer-events:none;opacity:.8;transition:opacity var(--duration-base) var(--ease-smooth)}.nexus-chip[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:0;left:10%;right:10%;height:1px;background:#fff3;border-radius:var(--radius-full);pointer-events:none}.nexus-chip[_ngcontent-%COMP%]:hover{background:var(--glass-bg-hover);border-color:var(--glass-border-strong);box-shadow:0 8px 24px #0000001a,0 4px 8px #0000000f,0 0 0 1px #ffffff1a,inset 0 1px #ffffff1f;box-shadow:0 0 12px -2px var(--accent-glow);transform:var(--lift-sm, translateY(-2px) scale(1.005))}.nexus-chip[_ngcontent-%COMP%]:hover:before{opacity:1}.nexus-chip[_ngcontent-%COMP%]:active{transform:var(--lift-press, translateY(1px) scale(.975))}.nexus-chip[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--accent-primary);outline-offset:3px}.nexus-chip[_ngcontent-%COMP%]{padding:6px 14px;font-size:12px;height:auto;min-height:0}.nexus-chip[_ngcontent-%COMP%]:hover{box-shadow:0 0 0 1px color-mix(in srgb,var(--accent-primary) 16%,transparent),0 4px 16px color-mix(in srgb,var(--accent-primary) 20%,transparent)}.nexus-chip--code[_ngcontent-%COMP%]{border-color:var(--accent-secondary);color:var(--accent-secondary)}.nexus-chip--code[_ngcontent-%COMP%]:hover{box-shadow:0 0 0 1px color-mix(in srgb,var(--accent-secondary) 16%,transparent),0 4px 16px color-mix(in srgb,var(--accent-secondary) 20%,transparent)}.nexus-body[_ngcontent-%COMP%]::-webkit-scrollbar{width:4px;height:4px}.nexus-body[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:transparent}.nexus-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:var(--glass-border-strong);border-radius:2px;transition:background var(--duration-base)}.nexus-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:var(--accent-primary)}.nexus-body[_ngcontent-%COMP%]{scrollbar-width:thin;scrollbar-color:var(--glass-border-strong) transparent}.nexus-msg[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_cinema-entrance-anim .4s var(--ease-out) both}@keyframes _ngcontent-%COMP%_cinema-entrance-anim{0%{opacity:0;transform:translateY(12px);filter:blur(4px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}.nexus-msg--user[_ngcontent-%COMP%]{flex-direction:row-reverse}.nexus-msg__avatar[_ngcontent-%COMP%]{width:36px;height:36px;flex-shrink:0;align-self:flex-end;background:var(--accent-gradient);border:1px solid var(--glass-border-strong);box-shadow:0 1px 3px #0000000f,0 1px 2px #0000000a}.nexus-msg__avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:18px;color:var(--text-on-accent, #fff)}.nexus-msg__avatar--user[_ngcontent-%COMP%]{background:linear-gradient(135deg,var(--accent-tertiary, var(--accent-secondary)),var(--accent-primary))}.nexus-bubble[_ngcontent-%COMP%]{max-width:86%;position:relative;transition:all var(--duration-base) var(--ease-smooth)}.nexus-bubble[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--text-secondary)}.nexus-bubble[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .nexus-bubble[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .nexus-bubble[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 8px;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:var(--font-display);font-weight:700}.nexus-bubble[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.1rem}.nexus-bubble[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1rem}.nexus-bubble--bot[_ngcontent-%COMP%]{background:var(--glass-bg);border:1px solid var(--glass-border);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(1.8);backdrop-filter:blur(var(--glass-blur)) saturate(1.8);box-shadow:var(--glass-inner-shadow);border-bottom-left-radius:4px!important;animation:_ngcontent-%COMP%_cinema-entrance-anim .5s var(--ease-out) both}@keyframes _ngcontent-%COMP%_cinema-entrance-anim{0%{opacity:0;transform:translateY(8px);filter:blur(4px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}.nexus-bubble--user[_ngcontent-%COMP%]{background:var(--accent-gradient);border-bottom-right-radius:4px!important;border-bottom-left-radius:var(--radius-lg)!important;box-shadow:0 0 12px -2px var(--accent-glow)}.nexus-bubble--user[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .nexus-bubble--user[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .nexus-bubble--user[_ngcontent-%COMP%]   .text-secondary[_ngcontent-%COMP%]{color:var(--text-on-accent, #fff)!important}.nexus-bubble--user[_ngcontent-%COMP%]   .nexus-rich[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .nexus-bubble--user[_ngcontent-%COMP%]   .nexus-rich[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{background:none;-webkit-text-fill-color:white;color:#fff;filter:drop-shadow(0 2px 4px rgba(0,0,0,.2))}.nexus-typing[_ngcontent-%COMP%]{background:var(--glass-bg);border:1px solid var(--glass-border);border-bottom-left-radius:4px!important}.nexus-dot[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:50%;background:var(--accent-primary);animation:_ngcontent-%COMP%_nx-bounce 1.4s var(--ease-smooth) infinite}.nexus-dot[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.nexus-dot[_ngcontent-%COMP%]:nth-child(3){animation-delay:.4s}@keyframes _ngcontent-%COMP%_nx-bounce{0%,60%,to{transform:translateY(0)}30%{transform:translateY(-6px)}}.nexus-code[_ngcontent-%COMP%]{background:var(--glass-bg-deep);backdrop-filter:blur(24px) saturate(1.8) brightness(1.02);-webkit-backdrop-filter:blur(24px) saturate(1.8) brightness(1.02);border:1px solid var(--glass-border);backdrop-filter:blur(24px) saturate(2.2) brightness(1.01);-webkit-backdrop-filter:blur(24px) saturate(2.2) brightness(1.01);box-shadow:0 16px 40px #0000001f,0 8px 16px #00000012,0 0 0 1px #ffffff1f,inset 0 1px #ffffff29;border-radius:var(--radius-md);margin-top:8px}.nexus-code__head[_ngcontent-%COMP%]{background:var(--glass-bg-deep);border-bottom:1px solid var(--glass-border-subtle);padding:8px 12px}.nexus-code__lang[_ngcontent-%COMP%]{font-family:var(--font-display);font-size:var(--type-xs, .6875rem);font-weight:700;letter-spacing:var(--type-tracking-widest, .14em);text-transform:uppercase;color:var(--text-muted);font-size:10px;padding:2px 8px;background:color-mix(in srgb,var(--accent-primary) 15%,transparent);color:var(--accent-primary);border-radius:var(--radius-xs)}.nexus-code__pre[_ngcontent-%COMP%]{padding:16px;background:color-mix(in srgb,var(--bg-deep, #050811) 98%,black);font-size:12px;line-height:1.7;color:#e2e8f0}.nexus-code__pre[_ngcontent-%COMP%]::-webkit-scrollbar{width:4px;height:4px}.nexus-code__pre[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:transparent}.nexus-code__pre[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:var(--glass-border-strong);border-radius:2px;transition:background var(--duration-base)}.nexus-code__pre[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:var(--accent-primary)}.nexus-code__pre[_ngcontent-%COMP%]{scrollbar-width:thin;scrollbar-color:var(--glass-border-strong) transparent}.nexus-table[_ngcontent-%COMP%]{transition:all var(--duration-base) var(--ease-smooth);border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--glass-border-subtle)}.nexus-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:var(--glass-bg-deep);font-family:var(--font-display);font-size:var(--type-xs, .6875rem);font-weight:700;letter-spacing:var(--type-tracking-widest, .14em);text-transform:uppercase;color:var(--text-muted);padding:10px 12px;font-size:10px}.nexus-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px 12px;border-top:1px solid var(--glass-border-subtle)}.nexus-table__row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%]{background:var(--glass-bg-hover)}.nexus-quote[_ngcontent-%COMP%]{position:relative}.nexus-quote[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--accent-gradient);border-radius:0 var(--radius-xs) var(--radius-xs) 0;box-shadow:2px 0 8px var(--accent-glow);transition:width var(--duration-base) var(--ease-spring)}.nexus-quote[_ngcontent-%COMP%]:hover:before{width:6px}.nexus-quote[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--accent-primary) 6%,transparent);padding:12px 16px;border-radius:0 var(--radius-md) var(--radius-md) 0}.nexus-quote__icon[_ngcontent-%COMP%]{font-size:28px;opacity:.15}.nexus-textarea[_ngcontent-%COMP%]{background:var(--glass-bg);backdrop-filter:blur(4px) saturate(1.8) brightness(1.02);-webkit-backdrop-filter:blur(4px) saturate(1.8) brightness(1.02);border:1px solid var(--glass-border);border-radius:var(--radius-md);padding:12px 16px;font-family:var(--font-body);font-size:var(--type-base, 1rem);color:var(--text-primary);width:100%;box-shadow:0 1px 3px #0000000f,0 1px 2px #0000000a;box-shadow:var(--elev-1),inset 0 2px 8px #0000000f;transition:border-color var(--duration-fast) var(--ease-smooth),background var(--duration-fast) var(--ease-smooth),box-shadow var(--duration-base) var(--ease-smooth)}.nexus-textarea[_ngcontent-%COMP%]::placeholder{color:var(--text-muted);opacity:.7}.nexus-textarea[_ngcontent-%COMP%]:hover{border-color:var(--glass-border-strong);background:var(--glass-bg-hover);box-shadow:var(--elev-2),inset 0 2px 8px #0000000f}.nexus-textarea[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--accent-primary);background:var(--glass-bg-active);box-shadow:0 0 0 3px var(--accent-glow),var(--elev-1),inset 0 2px 8px #0000000f}.nexus-textarea[_ngcontent-%COMP%]{min-height:44px;border-radius:var(--radius-lg);padding:10px 16px}.nexus-textarea[_ngcontent-%COMP%]:focus{box-shadow:0 0 12px -2px var(--accent-glow)}.nexus-icon-btn[_ngcontent-%COMP%]{width:44px;height:44px;display:flex;align-items:center;justify-content:center;transition:all var(--duration-base) var(--ease-smooth)}.nexus-icon-btn--recording[_ngcontent-%COMP%]{background:var(--error)!important;box-shadow:0 0 24px -4px var(--error),0 0 48px -8px var(--error)}.nexus-icon-btn--recording[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#fff!important}.nexus-icon-btn--send[_ngcontent-%COMP%]{box-shadow:0 0 0 1px color-mix(in srgb,var(--accent-primary) 22%,transparent),0 4px 20px color-mix(in srgb,var(--accent-primary) 30%,transparent),0 12px 48px color-mix(in srgb,var(--accent-primary) 18%,transparent)}.nexus-icon-btn--send[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--text-on-accent, #fff)}.nexus-icon-btn--send[_ngcontent-%COMP%]:not(:disabled):hover{box-shadow:0 0 0 1px color-mix(in srgb,var(--accent-primary) 35%,transparent),0 4px 24px color-mix(in srgb,var(--accent-primary) 50%,transparent),0 16px 60px color-mix(in srgb,var(--accent-primary) 28%,transparent),0 32px 96px color-mix(in srgb,var(--accent-primary) 16%,transparent)}.nexus-panel[_ngcontent-%COMP%]   i[class^=bi-][_ngcontent-%COMP%], .nexus-toggle[_ngcontent-%COMP%]   i[class^=bi-][_ngcontent-%COMP%]{display:inline-block;vertical-align:middle}'],changeDetection:0})}}return t})();var Bi=["sidebar"],qi=(t,o)=>o.id;function Gi(t,o){t&1&&g(0,"i",16)}function $i(t,o){t&1&&g(0,"i",17)}function Wi(t,o){t&1&&g(0,"i",18)}function Ji(t,o){t&1&&g(0,"i",19)}function Ki(t,o){if(t&1){let e=O();s(0,"button",23),x("click",function(){C(e);let r=p().$implicit,a=p();return w(a.toastService.dismiss(r.id))}),g(1,"i",24),l()}}function Yi(t,o){if(t&1&&(s(0,"div",14)(1,"div",15),h(2,Gi,1,0,"i",16)(3,$i,1,0,"i",17)(4,Wi,1,0,"i",18)(5,Ji,1,0,"i",19),l(),s(6,"div",20)(7,"div",21),d(8),l()(),h(9,Ki,2,0,"button",22),l()),t&2){let e,n=o.$implicit;P("toast-success",n.type==="success")("toast-error",n.type==="error")("toast-warning",n.type==="warning")("toast-info",n.type==="info"),i(2),f((e=n.type)==="success"?2:e==="error"?3:e==="warning"?4:5),i(6),y(n.message),i(),f(n.dismissible?9:-1)}}var Xi=(()=>{class t{constructor(){this.router=M(he),this.modalService=M(ie),this.toastService=M(ne),this.sidebar=te("sidebar"),this.isSidebarCollapsed=b(!1),this.isMobile=b(typeof window<"u"?window.innerWidth<992:!1),this.currentPageTitle=vn(this.router.events.pipe(ye(e=>e instanceof _e),De(()=>this.resolvePageTitle()),Ut(this.resolvePageTitle())),{initialValue:"Loading..."}),Ce(()=>{this.router.events.pipe(ye(e=>e instanceof _e)).subscribe(()=>{document.querySelector(".content-wrapper")?.scrollTo({top:0,behavior:"smooth"})})})}ngOnInit(){}onResize(){this.isMobile.set(window.innerWidth<992)}onMenuToggle(){let e=this.sidebar();e&&(this.isMobile()?e.openMobile():e.toggleCollapse())}onSidebarCollapse(e){this.isSidebarCollapsed.set(e)}onSidebarItemSelected(){this.isMobile()&&this.sidebar()?.closeMobile()}openLogin(){this.modalService.open(Ue,{size:"md",centered:!0,backdrop:!0,keyboard:!0})}resolvePageTitle(){let e=this.router.url;if(e==="/"||e==="/dashboard")return"Dashboard";let n=e.split("/").filter(Boolean);return n.length===0?"Learning":n[n.length-1].split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=L({type:t,selectors:[["app-layout"]],viewQuery:function(n,r){n&1&&ue(r.sidebar,Bi,5),n&2&&me()},hostBindings:function(n,r){n&1&&x("resize",function(){return r.onResize()},xe)("app:login",function(){return r.openLogin()},xe)},decls:19,vars:3,consts:[["sidebar",""],[1,"app-layout"],[3,"itemSelected","collapseChanged"],[1,"main-content"],[3,"menuToggle"],["aria-label","breadcrumb",1,"breadcrumb-nav"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","/","aria-label","Home"],[1,"bi","bi-house-door-fill"],["aria-current","page",1,"breadcrumb-item","active"],[1,"content-wrapper"],["aria-live","polite","aria-atomic","false",1,"toast-container"],["role","alert",1,"glass-toast",3,"toast-success","toast-error","toast-warning","toast-info"],["role","alert",1,"glass-toast"],[1,"toast-icon"],[1,"bi","bi-check-circle-fill"],[1,"bi","bi-x-circle-fill"],[1,"bi","bi-exclamation-triangle-fill"],[1,"bi","bi-info-circle-fill"],[1,"toast-content"],[1,"toast-message"],["aria-label","Dismiss notification",1,"toast-close"],["aria-label","Dismiss notification",1,"toast-close",3,"click"],[1,"bi","bi-x"]],template:function(n,r){n&1&&(s(0,"div",1)(1,"app-sidebar",2,0),x("itemSelected",function(){return r.onSidebarItemSelected()})("collapseChanged",function(c){return r.onSidebarCollapse(c)}),l(),s(3,"main",3)(4,"app-header",4),x("menuToggle",function(){return r.onMenuToggle()}),l(),s(5,"nav",5)(6,"ol",6)(7,"li",7)(8,"a",8),g(9,"i",9),l()(),s(10,"li",10),d(11),l()()(),s(12,"div",11),g(13,"router-outlet"),l(),g(14,"app-footer"),l(),s(15,"div",12),k(16,Yi,10,11,"div",13,qi),l()(),g(18,"lib-nexus-chatbot")),n&2&&(i(3),P("sidebar-collapsed",r.isSidebarCollapsed()),i(8),R(" ",r.currentPageTitle()," "),i(5),E(r.toastService.toasts()))},dependencies:[z,fe,yn,ft,vt,bt,At],styles:['[_nghost-%COMP%]{display:contents}.app-layout[_ngcontent-%COMP%]{display:flex;min-height:100vh}.main-content[_ngcontent-%COMP%]{flex:1;margin-left:260px;display:flex;flex-direction:column;min-height:100vh;transition:margin-left var(--duration-slow) var(--ease-smooth)}.main-content.sidebar-collapsed[_ngcontent-%COMP%]{margin-left:72px}.breadcrumb-nav[_ngcontent-%COMP%]{padding:12px 24px;background:var(--glass-bg);backdrop-filter:blur(var(--glass-blur)) saturate(1.6);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(1.6);border-bottom:1px solid var(--glass-border);position:relative;z-index:1}.breadcrumb[_ngcontent-%COMP%]{display:flex;align-items:center;list-style:none;margin:0;padding:0;font-size:.875rem;gap:0}.breadcrumb-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.breadcrumb-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--text-muted);text-decoration:none;transition:color var(--duration-fast) var(--ease-smooth)}.breadcrumb-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--accent-primary)}.breadcrumb-item.active[_ngcontent-%COMP%]{color:var(--text-primary);font-weight:500}.breadcrumb-item[_ngcontent-%COMP%] + .breadcrumb-item[_ngcontent-%COMP%]:before{content:"/";color:var(--text-muted);margin:0 8px;opacity:.5}.content-wrapper[_ngcontent-%COMP%]{flex:1;padding:24px;overflow-x:hidden}.toast-container[_ngcontent-%COMP%]{position:fixed;top:80px;right:16px;z-index:1080;display:flex;flex-direction:column;gap:10px;pointer-events:none;max-width:400px;width:calc(100vw - 32px)}.glass-toast[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--glass-bg-hover);backdrop-filter:blur(var(--glass-blur-heavy)) saturate(2);-webkit-backdrop-filter:blur(var(--glass-blur-heavy)) saturate(2);border:1px solid var(--glass-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-xl),var(--glass-inner-shadow);pointer-events:auto;position:relative;overflow:hidden;animation:_ngcontent-%COMP%_toast-slide-in var(--duration-base) var(--ease-spring) both}.glass-toast[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(145deg,rgba(255,255,255,.12) 0%,transparent 60%);pointer-events:none}.glass-toast[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;top:12%;bottom:12%;width:3px;border-radius:0 var(--radius-full) var(--radius-full) 0;background:var(--_toast-color, var(--accent-primary))}.glass-toast.toast-success[_ngcontent-%COMP%]{--_toast-color: var(--success);border-color:color-mix(in srgb,var(--success) 30%,transparent)}.glass-toast.toast-error[_ngcontent-%COMP%]{--_toast-color: var(--error);border-color:color-mix(in srgb,var(--error) 30%,transparent)}.glass-toast.toast-warning[_ngcontent-%COMP%]{--_toast-color: var(--warning);border-color:color-mix(in srgb,var(--warning) 30%,transparent)}.glass-toast.toast-info[_ngcontent-%COMP%]{--_toast-color: var(--info);border-color:color-mix(in srgb,var(--info) 30%,transparent)}.toast-icon[_ngcontent-%COMP%]{font-size:1.125rem;flex-shrink:0;color:var(--_toast-color, var(--accent-primary))}.toast-content[_ngcontent-%COMP%]{flex:1;min-width:0}.toast-message[_ngcontent-%COMP%]{font-size:.875rem;font-weight:500;color:var(--text-primary);line-height:1.5}.toast-close[_ngcontent-%COMP%]{background:transparent;border:1px solid transparent;border-radius:var(--radius-sm);color:var(--text-muted);cursor:pointer;padding:4px 6px;display:flex;align-items:center;justify-content:center;font-size:.875rem;flex-shrink:0;transition:all var(--duration-fast) var(--ease-smooth)}.toast-close[_ngcontent-%COMP%]:hover{background:var(--glass-bg);border-color:var(--glass-border);color:var(--text-primary)}@keyframes _ngcontent-%COMP%_toast-slide-in{0%{opacity:0;transform:translate(calc(100% + 16px))}to{opacity:1;transform:translate(0)}}@media(max-width:991.98px){.main-content[_ngcontent-%COMP%]{margin-left:0!important}.content-wrapper[_ngcontent-%COMP%]{padding:16px}.toast-container[_ngcontent-%COMP%]{inset:auto 12px 16px;width:auto;max-width:none}}@media(prefers-reduced-motion:reduce){.glass-toast[_ngcontent-%COMP%]{animation:none}.main-content[_ngcontent-%COMP%]{transition:none}}'],changeDetection:0})}}return t})();var Qi=(t,o)=>{let e=M(W),n=M(ie),r=M(he),a=t.data,c=e.isLoggedIn();if(a?.requireAuth!==!1&&!c){let v=o.url;return n.open(Ue,{size:"md",centered:!0,backdrop:!0,keyboard:!0}).afterClosed().then(F=>F===!0?!0:r.createUrlTree([a?.redirectTo||"/"]))}return a?.roles&&a.roles.length>0&&!a.roles.some(_=>e.hasRole(_))?r.createUrlTree(["/unauthorized"]):!0};var Zi=["scrollTopRef"],ea=["*"],ta=(t,o)=>o.heading,na=(t,o)=>o.title;function ra(t,o){if(t&1&&(u(0,"div",2)(1,"div",28),S(2,"div",29),m(),u(3,"span",30),d(4),m()()),t&2){let e=p();i(2),K("width",e.calculateProgress(),"%"),i(2),en("",e.getCurrentSection()," / ",e.getTotalSections())}}function oa(t,o){if(t&1){let e=O();u(0,"span",32),H("click",function(){let r=C(e).$implicit,a=p(2);return w(a.scrollToTag(r))}),S(1,"i",33),d(2),m()}if(t&2){let e=o.$implicit,n=p(2);P("clickable",n.getTagLink(e)),i(2),R(" ",e," ")}}function ia(t,o){if(t&1&&(u(0,"nav",8),k(1,oa,3,3,"span",31,ee),m()),t&2){let e=p();i(),E(e.tags())}}function aa(t,o){if(t&1&&(S(0,"span",16),u(1,"span",10)(2,"div",11),S(3,"i",34),m(),u(4,"div",13)(5,"span",14),d(6,"Examples"),m(),u(7,"span",15),d(8),m()()()),t&2){let e=p();i(8),y(e.codeExamples().length)}}function sa(t,o){if(t&1&&(u(0,"div",50)(1,"p"),d(2),m()()),t&2){let e=p().$implicit;i(2),y(e.content)}}function la(t,o){if(t&1&&(u(0,"li"),S(1,"i",53)(2,"span",54),m()),t&2){let e=o.$implicit;i(2),re("innerHTML",e,de)}}function ca(t,o){if(t&1&&(u(0,"ul",51),k(1,la,3,1,"li",null,ee),m()),t&2){let e=p().$implicit;i(),E(e.list)}}function da(t,o){if(t&1&&(u(0,"div",52)(1,"div",55),S(2,"i",56),m(),u(3,"div",57)(4,"strong"),d(5,"Pro Tip"),m(),u(6,"p"),d(7),m()()()),t&2){let e=p().$implicit;i(7),y(e.additionalExplanation)}}function pa(t,o){if(t&1&&(u(0,"article",41)(1,"div",42)(2,"span",43),d(3),m()(),u(4,"div",44)(5,"div",45)(6,"div",46)(7,"h5",47),d(8),m(),u(9,"span",48),d(10),m()(),u(11,"div",49),h(12,sa,3,1,"div",50),h(13,ca,3,0,"ul",51),h(14,da,8,1,"div",52),m()()()()),t&2){let e=o.$implicit,n=o.$index,r=p(2);P("section-highlight",r.isSectionHighlighted(e.heading)),re("id",r.getSectionId(e,n)),i(3),y(n+1),i(5),y(e.heading),i(2),R("Step ",n+1),i(2),f(e.content?12:-1),i(),f(e.list&&e.list.length>0?13:-1),i(),f(e.additionalExplanation?14:-1)}}function ua(t,o){if(t&1&&(u(0,"section",22)(1,"div",35)(2,"div",36),S(3,"i",37),m(),u(4,"div",38)(5,"h2"),d(6,"Detailed Sections"),m(),u(7,"p"),d(8),m()()(),u(9,"div",39),k(10,pa,15,9,"article",40,ta),m()()),t&2){let e=p();i(8),R("",e.sections().length," topic sections to explore"),i(2),E(e.sections())}}function ma(t,o){if(t&1&&(u(0,"p",65),d(1),m()),t&2){let e=p().$implicit;i(),y(e.description)}}function ga(t,o){if(t&1){let e=O();u(0,"div",60)(1,"div",61)(2,"div",62)(3,"span",63),d(4),m(),u(5,"div")(6,"h5",64),d(7),m(),h(8,ma,2,1,"p",65),m()(),u(9,"div",66)(10,"button",67),H("click",function(){let r=C(e),a=r.$implicit,c=r.$index,v=p(2);return w(v.copyCode(a.code,c))}),S(11,"i",68),m(),u(12,"button",69),H("click",function(){let r=C(e).$index,a=p(2);return w(a.toggleCodeExpansion(r))}),S(13,"i",68),m()()(),u(14,"div",70)(15,"div",71)(16,"span",72),S(17,"i",73),d(18),m(),u(19,"span",74),S(20,"i",75),d(21),m()()(),u(22,"div",76)(23,"pre",77)(24,"code"),d(25),m()()()()}if(t&2){let e=o.$implicit,n=o.$index,r=p(2);i(4),y(n+1),i(3),y(e.title),i(),f(e.description?8:-1),i(2),P("copied",r.isCopied(n)),i(),P("bi-check-lg",r.isCopied(n))("bi-clipboard",!r.isCopied(n)),i(2),P("bi-arrows-angle-contract",r.isExpanded(n))("bi-arrows-angle-expand",!r.isExpanded(n)),i(5),R(" ",e.language||"text"," "),i(3),R(" ",r.countCodeLines(e.code)," lines "),i(),P("expanded",r.isExpanded(n)),i(2),G("language-"+(e.language||"text")),i(),y(e.code)}}function ha(t,o){if(t&1&&(u(0,"section",23)(1,"div",35)(2,"div",58),S(3,"i",34),m(),u(4,"div",38)(5,"h2"),d(6,"Code Examples"),m(),u(7,"p"),d(8),m()()(),u(9,"div",59),k(10,ga,26,20,"div",60,na),m()()),t&2){let e=p();i(8),R("",e.codeExamples().length," hands-on examples"),i(2),E(e.codeExamples())}}function fa(t,o){if(t&1&&(u(0,"li")(1,"span",87),d(2),m(),S(3,"i",88),u(4,"span",89),d(5),m()()),t&2){let e=o.$implicit,n=o.$index;i(2),y(n+1),i(3),y(e)}}function va(t,o){if(t&1){let e=O();u(0,"section",24)(1,"div",78)(2,"div",79)(3,"div",80),S(4,"i",81),m(),u(5,"div",82)(6,"h3"),d(7,"Best Practices"),m(),u(8,"p"),d(9,"Industry-recommended approaches"),m()()(),u(10,"div",83)(11,"ul",84),k(12,fa,6,2,"li",null,ee),m()(),u(14,"div",85)(15,"button",86),H("click",function(){C(e);let r=p();return w(r.showBestPracticesTips())}),S(16,"i",56),d(17," Learn More "),m()()()()}if(t&2){let e=p();i(12),E(e.bestPractices())}}function ba(t,o){if(t&1&&(u(0,"li")(1,"span",87),d(2),m(),S(3,"i",95),u(4,"span",89),d(5),m()()),t&2){let e=o.$implicit,n=o.$index;i(2),y(n+1),i(3),y(e)}}function ya(t,o){if(t&1){let e=O();u(0,"section",25)(1,"div",90)(2,"div",79)(3,"div",91),S(4,"i",92),m(),u(5,"div",82)(6,"h3"),d(7,"Key Takeaways"),m(),u(8,"p"),d(9,"Essential points to remember"),m()()(),u(10,"div",83)(11,"ul",84),k(12,ba,6,2,"li",null,ee),m()(),u(14,"div",85)(15,"button",93),H("click",function(){C(e);let r=p();return w(r.downloadKeyPoints())}),S(16,"i",94),d(17," Download Summary "),m()()()()}if(t&2){let e=p();i(12),E(e.keyPoints())}}var kt=(()=>{class t{constructor(){this.trackBySectionIndex=e=>e,this.title=Y(""),this.tags=Y([]),this.paragraphs=Y([]),this.sections=Y([]),this.codeExamples=Y([]),this.bestPractices=Y([]),this.keyPoints=Y([]),this.targetElement=te("scrollTopRef"),this.toastService=M(ne),this.expandedCodeIndex=b(null),this.copiedCodeIndex=b(null),this.scrolled=b(!1),this.currentSectionIndex=b(0),ce(()=>{this.title()&&this.scrollToSection()})}onWindowScroll(){let e=window.scrollY||document.documentElement.scrollTop;this.scrolled.set(e>300);let n=this.sections();if(n.length>0){let r=0,a=0;n.forEach((c,v)=>{let _=document.getElementById(this.getSectionId(c,v));if(_){let F=_.getBoundingClientRect(),T=Math.min(F.bottom,window.innerHeight)-Math.max(F.top,0);T>a&&T>0&&(a=T,r=v)}}),this.currentSectionIndex.set(r)}}scrollToSection(){let e=this.targetElement()?.nativeElement;e&&(e.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}),e.classList.add("highlight-section"),setTimeout(()=>{e.classList.remove("highlight-section")},2e3))}scrollToTag(e){let n=this.getTagLink(e);if(n){let r=document.getElementById(n);r&&(r.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}),r.classList.add("section-highlight"),setTimeout(()=>{r.classList.remove("section-highlight")},2e3))}}getSectionId(e,n){return e.id||`section-${this.sanitizeId(e?.heading)}-${n}`}sanitizeId(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}getTagLink(e){let n=e.toLowerCase(),r=this.sections().find(a=>a?.heading?.toLowerCase()?.includes(n));if(r){let a=this.sections().indexOf(r);return this.getSectionId(r,a)}return null}copyCode(e,n){navigator.clipboard.writeText(e).then(()=>{this.copiedCodeIndex.set(n),this.toastService.success("Code copied to clipboard!"),setTimeout(()=>{this.copiedCodeIndex.set(null)},2e3)}).catch(r=>{console.error("Failed to copy code: ",r),this.toastService.error("Failed to copy code")})}isCopied(e){return this.copiedCodeIndex()===e}isExpanded(e){return this.expandedCodeIndex()===e}toggleCodeExpansion(e){this.expandedCodeIndex.set(this.expandedCodeIndex()===e?null:e)}calculateReadTime(){let n=[...this.paragraphs(),...this.sections().map(a=>a.content||""),...this.sections().flatMap(a=>a.list||[]),...this.bestPractices(),...this.keyPoints()].join(" ").length/5,r=Math.ceil(n/200);return Math.max(1,r)}countCodeLines(e){return e.split(`
`).length}calculateProgress(){let e=this.sections().length;if(e===0)return 0;let n=this.currentSectionIndex();return Math.round((n+1)/e*100)}getCurrentSection(){return this.currentSectionIndex()+1}getTotalSections(){return this.sections().length}hasPreviousSection(){return this.currentSectionIndex()>0}hasNextSection(){return this.currentSectionIndex()<this.sections().length-1}navigateToPrevious(){if(this.hasPreviousSection()){let e=this.currentSectionIndex()-1,n=this.sections()[e],r=document.getElementById(this.getSectionId(n,e));r&&r.scrollIntoView({behavior:"smooth",block:"start"})}}navigateToNext(){if(this.hasNextSection()){let e=this.currentSectionIndex()+1,n=this.sections()[e],r=document.getElementById(this.getSectionId(n,e));r&&r.scrollIntoView({behavior:"smooth",block:"start"})}}isSectionHighlighted(e){let n=e.toLowerCase();return this.tags().some(r=>r.toLowerCase()===n)}executeCode(e){this.toastService.info(`Running "${e.title}"...`)}showBestPracticesTips(){this.toastService.info("Opening best practices guide...")}downloadKeyPoints(){let e=this.keyPoints().map((c,v)=>`${v+1}. ${c}`).join(`

`),n=new Blob([e],{type:"text/plain"}),r=window.URL.createObjectURL(n),a=document.createElement("a");a.href=r,a.download="key-points-summary.txt",a.click(),window.URL.revokeObjectURL(r)}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=L({type:t,selectors:[["app-topic-template"]],viewQuery:function(n,r){n&1&&ue(r.targetElement,Zi,5),n&2&&me()},hostBindings:function(n,r){n&1&&x("scroll",function(){return r.onWindowScroll()},xe)},inputs:{title:[1,"title"],tags:[1,"tags"],paragraphs:[1,"paragraphs"],sections:[1,"sections"],codeExamples:[1,"codeExamples"],bestPractices:[1,"bestPractices"],keyPoints:[1,"keyPoints"]},ngContentSelectors:ea,decls:42,vars:12,consts:[["scrollTopRef",""],[1,"topic-container"],[1,"progress-bar-container"],[1,"topic-header"],[1,"header-content"],[1,"title-wrapper"],[1,"topic-title"],[1,"title-underline"],["aria-label","Topic tags",1,"tags-navigation"],[1,"topic-meta"],[1,"meta-item"],[1,"meta-icon-wrapper"],[1,"bi","bi-clock"],[1,"meta-info"],[1,"meta-label"],[1,"meta-value"],[1,"meta-divider"],[1,"bi","bi-layers"],[1,"introduction-section"],[1,"section-badge"],[1,"bi","bi-journal-text"],[1,"intro-content"],[1,"detailed-sections"],[1,"code-examples-section"],[1,"best-practices-section"],[1,"key-points-section"],["title","Back to top",1,"back-to-top",3,"click"],[1,"bi","bi-arrow-up"],[1,"progress-bar"],[1,"progress-fill"],[1,"progress-text"],[1,"topic-tag",3,"clickable"],[1,"topic-tag",3,"click"],[1,"bi","bi-tag-fill"],[1,"bi","bi-code-square"],[1,"section-header-main"],[1,"section-header-icon"],[1,"bi","bi-collection"],[1,"section-header-content"],[1,"sections-timeline"],[1,"timeline-item",3,"id","section-highlight"],[1,"timeline-item",3,"id"],[1,"timeline-marker"],[1,"marker-number"],[1,"timeline-content"],[1,"section-card"],[1,"card-header"],[1,"card-title"],[1,"card-badge"],[1,"card-body"],[1,"section-content"],[1,"feature-list"],[1,"info-note"],[1,"bi","bi-check-circle-fill"],[3,"innerHTML"],[1,"note-icon"],[1,"bi","bi-lightbulb"],[1,"note-content"],[1,"section-header-icon","code-icon"],[1,"code-examples-list"],[1,"code-example-item"],[1,"code-example-header"],[1,"code-title-group"],[1,"code-number"],[1,"code-title"],[1,"code-description"],[1,"code-actions"],["title","Copy code",1,"action-btn",3,"click"],[1,"bi"],["title","Expand code",1,"action-btn",3,"click"],[1,"code-meta-bar"],[1,"code-meta-left"],[1,"lang-badge"],[1,"bi","bi-file-code"],[1,"lines-badge"],[1,"bi","bi-list-ol"],[1,"code-wrapper"],[1,"code-block"],[1,"insight-card","success-card"],[1,"insight-header"],[1,"insight-icon"],[1,"bi","bi-patch-check-fill"],[1,"insight-title-group"],[1,"insight-body"],[1,"insight-list"],[1,"insight-footer"],[1,"insight-btn","primary",3,"click"],[1,"insight-number"],[1,"bi","bi-check-circle-fill","insight-check"],[1,"insight-text"],[1,"insight-card","accent-card"],[1,"insight-icon","accent"],[1,"bi","bi-lightbulb-fill"],[1,"insight-btn","secondary",3,"click"],[1,"bi","bi-download"],[1,"bi","bi-star-fill","insight-star"]],template:function(n,r){n&1&&(Qt(),u(0,"div",1,0),h(2,ra,5,4,"div",2),u(3,"header",3)(4,"div",4)(5,"div",5)(6,"h1",6),d(7),m(),S(8,"div",7),m(),h(9,ia,3,0,"nav",8),u(10,"div",9)(11,"span",10)(12,"div",11),S(13,"i",12),m(),u(14,"div",13)(15,"span",14),d(16,"Read time"),m(),u(17,"span",15),d(18),m()()(),S(19,"span",16),u(20,"span",10)(21,"div",11),S(22,"i",17),m(),u(23,"div",13)(24,"span",14),d(25,"Sections"),m(),u(26,"span",15),d(27),m()()(),h(28,aa,9,1),m()()(),u(29,"section",18)(30,"div",19),S(31,"i",20),u(32,"span"),d(33,"Introduction"),m()(),u(34,"div",21),Zt(35),m()(),h(36,ua,12,1,"section",22),h(37,ha,12,1,"section",23),h(38,va,18,0,"section",24),h(39,ya,18,0,"section",25),m(),u(40,"button",26),H("click",function(){return r.scrollToSection()}),S(41,"i",27),m()),n&2&&(i(2),f(r.sections().length>0?2:-1),i(5),y(r.title()),i(2),f(r.tags()&&r.tags().length>0?9:-1),i(9),R("",r.calculateReadTime()," min"),i(9),y(r.sections().length),i(),f(r.codeExamples().length>0?28:-1),i(8),f(r.sections()&&r.sections().length>0?36:-1),i(),f(r.codeExamples()&&r.codeExamples().length>0?37:-1),i(),f(r.bestPractices()&&r.bestPractices().length>0?38:-1),i(),f(r.keyPoints()&&r.keyPoints().length>0?39:-1),i(),P("visible",r.scrolled()))},dependencies:[z],styles:['.topic-container[_ngcontent-%COMP%]{position:relative;max-width:1000px;margin:0 auto;padding:var(--spacing-xl, 2rem);background:var(--bg-gradient);min-height:100vh}.progress-bar-container[_ngcontent-%COMP%]{position:sticky;top:0;z-index:100;background:var(--glass-bg);-webkit-backdrop-filter:blur(var(--glass-blur));backdrop-filter:blur(var(--glass-blur));border:1px solid var(--glass-border);border-radius:var(--radius-lg, 1rem);padding:var(--spacing-sm, .75rem) var(--spacing-md, 1rem);margin-bottom:var(--spacing-xl, 2rem);display:flex;align-items:center;gap:var(--spacing-md, 1rem);box-shadow:var(--shadow-md)}.progress-bar[_ngcontent-%COMP%]{flex:1;height:6px;background:var(--glass-bg-deep);border-radius:3px;overflow:hidden}.progress-fill[_ngcontent-%COMP%]{height:100%;background:var(--accent-gradient);border-radius:3px;transition:width .3s ease;box-shadow:0 0 8px var(--accent-primary)}.progress-text[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);font-weight:600;color:var(--text-secondary);min-width:50px;text-align:right}.topic-header[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xxl, 3rem);padding-bottom:var(--spacing-xl, 2rem);border-bottom:1px solid var(--glass-border)}.title-wrapper[_ngcontent-%COMP%]{position:relative;margin-bottom:var(--spacing-lg, 1.5rem)}.topic-title[_ngcontent-%COMP%]{font-size:clamp(2rem,5vw,3rem);font-weight:800;margin:0;line-height:1.2;color:var(--text-primary);letter-spacing:-.02em}.title-underline[_ngcontent-%COMP%]{width:100px;height:4px;background:var(--accent-gradient);border-radius:2px;margin-top:var(--spacing-sm, .5rem);box-shadow:0 2px 8px var(--accent-primary)}.tags-navigation[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm, .5rem);margin-bottom:var(--spacing-lg, 1.5rem)}.topic-tag[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:var(--spacing-xs, .25rem);padding:var(--spacing-xs, .25rem) var(--spacing-md, 1rem);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:9999px;font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);transition:all .2s ease;cursor:default}.topic-tag[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:.75rem;color:var(--accent-primary)}.topic-tag.clickable[_ngcontent-%COMP%]{cursor:pointer}.topic-tag.clickable[_ngcontent-%COMP%]:hover{background:var(--accent-gradient);border-color:transparent;color:var(--text-on-accent);transform:translateY(-2px);box-shadow:var(--shadow-glow)}.topic-tag.clickable[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%]{color:var(--text-on-accent)}.topic-meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-md, 1rem);flex-wrap:wrap}.meta-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-sm, .5rem)}.meta-icon-wrapper[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:var(--radius-md, .75rem);background:var(--glass-bg);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center}.meta-icon-wrapper[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.125rem;color:var(--accent-primary)}.meta-info[_ngcontent-%COMP%]{display:flex;flex-direction:column}.meta-label[_ngcontent-%COMP%]{font-size:var(--font-size-xs, .75rem);color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em}.meta-value[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);font-weight:600;color:var(--text-primary)}.meta-divider[_ngcontent-%COMP%]{width:1px;height:40px;background:var(--glass-border)}.section-header-main[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-md, 1rem);margin-bottom:var(--spacing-xl, 2rem)}.section-header-icon[_ngcontent-%COMP%]{width:48px;height:48px;border-radius:var(--radius-lg, 1rem);background:var(--accent-gradient);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-glow)}.section-header-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem;color:var(--text-on-accent)}.section-header-icon.code-icon[_ngcontent-%COMP%]{background:linear-gradient(135deg,#f59e0b,#ef4444)}.section-header-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:var(--font-size-xl, 1.5rem);font-weight:700;color:var(--text-primary);margin:0 0 var(--spacing-xs, .25rem)}.section-header-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);margin:0}.section-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:var(--spacing-sm, .5rem);padding:var(--spacing-xs, .25rem) var(--spacing-md, 1rem);background:var(--accent-gradient);border-radius:9999px;font-size:var(--font-size-sm, .875rem);font-weight:600;color:var(--text-on-accent);margin-bottom:var(--spacing-lg, 1.5rem)}.section-badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1rem}.introduction-section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xxl, 3rem);padding:var(--spacing-xl, 2rem);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-xl, 1.5rem);-webkit-backdrop-filter:blur(var(--glass-blur));backdrop-filter:blur(var(--glass-blur))}.intro-content[_ngcontent-%COMP%]     p{font-size:var(--font-size-md, 1rem);line-height:1.8;color:var(--text-secondary);margin-bottom:var(--spacing-md, 1rem)}.intro-content[_ngcontent-%COMP%]     p:last-child{margin-bottom:0}.intro-content[_ngcontent-%COMP%]     h3{font-size:var(--font-size-lg, 1.125rem);font-weight:600;color:var(--text-primary);margin:var(--spacing-lg, 1.5rem) 0 var(--spacing-sm, .5rem)}.detailed-sections[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xxl, 3rem)}.sections-timeline[_ngcontent-%COMP%]{position:relative;padding-left:60px}.sections-timeline[_ngcontent-%COMP%]:before{content:"";position:absolute;left:20px;top:0;bottom:0;width:2px;background:var(--glass-border)}.timeline-item[_ngcontent-%COMP%]{position:relative;margin-bottom:var(--spacing-xl, 2rem)}.timeline-item[_ngcontent-%COMP%]:last-child{margin-bottom:0}.timeline-item.section-highlight[_ngcontent-%COMP%]   .timeline-marker[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse 1s ease-in-out}.timeline-marker[_ngcontent-%COMP%]{position:absolute;left:-50px;top:0;width:40px;height:40px;border-radius:50%;background:var(--glass-bg);border:2px solid var(--accent-primary);display:flex;align-items:center;justify-content:center;z-index:1}.timeline-marker[_ngcontent-%COMP%]   .marker-number[_ngcontent-%COMP%]{font-weight:700;font-size:var(--font-size-md, 1rem);color:var(--accent-primary)}.timeline-content[_ngcontent-%COMP%]{flex:1}.section-card[_ngcontent-%COMP%]{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-lg, 1rem);overflow:hidden;transition:all .3s ease}.section-card[_ngcontent-%COMP%]:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--accent-primary)}.card-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);background:var(--glass-bg-deep);border-bottom:1px solid var(--glass-border)}.card-title[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);font-weight:600;color:var(--text-primary);margin:0}.card-badge[_ngcontent-%COMP%]{padding:var(--spacing-xs, .25rem) var(--spacing-sm, .5rem);background:var(--accent-primary);color:var(--text-on-accent);border-radius:var(--radius-sm, .5rem);font-size:var(--font-size-xs, .75rem);font-weight:600}.card-body[_ngcontent-%COMP%]{padding:var(--spacing-lg, 1.5rem)}.section-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);line-height:1.7;color:var(--text-secondary);margin:0 0 var(--spacing-md, 1rem)}.section-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child{margin-bottom:0}.feature-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:var(--spacing-md, 1rem) 0 0}.feature-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:var(--spacing-sm, .5rem);padding:var(--spacing-sm, .5rem) 0;border-bottom:1px solid var(--glass-border)}.feature-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border-bottom:none}.feature-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--success-color, #22c55e);font-size:1rem;margin-top:3px}.feature-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);line-height:1.6}.info-note[_ngcontent-%COMP%]{display:flex;gap:var(--spacing-md, 1rem);padding:var(--spacing-md, 1rem);background:var(--glass-bg-deep);border:1px solid var(--glass-border);border-radius:var(--radius-md, .75rem);margin-top:var(--spacing-md, 1rem)}.note-icon[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;background:var(--accent-gradient);display:flex;align-items:center;justify-content:center;flex-shrink:0}.note-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--text-on-accent);font-size:1.125rem}.note-content[_ngcontent-%COMP%]{flex:1}.note-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:var(--font-size-sm, .875rem);color:var(--text-primary);margin-bottom:var(--spacing-xs, .25rem)}.note-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);line-height:1.6;margin:0}.code-examples-section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xxl, 3rem)}.code-examples-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-lg, 1.5rem)}.code-example-item[_ngcontent-%COMP%]{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-lg, 1rem);overflow:hidden;transition:all .3s ease}.code-example-item[_ngcontent-%COMP%]:hover{box-shadow:var(--shadow-lg);border-color:var(--accent-primary)}.code-example-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);background:var(--glass-bg-deep);border-bottom:1px solid var(--glass-border)}.code-title-group[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-md, 1rem)}.code-number[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:50%;background:var(--accent-gradient);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:var(--font-size-sm, .875rem);color:var(--text-on-accent)}.code-title[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);font-weight:600;color:var(--text-primary);margin:0 0 var(--spacing-xs, .25rem)}.code-description[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);margin:0}.code-actions[_ngcontent-%COMP%]{display:flex;gap:var(--spacing-xs, .25rem)}.action-btn[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:var(--radius-md, .75rem);background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.action-btn[_ngcontent-%COMP%]:hover{background:var(--accent-primary);border-color:var(--accent-primary);color:var(--text-on-accent)}.action-btn.copied[_ngcontent-%COMP%]{background:var(--success-color, #22c55e);border-color:var(--success-color, #22c55e);color:#fff}.code-meta-bar[_ngcontent-%COMP%]{display:flex;align-items:center;padding:var(--spacing-sm, .5rem) var(--spacing-md, 1rem);background:var(--glass-bg-deep);border-bottom:1px solid var(--glass-border)}.code-meta-left[_ngcontent-%COMP%]{display:flex;gap:var(--spacing-sm, .5rem)}.lang-badge[_ngcontent-%COMP%], .lines-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:var(--spacing-xs, .25rem);padding:var(--spacing-xs, .25rem) var(--spacing-sm, .5rem);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-sm, .5rem);font-size:var(--font-size-xs, .75rem);color:var(--text-secondary)}.lang-badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .lines-badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:.75rem}.code-wrapper[_ngcontent-%COMP%]{max-height:300px;overflow:hidden;transition:max-height .3s ease}.code-wrapper.expanded[_ngcontent-%COMP%]{max-height:800px}.code-block[_ngcontent-%COMP%]{margin:0;padding:var(--spacing-md, 1rem);background:#1e1e1e;color:#d4d4d4;font-family:JetBrains Mono,Fira Code,Consolas,monospace;font-size:var(--font-size-sm, .875rem);line-height:1.6;overflow-x:auto}.code-block[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:inherit}.best-practices-section[_ngcontent-%COMP%], .key-points-section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xxl, 3rem)}.insight-card[_ngcontent-%COMP%]{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-xl, 1.5rem);overflow:hidden;transition:all .3s ease}.insight-card[_ngcontent-%COMP%]:hover{box-shadow:var(--shadow-lg);transform:translateY(-4px)}.insight-card.success-card[_ngcontent-%COMP%]{border-color:#22c55e4d}.insight-card.success-card[_ngcontent-%COMP%]   .insight-icon[_ngcontent-%COMP%]{background:linear-gradient(135deg,#22c55e,#16a34a)}.insight-card.success-card[_ngcontent-%COMP%]   .insight-check[_ngcontent-%COMP%]{color:#22c55e}.insight-card.accent-card[_ngcontent-%COMP%]{border-color:rgba(var(--accent-primary-rgb, 99, 102, 241),.3)}.insight-card.accent-card[_ngcontent-%COMP%]   .insight-icon.accent[_ngcontent-%COMP%]{background:var(--accent-gradient)}.insight-card.accent-card[_ngcontent-%COMP%]   .insight-star[_ngcontent-%COMP%]{color:#f59e0b}.insight-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-md, 1rem);padding:var(--spacing-lg, 1.5rem);background:var(--glass-bg-deep);border-bottom:1px solid var(--glass-border)}.insight-icon[_ngcontent-%COMP%]{width:56px;height:56px;border-radius:var(--radius-lg, 1rem);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-md)}.insight-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.75rem;color:#fff}.insight-title-group[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:var(--font-size-lg, 1.125rem);font-weight:700;color:var(--text-primary);margin:0 0 var(--spacing-xs, .25rem)}.insight-title-group[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);margin:0}.insight-body[_ngcontent-%COMP%]{padding:var(--spacing-lg, 1.5rem)}.insight-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.insight-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-sm, .5rem);padding:var(--spacing-sm, .5rem) 0;border-bottom:1px solid var(--glass-border)}.insight-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border-bottom:none}.insight-number[_ngcontent-%COMP%]{width:28px;height:28px;border-radius:50%;background:var(--glass-bg-deep);display:flex;align-items:center;justify-content:center;font-size:var(--font-size-xs, .75rem);font-weight:700;color:var(--text-secondary)}.insight-check[_ngcontent-%COMP%], .insight-star[_ngcontent-%COMP%]{font-size:1rem}.insight-text[_ngcontent-%COMP%]{flex:1;font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);line-height:1.5}.insight-footer[_ngcontent-%COMP%]{padding:var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);background:var(--glass-bg-deep);border-top:1px solid var(--glass-border);display:flex;justify-content:center}.insight-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:var(--spacing-sm, .5rem);padding:var(--spacing-sm, .5rem) var(--spacing-lg, 1.5rem);border-radius:var(--radius-md, .75rem);font-size:var(--font-size-sm, .875rem);font-weight:600;cursor:pointer;transition:all .2s ease;border:none}.insight-btn.primary[_ngcontent-%COMP%]{background:var(--accent-gradient);color:var(--text-on-accent)}.insight-btn.primary[_ngcontent-%COMP%]:hover{box-shadow:var(--shadow-glow);transform:translateY(-2px)}.insight-btn.secondary[_ngcontent-%COMP%]{background:var(--glass-bg);border:1px solid var(--glass-border);color:var(--text-primary)}.insight-btn.secondary[_ngcontent-%COMP%]:hover{background:var(--accent-primary);border-color:var(--accent-primary);color:var(--text-on-accent)}.insight-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1rem}.back-to-top[_ngcontent-%COMP%]{position:fixed;bottom:var(--spacing-xxl, 6rem);right:var(--spacing-xl, 5rem);width:56px;height:56px;border-radius:50%;background:var(--accent-gradient);border:none;color:var(--text-on-accent);cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transform:translateY(20px);transition:all .3s ease;box-shadow:var(--shadow-glow);z-index:1000}.back-to-top.visible[_ngcontent-%COMP%]{opacity:1;visibility:visible;transform:translateY(0)}.back-to-top[_ngcontent-%COMP%]:hover{transform:translateY(-4px) scale(1.1);box-shadow:0 12px 32px var(--accent-primary)}.back-to-top[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem}@keyframes _ngcontent-%COMP%_pulse{0%,to{transform:scale(1);box-shadow:0 0 rgba(var(--accent-primary-rgb, 99, 102, 241),.4)}50%{transform:scale(1.05);box-shadow:0 0 0 10px rgba(var(--accent-primary-rgb, 99, 102, 241),0)}}@media(max-width:768px){.topic-container[_ngcontent-%COMP%]{padding:var(--spacing-md, 1rem)}.sections-timeline[_ngcontent-%COMP%]{padding-left:40px}.sections-timeline[_ngcontent-%COMP%]:before{left:15px}.timeline-marker[_ngcontent-%COMP%]{left:-35px;width:32px;height:32px}.timeline-marker[_ngcontent-%COMP%]   .marker-number[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem)}.topic-meta[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.meta-divider[_ngcontent-%COMP%]{display:none}.back-to-top[_ngcontent-%COMP%]{bottom:var(--spacing-lg, 1.5rem);right:var(--spacing-lg, 1.5rem);width:48px;height:48px}.back-to-top[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem}}'],changeDetection:0})}}return t})();var Et=()=>[];function xa(t,o){if(t&1&&(s(0,"p"),d(1),l()),t&2){let e=o.$implicit;i(),y(e)}}function Ca(t,o){if(t&1&&g(0,"li",1),t&2){let e=o.$implicit;I("innerHTML",e,de)}}function wa(t,o){if(t&1&&(s(0,"ul"),k(1,Ca,1,1,"li",1,Z),l()),t&2){let e=p().$implicit;i(),E(e.list)}}function _a(t,o){if(t&1&&(s(0,"h3"),d(1),l(),s(2,"p"),d(3),l(),h(4,wa,3,0,"ul")),t&2){let e=o.$implicit;i(),y(e.heading),i(2),y(e.content),i(),f(e.list?4:-1)}}function Sa(t,o){if(t&1&&k(0,_a,5,3,null,null,Z),t&2){let e=p();E(e.content.sections)}}var zi=(()=>{class t{constructor(e){this.route=e,this.content={title:"",tags:[],paragraphs:[]},this.topicData=ut}ngOnInit(){let e=this.route.snapshot.url.map(r=>r.path).join("/"),n="/"+e;if(this.topicData[n])this.content=this.topicData[n];else{let r=e.split("/").pop()?.split("-").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ")||"Topic";this.content=mt(r)}}static{this.\u0275fac=function(n){return new(n||t)(B(bn))}}static{this.\u0275cmp=L({type:t,selectors:[["app-generic-topic"]],decls:4,vars:8,consts:[[3,"title","tags","codeExamples","keyPoints"],[3,"innerHTML"]],template:function(n,r){n&1&&(s(0,"app-topic-template",0),k(1,xa,2,1,"p",null,Z),h(3,Sa,2,0),l()),n&2&&(I("title",r.content.title||"")("tags",r.content.tags||ge(5,Et))("codeExamples",r.content.codeExamples||ge(6,Et))("keyPoints",r.content.keyPoints||ge(7,Et)),i(),E(r.content.paragraphs),i(2),f(r.content.sections?3:-1))},dependencies:[z,kt],encapsulation:2})}}return t})();export{W as a,Se as b,gt as c,ne as d,Jn as e,Kn as f,Qi as g,Pr as h,Tr as i,kt as j,zi as k,kr as l,ze as m,Nn as n,Pt as o,Hn as p,oo as q,io as r,ao as s,so as t,uo as u,ho as v,fo as w,vo as x,bo as y,yo as z,xo as A,Co as B,wo as C,_o as D,So as E,Mo as F,Po as G,To as H,Ao as I,Do as J,Ro as K,Fo as L,Vo as M,Uo as N,No as O,jo as P,Lo as Q,Ho as R,zo as S,qo as T,Xi as U};
