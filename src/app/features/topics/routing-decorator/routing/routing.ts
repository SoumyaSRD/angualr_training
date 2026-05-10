import { Component } from '@angular/core';
import { ROUTING } from '@app/features/topics/constants';
import { ITopicContent, TopicTemplate } from '@app/shared';

@Component({
  selector: "app-routing",
  standalone: true,
  imports: [TopicTemplate],
  templateUrl: "./routing.html"
})
export class Routing {
  content: ITopicContent | any = ROUTING;
  dataParamEg = `constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}`;
  dataEg = `{
  path: 'dashboard',
  component: Dashboard,
  children: [
    { path: 'stats', component: StatsComponent }
  ]
}`;

  dataNavEg = `constructor(private router: Router) {}

goToProfile() {
  this.router.navigate(['/profile', 1]);
}`;

  dataRoutingEg = `export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile/:id', component: ProfileComponent }
];`

  dataLazyEg = `{
  path: 'admin',
  loadComponent: () => import('./admin.component')
    .then(m => m.AdminComponent)
}s`
}
