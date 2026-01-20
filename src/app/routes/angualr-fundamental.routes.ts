import { Routes } from "@angular/router";
import { AngularFundamentalsComponent } from "../components/topics/angular-fundamentals/angular-fundamentals";
import { WhatIsAngular } from "../components/topics/angular-fundamentals/introductions/what-is-angular/what-is-angular";
import { AngularReactVue } from "../components/topics/angular-fundamentals/introductions/angular-vs-react-vue/angular-vs-react-vue";
import { ArchitectureOverview } from "../components/topics/angular-fundamentals/introductions/architecture-overview/architecture-overview";
import { NodeVsNpm } from "../components/topics/angular-fundamentals/setup/node-vs-npm";
import { AngularCliOverview } from "../components/topics/angular-fundamentals/introductions/cli-overview/cli-overview";

export const angularFundamentalRoutes: Routes = [
    {
        path: 'fundamentals',
        component: AngularFundamentalsComponent, // This component should have the <router-outlet>
        children: [
            {
                path: '',
                redirectTo: 'introduction/what-is-angular',
                pathMatch: 'full'
            },
            {
                path: 'introduction',
                children: [
                    { path: '', redirectTo: 'what-is-angular', pathMatch: 'full' },
                    { path: 'what-is-angular', component: WhatIsAngular },
                    { path: 'angular-vs-react-vue', component: AngularReactVue },
                    { path: 'architecture-overview', component: ArchitectureOverview },
                    // { path: 'cli-overview', component: WhatIsAngular },
                    // { path: 'versioning-lts', component: WhatIsAngular },
                ]
            },
            {
                path: 'setup',
                children: [
                    { path: 'nodejs-npm', component: NodeVsNpm },
                    { path: 'cli-installation', component: AngularCliOverview },
                    { path: 'first-app', component: WhatIsAngular },
                    { path: 'folder-structure', component: WhatIsAngular },
                    { path: 'config-files', component: WhatIsAngular },
                ]
            }
        ]
    }
];