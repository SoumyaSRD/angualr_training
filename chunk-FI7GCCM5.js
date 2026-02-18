import{a as d}from"./chunk-ZO4N54AF.js";import"./chunk-7FNPREBO.js";import{Eb as o,Fb as n,Gb as t,Hb as i,Wa as a,ec as e,jb as m}from"./chunk-HJWRZBIA.js";var c={title:"Angular ReactiveFormsModule: Complete Programmatic Forms Guide \u2013 FormBuilder, FormControl, FormGroup, FormArray, Typed Forms, Value Changes, Status Changes, and Enterprise Patterns",tags:["Angular","ReactiveFormsModule","FormBuilder","FormControl","FormGroup","FormArray","Typed Forms","ValueChanges","StatusChanges","Form Record"],paragraphs:["ReactiveFormsModule is Angular's programmatic approach to form handling, providing explicit control over form structure, validation, and data flow. Unlike template-driven forms, Reactive Forms are defined in the component class, offering complete predictability, immutability, and seamless integration with RxJS. This comprehensive guide covers everything from basic FormControl creation to advanced typed forms (Angular 14+), form arrays, dynamic form generation, custom value accessors, and enterprise-level form architecture patterns. Master the reactive paradigm for complex, testable, and scalable Angular forms."],keyPoints:["ReactiveFormsModule provides directives (formGroup, formControlName, formArrayName) but form classes are defined in component","FormBuilder service reduces boilerplate for creating FormGroup, FormControl, FormArray instances","FormControl: Tracks value and validation status of individual form control","FormGroup: Aggregates controls as object, validates at group level, creates nested structures","FormArray: Manages ordered collection of controls (dynamic rows, repeatable sections)","Typed Forms (Angular 14.1+): FormGroup<{ name: FormControl<string> }> provides type safety","NonNullableFormBuilder: Creates controls that cannot be null","FormRecord: For dynamic groups with unknown keys at compile time (Angular 15+)","valueChanges & statusChanges: Observable streams for reactive programming with RxJS","Explicit control creation leads to better testability and predictability"],sections:[{id:"reactive-forms-setup",heading:"ReactiveFormsModule \u2013 Setup and Core Directives",content:"ReactiveFormsModule provides the directives that connect component form models to the template, while form classes are explicitly instantiated in the component.",list:["Import ReactiveFormsModule: standalone: imports: [ReactiveFormsModule] or @NgModule imports","Create FormGroup in component: this.form = this.fb.group({...})","Template binding: <form [formGroup]='form'> connects template to component form instance","formControlName: <input formControlName='name'> binds input to specific control in the group","formGroupName: <div formGroupName='address'> for nested groups","formArrayName: <div formArrayName='phones'> for dynamic arrays","No ngModel! Reactive forms use explicit value and status streams"],additionalExplanation:"The key distinction from FormsModule is that ReactiveFormsModule directives only connect existing form instances to the DOM - they never create controls automatically. This separation of model (component) and view (template) is what makes reactive forms predictable and testable."},{id:"formbuilder-patterns",heading:"FormBuilder \u2013 Advanced Patterns and Typed Forms",content:"FormBuilder is a dependency-injected service that provides syntactic sugar for creating form controls with less boilerplate.",list:["Basic injection: constructor(private fb: FormBuilder) {}","Standard syntax: this.fb.group({ name: ['', Validators.required] })","Nested groups: this.fb.group({ address: this.fb.group({ street: '' }) })","Form arrays: this.fb.array([this.fb.control('')])","Typed FormBuilder (Angular 14+): this.fb.group<{ name: FormControl<string> }>({...})","NonNullableFormBuilder: controls that can't be set to null (Angular 14+)","FormBuilder.record(): creates FormRecord for dynamic property names (Angular 15+)"],additionalExplanation:"FormBuilder doesn't add new functionality - it's purely syntactic sugar. Each this.fb.control('') is equivalent to new FormControl(''). However, FormBuilder significantly reduces code verbosity and improves readability, especially with nested structures and arrays."},{id:"formcontrol-deep-dive",heading:"FormControl \u2013 Complete API and Advanced Usage",content:"FormControl is the atomic unit of reactive forms, managing the value, validation state, and disabled status of a single form field.",list:["Constructor: new FormControl(initialValue, [validators], [asyncValidators])","Value operations: setValue(), patchValue(), reset(), getRawValue() (includes disabled controls)","Status: valid, invalid, pending, disabled, enabled, pristine, dirty, touched, untouched","Errors: errors property returns null or validation error object","Events: valueChanges (Observable), statusChanges (Observable), events (Observable of all changes)","Parent communication: root, parent properties for tree navigation","Disable/Enable: disable(), enable() with emitEvent option to control valueChanges emission","UpdateOn: 'change' (default) | 'blur' | 'submit' - when validation/value updates occur"],additionalExplanation:"FormControl is a powerful class that extends AbstractControl. Understanding its full API is essential for advanced form manipulation. The getRawValue() method is particularly useful when you need the form value including disabled controls. The updateOn strategy can dramatically improve UX for expensive validation (e.g., server-side validation on blur instead of every keystroke)."},{id:"formgroup-mastery",heading:"FormGroup \u2013 Aggregation, Nesting, and Cross-Field Validation",content:"FormGroup aggregates multiple controls into a single object, enabling hierarchical form structures and validation across multiple fields.",list:["Constructor: new FormGroup({ name: new FormControl('') })","Control retrieval: .get('name'), .get('address.street'), .get(['address', 'street'])","Add/remove controls: addControl(name, control), removeControl(name), setControl(name, control)","Contains: contains(name) checks if control exists","SetValue: Requires exact shape matching all controls (throws error if mismatch)","PatchValue: Partial updates, only updates specified controls","Cross-field validation: Validator function receives the entire FormGroup","Nested groups: Access nested validation state: form.get('address').valid"],additionalExplanation:"FormGroup is not just a container - it's a validation and value aggregation engine. Cross-field validation (e.g., password confirmation) must be implemented at the FormGroup level because individual FormControls don't know about each other. The validator function receives the entire group and can access all child controls."},{id:"formarray-expert",heading:"FormArray \u2013 Dynamic Collections and Repeatable Sections",content:"FormArray manages an ordered list of AbstractControl instances (FormControl, FormGroup, or even nested FormArrays), essential for dynamic forms.",list:["Creation: this.fb.array([this.fb.control(''), this.fb.control('')])","Dynamic addition: .push(this.fb.control('')), .insert(index, control)","Removal: .removeAt(index), .clear() (removes all), .pop()","Replacement: .setControl(index, control)","Length: .length property (not a method!)","Iteration: .controls.forEach(), or *ngFor with formArrayName","Validation: ValidatorFn receives entire array, can validate min length, unique values, etc.","Performance: Use .at(index) for direct access, avoid recreating entire array"],additionalExplanation:"FormArray is often misunderstood. It doesn't require all controls to be of the same type - you can mix FormControl, FormGroup, and even other FormArrays. For complex dynamic forms (e.g., order items with name, price, quantity), each array element should be a FormGroup. Always create factory functions for array items to ensure clean, reusable code."},{id:"typed-forms",heading:"Typed Forms \u2013 Full Type Safety (Angular 14+)",content:"Angular 14 introduced typed forms, eliminating the any type for form.value and providing compile-time type checking for form structures.",list:["FormGroup<T>: T is an object type where each property extends AbstractControl","FormControl<T>: Generic type parameter defines the control's value type","FormArray<T>: Generic type parameter defines the type of each control in the array","Typed FormBuilder: this.fb.group<{ name: FormControl<string> }>({...})","NonNullableFormBuilder: Controls that cannot be null or undefined","FormRecord<T>: For dynamic groups with string keys and same value type (Angular 15+)","Untyped fallbacks: UntypedFormGroup, UntypedFormControl for gradual migration","Type-safe value: form.value.name is now string instead of any"],additionalExplanation:"Typed forms represent a major improvement in Angular's type safety. Previously, form.value was implicitly any, leading to runtime errors. Now, the type system ensures you never access non-existent properties or assign wrong types. Migration can be incremental using untyped variants for legacy code while adopting typed forms in new components."}],codeExamples:[{title:"Complete Typed Reactive Form with Nested Groups and FormArray",language:"typescript",code:`import { Component, inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Define the form shape with full type safety
interface PhoneForm {
  number: FormControl<string>;
  type: FormControl<'mobile' | 'home' | 'work'>;
}

interface AddressForm {
  street: FormControl<string>;
  city: FormControl<string>;
  zipCode: FormControl<string>;
  country: FormControl<string>;
}

interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
  address: FormGroup<AddressForm>;
  phones: FormArray<FormGroup<PhoneForm>>;
  preferences: FormRecord<FormControl<boolean>>;
}

@Component({
  selector: 'app-typed-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]='userForm' (ngSubmit)='onSubmit()'>
      <!-- Basic Fields -->
      <input formControlName='name' placeholder='Name'>
      <div *ngIf='userForm.controls.name.invalid && userForm.controls.name.touched'>
        Name is required
      </div>

      <input formControlName='email' type='email' placeholder='Email'>
      
      <!-- Nested FormGroup -->
      <div formGroupName='address'>
        <input formControlName='street' placeholder='Street'>
        <input formControlName='city' placeholder='City'>
      </div>

      <!-- FormArray -->
      <div formArrayName='phones'>
        <div *ngFor='let phone of phones.controls; let i=index'>
          <div [formGroupName]='i'>
            <input formControlName='number' placeholder='Phone number'>
            <select formControlName='type'>
              <option value='mobile'>Mobile</option>
              <option value='home'>Home</option>
              <option value='work'>Work</option>
            </select>
            <button type='button' (click)='removePhone(i)'>Remove</button>
          </div>
        </div>
        <button type='button' (click)='addPhone()'>Add Phone</button>
      </div>

      <!-- FormRecord -->
      <div formGroupName='preferences'>
        <label>
          <input type='checkbox' formControlName='newsletter'>
          Receive Newsletter
        </label>
        <label>
          <input type='checkbox' formControlName='promotions'>
          Receive Promotions
        </label>
      </div>

      <button type='submit' [disabled]='userForm.invalid'>Submit</button>
    </form>
  \`
})
export class TypedUserFormComponent {
  private fb = inject(NonNullableFormBuilder);

  // Fully typed form group
  userForm: FormGroup<UserForm> = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    age: this.fb.control<number | null>(null),
    address: this.fb.group<AddressForm>({
      street: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      zipCode: this.fb.control('', Validators.pattern(/^[0-9]{5}$/)),
      country: this.fb.control('USA')
    }),
    phones: this.fb.array<FormGroup<PhoneForm>>([]),
    preferences: this.fb.record<boolean>({
      newsletter: true,
      promotions: false
    })
  });

  get phones(): FormArray<FormGroup<PhoneForm>> {
    return this.userForm.controls.phones;
  }

  addPhone(): void {
    const phoneGroup = this.fb.group<PhoneForm>({
      number: this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      type: this.fb.control('mobile', Validators.required)
    });
    this.phones.push(phoneGroup);
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      // TypeScript knows userForm.value has correct types
      const formValue: UserForm = this.userForm.getRawValue();
      console.log(formValue.name.toUpperCase()); // Safe: name is string
      console.log(formValue.phones[0].type); // Safe: type is 'mobile' | 'home' | 'work'
    }
  }
}`},{title:"Advanced RxJS Integration with valueChanges",language:"typescript",code:`import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil, filter, map, pairwise, startWith } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-rxjs-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]='searchForm'>
      <input formControlName='username' placeholder='Username'>
      <span *ngIf='checking$ | async'>Checking availability...</span>
      <span *ngIf='usernameAvailable$ | async as available'>
        {{ available ? '\u2705 Available' : '\u274C Taken' }}
      </span>
      
      <input formControlName='search' placeholder='Search...'>
      <div>Search results: {{ searchResults$ | async | json }}</div>
    </form>
  \`
})
export class RxjsFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private destroy$ = new Subject<void>();

  searchForm: FormGroup = this.fb.group({
    username: ['', Validators.required, [this.usernameAvailabilityValidator.bind(this)]],
    search: ['']
  });

  checking$ = new Subject<boolean>();
  usernameAvailable$ = this.searchForm.controls.username.statusChanges.pipe(
    map(status => status === 'VALID'),
    startWith(false)
  );

  searchResults$ = this.searchForm.controls.search.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(query => query.length >= 3),
    switchMap(query => this.userService.searchUsers(query)),
    takeUntil(this.destroy$)
  );

  ngOnInit(): void {
    // Monitor form changes over time
    this.searchForm.valueChanges.pipe(
      pairwise(),
      takeUntil(this.destroy$)
    ).subscribe(([prev, curr]) => {
      console.log('Form changed from', prev, 'to', curr);
    });

    // Conditional field enabling
    this.searchForm.controls.username.statusChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      if (status === 'VALID') {
        this.searchForm.controls.search.enable();
      } else {
        this.searchForm.controls.search.disable();
      }
    });
  }

  usernameAvailabilityValidator(control: AbstractControl) {
    this.checking$.next(true);
    return control.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(username => this.userService.checkUsername(username)),
      map(isAvailable => isAvailable ? null : { unavailable: true }),
      takeUntil(this.destroy$),
      tap(() => this.checking$.next(false))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`},{title:"Dynamic Form Generation from JSON Schema",language:"typescript",code:`import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'array';
  label: string;
  validators?: string[];
  options?: Array<{ value: any; label: string }>;
  fields?: FormFieldConfig[]; // For nested groups
  arrayConfig?: FormFieldConfig[]; // For array items
  defaultValue?: any;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <form [formGroup]='form' (ngSubmit)='onSubmit()'>
      <ng-container *ngFor='let field of config'>
        <ng-container [ngSwitch]='field.type'>
          <!-- Simple Input -->
          <div *ngSwitchCase='"text"' class='form-field'>
            <label>{{field.label}}</label>
            <input [formControlName]='field.name' [type]='field.type'>
          </div>

          <!-- Select Dropdown -->
          <div *ngSwitchCase='"select"'>
            <label>{{field.label}}</label>
            <select [formControlName]='field.name'>
              <option *ngFor='let opt of field.options' [value]='opt.value'>
                {{opt.label}}
              </option>
            </select>
          </div>

          <!-- Nested FormGroup -->
          <div *ngSwitchCase='"group"' [formGroupName]='field.name'>
            <h3>{{field.label}}</h3>
            <app-dynamic-form 
              [config]='field.fields || []' 
              [form]='form.get(field.name)'>
            </app-dynamic-form>
          </div>

          <!-- FormArray -->
          <div *ngSwitchCase='"array"' [formArrayName]='field.name'>
            <label>{{field.label}}</label>
            <div *ngFor='let _ of getFormArray(field.name).controls; let i=index'>
              <app-dynamic-form 
                [config]='field.arrayConfig || []' 
                [form]='getFormArray(field.name).at(i)'>
              </app-dynamic-form>
              <button type='button' (click)='removeArrayItem(field.name, i)'>Remove</button>
            </div>
            <button type='button' (click)='addArrayItem(field.name)'>Add</button>
          </div>
        </ng-container>
      </ng-container>
      
      <button type='submit' [disabled]='form.invalid'>Submit</button>
    </form>
  \`
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormFieldConfig[] = [];
  @Input() form?: FormGroup;
  
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.createForm(this.config);
    }
  }

  createForm(config: FormFieldConfig[]): FormGroup {
    const group: any = {};
    
    config.forEach(field => {
      switch (field.type) {
        case 'array':
          group[field.name] = this.fb.array([]);
          break;
        case 'group':
          group[field.name] = this.createForm(field.fields || []);
          break;
        default:
          group[field.name] = this.fb.control(
            field.defaultValue || '',
            this.mapValidators(field.validators || [])
          );
      }
    });
    
    return this.fb.group(group);
  }

  getFormArray(name: string): FormArray {
    return this.form?.get(name) as FormArray;
  }

  addArrayItem(name: string): void {
    const array = this.getFormArray(name);
    const fieldConfig = this.config.find(c => c.name === name);
    
    if (fieldConfig?.arrayConfig) {
      const itemGroup = this.createForm(fieldConfig.arrayConfig);
      array.push(itemGroup);
    }
  }

  removeArrayItem(name: string, index: number): void {
    this.getFormArray(name).removeAt(index);
  }

  private mapValidators(validators: string[]): any[] {
    const validatorMap: Record<string, any> = {
      'required': Validators.required,
      'email': Validators.email,
      'minLength3': Validators.minLength(3),
      'minLength8': Validators.minLength(8),
      'phone': Validators.pattern(/^[0-9]{10}$/)
    };
    
    return validators.map(v => validatorMap[v]).filter(Boolean);
  }

  onSubmit(): void {
    if (this.form?.valid) {
      console.log('Dynamic form value:', this.form.value);
    }
  }
}`}],bestPractices:["Always use FormBuilder instead of manually creating new FormControl/FormGroup instances","Use typed forms (FormGroup<T>) in Angular 14+ for compile-time type safety","Inject NonNullableFormBuilder for controls that should never be null","Create factory functions for FormArray items to ensure consistent structure","Use getter properties for FormArray access to reduce template complexity","Implement OnPush change detection strategy with immutable form updates","Always unsubscribe from valueChanges (or use takeUntil pattern) to prevent memory leaks","Use patchValue for partial updates, setValue when you must update entire form structure","Prefer async pipe over manual subscriptions for valueChanges in templates","Implement custom ControlValueAccessor for reusable form controls","Use FormRecord over dynamic FormGroup when all controls share the same type","Centralize validation logic in separate validator functions for reusability","Mark forms as touched on submit (markAllAsTouched()) to show validation errors","Use updateOn: 'blur' or 'submit' for expensive validation operations","Break extremely large forms into child components with @Input() formGroup"]};var v=(()=>{class s{constructor(){this.content=c,this.formControlExample=`
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
`}static{this.\u0275fac=function(l){return new(l||s)}}static{this.\u0275cmp=m({type:s,selectors:[["app-reactive-form-eg"]],decls:129,vars:14,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(l,r){l&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"Reactive Forms Introduction"),t(),n(3,"p"),e(4," Reactive Forms in Angular provide a model-driven approach to handling form inputs, validation, and state management. Unlike template-driven forms, where most logic resides in the template, reactive forms define the form structure and behavior explicitly inside the component class using TypeScript. This approach gives developers more control, predictability, and scalability, making reactive forms ideal for complex applications. "),t(),n(5,"p"),e(6," Reactive forms use classes such as "),n(7,"code"),e(8,"FormControl"),t(),e(9,", "),n(10,"code"),e(11,"FormGroup"),t(),e(12,", and "),n(13,"code"),e(14,"FormArray"),t(),e(15," to manage form elements. These objects create a structured form model that can be easily validated, tested, and manipulated programmatically. "),t(),n(16,"h3"),e(17,"Why Use Reactive Forms?"),t(),n(18,"ul")(19,"li")(20,"strong"),e(21,"Model-Driven Structure:"),t(),e(22," Form logic is defined in TypeScript rather than templates. "),t(),n(23,"li")(24,"strong"),e(25,"Better Scalability:"),t(),e(26," Ideal for large or dynamic forms. "),t(),n(27,"li")(28,"strong"),e(29,"Powerful Validation:"),t(),e(30," Supports synchronous and asynchronous validators. "),t(),n(31,"li")(32,"strong"),e(33,"Predictable State Management:"),t(),e(34," Easy to track form values and validation status. "),t(),n(35,"li")(36,"strong"),e(37,"Testability:"),t(),e(38," Easier to write unit tests for form logic. "),t(),n(39,"li")(40,"strong"),e(41,"Reactive Programming:"),t(),e(42," Works well with RxJS observables. "),t()(),n(43,"h3"),e(44,"Core Building Blocks"),t(),n(45,"h4"),e(46,"1. FormControl"),t(),n(47,"p"),e(48," Represents a single form input element and tracks its value and validation status. "),t(),n(49,"pre"),i(50,"code",1),e(51,`
`),t(),n(52,"h4"),e(53,"2. FormGroup"),t(),n(54,"p"),e(55," A collection of form controls grouped together. Typically used to represent an entire form. "),t(),n(56,"pre"),i(57,"code",1),e(58,`
`),t(),n(59,"h4"),e(60,"3. FormArray"),t(),n(61,"p"),e(62," Used for managing dynamic lists of form controls, such as adding or removing items dynamically. "),t(),n(63,"pre"),i(64,"code",1),e(65,`
`),t(),n(66,"h3"),e(67,"Creating a Reactive Form"),t(),n(68,"p"),e(69," Reactive forms are created inside the component using "),n(70,"code"),e(71,"FormBuilder"),t(),e(72," or manually constructing form controls. "),t(),n(73,"pre"),i(74,"code",1),e(75,`
`),t(),n(76,"h3"),e(77,"Binding Reactive Form to Template"),t(),n(78,"p"),e(79," Angular provides directives such as "),n(80,"code"),e(81,"formGroup"),t(),e(82," and "),n(83,"code"),e(84,"formControlName"),t(),e(85," to bind form models to HTML templates. "),t(),n(86,"pre"),i(87,"code",1),e(88,`
`),t(),n(89,"h3"),e(90,"Validation in Reactive Forms"),t(),n(91,"p"),e(92," Validators can be added directly when creating form controls. Angular offers built-in validators and supports custom validation logic. "),t(),n(93,"pre"),i(94,"code",1),e(95,`
`),t(),n(96,"h3"),e(97,"Observing Form Changes"),t(),n(98,"p"),e(99," Reactive forms provide observable streams like "),n(100,"code"),e(101,"valueChanges"),t(),e(102," and "),n(103,"code"),e(104,"statusChanges"),t(),e(105," that allow developers to react to changes in real time. "),t(),n(106,"pre"),i(107,"code",1),e(108,`
`),t(),n(109,"h3"),e(110,"Best Practices for Reactive Forms"),t(),n(111,"ul")(112,"li"),e(113," Use "),n(114,"code"),e(115,"FormBuilder"),t(),e(116," for cleaner form creation. "),t(),n(117,"li"),e(118," Keep validation logic inside the component or separate validator functions. "),t(),n(119,"li"),e(120," Avoid heavy business logic inside templates. "),t(),n(121,"li"),e(122," Use reactive forms for dynamic or enterprise-level forms. "),t(),n(123,"li"),e(124," Organize large forms into nested FormGroups for better structure. "),t()(),n(125,"h3"),e(126,"Summary"),t(),n(127,"p"),e(128," Reactive forms offer a powerful, scalable, and predictable way to manage form data in Angular applications. By defining form logic in the component class, developers gain greater control over validation, state management, and dynamic behavior, making reactive forms the preferred choice for complex and enterprise-level applications. "),t()()),l&2&&(o("title",r.content.title)("tags",r.content.tags)("paragraphs",r.content.paragraphs)("sections",r.content.sections)("codeExamples",r.content.codeExamples)("bestPractices",r.content.bestPractices)("keyPoints",r.content.keyPoints),a(50),o("textContent",r.formControlExample),a(7),o("textContent",r.formGroupExample),a(7),o("textContent",r.formArrayExample),a(10),o("textContent",r.reactiveFormSetupExample),a(13),o("textContent",r.reactiveTemplateExample),a(7),o("textContent",r.validationExample),a(13),o("textContent",r.valueChangesExample))},dependencies:[d],styles:[".container[_ngcontent-%COMP%]{padding:var(--spacing-md, 20px);max-width:800px;margin:0 auto}.comparison[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:var(--spacing-lg, 20px);margin:var(--spacing-xl, 30px) 0}.method[_ngcontent-%COMP%]{padding:var(--spacing-md, 20px);border:2px solid var(--border-color, #ddd);border-radius:var(--border-radius-md, 10px);background:var(--surface-variant, #f9f9f9);transition:border-color var(--transition-fast)}.method[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;color:var(--text-primary, #333)}input[_ngcontent-%COMP%]{width:100%;padding:var(--spacing-xs, 8px);margin:var(--spacing-sm, 10px) 0;border:1px solid var(--border-color, #ccc);border-radius:var(--border-radius-xs, 4px);background:var(--surface-color);color:var(--text-primary);font-family:var(--font-family)}input[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--primary-color)}button[_ngcontent-%COMP%]{background:var(--primary-color, #007bff);color:var(--text-on-primary, white);border:none;padding:var(--spacing-xs, 8px) var(--spacing-md, 16px);border-radius:var(--border-radius-xs, 4px);cursor:pointer;margin-top:var(--spacing-sm, 10px);transition:background-color var(--transition-fast)}button[_ngcontent-%COMP%]:hover{background:var(--primary-dark, #0056b3)}.info[_ngcontent-%COMP%]{background:var(--surface-variant);padding:var(--spacing-md, 15px);border-radius:var(--border-radius-sm, 8px);margin-top:var(--spacing-md, 20px);border-left:4px solid var(--primary-color);color:var(--text-secondary)}"]})}}return s})();export{v as ReactiveFormExample};
