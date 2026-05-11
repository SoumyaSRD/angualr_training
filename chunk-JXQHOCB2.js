import{H as m,j as d}from"./chunk-QXA3BHRF.js";import"./chunk-6J7NVHL7.js";import{Cb as e,Ma as c,db as l,eb as n,fb as t,gb as s,za as o}from"./chunk-LWJ6XB4K.js";var E=(()=>{class r{constructor(){this.content=m,this.interceptorExample=`
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
`}static{this.\u0275fac=function(a){return new(a||r)}}static{this.\u0275cmp=c({type:r,selectors:[["app-ng-interceptor"]],decls:105,vars:9,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(a,i){a&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"HTTP Interceptors in Angular"),t(),n(3,"p"),e(4," HTTP Interceptors are a powerful feature in Angular that allow developers to intercept and modify HTTP requests and responses globally before they are handled by the application. They act as middleware between the Angular application and the backend server, making it possible to implement cross-cutting concerns such as authentication, logging, error handling, caching, and request transformation in a centralized way. "),t(),n(5,"p"),e(6," Instead of adding repetitive logic inside every HTTP request, interceptors provide a clean and scalable approach by processing requests automatically. This helps keep components and services clean while ensuring consistent behavior across all API calls. "),t(),n(7,"h3"),e(8,"Why Use HTTP Interceptors?"),t(),n(9,"ul")(10,"li")(11,"strong"),e(12,"Authentication:"),t(),e(13," Automatically attach tokens or headers to outgoing requests. "),t(),n(14,"li")(15,"strong"),e(16,"Error Handling:"),t(),e(17," Handle HTTP errors globally. "),t(),n(18,"li")(19,"strong"),e(20,"Logging:"),t(),e(21," Monitor API requests and responses. "),t(),n(22,"li")(23,"strong"),e(24,"Request Transformation:"),t(),e(25," Modify headers or request payloads. "),t(),n(26,"li")(27,"strong"),e(28,"Response Transformation:"),t(),e(29," Process server responses centrally. "),t(),n(30,"li")(31,"strong"),e(32,"Loading Indicators:"),t(),e(33," Show loaders during API calls. "),t()(),n(34,"h3"),e(35,"How HTTP Interceptors Work"),t(),n(36,"p"),e(37," Angular interceptors implement the "),n(38,"code"),e(39,"HttpInterceptor"),t(),e(40," interface. Each interceptor receives the outgoing request and a handler that forwards the request to the next interceptor or the backend server. Interceptors can modify the request, handle the response, or even cancel the request. "),t(),n(41,"pre"),s(42,"code",1),e(43,`
`),t(),n(44,"h3"),e(45,"Registering an Interceptor (Standalone Angular)"),t(),n(46,"p"),e(47," In modern Angular applications using standalone APIs, interceptors are registered using "),n(48,"code"),e(49,"provideHttpClient()"),t(),e(50," along with "),n(51,"code"),e(52,"withInterceptors()"),t(),e(53,". "),t(),n(54,"pre"),s(55,"code",1),e(56,`
`),t(),n(57,"h3"),e(58,"Interceptor Execution Flow"),t(),n(59,"ul")(60,"li"),e(61,"HTTP request is initiated."),t(),n(62,"li"),e(63,"Request passes through interceptors in order."),t(),n(64,"li"),e(65,"Interceptor modifies request or adds logic."),t(),n(66,"li"),e(67,"Request reaches backend server."),t(),n(68,"li"),e(69,"Response returns through interceptors in reverse order."),t(),n(70,"li"),e(71,"Application receives final response."),t()(),n(72,"h3"),e(73,"Common Use Cases"),t(),n(74,"ul")(75,"li"),e(76,"Adding Authorization tokens automatically."),t(),n(77,"li"),e(78,"Handling 401 unauthorized responses globally."),t(),n(79,"li"),e(80,"Retrying failed requests."),t(),n(81,"li"),e(82,"Global error notification handling."),t(),n(83,"li"),e(84,"Measuring API performance."),t()(),n(85,"h3"),e(86,"Best Practices for Using Interceptors"),t(),n(87,"ul")(88,"li"),e(89," Keep interceptors focused on a single responsibility. "),t(),n(90,"li"),e(91," Avoid placing business logic inside interceptors. "),t(),n(92,"li"),e(93," Clone requests before modifying since HTTP requests are immutable. "),t(),n(94,"li"),e(95," Use multiple small interceptors instead of one large interceptor. "),t(),n(96,"li"),e(97," Handle errors carefully using RxJS operators like "),n(98,"code"),e(99,"catchError"),t(),e(100,". "),t()(),n(101,"h3"),e(102,"Summary"),t(),n(103,"p"),e(104," HTTP Interceptors provide a centralized way to handle HTTP communication in Angular applications. By allowing developers to modify requests and responses globally, interceptors improve maintainability, reduce code duplication, and simplify handling of cross-cutting concerns such as authentication and error handling. "),t()()),a&2&&(l("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints),o(42),l("textContent",i.interceptorExample),o(13),l("textContent",i.registerInterceptorExample))},dependencies:[d],encapsulation:2})}}return r})();export{E as NgInterceptor};
