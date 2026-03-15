import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { STANDALONE } from 'src/app/constants/standalone.const';




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
