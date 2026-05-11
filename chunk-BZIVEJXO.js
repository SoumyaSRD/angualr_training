import{j as c,y as p}from"./chunk-QXA3BHRF.js";import"./chunk-6J7NVHL7.js";import{Cb as e,Ma as m,db as a,eb as n,fb as t,gb as s,za as l}from"./chunk-LWJ6XB4K.js";var u=(()=>{class o{constructor(){this.content=p,this.serviceExample=`
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
`}static{this.\u0275fac=function(r){return new(r||o)}}static{this.\u0275cmp=m({type:o,selectors:[["app-decorator"]],decls:44,vars:10,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(r,i){r&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"Decorators in Angular"),t(),n(3,"p"),e(4," Decorators are special annotations in Angular that provide metadata about classes, properties, and methods. Angular uses this metadata to understand how components, services, directives, and pipes should behave. "),t(),n(5,"h3"),e(6,"Example: Injectable Decorator (Service)"),t(),n(7,"p"),e(8," The "),n(9,"strong"),e(10,"@Injectable"),t(),e(11," decorator marks a class as available for dependency injection. "),t(),n(12,"pre"),s(13,"code",1),e(14,`
`),t(),n(15,"h3"),e(16,"Example: Injecting Service into Component"),t(),n(17,"pre"),s(18,"code",1),e(19,`
`),t(),n(20,"h3"),e(21,"Example: Component Decorator"),t(),n(22,"pre"),s(23,"code",1),e(24,`
`),t(),n(25,"h3"),e(26,"Key Benefits of Using Decorators"),t(),n(27,"ul")(28,"li")(29,"strong"),e(30,"Metadata configuration"),t(),e(31," for Angular features."),t(),n(32,"li")(33,"strong"),e(34,"Cleaner architecture"),t(),e(35," separating configuration and logic."),t(),n(36,"li")(37,"strong"),e(38,"Better readability"),t(),e(39," of component structure."),t(),n(40,"li")(41,"strong"),e(42,"Framework integration"),t(),e(43," with Angular compiler."),t()()()),r&2&&(a("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints),l(13),a("textContent",i.serviceExample),l(5),a("textContent",i.injectionExample),l(5),a("textContent",i.componentExample))},dependencies:[c],encapsulation:2})}}return o})();export{u as DecoratorExample};
