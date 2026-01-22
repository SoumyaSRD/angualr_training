// angular-cli-installation.component.ts
import { Component, OnInit } from '@angular/core';
import { ANGULAR_CLI_OVERVIEW } from './cli-overview.const';
import { TopicTemplate } from '../../../../topic-template/topic-template';
import { ITopicContent } from '../../../../../interfaces/topic';

@Component({
    selector: 'app-angular-cli-installation',
    imports: [TopicTemplate],
    templateUrl: './cli-overview.html',
    styleUrl: './cli-overview.scss',
    standalone: true
})
export class AngularCliOverview implements OnInit {
    content: ITopicContent | any = ANGULAR_CLI_OVERVIEW;

    ngOnInit(): void {
        // Additional initialization if needed
    }
}