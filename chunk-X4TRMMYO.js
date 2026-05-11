import{G as d,j as m}from"./chunk-QXA3BHRF.js";import"./chunk-6J7NVHL7.js";import{Cb as e,Ma as p,db as r,eb as n,fb as t,gb as l,za as a}from"./chunk-LWJ6XB4K.js";var x=(()=>{class s{constructor(){this.content=d,this.httpImportExample=`
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
`}static{this.\u0275fac=function(o){return new(o||s)}}static{this.\u0275cmp=p({type:s,selectors:[["app-ng-httpclient"]],decls:112,vars:15,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(o,i){o&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"API Calls Using HttpClient in Angular"),t(),n(3,"p"),e(4," Angular provides the "),n(5,"code"),e(6,"HttpClient"),t(),e(7," module to handle communication with backend servers through HTTP requests. It is part of the "),n(8,"code"),e(9,"@angular/common/http"),t(),e(10," package and offers a modern, easy-to-use API for performing CRUD operations such as GET, POST, PUT, PATCH, and DELETE. HttpClient works seamlessly with RxJS Observables, enabling reactive data handling and powerful asynchronous workflows. "),t(),n(11,"p"),e(12," Instead of using traditional browser APIs like "),n(13,"code"),e(14,"fetch()"),t(),e(15," or "),n(16,"code"),e(17,"XMLHttpRequest"),t(),e(18,", Angular developers typically rely on HttpClient because it provides features such as typed responses, interceptors, request cancellation, error handling, and built-in JSON parsing. "),t(),n(19,"h3"),e(20,"Why Use HttpClient?"),t(),n(21,"ul")(22,"li")(23,"strong"),e(24,"Observable-Based:"),t(),e(25," Integrates with RxJS for reactive data handling. "),t(),n(26,"li")(27,"strong"),e(28,"Strong Typing:"),t(),e(29," Supports TypeScript generics for typed API responses. "),t(),n(30,"li")(31,"strong"),e(32,"Interceptors Support:"),t(),e(33," Add global request/response logic. "),t(),n(34,"li")(35,"strong"),e(36,"Automatic JSON Parsing:"),t(),e(37," Simplifies data handling. "),t(),n(38,"li")(39,"strong"),e(40,"Error Handling:"),t(),e(41," Easily manage API errors using RxJS. "),t()(),n(42,"h3"),e(43,"Importing HttpClient (Standalone Angular)"),t(),n(44,"p"),e(45," In modern Angular applications using standalone APIs, HttpClient is registered during application bootstrap. "),t(),n(46,"pre"),l(47,"code",1),e(48,`
`),t(),n(49,"h3"),e(50,"Injecting HttpClient into a Service"),t(),n(51,"p"),e(52," API calls are typically placed inside services instead of components to keep business logic separated from UI logic. "),t(),n(53,"pre"),l(54,"code",1),e(55,`
`),t(),n(56,"h3"),e(57,"Common HTTP Methods"),t(),n(58,"h4"),e(59,"GET Request (Fetch Data)"),t(),n(60,"pre"),l(61,"code",1),e(62,`
`),t(),n(63,"h4"),e(64,"POST Request (Create Data)"),t(),n(65,"pre"),l(66,"code",1),e(67,`
`),t(),n(68,"h4"),e(69,"PUT/PATCH Request (Update Data)"),t(),n(70,"pre"),l(71,"code",1),e(72,`
`),t(),n(73,"h4"),e(74,"DELETE Request (Remove Data)"),t(),n(75,"pre"),l(76,"code",1),e(77,`
`),t(),n(78,"h3"),e(79,"Handling Responses with Observables"),t(),n(80,"p"),e(81," HttpClient methods return Observables, allowing developers to subscribe to responses and handle asynchronous data streams. "),t(),n(82,"pre"),l(83,"code",1),e(84,`
`),t(),n(85,"h3"),e(86,"Error Handling"),t(),n(87,"p"),e(88," Errors can be handled using RxJS operators such as "),n(89,"code"),e(90,"catchError"),t(),e(91,", allowing centralized and structured error management. "),t(),n(92,"pre"),l(93,"code",1),e(94,`
`),t(),n(95,"h3"),e(96,"Best Practices for API Calls"),t(),n(97,"ul")(98,"li"),e(99," Use services to manage API logic instead of components. "),t(),n(100,"li"),e(101," Use TypeScript interfaces for strong typing. "),t(),n(102,"li"),e(103," Handle errors globally using interceptors. "),t(),n(104,"li"),e(105," Use RxJS operators to transform responses. "),t(),n(106,"li"),e(107," Avoid multiple subscriptions; prefer async pipe when possible. "),t()(),n(108,"h3"),e(109,"Summary"),t(),n(110,"p"),e(111," HttpClient provides a powerful and structured way to perform API calls in Angular applications. By leveraging Observables, interceptors, and strong typing, Angular developers can build scalable, maintainable, and reactive data communication layers. "),t()()),o&2&&(r("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints),a(47),r("textContent",i.httpImportExample),a(7),r("textContent",i.serviceInjectionExample),a(7),r("textContent",i.getExample),a(5),r("textContent",i.postExample),a(5),r("textContent",i.putExample),a(5),r("textContent",i.deleteExample),a(7),r("textContent",i.subscribeExample),a(10),r("textContent",i.errorHandlingExample))},dependencies:[m],encapsulation:2})}}return s})();export{x as NgHttpClient};
