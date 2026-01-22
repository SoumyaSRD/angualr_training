

// ============================================================================
// ANGULAR ARCHITECTURE: THE COMPLETE OVERVIEW
// ============================================================================

import { ISection, ITopicContent } from "../../../../../interfaces/topic";

export const ANGULAR_ARCHITECTURE_OVERVIEW: ITopicContent = {
  title: "Angular Architecture: A Complete Guide",
  tags: ["angular", "architecture", "components", "modules", "services", "dependency-injection"],

  paragraphs: [
    "Angular follows a component-based architecture with a clear separation of concerns. Think of it as building with LEGO blocks - each piece has a specific purpose and connects to others in predictable ways.",
    "The architecture is built around modules, components, services, and templates, all working together through Angular's powerful dependency injection system."
  ],

  keyPoints: [
    "Component-based architecture",
    "Hierarchical component tree",
    "Dependency injection system",
    "Unidirectional data flow",
    "Modular design with lazy loading",
    "TypeScript-first approach"
  ],

  sections: [
    {
      heading: "Core Building Blocks",
      content: "The essential pieces of every Angular application",
      list: [
        "Modules: Organize code into cohesive blocks",
        "Components: Control views and user interaction",
        "Templates: Define HTML views with Angular syntax",
        "Services: Handle business logic and data",
        "Directives: Extend HTML with custom behavior"
      ],
      additionalExplanation: "Each building block has a specific role, making the application easy to understand, maintain, and scale."
    },
    {
      heading: "Component Tree Structure",
      content: "How components organize into a hierarchy",
      list: [
        "Root component starts the application",
        "Parent components contain child components",
        "Data flows down via @Input bindings",
        "Events bubble up via @Output emitters",
        "Services provide shared functionality"
      ]
    },
    {
      heading: "Data Flow & Communication",
      content: "How different parts of the application communicate",
      list: [
        "@Input() - Parent to child data binding",
        "@Output() - Child to parent event emitting",
        "Services - Cross-component communication",
        "RxJS Observables - Reactive data streams",
        "Template Reference Variables - Local component references"
      ]
    }
  ],

  codeExamples: [
    {
      title: "Complete Architecture Example",
      language: "typescript",
      code: `// 1. MODULE - app.module.ts
@NgModule({
  declarations: [AppComponent, HeaderComponent, UserListComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [UserService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule {}

// 2. SERVICE - user.service.ts (Business Logic)
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://api.example.com/users';
  
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}

// 3. COMPONENT - user-list.component.ts (Presentation)
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() title = 'Users';  // Data from parent
  @Output() userSelected = new EventEmitter<User>();  // Events to parent
  
  users: User[] = [];
  isLoading = false;
  
  constructor(private userService: UserService) {}  // Dependency injection
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  private loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        this.isLoading = false;
      }
    });
  }
  
  selectUser(user: User): void {
    this.userSelected.emit(user);  // Emit event to parent
  }
}

// 4. TEMPLATE - user-list.component.html (View)
<div class="user-list">
  <h2>{{ title }}</h2>
  
  <div *ngIf="isLoading" class="loading">
    Loading users...
  </div>
  
  <div *ngIf="!isLoading && users.length === 0" class="empty">
    No users found.
  </div>
  
  <div *ngFor="let user of users" class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button (click)="selectUser(user)">Select</button>
  </div>
</div>`,
      description: "A complete example showing how modules, services, components, and templates work together."
    },
    {
      title: "Component Communication Patterns",
      language: "typescript",
      code: `// Parent Component
@Component({
  selector: 'app-dashboard',
  template: \`
    <h1>Dashboard</h1>
    
    <!-- Parent to child: Pass data via @Input -->
    <app-user-stats 
      [totalUsers]="totalUsers"
      [activeUsers]="activeUsers">
    </app-user-stats>
    
    <!-- Child to parent: Handle events via @Output -->
    <app-user-list 
      (userSelected)="onUserSelected($event)">
    </app-user-list>
    
    <!-- Service communication -->
    <app-notifications></app-notifications>
  \`
})
export class DashboardComponent {
  totalUsers = 100;
  activeUsers = 85;
  
  onUserSelected(user: User): void {
    console.log('Selected user:', user);
    // Handle the selection
  }
}

// Child Component 1 - User Stats
@Component({
  selector: 'app-user-stats',
  template: \`
    <div class="stats">
      <div>Total: {{ totalUsers }}</div>
      <div>Active: {{ activeUsers }}</div>
      <div>Percentage: {{ activeUsers / totalUsers | percent }}</div>
    </div>
  \`
})
export class UserStatsComponent {
  @Input() totalUsers!: number;
  @Input() activeUsers!: number;
}

// Child Component 2 - User List
@Component({
  selector: 'app-user-list',
  template: \`
    <div *ngFor="let user of users">
      <span>{{ user.name }}</span>
      <button (click)="selectUser(user)">Select</button>
    </div>
  \`
})
export class UserListComponent {
  users: User[] = [...];
  @Output() userSelected = new EventEmitter<User>();
  
  selectUser(user: User): void {
    this.userSelected.emit(user);
  }
}

// Service for cross-component communication
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = new BehaviorSubject<string[]>([]);
  notifications$ = this.notifications.asObservable();
  
  addNotification(message: string): void {
    const current = this.notifications.value;
    this.notifications.next([...current, message]);
  }
}

// Component using the service
@Component({
  selector: 'app-notifications',
  template: \`
    <div *ngFor="let message of notifications$ | async">
      {{ message }}
    </div>
  \`
})
export class NotificationsComponent {
  notifications$ = this.notificationService.notifications$;
  
  constructor(private notificationService: NotificationService) {}
}`,
      description: "Different patterns for component communication: @Input/@Output, services, and RxJS observables."
    }
  ],

  bestPractices: [
    "Keep components focused and single-purpose (Single Responsibility Principle)",
    "Use services for business logic and data operations",
    "Prefer @Input/@Output for parent-child communication",
    "Use services with RxJS for cross-component communication",
    "Organize code by feature, not by type",
    "Implement lazy loading for feature modules",
    "Use TypeScript interfaces for type safety",
    "Follow the Angular style guide for consistency",
    "Write unit tests for services and components",
    "Use Angular CLI for project generation and maintenance"
  ]
};

// ============================================================================
// ARCHITECTURE VISUALIZATION
// ============================================================================

export const ARCHITECTURE_VISUALIZATION: ISection[] = [
  {
    heading: "Application Structure",
    content: "Visual representation of Angular architecture",
    list: [
      "📁 app/",
      "  ├── 📁 core/           (Singleton services, guards)",
      "  ├── 📁 shared/         (Components, pipes, directives)",
      "  ├── 📁 features/       (Feature modules)",
      "  │   ├── 📁 users/",
      "  │   ├── 📁 dashboard/",
      "  │   └── 📁 settings/",
      "  ├── 📄 app.module.ts   (Root module)",
      "  └── 📄 app.component.ts (Root component)"
    ],
    additionalExplanation: "This structure organizes code by responsibility, making it easier to find and maintain."
  },
  {
    heading: "Data Flow Diagram",
    content: "How data moves through the application",
    list: [
      "API Server → HTTP Service → Observable",
      "Observable → Service Method → Component",
      "Component → @Input() → Child Component",
      "Child Component → @Output() → Parent Component",
      "Component → Template → User View",
      "User Action → Event Binding → Component Method"
    ]
  }
];

// ============================================================================
// COMMON PATTERNS & PATTERNS TO AVOID
// ============================================================================

export const ARCHITECTURE_PATTERNS: ITopicContent = {
  title: "Architectural Patterns & Anti-Patterns",

  sections: [
    {
      heading: "Recommended Patterns",
      content: "Patterns that lead to maintainable applications",
      list: [
        "Smart/Dumb Components: Separate logic from presentation",
        "Feature Modules: Organize by business capability",
        "Lazy Loading: Load modules on-demand",
        "Service Layers: Centralize business logic",
        "Reactive State: Use RxJS for state management"
      ]
    },
    {
      heading: "Patterns to Avoid",
      content: "Common mistakes in Angular architecture",
      list: [
        "God Components: Components that do too much",
        "Tight Coupling: Direct component dependencies",
        "Logic in Templates: Complex expressions in HTML",
        "Service as Data Store: Using services like global variables",
        "Over-engineering: Adding complexity prematurely"
      ]
    }
  ],

  codeExamples: [
    {
      title: "Good vs Bad Practices",
      language: "typescript",
      code: `// ❌ BAD: Logic in template
@Component({
  template: \`
    <div *ngIf="users && users.length > 0 && !isLoading">
      {{ users.filter(u => u.active).map(u => u.name).join(', ') }}
    </div>
  \`
})
export class BadComponent {}

// ✅ GOOD: Logic in component
@Component({
  template: \`
    <div *ngIf="showActiveUsers">
      {{ activeUserNames }}
    </div>
  \`
})
export class GoodComponent {
  users: User[] = [];
  isLoading = false;
  
  get showActiveUsers(): boolean {
    return this.users.length > 0 && !this.isLoading;
  }
  
  get activeUserNames(): string {
    return this.users
      .filter(user => user.active)
      .map(user => user.name)
      .join(', ');
  }
}

// ❌ BAD: Tight coupling
@Component({
  template: '<app-user-details></app-user-details>'
})
export class ParentComponent {
  // Directly manipulating child component
  @ViewChild(UserDetailsComponent) userDetails!: UserDetailsComponent;
  
  ngOnInit() {
    this.userDetails.loadData();  // Direct method call
  }
}

// ✅ GOOD: Loose coupling
@Component({
  template: \`
    <app-user-details 
      [userId]="selectedUserId"
      (dataLoaded)="onDataLoaded($event)">
    </app-user-details>
  \`
})
export class ParentComponent {
  selectedUserId = '123';
  
  onDataLoaded(data: any): void {
    // Handle event from child
  }
}`,
      description: "Examples of good architectural patterns vs common anti-patterns."
    }
  ]
};