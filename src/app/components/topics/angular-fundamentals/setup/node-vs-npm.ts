import { Component } from '@angular/core';
import { TopicTemplateComponent } from '../../../topic-template/topic-template.component';
import { NODEJS_VS_NPM } from './node-vs-npm.const';


@Component({
    selector: 'app-what-is-angular',
    standalone: true,
    imports: [TopicTemplateComponent],
    templateUrl: './node-vs-npm.html'
})
export class NodeVsNpm {
    content: any = NODEJS_VS_NPM
}