var e={title:"Browser Fundamentals and Rendering Process",tags:["Web Fundamentals","Browser","DOM","Rendering","Performance","JavaScript"],paragraphs:["Modern web browsers are sophisticated software engines responsible for fetching resources, parsing HTML/CSS/JavaScript, building internal representations, and rendering pixels on the screen. Understanding how browsers work is crucial for web developers, especially when building performant Angular applications that rely heavily on efficient DOM manipulation and change detection.","The browser's primary job is to transform HTML, CSS, and JavaScript into an interactive visual experience. This involves several steps known as the Critical Rendering Path (CRP): parsing HTML into DOM, parsing CSS into CSSOM, combining them into a Render Tree, performing Layout (reflow), and finally Painting the pixels. JavaScript can interrupt this process, making optimization essential for fast-loading pages.","Browsers use multi-process architectures (e.g., Chrome's site isolation) for security and stability. Each tab or site runs in separate processes. They also implement sophisticated optimizations like speculative parsing, preload scanners, and GPU acceleration. Knowledge of these internals helps developers avoid common performance pitfalls in single-page applications like Angular."],sections:[{heading:"Critical Rendering Path (CRP)",content:"The sequence of steps the browser takes to convert code into pixels:",list:["<strong>HTML Parsing \u2192 DOM Tree:</strong> Byte stream \u2192 tokens \u2192 nodes \u2192 DOM","<strong>CSS Parsing \u2192 CSSOM Tree:</strong> Stylesheets are parsed into a tree structure","<strong>Render Tree:</strong> Combination of DOM and CSSOM (only visible nodes)","<strong>Layout (Reflow):</strong> Calculate geometry (positions and sizes)","<strong>Paint:</strong> Rasterize elements into pixels (layers for compositing)","<strong>Composite:</strong> GPU combines layers for final display"],additionalExplanation:"Any change that affects geometry triggers reflow (expensive), while only visual changes trigger repaint."},{heading:"Parser Blocking vs Non-Blocking Resources",content:"How different resources affect parsing:",list:["<strong>HTML:</strong> Primary document\u2014parsing is sequential","<strong>CSS:</strong> Render-blocking by default (browser waits for CSSOM)","<strong>JavaScript:</strong> Parser-blocking by default (can modify DOM/CSSOM)","<strong>async/defer:</strong> Make scripts non-blocking","<strong>Images/Fonts:</strong> Non-blocking but can cause FOUC/FOUT"]},{heading:"Reflow and Repaint Triggers",content:"Operations that force the browser to recalculate layout or redraw:",list:["<strong>Reflow triggers:</strong> Geometry changes (width, height, margin, display, font-size)","<strong>Repaint triggers:</strong> Visual changes (color, background, visibility)","<strong>Composite-only:</strong> GPU-friendly (transform, opacity)","<strong>Forced reflow:</strong> Reading offsetWidth/Height after style change"]},{heading:"Browser Architecture",content:"Modern browsers use multi-process models:",list:["<strong>Main Process:</strong> Coordinates UI, network, storage","<strong>Renderer Processes:</strong> One per site/frame (for isolation)","<strong>GPU Process:</strong> Handles graphics acceleration","<strong>Network Process:</strong> Manages HTTP requests","<strong>Security benefits:</strong> Site isolation prevents cross-origin attacks"]},{heading:"Performance Implications for Angular",content:"Angular-specific considerations:",list:["<strong>Change Detection:</strong> Angular runs in zones\u2014understanding rendering helps optimize OnPush strategy","<strong>Virtual Scrolling:</strong> Reduces DOM nodes to prevent reflow costs","<strong>Lazy Loading:</strong> Delays resource fetching","<strong>AOT Compilation:</strong> Pre-compiles templates for faster initial render"]}],codeExamples:[{title:"Basic HTML Structure and Browser Parsing",language:"html",description:"Browser builds DOM tree sequentially, pausing for blocking resources",code:`<!DOCTYPE html>
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
</head>`}],keyPoints:["Critical Rendering Path: DOM \u2192 CSSOM \u2192 Render Tree \u2192 Layout \u2192 Paint \u2192 Composite","CSS is render-blocking; JavaScript is parser-blocking unless async/defer","Minimize reflows by batching DOM reads/writes and using composite properties","Use preload/prefetch for performance optimization","Modern browsers use multi-process architecture for security","requestAnimationFrame aligns with browser repaint cycle","Understanding rendering helps optimize Angular change detection and animations"],bestPractices:["Place CSS in <head> and JavaScript at end of <body> or use async/defer","Minimize DOM manipulations\u2014use virtual scrolling in large lists","Prefer transform/opacity for animations (composite-only)","Use Chrome DevTools Performance tab to analyze reflows","Leverage preload for critical resources and prefetch for likely next pages","Batch style changes with classList instead of individual style properties","In Angular, use OnPush change detection and trackBy in *ngFor"]},t={title:"HTTP/HTTPS Fundamentals",tags:["HTTP","HTTPS","Networking","API","Security","Web Fundamentals"],paragraphs:["HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the web. It defines how clients (browsers) and servers exchange messages. HTTPS is HTTP secured with TLS/SSL encryption, essential for protecting sensitive data. Understanding HTTP is crucial for building robust Angular applications that communicate with backend APIs.","HTTP is stateless\u2014each request/response pair is independent. Servers use cookies, tokens, or sessions to maintain state. Modern web apps rely heavily on RESTful APIs over HTTP/HTTPS, using JSON payloads. Angular's HttpClient module abstracts these interactions while providing interceptors, typing, and RxJS integration.","Key concepts include methods (GET, POST, etc.), status codes (200, 404, 500), headers (Content-Type, Authorization), caching, and security considerations. Poorly designed HTTP usage can lead to security vulnerabilities (e.g., lack of HTTPS) or performance issues (e.g., missing caching)."],sections:[{heading:"HTTP Request Structure",content:"An HTTP request consists of:",list:["<strong>Request Line:</strong> Method + URI + Version (e.g., GET /users HTTP/1.1)","<strong>Headers:</strong> Metadata (Host, User-Agent, Accept, Authorization)","<strong>Body:</strong> Optional payload (for POST, PUT, PATCH)"]},{heading:"HTTP Response Structure",content:"An HTTP response includes:",list:["<strong>Status Line:</strong> Version + Status Code + Reason (e.g., HTTP/1.1 200 OK)","<strong>Headers:</strong> Metadata (Content-Type, Content-Length, Cache-Control)","<strong>Body:</strong> Response data (JSON, HTML, etc.)"]},{heading:"Common HTTP Methods",content:"Standard methods and their semantics:",list:["<strong>GET:</strong> Retrieve resource (safe, idempotent)","<strong>POST:</strong> Create resource","<strong>PUT:</strong> Replace resource (idempotent)","<strong>PATCH:</strong> Partial update","<strong>DELETE:</strong> Remove resource (idempotent)","<strong>HEAD/OPTIONS:</strong> Metadata or preflight"]},{heading:"Status Code Categories",content:"Standard response classifications:",list:["<strong>2xx Success:</strong> 200 OK, 201 Created, 204 No Content","<strong>3xx Redirection:</strong> 301 Moved Permanently, 304 Not Modified","<strong>4xx Client Error:</strong> 400 Bad Request, 401 Unauthorized, 404 Not Found","<strong>5xx Server Error:</strong> 500 Internal, 503 Service Unavailable"]},{heading:"HTTPS and Security",content:"HTTPS adds encryption and authentication:",list:["<strong>TLS Handshake:</strong> Negotiates encryption keys","<strong>Certificates:</strong> Verify server identity","<strong>Benefits:</strong> Confidentiality, integrity, authentication","<strong>HSTS:</strong> Forces HTTPS usage"]},{heading:"HTTP in Angular Context",content:"Angular-specific considerations:",list:["<strong>HttpClient:</strong> Typed, RxJS-based HTTP client","<strong>Interceptors:</strong> Modify requests/responses globally","<strong>CORS:</strong> Browser-enforced for cross-origin requests","<strong>Error Handling:</strong> Centralized with retry/catchError"]}],codeExamples:[{title:"Complete HTTP Request Example",language:"http",description:"Full GET request with headers",code:`GET /api/v1/users/123 HTTP/1.1
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
}`}],keyPoints:["HTTP is stateless; HTTPS adds encryption via TLS","Methods: GET (safe/idempotent), POST (create), PUT/PATCH (update), DELETE","Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error","Headers carry metadata; bodies carry payloads","Always use HTTPS in production to protect data","CORS restricts cross-origin requests in browsers","Caching headers (Cache-Control, ETag) improve performance","Modern APIs use JSON with proper Content-Type headers"],bestPractices:["Always use HTTPS in production (enforce with HSTS)","Use appropriate HTTP methods following REST conventions","Set proper Content-Type and Accept headers","Handle errors gracefully with status code checks","Implement authentication with secure tokens (JWT, not cookies for APIs)","Use HTTP caching headers for static resources","In Angular, prefer HttpClient with interceptors for auth/logging","Validate and sanitize all server responses"]};export{e as a,t as b};
