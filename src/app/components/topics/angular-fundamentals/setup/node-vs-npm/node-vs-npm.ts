import { Component } from '@angular/core';
import { TopicTemplate } from '../../../../topic-template/topic-template';
import { NODEJS_VS_NPM } from './node-vs-npm.const';


@Component({
    selector: 'app-what-is-angular',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './node-vs-npm.html'
})
export class NodeVsNpm {
    content: any = NODEJS_VS_NPM
}