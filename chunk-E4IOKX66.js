import{D as m,j as c}from"./chunk-QXA3BHRF.js";import"./chunk-6J7NVHL7.js";import{Cb as e,Ma as d,db as a,eb as n,fb as t,gb as o,za as r}from"./chunk-LWJ6XB4K.js";var v=(()=>{class l{constructor(){this.content=m,this.canActivateExample=`
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return this.authService.isLoggedIn();
  }
}
`,this.canDeactivateExample=`
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

@Injectable({ providedIn: 'root' })
export class UnsavedGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
`,this.canLoadExample=`
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanLoad {

  canLoad(): boolean {
    return true;
  }
}
`,this.resolveExample=`
@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<Data> {

  resolve(): Observable<Data> {
    return this.api.getData();
  }
}
`,this.routeConfigExample=`
export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  }
];
`,this.functionalGuardExample=`
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn();
};
`}static{this.\u0275fac=function(s){return new(s||l)}}static{this.\u0275cmp=d({type:l,selectors:[["app-guard-eg"]],decls:115,vars:13,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(s,i){s&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"Route Guards in Angular"),t(),n(3,"p"),e(4," Route Guards are a powerful feature of Angular Router that allow developers to control navigation within an application. They help determine whether a user can access a route, leave a route, or load specific modules based on certain conditions such as authentication, permissions, or unsaved changes. Guards act as checkpoints during the routing process and enhance both application security and user experience. "),t(),n(5,"p"),e(6," Angular applications often require restrictions such as allowing only logged-in users to access certain pages or preventing navigation away from a form with unsaved data. Route Guards provide a structured and reusable way to implement such logic. "),t(),n(7,"h3"),e(8,"Why Use Route Guards?"),t(),n(9,"ul")(10,"li")(11,"strong"),e(12,"Authentication Control:"),t(),e(13," Restrict access to authenticated users. "),t(),n(14,"li")(15,"strong"),e(16,"Authorization Management:"),t(),e(17," Allow access based on user roles or permissions. "),t(),n(18,"li")(19,"strong"),e(20,"Prevent Data Loss:"),t(),e(21," Stop users from leaving pages with unsaved changes. "),t(),n(22,"li")(23,"strong"),e(24,"Lazy Loading Protection:"),t(),e(25," Control whether feature modules should load. "),t(),n(26,"li")(27,"strong"),e(28,"Improved Navigation Logic:"),t(),e(29," Centralize route-related conditions. "),t()(),n(30,"h3"),e(31,"Types of Route Guards"),t(),n(32,"p"),e(33," Angular provides several types of route guards, each designed for specific navigation scenarios. "),t(),n(34,"h4"),e(35,"1. CanActivate"),t(),n(36,"p"),e(37," Determines whether a route can be activated. Commonly used for authentication checks. "),t(),n(38,"pre"),o(39,"code",1),e(40,`
`),t(),n(41,"h4"),e(42,"2. CanDeactivate"),t(),n(43,"p"),e(44," Determines whether a user can leave a route. Often used to warn users about unsaved form changes. "),t(),n(45,"pre"),o(46,"code",1),e(47,`
`),t(),n(48,"h4"),e(49,"3. CanLoad"),t(),n(50,"p"),e(51," Prevents lazy-loaded modules from loading unless certain conditions are met. Useful for protecting large feature areas. "),t(),n(52,"pre"),o(53,"code",1),e(54,`
`),t(),n(55,"h4"),e(56,"4. Resolve"),t(),n(57,"p"),e(58," Fetches required data before navigating to a route. This ensures that the component has the data ready when it loads. "),t(),n(59,"pre"),o(60,"code",1),e(61,`
`),t(),n(62,"h3"),e(63,"Using Guards in Route Configuration"),t(),n(64,"p"),e(65," Guards are applied in route configuration by referencing the guard class or function inside route definitions. "),t(),n(66,"pre"),o(67,"code",1),e(68,`
`),t(),n(69,"h3"),e(70,"Modern Functional Guards (Angular Standalone)"),t(),n(71,"p"),e(72," Modern Angular versions introduced functional guards, which provide a simpler and more lightweight alternative to class-based guards. Functional guards use the "),n(73,"code"),e(74,"inject()"),t(),e(75," function to access dependencies directly. "),t(),n(76,"pre"),o(77,"code",1),e(78,`
`),t(),n(79,"h3"),e(80,"Guard Execution Flow"),t(),n(81,"ul")(82,"li"),e(83,"Angular starts navigation when a route change is triggered."),t(),n(84,"li"),e(85,"Guards run before loading or activating the route."),t(),n(86,"li"),e(87,"If a guard returns "),n(88,"code"),e(89,"true"),t(),e(90,", navigation continues."),t(),n(91,"li"),e(92,"If a guard returns "),n(93,"code"),e(94,"false"),t(),e(95,", navigation is cancelled."),t(),n(96,"li"),e(97,"Guards can also redirect users to other routes."),t()(),n(98,"h3"),e(99,"Best Practices for Route Guards"),t(),n(100,"ul")(101,"li"),e(102," Keep guards focused on navigation logic only. "),t(),n(103,"li"),e(104," Avoid placing heavy business logic inside guards. "),t(),n(105,"li"),e(106," Use services to handle authentication or permission checks. "),t(),n(107,"li"),e(108," Prefer functional guards for modern standalone applications. "),t(),n(109,"li"),e(110," Use Resolve guards to improve loading experience. "),t()(),n(111,"h3"),e(112,"Summary"),t(),n(113,"p"),e(114," Route Guards provide essential control over navigation in Angular applications. By protecting routes, managing access, and ensuring data readiness before navigation, guards help build secure, user-friendly, and scalable applications. Understanding guard types and modern functional guard patterns is key to building robust routing systems. "),t()()),s&2&&(a("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints),r(39),a("textContent",i.canActivateExample),r(7),a("textContent",i.canDeactivateExample),r(7),a("textContent",i.canLoadExample),r(7),a("textContent",i.resolveExample),r(7),a("textContent",i.routeConfigExample),r(10),a("textContent",i.functionalGuardExample))},dependencies:[c],encapsulation:2})}}return l})();export{v as GuardExample};
