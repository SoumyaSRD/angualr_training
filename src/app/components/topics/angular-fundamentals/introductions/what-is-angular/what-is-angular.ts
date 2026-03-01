import { Component } from '@angular/core';
import { AngularIntroduction } from '../../../../../constants/angular_intro.const';
import { TopicTemplate } from '../../../../topic-template/topic-template';


@Component({
  selector: 'app-what-is-angular',
  standalone: true,
  imports: [TopicTemplate],
  templateUrl: './what-is-angular.html',
  styleUrl: './what-is-angular.scss'
})
export class WhatIsAngular {
  angularIntroduction = AngularIntroduction
}
