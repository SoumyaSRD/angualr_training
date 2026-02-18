import{a as i}from"./chunk-ZO4N54AF.js";import"./chunk-7FNPREBO.js";import{Eb as t,Hb as o,jb as a}from"./chunk-HJWRZBIA.js";var s={title:"Angular Form Validation: Complete Guide \u2013 Built-in Validators, Custom Sync Validators, Async Validators, Cross-Field Validation, Dynamic Validation, Error Handling, and UX Patterns",tags:["Angular","Validation","Custom Validators","Async Validators","Cross-Field Validation","Error Handling","Form Validation","Validator Functions"],paragraphs:["Form validation is the cornerstone of good user experience and data integrity. Angular provides a comprehensive validation system that works seamlessly with both Template-Driven and Reactive Forms. This complete guide covers every aspect of form validation: built-in validators (required, email, minlength, pattern, etc.), creating reusable custom synchronous validators, implementing async validators for server-side checks (unique username, available dates), cross-field validation (password confirmation, date ranges), dynamic validation rules that change based on form state, conditional validation, proper error message display strategies, accessibility considerations, and performance optimization for validation. You'll learn how to create a validation system that's both user-friendly and maintainable."],keyPoints:["Built-in validators cover common cases: required, email, min, max, minLength, maxLength, pattern, requiredTrue","Custom sync validators: pure functions returning ValidationErrors | null","Custom async validators: return Observable<ValidationErrors | null> (server-side checks)","Cross-field validation: implemented at FormGroup/FormArray level, not individual FormControl","Validation runs on every value change by default (updateOn: 'change' | 'blur' | 'submit')","Error objects contain metadata: pattern required pattern, minlength includes required/actual lengths","Status flags: valid, invalid, pending, disabled, enabled","Validator composition: multiple validators execute in parallel","Async validators show 'pending' status while validating","Dynamic validation: add/remove validators at runtime"],sections:[{id:"built-in-validators",heading:"Built-in Validators \u2013 Complete API Reference",content:"Angular ships with a comprehensive set of built-in validators covering the most common validation scenarios. Understanding their precise behavior is crucial for correct implementation.",list:["Validators.required: Fails if value is null, undefined, empty string, or empty array","Validators.requiredTrue: Specifically for checkboxes requiring true value","Validators.email: RFC 5322 compliant email pattern validation","Validators.minLength(n): Valid only if value.length >= n (string or array)","Validators.maxLength(n): Valid only if value.length <= n","Validators.min(n): Valid only if numeric value >= n","Validators.max(n): Valid only if numeric value <= n","Validators.pattern(regex|string): Valid if value matches regex pattern","Validators.nullValidator: Does nothing (useful for conditional validation)","Validators.compose([...]): Combine multiple validators into one","Validators.composeAsync([...]): Combine multiple async validators"],additionalExplanation:"Important nuances: required treats empty string as invalid, while whitespace is considered valid (use custom pattern to reject whitespace). email validator is strict - 'test@test' fails because no TLD. min/max work with numbers only - string numbers like '5' won't work without conversion. minLength/maxLength work with arrays too (useful for FormArray)."},{id:"custom-sync-validators",heading:"Custom Synchronous Validators \u2013 Factory Functions and Parameterization",content:"Custom synchronous validators are pure functions that take an AbstractControl and return either null (valid) or a ValidationErrors object (invalid). The factory pattern enables parameterized validators.",list:["Basic validator: function forbiddenName(control: AbstractControl): ValidationErrors | null","Factory pattern: export function forbiddenNameValidator(forbiddenRegex: RegExp): ValidatorFn","Return format: { errorKey: true } or { errorKey: { value: 'failedValue', ...metadata } }","Multiple errors: Can return multiple errors simultaneously","Control types: Handle different control types gracefully (FormControl, FormGroup, FormArray)","Composition: Combine with built-in validators using Validators.compose","Registration: Use directly in FormControl validators array","Testing: Pure functions are trivially testable"],additionalExplanation:"Custom validators should be pure functions with no side effects. Factory functions are essential for validators that need configuration (like a forbidden word list). ValidationErrors objects should be descriptive - include the invalid value, expected format, or other metadata to help templates display meaningful error messages. Always handle null/undefined values gracefully - typically pass validation (return null) for empty values unless combined with required."},{id:"async-validators",heading:"Async Validators \u2013 Server-Side Validation Patterns",content:"Async validators handle validation that requires server communication, such as checking username availability, validating credit cards, or verifying zip codes. They return Observables or Promises.",list:["Implementation: (control: AbstractControl) => Observable<ValidationErrors | null>","Pending state: control.pending = true while async validation in progress","Debouncing: Always debounce async validators to prevent API spam","DistinctUntilChanged: Only validate when value actually changes","SwitchMap: Cancel in-flight requests when new value arrives","Error handling: Catch server errors and return null (or specific error)","Timing: Async validators run after sync validators pass","Multiple async validators: Run in parallel via Validators.composeAsync","Update strategy: Consider updateOn: 'blur' for async validation","Loading indicators: Show spinner while control.pending === true"],additionalExplanation:"Async validators are often misunderstood. They only run if all synchronous validators pass. Always include takeUntil or proper unsubscription to prevent memory leaks. The pending state is automatically managed - use it to show loading spinners. For optimal UX, combine with debounceTime(300-500) and distinctUntilChanged, and consider updateOn: 'blur' to avoid validating on every keystroke."},{id:"cross-field-validation",heading:"Cross-Field Validation \u2013 FormGroup and FormArray Level",content:"Cross-field validation validates relationships between multiple controls. Since individual FormControls don't know about each other, these validators must be attached at the FormGroup or FormArray level.",list:["FormGroup validator: function that receives entire FormGroup, accesses child controls via .get()","Password confirmation: Compare password and confirmPassword fields","Date ranges: Ensure end date >= start date","Conditional required: Field A required if Field B has certain value","FormArray validation: Ensure unique values across array items","Implementation: Validator receives AbstractControl (cast to FormGroup/FormArray)","Error attachment: Errors appear on the group/array, not individual controls","Template display: Access errors via form.get('groupName')?.errors"],additionalExplanation:"Cross-field validators are often implemented incorrectly. Remember: the error is attached to the group, not the individual controls. When showing error messages, you need to check the group's errors. For password confirmation, the error should appear near the confirm password field, but the validator runs on the group. A common pattern is to set the error on the specific sub-control manually, but the clean approach is to display group errors near the relevant field."},{id:"dynamic-validation",heading:"Dynamic Validation \u2013 Runtime Validator Changes",content:"Dynamic validation adapts validation rules based on form state, user roles, or application conditions. Angular provides APIs to add, remove, and replace validators at runtime.",list:["Add validator: control.addValidators(validatorFn)","Remove validator: control.removeValidators(validatorFn)","Replace all: control.setValidators([...])","Clear validators: control.setValidators(null)","Update validity: Must call control.updateValueAndValidity() after changes","Conditional validation: Add/remove required based on checkbox value","Role-based validation: Different validation rules for admin vs user","Async dynamic: Change async validators based on selected validation method","Performance: Avoid frequent validator changes on high-frequency events","Factory reset: Remember to clear old validators before adding new ones"],additionalExplanation:"Dynamic validation is powerful but easy to misuse. The most common mistake is forgetting to call updateValueAndValidity() after modifying validators - the form continues using the old validation rules. Also, when replacing validators, clear the old ones first with setValidators([]) or setValidators(null). For complex conditional validation, consider creating a single validator that internally checks conditions rather than dynamically adding/removing validators."},{id:"error-display-ux",heading:"Error Display Strategies \u2013 UX Patterns and Accessibility",content:"How and when to display validation errors significantly impacts user experience. Angular provides status flags to implement sophisticated error display strategies.",list:["Immediate feedback: Show errors as user types (valid but aggressive)","On blur: Show errors when field loses focus (balanced approach)","On submit: Show all errors after form submission (patient approach)","Conditional display: *ngIf='control.invalid && (control.touched || form.submitted)'","Error aggregation: Show all form errors in summary at top/bottom","Inline errors: Display error next to each field","Tooltip errors: Show errors on hover/focus (space-efficient)","Accessibility: aria-describedby, aria-invalid, role='alert', live regions","Styling: Visual indicators (red border) + text + icons","Debounced validation: Wait for pause in typing before showing errors"],additionalExplanation:"The consensus best practice is: show field-level errors after the field has been touched AND is invalid, and show all errors after form submission attempt. This avoids overwhelming users with errors before they've had a chance to complete the form. The markAllAsTouched() method is essential for showing all errors on submit. Always combine visual indicators with text explanations, and ensure error messages are accessible to screen readers."}],codeExamples:[{title:"Complete Validation Library \u2013 Reusable Validators",language:"typescript",code:`import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, FormArray } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// ==================== SYNC VALIDATORS ====================

export class CustomValidators {
  
  /**
   * Validates that value contains at least one uppercase, one lowercase, one number
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      
      const valid = hasUpperCase && hasLowerCase && hasNumeric;
      return valid ? null : { weakPassword: true };
    };
  }

  /**
   * Validates that value is not only whitespace
   */
  static notOnlyWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const isValid = value.trim().length > 0;
      return isValid ? null : { whitespace: true };
    };
  }

  /**
   * Validates that value is a valid phone number (configurable)
   */
  static phoneNumber(countryCode: string = 'US'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const patterns: Record<string, RegExp> = {
        'US': /^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$/,
        'UK': /^((\\+44)|(0))\\d{10}$/,
        'DE': /^\\+49\\d{10,11}$/
      };
      
      const pattern = patterns[countryCode] || patterns['US'];
      const isValid = pattern.test(value);
      
      return isValid ? null : { 
        phone: { 
          value, 
          countryCode,
          message: \`Invalid phone format for \${countryCode}\` 
        } 
      };
    };
  }

  /**
   * Validates that value matches a regex pattern with custom error message
   */
  static patternWithMessage(pattern: RegExp, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const isValid = pattern.test(value);
      return isValid ? null : { pattern: { requiredPattern: pattern, actualValue: value, message } };
    };
  }

  /**
   * Validates that array has no duplicate values (for FormArray)
   */
  static uniqueValues(): ValidatorFn {
    return (array: AbstractControl): ValidationErrors | null => {
      if (!(array instanceof FormArray)) return null;
      
      const values = array.controls
        .map(control => control.value)
        .filter(v => v != null && v !== '');
      
      const hasDuplicates = new Set(values).size !== values.length;
      return hasDuplicates ? { duplicateValues: true } : null;
    };
  }

  /**
   * Validates that selected date is not in the past
   */
  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return date >= today ? null : { pastDate: { value: control.value } };
    };
  }

  // ==================== ASYNC VALIDATORS ====================

  /**
   * Async validator to check username availability
   */
  static usernameAvailable(userService: any): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.length < 3) {
        return of(null); // Don't check if too short
      }

      return control.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(username => userService.checkUsername(username)),
        map(isAvailable => isAvailable ? null : { usernameTaken: true }),
        catchError(() => of(null)) // Return null (valid) on API error
      );
    };
  }

  /**
   * Async validator to validate credit card
   */
  static creditCard(paymentService: any): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const cardNumber = control.value?.replace(/\\s/g, '');
      
      if (!cardNumber || cardNumber.length < 15) {
        return of(null);
      }

      return paymentService.validateCard(cardNumber).pipe(
        map(response => response.valid ? null : { 
          creditCard: { 
            message: response.message || 'Invalid card number' 
          } 
        }),
        catchError(() => of(null))
      );
    };
  }

  // ==================== CROSS-FIELD VALIDATORS ====================

  /**
   * Cross-field validator for password confirmation
   */
  static passwordMatch(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirm = group.get(confirmPasswordKey)?.value;
      
      return password === confirm ? null : { 
        passwordMismatch: { 
          message: 'Passwords do not match' 
        } 
      };
    };
  }

  /**
   * Cross-field validator for date range
   */
  static dateRange(startKey: string, endKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = new Date(group.get(startKey)?.value);
      const end = new Date(group.get(endKey)?.value);
      
      if (!start || !end) return null;
      
      return start <= end ? null : { 
        dateRange: { 
          message: 'End date must be after start date' 
        } 
      };
    };
  }

  /**
   * Conditional required validator
   */
  static requiredIf(conditionField: string, conditionValue: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;
      
      const conditionControl = control.parent.get(conditionField);
      const conditionMet = conditionControl?.value === conditionValue;
      
      if (conditionMet && !control.value) {
        return { required: true };
      }
      
      return null;
    };
  }
}

// ==================== VALIDATION ERROR HANDLER ====================

export class ValidationErrorHandler {
  private static errorMessages: Record<string, (error: any) => string> = {
    required: () => 'This field is required',
    email: () => 'Please enter a valid email address',
    minlength: (error) => \`Minimum length is \${error.requiredLength} characters\`,
    maxlength: (error) => \`Maximum length is \${error.requiredLength} characters\`,
    pattern: (error) => error.message || 'Invalid format',
    weakPassword: () => 'Password must contain uppercase, lowercase, and number',
    whitespace: () => 'Cannot be only whitespace',
    phone: (error) => error.message,
    usernameTaken: () => 'Username is already taken',
    passwordMismatch: (error) => error.message,
    dateRange: (error) => error.message,
    pastDate: () => 'Date must be in the future',
    duplicateValues: () => 'Duplicate values are not allowed',
    creditCard: (error) => error.message,
    forbiddenName: (error) => \`'\${error.value}' is not allowed\`
  };

  static getErrorMessage(control: AbstractControl): string | null {
    if (!control.errors) return null;
    
    const firstError = Object.keys(control.errors)[0];
    const errorValue = control.errors[firstError];
    
    return this.errorMessages[firstError]?.(errorValue) || 'Invalid value';
  }

  static getFormErrors(form: FormGroup): Record<string, string[]> {
    const errors: Record<string, string[]> = {};
    
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormGroup) {
        errors[key] = Object.values(this.getFormErrors(control)).flat();
      } else if (control instanceof FormArray) {
        control.controls.forEach((item, index) => {
          if (item instanceof FormGroup) {
            errors[\`\${key}[\${index}]\`] = Object.values(this.getFormErrors(item)).flat();
          }
        });
      } else {
        const error = this.getErrorMessage(control!);
        if (error) {
          errors[key] = [error];
        }
      }
    });
    
    return errors;
  }
}

// ==================== USAGE EXAMPLE ====================
/*
@Component({
  template: \`
    <form [formGroup]='registrationForm'>
      <input formControlName='username' placeholder='Username'>
      <div *ngIf='registrationForm.get("username")?.pending'>
        Checking availability...
      </div>
      <div *ngIf='registrationForm.get("username")?.errors as errors'>
        {{ ValidationErrorHandler.getErrorMessage(registrationForm.get("username")) }}
      </div>
      
      <div formGroupName='passwordGroup'>
        <input formControlName='password' type='password'>
        <input formControlName='confirmPassword' type='password'>
        <div *ngIf='registrationForm.get("passwordGroup")?.errors?.["passwordMismatch"]'>
          Passwords do not match
        </div>
      </div>
    </form>
  \`
})
export class RegistrationComponent {
  ValidationErrorHandler = ValidationErrorHandler;
  
  registrationForm = this.fb.group({
    username: ['', 
      [Validators.required, Validators.minLength(3)],
      [CustomValidators.usernameAvailable(this.userService)]
    ],
    passwordGroup: this.fb.group({
      password: ['', [Validators.required, CustomValidators.strongPassword()]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: CustomValidators.passwordMatch('password', 'confirmPassword')
    }),
    phone: ['', CustomValidators.phoneNumber('US')],
    date: ['', CustomValidators.futureDate()],
    email: ['', [Validators.email]]
  });
}
*/`},{title:"Advanced Validation Directive for Template-Driven Forms",language:"typescript",code:`import { Directive, Input, forwardRef, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { 
  NG_VALIDATORS, 
  NG_ASYNC_VALIDATORS, 
  Validator, 
  AsyncValidator, 
  AbstractControl, 
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appAdvancedValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdvancedValidationDirective),
      multi: true
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AdvancedValidationDirective),
      multi: true
    }
  ]
})
export class AdvancedValidationDirective implements Validator, AsyncValidator, OnDestroy {
  @Input('appAdvancedValidation') validationType: 'username' | 'email' | 'phone' | 'password' = 'username';
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() pattern?: string;
  @Input() customMessage?: string;
  
  private validator: ValidatorFn;
  private asyncValidator: AsyncValidatorFn;
  private subscription?: Subscription;

  constructor(private userService: UserService, private el: ElementRef, private renderer: Renderer2) {
    this.validator = this.createValidator();
    this.asyncValidator = this.createAsyncValidator();
    
    // Add real-time validation feedback
    this.renderer.listen(this.el.nativeElement, 'focus', () => {
      this.renderer.addClass(this.el.nativeElement, 'validation-focused');
    });
    
    this.renderer.listen(this.el.nativeElement, 'blur', () => {
      this.renderer.removeClass(this.el.nativeElement, 'validation-focused');
    });
  }

  private createValidator(): ValidatorFn {
    switch (this.validationType) {
      case 'password':
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value || '';
          const errors: ValidationErrors = {};
          
          if (this.minLength && value.length < this.minLength) {
            errors['minlength'] = { 
              requiredLength: this.minLength, 
              actualLength: value.length 
            };
          }
          
          if (this.maxLength && value.length > this.maxLength) {
            errors['maxlength'] = { 
              requiredLength: this.maxLength, 
              actualLength: value.length 
            };
          }
          
          if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
          if (!/[a-z]/.test(value)) errors['lowercase'] = true;
          if (!/[0-9]/.test(value)) errors['number'] = true;
          if (!/[!@#$%^&*]/.test(value)) errors['special'] = true;
          
          return Object.keys(errors).length > 0 ? errors : null;
        };
        
      case 'phone':
        return CustomValidators.phoneNumber('US');
        
      default:
        return Validators.pattern(this.pattern || '.*');
    }
  }

  private createAsyncValidator(): AsyncValidatorFn {
    switch (this.validationType) {
      case 'username':
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          if (!control.value || control.value.length < 3) {
            return of(null);
          }
          
          return this.userService.checkUsername(control.value).pipe(
            debounceTime(400),
            distinctUntilChanged(),
            map(isAvailable => isAvailable ? null : { usernameTaken: true }),
            catchError(() => of(null))
          );
        };
        
      case 'email':
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          if (!control.value || !Validators.email(control.value)) {
            return of(null);
          }
          
          return this.userService.checkEmail(control.value).pipe(
            debounceTime(400),
            map(isAvailable => isAvailable ? null : { emailTaken: true }),
            catchError(() => of(null))
          );
        };
        
      default:
        return () => of(null);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control);
  }

  validateAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.asyncValidator(control);
  }

  registerOnValidatorChange?(fn: () => void): void {
    // Handle dynamic input changes
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

// Usage in template:
/*
<input 
  name='username'
  [(ngModel)]='user.username'
  appAdvancedValidation='username'
  minLength='3'
  #usernameCtrl='ngModel'>
  
<div *ngIf='usernameCtrl.pending'>Checking availability...</div>
<div *ngIf='usernameCtrl.errors?.usernameTaken'>Username is taken</div>
<div *ngIf='usernameCtrl.errors?.minlength'>
  Minimum length is {{usernameCtrl.errors.minlength.requiredLength}}
</div>
*/
`},{title:"Dynamic Validation Service \u2013 JSON-Based Validation Rules",language:"typescript",code:`import { Injectable } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message?: string;
  condition?: string; // JavaScript expression
  dependsOn?: string; // Field name this validation depends on
}

interface FieldValidationConfig {
  fieldName: string;
  rules: ValidationRule[];
  asyncRules?: AsyncValidationRule[];
  crossFieldRules?: CrossFieldRule[];
}

interface AsyncValidationRule {
  type: string;
  endpoint: string;
  debounceMs?: number;
  message?: string;
}

interface CrossFieldRule {
  type: 'dateRange' | 'passwordMatch' | 'conditional';
  fields: string[];
  message: string;
  condition?: string;
}

@Injectable({ providedIn: 'root' })
export class DynamicValidationService {
  
  private validationConfigs: Map<string, FieldValidationConfig[]> = new Map();

  registerFormValidation(formKey: string, config: FieldValidationConfig[]): void {
    this.validationConfigs.set(formKey, config);
  }

  applyValidation(form: FormGroup, formKey: string): void {
    const configs = this.validationConfigs.get(formKey);
    if (!configs) return;

    configs.forEach(config => {
      const control = form.get(config.fieldName);
      if (control) {
        this.applyFieldValidation(control, config);
      }
    });

    // Apply cross-field validation
    this.applyCrossFieldValidation(form, configs);
  }

  private applyFieldValidation(control: AbstractControl, config: FieldValidationConfig): void {
    const validators: ValidatorFn[] = [];

    config.rules.forEach(rule => {
      // Check conditional validation
      if (rule.condition) {
        try {
          const conditionMet = new Function('control', \`return \${rule.condition}\`)(control);
          if (!conditionMet) return;
        } catch (e) {
          console.error('Invalid validation condition:', rule.condition);
          return;
        }
      }

      const validator = this.createValidator(rule);
      if (validator) validators.push(validator);
    });

    control.setValidators(validators);
    control.updateValueAndValidity();

    // Apply async validators if present
    if (config.asyncRules?.length) {
      const asyncValidators = config.asyncRules.map(rule => this.createAsyncValidator(rule));
      control.setAsyncValidators(asyncValidators);
      control.updateValueAndValidity();
    }

    // Watch dependent fields for conditional validation
    config.rules
      .filter(rule => rule.dependsOn)
      .forEach(rule => {
        const dependentControl = control.parent?.get(rule.dependsOn!);
        dependentControl?.valueChanges.subscribe(() => {
          this.applyFieldValidation(control, config);
        });
      });
  }

  private createValidator(rule: ValidationRule): ValidatorFn | null {
    switch (rule.type) {
      case 'required':
        return Validators.required;
      case 'email':
        return Validators.email;
      case 'min':
        return Validators.min(rule.value);
      case 'max':
        return Validators.max(rule.value);
      case 'minLength':
        return Validators.minLength(rule.value);
      case 'maxLength':
        return Validators.maxLength(rule.value);
      case 'pattern':
        return Validators.pattern(rule.value);
      case 'custom':
        return (control: AbstractControl): ValidationErrors | null => {
          try {
            const validatorFn = new Function('control', \`return \${rule.value}\`);
            return validatorFn(control) || null;
          } catch {
            return null;
          }
        };
      default:
        return null;
    }
  }

  private createAsyncValidator(rule: AsyncValidationRule): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      
      // Implementation would call API endpoint
      return of(null).pipe(
        debounceTime(rule.debounceMs || 400),
        switchMap(() => this.callValidationEndpoint(rule.endpoint, control.value))
      );
    };
  }

  private applyCrossFieldValidation(form: FormGroup, configs: FieldValidationConfig[]): void {
    const allCrossFieldRules = configs
      .flatMap(c => c.crossFieldRules || [])
      .filter((rule, index, self) => 
        index === self.findIndex(r => JSON.stringify(r) === JSON.stringify(rule))
      );

    allCrossFieldRules.forEach(rule => {
      const validator = this.createCrossFieldValidator(rule);
      
      if (rule.fields.every(field => form.get(field))) {
        // Find common parent for these fields
        const parent = this.findCommonParent(form, rule.fields);
        if (parent) {
          const existingValidators = parent.validator ? [parent.validator] : [];
          parent.setValidators([...existingValidators, validator]);
          parent.updateValueAndValidity();
        }
      }
    });
  }

  private createCrossFieldValidator(rule: CrossFieldRule): ValidatorFn {
    switch (rule.type) {
      case 'passwordMatch':
        return (group: AbstractControl): ValidationErrors | null => {
          const [password, confirm] = rule.fields;
          return group.get(password)?.value === group.get(confirm)?.value
            ? null : { passwordMismatch: { message: rule.message } };
        };
        
      case 'dateRange':
        return (group: AbstractControl): ValidationErrors | null => {
          const [start, end] = rule.fields;
          const startDate = new Date(group.get(start)?.value);
          const endDate = new Date(group.get(end)?.value);
          
          return startDate && endDate && startDate <= endDate
            ? null : { dateRange: { message: rule.message } };
        };
        
      case 'conditional':
        return (group: AbstractControl): ValidationErrors | null => {
          if (!rule.condition) return null;
          
          try {
            const conditionMet = new Function('group', \`return \${rule.condition}\`)(group);
            return conditionMet ? null : { conditional: { message: rule.message } };
          } catch {
            return null;
          }
        };
        
      default:
        return () => null;
    }
  }

  private findCommonParent(form: FormGroup, fields: string[]): FormGroup | null {
    const paths = fields.map(f => f.split('.'));
    let commonPath: string[] = [];
    
    for (let i = 0; i < paths[0].length; i++) {
      const segment = paths[0][i];
      if (paths.every(path => path[i] === segment)) {
        commonPath.push(segment);
      } else {
        break;
      }
    }
    
    // Remove last segment (the field itself)
    commonPath = commonPath.slice(0, -1);
    
    let parent: FormGroup = form;
    for (const segment of commonPath) {
      const control = parent.get(segment);
      if (control instanceof FormGroup) {
        parent = control;
      } else {
        return null;
      }
    }
    
    return parent;
  }

  private callValidationEndpoint(endpoint: string, value: any): Observable<ValidationErrors | null> {
    // Implementation would call actual HTTP endpoint
    return of(null);
  }
}

// JSON Configuration Example:
/*
const registrationValidation: FieldValidationConfig[] = [
  {
    fieldName: 'username',
    rules: [
      { type: 'required', message: 'Username is required' },
      { type: 'minLength', value: 3, message: 'Minimum 3 characters' }
    ],
    asyncRules: [
      { 
        type: 'unique', 
        endpoint: '/api/check-username',
        debounceMs: 400,
        message: 'Username already taken'
      }
    ]
  },
  {
    fieldName: 'email',
    rules: [
      { type: 'required' },
      { type: 'email', message: 'Invalid email format' }
    ],
    asyncRules: [
      { 
        type: 'unique', 
        endpoint: '/api/check-email',
        debounceMs: 400,
        message: 'Email already registered'
      }
    ]
  },
  {
    fieldName: 'age',
    rules: [
      { type: 'min', value: 18, message: 'Must be 18 or older' },
      { type: 'max', value: 120, message: 'Invalid age' }
    ]
  },
  {
    fieldName: 'passwordGroup.password',
    rules: [
      { type: 'required' },
      { type: 'minLength', value: 8 },
      { 
        type: 'custom', 
        value: 'control => /[A-Z]/.test(control.value) ? null : { uppercase: true }',
        message: 'Must contain uppercase'
      }
    ]
  },
  {
    fieldName: 'passwordGroup.confirmPassword',
    rules: [
      { type: 'required' }
    ],
    crossFieldRules: [
      {
        type: 'passwordMatch',
        fields: ['passwordGroup.password', 'passwordGroup.confirmPassword'],
        message: 'Passwords do not match'
      }
    ]
  }
];
*/
`}],bestPractices:["Always combine custom validators with required - don't validate empty values unless specifically required","Return descriptive error objects with metadata (actual value, expected format) for better error messages","Use factory functions for configurable validators to promote reusability","Debounce async validators with at least 300-400ms to prevent API spam","Use switchMap to cancel in-flight async validation requests when value changes","Display pending state with loading indicators for async validation","Implement cross-field validation at the FormGroup/FormArray level, not individual controls","Call updateValueAndValidity() after dynamically adding/removing validators","Centralize error messages in a service or constants file for consistency","Use control.markAllAsTouched() on form submit to show all validation errors","Consider updateOn: 'blur' for expensive validation operations","Test validators as pure functions - they're easily unit testable","Create a validation error handler service to transform error objects to messages","Use Validators.compose to combine multiple validators programmatically","Set validation asynchronously for forms loaded with initial data","Provide clear, specific error messages that tell users how to fix the problem","Use CSS classes (ng-valid, ng-invalid) for visual feedback, not just error text","Make validation accessible with aria-invalid and aria-describedby","Consider using a validation library like class-validator for complex domain validation"]};var p=(()=>{class e{constructor(){this.content=s}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=a({type:e,selectors:[["app-form-validation"]],decls:1,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"]],template:function(r,n){r&1&&o(0,"app-topic-template",0),r&2&&t("title",n.content.title)("tags",n.content.tags)("paragraphs",n.content.paragraphs)("sections",n.content.sections)("codeExamples",n.content.codeExamples)("bestPractices",n.content.bestPractices)("keyPoints",n.content.keyPoints)},dependencies:[i],styles:[".container[_ngcontent-%COMP%]{padding:var(--spacing-md, 20px);max-width:800px;margin:0 auto}.comparison[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:var(--spacing-lg, 20px);margin:var(--spacing-xl, 30px) 0}.method[_ngcontent-%COMP%]{padding:var(--spacing-md, 20px);border:2px solid var(--border-color, #ddd);border-radius:var(--border-radius-md, 10px);background:var(--surface-variant, #f9f9f9);transition:border-color var(--transition-fast)}.method[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;color:var(--text-primary, #333)}input[_ngcontent-%COMP%]{width:100%;padding:var(--spacing-xs, 8px);margin:var(--spacing-sm, 10px) 0;border:1px solid var(--border-color, #ccc);border-radius:var(--border-radius-xs, 4px);background:var(--surface-color);color:var(--text-primary);font-family:var(--font-family)}input[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--primary-color)}button[_ngcontent-%COMP%]{background:var(--primary-color, #007bff);color:var(--text-on-primary, white);border:none;padding:var(--spacing-xs, 8px) var(--spacing-md, 16px);border-radius:var(--border-radius-xs, 4px);cursor:pointer;margin-top:var(--spacing-sm, 10px);transition:background-color var(--transition-fast)}button[_ngcontent-%COMP%]:hover{background:var(--primary-dark, #0056b3)}.info[_ngcontent-%COMP%]{background:var(--surface-variant);padding:var(--spacing-md, 15px);border-radius:var(--border-radius-sm, 8px);margin-top:var(--spacing-md, 20px);border-left:4px solid var(--primary-color);color:var(--text-secondary)}"]})}}return e})();export{p as FormValidationComponentEg};
