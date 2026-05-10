import { Component } from '@angular/core';
import { MODULE_STANDALONE } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';



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
