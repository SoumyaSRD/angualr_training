import { Component } from "@angular/core";
import { TopicTemplate } from "../../../topic-template/topic-template";
import { OBSERVABLE_PROMISE } from "./observable-promise.const";
import { ITopicContent } from "../../../../interfaces/topic";

@Component({
    selector: 'app-observable-promise',
    standalone: true,
    imports: [TopicTemplate,],
    templateUrl: './observable-promise.html',
    styleUrls: ['./observable-promise.scss']
})
export class ObservablePromise {
    content: ITopicContent | any = OBSERVABLE_PROMISE;
    promiseExample = `
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise resolved!'), 1000);
});

promise.then(result => console.log(result));
`;

    observableExample = `
const observable = new Observable(observer => {
  observer.next('First value');
  observer.next('Second value');
  observer.complete();
});

observable.subscribe(value => console.log(value));
`;

}