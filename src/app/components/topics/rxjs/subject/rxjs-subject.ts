import { Component } from "@angular/core";
import { TopicTemplate } from "../../../topic-template/topic-template";
import { RXJS_SUBJECT } from "./rxjs-subject.const";
import { ITopicContent } from "../../../../interfaces/topic";

@Component({
    selector: 'app-rxjs-subject',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './rxjs-subject.html',
    styleUrls: ['./rxjs-subject.scss']
})
export class RxjsSubject {
    content: ITopicContent | any = RXJS_SUBJECT;
}