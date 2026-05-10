import { Component } from '@angular/core';
import { ANGULAR_INTRODUCTION_TUTORIAL } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';

@Component({
    selector: 'app-angular-ist-app',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './angular-ist-app.html'
})
export class AngularIstApp {
    content: ITopicContent | any = ANGULAR_INTRODUCTION_TUTORIAL

}