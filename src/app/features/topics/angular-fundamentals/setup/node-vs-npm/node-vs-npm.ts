import { Component } from '@angular/core';
import { NODEJS_VS_NPM } from '@app/features/topics/constants';
import { TopicTemplate } from '@app/shared';


@Component({
    selector: 'app-what-is-angular',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './node-vs-npm.html'
})
export class NodeVsNpm {
    content: any = NODEJS_VS_NPM
}