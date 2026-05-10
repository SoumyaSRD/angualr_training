import { Component } from '@angular/core';
import { INTERCEPTOR } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';

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