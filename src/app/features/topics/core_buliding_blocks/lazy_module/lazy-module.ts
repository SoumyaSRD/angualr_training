import { Component } from '@angular/core';
import { LAZY_MODULES } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';




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
