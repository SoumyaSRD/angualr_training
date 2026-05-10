export const RestApi = {
    title: 'REST APIs',
    tags: ['Web Fundamentals', 'APIs', 'HTTP'],
    paragraphs: [
        'REST (Representational State Transfer) is an architectural style for designing networked applications. Introduced by Roy Fielding in his 2000 doctoral dissertation, REST defines a set of constraints that, when applied to the design of web services, create scalable, maintainable, and performant APIs.',
        'RESTful APIs use standard HTTP methods to perform CRUD operations (Create, Read, Update, Delete) on resources identified by URLs. They emphasize stateless communication, resource-based URLs, cacheability, and a uniform interface. This makes them predictable, scalable, and easy to integrate across different platforms.',
        'RESTful APIs are the backbone of modern web and mobile applications. They provide a standardized, language-agnostic way for clients (browsers, mobile apps, IoT devices) to communicate with servers, enabling separation of frontend and backend concerns and facilitating third-party integrations.'
    ],
    sections: [
        {
            heading: 'Six Guiding Principles of REST',
            content: 'REST is defined by six architectural constraints (one optional). Adhering to these principles ensures the API is truly RESTful and gains the benefits of scalability, performance, and simplicity.',
            list: [
                '<strong>Client-Server:</strong> Separates concerns — the client handles the user interface and experience, while the server manages data storage, business logic, and persistence. This improves portability and allows independent evolution of both sides.',
                '<strong>Stateless:</strong> Each request from the client must contain all the information needed to process it. The server does not store client context between requests. This improves scalability (any server can handle any request) and reliability.',
                '<strong>Cacheable:</strong> Responses must explicitly indicate whether they can be cached and for how long (using headers like Cache-Control and ETag). Caching reduces server load and improves performance.',
                '<strong>Uniform Interface:</strong> The key constraint that simplifies architecture. It consists of four sub-constraints: resource identification via URIs, manipulation through representations, self-descriptive messages, and HATEOAS (Hypermedia as the Engine of Application State).',
                '<strong>Layered System:</strong> The architecture can be composed of layers (load balancers, proxies, gateways). Clients cannot tell whether they are connected directly to the end server or an intermediary, enabling scalability and shared caching.',
                '<strong>Code on Demand (Optional):</strong> Servers can optionally send executable code (e.g., JavaScript) to extend client functionality. This is rarely used in pure REST APIs today.'
            ]
        },
        {
            heading: 'Resource-Based URLs and HTTP Methods',
            content: 'In REST, resources (e.g., users, products, orders) are represented by nouns in URLs. Actions are expressed through standard HTTP methods rather than encoded in the URL. This creates clean, intuitive endpoints.',
            list: [
                '<strong>GET /users</strong> → Retrieve a collection of users (safe and idempotent)',
                '<strong>GET /users/123</strong> → Retrieve a specific user (safe and idempotent)',
                '<strong>POST /users</strong> → Create a new user (not idempotent)',
                '<strong>PUT /users/123</strong> → Replace the entire user resource (idempotent)',
                '<strong>PATCH /users/123</strong> → Partially update the user (not necessarily idempotent)',
                '<strong>DELETE /users/123</strong> → Delete the user (idempotent)',
                '<strong>Sub-resources:</strong> GET /users/123/orders → Get orders for a specific user'
            ],
            additionalExplanation: 'Idempotent methods (GET, PUT, DELETE, HEAD) can be called multiple times with the same effect as calling once. Safe methods (GET, HEAD) do not modify server state.'
        },
        {
            heading: 'Common HTTP Status Codes in REST',
            content: 'REST APIs use standard HTTP status codes to indicate the result of a request. This makes responses self-descriptive and reduces the need for custom error formats.',
            list: [
                '<strong>2xx Success:</strong> 200 OK (general success), 201 Created (resource created), 204 No Content (success, no body)',
                '<strong>3xx Redirection:</strong> 301 Moved Permanently, 304 Not Modified (for caching)',
                '<strong>4xx Client Errors:</strong> 400 Bad Request (malformed request), 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity (validation errors)',
                '<strong>5xx Server Errors:</strong> 500 Internal Server Error, 503 Service Unavailable'
            ]
        },
        {
            heading: 'HATEOAS (Hypermedia as the Engine of Application State)',
            content: 'A key part of the uniform interface constraint. Responses include links to related resources, allowing clients to discover available actions dynamically rather than hard-coding URLs.',
            example: 'Instead of the client knowing to go to "/reviews" next, the server includes links in the response, making the API more discoverable and evolvable.'
        }
    ],
    codeExamples: [
        {
            title: 'Common RESTful Endpoints for a Product Resource',
            language: 'text',
            code: `# Collection and Individual Resources
GET    /api/products              # List all products (with optional query params: ?category=electronics&page=2)
GET    /api/products/42           # Get product with id 42
POST   /api/products              # Create new product (body: JSON payload)
PUT    /api/products/42           # Replace entire product 42
PATCH  /api/products/42           # Partial update (e.g., only change price)
DELETE /api/products/42           # Delete product 42

# Nested/Sub-resources
GET    /api/products/42/reviews   # Get reviews for product 42
POST   /api/products/42/reviews   # Add a new review`
        },
        {
            title: 'Example JSON Response with HATEOAS Links',
            language: 'json',
            code: `{
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
}`
        },
        {
            title: 'Client-Side Fetch Example (JavaScript)',
            language: 'javascript',
            code: `// GET request
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
  .then(res => res.status === 201 ? res.json() : Promise.reject(res.status));`
        },
        {
            title: 'Error Response Example',
            language: 'json',
            code: `{
  "error": "Validation failed",
  "status": 422,
  "details": [
    { "field": "price", "message": "Price must be positive" },
    { "field": "name", "message": "Name is required" }
  ],
  "_links": {
    "documentation": { "href": "/docs/errors#validation" }
  }
}`
        }
    ],
    keyPoints: [
        'REST uses standard HTTP methods for CRUD operations (GET, POST, PUT/PATCH, DELETE)',
        'URLs represent resources (nouns), not actions (verbs)',
        'Stateless: No server-side session storage; each request is independent',
        'Leverages HTTP features: caching, status codes, content negotiation',
        'Responses often use JSON (though XML, YAML, etc. are possible)',
        'Highly scalable due to statelessness and cacheability',
        'Self-descriptive with proper use of status codes and HATEOAS links',
        'Versioning strategies: URL versioning (/v1/products), header-based, or media-type versioning'
    ],
    bestPractices: [
        'Use nouns for resources and plural forms (e.g., /users not /user)',
        'Support filtering, sorting, and pagination for collection endpoints',
        'Implement proper authentication (e.g., JWT, OAuth)',
        'Rate limiting and throttling to prevent abuse',
        'Consistent error format across the API',
        'Document with OpenAPI/Swagger for discoverability'
    ]
};