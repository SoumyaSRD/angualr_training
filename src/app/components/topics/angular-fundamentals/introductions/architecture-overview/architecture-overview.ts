import { Component } from '@angular/core';
import { ITopicContent } from '../../../../../interfaces/topic';
import { TopicTemplate } from '../../../../topic-template/topic-template';
import { ANGULAR_ARCHITECTURE_OVERVIEW } from './architecture-overview.const';


@Component({
    selector: 'app-architecture-overview',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './architecture-overview.html'
})
export class ArchitectureOverview {
    content: ITopicContent | any = ANGULAR_ARCHITECTURE_OVERVIEW
}
