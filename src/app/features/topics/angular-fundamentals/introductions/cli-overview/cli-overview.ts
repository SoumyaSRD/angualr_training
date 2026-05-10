// angular-cli-installation.component.ts
import { Component, OnInit } from '@angular/core';
import { TopicTemplate } from '@app/shared';
import { ITopicContent } from '@app/shared';
import { ANGULAR_CLI_OVERVIEW } from '@app/features/topics/constants';

@Component({
    selector: 'app-angular-cli-installation',
    imports: [TopicTemplate],
    templateUrl: './cli-overview.html',
    standalone: true
})
export class AngularCliOverview implements OnInit {
    content: ITopicContent | any = ANGULAR_CLI_OVERVIEW;

    ngOnInit(): void {
        // Additional initialization if needed
    }
}