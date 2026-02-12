import { Component } from "@angular/core";
import { TopicTemplate } from "../../../topic-template/topic-template";
import { RXJS_OPERATOR } from "./rxjs-operator.const";
import { ITopicContent } from "../../../../interfaces/topic";

@Component({
    selector: 'app-rxjs-operator',
    standalone: true,
    imports: [TopicTemplate],
    templateUrl: './rxjs-operator.html',
    styleUrls: ['./rxjs-operator.scss']
})
export class RxjsOperator {
    content: ITopicContent | any = RXJS_OPERATOR;
    pipeExample = `
observable.pipe(
  map(value => value * 2),
  filter(value => value > 10)
).subscribe(result => console.log(result));
`;

    mapExample = `
of(1,2,3).pipe(
  map(x => x * 10)
).subscribe(console.log);
`;

    filterExample = `
of(1,2,3,4).pipe(
  filter(x => x % 2 === 0)
).subscribe(console.log);
`;

    combineExample = `
combineLatest([obs1$, obs2$]).subscribe(([a,b]) => {
  console.log(a, b);
});
`;

    tapExample = `
of('Hello').pipe(
  tap(value => console.log('Debug:', value))
).subscribe();
`;

}