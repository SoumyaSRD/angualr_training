import { Component } from '@angular/core';
import { DI_SERVICE } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';

@Component({
  selector: 'app-di-service',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './di-service.html'
})
export class DiServiceExample {
  content: ITopicContent | any = DI_SERVICE;
  dataEg = `
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getMessage() {
    return 'Hello from service!';
  }
}
`
  dataEg2 = `constructor(private dataService: DataService) {}

ngOnInit() {
  console.log(this.dataService.getMessage());
}`
}