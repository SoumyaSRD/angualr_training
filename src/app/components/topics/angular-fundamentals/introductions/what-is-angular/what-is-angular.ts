import { Component } from '@angular/core';
import { AngularIntroduction } from '../../../../../constants/angular_intro.const';
import { TopicTemplateComponent } from '../../../../topic-template/topic-template.component';


@Component({
  selector: 'app-what-is-angular',
  standalone: true,
  imports: [TopicTemplateComponent],
  templateUrl: './what-is-angular.html'
})
export class WhatIsAngular {
  angularIntroduction = AngularIntroduction
}
