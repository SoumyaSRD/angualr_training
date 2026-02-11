import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { LAZY_MODULES } from './lazy-module.const';



@Component({
    selector: 'app-lazy-module',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './lazy-module.html',
    // styleUrl: './lazy-module.scss'
})
export class LazyModule {
    content: ITopicContent | any = LAZY_MODULES
}
