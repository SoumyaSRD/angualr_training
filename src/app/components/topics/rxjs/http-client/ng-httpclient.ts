import { Component } from "@angular/core";
import { TopicTemplate } from "../../../topic-template/topic-template";
import { _HTTP_CLIENT } from "./ng-httpclient.const";
import { ITopicContent } from "../../../../interfaces/topic";

@Component({
  selector: 'app-ng-httpclient',
  standalone: true,
  imports: [TopicTemplate],
  templateUrl: './ng-httpclient.html'
})
export class NgHttpClient {
  content: ITopicContent | any = _HTTP_CLIENT;
  httpImportExample = `
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()
  ]
});
`;

  serviceInjectionExample = `
@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {}

}
`;

  getExample = `
getUsers() {
  return this.http.get('/api/users');
}
`;

  postExample = `
createUser(data: any) {
  return this.http.post('/api/users', data);
}
`;

  putExample = `
updateUser(id: number, data: any) {
  return this.http.put('/api/users/' + id, data);
}
`;

  deleteExample = `
deleteUser(id: number) {
  return this.http.delete('/api/users/' + id);
}
`;

  subscribeExample = `
this.apiService.getUsers().subscribe(data => {
  console.log(data);
});
`;

  errorHandlingExample = `
this.http.get('/api/users').pipe(
  catchError(error => {
    console.error(error);
    return throwError(() => error);
  })
);
`;


}