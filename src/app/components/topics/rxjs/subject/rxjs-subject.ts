import { Component } from "@angular/core";
import { TopicTemplate } from "../../../topic-template/topic-template";
import { RXJS_SUBJECT } from "./rxjs-subject.const";
import { ITopicContent } from "../../../../interfaces/topic";

@Component({
    selector: 'app-rxjs-subject',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './rxjs-subject.html'
})
export class RxjsSubject {
    content: ITopicContent | any = RXJS_SUBJECT;
    subjectExample = `
const subject = new Subject<number>();

subject.subscribe(value => console.log('Subscriber A:', value));
subject.subscribe(value => console.log('Subscriber B:', value));

subject.next(1);
subject.next(2);
`;

    behaviorSubjectExample = `
const behavior = new BehaviorSubject<number>(0);

behavior.subscribe(value => console.log('First:', value));

behavior.next(1);
behavior.next(2);

behavior.subscribe(value => console.log('Second:', value));
`;

    replaySubjectExample = `
const replay = new ReplaySubject<number>(2);

replay.next(1);
replay.next(2);
replay.next(3);

replay.subscribe(value => console.log(value));
`;

    asyncSubjectExample = `
const async = new AsyncSubject<number>();

async.subscribe(value => console.log(value));

async.next(1);
async.next(2);
async.complete();
`;

}