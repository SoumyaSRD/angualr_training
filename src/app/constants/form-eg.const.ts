export const FORMS_MODULE_DEEP_DIVE = {
    "title": "Angular FormsModule: Complete Guide to Template-Driven Forms – ngForm, ngModel, ngModelGroup, Validation, Two-Way Binding, and Best Practices",
    "tags": ["Angular", "FormsModule", "Template-Driven Forms", "ngForm", "ngModel", "ngModelGroup", "Two-Way Binding", "Validation", "Template Variables"],
    "paragraphs": [
        "FormsModule is Angular's built-in module for template-driven forms. It provides the core directives (ngForm, ngModel, ngModelGroup) that enable declarative form creation directly in templates. This comprehensive guide explores every aspect of FormsModule, from basic form setup to advanced validation patterns, nested form groups, two-way data binding, custom controls, and performance optimization. Learn how FormsModule works under the hood, how it creates and manages FormControl instances implicitly, and when to choose this approach over Reactive Forms."
    ],
    "keyPoints": [
        "FormsModule must be imported to use template-driven forms",
        "ngForm directive automatically attaches to <form> tags, creates FormGroup behind the scenes",
        "ngModel directive creates FormControl instances implicitly",
        "ngModelGroup creates nested FormGroup structures",
        "Two-way binding with [(ngModel)] for direct data sync",
        "Template reference variables (#myForm='ngForm') expose form control instances",
        "Built-in validators via attributes (required, minlength, email, pattern)",
        "Form state classes (ng-valid, ng-invalid, ng-touched, ng-dirty, ng-pristine)",
        "Less boilerplate, faster prototyping, but limited dynamic capabilities",
        "Best for simple to moderately complex forms with static structure"
    ],
    "sections": [
        {
            "id": "formsmodule-import-setup",
            "heading": "FormsModule – Setup and Core Directives",
            "content": "FormsModule provides three critical directives that transform regular HTML forms into Angular-powered forms with validation and data binding.",
            "list": [
                "ngForm: Auto-applied to every <form> tag, creates FormGroup, tracks overall form state, handles ngSubmit",
                "ngModel: Creates FormControl, enables validation, provides two-way binding with [(ngModel)] syntax",
                "ngModelGroup: Creates nested FormGroup for logical grouping of related fields (address, payment, etc.)",
                "Import FormsModule in standalone components: imports: [FormsModule]",
                "Legacy NgModule approach: import { FormsModule } from '@angular/forms' in @NgModule.imports"
            ],
            "additionalExplanation": "Unlike Reactive Forms where you explicitly create FormGroup/FormControl in the component, FormsModule creates these objects implicitly based on directives in the template. Each input with ngModel becomes a FormControl; each <form> becomes a FormGroup."
        },
        {
            "id": "ngform-deep-dive",
            "heading": "ngForm – The Form Controller",
            "content": "ngForm is the orchestrator of template-driven forms, providing access to the overall form state, validity, and submission handling.",
            "list": [
                "Automatically tracks all ngModel and ngModelGroup directives within the form",
                "Exposes properties: valid, invalid, pristine, dirty, touched, untouched, submitted, value, errors",
                "Template reference: #myForm='ngForm' gives direct access to the FormGroup instance",
                "ngSubmit event: (ngSubmit)=\"onSubmit(myForm.value)\" captures form submission",
                "Reset forms: myForm.reset() or add reset button with type='reset'",
                "Can disable submit button based on form state: [disabled]='myForm.invalid'"
            ],
            "additionalExplanation": "The ngForm directive creates an underlying FormGroup instance that you can access via template reference. This allows you to check overall form validity, disable submit buttons, and reset the entire form state. Unlike Reactive Forms, the FormGroup is not directly visible in your component class unless you export it via template reference."
        },
        {
            "id": "ngmodel-two-way-binding",
            "heading": "ngModel – Two-Way Binding and Control Tracking",
            "content": "ngModel is the workhorse of template-driven forms, connecting form fields to component properties and managing validation.",
            "list": [
                "One-way binding: [ngModel]=\"user.name\" - model to view only",
                "Two-way binding: [(ngModel)]=\"user.name\" - sync in both directions (banana-in-a-box syntax)",
                "Standalone ngModel: Creates control but doesn't require form parent (less common)",
                "Expose control state: #nameCtrl='ngModel' - access validity, errors, and status",
                "Control state CSS classes: ng-valid, ng-invalid, ng-pristine, ng-dirty, ng-touched, ng-untouched",
                "Value accessor: ngModel uses ControlValueAccessor to interface with form elements"
            ],
            "additionalExplanation": "The banana-in-a-box syntax [(ngModel)] is syntactic sugar for [ngModel] + (ngModelChange). Behind the scenes, ngModel registers itself with the parent ngForm, creates a FormControl, and communicates with form elements through ControlValueAccessor (built-in for inputs, selects, checkboxes, etc.)"
        },
        {
            "id": "ngmodelgroup-nested",
            "heading": "ngModelGroup – Nested Form Structures",
            "content": "ngModelGroup creates hierarchical form structures by grouping related controls into nested FormGroup objects.",
            "list": [
                "Wrap related fields: <div ngModelGroup='address'> groups address fields together",
                "Access nested group: #addressGroup='ngModelGroup' to check validity of address section only",
                "Validation at group level: Can apply cross-field validation on the group",
                "Nested value object: Form value becomes { address: { street: '', city: '' } }",
                "Useful for multi-step forms, billing/shipping addresses, payment details",
                "Combine with ngFor for dynamic groups (with careful trackBy implementation)"
            ],
            "additionalExplanation": "ngModelGroup creates nested JSON structures in your form value. This is essential for complex forms where data naturally belongs together. The nested group can have its own validation state independent of the parent form, allowing section-by-section validation feedback."
        },
        {
            "id": "formsmodule-validation",
            "heading": "Template-Driven Validation – Built-in & Custom",
            "content": "Validation in FormsModule uses HTML5 validation attributes enhanced with Angular's validation directives.",
            "list": [
                "Built-in validators: required, minlength, maxlength, pattern, email, requiredTrue (checkbox)",
                "Apply directly as attributes: <input required minlength='3' pattern='[A-Z]+'>",
                "Access validation errors: #nameCtrl='ngModel' then nameCtrl.errors?.required, nameCtrl.errors?.minlength",
                "Display error messages conditionally: *ngIf='nameCtrl.invalid && nameCtrl.touched'",
                "Custom validation: Create directive implementing Validator interface",
                "Async validation: Directive implementing AsyncValidator, useful for username availability"
            ],
            "additionalExplanation": "Template-driven validation is declarative and intuitive. Error objects contain detailed information: minlength gives required length and actual length; pattern shows the failed value. Custom validators must be implemented as directives with NG_VALIDATORS provider registration."
        },
        {
            "id": "formsmodule-performance",
            "heading": "Performance Considerations with FormsModule",
            "content": "While FormsModule is simpler to use, it has performance implications for large forms due to its implicit control creation and change detection.",
            "list": [
                "Each ngModel creates a FormControl instance and registers it with parent - overhead for hundreds of fields",
                "Two-way binding triggers change detection on every keystroke - consider one-way binding + manual sync",
                "Use trackBy with ngFor + ngModelGroup to prevent DOM thrashing",
                "Consider OnPush change detection strategy with immutable data patterns",
                "Debounce user input for expensive operations (validation API calls)",
                "Lazy load large forms using Angular's lazy loading features"
            ],
            "additionalExplanation": "For forms with more than 50-100 fields, Reactive Forms typically perform better because you control when controls are created and how change detection propagates. FormsModule creates controls during template rendering, which can be expensive in large dynamic forms."
        }
    ],
    "codeExamples": [
        {
            "title": "Complete FormsModule Example with Nested Groups and Validation",
            "language": "typescript",
            "code": "import { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-registration',\n  standalone: true,\n  imports: [FormsModule],\n  template: `\n    <form #regForm='ngForm' (ngSubmit)='onSubmit(regForm.value)'>\n      <!-- Personal Information -->\n      <div ngModelGroup='personal' #personalGroup='ngModelGroup'>\n        <h3>Personal Information</h3>\n        \n        <input \n          name='fullName' \n          [(ngModel)]='user.fullName' \n          required \n          minlength='3'\n          #nameCtrl='ngModel'>\n        <div *ngIf='nameCtrl.invalid && nameCtrl.touched'>\n          <span *ngIf='nameCtrl.errors?.[\"required\"]'>Name is required</span>\n          <span *ngIf='nameCtrl.errors?.[\"minlength\"]'>\n            Min length is {{nameCtrl.errors?.[\"minlength\"].requiredLength}}\n          </span>\n        </div>\n\n        <input \n          type='email' \n          name='email' \n          [(ngModel)]='user.email' \n          required \n          email\n          #emailCtrl='ngModel'>\n        <div *ngIf='emailCtrl.invalid && emailCtrl.touched'>\n          Valid email is required\n        </div>\n      </div>\n\n      <!-- Address Information -->\n      <div ngModelGroup='address'>\n        <h3>Address</h3>\n        <input name='street' [(ngModel)]='user.address.street' required>\n        <input name='city' [(ngModel)]='user.address.city' required>\n        <input \n          name='zip' \n          [(ngModel)]='user.address.zip' \n          pattern='[0-9]{5}'\n          #zipCtrl='ngModel'>\n        <div *ngIf='zipCtrl.invalid && zipCtrl.touched'>\n          ZIP must be 5 digits\n        </div>\n      </div>\n\n      <button type='submit' [disabled]='regForm.invalid'>Register</button>\n      <button type='button' (click)='resetForm(regForm)'>Reset</button>\n    </form>\n  `\n})\nexport class RegistrationComponent {\n  user = {\n    fullName: '',\n    email: '',\n    address: {\n      street: '',\n      city: '',\n      zip: ''\n    }\n  };\n\n  onSubmit(formValue: any) {\n    console.log('Form submitted:', formValue);\n    console.log('Raw user model:', this.user);\n  }\n\n  resetForm(form: any) {\n    form.reset();\n    this.user = {\n      fullName: '',\n      email: '',\n      address: { street: '', city: '', zip: '' }\n    };\n  }\n}"
        },
        {
            "title": "Custom Validator Directive for Template-Driven Forms",
            "language": "typescript",
            "code": "import { Directive, Input } from '@angular/core';\nimport { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';\n\n@Directive({\n  selector: '[appForbiddenName]',\n  standalone: true,\n  providers: [\n    {\n      provide: NG_VALIDATORS,\n      useExisting: ForbiddenNameDirective,\n      multi: true\n    }\n  ]\n})\nexport class ForbiddenNameDirective implements Validator {\n  @Input('appForbiddenName') forbiddenName: string = '';\n\n  validate(control: AbstractControl): ValidationErrors | null {\n    if (!control.value || !this.forbiddenName) return null;\n    \n    const regex = new RegExp(this.forbiddenName, 'i');\n    const forbidden = regex.test(control.value);\n    \n    return forbidden ? { forbiddenName: { value: control.value } } : null;\n  }\n}\n\n// Usage in template:\n// <input name='username' [(ngModel)]='user.username' appForbiddenName='admin'>\n// <div *ngIf='usernameCtrl.errors?.[\"forbiddenName\"]'>\n//   Username cannot contain 'admin'\n// </div>"
        },
        {
            "title": "Custom ControlValueAccessor for FormsModule",
            "language": "typescript",
            "code": "import { Component, forwardRef } from '@angular/core';\nimport { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-rating-input',\n  standalone: true,\n  imports: [FormsModule],\n  template: `\n    <div class='rating'>\n      <button *ngFor='let star of [1,2,3,4,5]' \n              type='button'\n              (click)='setRating(star)'\n              [class.active]='star <= value'>\n        ★\n      </button>\n    </div>\n  `,\n  providers: [\n    {\n      provide: NG_VALUE_ACCESSOR,\n      useExisting: forwardRef(() => RatingInputComponent),\n      multi: true\n    }\n  ]\n})\nexport class RatingInputComponent implements ControlValueAccessor {\n  value: number = 0;\n  onChange: any = () => {};\n  onTouched: any = () => {};\n\n  writeValue(value: number): void {\n    this.value = value || 0;\n  }\n\n  registerOnChange(fn: any): void {\n    this.onChange = fn;\n  }\n\n  registerOnTouched(fn: any): void {\n    this.onTouched = fn;\n  }\n\n  setDisabledState?(isDisabled: boolean): void {}\n\n  setRating(rating: number): void {\n    this.value = rating;\n    this.onChange(rating);\n    this.onTouched();\n  }\n}\n\n// Usage in parent form:\n// <app-rating-input name='rating' [(ngModel)]='product.rating'></app-rating-input>"
        }
    ],
    "bestPractices": [
        "Always export ngForm via template reference (#form='ngForm') to access form state in template",
        "Use one-way binding [ngModel] instead of [(ngModel)] when immediate sync isn't needed (better performance)",
        "Always expose control state variables (#ctrl='ngModel') for accurate validation feedback",
        "Group related fields with ngModelGroup to create structured form values and sectional validation",
        "Create reusable custom validator directives for validation logic used across multiple forms",
        "Use trackBy with ngFor + ngModelGroup to prevent performance issues in dynamic sections",
        "Reset forms using form.reset() rather than manually clearing model (resets validation state too)",
        "Prefer Reactive Forms when form structure is dynamic or exceeds 30-50 fields",
        "Combine FormsModule with OnPush change detection using immutable data updates",
        "Implement ControlValueAccessor for custom form controls to work seamlessly with ngModel",
        "Use form.submitted property to show validation errors after first submission attempt",
        "Keep template logic minimal - extract complex validation conditions to component getters"
    ]
};

export const REACTIVE_FORMS_MODULE_DEEP_DIVE = {
    "title": "Angular ReactiveFormsModule: Complete Programmatic Forms Guide – FormBuilder, FormControl, FormGroup, FormArray, Typed Forms, Value Changes, Status Changes, and Enterprise Patterns",
    "tags": ["Angular", "ReactiveFormsModule", "FormBuilder", "FormControl", "FormGroup", "FormArray", "Typed Forms", "ValueChanges", "StatusChanges", "Form Record"],
    "paragraphs": [
        "ReactiveFormsModule is Angular's programmatic approach to form handling, providing explicit control over form structure, validation, and data flow. Unlike template-driven forms, Reactive Forms are defined in the component class, offering complete predictability, immutability, and seamless integration with RxJS. This comprehensive guide covers everything from basic FormControl creation to advanced typed forms (Angular 14+), form arrays, dynamic form generation, custom value accessors, and enterprise-level form architecture patterns. Master the reactive paradigm for complex, testable, and scalable Angular forms."
    ],
    "keyPoints": [
        "ReactiveFormsModule provides directives (formGroup, formControlName, formArrayName) but form classes are defined in component",
        "FormBuilder service reduces boilerplate for creating FormGroup, FormControl, FormArray instances",
        "FormControl: Tracks value and validation status of individual form control",
        "FormGroup: Aggregates controls as object, validates at group level, creates nested structures",
        "FormArray: Manages ordered collection of controls (dynamic rows, repeatable sections)",
        "Typed Forms (Angular 14.1+): FormGroup<{ name: FormControl<string> }> provides type safety",
        "NonNullableFormBuilder: Creates controls that cannot be null",
        "FormRecord: For dynamic groups with unknown keys at compile time (Angular 15+)",
        "valueChanges & statusChanges: Observable streams for reactive programming with RxJS",
        "Explicit control creation leads to better testability and predictability"
    ],
    "sections": [
        {
            "id": "reactive-forms-setup",
            "heading": "ReactiveFormsModule – Setup and Core Directives",
            "content": "ReactiveFormsModule provides the directives that connect component form models to the template, while form classes are explicitly instantiated in the component.",
            "list": [
                "Import ReactiveFormsModule: standalone: imports: [ReactiveFormsModule] or @NgModule imports",
                "Create FormGroup in component: this.form = this.fb.group({...})",
                "Template binding: <form [formGroup]='form'> connects template to component form instance",
                "formControlName: <input formControlName='name'> binds input to specific control in the group",
                "formGroupName: <div formGroupName='address'> for nested groups",
                "formArrayName: <div formArrayName='phones'> for dynamic arrays",
                "No ngModel! Reactive forms use explicit value and status streams"
            ],
            "additionalExplanation": "The key distinction from FormsModule is that ReactiveFormsModule directives only connect existing form instances to the DOM - they never create controls automatically. This separation of model (component) and view (template) is what makes reactive forms predictable and testable."
        },
        {
            "id": "formbuilder-patterns",
            "heading": "FormBuilder – Advanced Patterns and Typed Forms",
            "content": "FormBuilder is a dependency-injected service that provides syntactic sugar for creating form controls with less boilerplate.",
            "list": [
                "Basic injection: constructor(private fb: FormBuilder) {}",
                "Standard syntax: this.fb.group({ name: ['', Validators.required] })",
                "Nested groups: this.fb.group({ address: this.fb.group({ street: '' }) })",
                "Form arrays: this.fb.array([this.fb.control('')])",
                "Typed FormBuilder (Angular 14+): this.fb.group<{ name: FormControl<string> }>({...})",
                "NonNullableFormBuilder: controls that can't be set to null (Angular 14+)",
                "FormBuilder.record(): creates FormRecord for dynamic property names (Angular 15+)"
            ],
            "additionalExplanation": "FormBuilder doesn't add new functionality - it's purely syntactic sugar. Each this.fb.control('') is equivalent to new FormControl(''). However, FormBuilder significantly reduces code verbosity and improves readability, especially with nested structures and arrays."
        },
        {
            "id": "formcontrol-deep-dive",
            "heading": "FormControl – Complete API and Advanced Usage",
            "content": "FormControl is the atomic unit of reactive forms, managing the value, validation state, and disabled status of a single form field.",
            "list": [
                "Constructor: new FormControl(initialValue, [validators], [asyncValidators])",
                "Value operations: setValue(), patchValue(), reset(), getRawValue() (includes disabled controls)",
                "Status: valid, invalid, pending, disabled, enabled, pristine, dirty, touched, untouched",
                "Errors: errors property returns null or validation error object",
                "Events: valueChanges (Observable), statusChanges (Observable), events (Observable of all changes)",
                "Parent communication: root, parent properties for tree navigation",
                "Disable/Enable: disable(), enable() with emitEvent option to control valueChanges emission",
                "UpdateOn: 'change' (default) | 'blur' | 'submit' - when validation/value updates occur"
            ],
            "additionalExplanation": "FormControl is a powerful class that extends AbstractControl. Understanding its full API is essential for advanced form manipulation. The getRawValue() method is particularly useful when you need the form value including disabled controls. The updateOn strategy can dramatically improve UX for expensive validation (e.g., server-side validation on blur instead of every keystroke)."
        },
        {
            "id": "formgroup-mastery",
            "heading": "FormGroup – Aggregation, Nesting, and Cross-Field Validation",
            "content": "FormGroup aggregates multiple controls into a single object, enabling hierarchical form structures and validation across multiple fields.",
            "list": [
                "Constructor: new FormGroup({ name: new FormControl('') })",
                "Control retrieval: .get('name'), .get('address.street'), .get(['address', 'street'])",
                "Add/remove controls: addControl(name, control), removeControl(name), setControl(name, control)",
                "Contains: contains(name) checks if control exists",
                "SetValue: Requires exact shape matching all controls (throws error if mismatch)",
                "PatchValue: Partial updates, only updates specified controls",
                "Cross-field validation: Validator function receives the entire FormGroup",
                "Nested groups: Access nested validation state: form.get('address').valid"
            ],
            "additionalExplanation": "FormGroup is not just a container - it's a validation and value aggregation engine. Cross-field validation (e.g., password confirmation) must be implemented at the FormGroup level because individual FormControls don't know about each other. The validator function receives the entire group and can access all child controls."
        },
        {
            "id": "formarray-expert",
            "heading": "FormArray – Dynamic Collections and Repeatable Sections",
            "content": "FormArray manages an ordered list of AbstractControl instances (FormControl, FormGroup, or even nested FormArrays), essential for dynamic forms.",
            "list": [
                "Creation: this.fb.array([this.fb.control(''), this.fb.control('')])",
                "Dynamic addition: .push(this.fb.control('')), .insert(index, control)",
                "Removal: .removeAt(index), .clear() (removes all), .pop()",
                "Replacement: .setControl(index, control)",
                "Length: .length property (not a method!)",
                "Iteration: .controls.forEach(), or *ngFor with formArrayName",
                "Validation: ValidatorFn receives entire array, can validate min length, unique values, etc.",
                "Performance: Use .at(index) for direct access, avoid recreating entire array"
            ],
            "additionalExplanation": "FormArray is often misunderstood. It doesn't require all controls to be of the same type - you can mix FormControl, FormGroup, and even other FormArrays. For complex dynamic forms (e.g., order items with name, price, quantity), each array element should be a FormGroup. Always create factory functions for array items to ensure clean, reusable code."
        },
        {
            "id": "typed-forms",
            "heading": "Typed Forms – Full Type Safety (Angular 14+)",
            "content": "Angular 14 introduced typed forms, eliminating the any type for form.value and providing compile-time type checking for form structures.",
            "list": [
                "FormGroup<T>: T is an object type where each property extends AbstractControl",
                "FormControl<T>: Generic type parameter defines the control's value type",
                "FormArray<T>: Generic type parameter defines the type of each control in the array",
                "Typed FormBuilder: this.fb.group<{ name: FormControl<string> }>({...})",
                "NonNullableFormBuilder: Controls that cannot be null or undefined",
                "FormRecord<T>: For dynamic groups with string keys and same value type (Angular 15+)",
                "Untyped fallbacks: UntypedFormGroup, UntypedFormControl for gradual migration",
                "Type-safe value: form.value.name is now string instead of any"
            ],
            "additionalExplanation": "Typed forms represent a major improvement in Angular's type safety. Previously, form.value was implicitly any, leading to runtime errors. Now, the type system ensures you never access non-existent properties or assign wrong types. Migration can be incremental using untyped variants for legacy code while adopting typed forms in new components."
        }
    ],
    "codeExamples": [
        {
            "title": "Complete Typed Reactive Form with Nested Groups and FormArray",
            "language": "typescript",
            "code": "import { Component, inject } from '@angular/core';\nimport { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';\n\n// Define the form shape with full type safety\ninterface PhoneForm {\n  number: FormControl<string>;\n  type: FormControl<'mobile' | 'home' | 'work'>;\n}\n\ninterface AddressForm {\n  street: FormControl<string>;\n  city: FormControl<string>;\n  zipCode: FormControl<string>;\n  country: FormControl<string>;\n}\n\ninterface UserForm {\n  name: FormControl<string>;\n  email: FormControl<string>;\n  age: FormControl<number | null>;\n  address: FormGroup<AddressForm>;\n  phones: FormArray<FormGroup<PhoneForm>>;\n  preferences: FormRecord<FormControl<boolean>>;\n}\n\n@Component({\n  selector: 'app-typed-user-form',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: `\n    <form [formGroup]='userForm' (ngSubmit)='onSubmit()'>\n      <!-- Basic Fields -->\n      <input formControlName='name' placeholder='Name'>\n      <div *ngIf='userForm.controls.name.invalid && userForm.controls.name.touched'>\n        Name is required\n      </div>\n\n      <input formControlName='email' type='email' placeholder='Email'>\n      \n      <!-- Nested FormGroup -->\n      <div formGroupName='address'>\n        <input formControlName='street' placeholder='Street'>\n        <input formControlName='city' placeholder='City'>\n      </div>\n\n      <!-- FormArray -->\n      <div formArrayName='phones'>\n        <div *ngFor='let phone of phones.controls; let i=index'>\n          <div [formGroupName]='i'>\n            <input formControlName='number' placeholder='Phone number'>\n            <select formControlName='type'>\n              <option value='mobile'>Mobile</option>\n              <option value='home'>Home</option>\n              <option value='work'>Work</option>\n            </select>\n            <button type='button' (click)='removePhone(i)'>Remove</button>\n          </div>\n        </div>\n        <button type='button' (click)='addPhone()'>Add Phone</button>\n      </div>\n\n      <!-- FormRecord -->\n      <div formGroupName='preferences'>\n        <label>\n          <input type='checkbox' formControlName='newsletter'>\n          Receive Newsletter\n        </label>\n        <label>\n          <input type='checkbox' formControlName='promotions'>\n          Receive Promotions\n        </label>\n      </div>\n\n      <button type='submit' [disabled]='userForm.invalid'>Submit</button>\n    </form>\n  `\n})\nexport class TypedUserFormComponent {\n  private fb = inject(NonNullableFormBuilder);\n\n  // Fully typed form group\n  userForm: FormGroup<UserForm> = this.fb.group({\n    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)] }),\n    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),\n    age: this.fb.control<number | null>(null),\n    address: this.fb.group<AddressForm>({\n      street: this.fb.control('', Validators.required),\n      city: this.fb.control('', Validators.required),\n      zipCode: this.fb.control('', Validators.pattern(/^[0-9]{5}$/)),\n      country: this.fb.control('USA')\n    }),\n    phones: this.fb.array<FormGroup<PhoneForm>>([]),\n    preferences: this.fb.record<boolean>({\n      newsletter: true,\n      promotions: false\n    })\n  });\n\n  get phones(): FormArray<FormGroup<PhoneForm>> {\n    return this.userForm.controls.phones;\n  }\n\n  addPhone(): void {\n    const phoneGroup = this.fb.group<PhoneForm>({\n      number: this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),\n      type: this.fb.control('mobile', Validators.required)\n    });\n    this.phones.push(phoneGroup);\n  }\n\n  removePhone(index: number): void {\n    this.phones.removeAt(index);\n  }\n\n  onSubmit(): void {\n    if (this.userForm.valid) {\n      // TypeScript knows userForm.value has correct types\n      const formValue: UserForm = this.userForm.getRawValue();\n      console.log(formValue.name.toUpperCase()); // Safe: name is string\n      console.log(formValue.phones[0].type); // Safe: type is 'mobile' | 'home' | 'work'\n    }\n  }\n}"
        },
        {
            "title": "Advanced RxJS Integration with valueChanges",
            "language": "typescript",
            "code": "import { Component, OnInit, OnDestroy, inject } from '@angular/core';\nimport { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';\nimport { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil, filter, map, pairwise, startWith } from 'rxjs';\nimport { UserService } from './user.service';\n\n@Component({\n  selector: 'app-rxjs-form',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: `\n    <form [formGroup]='searchForm'>\n      <input formControlName='username' placeholder='Username'>\n      <span *ngIf='checking$ | async'>Checking availability...</span>\n      <span *ngIf='usernameAvailable$ | async as available'>\n        {{ available ? '✅ Available' : '❌ Taken' }}\n      </span>\n      \n      <input formControlName='search' placeholder='Search...'>\n      <div>Search results: {{ searchResults$ | async | json }}</div>\n    </form>\n  `\n})\nexport class RxjsFormComponent implements OnInit, OnDestroy {\n  private fb = inject(FormBuilder);\n  private userService = inject(UserService);\n  private destroy$ = new Subject<void>();\n\n  searchForm: FormGroup = this.fb.group({\n    username: ['', Validators.required, [this.usernameAvailabilityValidator.bind(this)]],\n    search: ['']\n  });\n\n  checking$ = new Subject<boolean>();\n  usernameAvailable$ = this.searchForm.controls.username.statusChanges.pipe(\n    map(status => status === 'VALID'),\n    startWith(false)\n  );\n\n  searchResults$ = this.searchForm.controls.search.valueChanges.pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    filter(query => query.length >= 3),\n    switchMap(query => this.userService.searchUsers(query)),\n    takeUntil(this.destroy$)\n  );\n\n  ngOnInit(): void {\n    // Monitor form changes over time\n    this.searchForm.valueChanges.pipe(\n      pairwise(),\n      takeUntil(this.destroy$)\n    ).subscribe(([prev, curr]) => {\n      console.log('Form changed from', prev, 'to', curr);\n    });\n\n    // Conditional field enabling\n    this.searchForm.controls.username.statusChanges.pipe(\n      takeUntil(this.destroy$)\n    ).subscribe(status => {\n      if (status === 'VALID') {\n        this.searchForm.controls.search.enable();\n      } else {\n        this.searchForm.controls.search.disable();\n      }\n    });\n  }\n\n  usernameAvailabilityValidator(control: AbstractControl) {\n    this.checking$.next(true);\n    return control.valueChanges.pipe(\n      debounceTime(400),\n      distinctUntilChanged(),\n      switchMap(username => this.userService.checkUsername(username)),\n      map(isAvailable => isAvailable ? null : { unavailable: true }),\n      takeUntil(this.destroy$),\n      tap(() => this.checking$.next(false))\n    );\n  }\n\n  ngOnDestroy(): void {\n    this.destroy$.next();\n    this.destroy$.complete();\n  }\n}"
        },
        {
            "title": "Dynamic Form Generation from JSON Schema",
            "language": "typescript",
            "code": "import { Component, Input, OnInit, inject } from '@angular/core';\nimport { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';\n\ninterface FormFieldConfig {\n  name: string;\n  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'array';\n  label: string;\n  validators?: string[];\n  options?: Array<{ value: any; label: string }>;\n  fields?: FormFieldConfig[]; // For nested groups\n  arrayConfig?: FormFieldConfig[]; // For array items\n  defaultValue?: any;\n}\n\n@Component({\n  selector: 'app-dynamic-form',\n  standalone: true,\n  imports: [ReactiveFormsModule, CommonModule],\n  template: `\n    <form [formGroup]='form' (ngSubmit)='onSubmit()'>\n      <ng-container *ngFor='let field of config'>\n        <ng-container [ngSwitch]='field.type'>\n          <!-- Simple Input -->\n          <div *ngSwitchCase='\"text\"' class='form-field'>\n            <label>{{field.label}}</label>\n            <input [formControlName]='field.name' [type]='field.type'>\n          </div>\n\n          <!-- Select Dropdown -->\n          <div *ngSwitchCase='\"select\"'>\n            <label>{{field.label}}</label>\n            <select [formControlName]='field.name'>\n              <option *ngFor='let opt of field.options' [value]='opt.value'>\n                {{opt.label}}\n              </option>\n            </select>\n          </div>\n\n          <!-- Checkbox -->\n          <div *ngSwitchCase='\"checkbox\"'>\n            <label>\n              <input type='checkbox' [formControlName]='field.name'>\n              {{field.label}}\n            </label>\n          </div>\n\n          <!-- Form Array -->\n          <div *ngSwitchCase='\"array\"' formArrayName='field.name'>\n            <label>{{field.label}}</label>\n            <div *ngFor='let item of getFormArray(field.name).controls; let i=index' [formGroupName]='i'>\n              <ng-container *ngFor='let subField of field.arrayConfig'>\n                <!-- Recursive rendering for array items -->\n                <!-- Similar ngSwitch structure for subField.type -->\n              </ng-container>\n              <button type='button' (click)='removeArrayItem(field.name, i)'>Remove</button>\n            </div>\n            <button type='button' (click)='addArrayItem(field.name, field.arrayConfig)'>Add {{field.label}}</button>\n          </div>\n\n          <!-- Additional cases for 'email', 'number', 'radio', etc. -->\n        </ng-container>\n      </ng-container>\n      <button type='submit' [disabled]='form.invalid'>Submit</button>\n    </form>\n  `\n})\nexport class DynamicFormComponent implements OnInit {\n  @Input() config: FormFieldConfig[] = [];\n  form: FormGroup = this.fb.group({});\n\n  private fb = inject(FormBuilder);\n\n  ngOnInit(): void {\n    this.buildForm(this.config);\n  }\n\n  buildForm(config: FormFieldConfig[], parentGroup: FormGroup = this.form): void {\n    config.forEach(field => {\n      const validators = this.mapValidators(field.validators);\n      if (field.type === 'array') {\n        const formArray = this.fb.array([]);\n        parentGroup.addControl(field.name, formArray);\n        // Optionally initialize with default items\n      } else if (field.fields) {\n        const nestedGroup = this.fb.group({});\n        parentGroup.addControl(field.name, nestedGroup);\n        this.buildForm(field.fields, nestedGroup);\n      } else {\n        parentGroup.addControl(field.name, this.fb.control(field.defaultValue || '', validators));\n      }\n    });\n  }\n\n  mapValidators(validatorNames?: string[]): ValidatorFn[] {\n    const validatorMap: { [key: string]: ValidatorFn } = {\n      required: Validators.required,\n      email: Validators.email,\n      minLength: (length: number) => Validators.minLength(length),\n      // Add more mappings as needed\n    };\n    return (validatorNames || []).map(name => {\n      const [validatorName, param] = name.split(':');\n      return validatorMap[validatorName]?.(param) || null;\n    }).filter(v => v !== null) as ValidatorFn[];\n  }\n\n  getFormArray(name: string): FormArray {\n    return this.form.get(name) as FormArray;\n  }\n\n  addArrayItem(arrayName: string, config: FormFieldConfig[]): void {\n    const formArray = this.getFormArray(arrayName);\n    const group = this.fb.group({});\n    this.buildForm(config, group);\n    formArray.push(group);\n  }\n\n  removeArrayItem(arrayName: string, index: number): void {\n    this.getFormArray(arrayName).removeAt(index);\n  }\n\n  onSubmit(): void {\n    if (this.form.valid) {\n      console.log('Form submitted:', this.form.value);\n    }\n  }\n}"
        }
    ],
    "bestPractices": [
        "Define form structure in component for better testability and maintainability",
        "Use FormBuilder to reduce boilerplate and improve readability",
        "Leverage typed forms for compile-time safety and better developer experience",
        "Use valueChanges and statusChanges for reactive programming patterns with RxJS",
        "Implement custom validators at the FormGroup level for cross-field validation",
        "Use FormArray for dynamic collections and ensure factory functions for array items",
        "Avoid direct manipulation of form controls in the template - keep logic in the component",
        "Use getRawValue() when you need the form value including disabled controls",
        "Consider updateOn: 'blur' for expensive validation to improve UX",
        "Use FormRecord for dynamic groups with unknown keys at compile time (Angular 15+)",
        "Always unsubscribe from valueChanges in ngOnDestroy to prevent memory leaks"
    ]
};
