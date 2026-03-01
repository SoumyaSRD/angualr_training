import{b as d}from"./chunk-LDGWIROF.js";import"./chunk-XGBKVH7G.js";import{Aa as a,Cb as e,Oa as p,eb as i,fb as n,gb as t,hb as s}from"./chunk-ESOSN4X2.js";var c={title:"Angular HttpClient: Complete Guide to API Calls \u2013 GET, POST, PUT, DELETE, Headers, Params, Interceptors, Error Handling & Best Practices",tags:["Angular","HttpClient","API Calls","HTTP Requests","Observables","Error Handling","Interceptors","Typed Responses","Best Practices"],paragraphs:["HttpClient is Angular's modern, powerful, and type-safe module for making HTTP requests to REST APIs. It returns Observables by default, integrates perfectly with RxJS operators, works seamlessly with interceptors, supports typed responses, and handles most real-world API scenarios elegantly. This guide covers everything you need: setup, all major HTTP methods, query params, headers, request body, error handling, retry logic, file upload/download, progress events, typed responses, interceptors integration, and proven patterns used in 2025+ Angular applications."],keyPoints:["HttpClient returns Observable<HttpResponse<T>> or Observable<T> (with {observe: 'response'} or without)","All requests are lazy \u2192 nothing happens until you .subscribe() or use async pipe","Automatic JSON parsing (responseType: 'json' is default)","Supports generics for strong typing \u2192 HttpClient.get<User>(url)","Interceptors can add auth tokens, handle errors, show loaders globally","Modern setup: provideHttpClient() in standalone applications","Best companion: RxJS operators (catchError, retry, map, tap, switchMap, etc.)"],sections:[{id:"setup-httpclient",heading:"Setup & Configuration (Standalone & Module-based)",content:"HttpClient is provided via provideHttpClient() in modern Angular apps.",list:["Standalone app \u2192 provideHttpClient() in app.config.ts","With interceptors \u2192 provideHttpClient(withInterceptors([...]))","With fetch backend (experimental) \u2192 provideHttpClient(withFetch())","Legacy NgModule \u2192 import HttpClientModule"],additionalExplanation:"Since Angular 14\u201315+, standalone + provideHttpClient() is the standard."},{id:"basic-get-request",heading:"GET Request \u2013 Fetching Data",content:"Most common operation \u2014 retrieve resources from API.",list:["Simple GET with typed response","With query parameters (HttpParams)","With headers","With observe: 'response' to get full HttpResponse"],additionalExplanation:"Always type your response interface for safety."},{id:"post-put-delete",heading:"POST, PUT, DELETE \u2013 Sending Data",content:"Used to create, update, and remove resources.",list:["POST \u2192 create new resource","PUT \u2192 full update (replace)","PATCH \u2192 partial update (not always supported)","DELETE \u2192 remove resource"],additionalExplanation:"Most APIs return the created/updated entity \u2192 type it."},{id:"error-handling-retry",heading:"Error Handling & Retry Patterns",content:"Always handle errors \u2014 never let them crash your app.",list:["catchError + throwError","Global error handling via interceptor","retry / retryWhen operators","User-friendly messages + fallback values"],additionalExplanation:"Centralize error handling in services or interceptors."},{id:"advanced-features",heading:"Advanced HttpClient Features",content:"HttpClient supports many powerful options.",list:["File upload (FormData + reportProgress)","Download files (responseType: 'blob')","Custom headers & params","Timeout operator","withCredentials for cookies/auth"],additionalExplanation:"Progress events are great for UX in large file uploads/downloads."}],codeExamples:[{title:"Modern Setup \u2013 Standalone Application (app.config.ts)",language:"typescript",code:`import { ApplicationConfig } from '@angular/core';
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
};`,description:"Centralized error handling"}],bestPractices:["Always **type your responses** \u2192 HttpClient.get<User[]>()","Centralize API base URL + endpoints in environment or constant file","Use **services** for all API calls \u2014 never call HttpClient directly from components","Handle errors **everywhere** \u2014 at least catchError + user feedback","Prefer **functional interceptors** for auth, logging, global errors","Use **async pipe** in templates \u2192 automatic subscription cleanup","Avoid nested .subscribe() \u2014 flatten with switchMap/mergeMap","Set **timeout** on critical requests (timeout(15000))","Use **shareReplay(1)** for data fetched once and reused (profile, config)","For large lists \u2192 add pagination params + infinite scroll pattern","Test API services with HttpClientTestingModule"]};var y=(()=>{class o{constructor(){this.content=c,this.httpImportExample=`
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()
  ]
});
`,this.serviceInjectionExample=`
@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {}

}
`,this.getExample=`
getUsers() {
  return this.http.get('/api/users');
}
`,this.postExample=`
createUser(data: any) {
  return this.http.post('/api/users', data);
}
`,this.putExample=`
updateUser(id: number, data: any) {
  return this.http.put('/api/users/' + id, data);
}
`,this.deleteExample=`
deleteUser(id: number) {
  return this.http.delete('/api/users/' + id);
}
`,this.subscribeExample=`
this.apiService.getUsers().subscribe(data => {
  console.log(data);
});
`,this.errorHandlingExample=`
this.http.get('/api/users').pipe(
  catchError(error => {
    console.error(error);
    return throwError(() => error);
  })
);
`}static{this.\u0275fac=function(l){return new(l||o)}}static{this.\u0275cmp=p({type:o,selectors:[["app-ng-httpclient"]],decls:112,vars:15,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(l,r){l&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"API Calls Using HttpClient in Angular"),t(),n(3,"p"),e(4," Angular provides the "),n(5,"code"),e(6,"HttpClient"),t(),e(7," module to handle communication with backend servers through HTTP requests. It is part of the "),n(8,"code"),e(9,"@angular/common/http"),t(),e(10," package and offers a modern, easy-to-use API for performing CRUD operations such as GET, POST, PUT, PATCH, and DELETE. HttpClient works seamlessly with RxJS Observables, enabling reactive data handling and powerful asynchronous workflows. "),t(),n(11,"p"),e(12," Instead of using traditional browser APIs like "),n(13,"code"),e(14,"fetch()"),t(),e(15," or "),n(16,"code"),e(17,"XMLHttpRequest"),t(),e(18,", Angular developers typically rely on HttpClient because it provides features such as typed responses, interceptors, request cancellation, error handling, and built-in JSON parsing. "),t(),n(19,"h3"),e(20,"Why Use HttpClient?"),t(),n(21,"ul")(22,"li")(23,"strong"),e(24,"Observable-Based:"),t(),e(25," Integrates with RxJS for reactive data handling. "),t(),n(26,"li")(27,"strong"),e(28,"Strong Typing:"),t(),e(29," Supports TypeScript generics for typed API responses. "),t(),n(30,"li")(31,"strong"),e(32,"Interceptors Support:"),t(),e(33," Add global request/response logic. "),t(),n(34,"li")(35,"strong"),e(36,"Automatic JSON Parsing:"),t(),e(37," Simplifies data handling. "),t(),n(38,"li")(39,"strong"),e(40,"Error Handling:"),t(),e(41," Easily manage API errors using RxJS. "),t()(),n(42,"h3"),e(43,"Importing HttpClient (Standalone Angular)"),t(),n(44,"p"),e(45," In modern Angular applications using standalone APIs, HttpClient is registered during application bootstrap. "),t(),n(46,"pre"),s(47,"code",1),e(48,`
`),t(),n(49,"h3"),e(50,"Injecting HttpClient into a Service"),t(),n(51,"p"),e(52," API calls are typically placed inside services instead of components to keep business logic separated from UI logic. "),t(),n(53,"pre"),s(54,"code",1),e(55,`
`),t(),n(56,"h3"),e(57,"Common HTTP Methods"),t(),n(58,"h4"),e(59,"GET Request (Fetch Data)"),t(),n(60,"pre"),s(61,"code",1),e(62,`
`),t(),n(63,"h4"),e(64,"POST Request (Create Data)"),t(),n(65,"pre"),s(66,"code",1),e(67,`
`),t(),n(68,"h4"),e(69,"PUT/PATCH Request (Update Data)"),t(),n(70,"pre"),s(71,"code",1),e(72,`
`),t(),n(73,"h4"),e(74,"DELETE Request (Remove Data)"),t(),n(75,"pre"),s(76,"code",1),e(77,`
`),t(),n(78,"h3"),e(79,"Handling Responses with Observables"),t(),n(80,"p"),e(81," HttpClient methods return Observables, allowing developers to subscribe to responses and handle asynchronous data streams. "),t(),n(82,"pre"),s(83,"code",1),e(84,`
`),t(),n(85,"h3"),e(86,"Error Handling"),t(),n(87,"p"),e(88," Errors can be handled using RxJS operators such as "),n(89,"code"),e(90,"catchError"),t(),e(91,", allowing centralized and structured error management. "),t(),n(92,"pre"),s(93,"code",1),e(94,`
`),t(),n(95,"h3"),e(96,"Best Practices for API Calls"),t(),n(97,"ul")(98,"li"),e(99," Use services to manage API logic instead of components. "),t(),n(100,"li"),e(101," Use TypeScript interfaces for strong typing. "),t(),n(102,"li"),e(103," Handle errors globally using interceptors. "),t(),n(104,"li"),e(105," Use RxJS operators to transform responses. "),t(),n(106,"li"),e(107," Avoid multiple subscriptions; prefer async pipe when possible. "),t()(),n(108,"h3"),e(109,"Summary"),t(),n(110,"p"),e(111," HttpClient provides a powerful and structured way to perform API calls in Angular applications. By leveraging Observables, interceptors, and strong typing, Angular developers can build scalable, maintainable, and reactive data communication layers. "),t()()),l&2&&(i("title",r.content.title)("tags",r.content.tags)("paragraphs",r.content.paragraphs)("sections",r.content.sections)("codeExamples",r.content.codeExamples)("bestPractices",r.content.bestPractices)("keyPoints",r.content.keyPoints),a(47),i("textContent",r.httpImportExample),a(7),i("textContent",r.serviceInjectionExample),a(7),i("textContent",r.getExample),a(5),i("textContent",r.postExample),a(5),i("textContent",r.putExample),a(5),i("textContent",r.deleteExample),a(7),i("textContent",r.subscribeExample),a(10),i("textContent",r.errorHandlingExample))},dependencies:[d],encapsulation:2})}}return o})();export{y as NgHttpClient};
