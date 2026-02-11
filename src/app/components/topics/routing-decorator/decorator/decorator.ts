import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { DECORATOR } from './decorator.const';

@Component({
  selector: 'app-decorator',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './decorator.html',
  styleUrls: ['./decorator.scss']
})
export class DecoratorExample {
  content: ITopicContent | any = DECORATOR;
  serviceExample = `
@Injectable({
  providedIn: 'root'
})
export class DataService {

  getMessage() {
    return 'Hello from Angular Service!';
  }

}
`;

  injectionExample = `
constructor(private dataService: DataService) {}

ngOnInit() {
  console.log(this.dataService.getMessage());
}
`;

  componentExample = `
@Component({
  selector: 'app-example',
  standalone: true,
  template: '<h1>Hello Angular</h1>'
})
export class ExampleComponent {}
`;

}