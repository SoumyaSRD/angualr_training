import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { COMPONENT } from 'src/app/constants/component.const';


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
