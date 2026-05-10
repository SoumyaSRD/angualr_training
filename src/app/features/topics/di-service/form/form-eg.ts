import { Component } from '@angular/core';
import { FORMS_MODULE_DEEP_DIVE } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';

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