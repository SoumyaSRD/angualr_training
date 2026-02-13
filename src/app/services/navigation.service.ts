import { Injectable } from "@angular/core";

export interface SubTopic {
  title: string;
  route: string;
}

export interface Topic {
  title: string;
  icon: string;
  expanded?: boolean;
  subTopics: SubTopic[];
}

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  topics: Topic[] = [
    {
      title: "Prerequisites (Foundation)",
      icon: "school",
      subTopics: [
        {
          title: "How Browsers Work",
          route: "/prerequisites/web-fundamentals/how-browsers-work",
        },
        {
          title: "HTTP & HTTPS",
          route: "/prerequisites/web-fundamentals/http-https",
        },
        {
          title: "REST APIs",
          route: "/prerequisites/web-fundamentals/rest-apis",
        },
        { title: "JSON", route: "/prerequisites/web-fundamentals/json" },
        { title: "CORS", route: "/prerequisites/web-fundamentals/cors" },
        {
          title: "TypeScript vs JavaScript",
          route: "/prerequisites/typescript/typescript-vs-javascript",
        },
        { title: "Data Types", route: "/prerequisites/typescript/data-types" },
        { title: "Interfaces", route: "/prerequisites/typescript/interfaces" },
        { title: "Enums", route: "/prerequisites/typescript/enums" },
        { title: "Classes", route: "/prerequisites/typescript/classes" },
      ],
    },
    {
      title: "Angular Fundamentals",
      icon: "code",
      subTopics: [
        {
          title: "What is Angular",
          route: "/fundamentals/introduction/what-is-angular",
        },
        {
          title: "Angular vs React vs Vue",
          route: "/fundamentals/introduction/angular-vs-react-vue",
        },
        {
          title: "Angular Architecture Overview",
          route: "/fundamentals/introduction/architecture-overview",
        },
        // { title: 'Angular CLI Overview', route: '/fundamentals/introduction/cli-overview' },
        // { title: 'Angular Versioning & LTS', route: '/fundamentals/introduction/versioning-lts' },
        { title: "Node.js & npm", route: "/fundamentals/setup/nodejs-npm" },
        {
          title: "Angular CLI Installation",
          route: "/fundamentals/setup/cli-installation",
        },
        {
          title: "Angular Application",
          route: "/fundamentals/setup/first-app",
        },
        // { title: 'Project Folder Structure', route: '/fundamentals/setup/folder-structure' },
        // { title: 'Configuration Files', route: '/fundamentals/setup/config-files' }
      ],
    },
    {
      title: "Core Building Blocks",
      icon: "widgets",
      subTopics: [
        {
          title: "Root, Feature, Shared & Core Modules",
          route: "/core/modules/module-types",
        },
        { title: "Lazy-Loaded Modules", route: "/core/modules/lazy-loading" },
        {
          title: "Standalone Components",
          route: "/core/modules/standalone-components",
        },
        {
          title: "Module vs Standalone Comparison",
          route: "/core/modules/module-vs-standalone",
        },
        { title: "Component", route: "/core/components/component" },
        // { title: 'Inline vs External Templates', route: '/core/components/templates' },
        // { title: 'Component Communication', route: '/core/components/communication' },
        // { title: 'Lifecycle Hooks', route: '/core/components/lifecycle-hooks' },
        // { title: 'Change Detection Basics', route: '/core/components/change-detection' },
        // { title: 'Smart vs Dumb Components', route: '/core/components/smart-vs-dumb' }
      ],
    },
    {
      title: "Templates & UI",
      icon: "web",
      subTopics: [
        { title: "Data Binding", route: "/templates/data-binding" },
        { title: "Directives", route: "/templates/directives" },
        // { title: 'Attribute & Structural Directives', route: '/templates/directives/types' },
        // { title: 'Custom Directives', route: '/templates/directives/custom' },
        // { title: 'HostBinding & HostListener', route: '/templates/directives/host-decorators' },
        // { title: 'trackBy Optimization', route: '/templates/directives/trackby' },
        { title: "Pipes", route: "/templates/pipes" },
        // { title: 'Pure vs Impure Pipes', route: '/templates/pipes/pure-vs-impure' },
        // { title: 'Custom Pipes', route: '/templates/pipes/custom' },
        // { title: 'Async Pipe', route: '/templates/pipes/async' }
      ],
    },
    {
      title: "Dependency Injection & Services",
      icon: "settings",
      subTopics: [
        { title: "DI Concepts", route: "/services/di/concepts" },
        { title: "Services", route: "/services/di/injectable-providers" },
        // { title: 'Service Scopes', route: '/services/di/scopes' },
        // { title: 'Injection Tokens', route: '/services/di/injection-tokens' },
        // { title: 'Multi-Providers', route: '/services/di/multi-providers' },
        // { title: 'Singleton Services', route: '/services/di/singleton' }
      ],
    },
    {
      title: "Routing & Decorators",
      icon: "route",
      subTopics: [
        { title: "Routering Basics", route: "/routing/basics" },
        { title: "Guards", route: "/rourouting/basics/guard" },
        { title: "Decorators", route: "/decorators" },
        // { title: 'Child & Lazy-Loaded Routes', route: '/routing/advanced/lazy-routes' },
        // { title: 'Route Guards & Resolvers', route: '/routing/advanced/guards-resolvers' },
        // { title: 'Error Handling in Routing', route: '/routing/advanced/error-handling' }
      ],
    },
    {
      title: "Forms",
      icon: "description",
      subTopics: [
        { title: "Forms Module", route: "/forms/form-module" },
        { title: "Reactive Forms", route: "/forms/reactive-forms" },
        { title: "Form Validation", route: "forms/form-validation" },
      ],
    },
    // {
    //   title: 'HTTP & API Communication',
    //   icon: 'cloud',
    //   subTopics: [
    //     { title: 'HTTP Methods', route: '/http/basics/methods' },
    //     { title: 'Headers & Parameters', route: '/http/basics/headers-params' },
    //     { title: 'Error Handling & Retry Logic', route: '/http/basics/error-handling' },
    //     { title: 'HTTP Interceptors', route: '/http/advanced/interceptors' },
    //     { title: 'Authentication Tokens', route: '/http/advanced/auth-tokens' },
    //     { title: 'File Upload & Download', route: '/http/advanced/file-operations' },
    //     { title: 'Pagination & Filtering', route: '/http/advanced/pagination' }
    //   ]
    // },
    {
      title: "RxJS",
      icon: "stream",
      subTopics: [
        {
          title: "Observables vs Promises",
          route: "/rxjs/core/observables-vs-promises",
        },
        // { title: "Cold vs Hot Observables", route: "/rxjs/core/cold-vs-hot" },
        { title: "Subjects", route: "/rxjs/core/subjects" },
        { title: "map, filter, tap", route: "/rxjs/operators/basic" },
        {
          title: "mergeMap, switchMap, concatMap, exhaustMap",
          route: "/rxjs/operators/flattening",
        },
        {
          title: "Interceptors",
          route: "/interceptor",
        },
        {
          title: "Http Client",
          route: "/http-client",
        },
        // { title: "Error Handling", route: "/rxjs/patterns/error-handling" },
        // {
        //   title: "Unsubscribing Strategies",
        //   route: "/rxjs/patterns/unsubscribe",
        // },
      ],
    },
    // {
    //   title: "State Management",
    //   icon: "storage",
    //   subTopics: [
    //     {
    //       title: "Component State",
    //       route: "/state/approaches/component-state",
    //     },
    //     {
    //       title: "Shared Service State",
    //       route: "/state/approaches/service-state",
    //     },
    //     { title: "Signals", route: "/state/signals/basics" },
    //     {
    //       title: "Computed & Effect Signals",
    //       route: "/state/signals/computed-effect",
    //     },
    //     { title: "Signals vs RxJS", route: "/state/signals/signals-vs-rxjs" },
    //     { title: "When to Use NgRx", route: "/state/approaches/ngrx" },
    //   ],
    // },
    // {
    //   title: 'Advanced Angular Concepts',
    //   icon: 'star',
    //   subTopics: [
    //     { title: 'Change Detection Strategy', route: '/advanced/performance/change-detection' },
    //     { title: 'OnPush Change Detection', route: '/advanced/performance/onpush' },
    //     { title: 'Content Projection', route: '/advanced/topics/content-projection' },
    //     { title: 'ViewChild & ViewChildren', route: '/advanced/topics/view-child' },
    //     { title: 'ContentChild & ContentChildren', route: '/advanced/topics/content-child' },
    //     { title: 'Angular i18n', route: '/advanced/i18n/angular-i18n' },
    //     { title: 'Localization', route: '/advanced/i18n/localization' },
    //     { title: 'Multi-Language Support', route: '/advanced/i18n/multi-language' }
    //   ]
    // },
    // {
    //   title: 'Security',
    //   icon: 'security',
    //   subTopics: [
    //     { title: 'Sanitization & DomSanitizer', route: '/security/practices/sanitization' },
    //     { title: 'JWT Authentication', route: '/security/practices/jwt' },
    //     { title: 'Role-Based Authorization', route: '/security/practices/rbac' }
    //   ]
    // },
    // {
    //   title: 'Angular 21 Modern Features',
    //   icon: 'new_releases',
    //   subTopics: [
    //     { title: 'Standalone-First Architecture', route: '/modern/features/standalone-first' },
    //     { title: 'Signals-First Approach', route: '/modern/features/signals-first' },
    //     { title: 'Zoneless Angular', route: '/modern/features/zoneless' },
    //     { title: 'Improved SSR & Hydration', route: '/modern/features/ssr-hydration' },
    //     { title: 'Vite-Based Tooling', route: '/modern/features/vite' },
    //     { title: 'Performance Enhancements', route: '/modern/features/performance' }
    //   ]
    // },
    // {
    //   title: 'Major Capstone Project',
    //   icon: 'assignment',
    //   subTopics: [
    //     { title: 'Authentication & Authorization', route: '/capstone/project/auth' },
    //     { title: 'Dashboard Development', route: '/capstone/project/dashboard' },
    //     { title: 'API Integration', route: '/capstone/project/api-integration' },
    //     { title: 'Reactive Forms', route: '/capstone/project/forms' },
    //     { title: 'State Management', route: '/capstone/project/state' },
    //     { title: 'Performance Optimization', route: '/capstone/project/performance' },
    //     { title: 'Routing & Guards', route: '/capstone/project/routing' },
    //     { title: 'Deployment', route: '/capstone/project/deployment' }
    //   ]
    // },
    // {
    //   title: 'Best Practices & Architecture',
    //   icon: 'architecture',
    //   subTopics: [
    //     { title: 'Folder Structure', route: '/best-practices/enterprise/folder-structure' },
    //     { title: 'Reusable Components', route: '/best-practices/enterprise/reusable-components' },
    //     { title: 'Shared Libraries', route: '/best-practices/enterprise/shared-libraries' },
    //     { title: 'Monorepo Basics', route: '/best-practices/enterprise/monorepo' },
    //     { title: 'Code Review Checklist', route: '/best-practices/enterprise/code-review' }
    //   ]
    // }
  ];

  getAllRoutes(): string[] {
    return this.topics.flatMap((topic) =>
      topic.subTopics.map((sub) => sub.route),
    );
  }
}
