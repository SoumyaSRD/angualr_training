import { Component } from "@angular/core";
import { TopicTemplate } from "../../../topic-template/topic-template";
import { INTERCEPTOR } from "./ng-interceptor.const";
import { ITopicContent } from "../../../../interfaces/topic";

@Component({
  selector: 'app-ng-interceptor',
  standalone: true,
  imports: [TopicTemplate],
  templateUrl: './ng-interceptor.html'
})
export class NgInterceptor {
  content: ITopicContent | any = INTERCEPTOR;
  interceptorExample = `
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const cloned = req.clone({
      setHeaders: {
        Authorization: 'Bearer TOKEN'
      }
    });

    return next.handle(cloned);
  }

}
`;

  registerInterceptorExample = `
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
});
`;

}