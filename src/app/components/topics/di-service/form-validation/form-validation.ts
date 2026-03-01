import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { FORM_VALIDATION_COMPLETE } from './form-validation.const';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './form-validation.html'
})
export class FormValidationComponentEg {
  content: ITopicContent | any = FORM_VALIDATION_COMPLETE;
}