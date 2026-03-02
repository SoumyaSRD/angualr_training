import { Injectable, signal, computed } from '@angular/core';

export interface SubTopic {
  title: string;
  route: string;
  icon?: string;
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
  private topicsData: Topic[] = [
    {
      title: "Prerequisites",
      icon: "bi bi-mortarboard-fill",
      subTopics: [
        { title: "How Browsers Work", route: "/prerequisites/web-fundamentals/how-browsers-work", icon: "bi bi-display" },
        { title: "HTTP & HTTPS", route: "/prerequisites/web-fundamentals/http-https", icon: "bi bi-shield-lock-fill" },
        { title: "REST APIs", route: "/prerequisites/web-fundamentals/rest-apis", icon: "bi bi-arrow-left-right" },
        { title: "JSON", route: "/prerequisites/web-fundamentals/json", icon: "bi bi-braces" },
        { title: "CORS", route: "/prerequisites/web-fundamentals/cors", icon: "bi bi-globe" },
        { title: "TypeScript", route: "/prerequisites/typescript/typescript-vs-javascript", icon: "bi bi-filetype-ts" },
      ],
    },
    {
      title: "Fundamentals",
      icon: "bi bi-code-square",
      subTopics: [
        { title: "What is Angular", route: "/fundamentals/introduction/what-is-angular", icon: "bi bi-info-circle-fill" },
        { title: "Architecture", route: "/fundamentals/introduction/architecture-overview", icon: "bi bi-diagram-3-fill" },
        { title: "Setup & CLI", route: "/fundamentals/setup/cli-installation", icon: "bi bi-terminal-fill" },
        { title: "First App", route: "/fundamentals/setup/first-app", icon: "bi bi-play-circle-fill" },
      ],
    },
    {
      title: "Core Concepts",
      icon: "bi bi-boxes",
      subTopics: [
        { title: "Modules", route: "/core/modules/module-types", icon: "bi bi-puzzle-fill" },
        { title: "Components", route: "/core/components/component", icon: "bi bi-layers-fill" },
        { title: "Templates", route: "/core/templates/data-binding", icon: "bi bi-file-earmark-code-fill" },
        { title: "Directives", route: "/core/directives/structural-directives", icon: "bi bi-sliders2" },
      ],
    },
    {
      title: "Templates & Rendering",
      icon: "bi bi-layout-text-window-reverse",
      subTopics: [
        { title: "Data Binding", route: "/templates/data-binding", icon: "bi bi-link-45deg" },
        { title: "Directives", route: "/templates/directives", icon: "bi bi-sliders" },
        { title: "Pipes", route: "/templates/pipes", icon: "bi bi-funnel-fill" },
      ],
    },
    {
      title: "Dependency Injection & Services",
      icon: "bi bi-gear-wide-connected",
      subTopics: [
        { title: "DI Concepts", route: "/services/di/concepts", icon: "bi bi-bezier2" },
        { title: "Injectable Services", route: "/services/di/injectable-providers", icon: "bi bi-plug-fill" },
      ],
    },
    {
      title: "Routing & Navigation",
      icon: "bi bi-signpost-2-fill",
      subTopics: [
        { title: "Routing Basics", route: "/routing/basics", icon: "bi bi-signpost-fill" },
        { title: "Route Guards", route: "/routing/basics/guard", icon: "bi bi-shield-fill-check" },
        { title: "Decorators", route: "/decorators", icon: "bi bi-at" },
      ],
    },
    {
      title: "Forms",
      icon: "bi bi-ui-checks-grid",
      subTopics: [
        { title: "Forms Module", route: "/forms/form-module", icon: "bi bi-card-checklist" },
        { title: "Reactive Forms", route: "/forms/reactive-forms", icon: "bi bi-input-cursor-text" },
        { title: "Form Validation", route: "/forms/form-validation", icon: "bi bi-check2-circle" },
      ],
    },
    {
      title: "RxJS & HTTP",
      icon: "bi bi-activity",
      subTopics: [
        { title: "Observables vs Promises", route: "/rxjs/core/observables-vs-promises", icon: "bi bi-arrow-repeat" },
        { title: "Subjects", route: "/rxjs/core/subjects", icon: "bi bi-broadcast" },
        { title: "Basic Operators", route: "/rxjs/operators/basic", icon: "bi bi-funnel" },
        { title: "Flattening Operators", route: "/rxjs/operators/flattening", icon: "bi bi-diagram-2-fill" },
        { title: "HTTP Interceptors", route: "/interceptor", icon: "bi bi-shield-fill" },
        { title: "HTTP Client", route: "/http-client", icon: "bi bi-cloud-arrow-up-fill" },
      ],
    },
  ];

  // Make topics a signal for reactivity
  topics = signal<Topic[]>(this.topicsData.map(topic => ({
    ...topic,
    expanded: false, // Add expanded state to each topic
    subTopics: topic.subTopics
  })));

  // Computed property for all routes
  allRoutes = computed(() =>
    this.topics().flatMap((t) => t.subTopics.map((s) => s.route))
  );

  // Method to toggle topic expansion
  toggleTopic(index: number): void {
    const currentTopics = this.topics();
    const updatedTopics = [...currentTopics];
    updatedTopics[index] = {
      ...updatedTopics[index],
      expanded: !updatedTopics[index].expanded
    };
    this.topics.set(updatedTopics);
  }

  // Method to expand a specific topic
  expandTopic(index: number): void {
    const currentTopics = this.topics();
    const updatedTopics = [...currentTopics];
    updatedTopics[index] = {
      ...updatedTopics[index],
      expanded: true
    };
    this.topics.set(updatedTopics);
  }

  // Method to collapse a specific topic
  collapseTopic(index: number): void {
    const currentTopics = this.topics();
    const updatedTopics = [...currentTopics];
    updatedTopics[index] = {
      ...updatedTopics[index],
      expanded: false
    };
    this.topics.set(updatedTopics);
  }

  // Method to collapse all topics
  collapseAll(): void {
    const updatedTopics = this.topics().map(topic => ({
      ...topic,
      expanded: false
    }));
    this.topics.set(updatedTopics);
  }

  // Getter for all routes (maintains backward compatibility)
  getAllRoutes(): string[] {
    return this.allRoutes();
  }
}