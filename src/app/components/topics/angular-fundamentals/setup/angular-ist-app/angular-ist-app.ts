import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ITopicContent } from '../../../../../interfaces/topic';
import { TopicTemplate } from '../../../../topic-template/topic-template';
import { ANGULAR_INTRODUCTION_TUTORIAL } from './angular-ist-app.const';



@Component({
    selector: 'app-angular-ist-app',
    standalone: true,
    imports: [TopicTemplate, MatIcon],
    templateUrl: './angular-ist-app.html',
    styleUrl: './angular-ist-app.scss'
})
export class AngularIstApp {
    content: ITopicContent | any = ANGULAR_INTRODUCTION_TUTORIAL

}