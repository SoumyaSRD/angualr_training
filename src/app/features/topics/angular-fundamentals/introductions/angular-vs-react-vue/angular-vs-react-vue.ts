import { Component } from '@angular/core';
import { FRAMEWORK_COMPARISON } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';


@Component({
    selector: 'app-angular-vs-react-vue',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './angular-vs-react-vue.html'
})
export class AngularReactVue {
    content: ITopicContent | any = FRAMEWORK_COMPARISON
}
