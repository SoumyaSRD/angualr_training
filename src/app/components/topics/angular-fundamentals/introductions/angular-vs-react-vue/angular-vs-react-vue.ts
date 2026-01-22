import { Component } from '@angular/core';
import { ITopicContent } from '../../../../../interfaces/topic';
import { TopicTemplate } from '../../../../topic-template/topic-template';
import { FRAMEWORK_COMPARISON } from './angular-react-vue.const';


@Component({
    selector: 'app-angular-vs-react-vue',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './angular-vs-react-vue.html',
    styleUrl: './angular-vs-react-vue.scss'
})
export class AngularReactVue {
    content: ITopicContent | any = FRAMEWORK_COMPARISON
}
