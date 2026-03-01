import{b as p}from"./chunk-TCLAS7TI.js";import{h as g}from"./chunk-THTJ5YSF.js";import{l as u}from"./chunk-IDUW3PRR.js";import{Cb as e,Oa as s,eb as c,fb as n,gb as t,hb as o}from"./chunk-2OVPXQV3.js";var h=(()=>{class a{static{this.\u0275fac=function(r){return new(r||a)}}static{this.\u0275cmp=s({type:a,selectors:[["app-fundamentals"]],decls:1,vars:0,template:function(r,i){r&1&&o(0,"router-outlet")},dependencies:[g,u],encapsulation:2})}}return a})();var f={title:"Angular vs React vs Vue: The Framework Kitchen Showdown",tags:["frontend","frameworks","comparison","javascript","typescript"],paragraphs:["Imagine building web applications is like running a restaurant kitchen. Angular is a fully-equipped professional kitchen with every appliance labeled and procedures manualized. React is a chef's table where you bring your own tools but have an expert chef guiding your technique. Vue is the modern food truck with a perfectly curated set of tools that just work together intuitively.","Each framework represents a different philosophy in how we structure, build, and maintain our digital 'meals' (applications). Let's explore how they differ in their approaches to common web development challenges."],keyPoints:["Angular: The enterprise-grade kitchen with built-in everything","React: The flexible chef's toolkit - bring what you need","Vue: The progressive framework that scales with your needs","Different mental models for solving the same problems","Ecosystem maturity vs developer experience trade-offs"],sections:[{heading:"Architecture: Kitchen Layout & Organization",content:"How each framework structures your application's 'kitchen'",list:["Angular: Pre-designed kitchen blueprint (opinionated architecture)","React: Open floor plan - you design the kitchen layout (unopinionated)","Vue: Modular kitchen units that snap together (progressive framework)"],additionalExplanation:"Angular tells you where everything goes, React lets you decide, and Vue gives you sensible defaults that you can override."},{heading:"Learning Curve: From Line Cook to Executive Chef",content:"The journey from beginner to expert in each framework",list:["Angular: Steep climb but structured path (TypeScript, RxJS, decorators)","React: Gentle slope but wide plateau (JSX, hooks, ecosystem choices)","Vue: Smooth ascent with guardrails (template syntax, single-file components)"],additionalExplanation:"Vue is often praised for its gentle learning curve, while Angular's comprehensive nature requires more upfront learning but provides more guidance."},{heading:"State Management: Inventory Control Systems",content:"How each framework handles application state",list:["Angular: Centralized pantry with RxJS observables","React: Component fridges with optional Redux freezer","Vue: Reactive pantry that updates everything automatically"]}],codeExamples:[{title:"Creating a Component: Different Cooking Styles",language:"typescript",code:`// ANGULAR - The Structured Recipe
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input() user: User;
  @Output() saved = new EventEmitter<User>();
  
  constructor(private userService: UserService) {}
}

// REACT - The Functional Recipe
const UserProfile = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleSave = () => {
    onSave(user);
  };
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      {isEditing ? <EditForm user={user} /> : <ProfileView user={user} />}
    </div>
  );
};

// VUE - The Declarative Recipe
<template>
  <div class="user-profile">
    <h2>{{ user.name }}</h2>
    <button @click="isEditing = !isEditing">
      {{ isEditing ? 'Cancel' : 'Edit' }}
    </button>
    <component :is="currentComponent" :user="user" @save="handleSave" />
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return { isEditing: false };
  },
  computed: {
    currentComponent() {
      return this.isEditing ? EditForm : ProfileView;
    }
  },
  methods: {
    handleSave(updatedUser) {
      this.$emit('save', updatedUser);
    }
  }
};
<\/script>`,description:"Three different approaches to the same problem: Angular uses decorators and dependency injection, React uses functions and hooks, Vue uses single-file components with clear separation of concerns."},{title:"Data Binding: Communicating Between Kitchen Stations",language:"typescript",code:`// ANGULAR - Two-way binding with [(ngModel)]
@Component({
  template: \`
    <input [(ngModel)]="username" (ngModelChange)="onUsernameChange()">
    <p>Hello, {{ username }}!</p>
  \`
})
export class GreetingComponent {
  username = 'Guest';
  onUsernameChange() {
    console.log('Username changed to:', this.username);
  }
}

// REACT - One-way data flow
const Greeting = () => {
  const [username, setUsername] = useState('Guest');
  
  const handleChange = (event) => {
    setUsername(event.target.value);
    console.log('Username changed to:', event.target.value);
  };
  
  return (
    <>
      <input value={username} onChange={handleChange} />
      <p>Hello, {username}!</p>
    </>
  );
};

// VUE - Reactive two-way binding with v-model
<template>
  <div>
    <input v-model="username" @input="onUsernameChange">
    <p>Hello, {{ username }}!</p>
  </div>
</template>

<script>
export default {
  data() {
    return { username: 'Guest' };
  },
  methods: {
    onUsernameChange() {
      console.log('Username changed to:', this.username);
    }
  }
};
<\/script>`,description:"Different approaches to synchronizing data between the view and the component logic."},{title:"Dependency Injection: Kitchen Supply Chain",language:"typescript",code:`// ANGULAR - Built-in dependency injection
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  
  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
}

@Component({
  selector: 'app-user-list',
  template: '<div *ngFor="let user of users">{{user.name}}</div>'
})
export class UserListComponent {
  users: User[] = [];
  
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}

// REACT - Props drilling or Context
const UserServiceContext = createContext();

const UserServiceProvider = ({ children }) => {
  const getUsers = async () => {
    const response = await fetch('/api/users');
    return response.json();
  };
  
  return (
    <UserServiceContext.Provider value={{ getUsers }}>
      {children}
    </UserServiceContext.Provider>
  );
};

const UserList = () => {
  const { getUsers } = useContext(UserServiceContext);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getUsers().then(setUsers);
  }, [getUsers]);
  
  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};

// VUE - Provide/Inject pattern
// In parent component
export default {
  provide() {
    return {
      getUserService: () => ({
        getUsers: () => fetch('/api/users').then(r => r.json())
      })
    };
  }
};

// In child component
export default {
  inject: ['getUserService'],
  data() {
    return { users: [] };
  },
  async created() {
    const service = this.getUserService();
    this.users = await service.getUsers();
  }
};`,description:"Different approaches to managing dependencies and sharing services across components."}],bestPractices:["Choose Angular for: Large enterprise applications, teams needing structure, projects requiring comprehensive tooling out-of-the-box","Choose React for: Maximum flexibility, teams that want to choose their own tools, projects where UI interactivity is the primary focus","Choose Vue for: Rapid prototyping, smaller to medium-sized projects, teams valuing developer experience and gradual adoption","Consider your team's existing skills and preferences - the best framework is the one your team can use effectively","Remember that all three frameworks can solve the same problems - they just approach them differently","Don't let 'framework wars' distract you from building great user experiences"]};var v=(()=>{class a{constructor(){this.content=f}static{this.\u0275fac=function(r){return new(r||a)}}static{this.\u0275cmp=s({type:a,selectors:[["app-angular-vs-react-vue"]],decls:67,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"]],template:function(r,i){r&1&&(n(0,"app-topic-template",0)(1,"p"),e(2," Angular is a comprehensive, TypeScript-based web application framework developed and maintained by Google. Born from the lessons learned with AngularJS, Angular represents a complete reimagining of how to build modern web applications. It provides a robust, scalable solution for crafting dynamic single-page applications (SPAs) that prioritize developer productivity, exceptional performance, and long-term code maintainability. "),t(),n(3,"p"),e(4,' What sets Angular apart is its opinionated, full-stack approach to frontend development. Unlike minimal libraries that solve one problem, Angular is an enterprise-grade platform delivering an integrated ecosystem: component architecture, powerful dependency injection, sophisticated routing, reactive forms, HTTP client with interceptors, comprehensive testing utilities, internationalization support, and state management patterns. This unified vision eliminates the "framework fatigue" of assembling disparate tools and ensures consistency across teams, projects, and years of development. '),t(),n(5,"h3"),e(6,"Core Features That Define Angular"),t(),n(7,"ul")(8,"li")(9,"strong"),e(10,"Component-Based Architecture:"),t(),e(11," Build your application as a tree of encapsulated, reusable components with clear data flow. Each component combines template, logic, and styles into cohesive, self-contained units that compose beautifully into complex interfaces. "),t(),n(12,"li")(13,"strong"),e(14,"TypeScript First:"),t(),e(15," Harness the power of static typing for superior IDE intelligence, compile-time error detection, and fearless refactoring. TypeScript transforms JavaScript into a language suitable for large-scale application development. "),t(),n(16,"li")(17,"strong"),e(18,"Hierarchical Dependency Injection:"),t(),e(19," A sophisticated DI system that manages service lifecycles, promotes loose coupling, and makes testing trivial. Define dependencies once and let Angular handle instantiation, scope, and disposal. "),t(),n(20,"li")(21,"strong"),e(22,"Reactive Programming with RxJS:"),t(),e(23," First-class support for observables and reactive streams enables elegant handling of asynchronous operations, complex event handling, and real-time data flows with operators like map, filter, debounce, and switchMap. "),t(),n(24,"li")(25,"strong"),e(26,"Intelligent Data Binding:"),t(),e(27," Two-way data binding with "),n(28,"code"),e(29,"[(ngModel)]"),t(),e(30," synchronizes model and view automatically, while one-way binding and change detection strategies give you fine-grained control over performance. "),t(),n(31,"li")(32,"strong"),e(33,"Angular CLI:"),t(),e(34," A world-class command-line interface that scaffolds projects, generates components and services, manages dependencies, runs development servers with live reload, and optimizes production builds with tree-shaking and lazy loading. "),t(),n(35,"li")(36,"strong"),e(37,"Sophisticated Routing:"),t(),e(38," Enterprise-ready routing with nested routes, route guards for authorization, lazy loading for code splitting, preloading strategies, and resolver functions for data prefetching. "),t(),n(39,"li")(40,"strong"),e(41,"Comprehensive Forms:"),t(),e(42," Choose between template-driven forms for simplicity or reactive forms for complex validation logic. Built-in validators, custom validation, async validation, and dynamic form generation come standard. "),t(),n(43,"li")(44,"strong"),e(45,"Progressive Web App Support:"),t(),e(46," Built-in service worker integration, offline capabilities, and app shell architecture transform your Angular apps into installable, resilient progressive web applications. "),t(),n(47,"li")(48,"strong"),e(49,"Angular Signals:"),t(),e(50," A modern reactivity system providing fine-grained reactive state management with automatic dependency tracking and optimal re-rendering performance. "),t(),n(51,"li")(52,"strong"),e(53,"Server-Side Rendering:"),t(),e(54," Angular Universal enables SEO optimization and faster initial page loads by rendering your application on the server before hydrating it on the client. "),t()(),n(55,"h3"),e(56,"The Angular Philosophy: Opinionated Excellence"),t(),n(57,"p"),e(58,` Angular embraces a "batteries-included" philosophy that stands in sharp contrast to the fragmented JavaScript ecosystem. Rather than forcing developers to navigate a maze of competing libraries for routing, state management, forms, and HTTP\u2014Angular provides official, battle-tested solutions for every common need. This opinionated approach isn't about limiting choice; it's about eliminating decision paralysis and ensuring your application follows proven patterns that scale. `),t(),n(59,"p"),e(60," The framework champions testability as a first-class concern. Dependency injection makes unit testing natural, TestBed provides powerful component testing utilities, and the entire architecture encourages separation of concerns. Angular applications are designed to be maintained for years, not months\u2014with strong typing catching errors before they reach production, consistent patterns making onboarding seamless, and comprehensive tooling supporting large teams working on complex domains. "),t(),n(61,"h3"),e(62,"When Angular Shines"),t(),n(63,"p"),e(64," Angular excels in enterprise environments where multiple teams collaborate on large-scale applications with demanding requirements. If you're building complex admin dashboards, data-intensive business applications, or systems requiring strict consistency and governance\u2014Angular's structure becomes an asset, not a constraint. The learning curve pays dividends in reduced bugs, faster onboarding, and sustainable long-term development. "),t(),n(65,"p"),e(66," From Fortune 500 companies to innovative startups, Angular powers applications that demand reliability, performance, and maintainability at scale. With Google's continued investment, a vibrant community, and constant evolution incorporating modern web standards like signals and standalone components\u2014Angular remains a compelling choice for serious web development. "),t()()),r&2&&c("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints)},dependencies:[p],encapsulation:2})}}return a})();var b={title:"Angular Architecture: A Complete Guide",tags:["angular","architecture","components","modules","services","dependency-injection"],paragraphs:["Angular follows a component-based architecture with a clear separation of concerns. Think of it as building with LEGO blocks - each piece has a specific purpose and connects to others in predictable ways.","The architecture is built around modules, components, services, and templates, all working together through Angular's powerful dependency injection system."],keyPoints:["Component-based architecture","Hierarchical component tree","Dependency injection system","Unidirectional data flow","Modular design with lazy loading","TypeScript-first approach"],sections:[{heading:"Core Building Blocks",content:"The essential pieces of every Angular application",list:["Modules: Organize code into cohesive blocks","Components: Control views and user interaction","Templates: Define HTML views with Angular syntax","Services: Handle business logic and data","Directives: Extend HTML with custom behavior"],additionalExplanation:"Each building block has a specific role, making the application easy to understand, maintain, and scale."},{heading:"Component Tree Structure",content:"How components organize into a hierarchy",list:["Root component starts the application","Parent components contain child components","Data flows down via @Input bindings","Events bubble up via @Output emitters","Services provide shared functionality"]},{heading:"Data Flow & Communication",content:"How different parts of the application communicate",list:["@Input() - Parent to child data binding","@Output() - Child to parent event emitting","Services - Cross-component communication","RxJS Observables - Reactive data streams","Template Reference Variables - Local component references"]}],codeExamples:[{title:"Complete Architecture Example",language:"typescript",code:`// 1. MODULE - app.module.ts
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
</div>`,description:"A complete example showing how modules, services, components, and templates work together."},{title:"Component Communication Patterns",language:"typescript",code:`// Parent Component
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
export class Dashboard {
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
}`,description:"Different patterns for component communication: @Input/@Output, services, and RxJS observables."}],bestPractices:["Keep components focused and single-purpose (Single Responsibility Principle)","Use services for business logic and data operations","Prefer @Input/@Output for parent-child communication","Use services with RxJS for cross-component communication","Organize code by feature, not by type","Implement lazy loading for feature modules","Use TypeScript interfaces for type safety","Follow the Angular style guide for consistency","Write unit tests for services and components","Use Angular CLI for project generation and maintenance"]};var y=(()=>{class a{constructor(){this.content=b}static{this.\u0275fac=function(r){return new(r||a)}}static{this.\u0275cmp=s({type:a,selectors:[["app-architecture-overview"]],decls:49,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"]],template:function(r,i){r&1&&(n(0,"app-topic-template",0)(1,"p"),e(2," Angular is a framework for building web applications using components. Think of it like building with LEGO blocks \u2014 each piece connects to others to create something bigger. "),t(),n(3,"h3"),e(4,"The Main Pieces"),t(),n(5,"h4"),e(6,"1. Components"),t(),n(7,"p"),e(8,"Building blocks that control parts of your screen."),t(),n(9,"h4"),e(10,"2. Modules"),t(),n(11,"p"),e(12,"Containers that organize related pieces together."),t(),n(13,"h4"),e(14,"3. Services"),t(),n(15,"p"),e(16,"Shared helpers that handle data and business logic."),t(),n(17,"h4"),e(18,"4. Templates"),t(),n(19,"p"),e(20,"HTML files that define how components look."),t(),n(21,"h3"),e(22,"How It Works"),t(),n(23,"h4"),e(24,"Component Tree"),t(),n(25,"h4"),e(26,"Data Flow"),t(),n(27,"ul")(28,"li"),e(29,"\u{1F4E5} "),n(30,"strong"),e(31,"Parent \u2192 Child:"),t(),e(32," Using "),n(33,"code"),e(34,"@Input()"),t()(),n(35,"li"),e(36,"\u{1F4E4} "),n(37,"strong"),e(38,"Child \u2192 Parent:"),t(),e(39," Using "),n(40,"code"),e(41,"@Output()"),t()(),n(42,"li"),e(43,"\u{1F504} "),n(44,"strong"),e(45,"Anywhere:"),t(),e(46," Using Services"),t()(),n(47,"h3"),e(48,"Simple Example"),t()()),r&2&&c("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints)},dependencies:[p],encapsulation:2})}}return a})();var x={title:"Angular CLI: Your Development Assistant",tags:["angular","cli","command-line","tools","development"],paragraphs:["Angular CLI is a command-line tool that helps you create, develop, and maintain Angular applications. Think of it as a Swiss Army knife for Angular developers.","It automates common tasks like creating components, building projects, and running tests - saving you time and ensuring consistency."],keyPoints:["Command-line interface for Angular","Generates files and structure","Builds and serves applications","Runs tests and linting","Manages dependencies and updates"],sections:[{heading:"What Angular CLI Does",content:"The main jobs of Angular CLI",list:["\u{1F680} Creates new Angular projects","\u{1F527} Generates components, services, modules","\u{1F3D7}\uFE0F Builds for development and production","\u{1F310} Serves apps with live reload","\u2705 Runs tests and linting","\u{1F4E6} Adds and removes packages"]},{heading:"Why Use Angular CLI",content:"Benefits of using the CLI",list:["Saves time on repetitive tasks","Ensures consistent project structure","Follows Angular best practices","Reduces configuration headaches","Integrates with other tools"]}],codeExamples:[{title:"Basic Installation & Setup",language:"bash",code:`# 1. Install Angular CLI globally
npm install -g @angular/cli

# 2. Check installation
ng version

# 3. Create a new Angular project
ng new my-app

# Answer questions:
# \u2713 Add Angular routing? Yes
# \u2713 Which stylesheet format? CSS

# 4. Navigate to project
cd my-app

# 5. Run the application
ng serve --open`,description:"Complete setup from zero to running app"},{title:"Common Commands",language:"bash",code:`# Project Management
ng new app-name         # Create new app
ng serve               # Start dev server
ng build               # Build for production
ng test                # Run tests
ng lint                # Check code quality

# Generating Files
ng generate component user-list
ng generate service auth
ng generate module admin
ng generate pipe format-date

# Short versions
ng g c user-list      # Component
ng g s auth           # Service
ng g m admin          # Module
ng g p format-date    # Pipe

# Updating & Managing
ng update             # Update packages
ng add @angular/pwa   # Add features`,description:"Essential commands for daily development"}],bestPractices:["Use ng new for consistent project structure","Generate files with CLI instead of creating manually","Use --dry-run to preview changes before applying","Regularly update CLI with npm update -g @angular/cli","Use ng lint before committing code","Add flags like --skip-tests for faster prototyping","Use --style flag to choose CSS preprocessor"]};var S=(()=>{class a{constructor(){this.content=x}ngOnInit(){}static{this.\u0275fac=function(r){return new(r||a)}}static{this.\u0275cmp=s({type:a,selectors:[["app-angular-cli-installation"]],decls:173,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"]],template:function(r,i){r&1&&(n(0,"app-topic-template",0)(1,"p"),e(2," The Angular CLI (Command Line Interface) is your best friend when building Angular applications. It handles the boring setup work so you can focus on writing code. "),t(),n(3,"h3"),e(4,"\u{1F4E6} What You Get"),t(),n(5,"ul")(6,"li")(7,"strong"),e(8,"Project Generator:"),t(),e(9," Creates apps with proper structure "),t(),n(10,"li")(11,"strong"),e(12,"File Creator:"),t(),e(13," Generates components, services, and more "),t(),n(14,"li")(15,"strong"),e(16,"Development Server:"),t(),e(17," Live reload as you code"),t(),n(18,"li")(19,"strong"),e(20,"Build Tool:"),t(),e(21," Optimizes for production"),t(),n(22,"li")(23,"strong"),e(24,"Testing Setup:"),t(),e(25," Ready-to-use testing framework"),t()(),n(26,"h3"),e(27,"\u{1F680} Getting Started"),t(),n(28,"h4"),e(29,"Step 1: Install"),t(),n(30,"pre")(31,"code"),e(32,"npm install -g @angular/cli"),t()(),n(33,"h4"),e(34,"Step 2: Check"),t(),n(35,"pre")(36,"code"),e(37,"ng version"),t()(),n(38,"h4"),e(39,"Step 3: Create"),t(),n(40,"pre")(41,"code"),e(42,"ng new my-app"),t()(),n(43,"h4"),e(44,"Step 4: Run"),t(),n(45,"pre")(46,"code"),e(47,`cd my-app
ng serve --open`),t()(),n(48,"h3"),e(49,"\u{1F3AF} Most Used Commands"),t(),n(50,"table")(51,"tr")(52,"th"),e(53,"Command"),t(),n(54,"th"),e(55,"What It Does"),t(),n(56,"th"),e(57,"Short Version"),t()(),n(58,"tr")(59,"td")(60,"code"),e(61,"ng serve"),t()(),n(62,"td"),e(63,"Start development server"),t(),n(64,"td"),e(65,"-"),t()(),n(66,"tr")(67,"td")(68,"code"),e(69,"ng generate component"),t()(),n(70,"td"),e(71,"Create new component"),t(),n(72,"td")(73,"code"),e(74,"ng g c"),t()()(),n(75,"tr")(76,"td")(77,"code"),e(78,"ng generate service"),t()(),n(79,"td"),e(80,"Create new service"),t(),n(81,"td")(82,"code"),e(83,"ng g s"),t()()(),n(84,"tr")(85,"td")(86,"code"),e(87,"ng build"),t()(),n(88,"td"),e(89,"Build for production"),t(),n(90,"td"),e(91,"-"),t()(),n(92,"tr")(93,"td")(94,"code"),e(95,"ng test"),t()(),n(96,"td"),e(97,"Run tests"),t(),n(98,"td"),e(99,"-"),t()()(),n(100,"h3"),e(101,"\u{1F4A1} Tips & Tricks"),t(),n(102,"ul")(103,"li"),e(104,"Use "),n(105,"code"),e(106,"--dry-run"),t(),e(107," to see what will be created"),t(),n(108,"li"),e(109,"Use "),n(110,"code"),e(111,"--skip-tests"),t(),e(112," to skip test files"),t(),n(113,"li"),e(114,"Update regularly: "),n(115,"code"),e(116,"npm update -g @angular/cli"),t()(),n(117,"li"),e(118,"Use "),n(119,"code"),e(120,"ng add"),t(),e(121," to add libraries like PWA or Material"),t(),n(122,"li"),e(123,"Run "),n(124,"code"),e(125,"ng lint"),t(),e(126," before committing code"),t()(),n(127,"h3"),e(128,"\u26A1 Quick Examples"),t(),n(129,"h4"),e(130,"Create a component with routing"),t(),n(131,"pre")(132,"code"),e(133,"ng g c dashboard --module=app"),t()(),n(134,"h4"),e(135,"Add Angular Material"),t(),n(136,"pre")(137,"code"),e(138,"ng add @angular/material"),t()(),n(139,"h4"),e(140,"Build for production"),t(),n(141,"pre")(142,"code"),e(143,"ng build --prod"),t()(),n(144,"h3"),e(145,"\u{1F3A8} Project Structure Created by CLI"),t(),n(146,"pre")(147,"code"),e(148,`
my-app/
\u251C\u2500\u2500 src/                    # Source code
\u2502   \u251C\u2500\u2500 app/               # Your application
\u2502   \u2502   \u251C\u2500\u2500 app.component.ts
\u2502   \u2502   \u251C\u2500\u2500 app.module.ts
\u2502   \u2502   \u2514\u2500\u2500 ...
\u2502   \u251C\u2500\u2500 assets/            # Images, fonts
\u2502   \u2514\u2500\u2500 index.html         # Main HTML file
\u251C\u2500\u2500 angular.json          # Configuration
\u251C\u2500\u2500 package.json          # Dependencies
\u2514\u2500\u2500 tsconfig.json         # TypeScript config
  `),t()(),n(149,"h3"),e(150,"\u2753 Common Questions"),t(),n(151,"h4"),e(152,"Q: Do I need to install Angular CLI?"),t(),n(153,"p")(154,"strong"),e(155,"A: Yes!"),t(),e(156," It's the standard way to work with Angular."),t(),n(157,"h4"),e(158,"Q: Can I use it with existing projects?"),t(),n(159,"p")(160,"strong"),e(161,"A: Yes!"),t(),e(162," Just run CLI commands inside your project folder. "),t(),n(163,"h4"),e(164,"Q: Is it only for beginners?"),t(),n(165,"p")(166,"strong"),e(167,"A: No!"),t(),e(168," Even experienced developers use it daily."),t(),n(169,"p")(170,"strong"),e(171,"Remember:"),t(),e(172," The Angular CLI follows best practices automatically. It ensures your projects are set up correctly from day one. "),t()()),r&2&&c("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints)},dependencies:[p],encapsulation:2})}}return a})();var w={title:"Introduction to Angular",tags:["Angular","Framework","TypeScript","Standalone","Components","Modern Web"],paragraphs:["Angular is a full-featured, open-source front-end framework developed and maintained by Google. First released in 2010 as AngularJS and completely rewritten in 2016 as Angular (version 2+), it has evolved into one of the most powerful platforms for building scalable, enterprise-grade single-page applications (SPAs), progressive web apps (PWAs), and even desktop/mobile apps via Electron or NativeScript.",'Unlike lightweight libraries like React or Vue, Angular is a complete framework that provides everything you need out of the box: a component-based architecture, dependency injection, reactive templating, powerful routing, state management tools, forms handling, HTTP client, internationalization, testing utilities, and a robust CLI for scaffolding and builds. This "batteries-included" approach reduces decision fatigue and ensures consistency across large teams.',"Since Angular 14 (2022), the framework has shifted toward standalone components as the default and recommended pattern. Standalone components are self-contained\u2014no need for NgModules\u2014making code simpler, more tree-shakable, and easier to lazy-load. By Angular 17+ (current as of 2026), most new projects use standalone APIs exclusively, with NgModules retained only for backward compatibility.","Angular is built entirely on TypeScript, leveraging its static typing for better developer experience, early error detection, and superior IDE support. Combined with decorators, RxJS observables, and Ahead-of-Time (AOT) compilation, Angular delivers high performance, excellent maintainability, and long-term support (Google commits to LTS for 18 months per major version)."],sections:[{heading:"Why Choose Angular?",content:"Angular stands out for large-scale applications due to its opinionated structure and comprehensive tooling:",list:["<strong>Full Framework:</strong> Built-in solutions for routing, forms, HTTP, animations, and more\u2014no need to choose third-party libraries","<strong>Dependency Injection:</strong> Powerful hierarchical DI system for services and testability","<strong>Reactive Programming:</strong> First-class RxJS support for handling asynchronous data streams","<strong>CLI Powerhouse:</strong> ng generate, build, test, deploy\u2014all streamlined","<strong>Enterprise Ready:</strong> Excellent for complex apps with authentication, state management, accessibility, and internationalization","<strong>Strong Typing:</strong> TypeScript ensures robust code in large teams","<strong>Performance:</strong> Ivy renderer, AOT compilation, lazy loading, and change detection optimization"]},{heading:"Standalone Components: The Modern Default",content:"Standalone components (introduced in Angular 14) eliminate NgModules for most use cases. They declare their own dependencies via the imports array:",list:["<strong>Simpler:</strong> No separate module files","<strong>Tree-shakable:</strong> Better bundle sizes","<strong>Lazy-loadable:</strong> Easy route-level lazy loading","<strong>Flexible:</strong> Can still import NgModules when needed (e.g., legacy libraries)"],additionalExplanation:"Most Angular Material modules, forms, and common modules are now standalone-compatible."},{heading:"Bootstrapping an Angular Application",content:"Modern Angular apps bootstrap directly with bootstrapApplication() instead of NgModule-based main.ts:",list:["<strong>Providers:</strong> Configure router, HTTP client, animations, interceptors globally","<strong>Environment:</strong> Inject environment variables or feature flags","<strong>Error Handling:</strong> Centralized error catching"]},{heading:"Key Building Blocks",content:"Angular applications are composed of:",list:["<strong>Components:</strong> UI building blocks with templates and logic","<strong>Services:</strong> Singleton or scoped providers for business logic and data","<strong>Pipes:</strong> Transform displayed values (e.g., date, currency)","<strong>Directives:</strong> Custom behavior (structural like *ngIf, attribute like ngClass)","<strong>Routing:</strong> Deep linking and lazy loading with Angular Router","<strong>Forms:</strong> Template-driven or reactive forms with validation"]},{heading:"NgModule vs Standalone: Migration Path",content:"While NgModules are still supported, standalone is the future:",list:["<strong>Legacy (NgModule):</strong> Declarations, imports, exports, providers in module files","<strong>Modern (Standalone):</strong> Everything in component imports array","<strong>Migration:</strong> Use ng generate @angular/core:standalone to convert gradually"]}],codeExamples:[{title:"Basic Standalone Component",language:"typescript",description:"A simple counter component demonstrating two-way binding and event handling",code:`import { Component } from '@angular/core';
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
}`},{title:"Standalone Component with Inputs/Outputs",language:"typescript",description:"Reusable component with @Input() and @Output() for parent-child communication",code:`import { Component, Input, Output, EventEmitter } from '@angular/core';
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
}`},{title:"Bootstrapping a Modern Angular App (main.ts)",language:"typescript",description:"Complete bootstrapping with routing, HTTP, animations, and interceptors",code:`import { bootstrapApplication } from '@angular/platform-browser';
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
}).catch(err => console.error(err));`},{title:"Simple Routing with Lazy Loading",language:"typescript",description:"app.routes.ts showing standalone routes with lazy loading",code:`import { Routes } from '@angular/router';

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
];`},{title:"Injectable Service (Standalone Compatible)",language:"typescript",description:"A simple data service using HttpClient",code:`import { Injectable } from '@angular/core';
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
}`},{title:"NgModule vs Standalone Comparison",language:"typescript",description:"Side-by-side view of old vs new approach",code:`// Standalone (Modern - Recommended)
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
export class ProductModule { }`}],keyPoints:["Angular is a complete, opinionated framework with built-in solutions","TypeScript-first for type safety and excellent tooling","Standalone components are the default since Angular 14+","No NgModules required for most new projects","Powerful CLI for generation, building, and testing","Hierarchical dependency injection system","RxJS integration for reactive programming","Excellent for large-scale, enterprise applications","Long-term support and regular updates from Google","Strong focus on performance, accessibility, and testing"],bestPractices:["Use standalone components exclusively in new projects","Leverage the Angular CLI for scaffolding (ng generate component/service/etc)","Follow the official style guide for consistency","Use reactive forms over template-driven for complex scenarios","Implement OnPush change detection for performance","Lazy-load routes to improve initial load time",'Use providedIn: "root" for singleton services',"Write unit tests with Jasmine/Karma and e2e tests with Cypress","Structure projects with feature modules or domain-based folders","Keep components small and focused on single responsibility"]};var m=(()=>{class a{constructor(){this.angularIntroduction=w}static{this.\u0275fac=function(r){return new(r||a)}}static{this.\u0275cmp=s({type:a,selectors:[["app-what-is-angular"]],decls:179,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[1,"intro-hero"],[1,"hero-badge"],[1,"bi","bi-google"],[1,"lead-text"],[1,"highlight"],[1,"secondary-text"],[1,"features-section"],[1,"section-title"],[1,"bi","bi-stars"],[1,"features-grid"],[1,"feature-card"],[1,"feature-icon"],[1,"bi","bi-box-seam"],[1,"feature-icon","typescript"],[1,"bi","bi-filetype-tsx"],[1,"bi","bi-diagram-3"],[1,"feature-icon","reactive"],[1,"bi","bi-lightning-charge"],[1,"bi","bi-arrow-left-right"],[1,"feature-icon","cli"],[1,"bi","bi-terminal"],[1,"bi","bi-signpost-split"],[1,"bi","bi-input-cursor-text"],[1,"feature-icon","pwa"],[1,"bi","bi-phone"],[1,"feature-icon","signals"],[1,"bi","bi-activity"],[1,"feature-icon","ssr"],[1,"bi","bi-server"],[1,"bi","bi-shield-check"],[1,"philosophy-section"],[1,"philosophy-card"],[1,"philosophy-header"],[1,"bi","bi-battery-charging"],[1,"philosophy-points"],[1,"point-tag"],[1,"bi","bi-check2"],[1,"testability-section"],[1,"bi","bi-bug"],[1,"testability-grid"],[1,"test-item"],[1,"bi","bi-plug"],[1,"bi","bi-tools"],[1,"bi","bi-layers"],[1,"bi","bi-calendar-check"],[1,"usecases-section"],[1,"bi","bi-briefcase"],[1,"usecases-content"],[1,"usecases-lead"],[1,"usecase-cards"],[1,"usecase-card"],[1,"bi","bi-speedometer2"],[1,"bi","bi-database"],[1,"bi","bi-building"],[1,"bi","bi-people"],[1,"usecases-summary"]],template:function(r,i){r&1&&(n(0,"app-topic-template",0)(1,"div",1)(2,"div",2),o(3,"i",3),n(4,"span"),e(5,"Google Maintained"),t()(),n(6,"p",4),e(7," Angular is a comprehensive, "),n(8,"span",5),e(9,"TypeScript-based"),t(),e(10," web application framework that provides a robust, scalable solution for crafting dynamic single-page applications (SPAs). "),t(),n(11,"p",6),e(12," Born from the lessons learned with AngularJS, Angular represents a complete reimagining of modern web development\u2014prioritizing developer productivity, exceptional performance, and long-term maintainability. "),t()(),n(13,"div",7)(14,"h3",8),o(15,"i",9),e(16," Core Features That Define Angular "),t(),n(17,"div",10)(18,"div",11)(19,"div",12),o(20,"i",13),t(),n(21,"h4"),e(22,"Component Architecture"),t(),n(23,"p"),e(24,"Build as a tree of encapsulated, reusable components with clear data flow and self-contained units."),t()(),n(25,"div",11)(26,"div",14),o(27,"i",15),t(),n(28,"h4"),e(29,"TypeScript First"),t(),n(30,"p"),e(31,"Static typing for superior IDE intelligence, compile-time errors, and fearless refactoring."),t()(),n(32,"div",11)(33,"div",12),o(34,"i",16),t(),n(35,"h4"),e(36,"Dependency Injection"),t(),n(37,"p"),e(38,"Sophisticated DI system managing service lifecycles and promoting loose coupling."),t()(),n(39,"div",11)(40,"div",17),o(41,"i",18),t(),n(42,"h4"),e(43,"RxJS Reactive"),t(),n(44,"p"),e(45,"First-class observables support for elegant async operations and real-time data flows."),t()(),n(46,"div",11)(47,"div",12),o(48,"i",19),t(),n(49,"h4"),e(50,"Smart Data Binding"),t(),n(51,"p"),e(52,"Two-way binding with [(ngModel)] and fine-grained change detection control."),t()(),n(53,"div",11)(54,"div",20),o(55,"i",21),t(),n(56,"h4"),e(57,"Angular CLI"),t(),n(58,"p"),e(59,"World-class CLI for scaffolding, generating components, and optimizing production builds."),t()(),n(60,"div",11)(61,"div",12),o(62,"i",22),t(),n(63,"h4"),e(64,"Advanced Routing"),t(),n(65,"p"),e(66,"Enterprise routing with guards, lazy loading, and resolver functions."),t()(),n(67,"div",11)(68,"div",12),o(69,"i",23),t(),n(70,"h4"),e(71,"Powerful Forms"),t(),n(72,"p"),e(73,"Template-driven and reactive forms with built-in and custom validation."),t()(),n(74,"div",11)(75,"div",24),o(76,"i",25),t(),n(77,"h4"),e(78,"PWA Ready"),t(),n(79,"p"),e(80,"Service workers, offline capabilities, and installable progressive web apps."),t()(),n(81,"div",11)(82,"div",26),o(83,"i",27),t(),n(84,"h4"),e(85,"Angular Signals"),t(),n(86,"p"),e(87,"Modern reactivity with automatic dependency tracking and optimal rendering."),t()(),n(88,"div",11)(89,"div",28),o(90,"i",29),t(),n(91,"h4"),e(92,"SSR Support"),t(),n(93,"p"),e(94,"Angular Universal for SEO optimization and faster initial page loads."),t()(),n(95,"div",11)(96,"div",12),o(97,"i",30),t(),n(98,"h4"),e(99,"Enterprise Ready"),t(),n(100,"p"),e(101,"Built for large teams, strict governance, and years of maintainability."),t()()()(),n(102,"div",31)(103,"div",32)(104,"div",33),o(105,"i",34),n(106,"h3"),e(107,"Batteries Included Philosophy"),t()(),n(108,"p"),e(109," Angular embraces an "),n(110,"strong"),e(111,"opinionated, full-stack approach"),t(),e(112,' that eliminates "framework fatigue." Unlike minimal libraries, Angular delivers an integrated ecosystem\u2014routing, forms, HTTP, testing\u2014all following proven patterns that scale across teams and years of development. '),t(),n(113,"div",35)(114,"span",36),o(115,"i",37),e(116," Official Solutions"),t(),n(117,"span",36),o(118,"i",37),e(119," Battle Tested"),t(),n(120,"span",36),o(121,"i",37),e(122," Consistent Patterns"),t(),n(123,"span",36),o(124,"i",37),e(125," Team Scalability"),t()()()(),n(126,"div",38)(127,"h3",8),o(128,"i",39),e(129," Testability First "),t(),n(130,"div",40)(131,"div",41),o(132,"i",42),n(133,"span"),e(134,"DI makes unit testing natural"),t()(),n(135,"div",41),o(136,"i",43),n(137,"span"),e(138,"TestBed for component testing"),t()(),n(139,"div",41),o(140,"i",44),n(141,"span"),e(142,"Separation of concerns"),t()(),n(143,"div",41),o(144,"i",45),n(145,"span"),e(146,"Built for years, not months"),t()()()(),n(147,"div",46)(148,"h3",8),o(149,"i",47),e(150," When Angular Shines "),t(),n(151,"div",48)(152,"p",49),e(153," Angular excels in "),n(154,"span",5),e(155,"enterprise environments"),t(),e(156," where multiple teams collaborate on large-scale applications with demanding requirements. "),t(),n(157,"div",50)(158,"div",51),o(159,"i",52),n(160,"span"),e(161,"Complex Admin Dashboards"),t()(),n(162,"div",51),o(163,"i",53),n(164,"span"),e(165,"Data-Intensive Apps"),t()(),n(166,"div",51),o(167,"i",54),n(168,"span"),e(169,"Enterprise Systems"),t()(),n(170,"div",51),o(171,"i",55),n(172,"span"),e(173,"Large Team Projects"),t()()(),n(174,"p",56),e(175," From "),n(176,"strong"),e(177,"Fortune 500 companies"),t(),e(178," to innovative startups, Angular powers applications that demand reliability, performance, and maintainability at scale. With Google's continued investment and constant evolution\u2014Angular remains a compelling choice for serious web development. "),t()()()()),r&2&&c("title",i.angularIntroduction.title)("tags",i.angularIntroduction.tags)("paragraphs",i.angularIntroduction.paragraphs)("sections",i.angularIntroduction.sections)("codeExamples",i.angularIntroduction.codeExamples)("bestPractices",i.angularIntroduction.bestPractices)("keyPoints",i.angularIntroduction.keyPoints)},dependencies:[p],styles:['[_nghost-%COMP%]{display:block}.intro-hero[_ngcontent-%COMP%]{text-align:center;padding:var(--spacing-xl, 2rem) 0;margin-bottom:var(--spacing-xl, 2rem)}.hero-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:var(--spacing-sm, .5rem);padding:var(--spacing-xs, .25rem) var(--spacing-md, 1rem);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:9999px;font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);margin-bottom:var(--spacing-lg, 1.5rem);-webkit-backdrop-filter:blur(var(--glass-blur));backdrop-filter:blur(var(--glass-blur))}.hero-badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--accent-primary);font-size:1rem}.lead-text[_ngcontent-%COMP%]{font-size:var(--font-size-xl, 1.25rem);line-height:1.6;color:var(--text-primary);margin-bottom:var(--spacing-md, 1rem);max-width:800px;margin-left:auto;margin-right:auto}.lead-text[_ngcontent-%COMP%]   .highlight[_ngcontent-%COMP%]{background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:600}.secondary-text[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);color:var(--text-secondary);line-height:1.7;max-width:700px;margin:0 auto}.section-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-sm, .5rem);font-size:var(--font-size-xl, 1.25rem);font-weight:600;color:var(--text-primary);margin-bottom:var(--spacing-lg, 1.5rem);padding-bottom:var(--spacing-sm, .5rem);border-bottom:1px solid var(--glass-border)}.section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--accent-primary);font-size:1.2em}.features-section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xxl, 3rem)}.features-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:var(--spacing-lg, 1.5rem)}.feature-card[_ngcontent-%COMP%]{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-lg, 1rem);padding:var(--spacing-lg, 1.5rem);transition:all var(--transition-fast, .15s) ease;position:relative;overflow:hidden}.feature-card[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--accent-gradient);transform:scaleX(0);transition:transform var(--transition-fast, .15s) ease}.feature-card[_ngcontent-%COMP%]:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--accent-primary)}.feature-card[_ngcontent-%COMP%]:hover:before{transform:scaleX(1)}.feature-card[_ngcontent-%COMP%]:hover   .feature-icon[_ngcontent-%COMP%]{transform:scale(1.1)}.feature-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);font-weight:600;color:var(--text-primary);margin:var(--spacing-sm, .5rem) 0}.feature-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);line-height:1.6;margin:0}.feature-icon[_ngcontent-%COMP%]{width:48px;height:48px;border-radius:var(--radius-md, .75rem);background:var(--glass-bg-deep);display:flex;align-items:center;justify-content:center;transition:transform var(--transition-fast, .15s) ease;margin-bottom:var(--spacing-sm, .5rem)}.feature-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem;color:var(--accent-primary)}.feature-icon.typescript[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#3178c6}.feature-icon.reactive[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#ff4081}.feature-icon.cli[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#dd0031}.feature-icon.pwa[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#5a0fc8}.feature-icon.signals[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#00bcd4}.feature-icon.ssr[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#4caf50}.philosophy-section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xxl, 3rem)}.philosophy-card[_ngcontent-%COMP%]{background:var(--bg-gradient);border:1px solid var(--glass-border);border-radius:var(--radius-xl, 1.5rem);padding:var(--spacing-xl, 2rem);position:relative;overflow:hidden}.philosophy-card[_ngcontent-%COMP%]:after{content:"";position:absolute;top:-50%;right:-50%;width:100%;height:100%;background:radial-gradient(circle,var(--accent-primary) 0%,transparent 70%);opacity:.05;pointer-events:none}.philosophy-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-md, 1rem);margin-bottom:var(--spacing-md, 1rem)}.philosophy-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:2rem;color:var(--accent-primary)}.philosophy-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:var(--font-size-lg, 1.125rem);font-weight:600;color:var(--text-primary);margin:0}.philosophy-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);color:var(--text-secondary);line-height:1.7;margin-bottom:var(--spacing-lg, 1.5rem)}.philosophy-points[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm, .5rem)}.point-tag[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:var(--spacing-xs, .25rem);padding:var(--spacing-xs, .25rem) var(--spacing-sm, .5rem);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-sm, .5rem);font-size:var(--font-size-sm, .875rem);color:var(--text-secondary)}.point-tag[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--success-color, #22c55e)}.testability-section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xxl, 3rem)}.testability-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--spacing-md, 1rem)}.test-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-sm, .5rem);padding:var(--spacing-md, 1rem);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-md, .75rem);font-size:var(--font-size-sm, .875rem);color:var(--text-secondary);transition:all var(--transition-fast, .15s) ease}.test-item[_ngcontent-%COMP%]:hover{border-color:var(--accent-primary);transform:translate(4px)}.test-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem;color:var(--accent-primary)}.usecases-section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xl, 2rem)}.usecases-lead[_ngcontent-%COMP%]{font-size:var(--font-size-lg, 1.125rem);color:var(--text-secondary);line-height:1.7;margin-bottom:var(--spacing-lg, 1.5rem)}.usecases-lead[_ngcontent-%COMP%]   .highlight[_ngcontent-%COMP%]{color:var(--accent-primary);font-weight:600}.usecase-cards[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:var(--spacing-md, 1rem);margin-bottom:var(--spacing-lg, 1.5rem)}.usecase-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:var(--spacing-sm, .5rem);padding:var(--spacing-lg, 1.5rem) var(--spacing-md, 1rem);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-lg, 1rem);text-align:center;transition:all var(--transition-fast, .15s) ease}.usecase-card[_ngcontent-%COMP%]:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--accent-primary)}.usecase-card[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%]{transform:scale(1.1);color:var(--accent-primary)}.usecase-card[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:2rem;color:var(--text-secondary);transition:all var(--transition-fast, .15s) ease}.usecase-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);font-weight:500;color:var(--text-primary)}.usecases-summary[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);color:var(--text-secondary);line-height:1.7;text-align:center;max-width:800px;margin:0 auto}.usecases-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--text-primary)}@media(max-width:768px){.features-grid[_ngcontent-%COMP%], .testability-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.usecase-cards[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}.philosophy-points[_ngcontent-%COMP%]{justify-content:center}}']})}}return a})();var C={title:"Angular Application Architecture: A Comprehensive Guide to Modern Folder Structure",tags:["Angular","Folder Structure","Project Architecture","Standalone Components","Best Practices","Code Organization","Scalability","Maintainability"],paragraphs:["A well-crafted folder structure is the foundation of maintainable Angular applications. In the standalone era, Angular offers both simplicity for beginners and sophistication for enterprise-scale applications.","This guide explores three complementary approaches to Angular project organization, from minimalist setups suitable for small projects to sophisticated domain-driven architectures designed for large teams and complex business requirements.","Understanding these patterns empowers you to make intentional architectural decisions that align with your project's scope, team size, and long-term vision."],keyPoints:["Folder structure is architecture made visible\u2014it communicates intent and relationships","Standalone components enable both flat and deeply organized structures with equal elegance","Different organizational patterns serve different project scales and team dynamics",'Consistency within a project is more important than absolute "correctness"',"The structure should evolve with your application's complexity and team growth","Clear boundaries between domains reduce coupling and improve testability"],sections:[{id:"philosophy",heading:"The Philosophy of Angular Project Structure",content:"Great software architecture begins with intentional organization. Angular's flexibility allows multiple valid approaches, each with distinct advantages for different contexts.",list:["Structure should reveal the application's domain, not just its technology","Folder depth should correspond to conceptual complexity, not arbitrary rules","Import paths should tell a story about dependencies and relationships","Naming should be consistent, descriptive, and aligned with team vocabulary","The structure should facilitate both feature isolation and global discovery"],additionalExplanation:"Think of your folder structure as a map of your application's conceptual landscape. Good maps help developers navigate quickly to their destination, understand relationships between different areas, and add new features without getting lost."},{id:"minimalist-approach",heading:"Pattern 1: The Minimalist Approach (Ideal for Learning & Small Projects)",content:"For tutorials, prototypes, and small applications, a flat structure minimizes cognitive overhead while demonstrating Angular's standalone elegance.",list:["src/","\u251C\u2500\u2500 app/","\u2502   \u251C\u2500\u2500 app.component.ts","\u2502   \u251C\u2500\u2500 app.component.html","\u2502   \u251C\u2500\u2500 app.component.scss","\u2502   \u251C\u2500\u2500 app.routes.ts","\u2502   \u251C\u2500\u2500 app.config.ts","\u2502   \u251C\u2500\u2500 main.ts","\u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u251C\u2500\u2500 header/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 header.component.ts","\u2502   \u2502   \u2502   \u251C\u2500\u2500 header.component.html","\u2502   \u2502   \u2502   \u2514\u2500\u2500 header.component.scss","\u2502   \u2502   \u251C\u2500\u2500 footer/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 footer.component.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 footer.component.html","\u2502   \u2502   \u2514\u2500\u2500 user-card/","\u2502   \u2502       \u251C\u2500\u2500 user-card.component.ts","\u2502   \u2502       \u2514\u2500\u2500 user-card.component.html","\u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u251C\u2500\u2500 api.service.ts","\u2502   \u2502   \u2514\u2500\u2500 auth.service.ts","\u2502   \u251C\u2500\u2500 models/","\u2502   \u2502   \u251C\u2500\u2500 user.model.ts","\u2502   \u2502   \u2514\u2500\u2500 product.model.ts","\u2502   \u2514\u2500\u2500 utils/","\u2502       \u251C\u2500\u2500 formatters.ts","\u2502       \u2514\u2500\u2500 validators.ts","\u251C\u2500\u2500 assets/","\u2502   \u251C\u2500\u2500 images/","\u2502   \u2502   \u251C\u2500\u2500 logo.svg","\u2502   \u2502   \u2514\u2500\u2500 icons/","\u2502   \u2502       \u251C\u2500\u2500 home.svg","\u2502   \u2502       \u2514\u2500\u2500 settings.svg","\u2502   \u251C\u2500\u2500 fonts/","\u2502   \u2502   \u251C\u2500\u2500 inter.woff2","\u2502   \u2502   \u2514\u2500\u2500 inter.woff","\u2502   \u2514\u2500\u2500 locales/","\u2502       \u251C\u2500\u2500 en.json","\u2502       \u2514\u2500\u2500 es.json","\u251C\u2500\u2500 environments/","\u2502   \u251C\u2500\u2500 environment.ts","\u2502   \u2514\u2500\u2500 environment.prod.ts","\u251C\u2500\u2500 styles/","\u2502   \u251C\u2500\u2500 _variables.scss","\u2502   \u251C\u2500\u2500 _mixins.scss","\u2502   \u2514\u2500\u2500 _global.scss","\u2514\u2500\u2500 index.html"],additionalExplanation:"This structure shines in its simplicity. Everything is discoverable within 2-3 clicks, making it perfect for solo developers, learning projects, or applications with fewer than 20 components. The flat hierarchy reduces import path complexity while maintaining clear separation of concerns."},{id:"feature-based",heading:"Pattern 2: Feature-Based Structure (The Pragmatic Standard)",content:"For mid-sized applications with clear functional boundaries, organizing by feature creates natural isolation and facilitates team parallelization.",list:["src/","\u251C\u2500\u2500 app/","\u2502   \u251C\u2500\u2500 core/                          # Singleton services, global state","\u2502   \u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 auth.service.ts","\u2502   \u2502   \u2502   \u251C\u2500\u2500 notification.service.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 api-interceptor.service.ts","\u2502   \u2502   \u251C\u2500\u2500 guards/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 auth.guard.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 role.guard.ts","\u2502   \u2502   \u251C\u2500\u2500 interceptors/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 auth.interceptor.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 logging.interceptor.ts","\u2502   \u2502   \u2514\u2500\u2500 models/","\u2502   \u2502       \u251C\u2500\u2500 app-state.model.ts","\u2502   \u2502       \u2514\u2500\u2500 api-response.model.ts","\u2502   \u251C\u2500\u2500 shared/                       # Reusable UI components & utilities","\u2502   \u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 ui/","\u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 button/","\u2502   \u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 button.component.ts","\u2502   \u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 button.component.html","\u2502   \u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 button.component.scss","\u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 card/","\u2502   \u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 card.component.ts","\u2502   \u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 card.component.html","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 modal/","\u2502   \u2502   \u2502   \u2502       \u251C\u2500\u2500 modal.component.ts","\u2502   \u2502   \u2502   \u2502       \u2514\u2500\u2500 modal.component.html","\u2502   \u2502   \u2502   \u2514\u2500\u2500 layout/","\u2502   \u2502   \u2502       \u251C\u2500\u2500 header/","\u2502   \u2502   \u2502       \u2502   \u251C\u2500\u2500 header.component.ts","\u2502   \u2502   \u2502       \u2502   \u2514\u2500\u2500 header.component.html","\u2502   \u2502   \u2502       \u2514\u2500\u2500 footer/","\u2502   \u2502   \u2502           \u251C\u2500\u2500 footer.component.ts","\u2502   \u2502   \u2502           \u2514\u2500\u2500 footer.component.html","\u2502   \u2502   \u251C\u2500\u2500 directives/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 click-outside.directive.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 auto-focus.directive.ts","\u2502   \u2502   \u251C\u2500\u2500 pipes/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 currency-format.pipe.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 date-format.pipe.ts","\u2502   \u2502   \u2514\u2500\u2500 utils/","\u2502   \u2502       \u251C\u2500\u2500 formatters.ts","\u2502   \u2502       \u2514\u2500\u2500 validators.ts","\u2502   \u251C\u2500\u2500 features/                     # Domain-specific feature modules","\u2502   \u2502   \u251C\u2500\u2500 dashboard/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 stats-card/","\u2502   \u2502   \u2502   \u2502   \u2502   \u251C\u2500\u2500 stats-card.component.ts","\u2502   \u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 stats-card.component.html","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 recent-activity/","\u2502   \u2502   \u2502   \u2502       \u251C\u2500\u2500 recent-activity.component.ts","\u2502   \u2502   \u2502   \u2502       \u2514\u2500\u2500 recent-activity.component.html","\u2502   \u2502   \u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 dashboard.service.ts","\u2502   \u2502   \u2502   \u251C\u2500\u2500 models/","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 dashboard.model.ts","\u2502   \u2502   \u2502   \u251C\u2500\u2500 routes/","\u2502   \u2502   \u2502   \u2502   \u2514\u2500\u2500 dashboard.routes.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 pages/","\u2502   \u2502   \u2502       \u251C\u2500\u2500 dashboard-page/","\u2502   \u2502   \u2502       \u2502   \u251C\u2500\u2500 dashboard-page.component.ts","\u2502   \u2502   \u2502       \u2502   \u2514\u2500\u2500 dashboard-page.component.html","\u2502   \u2502   \u2502       \u2514\u2500\u2500 analytics-page/","\u2502   \u2502   \u2502           \u251C\u2500\u2500 analytics-page.component.ts","\u2502   \u2502   \u2502           \u2514\u2500\u2500 analytics-page.component.html","\u2502   \u2502   \u251C\u2500\u2500 users/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 models/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 routes/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 pages/","\u2502   \u2502   \u2502       \u251C\u2500\u2500 user-list/","\u2502   \u2502   \u2502       \u2514\u2500\u2500 user-detail/","\u2502   \u2502   \u2514\u2500\u2500 products/","\u2502   \u2502       \u251C\u2500\u2500 components/","\u2502   \u2502       \u251C\u2500\u2500 services/","\u2502   \u2502       \u251C\u2500\u2500 models/","\u2502   \u2502       \u251C\u2500\u2500 routes/","\u2502   \u2502       \u2514\u2500\u2500 pages/","\u2502   \u2502           \u251C\u2500\u2500 product-catalog/","\u2502   \u2502           \u2514\u2500\u2500 product-detail/","\u2502   \u251C\u2500\u2500 app.component.ts","\u2502   \u251C\u2500\u2500 app.routes.ts","\u2502   \u251C\u2500\u2500 app.config.ts","\u2502   \u2514\u2500\u2500 main.ts","\u251C\u2500\u2500 assets/","\u251C\u2500\u2500 environments/","\u2514\u2500\u2500 styles/"],additionalExplanation:"This structure introduces clear boundaries between different application domains. Features can be developed in parallel by different teams, each with their own isolated folders. The shared folder prevents duplication while core maintains global application state and services. This pattern scales well to applications with 50-200 components."},{id:"domain-driven",heading:"Pattern 3: Domain-Driven Design (Enterprise Scale)",content:"For complex business applications with large teams, a domain-driven approach aligns folder structure with business capabilities and bounded contexts.",list:["src/","\u251C\u2500\u2500 domains/                          # Business capability domains","\u2502   \u251C\u2500\u2500 identity/                     # Authentication, authorization, users","\u2502   \u2502   \u251C\u2500\u2500 application/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 services/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 commands/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 queries/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 events/","\u2502   \u2502   \u251C\u2500\u2500 infrastructure/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 repositories/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 adapters/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 gateways/","\u2502   \u2502   \u2514\u2500\u2500 presentation/","\u2502   \u2502       \u251C\u2500\u2500 components/","\u2502   \u2502       \u251C\u2500\u2500 pages/","\u2502   \u2502       \u2514\u2500\u2500 routes/","\u2502   \u251C\u2500\u2500 inventory/                    # Product catalog, stock management","\u2502   \u2502   \u251C\u2500\u2500 domain/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 entities/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 value-objects/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 aggregates/","\u2502   \u2502   \u251C\u2500\u2500 application/","\u2502   \u2502   \u2514\u2500\u2500 presentation/","\u2502   \u2514\u2500\u2500 ordering/                     # Shopping cart, checkout, payments","\u2502       \u251C\u2500\u2500 domain/","\u2502       \u251C\u2500\u2500 application/","\u2502       \u2514\u2500\u2500 presentation/","\u251C\u2500\u2500 shared/                           # Cross-cutting concerns","\u2502   \u251C\u2500\u2500 kernel/                       # Framework abstractions","\u2502   \u2502   \u251C\u2500\u2500 base/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 base.component.ts","\u2502   \u2502   \u2502   \u2514\u2500\u2500 base.service.ts","\u2502   \u2502   \u2514\u2500\u2500 contracts/","\u2502   \u2502       \u251C\u2500\u2500 repository.contract.ts","\u2502   \u2502       \u2514\u2500\u2500 service.contract.ts","\u2502   \u251C\u2500\u2500 ui/                           # Design system implementation","\u2502   \u2502   \u251C\u2500\u2500 foundation/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 tokens/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 typography/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 grid/","\u2502   \u2502   \u251C\u2500\u2500 components/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 atoms/","\u2502   \u2502   \u2502   \u251C\u2500\u2500 molecules/","\u2502   \u2502   \u2502   \u2514\u2500\u2500 organisms/","\u2502   \u2502   \u2514\u2500\u2500 templates/","\u2502   \u2502       \u251C\u2500\u2500 dashboard.template.ts","\u2502   \u2502       \u2514\u2500\u2500 form.template.ts","\u2502   \u2514\u2500\u2500 infrastructure/","\u2502       \u251C\u2500\u2500 logging/","\u2502       \u251C\u2500\u2500 monitoring/","\u2502       \u251C\u2500\u2500 configuration/","\u2502       \u2514\u2500\u2500 http/","\u251C\u2500\u2500 app/","\u2502   \u251C\u2500\u2500 shell/                        # Application shell & composition root","\u2502   \u2502   \u251C\u2500\u2500 layout/","\u2502   \u2502   \u251C\u2500\u2500 navigation/","\u2502   \u2502   \u2514\u2500\u2500 shell.component.ts","\u2502   \u251C\u2500\u2500 bootstrap/","\u2502   \u2502   \u251C\u2500\u2500 app.config.ts","\u2502   \u2502   \u251C\u2500\u2500 app.routes.ts","\u2502   \u2502   \u2514\u2500\u2500 dependency-injection.config.ts","\u2502   \u2514\u2500\u2500 main.ts","\u2514\u2500\u2500 environments/"],additionalExplanation:"This sophisticated structure implements clean architecture principles. Domains represent business capabilities with clear boundaries. Each domain contains its own domain logic, application services, and presentation layers. The shared folder contains truly cross-cutting concerns, while the app folder serves as the composition root. This pattern supports hundreds of components, multiple teams, and complex business rules."},{id:"common-conventions",heading:"Universal Conventions & Best Practices",content:"Regardless of which pattern you choose, certain conventions improve maintainability and developer experience across all Angular projects.",list:["File Naming: Use kebab-case for files (user-profile.component.ts), PascalCase for classes","Component Organization: Keep component files together (component.ts, .html, .scss, .spec.ts)","Barrel Files: Use index.ts exports sparingly for truly public APIs, not for hiding complexity","Import Paths: Prefer relative imports for closely related files, absolute for shared resources","Test Files: Co-locate spec files with their source files for discoverability","Type Definitions: Place interfaces/types near where they're primarily used, not in a global dump","Configuration: Keep environment-specific configs in environments/, build configs in angular.json","Assets: Organize static assets by type (images/, fonts/, icons/) not by feature"]},{id:"evolution",heading:"Evolving Your Structure Intentionally",content:"Successful projects start with simple structures and evolve intentionally as complexity grows. Recognize these signals that indicate it's time to reorganize:",list:["Multiple developers frequently modify the same folders simultaneously","Import paths become excessively long and difficult to reason about","Finding related files requires extensive searching or memorization","Feature boundaries become blurred with components serving multiple domains","Testing becomes difficult due to tight coupling between unrelated features","New team members take more than a day to understand the basic structure"],additionalExplanation:"Refactoring folder structure is a significant investment. When you do reorganize, do it all at once rather than piecemeal. Update imports systematically, communicate changes clearly to the team, and ensure your CI/CD pipeline handles the transition smoothly."}],codeExamples:[{title:"Barrel File Example for Feature Module",description:"Clean public API exposure for a feature module",language:"typescript",code:`// features/dashboard/index.ts
// Export public API for the dashboard feature

// Components
export { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
export { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';

// Services
export { DashboardService } from './services/dashboard.service';

// Models
export type { DashboardStats, RecentActivity } from './models/dashboard.model';

// Routes
export { DASHBOARD_ROUTES } from './routes/dashboard.routes';`},{title:"Smart vs Dumb Component Organization",language:"typescript",code:`// features/users/components/user-list/ (Smart/Container Component)
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
}`},{title:"Domain-Driven Component with Clean Architecture",language:"typescript",code:`// domains/identity/presentation/components/login-form/
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
}`},{title:"Environment-Aware Service Configuration",language:"typescript",code:`// shared/infrastructure/http/api.config.ts
import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  // Base URLs
  baseUrl: environment.apiUrl,
  authUrl: environment.authUrl,
  
  // Endpoints
  endpoints: {
    users: environment.apiUrl/users,
    products: environment.apiUrl/products,
    orders: environment.apiUrl/orders
  },
  
  // Timeouts
  defaultTimeout: 30000,
  uploadTimeout: 120000,
  
  // Retry configuration
  retryAttempts: 3,
  retryDelay: 1000
};

// environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'https://api.dev.example.com/v1',
  authUrl: 'https://auth.dev.example.com',
  enableDebug: true,
  logLevel: 'debug'
};

// environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/v1',
  authUrl: 'https://auth.example.com',
  enableDebug: false,
  logLevel: 'error'
};`}],bestPractices:["Start simple and evolve intentionally\u2014don't over-engineer from day one","Let your business domain dictate structure, not technical concerns","Keep components small, focused, and co-located with their dependencies","Use meaningful folder names that reveal intent (features/, domains/, shared/)","Maintain consistent naming conventions across the entire codebase","Organize for the developer experience, not just the build system","Create clear boundaries between features to enable parallel development","Document your architectural decisions and folder conventions","Regularly refactor the structure as the application evolves","Balance abstraction with practicality\u2014not every component needs a facade","Keep test files alongside their source files for discoverability","Use barrel files judiciously\u2014they should simplify, not obscure","Consider the cognitive load on new team members when designing structure","Align folder structure with your team's workflow and communication patterns","Remember that the best structure is the one your team can maintain consistently"]};var E=(()=>{class a{constructor(){this.content=C}static{this.\u0275fac=function(r){return new(r||a)}}static{this.\u0275cmp=s({type:a,selectors:[["app-angular-ist-app"]],decls:38,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[1,"topic-content"],[1,"highlight-box"],[1,"bi","bi-lightbulb"]],template:function(r,i){r&1&&(n(0,"app-topic-template",0)(1,"div",1)(2,"p"),e(3," Angular is a comprehensive, TypeScript-based web application framework developed and maintained by Google. Born from the lessons learned with AngularJS, Angular represents a complete reimagining of how to build modern web applications. It provides a robust, scalable solution for crafting dynamic single-page applications (SPAs) that prioritize developer productivity, exceptional performance, and long-term code maintainability. "),t(),n(4,"p"),e(5," What sets Angular apart is its "),n(6,"strong"),e(7,"opinionated, full-stack approach"),t(),e(8,' to frontend development. Unlike minimal libraries that solve one problem, Angular is an enterprise-grade platform delivering an integrated ecosystem: component architecture, powerful dependency injection, sophisticated routing, reactive forms, HTTP client with interceptors, comprehensive testing utilities, internationalization support, and state management patterns. This unified vision eliminates the "framework fatigue" of assembling disparate tools and ensures consistency across teams, projects, and years of development. '),t(),n(9,"h3"),e(10,"Core Features That Define Angular"),t(),n(11,"h3"),e(12,"The Angular Philosophy: Opinionated Excellence"),t(),n(13,"p"),e(14,` Angular embraces a "batteries-included" philosophy that stands in sharp contrast to the fragmented JavaScript ecosystem. Rather than forcing developers to navigate a maze of competing libraries for routing, state management, forms, and HTTP\u2014Angular provides official, battle-tested solutions for every common need. This opinionated approach isn't about limiting choice; it's about eliminating decision paralysis and ensuring your application follows proven patterns that scale. `),t(),n(15,"p"),e(16," The framework champions "),n(17,"strong"),e(18,"testability"),t(),e(19," as a first-class concern. Dependency injection makes unit testing natural, TestBed provides powerful component testing utilities, and the entire architecture encourages separation of concerns. Angular applications are designed to be maintained for years, not months\u2014with strong typing catching errors before they reach production, consistent patterns making onboarding seamless, and comprehensive tooling supporting large teams working on complex domains. "),t(),n(20,"h3"),e(21,"When Angular Shines"),t(),n(22,"p"),e(23," Angular excels in enterprise environments where multiple teams collaborate on large-scale applications with demanding requirements. If you're building complex admin dashboards, data-intensive business applications, or systems requiring strict consistency and governance\u2014Angular's structure becomes an asset, not a constraint. The learning curve pays dividends in reduced bugs, faster onboarding, and sustainable long-term development. "),t(),n(24,"p"),e(25," From Fortune 500 companies to innovative startups, Angular powers applications that demand reliability, performance, and maintainability at scale. With Google's continued investment, a vibrant community, and constant evolution incorporating modern web standards like "),n(26,"strong"),e(27,"signals"),t(),e(28," and "),n(29,"strong"),e(30,"standalone components"),t(),e(31,"\u2014Angular remains a compelling choice for serious web development in 2026 and beyond. "),t(),n(32,"div",2),o(33,"i",3),n(34,"p")(35,"strong"),e(36,"Key takeaway:"),t(),e(37," Choose Angular when you want structure, consistency, and long-term maintainability \u2014 especially in medium-to-large projects or enterprise settings. "),t()()()()),r&2&&c("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints)},dependencies:[p],encapsulation:2})}}return a})();var P={title:"Node.js vs NPM: Understanding the Difference",tags:["nodejs","npm","javascript","backend","package-manager"],paragraphs:["Node.js is a JavaScript runtime that lets you run JavaScript on your computer or server. NPM (Node Package Manager) is a tool that comes with Node.js to help you install and manage packages (libraries).","Think of Node.js as the engine of a car, and NPM as the toolbox and spare parts you need to build and maintain that car."],keyPoints:["Node.js: JavaScript runtime environment","NPM: Package manager for Node.js","NPM comes bundled with Node.js","Node.js executes code, NPM manages packages","Both essential for modern JavaScript development"],sections:[{heading:"What is Node.js?",content:"Node.js is a platform for building server-side applications with JavaScript",list:["Runs JavaScript outside the browser","Uses Chrome's V8 JavaScript engine","Event-driven, non-blocking I/O model","Perfect for building APIs, servers, and tools","Includes core modules for file system, HTTP, etc."]},{heading:"What is NPM?",content:"NPM is the world's largest software registry and package manager",list:["Default package manager for Node.js","Manages project dependencies","Hosts over 2 million packages","Manages versions and updates","Handles project scripts and configurations"]},{heading:"How They Work Together",content:"The relationship between Node.js and NPM",list:["Install Node.js \u2192 Get NPM automatically","Use NPM to install packages for Node.js projects","Node.js uses packages installed by NPM","NPM manages the node_modules folder","package.json acts as the project blueprint"]}],codeExamples:[{title:"Installation & Setup Commands",language:"bash",code:`# 1. Check if Node.js and NPM are installed
node --version
npm --version

# 2. Install a package locally (for one project)
npm install express

# 3. Install a package globally (for all projects)
npm install -g nodemon

# 4. Initialize a new Node.js project
npm init                 # Interactive setup
npm init -y              # Quick setup with defaults

# 5. Install and save to package.json
npm install axios --save
npm install typescript --save-dev`,description:"Essential commands to get started with Node.js and NPM"}],bestPractices:["Always start with 'npm init' to create package.json","Use 'npm install --save' for production dependencies","Use 'npm install --save-dev' for development dependencies","Never commit node_modules folder to Git","Use .gitignore to exclude node_modules","Regularly update packages with 'npm update'","Use specific version numbers in package.json","Create separate scripts in package.json for different tasks","Use 'npx' to run packages without installing globally"]};var A=(()=>{class a{constructor(){this.content=P}static{this.\u0275fac=function(r){return new(r||a)}}static{this.\u0275cmp=s({type:a,selectors:[["app-what-is-angular"]],decls:111,vars:7,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],["href","https://nodejs.org","target","_blank"]],template:function(r,i){r&1&&(n(0,"app-topic-template",0)(1,"p"),e(2," Think of Node.js as the engine and NPM as the toolbox. Node.js runs JavaScript on your computer, while NPM helps you get tools (packages) for your projects. "),t(),n(3,"h3"),e(4,"Quick Comparison"),t(),n(5,"table")(6,"tr")(7,"th"),e(8,"Node.js"),t(),n(9,"th"),e(10,"NPM"),t()(),n(11,"tr")(12,"td"),e(13,"\u{1F680} JavaScript runtime"),t(),n(14,"td"),e(15,"\u{1F4E6} Package manager"),t()(),n(16,"tr")(17,"td"),e(18,"\u{1F527} Runs server-side code"),t(),n(19,"td"),e(20,"\u{1F4DA} Installs libraries"),t()(),n(21,"tr")(22,"td"),e(23,"\u{1F4BB} Like a car engine"),t(),n(24,"td"),e(25,"\u{1F527} Like a mechanic's toolbox"),t()(),n(26,"tr")(27,"td"),e(28,"\u{1F3C3}\u200D\u2642\uFE0F Executes JavaScript files"),t(),n(29,"td"),e(30,"\u{1F4E5} Downloads packages"),t()()(),n(31,"h3"),e(32,"Setup Steps"),t(),n(33,"h4"),e(34,"Step 1: Install Node.js (includes NPM)"),t(),n(35,"ol")(36,"li"),e(37,"Go to "),n(38,"a",1),e(39,"nodejs.org"),t()(),n(40,"li"),e(41,"Download the LTS version (recommended)"),t(),n(42,"li"),e(43,"Install it like any other program"),t(),n(44,"li"),e(45,"Open terminal/command prompt"),t()(),n(46,"h4"),e(47,"Step 2: Check Installation"),t(),n(48,"pre")(49,"code"),e(50,`
# Check Node.js version
node --version

# Check NPM version
npm --version
 
`),t()(),n(51,"h3"),e(52,"Quick Tips"),t(),n(53,"ul")(54,"li"),e(55,"\u2705 "),n(56,"strong"),e(57,"Node.js comes with NPM"),t(),e(58," - Install once, get both"),t(),n(59,"li"),e(60,"\u2705 "),n(61,"strong"),e(62,"package.json"),t(),e(63," - Your project's recipe card"),t(),n(64,"li"),e(65," \u2705 "),n(66,"strong"),e(67,"node_modules"),t(),e(68," - Where packages live (don't upload this!) "),t(),n(69,"li"),e(70,"\u2705 "),n(71,"strong"),e(72,"npm start"),t(),e(73," - Common way to run your app"),t(),n(74,"li"),e(75,"\u274C "),n(76,"strong"),e(77,"Don't install globally"),t(),e(78," unless necessary"),t(),n(79,"li"),e(80,"\u274C "),n(81,"strong"),e(82,"Don't edit node_modules"),t(),e(83," directly"),t()(),n(84,"h3"),e(85,"When You Need Them"),t(),n(86,"ul")(87,"li"),e(88,"\u{1F310} "),n(89,"strong"),e(90,"Need a web server?"),t(),e(91," \u2192 Node.js"),t(),n(92,"li"),e(93,"\u{1F6E0}\uFE0F "),n(94,"strong"),e(95,"Need a tool/library?"),t(),e(96," \u2192 NPM"),t(),n(97,"li"),e(98,"\u{1F680} "),n(99,"strong"),e(100,"Building APIs?"),t(),e(101," \u2192 Both"),t(),n(102,"li"),e(103,"\u{1F527} "),n(104,"strong"),e(105,"Frontend build tools?"),t(),e(106," \u2192 Both"),t()(),n(107,"p")(108,"strong"),e(109,"Remember:"),t(),e(110," Node.js lets JavaScript run outside the browser. NPM helps you manage the tools you need. Together, they power modern web development! "),t()()),r&2&&c("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints)},dependencies:[p],encapsulation:2})}}return a})();var se=[{path:"",component:h,children:[{path:"",redirectTo:"introduction/what-is-angular",pathMatch:"full"},{path:"introduction",children:[{path:"",redirectTo:"what-is-angular",pathMatch:"full"},{path:"what-is-angular",component:m},{path:"angular-vs-react-vue",component:v},{path:"architecture-overview",component:y}]},{path:"setup",children:[{path:"nodejs-npm",component:A},{path:"cli-installation",component:S},{path:"first-app",component:E},{path:"folder-structure",component:m},{path:"config-files",component:m}]}]}];export{se as angularFundamentalRoutes};
