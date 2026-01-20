import { Routes } from '@angular/router';
import { GenericTopicComponent } from './components/generic-topic/generic-topic.component';
import { HomeComponent } from './components/home/home.component';
import { StandaloneComponentsComponent } from './components/topics/core/standalone-components.component';
import { HowBrowsersWorkComponent } from './components/topics/prerequisites/browser/how-browsers-work.component';
import { HttpHttpsComponent } from './components/topics/prerequisites/http/http-https.component';
import { angularFundamentalRoutes } from './routes/angualr-fundamental.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'prerequisites/web-fundamentals/how-browsers-work', component: HowBrowsersWorkComponent },
  { path: 'prerequisites/web-fundamentals/http-https', component: HttpHttpsComponent },
  { path: 'prerequisites/web-fundamentals/rest-apis', component: GenericTopicComponent },
  { path: 'prerequisites/web-fundamentals/json', component: GenericTopicComponent },
  { path: 'prerequisites/web-fundamentals/cors', component: GenericTopicComponent },

  { path: 'prerequisites/typescript/typescript-vs-javascript', component: GenericTopicComponent },
  { path: 'prerequisites/typescript/data-types', component: GenericTopicComponent },
  { path: 'prerequisites/typescript/interfaces', component: GenericTopicComponent },
  { path: 'prerequisites/typescript/enums', component: GenericTopicComponent },
  { path: 'prerequisites/typescript/classes', component: GenericTopicComponent },

  ...angularFundamentalRoutes,


  { path: 'core/modules/module-types', component: GenericTopicComponent },
  { path: 'core/modules/lazy-loading', component: GenericTopicComponent },
  { path: 'core/modules/standalone-components', component: StandaloneComponentsComponent },
  { path: 'core/modules/module-vs-standalone', component: GenericTopicComponent },
  { path: 'core/components/anatomy', component: GenericTopicComponent },
  { path: 'core/components/templates', component: GenericTopicComponent },
  { path: 'core/components/communication', component: GenericTopicComponent },
  { path: 'core/components/lifecycle-hooks', component: GenericTopicComponent },
  { path: 'core/components/change-detection', component: GenericTopicComponent },
  { path: 'core/components/smart-vs-dumb', component: GenericTopicComponent },

  { path: 'templates/data-binding/interpolation', component: GenericTopicComponent },
  { path: 'templates/data-binding/binding-types', component: GenericTopicComponent },
  { path: 'templates/data-binding/template-refs', component: GenericTopicComponent },
  { path: 'templates/directives/built-in', component: GenericTopicComponent },
  { path: 'templates/directives/types', component: GenericTopicComponent },
  { path: 'templates/directives/custom', component: GenericTopicComponent },
  { path: 'templates/directives/host-decorators', component: GenericTopicComponent },
  { path: 'templates/directives/trackby', component: GenericTopicComponent },
  { path: 'templates/pipes/built-in', component: GenericTopicComponent },
  { path: 'templates/pipes/pure-vs-impure', component: GenericTopicComponent },
  { path: 'templates/pipes/custom', component: GenericTopicComponent },
  { path: 'templates/pipes/async', component: GenericTopicComponent },

  { path: 'services/di/concepts', component: GenericTopicComponent },
  { path: 'services/di/injectable-providers', component: GenericTopicComponent },
  { path: 'services/di/scopes', component: GenericTopicComponent },
  { path: 'services/di/injection-tokens', component: GenericTopicComponent },
  { path: 'services/di/multi-providers', component: GenericTopicComponent },
  { path: 'services/di/singleton', component: GenericTopicComponent },

  { path: 'routing/basics/config', component: GenericTopicComponent },
  { path: 'routing/basics/navigation', component: GenericTopicComponent },
  { path: 'routing/basics/parameters', component: GenericTopicComponent },
  { path: 'routing/advanced/lazy-routes', component: GenericTopicComponent },
  { path: 'routing/advanced/guards-resolvers', component: GenericTopicComponent },
  { path: 'routing/advanced/error-handling', component: GenericTopicComponent },

  { path: 'forms/template-driven/ngmodel', component: GenericTopicComponent },
  { path: 'forms/template-driven/validations', component: GenericTopicComponent },
  { path: 'forms/template-driven/error-handling', component: GenericTopicComponent },
  { path: 'forms/template-driven/limitations', component: GenericTopicComponent },
  { path: 'forms/reactive/basics', component: GenericTopicComponent },
  { path: 'forms/reactive/validators', component: GenericTopicComponent },
  { path: 'forms/reactive/dynamic-forms', component: GenericTopicComponent },
  { path: 'forms/reactive/form-builder', component: GenericTopicComponent },

  { path: 'http/basics/methods', component: GenericTopicComponent },
  { path: 'http/basics/headers-params', component: GenericTopicComponent },
  { path: 'http/basics/error-handling', component: GenericTopicComponent },
  { path: 'http/advanced/interceptors', component: GenericTopicComponent },
  { path: 'http/advanced/auth-tokens', component: GenericTopicComponent },
  { path: 'http/advanced/file-operations', component: GenericTopicComponent },
  { path: 'http/advanced/pagination', component: GenericTopicComponent },

  { path: 'rxjs/core/observables-vs-promises', component: GenericTopicComponent },
  { path: 'rxjs/core/cold-vs-hot', component: GenericTopicComponent },
  { path: 'rxjs/core/subjects', component: GenericTopicComponent },
  { path: 'rxjs/operators/basic', component: GenericTopicComponent },
  { path: 'rxjs/operators/flattening', component: GenericTopicComponent },
  { path: 'rxjs/patterns/error-handling', component: GenericTopicComponent },
  { path: 'rxjs/patterns/unsubscribe', component: GenericTopicComponent },

  { path: 'state/approaches/component-state', component: GenericTopicComponent },
  { path: 'state/approaches/service-state', component: GenericTopicComponent },
  { path: 'state/signals/basics', component: GenericTopicComponent },
  { path: 'state/signals/computed-effect', component: GenericTopicComponent },
  { path: 'state/signals/signals-vs-rxjs', component: GenericTopicComponent },
  { path: 'state/approaches/ngrx', component: GenericTopicComponent },

  { path: 'advanced/performance/change-detection', component: GenericTopicComponent },
  { path: 'advanced/performance/onpush', component: GenericTopicComponent },
  { path: 'advanced/topics/content-projection', component: GenericTopicComponent },
  { path: 'advanced/topics/view-child', component: GenericTopicComponent },
  { path: 'advanced/topics/content-child', component: GenericTopicComponent },
  { path: 'advanced/i18n/angular-i18n', component: GenericTopicComponent },
  { path: 'advanced/i18n/localization', component: GenericTopicComponent },
  { path: 'advanced/i18n/multi-language', component: GenericTopicComponent },

  { path: 'security/practices/sanitization', component: GenericTopicComponent },
  { path: 'security/practices/jwt', component: GenericTopicComponent },
  { path: 'security/practices/rbac', component: GenericTopicComponent },

  { path: 'modern/features/standalone-first', component: GenericTopicComponent },
  { path: 'modern/features/signals-first', component: GenericTopicComponent },
  { path: 'modern/features/zoneless', component: GenericTopicComponent },
  { path: 'modern/features/ssr-hydration', component: GenericTopicComponent },
  { path: 'modern/features/vite', component: GenericTopicComponent },
  { path: 'modern/features/performance', component: GenericTopicComponent },

  { path: 'capstone/project/auth', component: GenericTopicComponent },
  { path: 'capstone/project/dashboard', component: GenericTopicComponent },
  { path: 'capstone/project/api-integration', component: GenericTopicComponent },
  { path: 'capstone/project/forms', component: GenericTopicComponent },
  { path: 'capstone/project/state', component: GenericTopicComponent },
  { path: 'capstone/project/performance', component: GenericTopicComponent },
  { path: 'capstone/project/routing', component: GenericTopicComponent },
  { path: 'capstone/project/deployment', component: GenericTopicComponent },

  { path: 'best-practices/enterprise/folder-structure', component: GenericTopicComponent },
  { path: 'best-practices/enterprise/reusable-components', component: GenericTopicComponent },
  { path: 'best-practices/enterprise/shared-libraries', component: GenericTopicComponent },
  { path: 'best-practices/enterprise/monorepo', component: GenericTopicComponent },
  { path: 'best-practices/enterprise/code-review', component: GenericTopicComponent },

  { path: '**', redirectTo: '' }
];
