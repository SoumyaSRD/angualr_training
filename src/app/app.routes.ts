import { Routes } from '@angular/router';
import { GenericTopicComponent } from './components/generic-topic/generic-topic.component';
import { HomeComponent } from './components/home/home.component';
import { AllModules } from './components/topics/core_buliding_blocks/all_modules/all_modules';
import { ComponentDetails } from './components/topics/core_buliding_blocks/component/component';
import { LazyModule } from './components/topics/core_buliding_blocks/lazy_module/lazy-module';
import { ModuleStandalone } from './components/topics/core_buliding_blocks/module-standalone/module-standalone';
import { Standalone } from './components/topics/core_buliding_blocks/standalone/standalone';
import { DiServiceExample } from './components/topics/di-service/di/di-service';
import { FormValidationComponentEg } from './components/topics/di-service/form-validation/form-validation';
import { FormExample } from './components/topics/di-service/form/form-eg';
import { GuardExample } from './components/topics/di-service/guard/guard-eg';
import { ReactiveFormExample } from './components/topics/di-service/reactive-form/reactive-form-eg';
import { ServiceExample } from './components/topics/di-service/service/service-eg';
import { HowBrowsersWorkComponent } from './components/topics/prerequisites/browser/how-browsers-work.component';
import { HttpHttpsComponent } from './components/topics/prerequisites/http/http-https.component';
import { DecoratorExample } from './components/topics/routing-decorator/decorator/decorator';
import { Routing } from './components/topics/routing-decorator/routing/routing';
import { DataBinding } from './components/topics/templates-ui/data-binding/data-binding';
import { DirectiveExample } from './components/topics/templates-ui/directive/directive-eg';
import { PipeExample } from './components/topics/templates-ui/pipe/pipe-eg';
import { angularFundamentalRoutes } from './routes/angualr-fundamental.routes';
import { ObservablePromise } from './components/topics/rxjs/observable-promise/observable-promise';
import { RxjsOperator } from './components/topics/rxjs/operator/rxjs-operator';
import { RxjsSubject } from './components/topics/rxjs/subject/rxjs-subject';
import { RxjsFlattening } from './components/topics/rxjs/rxjs-flattening/rxjs-flattening';


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


  { path: 'core/modules/module-types', component: AllModules },
  { path: 'core/modules/lazy-loading', component: LazyModule },

  { path: 'core/modules/standalone-components', component: Standalone },
  { path: 'core/modules/module-vs-standalone', component: ModuleStandalone },
  { path: 'core/components/component', component: ComponentDetails },
  // { path: 'core/components/templates', component: GenericTopicComponent },
  // { path: 'core/components/communication', component: GenericTopicComponent },
  // { path: 'core/components/lifecycle-hooks', component: GenericTopicComponent },
  // { path: 'core/components/change-detection', component: GenericTopicComponent },
  // { path: 'core/components/smart-vs-dumb', component: GenericTopicComponent },

  { path: 'templates/data-binding', component: DataBinding },
  { path: 'templates/directives', component: DirectiveExample },
  // { path: 'templates/directives/types', component: GenericTopicComponent },
  // { path: 'templates/directives/custom', component: GenericTopicComponent },
  // { path: 'templates/directives/host-decorators', component: GenericTopicComponent },
  // { path: 'templates/directives/trackby', component: GenericTopicComponent },
  { path: 'templates/pipes', component: PipeExample },
  // { path: 'templates/pipes/pure-vs-impure', component: GenericTopicComponent },
  // { path: 'templates/pipes/custom', component: GenericTopicComponent },
  // { path: 'templates/pipes/async', component: GenericTopicComponent },

  { path: 'services/di/concepts', component: DiServiceExample },
  { path: 'services/di/injectable-providers', component: ServiceExample },
  // { path: 'services/di/scopes', component: GenericTopicComponent },
  // { path: 'services/di/injection-tokens', component: GenericTopicComponent },
  // { path: 'services/di/multi-providers', component: GenericTopicComponent },
  // { path: 'services/di/singleton', component: GenericTopicComponent },

  { path: 'routing/basics', component: Routing },
  { path: 'decorators', component: DecoratorExample },
  { path: 'rourouting/basics/guard', component: GuardExample },
  // { path: 'routing/advanced/lazy-routes', component: GenericTopicComponent },
  // { path: 'routing/advanced/guards-resolvers', component: GenericTopicComponent },
  // { path: 'routing/advanced/error-handling', component: GenericTopicComponent },

  { path: 'forms/form-module', component: FormExample },
  { path: 'forms/reactive-forms', component: ReactiveFormExample },
  { path: 'forms/form-validation', component: FormValidationComponentEg },
  // { path: 'forms/template-driven/error-handling', component: GenericTopicComponent },
  // { path: 'forms/template-driven/limitations', component: GenericTopicComponent },
  // { path: 'forms/reactive/basics', component: GenericTopicComponent },
  // { path: 'forms/reactive/validators', component: GenericTopicComponent },
  // { path: 'forms/reactive/dynamic-forms', component: GenericTopicComponent },
  // { path: 'forms/reactive/form-builder', component: GenericTopicComponent },

  // { path: 'http/basics/methods', component: GenericTopicComponent },
  // { path: 'http/basics/headers-params', component: GenericTopicComponent },
  // { path: 'http/basics/error-handling', component: GenericTopicComponent },
  // { path: 'http/advanced/interceptors', component: GenericTopicComponent },
  // { path: 'http/advanced/auth-tokens', component: GenericTopicComponent },
  // { path: 'http/advanced/file-operations', component: GenericTopicComponent },
  // { path: 'http/advanced/pagination', component: GenericTopicComponent },

  { path: 'rxjs/core/observables-vs-promises', component: ObservablePromise },
  // { path: 'rxjs/core/cold-vs-hot', component: GenericTopicComponent },
  { path: 'rxjs/core/subjects', component: RxjsSubject },
  { path: 'rxjs/operators/basic', component: RxjsOperator },
  { path: 'rxjs/operators/flattening', component: RxjsFlattening },
  // { path: 'rxjs/patterns/error-handling', component: GenericTopicComponent },
  // { path: 'rxjs/patterns/unsubscribe', component: GenericTopicComponent },

  // { path: 'state/approaches/component-state', component: GenericTopicComponent },
  // { path: 'state/approaches/service-state', component: GenericTopicComponent },
  // { path: 'state/signals/basics', component: GenericTopicComponent },
  // { path: 'state/signals/computed-effect', component: GenericTopicComponent },
  // { path: 'state/signals/signals-vs-rxjs', component: GenericTopicComponent },
  // { path: 'state/approaches/ngrx', component: GenericTopicComponent },

  // { path: 'advanced/performance/change-detection', component: GenericTopicComponent },
  // { path: 'advanced/performance/onpush', component: GenericTopicComponent },
  // { path: 'advanced/topics/content-projection', component: GenericTopicComponent },
  // { path: 'advanced/topics/view-child', component: GenericTopicComponent },
  // { path: 'advanced/topics/content-child', component: GenericTopicComponent },
  // { path: 'advanced/i18n/angular-i18n', component: GenericTopicComponent },
  // { path: 'advanced/i18n/localization', component: GenericTopicComponent },
  // { path: 'advanced/i18n/multi-language', component: GenericTopicComponent },

  // { path: 'security/practices/sanitization', component: GenericTopicComponent },
  // { path: 'security/practices/jwt', component: GenericTopicComponent },
  // { path: 'security/practices/rbac', component: GenericTopicComponent },

  // { path: 'modern/features/standalone-first', component: GenericTopicComponent },
  // { path: 'modern/features/signals-first', component: GenericTopicComponent },
  // { path: 'modern/features/zoneless', component: GenericTopicComponent },
  // { path: 'modern/features/ssr-hydration', component: GenericTopicComponent },
  // { path: 'modern/features/vite', component: GenericTopicComponent },
  // { path: 'modern/features/performance', component: GenericTopicComponent },

  // { path: 'capstone/project/auth', component: GenericTopicComponent },
  // { path: 'capstone/project/dashboard', component: GenericTopicComponent },
  // { path: 'capstone/project/api-integration', component: GenericTopicComponent },
  // { path: 'capstone/project/forms', component: GenericTopicComponent },
  // { path: 'capstone/project/state', component: GenericTopicComponent },
  // { path: 'capstone/project/performance', component: GenericTopicComponent },
  // { path: 'capstone/project/routing', component: GenericTopicComponent },
  // { path: 'capstone/project/deployment', component: GenericTopicComponent },

  // { path: 'best-practices/enterprise/folder-structure', component: GenericTopicComponent },
  // { path: 'best-practices/enterprise/reusable-components', component: GenericTopicComponent },
  // { path: 'best-practices/enterprise/shared-libraries', component: GenericTopicComponent },
  // { path: 'best-practices/enterprise/monorepo', component: GenericTopicComponent },
  // { path: 'best-practices/enterprise/code-review', component: GenericTopicComponent },

  { path: '**', redirectTo: '' }
];
