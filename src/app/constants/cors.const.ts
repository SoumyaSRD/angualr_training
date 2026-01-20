export const Cors = {
    title: 'CORS (Cross-Origin Resource Sharing)',
    tags: ['Security', 'Web Fundamentals', 'HTTP', 'Browser', 'API'],
    paragraphs: [
        'CORS (Cross-Origin Resource Sharing) is a critical browser security mechanism that controls how web pages loaded from one origin can request resources from a different origin. It builds on the Same-Origin Policy (SOP), a foundational security rule that restricts JavaScript from making requests to domains other than the one that served the page, preventing malicious sites from stealing data or performing unauthorized actions.',
        'Without CORS, modern web applications would be severely limited—frontend apps on one domain couldn\'t safely call APIs on another domain. CORS provides a controlled way for servers to explicitly allow cross-origin requests by sending specific HTTP headers. This enables secure separation of frontend and backend (e.g., React app on Vercel calling Node.js API on AWS) while maintaining strong security boundaries.',
        'CORS is enforced only by browsers for security reasons. Non-browser clients (Postman, curl, mobile native apps) ignore CORS entirely. Misconfigured CORS is one of the most common sources of frustration in web development, often resulting in cryptic "CORS policy" errors in the console.'
    ],
    sections: [
        {
            heading: 'What is an Origin?',
            content: 'An origin is defined by the combination of protocol (scheme), host (domain), and port. Two URLs are same-origin only if all three match exactly:',
            list: [
                '<strong>Same origin examples:</strong> https://example.com/app and https://example.com/api',
                '<strong>Different origin examples:</strong>',
                'http://example.com vs https://example.com (different protocol)',
                'https://example.com vs https://api.example.com (different subdomain)',
                'https://example.com:80 vs https://example.com:443 (different port)',
                'https://example.com vs https://www.example.com (different subdomain)'
            ],
            additionalExplanation: 'Even a single difference makes the request cross-origin and subject to CORS restrictions.'
        },
        {
            heading: 'Simple Requests vs Preflight Requests',
            content: 'Browsers categorize cross-origin requests into two types:',
            list: [
                '<strong>Simple Requests:</strong> Allowed without preflight if they meet strict criteria:',
                '- Method: GET, HEAD, or POST',
                '- Headers: Only Accept, Accept-Language, Content-Language, Content-Type (limited values: application/x-www-form-urlencoded, multipart/form-data, text/plain)',
                '- No credentials (cookies) unless explicitly allowed',
                '<strong>Preflight Requests:</strong> For any "non-simple" request, the browser first sends an OPTIONS request to check permissions:',
                '- Uses methods like PUT, DELETE, PATCH',
                '- Custom headers (e.g., Authorization, X-API-Key)',
                '- Content-Type like application/json',
                '- With credentials (cookies, HTTP auth)'
            ],
            additionalExplanation: 'Preflight adds latency (extra round-trip), so design APIs to allow simple requests when possible.'
        },
        {
            heading: 'Key CORS Response Headers',
            content: 'Servers use these headers to declare what cross-origin requests are permitted:',
            list: [
                '<strong>Access-Control-Allow-Origin:</strong> Specifies allowed origins. Use specific domain (e.g., https://myapp.com) or "*" (wildcard, but cannot be used with credentials)',
                '<strong>Access-Control-Allow-Methods:</strong> Lists permitted HTTP methods (e.g., GET, POST, PUT, DELETE, OPTIONS)',
                '<strong>Access-Control-Allow-Headers:</strong> Lists allowed request headers (e.g., Content-Type, Authorization, X-Requested-With)',
                '<strong>Access-Control-Allow-Credentials:</strong> Set to "true" to allow cookies/auth credentials. Requires exact origin (no "*")',
                '<strong>Access-Control-Expose-Headers:</strong> Allows clients to read specific response headers (by default, only basic ones are exposed)',
                '<strong>Access-Control-Max-Age:</strong> How long (in seconds) preflight response can be cached (e.g., 86400 = 24 hours)'
            ]
        },
        {
            heading: 'Common CORS Scenarios',
            content: 'Real-world patterns and pitfalls:',
            list: [
                '<strong>Public API:</strong> Allow all origins with Access-Control-Allow-Origin: *',
                '<strong>Authenticated API:</strong> Require exact origin + credentials: true',
                '<strong>Development vs Production:</strong> Often more permissive in dev, stricter in prod',
                '<strong>Third-party integrations:</strong> Whitelist specific partner domains',
                '<strong>Proxies:</strong> Some developers use reverse proxies (e.g., Nginx) or CORS proxy services to bypass CORS (not recommended for production)'
            ]
        }
    ],
    codeExamples: [
        {
            title: 'CORS Response Headers Example',
            language: 'http',
            code: `# Successful response with CORS headers
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: https://myfrontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 3600

{"data": "Hello from API!"}`
        },
        {
            title: 'Preflight Request and Response',
            language: 'http',
            code: `# Browser sends preflight (OPTIONS)
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
Access-Control-Max-Age: 86400`
        },
        {
            title: 'Express.js CORS Middleware Configuration',
            language: 'javascript',
            code: `const express = require('express');
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
});`
        },
        {
            title: 'Frontend Fetch with Credentials',
            language: 'javascript',
            code: `// Must include credentials: 'include' to send cookies
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
.catch(err => console.error('CORS or auth error:', err));`
        },
        {
            title: 'Common CORS Error in Browser Console',
            language: 'text',
            code: `Access to fetch at 'https://api.example.com/data' from origin 'https://myapp.com' has been blocked by CORS policy: 

- No 'Access-Control-Allow-Origin' header is present on the requested resource.
- Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header.
- The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.`
        }
    ],
    keyPoints: [
        'CORS is a browser-enforced security feature to protect users from cross-site request forgery and data theft',
        'Same-Origin Policy is the default restriction; CORS is the opt-in relaxation',
        'Only servers control CORS via response headers—clients cannot bypass it',
        'Simple requests (GET/POST with basic headers) skip preflight; others require OPTIONS check',
        'Never use Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true in production',
        'Preflight caching (Max-Age) improves performance for complex requests',
        'CORS errors appear in browser dev tools—always check Network tab for missing headers',
        'Use middleware/libraries (cors package, Spring Security, etc.) for easy configuration'
    ],
    bestPractices: [
        'Always specify exact origins in production—avoid wildcard "*" unless truly public API',
        'Enable credentials only when necessary (for cookie-based auth)',
        'List only required methods and headers to minimize attack surface',
        'Set reasonable Access-Control-Max-Age (e.g., 86400 seconds) to reduce preflight overhead',
        'Handle OPTIONS requests properly (return 204 No Content for preflight)',
        'Use environment-specific configs (permissive in dev, strict in prod)',
        'Log and monitor CORS-related errors in production',
        'For SPAs, consider using a proxy during development (e.g., Vite/React proxy)'
    ]
};