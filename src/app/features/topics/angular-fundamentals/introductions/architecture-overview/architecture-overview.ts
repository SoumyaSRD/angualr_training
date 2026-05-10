import { Component } from '@angular/core';
import { ANGULAR_ARCHITECTURE_OVERVIEW } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';


@Component({
    selector: 'app-architecture-overview',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './architecture-overview.html'
})
export class ArchitectureOverview {
    content: ITopicContent | any = ANGULAR_ARCHITECTURE_OVERVIEW
}
