import{a as l}from"./chunk-KUX6U2KE.js";import"./chunk-MMO3VR6A.js";import{Eb as s,Fb as t,Gb as n,ec as e,jb as r}from"./chunk-HJWRZBIA.js";var p={title:"Standalone Components in Angular: Simplifying Application Structure",tags:["Angular","Standalone Components","Architecture","Components","Best Practices"],paragraphs:["Standalone components in Angular represent a shift towards a module-less architecture, allowing developers to create components, directives, and pipes that can be used independently without declaring them in an NgModule. Introduced in Angular 14, this feature simplifies project structure, reduces boilerplate, and enhances tree-shaking for better performance. This content provides a detailed explanation of standalone components, their usage, and integration."],keyPoints:["Standalone: Components, directives, and pipes that don't require an NgModule declaration.","Simplification: Reduces the need for modules, making apps easier to build and maintain.","Imports: Directly import dependencies within the component itself.","Bootstrap: Applications can be bootstrapped without a root module using standalone components."],sections:[{id:"what-are-standalone-components",heading:"What Are Standalone Components?",content:"Standalone components are self-contained units in Angular that encapsulate their own dependencies, templates, and styles. Unlike traditional components, they are marked with the 'standalone: true' flag and handle their imports directly.",list:["Introduced in Angular v14 to streamline development","Can be used for components, directives, and pipes","Eliminate the need for NgModules in many scenarios"],additionalExplanation:"This approach promotes a more functional style of programming in Angular, where each entity manages its own concerns."},{id:"benefits",heading:"Benefits of Standalone Components",content:"Adopting standalone components offers several advantages, particularly in terms of code organization, build optimization, and developer experience.",list:["Reduced boilerplate by avoiding unnecessary module files","Improved tree-shaking, leading to smaller bundle sizes","Easier lazy loading and routing without module dependencies","Simplified migration and scalability for large applications"],additionalExplanation:"Standalone components make it easier to reason about dependencies at a granular level, reducing errors and improving maintainability."},{id:"implementation",heading:"How to Implement Standalone Components",content:"To create a standalone component, set the 'standalone' property to true in the @Component decorator and list dependencies in the 'imports' array.",list:["Mark the component with standalone: true","Import modules, components, or other standalone entities directly","Use in routing or other components by importing them"],additionalExplanation:"Standalone components can be imported into other standalone components or legacy modules, providing flexibility during transitions."},{id:"migration-and-integration",heading:"Migration and Integration",content:"Migrating to standalone components involves refactoring existing module-based code. Angular provides tools like schematics to assist in this process.",list:["Use ng generate component --standalone to create new ones","Convert existing components by adding standalone: true and moving declarations","Integrate with existing modules by importing standalone components into NgModules","Bootstrap the app using bootstrapApplication for fully standalone apps"],additionalExplanation:"For hybrid applications, standalone and module-based components can coexist, allowing gradual migration."}],codeExamples:[{title:"Basic Standalone Component Example",language:"typescript",code:`import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: \`<p>Hello, Standalone Component!</p>\`
})
export class HelloComponent { }`,description:"A simple standalone component that imports CommonModule for directives like ngIf or ngFor."},{title:"Standalone Component with Dependencies Example",language:"typescript",code:`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component'; // Assuming ButtonComponent is also standalone

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  template: \`
    <input [(ngModel)]="name" />
    <app-button (click)="submit()">Submit</app-button>
  \`
})
export class FormComponent {
  name: string = '';
  submit() { console.log(this.name); }
}`,description:"Demonstrates importing Angular modules and other standalone components."},{title:"Routing with Standalone Components Example",language:"typescript",code:`import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

const routes = [
  { path: '', component: AppComponent },
  { path: 'hello', component: HelloComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});`,description:"Shows how to set up routing and bootstrap an application using standalone components without an AppModule."},{title:"Standalone Directive Example",language:"typescript",code:`import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}`,description:"An example of a standalone directive that can be imported directly into components."}],bestPractices:["Use standalone components for new projects to minimize module overhead.","Import only necessary dependencies to keep components lightweight.","Leverage Angular's migration schematics for converting module-based code.","Combine with lazy loading for optimal performance in routed applications.","Test standalone components in isolation to ensure self-containment."]};var h=(()=>{class i{constructor(){this.content=p}static{this.\u0275fac=function(a){return new(a||i)}}static{this.\u0275cmp=r({type:i,selectors:[["app-standalone"]],decls:39,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"]],template:function(a,o){a&1&&(t(0,"app-topic-template",0)(1,"p"),e(2," Standalone components, introduced in Angular 14 and becoming the default in Angular 17+, represent a major shift in how Angular applications are structured. Unlike traditional NgModule-based components, standalone components don't require declaration in an NgModule, simplifying the development experience and reducing boilerplate code. "),n(),t(3,"p"),e(4," With standalone components, each component explicitly declares its dependencies through the "),t(5,"code"),e(6,"imports"),n(),e(7," array in the @Component decorator. This makes components more self-contained, easier to understand, and simpler to test. The standalone approach is now the recommended way to build Angular applications. "),n(),t(8,"h3"),e(9,"Benefits of Standalone Components"),n(),t(10,"ul")(11,"li")(12,"strong"),e(13,"Simplified Mental Model:"),n(),e(14," No need to think about NgModule organization "),n(),t(15,"li")(16,"strong"),e(17,"Less Boilerplate:"),n(),e(18," Fewer files and less configuration "),n(),t(19,"li")(20,"strong"),e(21,"Better Tree-Shaking:"),n(),e(22," Unused imports are easier to eliminate "),n(),t(23,"li")(24,"strong"),e(25,"Easier Testing:"),n(),e(26," Components are self-contained units "),n(),t(27,"li")(28,"strong"),e(29,"Flexible Imports:"),n(),e(30," Import only what you need, where you need it "),n(),t(31,"li")(32,"strong"),e(33,"Modern Best Practice:"),n(),e(34," Aligned with Angular's future direction "),n()(),t(35,"h3"),e(36,"Migration Path"),n(),t(37,"p"),e(38," Existing NgModule-based applications can gradually migrate to standalone components. Angular provides schematics to automate much of the migration process. Both approaches can coexist in the same application during the transition period. "),n()()),a&2&&s("title",o.content.title)("tags",o.content.tags)("paragraphs",o.content.paragraphs)("sections",o.content.sections)("codeExamples",o.content.codeExamples)("bestPractices",o.content.bestPractices)("keyPoints",o.content.keyPoints)},dependencies:[l],encapsulation:2})}}return i})();export{h as Standalone};
