import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { DI_SERVICE } from './di-service.const';

@Component({
  selector: 'app-di-service',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './di-service.html',
  styleUrls: ['./di-service.scss']
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