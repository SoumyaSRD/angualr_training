import { Component } from '@angular/core';
import { ITopicContent } from '../../../../../interfaces/topic';
import { TopicTemplate } from '../../../../topic-template/topic-template';
import { ANGULAR_INTRODUCTION_TUTORIAL } from './angular-ist-app.const';

@Component({
    selector: 'app-angular-ist-app',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './angular-ist-app.html'
})
export class AngularIstApp {
    content: ITopicContent | any = ANGULAR_INTRODUCTION_TUTORIAL
}