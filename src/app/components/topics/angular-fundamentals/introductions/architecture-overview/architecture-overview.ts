import { Component } from '@angular/core';
import { ITopicContent } from '../../../../../interfaces/topic';
import { TopicTemplateComponent } from '../../../../topic-template/topic-template.component';
import { ANGULAR_ARCHITECTURE_OVERVIEW } from './architecture-overview.const';


@Component({
    selector: 'app-architecture-overview',
    standalone: true,
    imports: [TopicTemplateComponent],
    templateUrl: './architecture-overview.html',
    styleUrl: './architecture-overview.scss'
})
export class ArchitectureOverview {
    content: ITopicContent | any = ANGULAR_ARCHITECTURE_OVERVIEW
}
