import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { FORMS_MODULE_DEEP_DIVE } from './form-eg.const';

@Component({
  selector: 'app-form-eg',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './form-eg.html'
})
export class FormExample {
  content: ITopicContent | any = FORMS_MODULE_DEEP_DIVE;
  templateFormExample = `
<input [(ngModel)]="username" name="username" required />
<p>{{ username }}</p>
`;

  reactiveFormExample = `
form = new FormGroup({
  username: new FormControl('', Validators.required)
});
`;

  formImportExample = `
@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
`;


}