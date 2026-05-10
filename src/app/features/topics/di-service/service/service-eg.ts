import { Component } from '@angular/core';
import { SERVICE_EG } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';

@Component({
  selector: 'app-service-eg',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './service-eg.html'
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