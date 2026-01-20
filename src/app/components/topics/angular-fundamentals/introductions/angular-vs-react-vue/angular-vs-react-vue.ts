import { Component } from '@angular/core';
import { ITopicContent } from '../../../../../interfaces/topic';
import { TopicTemplateComponent } from '../../../../topic-template/topic-template.component';
import { FRAMEWORK_COMPARISON } from './angular-react-vue.const';


@Component({
    selector: 'app-angular-vs-react-vue',
    standalone: true,
    imports: [TopicTemplateComponent],
    templateUrl: './angular-vs-react-vue.html',
    styleUrl: './angular-vs-react-vue.scss'
})
export class AngularReactVue {
    content: ITopicContent | any = FRAMEWORK_COMPARISON
}
