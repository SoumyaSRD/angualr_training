

// ============================================================================
// ANGULAR DATA BINDING: COMPLETE GUIDE
// ============================================================================

import { ITopicContent } from "../../../../interfaces/topic";

export const ANGULAR_DATA_BINDING_GUIDE: ITopicContent = {
    title: "Angular Data Binding: Traditional vs Signals",
    tags: ["angular", "data-binding", "signals", "ngmodel", "reactivity", "comparison"],

    paragraphs: [
        "Angular offers two approaches for handling data flow: Traditional binding (ngModel, @Input/@Output) and modern Signals (Angular 17+).",
        "Both methods connect your data to the UI, but Signals offer better performance with automatic reactivity."
    ],

    keyPoints: [
        "Traditional: Uses @Input/@Output and ngModel",
        "Modern: Uses signal(), computed(), and model()",
        "Signals are reactive and update automatically",
        "Traditional binding updates whole components",
        "Choose based on your Angular version and needs"
    ],

    sections: [
        {
            heading: "Traditional Data Binding",
            content: "The classic approach used in Angular 2-16",
            list: [
                "📥 @Input() - Pass data from parent to child",
                "📤 @Output() - Send events from child to parent",
                "🔄 [(ngModel)] - Two-way binding for forms",
                "🏷️ Property binding - [property]='value'",
                "🎯 Event binding - (event)='handler()'",
                "🧵 Requires manual change detection",
                "📦 Updates entire component on changes"
            ]
        },
        {
            heading: "Modern Signals (Angular 17+)",
            content: "Reactive approach with automatic updates",
            list: [
                "⚡ signal() - Create reactive values",
                "🧮 computed() - Create derived values",
                "🎯 effect() - Handle side effects",
                "🔄 model() - Two-way binding with Signals",
                "🚀 Automatic dependency tracking",
                "🎯 Fine-grained updates (only what changed)",
                "📈 Better performance for complex apps"
            ]
        },
        {
            heading: "Quick Comparison Table",
            content: "When to use each approach",
            list: [
                "🔵 Use Traditional if: Maintaining Angular 16 or older app",
                "🔵 Use Traditional if: Team is familiar with old approach",
                "🔵 Use Traditional if: Simple forms and basic data flow",
                "🟢 Use Signals if: Starting new Angular 17+ project",
                "🟢 Use Signals if: Need better performance",
                "🟢 Use Signals if: Complex state management",
                "🟡 Use Both if: Gradually migrating to Signals",
                "🟡 Use Both if: Mixing old and new components"
            ]
        },
        {
            heading: "Performance Differences",
            content: "How they affect your app's speed",
            list: [
                "Traditional: Updates entire component tree",
                "Traditional: Can cause unnecessary re-renders",
                "Traditional: Manual optimization needed",
                "Signals: Updates only specific DOM elements",
                "Signals: Automatic optimization",
                "Signals: Better for large, dynamic apps",
                "Signals: Less boilerplate code"
            ]
        }
    ],

    codeExamples: [
        {
            title: "Traditional Binding Examples",
            language: "typescript",
            code: `// Parent to Child with @Input
@Component({
  selector: 'app-parent',
  template: \`<app-child [message]="parentMessage"></app-child>\`
})
export class ParentComponent {
  parentMessage = 'Hello from parent!';
}

@Component({
  selector: 'app-child',
  template: \`<p>{{message}}</p>\`
})
export class ChildComponent {
  @Input() message!: string;
}

// Child to Parent with @Output
@Component({
  selector: 'app-child',
  template: \`
    <button (click)="sendMessage()">Send Message</button>
  \`
})
export class ChildComponent {
  @Output() messageSent = new EventEmitter<string>();
  
  sendMessage() {
    this.messageSent.emit('Hello from child!');
  }
}

// Two-way binding with ngModel
@Component({
  template: \`
    <input [(ngModel)]="username">
    <p>Welcome, {{username}}!</p>
  \`
})
export class UserFormComponent {
  username = 'Guest';
}`,
            description: "Classic Angular data binding patterns"
        },
        {
            title: "Signals Examples (Angular 17+)",
            language: "typescript",
            code: `// Basic signal usage
import { signal, computed } from '@angular/core';

@Component({
  template: \`
    <input [value]="firstName()" (input)="firstName.set($event.target.value)">
    <input [value]="lastName()" (input)="lastName.set($event.target.value)">
    <p>Full Name: {{fullName()}}</p>
  \`
})
export class UserComponent {
  firstName = signal('John');
  lastName = signal('Doe');
  
  // Automatically updates when dependencies change
  fullName = computed(() => \`\${this.firstName()} \${this.lastName()}\`);
}

// Two-way binding with model() (Angular 17.3+)
import { model } from '@angular/core';

@Component({
  template: \`
    <input [(ngModel)]="email">
    <p>Your email: {{email()}}</p>
  \`
})
export class FormComponent {
  email = model('user@example.com');
}

// Effect for side operations
import { effect } from '@angular/core';

@Component({
  template: \`<p>Count: {{count()}}</p>\`
})
export class CounterComponent {
  count = signal(0);
  
  constructor() {
    // Runs when count changes
    effect(() => {
      console.log('Count changed to:', this.count());
    });
  }
}`,
            description: "Modern reactive programming with Signals"
        },
        {
            title: "Migration Example: Converting Old to New",
            language: "typescript",
            code: `// OLD WAY (Traditional)
@Component({
  template: \`
    <input [(ngModel)]="searchQuery">
    <p>Results: {{filteredItems.length}}</p>
  \`
})
export class OldSearchComponent {
  searchQuery = '';
  items = ['Apple', 'Banana', 'Cherry'];
  
  get filteredItems() {
    return this.items.filter(item => 
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

// NEW WAY (Signals)
@Component({
  template: \`
    <input [value]="searchQuery()" (input)="searchQuery.set($event.target.value)">
    <p>Results: {{filteredItems().length}}</p>
  \`
})
export class NewSearchComponent {
  searchQuery = signal('');
  items = signal(['Apple', 'Banana', 'Cherry']);
  
  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.items().filter(item => 
      item.toLowerCase().includes(query)
    );
  });
}

// MIXED APPROACH (During Migration)
@Component({
  template: \`
    <!-- Still using old ngModel for now -->
    <input [(ngModel)]="legacyValue">
    
    <!-- New components use signals -->
    <app-new-component [data]="newSignal()"></app-new-component>
  \`
})
export class MixedComponent {
  legacyValue = 'Old value';  // Will migrate later
  newSignal = signal('New reactive value');
}`,
            description: "How to transition from traditional to Signals"
        }
    ],

    bestPractices: [
        "For new Angular 17+ projects, start with Signals",
        "For existing projects, gradually migrate to Signals",
        "Use computed() for values derived from other signals",
        "Avoid using effect() for UI updates - use templates instead",
        "Combine both approaches during migration phase",
        "Update Angular regularly to get latest features",
        "Use model() for two-way binding with Signals",
        "Keep traditional binding for simple, isolated cases",
        "Test both approaches to see performance differences",
        "Follow Angular team recommendations for best practices"
    ]
};