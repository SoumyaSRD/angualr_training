

// ============================================================================
// THE FRAMEWORK KITCHEN: A CULINARY ANALOGY
// ============================================================================

import { ICodeExample } from "../../../../../interfaces/code-example";
import { ISection, ITopicContent } from "../../../../../interfaces/topic";


export const FRAMEWORK_COMPARISON: ITopicContent = {
    title: "Angular vs React vs Vue: The Framework Kitchen Showdown",
    tags: ["frontend", "frameworks", "comparison", "javascript", "typescript"],

    paragraphs: [
        "Imagine building web applications is like running a restaurant kitchen. Angular is a fully-equipped professional kitchen with every appliance labeled and procedures manualized. React is a chef's table where you bring your own tools but have an expert chef guiding your technique. Vue is the modern food truck with a perfectly curated set of tools that just work together intuitively.",
        "Each framework represents a different philosophy in how we structure, build, and maintain our digital 'meals' (applications). Let's explore how they differ in their approaches to common web development challenges."
    ],

    keyPoints: [
        "Angular: The enterprise-grade kitchen with built-in everything",
        "React: The flexible chef's toolkit - bring what you need",
        "Vue: The progressive framework that scales with your needs",
        "Different mental models for solving the same problems",
        "Ecosystem maturity vs developer experience trade-offs"
    ],

    sections: [
        {
            heading: "Architecture: Kitchen Layout & Organization",
            content: "How each framework structures your application's 'kitchen'",
            list: [
                "Angular: Pre-designed kitchen blueprint (opinionated architecture)",
                "React: Open floor plan - you design the kitchen layout (unopinionated)",
                "Vue: Modular kitchen units that snap together (progressive framework)"
            ],
            additionalExplanation: "Angular tells you where everything goes, React lets you decide, and Vue gives you sensible defaults that you can override."
        },
        {
            heading: "Learning Curve: From Line Cook to Executive Chef",
            content: "The journey from beginner to expert in each framework",
            list: [
                "Angular: Steep climb but structured path (TypeScript, RxJS, decorators)",
                "React: Gentle slope but wide plateau (JSX, hooks, ecosystem choices)",
                "Vue: Smooth ascent with guardrails (template syntax, single-file components)"
            ],
            additionalExplanation: "Vue is often praised for its gentle learning curve, while Angular's comprehensive nature requires more upfront learning but provides more guidance."
        },
        {
            heading: "State Management: Inventory Control Systems",
            content: "How each framework handles application state",
            list: [
                "Angular: Centralized pantry with RxJS observables",
                "React: Component fridges with optional Redux freezer",
                "Vue: Reactive pantry that updates everything automatically"
            ]
        }
    ],

    codeExamples: [
        {
            title: "Creating a Component: Different Cooking Styles",
            language: "typescript",
            code: `// ANGULAR - The Structured Recipe
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
</script>`,
            description: "Three different approaches to the same problem: Angular uses decorators and dependency injection, React uses functions and hooks, Vue uses single-file components with clear separation of concerns."
        },
        {
            title: "Data Binding: Communicating Between Kitchen Stations",
            language: "typescript",
            code: `// ANGULAR - Two-way binding with [(ngModel)]
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
</script>`,
            description: "Different approaches to synchronizing data between the view and the component logic."
        },
        {
            title: "Dependency Injection: Kitchen Supply Chain",
            language: "typescript",
            code: `// ANGULAR - Built-in dependency injection
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
};`,
            description: "Different approaches to managing dependencies and sharing services across components."
        }
    ],

    bestPractices: [
        "Choose Angular for: Large enterprise applications, teams needing structure, projects requiring comprehensive tooling out-of-the-box",
        "Choose React for: Maximum flexibility, teams that want to choose their own tools, projects where UI interactivity is the primary focus",
        "Choose Vue for: Rapid prototyping, smaller to medium-sized projects, teams valuing developer experience and gradual adoption",
        "Consider your team's existing skills and preferences - the best framework is the one your team can use effectively",
        "Remember that all three frameworks can solve the same problems - they just approach them differently",
        "Don't let 'framework wars' distract you from building great user experiences"
    ]
};

// ============================================================================
// FRAMEWORK PERSONALITY PROFILES
// ============================================================================

export const FRAMEWORK_PERSONALITIES: ISection[] = [
    {
        heading: "Angular: The Seasoned Executive Chef",
        content: "Angular brings order, structure, and predictability to large-scale application development.",
        list: [
            "Loves: Type safety, comprehensive documentation, built-in solutions",
            "Dislikes: Ad-hoc solutions, inconsistent patterns, magical code",
            "Signature move: @Decorators everywhere",
            "Catchphrase: 'There's a module for that'"
        ]
    },
    {
        heading: "React: The Innovative Fusion Chef",
        content: "React focuses on component composition and functional programming principles.",
        list: [
            "Loves: Functional purity, composable components, minimal API surface",
            "Dislikes: Magic, unnecessary abstractions, boilerplate",
            "Signature move: const [state, setState] = useState(initial)",
            "Catchphrase: 'It's just JavaScript'"
        ]
    },
    {
        heading: "Vue: The Approachable Master Chef",
        content: "Vue balances power with approachability, making sophisticated features accessible.",
        list: [
            "Loves: Developer experience, progressive enhancement, sensible defaults",
            "Dislikes: Complexity for complexity's sake, steep learning curves",
            "Signature move: v-directives in templates",
            "Catchphrase: 'The Progressive Framework'"
        ]
    }
];

// ============================================================================
// WHEN TO USE EACH FRAMEWORK - DECISION FLOWCHART IN CODE
// ============================================================================

export const FRAMEWORK_DECISION_GUIDE: ICodeExample = {
    title: "Framework Selection Algorithm (in pseudocode)",
    language: "javascript",
    code: `function chooseFramework(projectRequirements) {
  const { 
    teamSize, 
    projectScale, 
    timeline,
    teamExperience,
    needForStructure,
    longTermMaintainability 
  } = projectRequirements;

  if (teamSize === 'large' && projectScale === 'enterprise') {
    // Angular shines with large teams and complex requirements
    if (teamExperience.includes('TypeScript') || timeline === 'long') {
      return 'Angular';
    }
  }

  if (projectScale === 'startup' || timeline === 'aggressive') {
    // React's ecosystem and hiring pool can accelerate development
    if (teamExperience.includes('React') || needForStructure === 'flexible') {
      return 'React';
    }
    // Vue's gentle learning curve helps small teams move fast
    if (teamSize === 'small' || teamExperience === 'mixed') {
      return 'Vue';
    }
  }

  if (teamExperience === 'greenfield') {
    // New teams can choose based on learning preferences
    if (prefers === 'guided-structure') return 'Angular';
    if (prefers === 'max-flexibility') return 'React';
    if (prefers === 'gradual-learning') return 'Vue';
  }

  // When in doubt, prototype with each and see what feels right
  return 'PrototypeWithAllThreeThenDecide';
}`,
    description: "A humorous but practical guide to framework selection based on project and team characteristics."
};

// ============================================================================
// THE FUTURE OF FRONTEND KITCHENS
// ============================================================================

export const FRAMEWORK_FUTURE_TRENDS: ITopicContent = {
    title: "Convergence and Specialization: Where Frameworks Are Heading",

    paragraphs: [
        "Interestingly, all three frameworks are learning from each other. Angular has adopted more reactive patterns, React has embraced more structure with frameworks like Next.js, and Vue has borrowed concepts from both.",
        "The future isn't about one framework 'winning' but about each specializing in what it does best while adopting the best ideas from the ecosystem."
    ],

    sections: [
        {
            heading: "Common Trends Across All Frameworks",
            content: "What all modern frameworks are moving toward",
            list: [
                "Better TypeScript support (even Vue 3 is written in TypeScript!)",
                "Improved developer experience with better tooling",
                "Performance optimizations (smaller bundles, faster updates)",
                "Better server-side rendering and static generation",
                "Improved mobile and native capabilities"
            ]
        },
        {
            heading: "Unique Innovations",
            content: "Framework-specific innovations influencing the ecosystem",
            list: [
                "Angular: Ivy renderer, improved bundle sizes, strict typing",
                "React: Concurrent features, server components, React Forget compiler",
                "Vue: Composition API, Vite build tool, Pinia state management"
            ]
        }
    ],

    bestPractices: [
        "Learn concepts, not just syntax - reactive programming, component design, state management",
        "Consider using a meta-framework (Next.js, Nuxt.js, Angular Universal) for production apps",
        "Don't rewrite everything - sometimes incremental adoption is better",
        "Focus on user experience first, framework choices second",
        "The best framework for your next project might not be the one you know best"
    ]
};