import{b as l}from"./chunk-RU5UJ4ZI.js";import{Ka as r,ab as s,bb as o,cb as e,wb as t}from"./chunk-6SFLLJLD.js";var d={title:"Angular Modules: Root, Feature, Shared, and Core",tags:["Angular","Modules","Architecture","Best Practices"],paragraphs:["In Angular, modules are a fundamental part of the application's architecture. They help organize code, manage dependencies, and enable lazy loading for better performance. This content explores the four key types of modules: Root, Feature, Shared, and Core."],keyPoints:["Root Module: The main module that bootstraps the Angular application.","Feature Modules: Encapsulate specific features or functionalities.","Shared Modules: Contain reusable components, directives, and pipes.","Core Modules: House singleton services and application-wide components."],sections:[{id:"root-module",heading:"Root Module",content:"The Root Module, typically named AppModule, is the entry point of an Angular application. It is responsible for bootstrapping the root component (usually AppComponent) and declaring the application's top-level dependencies.",list:["Defined in app.module.ts","Imports BrowserModule for browser-specific services","Bootstraps the application using Angular's bootstrapModule function"],additionalExplanation:"The Root Module should be kept lightweight, focusing only on application-level configurations."},{id:"feature-modules",heading:"Feature Modules",content:"Feature Modules organize code related to a specific feature or domain, such as user management or product catalog. They promote modularity and can be lazy-loaded to improve initial load times.",list:["Encapsulate components, services, and routes for a feature","Imported into the Root Module or other modules as needed","Support lazy loading via Angular's routing module"],additionalExplanation:"Using Feature Modules helps in scaling large applications by dividing them into manageable parts."},{id:"shared-modules",heading:"Shared Modules",content:"Shared Modules contain components, directives, and pipes that are used across multiple Feature Modules. They prevent code duplication by exporting reusable elements.",list:["Exports common UI components like buttons or forms","Imported by Feature Modules that need the shared elements","Does not include services to avoid multiple instances"],additionalExplanation:"Services should not be provided in Shared Modules; instead, use Core Modules for singleton services."},{id:"core-modules",heading:"Core Modules",content:"Core Modules are designed for application-wide singleton services, guards, interceptors, and components that are used only once, such as headers or footers.",list:["Imported only once in the Root Module","Provides services with providedIn: 'root' or in the module's providers array","Ensures single instances of services throughout the app"],additionalExplanation:"Loading the Core Module eagerly ensures that singleton services are available from the start."}],codeExamples:[{title:"Root Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }`,description:"This is a basic example of the AppModule, importing necessary modules and bootstrapping the app."},{title:"Feature Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule]
})
export class UserModule { }`,description:"A simple Feature Module for user-related functionality."},{title:"Shared Module Example",language:"typescript",code:`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './custom-button.component';

@NgModule({
  declarations: [CustomButtonComponent],
  imports: [CommonModule],
  exports: [CustomButtonComponent]
})
export class SharedModule { }`,description:"Exports a reusable button component for use in other modules."},{title:"Core Module Example",language:"typescript",code:`import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}`,description:"Provides singleton services and guards against multiple imports."}],bestPractices:["Keep the Root Module clean and import other modules as needed.","Use lazy loading for Feature Modules to optimize performance.","Export only what's necessary from Shared Modules.","Ensure Core Modules are imported only once to maintain singletons.","Follow the SCAM (Single Component Angular Module) pattern where appropriate for better tree-shaking."]};var h=(()=>{class i{constructor(){this.content=d}static{this.\u0275fac=function(a){return new(a||i)}}static{this.\u0275cmp=r({type:i,selectors:[["app-all_modules"]],decls:55,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"]],template:function(a,n){a&1&&(o(0,"app-topic-template",0)(1,"p"),t(2," Angular Modules (NgModules) are a fundamental concept used to organize an application into cohesive blocks of functionality. They help group related components, directives, pipes, and services together, making large applications easier to manage, maintain, and scale. Although standalone components are now recommended in modern Angular, understanding module types remains important, especially when working with existing applications. "),e(),o(3,"p"),t(4," Angular applications commonly use different types of modules such as Root, Feature, Shared, and Core modules. Each module type serves a specific purpose in structuring the application and promoting separation of concerns and code reusability. "),e(),o(5,"h3"),t(6,"Types of Angular Modules"),e(),o(7,"ul")(8,"li")(9,"strong"),t(10,"Root Module (AppModule):"),e(),t(11," The main entry point of the application. It bootstraps the root component and imports essential modules required to start the app. "),e(),o(12,"li")(13,"strong"),t(14,"Feature Modules:"),e(),t(15," Modules designed for specific features or sections of the application (e.g., user, admin, dashboard). They help keep functionality isolated and support lazy loading. "),e(),o(16,"li")(17,"strong"),t(18,"Shared Module:"),e(),t(19," Contains reusable components, directives, and pipes that are used across multiple feature modules. It promotes code reuse and reduces duplication. "),e(),o(20,"li")(21,"strong"),t(22,"Core Module:"),e(),t(23," Holds singleton services, global components, and application-wide functionality such as authentication, interceptors, or configuration services. Typically imported only once in the root module. "),e()(),o(24,"h3"),t(25,"Benefits of Using Angular Modules"),e(),o(26,"ul")(27,"li")(28,"strong"),t(29,"Better Organization:"),e(),t(30," Helps structure large applications into logical units "),e(),o(31,"li")(32,"strong"),t(33,"Code Reusability:"),e(),t(34," Shared functionality can be reused across modules "),e(),o(35,"li")(36,"strong"),t(37,"Lazy Loading Support:"),e(),t(38," Feature modules can be loaded on demand "),e(),o(39,"li")(40,"strong"),t(41,"Separation of Concerns:"),e(),t(42," Clear boundaries between features and shared logic "),e(),o(43,"li")(44,"strong"),t(45,"Maintainability:"),e(),t(46," Easier to maintain and scale as the application grows "),e(),o(47,"li")(48,"strong"),t(49,"Structured Dependency Management:"),e(),t(50," Helps manage providers and dependencies effectively "),e()(),o(51,"h3"),t(52,"Modern Considerations"),e(),o(53,"p"),t(54," While NgModules remain relevant, modern Angular encourages the use of standalone components and APIs to reduce complexity. However, module-based architecture is still widely used and can coexist with standalone approaches during migration or in legacy applications. "),e()()),a&2&&s("title",n.content.title)("tags",n.content.tags)("paragraphs",n.content.paragraphs)("sections",n.content.sections)("codeExamples",n.content.codeExamples)("bestPractices",n.content.bestPractices)("keyPoints",n.content.keyPoints)},dependencies:[l],encapsulation:2})}}return i})();export{h as AllModules};
