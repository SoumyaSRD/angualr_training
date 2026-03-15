// src/app/data/first-angular-app-content.ts

import { ITopicContent } from "../interfaces/topic";

export const ANGULAR_INTRODUCTION_TUTORIAL: ITopicContent = {
  title: 'Angular Application Architecture: A Comprehensive Guide to Modern Folder Structure',
  tags: [
    'Angular',
    'Folder Structure',
    'Project Architecture',
    'Standalone Components',
    'Best Practices',
    'Code Organization',
    'Scalability',
    'Maintainability'
  ],
  paragraphs: [
    'A well-crafted folder structure is the foundation of maintainable Angular applications. In the standalone era, Angular offers both simplicity for beginners and sophistication for enterprise-scale applications.',
    'This guide explores three complementary approaches to Angular project organization, from minimalist setups suitable for small projects to sophisticated domain-driven architectures designed for large teams and complex business requirements.',
    'Understanding these patterns empowers you to make intentional architectural decisions that align with your project\'s scope, team size, and long-term vision.'
  ],
  keyPoints: [
    'Folder structure is architecture made visible—it communicates intent and relationships',
    'Standalone components enable both flat and deeply organized structures with equal elegance',
    'Different organizational patterns serve different project scales and team dynamics',
    'Consistency within a project is more important than absolute "correctness"',
    'The structure should evolve with your application\'s complexity and team growth',
    'Clear boundaries between domains reduce coupling and improve testability'
  ],
  sections: [
    {
      id: 'philosophy',
      heading: 'The Philosophy of Angular Project Structure',
      content: `Great software architecture begins with intentional organization. Angular's flexibility allows multiple valid approaches, each with distinct advantages for different contexts.`,
      list: [
        'Structure should reveal the application\'s domain, not just its technology',
        'Folder depth should correspond to conceptual complexity, not arbitrary rules',
        'Import paths should tell a story about dependencies and relationships',
        'Naming should be consistent, descriptive, and aligned with team vocabulary',
        'The structure should facilitate both feature isolation and global discovery'
      ],
      additionalExplanation: `Think of your folder structure as a map of your application's conceptual landscape. Good maps help developers navigate quickly to their destination, understand relationships between different areas, and add new features without getting lost.`
    },
    {
      id: 'minimalist-approach',
      heading: 'Pattern 1: The Minimalist Approach (Ideal for Learning & Small Projects)',
      content: `For tutorials, prototypes, and small applications, a flat structure minimizes cognitive overhead while demonstrating Angular's standalone elegance.`,
      list: [
        'src/',
        '├── app/',
        '│   ├── app.component.ts',
        '│   ├── app.component.html',
        '│   ├── app.component.scss',
        '│   ├── app.routes.ts',
        '│   ├── app.config.ts',
        '│   ├── main.ts',
        '│   ├── components/',
        '│   │   ├── header/',
        '│   │   │   ├── header.component.ts',
        '│   │   │   ├── header.component.html',
        '│   │   │   └── header.component.scss',
        '│   │   ├── footer/',
        '│   │   │   ├── footer.component.ts',
        '│   │   │   └── footer.component.html',
        '│   │   └── user-card/',
        '│   │       ├── user-card.component.ts',
        '│   │       └── user-card.component.html',
        '│   ├── services/',
        '│   │   ├── api.service.ts',
        '│   │   └── auth.service.ts',
        '│   ├── models/',
        '│   │   ├── user.model.ts',
        '│   │   └── product.model.ts',
        '│   └── utils/',
        '│       ├── formatters.ts',
        '│       └── validators.ts',
        '├── assets/',
        '│   ├── images/',
        '│   │   ├── logo.svg',
        '│   │   └── icons/',
        '│   │       ├── home.svg',
        '│   │       └── settings.svg',
        '│   ├── fonts/',
        '│   │   ├── inter.woff2',
        '│   │   └── inter.woff',
        '│   └── locales/',
        '│       ├── en.json',
        '│       └── es.json',
        '├── environments/',
        '│   ├── environment.ts',
        '│   └── environment.prod.ts',
        '├── styles/',
        '│   ├── _variables.scss',
        '│   ├── _mixins.scss',
        '│   └── _global.scss',
        '└── index.html'
      ],
      additionalExplanation: `This structure shines in its simplicity. Everything is discoverable within 2-3 clicks, making it perfect for solo developers, learning projects, or applications with fewer than 20 components. The flat hierarchy reduces import path complexity while maintaining clear separation of concerns.`
    },
    {
      id: 'feature-based',
      heading: 'Pattern 2: Feature-Based Structure (The Pragmatic Standard)',
      content: `For mid-sized applications with clear functional boundaries, organizing by feature creates natural isolation and facilitates team parallelization.`,
      list: [
        'src/',
        '├── app/',
        '│   ├── core/                          # Singleton services, global state',
        '│   │   ├── services/',
        '│   │   │   ├── auth.service.ts',
        '│   │   │   ├── notification.service.ts',
        '│   │   │   └── api-interceptor.service.ts',
        '│   │   ├── guards/',
        '│   │   │   ├── auth.guard.ts',
        '│   │   │   └── role.guard.ts',
        '│   │   ├── interceptors/',
        '│   │   │   ├── auth.interceptor.ts',
        '│   │   │   └── logging.interceptor.ts',
        '│   │   └── models/',
        '│   │       ├── app-state.model.ts',
        '│   │       └── api-response.model.ts',
        '│   ├── shared/                       # Reusable UI components & utilities',
        '│   │   ├── components/',
        '│   │   │   ├── ui/',
        '│   │   │   │   ├── button/',
        '│   │   │   │   │   ├── button.component.ts',
        '│   │   │   │   │   ├── button.component.html',
        '│   │   │   │   │   └── button.component.scss',
        '│   │   │   │   ├── card/',
        '│   │   │   │   │   ├── card.component.ts',
        '│   │   │   │   │   └── card.component.html',
        '│   │   │   │   └── modal/',
        '│   │   │   │       ├── modal.component.ts',
        '│   │   │   │       └── modal.component.html',
        '│   │   │   └── layout/',
        '│   │   │       ├── header/',
        '│   │   │       │   ├── header.component.ts',
        '│   │   │       │   └── header.component.html',
        '│   │   │       └── footer/',
        '│   │   │           ├── footer.component.ts',
        '│   │   │           └── footer.component.html',
        '│   │   ├── directives/',
        '│   │   │   ├── click-outside.directive.ts',
        '│   │   │   └── auto-focus.directive.ts',
        '│   │   ├── pipes/',
        '│   │   │   ├── currency-format.pipe.ts',
        '│   │   │   └── date-format.pipe.ts',
        '│   │   └── utils/',
        '│   │       ├── formatters.ts',
        '│   │       └── validators.ts',
        '│   ├── features/                     # Domain-specific feature modules',
        '│   │   ├── dashboard/',
        '│   │   │   ├── components/',
        '│   │   │   │   ├── stats-card/',
        '│   │   │   │   │   ├── stats-card.component.ts',
        '│   │   │   │   │   └── stats-card.component.html',
        '│   │   │   │   └── recent-activity/',
        '│   │   │   │       ├── recent-activity.component.ts',
        '│   │   │   │       └── recent-activity.component.html',
        '│   │   │   ├── services/',
        '│   │   │   │   └── dashboard.service.ts',
        '│   │   │   ├── models/',
        '│   │   │   │   └── dashboard.model.ts',
        '│   │   │   ├── routes/',
        '│   │   │   │   └── dashboard.routes.ts',
        '│   │   │   └── pages/',
        '│   │   │       ├── dashboard-page/',
        '│   │   │       │   ├── dashboard-page.component.ts',
        '│   │   │       │   └── dashboard-page.component.html',
        '│   │   │       └── analytics-page/',
        '│   │   │           ├── analytics-page.component.ts',
        '│   │   │           └── analytics-page.component.html',
        '│   │   ├── users/',
        '│   │   │   ├── components/',
        '│   │   │   ├── services/',
        '│   │   │   ├── models/',
        '│   │   │   ├── routes/',
        '│   │   │   └── pages/',
        '│   │   │       ├── user-list/',
        '│   │   │       └── user-detail/',
        '│   │   └── products/',
        '│   │       ├── components/',
        '│   │       ├── services/',
        '│   │       ├── models/',
        '│   │       ├── routes/',
        '│   │       └── pages/',
        '│   │           ├── product-catalog/',
        '│   │           └── product-detail/',
        '│   ├── app.component.ts',
        '│   ├── app.routes.ts',
        '│   ├── app.config.ts',
        '│   └── main.ts',
        '├── assets/',
        '├── environments/',
        '└── styles/'
      ],
      additionalExplanation: `This structure introduces clear boundaries between different application domains. Features can be developed in parallel by different teams, each with their own isolated folders. The shared folder prevents duplication while core maintains global application state and services. This pattern scales well to applications with 50-200 components.`
    },
    {
      id: 'domain-driven',
      heading: 'Pattern 3: Domain-Driven Design (Enterprise Scale)',
      content: `For complex business applications with large teams, a domain-driven approach aligns folder structure with business capabilities and bounded contexts.`,
      list: [
        'src/',
        '├── domains/                          # Business capability domains',
        '│   ├── identity/                     # Authentication, authorization, users',
        '│   │   ├── application/',
        '│   │   │   ├── services/',
        '│   │   │   ├── commands/',
        '│   │   │   ├── queries/',
        '│   │   │   └── events/',
        '│   │   ├── infrastructure/',
        '│   │   │   ├── repositories/',
        '│   │   │   ├── adapters/',
        '│   │   │   └── gateways/',
        '│   │   └── presentation/',
        '│   │       ├── components/',
        '│   │       ├── pages/',
        '│   │       └── routes/',
        '│   ├── inventory/                    # Product catalog, stock management',
        '│   │   ├── domain/',
        '│   │   │   ├── entities/',
        '│   │   │   ├── value-objects/',
        '│   │   │   └── aggregates/',
        '│   │   ├── application/',
        '│   │   └── presentation/',
        '│   └── ordering/                     # Shopping cart, checkout, payments',
        '│       ├── domain/',
        '│       ├── application/',
        '│       └── presentation/',
        '├── shared/                           # Cross-cutting concerns',
        '│   ├── kernel/                       # Framework abstractions',
        '│   │   ├── base/',
        '│   │   │   ├── base.component.ts',
        '│   │   │   └── base.service.ts',
        '│   │   └── contracts/',
        '│   │       ├── repository.contract.ts',
        '│   │       └── service.contract.ts',
        '│   ├── ui/                           # Design system implementation',
        '│   │   ├── foundation/',
        '│   │   │   ├── tokens/',
        '│   │   │   ├── typography/',
        '│   │   │   └── grid/',
        '│   │   ├── components/',
        '│   │   │   ├── atoms/',
        '│   │   │   ├── molecules/',
        '│   │   │   └── organisms/',
        '│   │   └── templates/',
        '│   │       ├── dashboard.template.ts',
        '│   │       └── form.template.ts',
        '│   └── infrastructure/',
        '│       ├── logging/',
        '│       ├── monitoring/',
        '│       ├── configuration/',
        '│       └── http/',
        '├── app/',
        '│   ├── shell/                        # Application shell & composition root',
        '│   │   ├── layout/',
        '│   │   ├── navigation/',
        '│   │   └── shell.component.ts',
        '│   ├── bootstrap/',
        '│   │   ├── app.config.ts',
        '│   │   ├── app.routes.ts',
        '│   │   └── dependency-injection.config.ts',
        '│   └── main.ts',
        '└── environments/'
      ],
      additionalExplanation: `This sophisticated structure implements clean architecture principles. Domains represent business capabilities with clear boundaries. Each domain contains its own domain logic, application services, and presentation layers. The shared folder contains truly cross-cutting concerns, while the app folder serves as the composition root. This pattern supports hundreds of components, multiple teams, and complex business rules.`
    },
    {
      id: 'common-conventions',
      heading: 'Universal Conventions & Best Practices',
      content: `Regardless of which pattern you choose, certain conventions improve maintainability and developer experience across all Angular projects.`,
      list: [
        'File Naming: Use kebab-case for files (user-profile.component.ts), PascalCase for classes',
        'Component Organization: Keep component files together (component.ts, .html, .scss, .spec.ts)',
        'Barrel Files: Use index.ts exports sparingly for truly public APIs, not for hiding complexity',
        'Import Paths: Prefer relative imports for closely related files, absolute for shared resources',
        'Test Files: Co-locate spec files with their source files for discoverability',
        'Type Definitions: Place interfaces/types near where they\'re primarily used, not in a global dump',
        'Configuration: Keep environment-specific configs in environments/, build configs in angular.json',
        'Assets: Organize static assets by type (images/, fonts/, icons/) not by feature'
      ]
    },
    {
      id: 'evolution',
      heading: 'Evolving Your Structure Intentionally',
      content: `Successful projects start with simple structures and evolve intentionally as complexity grows. Recognize these signals that indicate it\'s time to reorganize:`,
      list: [
        'Multiple developers frequently modify the same folders simultaneously',
        'Import paths become excessively long and difficult to reason about',
        'Finding related files requires extensive searching or memorization',
        'Feature boundaries become blurred with components serving multiple domains',
        'Testing becomes difficult due to tight coupling between unrelated features',
        'New team members take more than a day to understand the basic structure'
      ],
      additionalExplanation: `Refactoring folder structure is a significant investment. When you do reorganize, do it all at once rather than piecemeal. Update imports systematically, communicate changes clearly to the team, and ensure your CI/CD pipeline handles the transition smoothly.`
    }
  ],
  codeExamples: [
    {
      title: 'Barrel File Example for Feature Module',
      description: 'Clean public API exposure for a feature module',
      language: 'typescript',
      code: `// features/dashboard/index.ts
// Export public API for the dashboard feature

// Components
export { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
export { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';

// Services
export { DashboardService } from './services/dashboard.service';

// Models
export type { DashboardStats, RecentActivity } from './models/dashboard.model';

// Routes
export { DASHBOARD_ROUTES } from './routes/dashboard.routes';`
    },
    {
      title: 'Smart vs Dumb Component Organization',
      language: 'typescript',
      code: `// features/users/components/user-list/ (Smart/Container Component)
// user-list.component.ts
@Component({
  standalone: true,
  imports: [UserCardComponent, CommonModule, ReactiveFormsModule],
  template: \`
    <div class="user-list">
      <app-user-card 
        *ngFor="let user of users$ | async" 
        [user]="user"
        (userSelected)="onUserSelected($event)">
      </app-user-card>
    </div>
  \`
})
export class UserListComponent {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) {}
}

// shared/components/ui/user-card/ (Dumb/Presentational Component)
// user-card.component.ts
@Component({
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="user-card" (click)="selectUser()">
      <img [src]="user.avatar" [alt]="user.name">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  \`
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() userSelected = new EventEmitter<User>();
  
  selectUser() {
    this.userSelected.emit(this.user);
  }
}`
    },
    {
      title: 'Domain-Driven Component with Clean Architecture',
      language: 'typescript',
      code: `// domains/identity/presentation/components/login-form/
// login-form.component.ts
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  template: \`
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <app-input 
        label="Email" 
        type="email"
        formControlName="email">
      </app-input>
      
      <app-input 
        label="Password" 
        type="password"
        formControlName="password">
      </app-input>
      
      <app-button 
        type="submit" 
        [loading]="isSubmitting$ | async">
        Sign In
      </app-button>
    </form>
  \`
})
export class LoginFormComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  
  isSubmitting$ = this.authFacade.isSubmitting$;
  
  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade
  ) {}
  
  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as LoginCredentials;
      this.authFacade.login(credentials);
    }
  }
}

// domains/identity/application/auth.facade.ts
// Abstraction layer between presentation and domain
@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private store = inject(Store);
  
  isSubmitting$ = this.store.select(AuthSelectors.selectIsSubmitting);
  
  login(credentials: LoginCredentials) {
    this.store.dispatch(AuthActions.login({ credentials }));
  }
}`
    },
    {
      title: 'Environment-Aware Service Configuration',
      language: 'typescript',
      code: `// shared/infrastructure/http/api.config.ts
import { isDevMode } from '@angular/core';

export const API_CONFIG = {
  // Base URLs - use environment variables or build-time replacements
  baseUrl: isDevMode() ? 'https://api.dev.example.com/v1' : 'https://api.example.com/v1',
  authUrl: isDevMode() ? 'https://auth.dev.example.com' : 'https://auth.example.com',

  // Endpoints
  endpoints: {
    users: '/users',
    products: '/products',
    orders: '/orders'
  },

  // Timeouts
  defaultTimeout: 30000,
  uploadTimeout: 120000,

  // Retry configuration
  retryAttempts: 3,
  retryDelay: 1000
};`
    }
  ],
  bestPractices: [
    'Start simple and evolve intentionally—don\'t over-engineer from day one',
    'Let your business domain dictate structure, not technical concerns',
    'Keep components small, focused, and co-located with their dependencies',
    'Use meaningful folder names that reveal intent (features/, domains/, shared/)',
    'Maintain consistent naming conventions across the entire codebase',
    'Organize for the developer experience, not just the build system',
    'Create clear boundaries between features to enable parallel development',
    'Document your architectural decisions and folder conventions',
    'Regularly refactor the structure as the application evolves',
    'Balance abstraction with practicality—not every component needs a facade',
    'Keep test files alongside their source files for discoverability',
    'Use barrel files judiciously—they should simplify, not obscure',
    'Consider the cognitive load on new team members when designing structure',
    'Align folder structure with your team\'s workflow and communication patterns',
    'Remember that the best structure is the one your team can maintain consistently'
  ]
};