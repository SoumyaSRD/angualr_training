import { Component } from '@angular/core';
import { FORM_VALIDATION_COMPLETE } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './form-validation.html'
})
export class FormValidationComponentEg {
  content: ITopicContent | any = FORM_VALIDATION_COMPLETE;
}