import { Component } from '@angular/core';
import { COMPONENT } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';


@Component({
    selector: 'app-component',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './component.html',
    // styleUrl: './module-standalone.scss'
})
export class ComponentDetails {
    content: ITopicContent | any = COMPONENT

}
