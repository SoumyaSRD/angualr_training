import{b as D,c as T,d as b,e as A}from"./chunk-2NZBT3P2.js";import{b as M}from"./chunk-TCLAS7TI.js";import"./chunk-IDUW3PRR.js";import{$b as y,Aa as a,Cb as t,Db as g,Eb as r,Fb as c,Gb as w,Hb as h,Ib as f,Jb as S,Kb as v,Oa as x,Wb as C,eb as u,fb as n,ga as E,gb as e,pb as d}from"./chunk-2OVPXQV3.js";var N={title:"Angular Data Binding: Traditional vs Signals",tags:["angular","data-binding","signals","ngmodel","reactivity","comparison"],paragraphs:["Angular offers two approaches for handling data flow: Traditional binding (ngModel, @Input/@Output) and modern Signals (Angular 17+).","Both methods connect your data to the UI, but Signals offer better performance with automatic reactivity."],keyPoints:["Traditional: Uses @Input/@Output and ngModel","Modern: Uses signal(), computed(), and model()","Signals are reactive and update automatically","Traditional binding updates whole components","Choose based on your Angular version and needs"],sections:[{heading:"Traditional Data Binding",content:"The classic approach used in Angular 2-16",list:["\u{1F4E5} @Input() - Pass data from parent to child","\u{1F4E4} @Output() - Send events from child to parent","\u{1F504} [(ngModel)] - Two-way binding for forms","\u{1F3F7}\uFE0F Property binding - [property]='value'","\u{1F3AF} Event binding - (event)='handler()'","\u{1F9F5} Requires manual change detection","\u{1F4E6} Updates entire component on changes"]},{heading:"Modern Signals (Angular 17+)",content:"Reactive approach with automatic updates",list:["\u26A1 signal() - Create reactive values","\u{1F9EE} computed() - Create derived values","\u{1F3AF} effect() - Handle side effects","\u{1F504} model() - Two-way binding with Signals","\u{1F680} Automatic dependency tracking","\u{1F3AF} Fine-grained updates (only what changed)","\u{1F4C8} Better performance for complex apps"]},{heading:"Quick Comparison Table",content:"When to use each approach",list:["\u{1F535} Use Traditional if: Maintaining Angular 16 or older app","\u{1F535} Use Traditional if: Team is familiar with old approach","\u{1F535} Use Traditional if: Simple forms and basic data flow","\u{1F7E2} Use Signals if: Starting new Angular 17+ project","\u{1F7E2} Use Signals if: Need better performance","\u{1F7E2} Use Signals if: Complex state management","\u{1F7E1} Use Both if: Gradually migrating to Signals","\u{1F7E1} Use Both if: Mixing old and new components"]},{heading:"Performance Differences",content:"How they affect your app's speed",list:["Traditional: Updates entire component tree","Traditional: Can cause unnecessary re-renders","Traditional: Manual optimization needed","Signals: Updates only specific DOM elements","Signals: Automatic optimization","Signals: Better for large, dynamic apps","Signals: Less boilerplate code"]}],codeExamples:[{title:"Traditional Binding Examples",language:"typescript",code:`// Parent to Child with @Input
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
}`,description:"Classic Angular data binding patterns"},{title:"Signals Examples (Angular 17+)",language:"typescript",code:`// Basic signal usage
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
}`,description:"Modern reactive programming with Signals"},{title:"Migration Example: Converting Old to New",language:"typescript",code:`// OLD WAY (Traditional)
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
}`,description:"How to transition from traditional to Signals"}],bestPractices:["For new Angular 17+ projects, start with Signals","For existing projects, gradually migrate to Signals","Use computed() for values derived from other signals","Avoid using effect() for UI updates - use templates instead","Combine both approaches during migration phase","Update Angular regularly to get latest features","Use model() for two-way binding with Signals","Keep traditional binding for simple, isolated cases","Test both approaches to see performance differences","Follow Angular team recommendations for best practices"]};var W=(()=>{class m{constructor(){this.content=N,this.traditionalValue="Old way",this.signalValue=E("New way"),this.uppercaseSignal=C(()=>this.signalValue().toUpperCase()),this.modelSignal=y("Two-way model")}updateSignal(p){let o=p.target;this.signalValue.set(o.value)}resetTraditional(){this.traditionalValue="Reset old"}resetSignal(){this.signalValue.set("Reset signal")}resetModel(){this.modelSignal.set("Reset model")}static{this.\u0275fac=function(o){return new(o||m)}}static{this.\u0275cmp=x({type:m,selectors:[["app-data-binding"]],inputs:{modelSignal:[1,"modelSignal"]},outputs:{modelSignal:"modelSignalChange"},decls:141,vars:53,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[1,"container"],[1,"live-demo"],[1,"comparison"],[1,"method"],[3,"ngModelChange","ngModel"],[3,"click"],[3,"input","value"],[1,"info"],[1,"code-examples"],[1,"code-example"],[1,"comparison-table"]],template:function(o,i){o&1&&(n(0,"app-topic-template",0)(1,"div",1)(2,"h2"),t(3,"\u{1F4CA} Live Data Binding Comparison"),e(),n(4,"div",2)(5,"h3"),t(6,"\u{1F3AE} Try It Yourself"),e(),n(7,"div",3)(8,"div",4)(9,"h3"),t(10,"\u{1F7E1} Traditional (ngModel)"),e(),n(11,"input",5),v("ngModelChange",function(l){return S(i.traditionalValue,l)||(i.traditionalValue=l),l}),e(),n(12,"p"),t(13),e(),n(14,"button",6),d("click",function(){return i.resetTraditional()}),t(15,"Reset"),e()(),n(16,"div",4)(17,"h3"),t(18,"\u{1F7E2} Modern (Signals)"),e(),n(19,"input",7),d("input",function(l){return i.updateSignal(l)}),e(),n(20,"p"),t(21),e(),n(22,"p"),t(23),e(),n(24,"button",6),d("click",function(){return i.resetSignal()}),t(25,"Reset"),e()(),n(26,"div",4)(27,"h3"),t(28,"\u{1F535} Two-Way Model"),e(),n(29,"input",5),v("ngModelChange",function(l){return S(i.modelSignal,l)||(i.modelSignal=l),l}),e(),n(30,"p"),t(31),e(),n(32,"button",6),d("click",function(){return i.resetModel()}),t(33,"Reset"),e()()(),n(34,"div",8)(35,"h4"),t(36,"\u{1F4A1} Key Differences:"),e(),n(37,"ul")(38,"li")(39,"strong"),t(40,"Traditional:"),e(),t(41," Simpler, but updates whole component "),e(),n(42,"li")(43,"strong"),t(44,"Signals:"),e(),t(45," Reactive, updates only what changed"),e(),n(46,"li")(47,"strong"),t(48,"Model:"),e(),t(49," Best of both worlds (Angular 17.3+)"),e()()()(),n(50,"div",9)(51,"h3"),t(52,"\u{1F4BB} Code Implementation"),e(),n(53,"div",10)(54,"h4"),t(55,"\u{1F7E1} Traditional Binding (TypeScript)"),e(),n(56,"pre")(57,"code"),t(58),e()()(),n(59,"div",10)(60,"h4"),t(61,"\u{1F7E1} Traditional Binding (HTML)"),e(),n(62,"pre")(63,"code"),t(64),e()()(),n(65,"div",10)(66,"h4"),t(67,"\u{1F7E2} Modern Signals (TypeScript)"),e(),n(68,"pre")(69,"code"),t(70),e()()(),n(71,"div",10)(72,"h4"),t(73,"\u{1F7E2} Modern Signals (HTML)"),e(),n(74,"pre")(75,"code"),t(76),e()()(),n(77,"div",10)(78,"h4"),t(79,"\u26A1 Quick Comparison"),e(),n(80,"div",11)(81,"table")(82,"tr")(83,"th"),t(84,"Feature"),e(),n(85,"th"),t(86,"Traditional"),e(),n(87,"th"),t(88,"Signals"),e()(),n(89,"tr")(90,"td"),t(91,"Two-way binding"),e(),n(92,"td")(93,"code"),t(94,'[(ngModel)]="value"'),e()(),n(95,"td")(96,"code"),t(97,'[(ngModel)]="signalValue"'),e(),t(98," or "),n(99,"code"),t(100,"model()"),e()()(),n(101,"tr")(102,"td"),t(103,"One-way binding"),e(),n(104,"td")(105,"code"),t(106),e()(),n(107,"td")(108,"code"),t(109),e()()(),n(110,"tr")(111,"td"),t(112,"Event binding"),e(),n(113,"td")(114,"code"),t(115,'(click)="method()"'),e()(),n(116,"td")(117,"code"),t(118,'(input)="signal.set($event.target.value)"'),e()()(),n(119,"tr")(120,"td"),t(121,"Derived values"),e(),n(122,"td")(123,"code"),t(124),e()(),n(125,"td")(126,"code"),t(127,"computed(() => signal() * 2)"),e()()(),n(128,"tr")(129,"td"),t(130,"Update trigger"),e(),n(131,"td"),t(132,"Manual change detection"),e(),n(133,"td"),t(134,"Automatic reactivity"),e()()()()(),n(135,"div",10)(136,"h4"),t(137,"\u{1F504} Migration Example"),e(),n(138,"pre")(139,"code"),t(140),e()()()()()()),o&2&&(u("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints),a(11),f("ngModel",i.traditionalValue),a(2),r("Value: ",i.traditionalValue),a(6),u("value",i.signalValue()),a(2),r("Value: ",i.signalValue()),a(2),r("Uppercase: ",i.uppercaseSignal()),a(6),f("ngModel",i.modelSignal),a(2),r("Value: ",i.modelSignal()),a(27),h([`
// traditional.component.ts
import `,"{"," Component ","}",` from '@angular/core';
import `,"{"," FormsModule ","}",` from '@angular/forms';

@Component(`,"{",`
  selector: 'app-traditional',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <input [(ngModel)]="username">
    <p>Hello `,"{{username}}",`!</p>
    <button (click)="updateName()">Update</button>
  \`
`,"}",`)
export class TraditionalComponent `,"{",`
  username = 'Guest';
  
  updateName() `,"{",`
    this.username = 'John';
  `,"}",`
`,"}",`
        `]),a(6),r(`
<!-- Parent Component Template -->
<app-traditional></app-traditional>

<!-- With @Input/@Output -->
<app-child 
  [message]="parentMessage" 
  (messageSent)="onMessage($event)">
</app-child>

<!-- Two-way binding -->
<input [(ngModel)]="email">
<p>`,"{{email}}",`</p>
        `),a(6),h([`
// signals.component.ts
import `,"{"," Component, signal, computed, model ","}",` from '@angular/core';
import `,"{"," FormsModule ","}",` from '@angular/forms';

@Component(`,"{",`
  selector: 'app-signals',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <input [value]="username()" 
           (input)="updateUsername($event)">
    <p>Hello `,"{{username()}}",`!</p>
    <p>Uppercase: `,"{{uppercaseName()}}",`</p>
    
    <!-- Model Signal (Angular 17.3+) -->
    <input [(ngModel)]="email">
    <p>Email: `,"{{email()}}",`</p>
  \`
`,"}",`)
export class SignalsComponent `,"{",`
  // Basic signal
  username = signal('Guest');
  
  // Computed signal (auto-updates)
  uppercaseName = computed(() => 
    this.username().toUpperCase()
  );
  
  // Model signal for two-way binding
  email = model('test@example.com');
  
  updateUsername(event: Event) `,"{",`
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  `,"}",`
`,"}",`
        `]),a(6),c(`
<!-- Using signals in template -->
<input [value]="firstName()" 
       (input)="firstName.set($event.target.value)">

<!-- Computed values -->
<p>Full name: `,"{{fullName()}}",`</p>

<!-- Model signal -->
<input [(ngModel)]="emailModel">

<!-- With conditionals -->
<div *ngIf="isLoggedIn()">
  Welcome back, `,"{{userName()}}",`!
</div>
        `),a(30),g("{{value}}"),a(3),g("{{signal()}}"),a(15),c("get computed() ","{"," return this.value * 2; ","}"),a(16),w(`
// OLD WAY (before migration)
export class OldComponent `,"{",`
  searchText = '';
  items = ['Apple', 'Banana', 'Cherry'];
  
  get filteredItems() `,"{",`
    return this.items.filter(item => 
      item.includes(this.searchText)
    );
  `,"}",`
`,"}",`

// NEW WAY (after migration)
export class NewComponent `,"{",`
  searchText = signal('');
  items = signal(['Apple', 'Banana', 'Cherry']);
  
  filteredItems = computed(() => `,"{",`
    return this.items().filter(item => 
      item.includes(this.searchText())
    );
  `,"}",`);
`,"}",`

// TEMPLATE (works with both)
<input [(ngModel)]="searchText"> <!-- Old -->
<!-- OR -->
<input [value]="searchText()" 
       (input)="searchText.set($event.target.value)"> <!-- New -->
        `))},dependencies:[M,A,D,T,b],encapsulation:2})}}return m})();export{W as DataBinding};
