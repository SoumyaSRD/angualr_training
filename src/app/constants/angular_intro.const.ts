export const AngularIntroduction = {
    title: 'Introduction to Angular',
    tags: ['Angular', 'Framework', 'TypeScript', 'Standalone', 'Components', 'Modern Web'],
    paragraphs: [
        'Angular is a full-featured, open-source front-end framework developed and maintained by Google. First released in 2010 as AngularJS and completely rewritten in 2016 as Angular (version 2+), it has evolved into one of the most powerful platforms for building scalable, enterprise-grade single-page applications (SPAs), progressive web apps (PWAs), and even desktop/mobile apps via Electron or NativeScript.',
        'Unlike lightweight libraries like React or Vue, Angular is a complete framework that provides everything you need out of the box: a component-based architecture, dependency injection, reactive templating, powerful routing, state management tools, forms handling, HTTP client, internationalization, testing utilities, and a robust CLI for scaffolding and builds. This "batteries-included" approach reduces decision fatigue and ensures consistency across large teams.',
        'Since Angular 14 (2022), the framework has shifted toward standalone components as the default and recommended pattern. Standalone components are self-contained—no need for NgModules—making code simpler, more tree-shakable, and easier to lazy-load. By Angular 17+ (current as of 2026), most new projects use standalone APIs exclusively, with NgModules retained only for backward compatibility.',
        'Angular is built entirely on TypeScript, leveraging its static typing for better developer experience, early error detection, and superior IDE support. Combined with decorators, RxJS observables, and Ahead-of-Time (AOT) compilation, Angular delivers high performance, excellent maintainability, and long-term support (Google commits to LTS for 18 months per major version).'
    ],
    sections: [
        {
            heading: 'Why Choose Angular?',
            content: 'Angular stands out for large-scale applications due to its opinionated structure and comprehensive tooling:',
            list: [
                '<strong>Full Framework:</strong> Built-in solutions for routing, forms, HTTP, animations, and more—no need to choose third-party libraries',
                '<strong>Dependency Injection:</strong> Powerful hierarchical DI system for services and testability',
                '<strong>Reactive Programming:</strong> First-class RxJS support for handling asynchronous data streams',
                '<strong>CLI Powerhouse:</strong> ng generate, build, test, deploy—all streamlined',
                '<strong>Enterprise Ready:</strong> Excellent for complex apps with authentication, state management, accessibility, and internationalization',
                '<strong>Strong Typing:</strong> TypeScript ensures robust code in large teams',
                '<strong>Performance:</strong> Ivy renderer, AOT compilation, lazy loading, and change detection optimization'
            ]
        },
        {
            heading: 'Standalone Components: The Modern Default',
            content: 'Standalone components (introduced in Angular 14) eliminate NgModules for most use cases. They declare their own dependencies via the imports array:',
            list: [
                '<strong>Simpler:</strong> No separate module files',
                '<strong>Tree-shakable:</strong> Better bundle sizes',
                '<strong>Lazy-loadable:</strong> Easy route-level lazy loading',
                '<strong>Flexible:</strong> Can still import NgModules when needed (e.g., legacy libraries)'
            ],
            additionalExplanation: 'Most Angular Material modules, forms, and common modules are now standalone-compatible.'
        },
        {
            heading: 'Bootstrapping an Angular Application',
            content: 'Modern Angular apps bootstrap directly with bootstrapApplication() instead of NgModule-based main.ts:',
            list: [
                '<strong>Providers:</strong> Configure router, HTTP client, animations, interceptors globally',
                '<strong>Environment:</strong> Inject environment variables or feature flags',
                '<strong>Error Handling:</strong> Centralized error catching'
            ]
        },
        {
            heading: 'Key Building Blocks',
            content: 'Angular applications are composed of:',
            list: [
                '<strong>Components:</strong> UI building blocks with templates and logic',
                '<strong>Services:</strong> Singleton or scoped providers for business logic and data',
                '<strong>Pipes:</strong> Transform displayed values (e.g., date, currency)',
                '<strong>Directives:</strong> Custom behavior (structural like *ngIf, attribute like ngClass)',
                '<strong>Routing:</strong> Deep linking and lazy loading with Angular Router',
                '<strong>Forms:</strong> Template-driven or reactive forms with validation'
            ]
        },
        {
            heading: 'NgModule vs Standalone: Migration Path',
            content: 'While NgModules are still supported, standalone is the future:',
            list: [
                '<strong>Legacy (NgModule):</strong> Declarations, imports, exports, providers in module files',
                '<strong>Modern (Standalone):</strong> Everything in component imports array',
                '<strong>Migration:</strong> Use ng generate @angular/core:standalone to convert gradually'
            ]
        }
    ],
    codeExamples: [
        {
            title: 'Basic Standalone Component',
            language: 'typescript',
            description: 'A simple counter component demonstrating two-way binding and event handling',
            code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: \`
    <mat-card>
      <mat-card-header>
        <mat-card-title>Counter: {{ count }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <button mat-raised-button color="primary" (click)="increment()">+1</button>
        <button mat-raised-button color="accent" (click)="decrement()">-1</button>
        <button mat-button (click)="reset()">Reset</button>
      </mat-card-content>
    </mat-card>
  \`
})
export class CounterComponent {
  count = 0;

  increment() { this.count++; }
  decrement() { this.count--; }
  reset() { this.count = 0; }
}`
        },
        {
            title: 'Standalone Component with Inputs/Outputs',
            language: 'typescript',
            description: 'Reusable component with @Input() and @Output() for parent-child communication',
            code: `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <button (click)="edit.emit(user)">Edit</button>
      <button (click)="delete.emit(user.id)">Delete</button>
    </div>
  \`,
  styles: [\`.card { border: 1px solid #ccc; padding: 16px; margin: 8px; border-radius: 8px; }\`]
})
export class UserCardComponent {
  @Input() user!: { id: number; name: string; email: string };
  @Output() edit = new EventEmitter<{ id: number; name: string; email: string }>();
  @Output() delete = new EventEmitter<number>();
}`
        },
        {
            title: 'Bootstrapping a Modern Angular App (main.ts)',
            language: 'typescript',
            description: 'Complete bootstrapping with routing, HTTP, animations, and interceptors',
            code: `import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(MatSnackBarModule)
  ]
}).catch(err => console.error(err));`
        },
        {
            title: 'Simple Routing with Lazy Loading',
            language: 'typescript',
            description: 'app.routes.ts showing standalone routes with lazy loading',
            code: `import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
    children: [
      {
        path: ':id',
        loadComponent: () => import('./users/user-detail.component').then(m => m.UserDetailComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];`
        },
        {
            title: 'Injectable Service (Standalone Compatible)',
            language: 'typescript',
            description: 'A simple data service using HttpClient',
            code: `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'  // Singleton across app
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}`
        },
        {
            title: 'NgModule vs Standalone Comparison',
            language: 'typescript',
            description: 'Side-by-side view of old vs new approach',
            code: `// Standalone (Modern - Recommended)
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  template: '<h2>{{ title }}</h2>'
})
export class ProductComponent {
  title = 'Product Details';
}

// NgModule (Legacy)
@Component({
  selector: 'app-product-old',
  template: '<h2>{{ title }}</h2>'
})
export class ProductOldComponent {
  title = 'Product Details';
}

@NgModule({
  declarations: [ProductOldComponent],
  imports: [CommonModule, FormsModule, MatButtonModule],
  exports: [ProductOldComponent]
})
export class ProductModule { }`
        }
    ],
    keyPoints: [
        'Angular is a complete, opinionated framework with built-in solutions',
        'TypeScript-first for type safety and excellent tooling',
        'Standalone components are the default since Angular 14+',
        'No NgModules required for most new projects',
        'Powerful CLI for generation, building, and testing',
        'Hierarchical dependency injection system',
        'RxJS integration for reactive programming',
        'Excellent for large-scale, enterprise applications',
        'Long-term support and regular updates from Google',
        'Strong focus on performance, accessibility, and testing'
    ],
    bestPractices: [
        'Use standalone components exclusively in new projects',
        'Leverage the Angular CLI for scaffolding (ng generate component/service/etc)',
        'Follow the official style guide for consistency',
        'Use reactive forms over template-driven for complex scenarios',
        'Implement OnPush change detection for performance',
        'Lazy-load routes to improve initial load time',
        'Use providedIn: "root" for singleton services',
        'Write unit tests with Jasmine/Karma and e2e tests with Cypress',
        'Structure projects with feature modules or domain-based folders',
        'Keep components small and focused on single responsibility'
    ]
};