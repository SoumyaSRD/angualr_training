import{b as d}from"./chunk-RU5UJ4ZI.js";import{Ka as c,ab as r,bb as n,cb as t,db as o,wb as e,xa as i}from"./chunk-6SFLLJLD.js";var u={title:"Angular Route Guards: In-Depth Guide \u2013 Types, Implementation, Functional Guards, Examples & Best Practices",tags:["Angular","Route Guards","CanActivate","CanDeactivate","CanMatch","CanLoad","Resolve","Authentication","Authorization","Navigation","Best Practices"],paragraphs:["Route Guards are one of the most powerful features of the Angular Router. They allow you to control navigation by deciding whether a route can be activated, loaded, or deactivated, and they enable you to fetch data before a route is displayed. Guards are essential for implementing authentication, authorization, preventing unsaved changes, restricting access to certain routes, and preloading data. This comprehensive guide covers every type of guard in detail: CanActivate, CanActivateChild, CanDeactivate, CanMatch, CanLoad, Resolve (technically a resolver but often grouped with guards), functional guards (modern approach), combining multiple guards, handling asynchronous logic, and real-world best practices to make your Angular application secure, user-friendly, and performant."],keyPoints:["Guards: Functions or classes that run before/after navigation and return true, false, UrlTree, Observable<boolean>, Promise<boolean>, etc.","CanActivate: Protects a route from being entered (most common).","CanActivateChild: Protects child routes of a parent.","CanDeactivate: Prevents leaving a route (e.g., unsaved form).","CanMatch: Decides which of multiple matching routes to activate (Angular 14+).","CanLoad: Prevents lazy-loaded modules from being loaded (great for performance + security).","Resolve: Pre-fetches data before route activation (often used together with guards).","Functional Guards: Modern, preferred way (no class needed) \u2013 Angular 14+.","Return Types: boolean, UrlTree (redirect), Observable<boolean | UrlTree>, Promise<boolean | UrlTree>"],sections:[{id:"what-are-route-guards",heading:"What Are Route Guards?",content:"Route guards are services or functions that Angular Router calls during navigation to decide whether the navigation should proceed, be cancelled, or redirected elsewhere. They run at specific points in the navigation lifecycle and give developers full control over access and data preparation.",list:["Executed before the route component is instantiated","Can return synchronously or asynchronously (Promise / Observable)","Can redirect to another route using UrlTree","Can run multiple guards in sequence (all must pass)","Support both class-based (legacy) and functional (modern) styles"],additionalExplanation:"Guards are the primary mechanism for implementing security (auth checks), UX improvements (confirm discard changes), and performance optimizations (prevent loading heavy modules)."},{id:"guard-types",heading:"Types of Route Guards",content:"Angular provides several guard interfaces, each with a specific purpose.",list:["CanActivate: Controls whether a route can be activated","CanActivateChild: Controls child routes of a component","CanDeactivate: Controls whether user can leave the current route","CanMatch: Chooses which route to activate when multiple paths match (v14+)","CanLoad: Prevents loading of lazy-loaded modules (before download)","Resolve: Fetches data before activation (not a true guard but used similarly)"],additionalExplanation:"CanActivate and CanLoad are the most commonly used for authentication. CanDeactivate is critical for form-heavy applications. CanMatch is powerful for role-based routing."},{id:"functional-guards",heading:"Functional Guards \u2013 The Modern Recommended Approach",content:"Since Angular 14, functional guards are preferred over class-based guards. They are simpler, tree-shakable, and easier to test.",list:["Defined as plain functions (CanActivateFn, CanDeactivateFn, etc.)","Use inject() to get services inside the function","Return boolean, UrlTree, Observable<boolean | UrlTree>, Promise<boolean | UrlTree>","No need to create injectable classes just for guards"],additionalExplanation:"Functional guards are now the standard in Angular documentation and community projects. They reduce boilerplate and align with standalone components."},{id:"real-world-use-cases",heading:"Real-World Use Cases for Guards",content:"Guards solve many common application requirements.",list:["Authentication: Only logged-in users can access dashboard","Authorization: Admins only can access /admin routes","Unsaved Changes: Warn before leaving a dirty form","Data Preloading: Ensure data is ready before showing component","Role-Based Routing: Different layouts/routes for different user roles","Prevent Lazy Module Loading: Block unauthorized users from downloading code"],additionalExplanation:"Combining guards with resolvers is a very common pattern for secure, smooth user experiences."}],codeExamples:[{title:"Functional CanActivate Guard (Auth Check)",language:"typescript",code:`import { inject } from '@angular/core';
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
}`,description:"Route config combining guard and resolver for secure, preloaded data."}],bestPractices:["Prefer functional guards over class-based guards in Angular 14+.","Use inject() inside functional guards to get services.","Always return UrlTree for redirects instead of navigating imperatively.","Preserve the attempted URL using queryParams or state for post-login redirect.","Combine multiple guards when needed (they run sequentially).","Keep guards fast \u2013 avoid heavy computations or long-running operations.","Use CanLoad instead of CanActivate for lazy-loaded protected routes (saves bandwidth).","Implement CanDeactivate for all forms that can be edited.","Centralize auth logic in an AuthService \u2013 guards should only call service methods.","Handle guard errors gracefully (show error page or log out).","Test guards thoroughly \u2013 mock services and test all return types.","Use CanMatch for advanced role-based or feature-flag routing scenarios."]};var f=(()=>{class s{constructor(){this.content=u,this.canActivateExample=`
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
`}static{this.\u0275fac=function(l){return new(l||s)}}static{this.\u0275cmp=c({type:s,selectors:[["app-guard-eg"]],decls:115,vars:13,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(l,a){l&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"Route Guards in Angular"),t(),n(3,"p"),e(4," Route Guards are a powerful feature of Angular Router that allow developers to control navigation within an application. They help determine whether a user can access a route, leave a route, or load specific modules based on certain conditions such as authentication, permissions, or unsaved changes. Guards act as checkpoints during the routing process and enhance both application security and user experience. "),t(),n(5,"p"),e(6," Angular applications often require restrictions such as allowing only logged-in users to access certain pages or preventing navigation away from a form with unsaved data. Route Guards provide a structured and reusable way to implement such logic. "),t(),n(7,"h3"),e(8,"Why Use Route Guards?"),t(),n(9,"ul")(10,"li")(11,"strong"),e(12,"Authentication Control:"),t(),e(13," Restrict access to authenticated users. "),t(),n(14,"li")(15,"strong"),e(16,"Authorization Management:"),t(),e(17," Allow access based on user roles or permissions. "),t(),n(18,"li")(19,"strong"),e(20,"Prevent Data Loss:"),t(),e(21," Stop users from leaving pages with unsaved changes. "),t(),n(22,"li")(23,"strong"),e(24,"Lazy Loading Protection:"),t(),e(25," Control whether feature modules should load. "),t(),n(26,"li")(27,"strong"),e(28,"Improved Navigation Logic:"),t(),e(29," Centralize route-related conditions. "),t()(),n(30,"h3"),e(31,"Types of Route Guards"),t(),n(32,"p"),e(33," Angular provides several types of route guards, each designed for specific navigation scenarios. "),t(),n(34,"h4"),e(35,"1. CanActivate"),t(),n(36,"p"),e(37," Determines whether a route can be activated. Commonly used for authentication checks. "),t(),n(38,"pre"),o(39,"code",1),e(40,`
`),t(),n(41,"h4"),e(42,"2. CanDeactivate"),t(),n(43,"p"),e(44," Determines whether a user can leave a route. Often used to warn users about unsaved form changes. "),t(),n(45,"pre"),o(46,"code",1),e(47,`
`),t(),n(48,"h4"),e(49,"3. CanLoad"),t(),n(50,"p"),e(51," Prevents lazy-loaded modules from loading unless certain conditions are met. Useful for protecting large feature areas. "),t(),n(52,"pre"),o(53,"code",1),e(54,`
`),t(),n(55,"h4"),e(56,"4. Resolve"),t(),n(57,"p"),e(58," Fetches required data before navigating to a route. This ensures that the component has the data ready when it loads. "),t(),n(59,"pre"),o(60,"code",1),e(61,`
`),t(),n(62,"h3"),e(63,"Using Guards in Route Configuration"),t(),n(64,"p"),e(65," Guards are applied in route configuration by referencing the guard class or function inside route definitions. "),t(),n(66,"pre"),o(67,"code",1),e(68,`
`),t(),n(69,"h3"),e(70,"Modern Functional Guards (Angular Standalone)"),t(),n(71,"p"),e(72," Modern Angular versions introduced functional guards, which provide a simpler and more lightweight alternative to class-based guards. Functional guards use the "),n(73,"code"),e(74,"inject()"),t(),e(75," function to access dependencies directly. "),t(),n(76,"pre"),o(77,"code",1),e(78,`
`),t(),n(79,"h3"),e(80,"Guard Execution Flow"),t(),n(81,"ul")(82,"li"),e(83,"Angular starts navigation when a route change is triggered."),t(),n(84,"li"),e(85,"Guards run before loading or activating the route."),t(),n(86,"li"),e(87,"If a guard returns "),n(88,"code"),e(89,"true"),t(),e(90,", navigation continues."),t(),n(91,"li"),e(92,"If a guard returns "),n(93,"code"),e(94,"false"),t(),e(95,", navigation is cancelled."),t(),n(96,"li"),e(97,"Guards can also redirect users to other routes."),t()(),n(98,"h3"),e(99,"Best Practices for Route Guards"),t(),n(100,"ul")(101,"li"),e(102," Keep guards focused on navigation logic only. "),t(),n(103,"li"),e(104," Avoid placing heavy business logic inside guards. "),t(),n(105,"li"),e(106," Use services to handle authentication or permission checks. "),t(),n(107,"li"),e(108," Prefer functional guards for modern standalone applications. "),t(),n(109,"li"),e(110," Use Resolve guards to improve loading experience. "),t()(),n(111,"h3"),e(112,"Summary"),t(),n(113,"p"),e(114," Route Guards provide essential control over navigation in Angular applications. By protecting routes, managing access, and ensuring data readiness before navigation, guards help build secure, user-friendly, and scalable applications. Understanding guard types and modern functional guard patterns is key to building robust routing systems. "),t()()),l&2&&(r("title",a.content.title)("tags",a.content.tags)("paragraphs",a.content.paragraphs)("sections",a.content.sections)("codeExamples",a.content.codeExamples)("bestPractices",a.content.bestPractices)("keyPoints",a.content.keyPoints),i(39),r("textContent",a.canActivateExample),i(7),r("textContent",a.canDeactivateExample),i(7),r("textContent",a.canLoadExample),i(7),r("textContent",a.resolveExample),i(7),r("textContent",a.routeConfigExample),i(10),r("textContent",a.functionalGuardExample))},dependencies:[d],encapsulation:2})}}return s})();export{f as GuardExample};
