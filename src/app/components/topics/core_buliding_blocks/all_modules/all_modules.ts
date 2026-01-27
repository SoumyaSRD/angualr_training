import { Component } from '@angular/core';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { ITopicContent } from '../../../../interfaces/topic';
import { ALL_MODULES } from '../../../../constants/allmodules.const';



@Component({
    selector: 'app-angular-vs-react-vue',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './all_modules.html',
    // styleUrl: './angular-vs-react-vue.scss'
})
export class AllModules {
    content: ITopicContent | any = ALL_MODULES
}
