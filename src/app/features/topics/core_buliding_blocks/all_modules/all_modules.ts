import { Component } from '@angular/core';
import { ALL_MODULES } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';



@Component({
    selector: 'app-all_modules',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './all_modules.html',
    // styleUrl: './all_modules.scss'
})
export class AllModules {
    content: ITopicContent | any = ALL_MODULES
}
