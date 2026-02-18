import{a as p}from"./chunk-ZO4N54AF.js";import"./chunk-7FNPREBO.js";import{Eb as a,Fb as n,Gb as t,Hb as l,Wa as s,ec as e,jb as c}from"./chunk-HJWRZBIA.js";var d={title:"Angular HTTP Interceptors: Complete Guide \u2013 Functional vs Class-Based, Use Cases, Examples & Best Practices (2025+)",tags:["Angular","HTTP Interceptors","HttpClient","Functional Interceptors","Auth Token","Error Handling","Logging","Best Practices"],paragraphs:["HTTP Interceptors are middleware functions (or classes) in Angular's HttpClient that let you intercept and modify **every outgoing HTTP request** and/or **incoming HTTP response** in a centralized place. They are perfect for implementing cross-cutting concerns such as: adding authentication tokens, handling global errors, logging requests/responses, showing/hiding loaders, retrying failed requests, caching, modifying URLs, and more. Since Angular 15+ the **functional interceptor** style is the officially recommended approach because it is more predictable, tree-shakeable, and easier to reason about in complex dependency scenarios. This guide covers both styles, real-world patterns, common gotchas, and modern best practices."],keyPoints:["Interceptors run for **every** HttpClient request (get, post, put, delete, etc.)","Functional interceptors (preferred since ~v15): plain functions \u2192 provideHttpClient(withInterceptors([...]))","Class-based interceptors (legacy/compatibility): implement HttpInterceptor \u2192 HTTP_INTERCEPTORS multi-provider","Order matters: interceptors run in the order they are provided","Chain pattern: call next.handle(modifiedReq) to continue the chain","Common uses: Auth token injection, global error handling, request/response logging, loader management, API URL prefixing"],sections:[{id:"what-are-http-interceptors",heading:"What Are HTTP Interceptors?",content:"An interceptor is middleware that sits between your application code and the backend server. It can read and modify the HttpRequest before it is sent, and/or read and modify the HttpResponse (or error) before it reaches your component/service.",list:["Intercept outgoing requests \u2192 add headers, change URL, clone request","Intercept incoming responses \u2192 transform body, handle errors globally","Intercept errors \u2192 retry, transform, log, redirect to login, show toast","No need to repeat logic in every service \u2192 DRY principle"],additionalExplanation:"Interceptors are chainable \u2014 each one calls the next in line. The last in chain actually sends the request to the server."},{id:"functional-interceptors",heading:"Functional Interceptors \u2013 Modern & Recommended Style",content:"Introduced in Angular 15 and strongly recommended in 2025+ (Angular 18\u201320 era). No class needed, just a function that receives req and next.",list:["Type: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => Observable<HttpEvent<unknown>>","Registered via provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor]))","Use inject() to get services inside the function","Very predictable order and dependency resolution","Better tree-shaking and no DI token conflicts in complex apps"],additionalExplanation:"Official Angular docs now favor functional interceptors. Class-based still work but are considered legacy for new code."},{id:"class-based-interceptors",heading:"Class-Based Interceptors \u2013 Legacy / DI Style",content:"The classic style used in Angular 4.3 \u2192 14. Still supported but not recommended for new projects.",list:["Implement HttpInterceptor interface","Registered via { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }","Constructor injection for services","Can become unpredictable in lazy-loaded or multi-app scenarios"],additionalExplanation:"Use only when maintaining very old code or when you really need complex DI logic that inject() cannot easily handle."},{id:"common-use-cases",heading:"Most Common Real-World Use Cases",content:"Interceptors solve repetitive cross-cutting concerns elegantly.",list:["Add Authorization: Bearer token to every request","Global Error Handling: Catch 401 \u2192 logout, 500 \u2192 show toast","Add API prefix: '/api/v1/' \u2192 full URL","Logging: console.log every request/response in dev mode","Show/Hide Loader: start spinner on request, stop on response/error","Retry failed requests (with exponential backoff)","Transform responses (camelCase \u2192 snake_case, etc.)"],additionalExplanation:"Most apps use 2\u20134 interceptors: auth + error + logging + loader."}],codeExamples:[{title:"Functional Auth Interceptor \u2013 Add Bearer Token",language:"typescript",code:`import { HttpInterceptorFn } from '@angular/common/http';
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
}`,description:"Old class-based style \u2013 still works but not recommended for new code."}],bestPractices:["Prefer **functional interceptors** in Angular 15+ / 2025+ projects","Register interceptors in **app.config.ts** using provideHttpClient(withInterceptors([...]))","Keep each interceptor focused on **one responsibility** (auth, error, logging, etc.)","Always **clone** the request before modifying (req.clone({ ... }))","Handle errors with **catchError** inside pipe() \u2014 never let them propagate unhandled","Use **inject()** inside functional interceptors to get services","Avoid heavy synchronous logic \u2014 interceptors should be fast","Order matters: put auth before logging, error handling last in chain","Combine with **retry**, **timeout**, **retryWhen** operators when needed","Test interceptors independently using HttpClientTestingModule","In production: disable logging / verbose interceptors","For route-scoped behavior \u2192 consider withRequestsMadeViaParent() or separate HttpClient instances (advanced)"]};var y=(()=>{class i{constructor(){this.content=d,this.interceptorExample=`
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const cloned = req.clone({
      setHeaders: {
        Authorization: 'Bearer TOKEN'
      }
    });

    return next.handle(cloned);
  }

}
`,this.registerInterceptorExample=`
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
});
`}static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275cmp=c({type:i,selectors:[["app-ng-interceptor"]],decls:105,vars:9,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(o,r){o&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"HTTP Interceptors in Angular"),t(),n(3,"p"),e(4," HTTP Interceptors are a powerful feature in Angular that allow developers to intercept and modify HTTP requests and responses globally before they are handled by the application. They act as middleware between the Angular application and the backend server, making it possible to implement cross-cutting concerns such as authentication, logging, error handling, caching, and request transformation in a centralized way. "),t(),n(5,"p"),e(6," Instead of adding repetitive logic inside every HTTP request, interceptors provide a clean and scalable approach by processing requests automatically. This helps keep components and services clean while ensuring consistent behavior across all API calls. "),t(),n(7,"h3"),e(8,"Why Use HTTP Interceptors?"),t(),n(9,"ul")(10,"li")(11,"strong"),e(12,"Authentication:"),t(),e(13," Automatically attach tokens or headers to outgoing requests. "),t(),n(14,"li")(15,"strong"),e(16,"Error Handling:"),t(),e(17," Handle HTTP errors globally. "),t(),n(18,"li")(19,"strong"),e(20,"Logging:"),t(),e(21," Monitor API requests and responses. "),t(),n(22,"li")(23,"strong"),e(24,"Request Transformation:"),t(),e(25," Modify headers or request payloads. "),t(),n(26,"li")(27,"strong"),e(28,"Response Transformation:"),t(),e(29," Process server responses centrally. "),t(),n(30,"li")(31,"strong"),e(32,"Loading Indicators:"),t(),e(33," Show loaders during API calls. "),t()(),n(34,"h3"),e(35,"How HTTP Interceptors Work"),t(),n(36,"p"),e(37," Angular interceptors implement the "),n(38,"code"),e(39,"HttpInterceptor"),t(),e(40," interface. Each interceptor receives the outgoing request and a handler that forwards the request to the next interceptor or the backend server. Interceptors can modify the request, handle the response, or even cancel the request. "),t(),n(41,"pre"),l(42,"code",1),e(43,`
`),t(),n(44,"h3"),e(45,"Registering an Interceptor (Standalone Angular)"),t(),n(46,"p"),e(47," In modern Angular applications using standalone APIs, interceptors are registered using "),n(48,"code"),e(49,"provideHttpClient()"),t(),e(50," along with "),n(51,"code"),e(52,"withInterceptors()"),t(),e(53,". "),t(),n(54,"pre"),l(55,"code",1),e(56,`
`),t(),n(57,"h3"),e(58,"Interceptor Execution Flow"),t(),n(59,"ul")(60,"li"),e(61,"HTTP request is initiated."),t(),n(62,"li"),e(63,"Request passes through interceptors in order."),t(),n(64,"li"),e(65,"Interceptor modifies request or adds logic."),t(),n(66,"li"),e(67,"Request reaches backend server."),t(),n(68,"li"),e(69,"Response returns through interceptors in reverse order."),t(),n(70,"li"),e(71,"Application receives final response."),t()(),n(72,"h3"),e(73,"Common Use Cases"),t(),n(74,"ul")(75,"li"),e(76,"Adding Authorization tokens automatically."),t(),n(77,"li"),e(78,"Handling 401 unauthorized responses globally."),t(),n(79,"li"),e(80,"Retrying failed requests."),t(),n(81,"li"),e(82,"Global error notification handling."),t(),n(83,"li"),e(84,"Measuring API performance."),t()(),n(85,"h3"),e(86,"Best Practices for Using Interceptors"),t(),n(87,"ul")(88,"li"),e(89," Keep interceptors focused on a single responsibility. "),t(),n(90,"li"),e(91," Avoid placing business logic inside interceptors. "),t(),n(92,"li"),e(93," Clone requests before modifying since HTTP requests are immutable. "),t(),n(94,"li"),e(95," Use multiple small interceptors instead of one large interceptor. "),t(),n(96,"li"),e(97," Handle errors carefully using RxJS operators like "),n(98,"code"),e(99,"catchError"),t(),e(100,". "),t()(),n(101,"h3"),e(102,"Summary"),t(),n(103,"p"),e(104," HTTP Interceptors provide a centralized way to handle HTTP communication in Angular applications. By allowing developers to modify requests and responses globally, interceptors improve maintainability, reduce code duplication, and simplify handling of cross-cutting concerns such as authentication and error handling. "),t()()),o&2&&(a("title",r.content.title)("tags",r.content.tags)("paragraphs",r.content.paragraphs)("sections",r.content.sections)("codeExamples",r.content.codeExamples)("bestPractices",r.content.bestPractices)("keyPoints",r.content.keyPoints),s(42),a("textContent",r.interceptorExample),s(13),a("textContent",r.registerInterceptorExample))},dependencies:[p],encapsulation:2})}}return i})();export{y as NgInterceptor};
