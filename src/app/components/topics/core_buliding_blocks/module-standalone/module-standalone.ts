import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { MODULE_STANDALONE } from './module-standalone.const';



@Component({
    selector: 'app-standalone',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './module-standalone.html',
    // styleUrl: './module-standalone.scss'
})
export class ModuleStandalone {
    content: ITopicContent | any = MODULE_STANDALONE

}
