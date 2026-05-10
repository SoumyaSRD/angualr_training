export const FORMS_MODULE_DEEP_DIVE = {
    "title": "Angular Template-Driven Forms: Complete Implementation Guide — [(ngModel)], Validation, and Lifecycle",
    "tags": ["Angular", "FormsModule", "ngModel", "Template-Driven Forms", "Validation", "Form State"],
    "paragraphs": [
        "Template-driven forms are the primary way to handle simple forms in Angular, leveraging directives in the template to manage data binding and validation. This approach is best suited for forms with straightforward requirements and minimal dynamic logic. By using the FormsModule and ngModel directive, Angular automatically creates a form model that mirrors the template structure, providing properties for value tracking, validation status (valid/invalid), and user interaction state (pristine/dirty/touched)."
    ],
    "keyPoints": [
        "FormsModule: Must be imported into the component's imports array or NgModule",
        "[(ngModel)]: Two-way data binding that synchronizes the template value with the component model",
        "name Attribute: Required on each form element for Angular to register it with the parent form",
        "ngForm: Template reference variable (#form='ngForm') used to access the entire form's state and value",
        "Validation Directives: Built-in attributes like required, minlength, maxlength, and pattern",
        "Form State: pristine (not changed), dirty (changed), touched (blurred), untouched (not blurred)",
        "Control State: Individual controls also have their own validity and interaction state variables",
        "onSubmit: Standard event handler typically bound to (ngSubmit) on the form element",
        "reset(): Method available on ngForm to clear the form value and validation state"
    ],
    "sections": [
        {
            "id": "template-forms-basics",
            "heading": "Basic Setup and [(ngModel)]",
            "content": "To use template-driven forms, import FormsModule and use ngModel for binding.",
            "list": [
                "Import FormsModule from @angular/forms",
                "Add [(ngModel)]='property' to form inputs",
                "Ensure each input has a unique 'name' attribute",
                "Use a template reference variable: <form #userForm='ngForm'>",
                "Access form data: userForm.value",
                "Check form validity: userForm.valid"
            ],
            "additionalExplanation": "The [(ngModel)] directive is the heart of template-driven forms. It creates a FormControl instance behind the scenes and binds it to the element. The 'name' attribute is crucial because it acts as the key in the form.value object."
        },
        {
            "id": "validation-feedback",
            "heading": "Validation and User Feedback",
            "content": "Angular provides CSS classes and status properties for real-time validation feedback.",
            "list": [
                "HTML Validators: required, minlength='3', pattern='[a-z]*'",
                "Status Classes: .ng-valid, .ng-invalid, .ng-touched, .ng-dirty",
                "Error Messages: Show errors only after user interaction (*ngIf='ctrl.invalid && ctrl.touched')",
                "Control Reference: #nameCtrl='ngModel' to access individual control state",
                "Submit Control: Disable button until valid: [disabled]='!userForm.valid'"
            ],
            "additionalExplanation": "Always wait for the 'touched' or 'dirty' state before showing error messages to avoid 'yelling' at the user as soon as the page loads. The .ng-invalid class can be used to style borders or backgrounds for immediate visual cues."
        }
    ],
    "codeExamples": [
        {
            "title": "Complete Template-Driven Form Implementation",
            "language": "typescript",
            "code": "import { Component } from '@angular/core';\nimport { FormsModule, NgForm } from '@angular/forms';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-user-registration',\n  standalone: true,\n  imports: [FormsModule, CommonModule],\n  template: `\n    <form #regForm='ngForm' (ngSubmit)='onRegister(regForm)'>\n      <div class='field'>\n        <label>Username</label>\n        <input \n          name='username' \n          [(ngModel)]='user.name' \n          required \n          minlength='4'\n          #userCtrl='ngModel'>\n        <span *ngIf='userCtrl.invalid && userCtrl.touched' class='error'>\n          Username must be at least 4 characters\n        </span>\n      </div>\n\n      <div class='field'>\n        <label>Email</label>\n        <input \n          name='email' \n          type='email'\n          [(ngModel)]='user.email' \n          required \n          email\n          #emailCtrl='ngModel'>\n        <span *ngIf='emailCtrl.invalid && emailCtrl.touched' class='error'>\n          Valid email is required\n        </span>\n      </div>\n\n      <button type='submit' [disabled]='regForm.invalid'>Register</button>\n      <button type='button' (click)='regForm.reset()'>Reset</button>\n    </form>\n  `\n})\nexport class RegistrationComponent {\n  user = { name: '', email: '' };\n\n  onRegister(form: NgForm) {\n    if (form.valid) {\n      console.log('User registered:', form.value);\n      // Actual registration logic\n    }\n  }\n}"
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
