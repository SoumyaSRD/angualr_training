import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { DIRECTIVE } from './directive.const';
import { VisibleIfDirective } from '../../../../directives/visible-if.directive';

@Component({
    selector: 'app-directive',
    standalone: true,
    imports: [TopicTemplate, VisibleIfDirective],
    templateUrl: './directive-eg.html',
    styleUrls: ['./directive-eg.scss']
})
export class DirectiveExample {
    content: ITopicContent | any = DIRECTIVE;
    visible = false

}