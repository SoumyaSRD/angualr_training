import { Component } from '@angular/core';
import { DECORATOR } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';

@Component({
  selector: 'app-decorator',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './decorator.html'
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