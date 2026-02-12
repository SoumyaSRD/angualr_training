import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { SERVICE_EG } from './service-eg.const';

@Component({
    selector: 'app-service-eg',
    standalone: true,
    imports: [TopicTemplate,],
    templateUrl: './service-eg.html',
    styleUrls: ['./service-eg.scss']
})
export class ServiceExample {
    content: ITopicContent | any = SERVICE_EG;
    dataEg2 = `constructor(private dataService: DataService) {}

ngOnInit() {
  console.log(this.dataService.getMessage());
}`
    dataEg = `@Injectable({
  providedIn: 'root'
})
export class DataService {

  getMessage() {
    return 'Hello from Angular Service!';
  }

}`
}