export const WebFundamental = {
    title: 'JSON (JavaScript Object Notation)',
    tags: ['Data Format', 'Web Fundamentals', 'API', 'Serialization'],
    paragraphs: [
        'JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. Introduced by Douglas Crockford in the early 2000s, it quickly became the standard for data exchange on the web, largely replacing XML due to its simplicity and smaller payload size.',
        'Although derived from JavaScript object literal syntax, JSON is completely language-independent. Libraries exist for virtually every programming language, making it ideal for communication between heterogeneous systems—browsers, servers, mobile apps, IoT devices, and more.',
        'JSON\'s minimal syntax and strict rules make it predictable and reliable. It is the dominant format for RESTful APIs, configuration files, NoSQL databases (e.g., MongoDB documents), and client-server communication in modern web applications.'
    ],
    sections: [
        {
            heading: 'JSON Syntax Rules',
            content: 'JSON has a very strict and minimal syntax. Violations result in parsing errors, which enforces data integrity.',
            list: [
                '<strong>Name/value pairs:</strong> Properties are written as "key": value (keys must be double-quoted strings)',
                '<strong>Commas:</strong> Separate items in objects and arrays (no trailing comma allowed)',
                '<strong>Curly braces { }:</strong> Hold objects (unordered key-value collections)',
                '<strong>Square brackets [ ]:</strong> Hold arrays (ordered lists of values)',
                '<strong>Double quotes:</strong> Required for all strings and property names',
                '<strong>No comments:</strong> JSON does not support comments (use a separate field if needed)',
                '<strong>No trailing commas:</strong> Invalid in standard JSON (though some parsers tolerate them)'
            ]
        },
        {
            heading: 'Supported Data Types',
            content: 'JSON supports only six primitive/value types. Complex structures are built by nesting objects and arrays.',
            list: [
                '<strong>String:</strong> Unicode text in double quotes, e.g., "Hello 🌍"',
                '<strong>Number:</strong> Integer or floating-point (no distinction), e.g., 42, -10, 3.14, 1e5 (no NaN or Infinity)',
                '<strong>Boolean:</strong> true or false (lowercase only)',
                '<strong>Null:</strong> null (represents empty/no value)',
                '<strong>Object:</strong> Unordered collection of key-value pairs enclosed in { }',
                '<strong>Array:</strong> Ordered list of values (any type, including mixed) enclosed in [ ]'
            ],
            additionalExplanation: 'No support for undefined, functions, dates (use ISO strings), or binary data (use Base64 encoding).'
        },
        {
            heading: 'JSON vs XML Comparison',
            content: 'JSON largely replaced XML for web APIs due to several advantages:',
            list: [
                '<strong>Conciseness:</strong> JSON is more compact (no closing tags)',
                '<strong>Readability:</strong> Easier for humans to read and write',
                '<strong>Parsing speed:</strong> Native support in JavaScript and faster parsers in most languages',
                '<strong>Less verbosity:</strong> No namespaces, schemas, or attributes required',
                '<strong>Drawbacks:</strong> No built-in schema validation (use JSON Schema separately), no comments'
            ]
        },
        {
            heading: 'Common Use Cases',
            content: 'JSON is ubiquitous in modern development:',
            list: [
                'API request/response payloads (REST/GraphQL)',
                'Configuration files (package.json, tsconfig.json)',
                'Data storage in NoSQL databases',
                'Client-server communication (fetch/AJAX)',
                'Logging and message queues (e.g., Kafka, RabbitMQ)',
                'Internationalization files'
            ]
        }
    ],
    codeExamples: [
        {
            title: 'Valid JSON Structure Example',
            language: 'json',
            code: `{
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
}`
        },
        {
            title: 'Working with JSON in TypeScript/JavaScript',
            language: 'typescript',
            code: `// Parsing JSON string to object
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

const typedUser: User = JSON.parse(jsonString);`
        },
        {
            title: 'Using JSON with Fetch API',
            language: 'typescript',
            code: `// Sending JSON in a POST request
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
  .catch(err => console.error(err));`
        },
        {
            title: 'Common JSON Parsing Errors',
            language: 'json',
            code: `// Invalid examples (will throw SyntaxError when parsed)

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
{ "status": undefined, "callback": function() {} }`
        }
    ],
    keyPoints: [
        'Lightweight, human-readable, and machine-parsable data format',
        'Strict syntax: double quotes, no trailing commas, no comments',
        'Only 6 data types: string, number, boolean, null, object, array',
        'Language-independent with native support in JavaScript',
        'De facto standard for web APIs and configuration',
        'Use JSON.parse() to convert string → object, JSON.stringify() to convert object → string',
        'Always set Content-Type: application/json for API responses',
        'Validate JSON using tools like JSON Schema for larger applications'
    ],
    bestPractices: [
        'Use double quotes consistently for keys and strings',
        'Pretty-print with indentation during development (JSON.stringify(obj, null, 2))',
        'Represent dates as ISO 8601 strings (e.g., "2026-01-19T18:22:00Z")',
        'Handle parsing errors gracefully with try/catch',
        'Validate incoming JSON payloads on the server',
        'Use JSON Schema for defining and validating complex structures',
        'Avoid deeply nested structures for better readability',
        'Encode binary data as Base64 strings when needed'
    ]
};