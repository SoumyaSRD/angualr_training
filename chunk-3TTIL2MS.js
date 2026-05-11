import{N as c,j as d}from"./chunk-QXA3BHRF.js";import"./chunk-6J7NVHL7.js";import{Cb as e,Ma as s,db as r,eb as i,fb as t,gb as o,za as a}from"./chunk-LWJ6XB4K.js";var u=(()=>{class l{constructor(){this.content=c,this.formControlExample=`
name = new FormControl('');
`,this.formGroupExample=`
form = new FormGroup({
  username: new FormControl(''),
  email: new FormControl('')
});
`,this.formArrayExample=`
items = new FormArray([
  new FormControl('Item 1'),
  new FormControl('Item 2')
]);
`,this.reactiveFormSetupExample=`
form = this.fb.group({
  username: [''],
  password: ['']
});
`,this.reactiveTemplateExample=`
<form [formGroup]="form">
  <input formControlName="username">
</form>
`,this.validationExample=`
username: ['', [Validators.required, Validators.minLength(3)]]
`,this.valueChangesExample=`
this.form.valueChanges.subscribe(value => {
  console.log(value);
});
`}static{this.\u0275fac=function(m){return new(m||l)}}static{this.\u0275cmp=s({type:l,selectors:[["app-reactive-form-eg"]],decls:129,vars:14,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(m,n){m&1&&(i(0,"app-topic-template",0)(1,"h3"),e(2,"Reactive Forms Introduction"),t(),i(3,"p"),e(4," Reactive Forms in Angular provide a model-driven approach to handling form inputs, validation, and state management. Unlike template-driven forms, where most logic resides in the template, reactive forms define the form structure and behavior explicitly inside the component class using TypeScript. This approach gives developers more control, predictability, and scalability, making reactive forms ideal for complex applications. "),t(),i(5,"p"),e(6," Reactive forms use classes such as "),i(7,"code"),e(8,"FormControl"),t(),e(9,", "),i(10,"code"),e(11,"FormGroup"),t(),e(12,", and "),i(13,"code"),e(14,"FormArray"),t(),e(15," to manage form elements. These objects create a structured form model that can be easily validated, tested, and manipulated programmatically. "),t(),i(16,"h3"),e(17,"Why Use Reactive Forms?"),t(),i(18,"ul")(19,"li")(20,"strong"),e(21,"Model-Driven Structure:"),t(),e(22," Form logic is defined in TypeScript rather than templates. "),t(),i(23,"li")(24,"strong"),e(25,"Better Scalability:"),t(),e(26," Ideal for large or dynamic forms. "),t(),i(27,"li")(28,"strong"),e(29,"Powerful Validation:"),t(),e(30," Supports synchronous and asynchronous validators. "),t(),i(31,"li")(32,"strong"),e(33,"Predictable State Management:"),t(),e(34," Easy to track form values and validation status. "),t(),i(35,"li")(36,"strong"),e(37,"Testability:"),t(),e(38," Easier to write unit tests for form logic. "),t(),i(39,"li")(40,"strong"),e(41,"Reactive Programming:"),t(),e(42," Works well with RxJS observables. "),t()(),i(43,"h3"),e(44,"Core Building Blocks"),t(),i(45,"h4"),e(46,"1. FormControl"),t(),i(47,"p"),e(48," Represents a single form input element and tracks its value and validation status. "),t(),i(49,"pre"),o(50,"code",1),e(51,`
`),t(),i(52,"h4"),e(53,"2. FormGroup"),t(),i(54,"p"),e(55," A collection of form controls grouped together. Typically used to represent an entire form. "),t(),i(56,"pre"),o(57,"code",1),e(58,`
`),t(),i(59,"h4"),e(60,"3. FormArray"),t(),i(61,"p"),e(62," Used for managing dynamic lists of form controls, such as adding or removing items dynamically. "),t(),i(63,"pre"),o(64,"code",1),e(65,`
`),t(),i(66,"h3"),e(67,"Creating a Reactive Form"),t(),i(68,"p"),e(69," Reactive forms are created inside the component using "),i(70,"code"),e(71,"FormBuilder"),t(),e(72," or manually constructing form controls. "),t(),i(73,"pre"),o(74,"code",1),e(75,`
`),t(),i(76,"h3"),e(77,"Binding Reactive Form to Template"),t(),i(78,"p"),e(79," Angular provides directives such as "),i(80,"code"),e(81,"formGroup"),t(),e(82," and "),i(83,"code"),e(84,"formControlName"),t(),e(85," to bind form models to HTML templates. "),t(),i(86,"pre"),o(87,"code",1),e(88,`
`),t(),i(89,"h3"),e(90,"Validation in Reactive Forms"),t(),i(91,"p"),e(92," Validators can be added directly when creating form controls. Angular offers built-in validators and supports custom validation logic. "),t(),i(93,"pre"),o(94,"code",1),e(95,`
`),t(),i(96,"h3"),e(97,"Observing Form Changes"),t(),i(98,"p"),e(99," Reactive forms provide observable streams like "),i(100,"code"),e(101,"valueChanges"),t(),e(102," and "),i(103,"code"),e(104,"statusChanges"),t(),e(105," that allow developers to react to changes in real time. "),t(),i(106,"pre"),o(107,"code",1),e(108,`
`),t(),i(109,"h3"),e(110,"Best Practices for Reactive Forms"),t(),i(111,"ul")(112,"li"),e(113," Use "),i(114,"code"),e(115,"FormBuilder"),t(),e(116," for cleaner form creation. "),t(),i(117,"li"),e(118," Keep validation logic inside the component or separate validator functions. "),t(),i(119,"li"),e(120," Avoid heavy business logic inside templates. "),t(),i(121,"li"),e(122," Use reactive forms for dynamic or enterprise-level forms. "),t(),i(123,"li"),e(124," Organize large forms into nested FormGroups for better structure. "),t()(),i(125,"h3"),e(126,"Summary"),t(),i(127,"p"),e(128," Reactive forms offer a powerful, scalable, and predictable way to manage form data in Angular applications. By defining form logic in the component class, developers gain greater control over validation, state management, and dynamic behavior, making reactive forms the preferred choice for complex and enterprise-level applications. "),t()()),m&2&&(r("title",n.content.title)("tags",n.content.tags)("paragraphs",n.content.paragraphs)("sections",n.content.sections)("codeExamples",n.content.codeExamples)("bestPractices",n.content.bestPractices)("keyPoints",n.content.keyPoints),a(50),r("textContent",n.formControlExample),a(7),r("textContent",n.formGroupExample),a(7),r("textContent",n.formArrayExample),a(10),r("textContent",n.reactiveFormSetupExample),a(13),r("textContent",n.reactiveTemplateExample),a(7),r("textContent",n.validationExample),a(13),r("textContent",n.valueChangesExample))},dependencies:[d],encapsulation:2})}}return l})();export{u as ReactiveFormExample};
