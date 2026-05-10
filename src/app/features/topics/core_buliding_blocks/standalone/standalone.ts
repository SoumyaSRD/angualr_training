import { Component } from '@angular/core';
import { STANDALONE } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';




@Component({
    selector: 'app-standalone',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './standalone.html',
    // styleUrl: './standalone.scss'
})
export class Standalone {
    content: ITopicContent | any = STANDALONE

}
