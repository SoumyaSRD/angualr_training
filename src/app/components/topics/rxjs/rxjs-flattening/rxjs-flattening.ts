import { Component } from "@angular/core";
import { ITopicContent } from "../../../../interfaces/topic";
import { TopicTemplate } from "../../../topic-template/topic-template";
import { RXJS_FLATTENING } from "./rxjs-flattening.const";

@Component({
  selector: 'app-rxjs-flattening',
  standalone: true,
  imports: [TopicTemplate],
  templateUrl: './rxjs-flattening.html'
})
export class RxjsFlattening {
  content: ITopicContent | any = RXJS_FLATTENING;
  mergeMapExample = `
source$.pipe(
  mergeMap(value => http.get('/api/' + value))
).subscribe(console.log);
`;

  switchMapExample = `
searchInput$.pipe(
  switchMap(term => http.get('/search?q=' + term))
).subscribe(console.log);
`;

  concatMapExample = `
saveQueue$.pipe(
  concatMap(data => http.post('/save', data))
).subscribe();
`;

  exhaustMapExample = `
click$.pipe(
  exhaustMap(() => http.post('/login'))
).subscribe();
`;

  combineLatestExample = `
combineLatest([obs1$, obs2$]).subscribe(([a, b]) => {
  console.log(a, b);
});
`;

  forkJoinExample = `
forkJoin({
  users: http.get('/users'),
  posts: http.get('/posts')
}).subscribe(result => console.log(result));
`;

}