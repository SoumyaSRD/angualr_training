// angular-cli-installation.component.ts
import { Component, OnInit } from '@angular/core';
import { TopicTemplate } from '../../../../topic-template/topic-template';
import { ITopicContent } from '../../../../../interfaces/topic';
import { ANGULAR_CLI_OVERVIEW } from 'src/app/constants/cli-overview.const';

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