import { Component } from '@angular/core';
import { ITopicContent } from '../../../../../interfaces/topic';
import { TopicTemplate } from '../../../../topic-template/topic-template';
import { FRAMEWORK_COMPARISON } from './angular-react-vue.const';


@Component({
    selector: 'app-angular-vs-react-vue',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './angular-vs-react-vue.html'
})
export class AngularReactVue {
    content: ITopicContent | any = FRAMEWORK_COMPARISON
}
