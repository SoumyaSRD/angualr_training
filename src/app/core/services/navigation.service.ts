import { Injectable } from '@angular/core';

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
  providedIn: 'root',
})
export class NavigationService {
  topics: Topic[] = [
    {
      title: "Prerequisites (Foundation)",
      icon: "school",
      subTopics: [
        { title: "How Browsers Work", route: "/prerequisites/web-fundamentals/how-browsers-work" },
        { title: "HTTP & HTTPS", route: "/prerequisites/web-fundamentals/http-https" },
        { title: "REST APIs", route: "/prerequisites/web-fundamentals/rest-apis" },
        { title: "JSON", route: "/prerequisites/web-fundamentals/json" },
        { title: "CORS", route: "/prerequisites/web-fundamentals/cors" },
        { title: "TypeScript vs JavaScript", route: "/prerequisites/typescript/typescript-vs-javascript" },
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
        { title: "What is Angular", route: "/fundamentals/introduction/what-is-angular" },
        { title: "Angular vs React vs Vue", route: "/fundamentals/introduction/angular-vs-react-vue" },
        { title: "Angular Architecture Overview", route: "/fundamentals/introduction/architecture-overview" },
        { title: "Node.js & npm", route: "/fundamentals/setup/nodejs-npm" },
        { title: "Angular CLI Installation", route: "/fundamentals/setup/cli-installation" },
        { title: "Angular Application", route: "/fundamentals/setup/first-app" },
      ],
    },
    {
      title: "Core Building Blocks",
      icon: "widgets",
      subTopics: [
        { title: "Root, Feature, Shared & Core Modules", route: "/core/modules/module-types" },
        { title: "Lazy-Loaded Modules", route: "/core/modules/lazy-loading" },
        { title: "Standalone Components", route: "/core/modules/standalone-components" },
        { title: "Module vs Standalone Comparison", route: "/core/modules/module-vs-standalone" },
        { title: "Component", route: "/core/components/component" },
      ],
    },
    {
      title: "Templates & UI",
      icon: "web",
      subTopics: [
        { title: "Data Binding", route: "/templates/data-binding" },
        { title: "Directives", route: "/templates/directives" },
        { title: "Pipes", route: "/templates/pipes" },
      ],
    },
    {
      title: "Dependency Injection & Services",
      icon: "settings",
      subTopics: [
        { title: "DI Concepts", route: "/services/di/concepts" },
        { title: "Services", route: "/services/di/injectable-providers" },
      ],
    },
    {
      title: "Routing & Decorators",
      icon: "route",
      subTopics: [
        { title: "Routing Basics", route: "/routing/basics" },
        { title: "Guards", route: "/routing/basics/guard" },
        { title: "Decorators", route: "/decorators" },
      ],
    },
    {
      title: "Forms",
      icon: "description",
      subTopics: [
        { title: "Forms Module", route: "/forms/form-module" },
        { title: "Reactive Forms", route: "/forms/reactive-forms" },
        { title: "Form Validation", route: "/forms/form-validation" },
      ],
    },
    {
      title: "RxJS",
      icon: "stream",
      subTopics: [
        { title: "Observables vs Promises", route: "/rxjs/core/observables-vs-promises" },
        { title: "Subjects", route: "/rxjs/core/subjects" },
        { title: "map, filter, tap", route: "/rxjs/operators/basic" },
        { title: "mergeMap, switchMap, concatMap, exhaustMap", route: "/rxjs/operators/flattening" },
        { title: "Interceptors", route: "/interceptor" },
        { title: "Http Client", route: "/http-client" },
      ],
    },
  ];

  getAllRoutes(): string[] {
    return this.topics.flatMap((t) => t.subTopics.map((s) => s.route));
  }
}
