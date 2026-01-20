import { Component } from '@angular/core';
import { AngularIntroduction } from '../../../constants/angular_intro.const';
import { ICodeExample } from '../../../interfaces/code-example';
import { TopicTemplateComponent } from '../../topic-template/topic-template.component';

@Component({
  selector: 'app-what-is-angular',
  standalone: true,
  imports: [TopicTemplateComponent],
  templateUrl: './what-is-angular.component.html'
})
export class WhatIsAngularComponent {
  angularIntroduction = AngularIntroduction
}
