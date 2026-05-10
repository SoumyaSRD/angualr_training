import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DIRECTIVE } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate, VisibleIfDirective } from '@app/shared';

@Component({
    selector: 'app-directive',
    standalone: true,
    imports: [TopicTemplate, VisibleIfDirective],
    templateUrl: './directive-eg.html'
})
export class DirectiveExample {
    content: ITopicContent | any = DIRECTIVE;
    visible = false

}