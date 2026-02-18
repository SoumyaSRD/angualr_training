import{a as l}from"./chunk-KUX6U2KE.js";import"./chunk-MMO3VR6A.js";import{Eb as o,Fb as r,Gb as t,Hb as c,Wa as s,ec as e,jb as d}from"./chunk-HJWRZBIA.js";var p={title:"Angular Decorators: In-Depth Explanation, Types, Usage, Custom Decorators, and Best Practices",tags:["Angular","Decorators","TypeScript","Metadata","Component","Directive","Pipe","Injectable","Custom Decorators","Best Practices"],paragraphs:["Decorators are a core feature of Angular and one of the most powerful capabilities borrowed from TypeScript. They are special kind of declarations that can attach metadata to classes, methods, properties, parameters, or accessors, and Angular uses them extensively to define components, directives, pipes, services, modules, and more. Decorators allow Angular to collect configuration information at design time and use it at runtime to control behavior, dependency injection, change detection, and rendering. This comprehensive guide explains decorators in detail: how they work, all the built-in Angular decorators, how to create custom decorators, parameter decorators, property decorators, method decorators, advanced patterns, and best practices for writing clean, maintainable, and powerful Angular applications."],keyPoints:["Decorators: Functions that add metadata and modify behavior of classes/methods/properties.","Built-in Angular Decorators: @Component, @Directive, @Pipe, @Injectable, @NgModule, @Input, @Output, @HostListener, @HostBinding, etc.","Class Decorators: Modify or observe the class definition (most common in Angular).","Property & Parameter Decorators: Used for inputs, injections, bindings (@Input, @Inject, @Optional).","Method Decorators: Used for event handling (@HostListener).","Custom Decorators: Create reusable behavior for validation, logging, authorization, etc.","Metadata Reflection: Angular uses reflect-metadata to read decorator information at runtime."],sections:[{id:"what-are-decorators",heading:"What Are Decorators in Angular / TypeScript?",content:"Decorators are a TypeScript feature (enabled with experimentalDecorators) that allow you to attach metadata to classes, methods, properties, or parameters using a special syntax (@expression). In Angular, decorators are the primary way to tell the framework how to process and use your classes.",list:["Executed at runtime when the class is defined (not when instantiated)","Can modify the constructor, add metadata, or wrap behavior","Angular reads decorator metadata using reflect-metadata library","Syntax: @DecoratorName(options) or @DecoratorName","Can be stacked (multiple decorators on the same target)"],additionalExplanation:"Without decorators, Angular would require much more boilerplate (manual registration, explicit configuration). Decorators make Angular declarative and expressive \u2014 you describe what something is, and Angular handles how it behaves."},{id:"how-decorators-work",heading:"How Decorators Work Under the Hood",content:"Decorators are functions that receive specific arguments depending on what they decorate (class, property, method, parameter). They are called at definition time and can return a value to replace or modify the target.",list:["Class decorator receives the constructor function","Property decorator receives target and property name","Method decorator receives target, property name, and descriptor","Parameter decorator receives target, property name, and parameter index","Angular stores metadata using Reflect.defineMetadata()"],additionalExplanation:"The reflect-metadata polyfill is required (included by default in Angular CLI projects). Angular's compiler uses this metadata to generate efficient rendering instructions, DI tokens, and more."},{id:"built-in-angular-decorators",heading:"Built-in Angular Decorators",content:"Angular provides a rich set of decorators for defining building blocks and configuring behavior.",list:["@Component \u2014 Defines a component with template, styles, selector, etc.","@Directive \u2014 Defines attribute or structural directives","@Pipe \u2014 Defines custom pipes (pure/impure)","@Injectable \u2014 Marks a class as injectable (provides DI metadata)","@NgModule \u2014 Defines Angular modules (deprecated in favor of standalone)","@Input \u2014 Binds property to parent input","@Output \u2014 Creates an event emitter for parent communication","@HostListener \u2014 Listens to host element events","@HostBinding \u2014 Binds host element properties/attributes","@ViewChild / @ViewChildren \u2014 Queries view DOM","@ContentChild / @ContentChildren \u2014 Queries projected content","@Optional, @SkipSelf, @Self, @Inject \u2014 Fine-tune dependency injection"],additionalExplanation:"These decorators are the language Angular uses to describe your application's structure and behavior."},{id:"custom-decorators",heading:"Creating Custom Decorators",content:"You can create your own decorators to encapsulate reusable behavior, such as logging, validation, authorization checks, or metadata collection.",list:["Class decorator: function MyDecorator(config) { return function (constructor) {...} }","Property decorator: function LogProperty(target, propertyKey) {...}","Method decorator: function LogMethod(target, propertyKey, descriptor) {...}","Parameter decorator: function LogParameter(target, propertyKey, parameterIndex) {...}","Factory pattern: function MyDecorator(options) { return function(target) {...} }"],additionalExplanation:"Custom decorators are especially useful in libraries, enterprise applications, or when enforcing conventions (e.g., @LogExecutionTime, @Authorize, @Deprecated)."},{id:"advanced-decorator-patterns",heading:"Advanced Decorator Patterns & Use Cases",content:"Decorators become even more powerful when combined creatively.",list:["Decorator factories (accept parameters)","Combining multiple decorators","Storing and reading custom metadata with Reflect.getMetadata","Decorators for validation (like class-validator style)","Decorators for automatic subscription cleanup","Decorators that enforce architectural rules"],additionalExplanation:"Advanced usage can dramatically reduce boilerplate and enforce consistency across large codebases."}],codeExamples:[{title:"Basic @Component Decorator",language:"typescript",code:`@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: \`<h1>{{ name }}</h1>\`,
  styles: ['h1 { color: blue; }']
})
export class HeroComponent {
  name = 'Superman';
}`,description:"Standard component definition using @Component."},{title:"Custom Class Decorator Example",language:"typescript",code:`function LogClass(message: string) {
  return function (constructor: Function) {
    console.log(\`\${message}: \${constructor.name} created\`);
  };
}

@LogClass('Class Instantiation')
export class UserService {
  // ...
}`,description:"Simple class decorator that logs when the class is defined."},{title:"Custom Method Decorator \u2013 Log Execution Time",language:"typescript",code:`function LogTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.time(propertyKey);
    const result = originalMethod.apply(this, args);
    console.timeEnd(propertyKey);
    return result;
  };
  return descriptor;
}

export class DataService {
  @LogTime
  fetchLargeData() {
    // expensive operation
  }
}`,description:"Method decorator that measures and logs execution time."},{title:"Custom Parameter Decorator \u2013 Mark Required",language:"typescript",code:`function Required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata('required', target, propertyKey) || [];
  Reflect.defineMetadata('required', [...existingRequiredParameters, parameterIndex], target, propertyKey);
}

export class UserController {
  createUser(@Required name: string, age: number) {
    // validation logic can read metadata
  }
}`,description:"Parameter decorator to mark required parameters (can be used with validation logic)."}],bestPractices:["Use built-in Angular decorators for their intended purpose \u2014 don't reinvent them.","Keep custom decorators small and focused (single responsibility).","Always document custom decorators: purpose, parameters, usage examples.","Prefer decorator factories when configuration is needed.","Avoid heavy logic inside decorators \u2014 they run at definition time.","Use metadata reflection carefully \u2014 it's powerful but can make debugging harder.","Test custom decorators thoroughly (especially method/property ones).","In large teams, establish conventions for custom decorator usage.","Be cautious with method decorators that replace behavior \u2014 preserve original functionality.","Combine decorators sensibly \u2014 order can matter in some cases.","In modern Angular (standalone), decorators remain just as important."]};var v=(()=>{class n{constructor(){this.content=p,this.serviceExample=`
@Injectable({
  providedIn: 'root'
})
export class DataService {

  getMessage() {
    return 'Hello from Angular Service!';
  }

}
`,this.injectionExample=`
constructor(private dataService: DataService) {}

ngOnInit() {
  console.log(this.dataService.getMessage());
}
`,this.componentExample=`
@Component({
  selector: 'app-example',
  standalone: true,
  template: '<h1>Hello Angular</h1>'
})
export class ExampleComponent {}
`}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=d({type:n,selectors:[["app-decorator"]],decls:44,vars:10,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(i,a){i&1&&(r(0,"app-topic-template",0)(1,"h3"),e(2,"Decorators in Angular"),t(),r(3,"p"),e(4," Decorators are special annotations in Angular that provide metadata about classes, properties, and methods. Angular uses this metadata to understand how components, services, directives, and pipes should behave. "),t(),r(5,"h3"),e(6,"Example: Injectable Decorator (Service)"),t(),r(7,"p"),e(8," The "),r(9,"strong"),e(10,"@Injectable"),t(),e(11," decorator marks a class as available for dependency injection. "),t(),r(12,"pre"),c(13,"code",1),e(14,`
`),t(),r(15,"h3"),e(16,"Example: Injecting Service into Component"),t(),r(17,"pre"),c(18,"code",1),e(19,`
`),t(),r(20,"h3"),e(21,"Example: Component Decorator"),t(),r(22,"pre"),c(23,"code",1),e(24,`
`),t(),r(25,"h3"),e(26,"Key Benefits of Using Decorators"),t(),r(27,"ul")(28,"li")(29,"strong"),e(30,"Metadata configuration"),t(),e(31," for Angular features."),t(),r(32,"li")(33,"strong"),e(34,"Cleaner architecture"),t(),e(35," separating configuration and logic."),t(),r(36,"li")(37,"strong"),e(38,"Better readability"),t(),e(39," of component structure."),t(),r(40,"li")(41,"strong"),e(42,"Framework integration"),t(),e(43," with Angular compiler."),t()()()),i&2&&(o("title",a.content.title)("tags",a.content.tags)("paragraphs",a.content.paragraphs)("sections",a.content.sections)("codeExamples",a.content.codeExamples)("bestPractices",a.content.bestPractices)("keyPoints",a.content.keyPoints),s(13),o("textContent",a.serviceExample),s(5),o("textContent",a.injectionExample),s(5),o("textContent",a.componentExample))},dependencies:[l],styles:[".container[_ngcontent-%COMP%]{padding:var(--spacing-md, 20px);max-width:800px;margin:0 auto}.comparison[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:var(--spacing-lg, 20px);margin:var(--spacing-xl, 30px) 0}.method[_ngcontent-%COMP%]{padding:var(--spacing-md, 20px);border:2px solid var(--border-color, #ddd);border-radius:var(--border-radius-md, 10px);background:var(--surface-variant, #f9f9f9);transition:border-color var(--transition-fast)}.method[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;color:var(--text-primary, #333)}input[_ngcontent-%COMP%]{width:100%;padding:var(--spacing-xs, 8px);margin:var(--spacing-sm, 10px) 0;border:1px solid var(--border-color, #ccc);border-radius:var(--border-radius-xs, 4px);background:var(--surface-color);color:var(--text-primary);font-family:var(--font-family)}input[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--primary-color)}button[_ngcontent-%COMP%]{background:var(--primary-color, #007bff);color:var(--text-on-primary, white);border:none;padding:var(--spacing-xs, 8px) var(--spacing-md, 16px);border-radius:var(--border-radius-xs, 4px);cursor:pointer;margin-top:var(--spacing-sm, 10px);transition:background-color var(--transition-fast)}button[_ngcontent-%COMP%]:hover{background:var(--primary-dark, #0056b3)}.info[_ngcontent-%COMP%]{background:var(--surface-variant);padding:var(--spacing-md, 15px);border-radius:var(--border-radius-sm, 8px);margin-top:var(--spacing-md, 20px);border-left:4px solid var(--primary-color);color:var(--text-secondary)}"]})}}return n})();export{v as DecoratorExample};
