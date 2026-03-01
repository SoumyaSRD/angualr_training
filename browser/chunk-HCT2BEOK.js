import{b as d}from"./chunk-TCLAS7TI.js";import"./chunk-IDUW3PRR.js";import{Aa as s,Cb as e,Oa as m,eb as o,fb as n,gb as t,hb as l}from"./chunk-2OVPXQV3.js";var c={title:"Angular FormsModule: Complete Guide to Template-Driven Forms \u2013 ngForm, ngModel, ngModelGroup, Validation, Two-Way Binding, and Best Practices",tags:["Angular","FormsModule","Template-Driven Forms","ngForm","ngModel","ngModelGroup","Two-Way Binding","Validation","Template Variables"],paragraphs:["FormsModule is Angular's built-in module for template-driven forms. It provides the core directives (ngForm, ngModel, ngModelGroup) that enable declarative form creation directly in templates. This comprehensive guide explores every aspect of FormsModule, from basic form setup to advanced validation patterns, nested form groups, two-way data binding, custom controls, and performance optimization. Learn how FormsModule works under the hood, how it creates and manages FormControl instances implicitly, and when to choose this approach over Reactive Forms."],keyPoints:["FormsModule must be imported to use template-driven forms","ngForm directive automatically attaches to <form> tags, creates FormGroup behind the scenes","ngModel directive creates FormControl instances implicitly","ngModelGroup creates nested FormGroup structures","Two-way binding with [(ngModel)] for direct data sync","Template reference variables (#myForm='ngForm') expose form control instances","Built-in validators via attributes (required, minlength, email, pattern)","Form state classes (ng-valid, ng-invalid, ng-touched, ng-dirty, ng-pristine)","Less boilerplate, faster prototyping, but limited dynamic capabilities","Best for simple to moderately complex forms with static structure"],sections:[{id:"formsmodule-import-setup",heading:"FormsModule \u2013 Setup and Core Directives",content:"FormsModule provides three critical directives that transform regular HTML forms into Angular-powered forms with validation and data binding.",list:["ngForm: Auto-applied to every <form> tag, creates FormGroup, tracks overall form state, handles ngSubmit","ngModel: Creates FormControl, enables validation, provides two-way binding with [(ngModel)] syntax","ngModelGroup: Creates nested FormGroup for logical grouping of related fields (address, payment, etc.)","Import FormsModule in standalone components: imports: [FormsModule]","Legacy NgModule approach: import { FormsModule } from '@angular/forms' in @NgModule.imports"],additionalExplanation:"Unlike Reactive Forms where you explicitly create FormGroup/FormControl in the component, FormsModule creates these objects implicitly based on directives in the template. Each input with ngModel becomes a FormControl; each <form> becomes a FormGroup."},{id:"ngform-deep-dive",heading:"ngForm \u2013 The Form Controller",content:"ngForm is the orchestrator of template-driven forms, providing access to the overall form state, validity, and submission handling.",list:["Automatically tracks all ngModel and ngModelGroup directives within the form","Exposes properties: valid, invalid, pristine, dirty, touched, untouched, submitted, value, errors","Template reference: #myForm='ngForm' gives direct access to the FormGroup instance",'ngSubmit event: (ngSubmit)="onSubmit(myForm.value)" captures form submission',"Reset forms: myForm.reset() or add reset button with type='reset'","Can disable submit button based on form state: [disabled]='myForm.invalid'"],additionalExplanation:"The ngForm directive creates an underlying FormGroup instance that you can access via template reference. This allows you to check overall form validity, disable submit buttons, and reset the entire form state. Unlike Reactive Forms, the FormGroup is not directly visible in your component class unless you export it via template reference."},{id:"ngmodel-two-way-binding",heading:"ngModel \u2013 Two-Way Binding and Control Tracking",content:"ngModel is the workhorse of template-driven forms, connecting form fields to component properties and managing validation.",list:['One-way binding: [ngModel]="user.name" - model to view only','Two-way binding: [(ngModel)]="user.name" - sync in both directions (banana-in-a-box syntax)',"Standalone ngModel: Creates control but doesn't require form parent (less common)","Expose control state: #nameCtrl='ngModel' - access validity, errors, and status","Control state CSS classes: ng-valid, ng-invalid, ng-pristine, ng-dirty, ng-touched, ng-untouched","Value accessor: ngModel uses ControlValueAccessor to interface with form elements"],additionalExplanation:"The banana-in-a-box syntax [(ngModel)] is syntactic sugar for [ngModel] + (ngModelChange). Behind the scenes, ngModel registers itself with the parent ngForm, creates a FormControl, and communicates with form elements through ControlValueAccessor (built-in for inputs, selects, checkboxes, etc.)"},{id:"ngmodelgroup-nested",heading:"ngModelGroup \u2013 Nested Form Structures",content:"ngModelGroup creates hierarchical form structures by grouping related controls into nested FormGroup objects.",list:["Wrap related fields: <div ngModelGroup='address'> groups address fields together","Access nested group: #addressGroup='ngModelGroup' to check validity of address section only","Validation at group level: Can apply cross-field validation on the group","Nested value object: Form value becomes { address: { street: '', city: '' } }","Useful for multi-step forms, billing/shipping addresses, payment details","Combine with ngFor for dynamic groups (with careful trackBy implementation)"],additionalExplanation:"ngModelGroup creates nested JSON structures in your form value. This is essential for complex forms where data naturally belongs together. The nested group can have its own validation state independent of the parent form, allowing section-by-section validation feedback."},{id:"formsmodule-validation",heading:"Template-Driven Validation \u2013 Built-in & Custom",content:"Validation in FormsModule uses HTML5 validation attributes enhanced with Angular's validation directives.",list:["Built-in validators: required, minlength, maxlength, pattern, email, requiredTrue (checkbox)","Apply directly as attributes: <input required minlength='3' pattern='[A-Z]+'>","Access validation errors: #nameCtrl='ngModel' then nameCtrl.errors?.required, nameCtrl.errors?.minlength","Display error messages conditionally: *ngIf='nameCtrl.invalid && nameCtrl.touched'","Custom validation: Create directive implementing Validator interface","Async validation: Directive implementing AsyncValidator, useful for username availability"],additionalExplanation:"Template-driven validation is declarative and intuitive. Error objects contain detailed information: minlength gives required length and actual length; pattern shows the failed value. Custom validators must be implemented as directives with NG_VALIDATORS provider registration."},{id:"formsmodule-performance",heading:"Performance Considerations with FormsModule",content:"While FormsModule is simpler to use, it has performance implications for large forms due to its implicit control creation and change detection.",list:["Each ngModel creates a FormControl instance and registers it with parent - overhead for hundreds of fields","Two-way binding triggers change detection on every keystroke - consider one-way binding + manual sync","Use trackBy with ngFor + ngModelGroup to prevent DOM thrashing","Consider OnPush change detection strategy with immutable data patterns","Debounce user input for expensive operations (validation API calls)","Lazy load large forms using Angular's lazy loading features"],additionalExplanation:"For forms with more than 50-100 fields, Reactive Forms typically perform better because you control when controls are created and how change detection propagates. FormsModule creates controls during template rendering, which can be expensive in large dynamic forms."}],codeExamples:[{title:"Complete FormsModule Example with Nested Groups and Validation",language:"typescript",code:`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <form #regForm='ngForm' (ngSubmit)='onSubmit(regForm.value)'>
      <!-- Personal Information -->
      <div ngModelGroup='personal' #personalGroup='ngModelGroup'>
        <h3>Personal Information</h3>
        
        <input 
          name='fullName' 
          [(ngModel)]='user.fullName' 
          required 
          minlength='3'
          #nameCtrl='ngModel'>
        <div *ngIf='nameCtrl.invalid && nameCtrl.touched'>
          <span *ngIf='nameCtrl.errors?.["required"]'>Name is required</span>
          <span *ngIf='nameCtrl.errors?.["minlength"]'>
            Min length is {{nameCtrl.errors?.["minlength"].requiredLength}}
          </span>
        </div>

        <input 
          type='email' 
          name='email' 
          [(ngModel)]='user.email' 
          required 
          email
          #emailCtrl='ngModel'>
        <div *ngIf='emailCtrl.invalid && emailCtrl.touched'>
          Valid email is required
        </div>
      </div>

      <!-- Address Information -->
      <div ngModelGroup='address'>
        <h3>Address</h3>
        <input name='street' [(ngModel)]='user.address.street' required>
        <input name='city' [(ngModel)]='user.address.city' required>
        <input 
          name='zip' 
          [(ngModel)]='user.address.zip' 
          pattern='[0-9]{5}'
          #zipCtrl='ngModel'>
        <div *ngIf='zipCtrl.invalid && zipCtrl.touched'>
          ZIP must be 5 digits
        </div>
      </div>

      <button type='submit' [disabled]='regForm.invalid'>Register</button>
      <button type='button' (click)='resetForm(regForm)'>Reset</button>
    </form>
  \`
})
export class RegistrationComponent {
  user = {
    fullName: '',
    email: '',
    address: {
      street: '',
      city: '',
      zip: ''
    }
  };

  onSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
    console.log('Raw user model:', this.user);
  }

  resetForm(form: any) {
    form.reset();
    this.user = {
      fullName: '',
      email: '',
      address: { street: '', city: '', zip: '' }
    };
  }
}`},{title:"Custom Validator Directive for Template-Driven Forms",language:"typescript",code:`import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenNameDirective,
      multi: true
    }
  ]
})
export class ForbiddenNameDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !this.forbiddenName) return null;
    
    const regex = new RegExp(this.forbiddenName, 'i');
    const forbidden = regex.test(control.value);
    
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  }
}

// Usage in template:
// <input name='username' [(ngModel)]='user.username' appForbiddenName='admin'>
// <div *ngIf='usernameCtrl.errors?.["forbiddenName"]'>
//   Username cannot contain 'admin'
// </div>`},{title:"Custom ControlValueAccessor for FormsModule",language:"typescript",code:`import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <div class='rating'>
      <button *ngFor='let star of [1,2,3,4,5]' 
              type='button'
              (click)='setRating(star)'
              [class.active]='star <= value'>
        \u2605
      </button>
    </div>
  \`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements ControlValueAccessor {
  value: number = 0;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: number): void {
    this.value = value || 0;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  setRating(rating: number): void {
    this.value = rating;
    this.onChange(rating);
    this.onTouched();
  }
}

// Usage in parent form:
// <app-rating-input name='rating' [(ngModel)]='product.rating'></app-rating-input>`}],bestPractices:["Always export ngForm via template reference (#form='ngForm') to access form state in template","Use one-way binding [ngModel] instead of [(ngModel)] when immediate sync isn't needed (better performance)","Always expose control state variables (#ctrl='ngModel') for accurate validation feedback","Group related fields with ngModelGroup to create structured form values and sectional validation","Create reusable custom validator directives for validation logic used across multiple forms","Use trackBy with ngFor + ngModelGroup to prevent performance issues in dynamic sections","Reset forms using form.reset() rather than manually clearing model (resets validation state too)","Prefer Reactive Forms when form structure is dynamic or exceeds 30-50 fields","Combine FormsModule with OnPush change detection using immutable data updates","Implement ControlValueAccessor for custom form controls to work seamlessly with ngModel","Use form.submitted property to show validation errors after first submission attempt","Keep template logic minimal - extract complex validation conditions to component getters"]};var v=(()=>{class i{constructor(){this.content=c,this.templateFormExample=`
<input [(ngModel)]="username" name="username" required />
<p>{{ username }}</p>
`,this.reactiveFormExample=`
form = new FormGroup({
  username: new FormControl('', Validators.required)
});
`,this.formImportExample=`
@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
`}static{this.\u0275fac=function(a){return new(a||i)}}static{this.\u0275cmp=m({type:i,selectors:[["app-form-eg"]],decls:148,vars:10,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(a,r){a&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"Angular Forms Module Introduction"),t(),n(3,"p"),e(4," Forms are an essential part of modern web applications, allowing users to input, validate, and submit data. Angular provides powerful tools for building and managing forms through its Forms Modules. These modules offer structured approaches for handling user input, validation, state management, and data binding in a scalable and maintainable way. "),t(),n(5,"p"),e(6," Angular supports two primary approaches to building forms: "),n(7,"strong"),e(8,"Template-driven forms"),t(),e(9," and "),n(10,"strong"),e(11,"Reactive forms"),t(),e(12,". Each approach serves different use cases depending on the complexity of the form and the level of control required. "),t(),n(13,"h3"),e(14,"Why Angular Forms?"),t(),n(15,"ul")(16,"li")(17,"strong"),e(18,"Two-Way Data Binding:"),t(),e(19," Easily synchronize UI and data model. "),t(),n(20,"li")(21,"strong"),e(22,"Validation Support:"),t(),e(23," Built-in and custom validation options. "),t(),n(24,"li")(25,"strong"),e(26,"Form State Management:"),t(),e(27," Track touched, dirty, valid, and invalid states. "),t(),n(28,"li")(29,"strong"),e(30,"Scalability:"),t(),e(31," Suitable for simple forms and complex dynamic forms. "),t(),n(32,"li")(33,"strong"),e(34,"Better User Experience:"),t(),e(35," Real-time feedback and validation. "),t()(),n(36,"h3"),e(37,"Types of Angular Forms"),t(),n(38,"h4"),e(39,"1. Template-Driven Forms"),t(),n(40,"p"),e(41," Template-driven forms rely primarily on Angular templates to define form structure and validation. They are simpler to implement and ideal for small or basic forms. Angular uses directives like "),n(42,"code"),e(43,"ngModel"),t(),e(44," to create two-way data binding between the template and the component. "),t(),n(45,"ul")(46,"li"),e(47,"Easy to learn and implement."),t(),n(48,"li"),e(49,"Less code required in TypeScript."),t(),n(50,"li"),e(51,"Best suited for simple forms."),t()(),n(52,"pre"),l(53,"code",1),e(54,`
`),t(),n(55,"h4"),e(56,"2. Reactive Forms"),t(),n(57,"p"),e(58," Reactive forms are model-driven and provide more control over form logic, validation, and dynamic behavior. Form structure is defined in the component class using "),n(59,"code"),e(60,"FormControl"),t(),e(61,", "),n(62,"code"),e(63,"FormGroup"),t(),e(64,", and "),n(65,"code"),e(66,"FormBuilder"),t(),e(67,". "),t(),n(68,"ul")(69,"li"),e(70,"More scalable for complex applications."),t(),n(71,"li"),e(72,"Better testability."),t(),n(73,"li"),e(74,"Strong control over validation and state."),t()(),n(75,"pre"),l(76,"code",1),e(77,`
`),t(),n(78,"h3"),e(79,"Forms Modules in Angular"),t(),n(80,"p"),e(81," Angular provides two main modules for working with forms: "),t(),n(82,"ul")(83,"li")(84,"strong"),e(85,"FormsModule:"),t(),e(86," Used for template-driven forms and enables directives like "),n(87,"code"),e(88,"ngModel"),t(),e(89,". "),t(),n(90,"li")(91,"strong"),e(92,"ReactiveFormsModule:"),t(),e(93," Used for reactive forms and provides APIs such as "),n(94,"code"),e(95,"FormControl"),t(),e(96," and "),n(97,"code"),e(98,"FormGroup"),t(),e(99,". "),t()(),n(100,"h3"),e(101,"Importing Forms Modules (Standalone Angular)"),t(),n(102,"pre"),l(103,"code",1),e(104,`
`),t(),n(105,"h3"),e(106,"Validation in Angular Forms"),t(),n(107,"p"),e(108," Angular provides built-in validators such as required, minlength, maxlength, email, and pattern. Developers can also create custom validators to enforce specific business rules. "),t(),n(109,"ul")(110,"li"),e(111,"Template-driven validation using HTML attributes."),t(),n(112,"li"),e(113,"Reactive validation using Validators API."),t()(),n(114,"h3"),e(115,"Form State Tracking"),t(),n(116,"p"),e(117," Angular automatically tracks form states, allowing developers to respond dynamically based on user interactions. "),t(),n(118,"ul")(119,"li")(120,"strong"),e(121,"valid / invalid:"),t(),e(122," Indicates validation status."),t(),n(123,"li")(124,"strong"),e(125,"dirty / pristine:"),t(),e(126," Indicates whether user modified input."),t(),n(127,"li")(128,"strong"),e(129,"touched / untouched:"),t(),e(130," Indicates whether field was focused."),t()(),n(131,"h3"),e(132,"Best Practices for Angular Forms"),t(),n(133,"ul")(134,"li"),e(135,"Use template-driven forms for simple forms."),t(),n(136,"li"),e(137,"Use reactive forms for complex or dynamic forms."),t(),n(138,"li"),e(139,"Separate validation logic from UI when possible."),t(),n(140,"li"),e(141,"Use FormBuilder for cleaner reactive form creation."),t(),n(142,"li"),e(143,"Handle form submission through dedicated methods."),t()(),n(144,"h3"),e(145,"Summary"),t(),n(146,"p"),e(147," Angular Forms Modules provide flexible and powerful tools for managing user input and validation. Whether using template-driven forms for simplicity or reactive forms for advanced control, Angular enables developers to build scalable, maintainable, and user-friendly form experiences. "),t()()),a&2&&(o("title",r.content.title)("tags",r.content.tags)("paragraphs",r.content.paragraphs)("sections",r.content.sections)("codeExamples",r.content.codeExamples)("bestPractices",r.content.bestPractices)("keyPoints",r.content.keyPoints),s(53),o("textContent",r.templateFormExample),s(23),o("textContent",r.reactiveFormExample),s(27),o("textContent",r.formImportExample))},dependencies:[d],encapsulation:2})}}return i})();export{v as FormExample};
