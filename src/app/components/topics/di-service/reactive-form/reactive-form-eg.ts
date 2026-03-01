import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { REACTIVE_FORMS_MODULE_DEEP_DIVE } from './reactive-form-eg.const';

@Component({
  selector: 'app-reactive-form-eg',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './reactive-form-eg.html'
})
export class ReactiveFormExample {
  content: ITopicContent | any = REACTIVE_FORMS_MODULE_DEEP_DIVE;
  formControlExample = `
name = new FormControl('');
`;

  formGroupExample = `
form = new FormGroup({
  username: new FormControl(''),
  email: new FormControl('')
});
`;

  formArrayExample = `
items = new FormArray([
  new FormControl('Item 1'),
  new FormControl('Item 2')
]);
`;

  reactiveFormSetupExample = `
form = this.fb.group({
  username: [''],
  password: ['']
});
`;

  reactiveTemplateExample = `
<form [formGroup]="form">
  <input formControlName="username">
</form>
`;

  validationExample = `
username: ['', [Validators.required, Validators.minLength(3)]]
`;

  valueChangesExample = `
this.form.valueChanges.subscribe(value => {
  console.log(value);
});
`;



}