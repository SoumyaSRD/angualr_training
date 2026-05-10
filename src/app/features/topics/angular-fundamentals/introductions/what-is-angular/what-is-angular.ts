import { Component } from '@angular/core';
import { AngularIntroduction } from '@app/features/topics/constants';
import { TopicTemplate } from '@app/shared';


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
