import { Routes } from '@angular/router';
import { authGuard } from '@app/core';
import { HomeComponent } from '@app/features/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'prerequisites/web-fundamentals/how-browsers-work',
    loadComponent: () =>
      import('./components/topics/prerequisites/browser/how-browsers-work.component').then(
        (m) => m.HowBrowsersWorkComponent
      ),
  },
  {
    path: 'prerequisites/web-fundamentals/http-https',
    loadComponent: () =>
      import('./components/topics/prerequisites/http/http-https.component').then(
        (m) => m.HttpHttpsComponent
      ),
  },
  {
    path: 'prerequisites/web-fundamentals/rest-apis',
    loadComponent: () =>
      import('./components/generic-topic/generic-topic.component').then(
        (m) => m.GenericTopicComponent
      ),
  },
  {
    path: 'prerequisites/web-fundamentals/json',
    loadComponent: () =>
      import('./components/generic-topic/generic-topic.component').then(
        (m) => m.GenericTopicComponent
      ),
  },
  {
    path: 'prerequisites/web-fundamentals/cors',
    loadComponent: () =>
      import('./components/generic-topic/generic-topic.component').then(
        (m) => m.GenericTopicComponent
      ),
  },

  {
    path: 'prerequisites/typescript/typescript-vs-javascript',
    loadComponent: () =>
      import('./components/generic-topic/generic-topic.component').then(
        (m) => m.GenericTopicComponent
      ),
  },
  {
    path: 'prerequisites/typescript/data-types',
    loadComponent: () =>
      import('./components/generic-topic/generic-topic.component').then(
        (m) => m.GenericTopicComponent
      ),
  },
  {
    path: 'prerequisites/typescript/interfaces',
    loadComponent: () =>
      import('./components/generic-topic/generic-topic.component').then(
        (m) => m.GenericTopicComponent
      ),
  },
  {
    path: 'prerequisites/typescript/enums',
    loadComponent: () =>
      import('./components/generic-topic/generic-topic.component').then(
        (m) => m.GenericTopicComponent
      ),
  },
  {
    path: 'prerequisites/typescript/classes',
    loadComponent: () =>
      import('./components/generic-topic/generic-topic.component').then(
        (m) => m.GenericTopicComponent
      ),
  },

  {
    path: 'fundamentals',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./routes/angular-fundamental.routes').then(
        (m) => m.angularFundamentalRoutes
      ),
  },

  {
    path: 'core/modules/module-types',
    loadComponent: () =>
      import('./components/topics/core_buliding_blocks/all_modules/all_modules').then(
        (m) => m.AllModules
      ),
  },
  {
    path: 'core/modules/lazy-loading',
    loadComponent: () =>
      import('./components/topics/core_buliding_blocks/lazy_module/lazy-module').then(
        (m) => m.LazyModule
      ),
  },
  {
    path: 'core/modules/standalone-components',
    loadComponent: () =>
      import('./components/topics/core_buliding_blocks/standalone/standalone').then(
        (m) => m.Standalone
      ),
  },
  {
    path: 'core/modules/module-vs-standalone',
    loadComponent: () =>
      import('./components/topics/core_buliding_blocks/module-standalone/module-standalone').then(
        (m) => m.ModuleStandalone
      ),
  },
  {
    path: 'core/components/component',
    loadComponent: () =>
      import('./components/topics/core_buliding_blocks/component/component').then(
        (m) => m.ComponentDetails
      ),
  },

  {
    path: 'templates/data-binding',
    loadComponent: () =>
      import('./components/topics/templates-ui/data-binding/data-binding').then(
        (m) => m.DataBinding
      ),
  },
  {
    path: 'templates/directives',
    loadComponent: () =>
      import('./components/topics/templates-ui/directive/directive-eg').then(
        (m) => m.DirectiveExample
      ),
  },
  {
    path: 'templates/pipes',
    loadComponent: () =>
      import('./components/topics/templates-ui/pipe/pipe-eg').then(
        (m) => m.PipeExample
      ),
  },

  {
    path: 'services/di/concepts',
    loadComponent: () =>
      import('./components/topics/di-service/di/di-service').then(
        (m) => m.DiServiceExample
      ),
  },
  {
    path: 'services/di/injectable-providers',
    loadComponent: () =>
      import('./components/topics/di-service/service/service-eg').then(
        (m) => m.ServiceExample
      ),
  },

  {
    path: 'routing/basics',
    loadComponent: () =>
      import('./components/topics/routing-decorator/routing/routing').then(
        (m) => m.Routing
      ),
  },
  {
    path: 'decorators',
    loadComponent: () =>
      import('./components/topics/routing-decorator/decorator/decorator').then(
        (m) => m.DecoratorExample
      ),
  },
  {
    path: 'routing/basics/guard',
    loadComponent: () =>
      import('./components/topics/di-service/guard/guard-eg').then(
        (m) => m.GuardExample
      ),
  },

  {
    path: 'forms/form-module',
    loadComponent: () =>
      import('./components/topics/di-service/form/form-eg').then(
        (m) => m.FormExample
      ),
  },
  {
    path: 'forms/reactive-forms',
    loadComponent: () =>
      import('./components/topics/di-service/reactive-form/reactive-form-eg').then(
        (m) => m.ReactiveFormExample
      ),
  },
  {
    path: 'forms/form-validation',
    loadComponent: () =>
      import('./components/topics/di-service/form-validation/form-validation').then(
        (m) => m.FormValidationComponentEg
      ),
  },

  {
    path: 'rxjs/core/observables-vs-promises',
    loadComponent: () =>
      import('./components/topics/rxjs/observable-promise/observable-promise').then(
        (m) => m.ObservablePromise
      ),
  },
  {
    path: 'rxjs/core/subjects',
    loadComponent: () =>
      import('./components/topics/rxjs/subject/rxjs-subject').then(
        (m) => m.RxjsSubject
      ),
  },
  {
    path: 'rxjs/operators/basic',
    loadComponent: () =>
      import('./components/topics/rxjs/operator/rxjs-operator').then(
        (m) => m.RxjsOperator
      ),
  },
  {
    path: 'rxjs/operators/flattening',
    loadComponent: () =>
      import('./components/topics/rxjs/rxjs-flattening/rxjs-flattening').then(
        (m) => m.RxjsFlattening
      ),
  },
  {
    path: 'interceptor',
    loadComponent: () =>
      import('./components/topics/rxjs/interceptor/ng-interceptor').then(
        (m) => m.NgInterceptor
      ),
  },
  {
    path: 'http-client',
    loadComponent: () =>
      import('./components/topics/rxjs/http-client/ng-httpclient').then(
        (m) => m.NgHttpClient
      ),
  },

  { path: '**', redirectTo: '' },
];
