import { Routes } from '@angular/router';
import { AngularFundamentals } from '../components/topics/angular-fundamentals/angular-fundamentals';
import { AngularReactVue } from '../components/topics/angular-fundamentals/introductions/angular-vs-react-vue/angular-vs-react-vue';
import { ArchitectureOverview } from '../components/topics/angular-fundamentals/introductions/architecture-overview/architecture-overview';
import { AngularCliOverview } from '../components/topics/angular-fundamentals/introductions/cli-overview/cli-overview';
import { WhatIsAngular } from '../components/topics/angular-fundamentals/introductions/what-is-angular/what-is-angular';
import { AngularIstApp } from '../components/topics/angular-fundamentals/setup/angular-ist-app/angular-ist-app';
import { NodeVsNpm } from '../components/topics/angular-fundamentals/setup/node-vs-npm/node-vs-npm';

/** Lazy-loaded child routes for path 'fundamentals'. */
export const angularFundamentalRoutes: Routes = [
  {
    path: '',
    component: AngularFundamentals,
    // canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'introduction/what-is-angular', pathMatch: 'full' },
      {
        path: 'introduction',
        children: [
          { path: '', redirectTo: 'what-is-angular', pathMatch: 'full' },
          { path: 'what-is-angular', component: WhatIsAngular },
          { path: 'angular-vs-react-vue', component: AngularReactVue },
          { path: 'architecture-overview', component: ArchitectureOverview },
        ],
      },
      {
        path: 'setup',
        children: [
          { path: 'nodejs-npm', component: NodeVsNpm },
          { path: 'cli-installation', component: AngularCliOverview },
          { path: 'first-app', component: AngularIstApp },
          { path: 'folder-structure', component: WhatIsAngular },
          { path: 'config-files', component: WhatIsAngular },
        ],
      },
    ],
  },
];
