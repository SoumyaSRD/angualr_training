import { Component } from '@angular/core';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { GUARD } from './guard-eg.const';

@Component({
  selector: 'app-guard-eg',
  standalone: true,
  imports: [TopicTemplate,],
  templateUrl: './guard-eg.html',
  styleUrls: ['./guard-eg.scss']
})
export class GuardExample {
  content: ITopicContent | any = GUARD;
  canActivateExample = `
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return this.authService.isLoggedIn();
  }
}
`;

  canDeactivateExample = `
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

@Injectable({ providedIn: 'root' })
export class UnsavedGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
`;

  canLoadExample = `
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanLoad {

  canLoad(): boolean {
    return true;
  }
}
`;

  resolveExample = `
@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<Data> {

  resolve(): Observable<Data> {
    return this.api.getData();
  }
}
`;

  routeConfigExample = `
export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];
`;

  functionalGuardExample = `
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn();
};
`;

}