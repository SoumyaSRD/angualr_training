import{b as S,c as w,d as E,e as D}from"./chunk-YY7SPPC5.js";import{b as O}from"./chunk-RU5UJ4ZI.js";import{Ab as M,Bb as _,Cb as v,Db as h,Eb as f,Ka as x,Ob as y,Tb as P,ab as p,bb as n,cb as t,db as g,fa as b,jb as d,wb as e,xa as i,xb as u,yb as r,zb as C}from"./chunk-6SFLLJLD.js";var k={title:"Angular Data Binding: Traditional vs Signals",tags:["angular","data-binding","signals","ngmodel","reactivity","comparison"],paragraphs:["Angular offers two approaches for handling data flow: Traditional binding (ngModel, @Input/@Output) and modern Signals (Angular 17+).","Both methods connect your data to the UI, but Signals offer better performance with automatic reactivity."],keyPoints:["Traditional: Uses @Input/@Output and ngModel","Modern: Uses signal(), computed(), and model()","Signals are reactive and update automatically","Traditional binding updates whole components","Choose based on your Angular version and needs"],sections:[{heading:"Traditional Data Binding",content:"The classic approach used in Angular 2-16",list:["\u{1F4E5} @Input() - Pass data from parent to child","\u{1F4E4} @Output() - Send events from child to parent","\u{1F504} [(ngModel)] - Two-way binding for forms","\u{1F3F7}\uFE0F Property binding - [property]='value'","\u{1F3AF} Event binding - (event)='handler()'","\u{1F9F5} Requires manual change detection","\u{1F4E6} Updates entire component on changes"]},{heading:"Modern Signals (Angular 17+)",content:"Reactive approach with automatic updates",list:["\u26A1 signal() - Create reactive values","\u{1F9EE} computed() - Create derived values","\u{1F3AF} effect() - Handle side effects","\u{1F504} model() - Two-way binding with Signals","\u{1F680} Automatic dependency tracking","\u{1F3AF} Fine-grained updates (only what changed)","\u{1F4C8} Better performance for complex apps"]},{heading:"Quick Comparison Table",content:"When to use each approach",list:["\u{1F535} Use Traditional if: Maintaining Angular 16 or older app","\u{1F535} Use Traditional if: Team is familiar with old approach","\u{1F535} Use Traditional if: Simple forms and basic data flow","\u{1F7E2} Use Signals if: Starting new Angular 17+ project","\u{1F7E2} Use Signals if: Need better performance","\u{1F7E2} Use Signals if: Complex state management","\u{1F7E1} Use Both if: Gradually migrating to Signals","\u{1F7E1} Use Both if: Mixing old and new components"]},{heading:"Performance Differences",content:"How they affect your app's speed",list:["Traditional: Updates entire component tree","Traditional: Can cause unnecessary re-renders","Traditional: Manual optimization needed","Signals: Updates only specific DOM elements","Signals: Automatic optimization","Signals: Better for large, dynamic apps","Signals: Less boilerplate code"]}],codeExamples:[{title:"Traditional Binding Examples",language:"typescript",code:`// Parent to Child with @Input
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
}`,description:"How to transition from traditional to Signals"}],bestPractices:["For new Angular 17+ projects, start with Signals","For existing projects, gradually migrate to Signals","Use computed() for values derived from other signals","Avoid using effect() for UI updates - use templates instead","Combine both approaches during migration phase","Update Angular regularly to get latest features","Use model() for two-way binding with Signals","Keep traditional binding for simple, isolated cases","Test both approaches to see performance differences","Follow Angular team recommendations for best practices"]};var V=(()=>{class m{constructor(){this.content=k,this.traditionalValue="Old way",this.signalValue=b("New way"),this.uppercaseSignal=y(()=>this.signalValue().toUpperCase()),this.modelSignal=P("Two-way model")}updateSignal(c){let l=c.target;this.signalValue.set(l.value)}resetTraditional(){this.traditionalValue="Reset old"}resetSignal(){this.signalValue.set("Reset signal")}resetModel(){this.modelSignal.set("Reset model")}static{this.\u0275fac=function(l){return new(l||m)}}static{this.\u0275cmp=x({type:m,selectors:[["app-data-binding"]],inputs:{modelSignal:[1,"modelSignal"]},outputs:{modelSignal:"modelSignalChange"},decls:217,vars:39,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[1,"demo-container"],[1,"demo-title"],[1,"emoji"],[1,"live-demo"],[1,"demo-header"],[1,"comparison"],[1,"method-card","method-card--traditional"],[1,"badge"],[1,"demo-input-group"],["placeholder","Type something...",1,"demo-input",3,"ngModelChange","ngModel"],[1,"demo-output"],[1,"demo-button",3,"click"],[1,"bi","bi-arrow-counterclockwise"],[1,"method-card","method-card--signals"],["placeholder","Type something...",1,"demo-input",3,"input","value"],[1,"method-card","method-card--model"],[1,"info-box"],[1,"code-section"],[1,"section-header"],[1,"code-grid"],[1,"code-block"],[1,"code-header"],[1,"code-icon","code-icon--ts"],[1,"code-content"],[1,"code-icon","code-icon--html"],[1,"code-example"],[1,"comparison-table"],[1,"migration-card"],[1,"info-box",2,"margin-top","0"]],template:function(l,a){l&1&&(n(0,"app-topic-template",0)(1,"div",1)(2,"h2",2)(3,"span",3),e(4,"\u{1F4CA}"),t(),e(5,"Live Data Binding Comparison"),t(),n(6,"div",4)(7,"div",5)(8,"span",3),e(9,"\u{1F3AE}"),t(),n(10,"h3"),e(11,"Try It Yourself"),t()(),n(12,"div",6)(13,"div",7)(14,"h4")(15,"span"),e(16,"\u{1F7E1}"),t(),e(17," Traditional "),n(18,"span",8),e(19,"Classic"),t()(),n(20,"div",9)(21,"label"),e(22,"Enter your name:"),t(),n(23,"input",10),f("ngModelChange",function(o){return h(a.traditionalValue,o)||(a.traditionalValue=o),o}),t()(),n(24,"div",11)(25,"strong"),e(26,"Output:"),t(),e(27),t(),n(28,"button",12),d("click",function(){return a.resetTraditional()}),g(29,"i",13),e(30," Reset "),t()(),n(31,"div",14)(32,"h4")(33,"span"),e(34,"\u{1F7E2}"),t(),e(35," Modern Signals "),n(36,"span",8),e(37,"Reactive"),t()(),n(38,"div",9)(39,"label"),e(40,"Enter your name:"),t(),n(41,"input",15),d("input",function(o){return a.updateSignal(o)}),t()(),n(42,"div",11)(43,"strong"),e(44,"Value:"),t(),e(45),t(),n(46,"div",11)(47,"strong"),e(48,"Computed:"),t(),e(49),t(),n(50,"button",12),d("click",function(){return a.resetSignal()}),g(51,"i",13),e(52," Reset "),t()(),n(53,"div",16)(54,"h4")(55,"span"),e(56,"\u{1F535}"),t(),e(57," Model Signal "),n(58,"span",8),e(59,"New"),t()(),n(60,"div",9)(61,"label"),e(62,"Enter your name:"),t(),n(63,"input",10),f("ngModelChange",function(o){return h(a.modelSignal,o)||(a.modelSignal=o),o}),t()(),n(64,"div",11)(65,"strong"),e(66,"Output:"),t(),e(67),t(),n(68,"button",12),d("click",function(){return a.resetModel()}),g(69,"i",13),e(70," Reset "),t()()(),n(71,"div",17)(72,"h4")(73,"span",3),e(74,"\u{1F4A1}"),t(),e(75,"Key Differences"),t(),n(76,"ul")(77,"li")(78,"strong"),e(79,"Traditional:"),t(),e(80," Uses ngModel for two-way binding. Simple but triggers full change detection. "),t(),n(81,"li")(82,"strong"),e(83,"Signals:"),t(),e(84," Fine-grained reactivity. Only updates components that actually use the signal value."),t(),n(85,"li")(86,"strong"),e(87,"Model Signal:"),t(),e(88," Combines signal reactivity with two-way binding convenience (Angular 17.3+)."),t()()()(),n(89,"div",18)(90,"div",19)(91,"h3"),e(92,"\u{1F4BB} Code Implementation"),t(),n(93,"p"),e(94,"Compare implementation patterns side by side"),t()(),n(95,"div",20)(96,"div",21)(97,"div",22)(98,"span",23),e(99,"TS"),t(),n(100,"h4"),e(101,"Traditional Binding"),t()(),n(102,"div",24)(103,"pre")(104,"code"),e(105),t()()()(),n(106,"div",21)(107,"div",22)(108,"span",25),e(109,"HTML"),t(),n(110,"h4"),e(111,"Template Usage"),t()(),n(112,"div",24)(113,"pre")(114,"code"),e(115),t()()()(),n(116,"div",21)(117,"div",22)(118,"span",23),e(119,"TS"),t(),n(120,"h4"),e(121,"Modern Signals"),t()(),n(122,"div",24)(123,"pre")(124,"code"),e(125),t()()()(),n(126,"div",21)(127,"div",22)(128,"span",25),e(129,"HTML"),t(),n(130,"h4"),e(131,"Signal Template"),t()(),n(132,"div",24)(133,"pre")(134,"code"),e(135),t()()()()(),n(136,"div",26)(137,"h4"),e(138,"\u26A1 Quick Comparison"),t(),n(139,"div",27)(140,"table")(141,"tr")(142,"th"),e(143,"Feature"),t(),n(144,"th"),e(145,"Traditional"),t(),n(146,"th"),e(147,"Signals"),t()(),n(148,"tr")(149,"td"),e(150,"Two-way binding"),t(),n(151,"td")(152,"code"),e(153,'[(ngModel)]="value"'),t()(),n(154,"td")(155,"code"),e(156,'[(ngModel)]="signalValue"'),t(),e(157," or "),n(158,"code"),e(159,"model()"),t()()(),n(160,"tr")(161,"td"),e(162,"One-way binding"),t(),n(163,"td")(164,"code"),e(165),t()(),n(166,"td")(167,"code"),e(168),t()()(),n(169,"tr")(170,"td"),e(171,"Event binding"),t(),n(172,"td")(173,"code"),e(174,'(click)="method()"'),t()(),n(175,"td")(176,"code"),e(177,'(input)="signal.set($event.target.value)"'),t()()(),n(178,"tr")(179,"td"),e(180,"Derived values"),t(),n(181,"td")(182,"code"),e(183),t()(),n(184,"td")(185,"code"),e(186,"computed(() => signal() * 2)"),t()()(),n(187,"tr")(188,"td"),e(189,"Update trigger"),t(),n(190,"td"),e(191,"Manual change detection"),t(),n(192,"td"),e(193,"Automatic reactivity"),t()()()()(),n(194,"div",28)(195,"h4")(196,"span",3),e(197,"\u{1F504}"),t(),e(198,"Migration Tips"),t(),n(199,"div",29)(200,"ul")(201,"li")(202,"strong"),e(203,"Start with new features:"),t(),e(204," Use signals for new components, migrate existing ones gradually."),t(),n(205,"li")(206,"strong"),e(207,"Replace getters with computed:"),t(),e(208," Convert get properties to computed() for automatic reactivity."),t(),n(209,"li")(210,"strong"),e(211,"Use model() for inputs:"),t(),e(212," When you need two-way binding on component inputs."),t(),n(213,"li")(214,"strong"),e(215,"Mixing is okay:"),t(),e(216," Signals and traditional binding can coexist in the same app."),t()()()()()()()),l&2&&(p("title",a.content.title)("tags",a.content.tags)("paragraphs",a.content.paragraphs)("sections",a.content.sections)("codeExamples",a.content.codeExamples)("bestPractices",a.content.bestPractices)("keyPoints",a.content.keyPoints),i(23),v("ngModel",a.traditionalValue),i(4),r(" ",a.traditionalValue," "),i(14),p("value",a.signalValue()),i(4),r(" ",a.signalValue()," "),i(4),r(" ",a.uppercaseSignal()," "),i(14),v("ngModel",a.modelSignal),i(4),r(" ",a.modelSignal()," "),i(38),_([`// traditional.component.ts
import `,"{"," Component ","}",` from '@angular/core';
import `,"{"," FormsModule ","}",` from '@angular/forms';

@Component(`,"{",`
  selector: 'app-traditional',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <input [(ngModel)]="username">
    <p>Hello `,"{{username}}",`!</p>
  \`
`,"}",`)
export class TraditionalComponent `,"{",`
  username = 'Guest';
  
  updateName() `,"{",`
    this.username = 'John';
  `,"}",`
`,"}"]),i(10),r(`<!-- Two-way binding -->
<input [(ngModel)]="email">
<p>`,"{{email}}",`</p>

<!-- Event binding -->
<button (click)="save()">Save</button>

<!-- Property binding -->
<img [src]="imageUrl">

<!-- Attribute binding -->
<div [attr.aria-label]="label"></div>`),i(10),M(`// signals.component.ts
import `,"{"," Component, signal, computed ","}",` from '@angular/core';

@Component(`,"{",`
  selector: 'app-signals',
  standalone: true,
  template: \`...\`
`,"}",`)
export class SignalsComponent `,"{",`
  // Basic signal
  username = signal('Guest');
  
  // Computed signal
  uppercaseName = computed(() => 
    this.username().toUpperCase()
  );
  
  // Update signal
  updateName(value: string) `,"{",`
    this.username.set(value);
  `,"}",`
`,"}"),i(10),r(`<!-- Signal binding -->
<input [value]="firstName()" 
       (input)="firstName.set($event.target.value)">

<!-- Computed values -->
<p>Full name: `,"{{fullName()}}",`</p>

<!-- Signal in conditionals -->
&#64;if (isLoggedIn()) {{
  <p>Welcome user!</p>
&#125;`),i(30),u("{{value}}"),i(3),u("{{signal()}}"),i(15),C("get computed() ","{"," return this.value * 2; ","}"))},dependencies:[O,D,S,w,E],styles:['[_nghost-%COMP%]{display:block}.demo-container[_ngcontent-%COMP%]{max-width:1200px;margin:0 auto;padding:var(--spacing-xl, 2rem)}.demo-title[_ngcontent-%COMP%]{font-size:clamp(1.5rem,4vw,2.25rem);font-weight:800;margin:0 0 var(--spacing-xl, 2rem);color:var(--text-primary);text-align:center;letter-spacing:-.02em}.demo-title[_ngcontent-%COMP%]   .emoji[_ngcontent-%COMP%]{display:inline-block;margin-right:var(--spacing-sm, .5rem);animation:_ngcontent-%COMP%_pulse 2s ease-in-out infinite}@keyframes _ngcontent-%COMP%_pulse{0%,to{transform:scale(1)}50%{transform:scale(1.1)}}.live-demo[_ngcontent-%COMP%]{background:var(--glass-bg);-webkit-backdrop-filter:blur(var(--glass-blur, 12px));backdrop-filter:blur(var(--glass-blur, 12px));border:1px solid var(--glass-border);border-radius:var(--radius-xl, 1.5rem);padding:var(--spacing-xl, 2rem);margin-bottom:var(--spacing-xl, 2rem);box-shadow:var(--shadow-lg),var(--glass-inner-shadow)}.live-demo[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(155deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.03) 50%,transparent 100%);pointer-events:none}.demo-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-sm, .5rem);margin-bottom:var(--spacing-lg, 1.5rem);padding-bottom:var(--spacing-md, 1rem);border-bottom:1px solid var(--glass-border)}.demo-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:var(--font-size-lg, 1.125rem);font-weight:700;margin:0;color:var(--text-primary)}.demo-header[_ngcontent-%COMP%]   .emoji[_ngcontent-%COMP%]{font-size:1.5rem}.comparison[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--spacing-lg, 1.5rem);margin-bottom:var(--spacing-xl, 2rem)}.method-card[_ngcontent-%COMP%]{background:var(--glass-bg-deep);border:1px solid var(--glass-border);border-radius:var(--radius-lg, 1rem);padding:var(--spacing-lg, 1.5rem);transition:all .3s var(--ease-smooth, ease);position:relative;overflow:hidden}.method-card[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:var(--accent-gradient);opacity:0;transition:opacity .3s ease}.method-card[_ngcontent-%COMP%]:hover{transform:translateY(-4px);border-color:var(--glass-border-strong);box-shadow:var(--shadow-md),var(--shadow-glow)}.method-card[_ngcontent-%COMP%]:hover:before{opacity:1}.method-card--traditional[_ngcontent-%COMP%]{--accent-color: #f59e0b;border-left:4px solid #f59e0b}.method-card--signals[_ngcontent-%COMP%]{--accent-color: #10b981;border-left:4px solid #10b981}.method-card--model[_ngcontent-%COMP%]{--accent-color: #3b82f6;border-left:4px solid #3b82f6}.method-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);font-weight:700;margin:0 0 var(--spacing-md, 1rem);color:var(--text-primary);display:flex;align-items:center;gap:var(--spacing-xs, .5rem)}.method-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:2px 8px;border-radius:var(--radius-full, 9999px);background:var(--accent-color);color:#fff}.demo-input-group[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md, 1rem)}.demo-input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;font-size:var(--font-size-sm, .875rem);font-weight:600;color:var(--text-secondary);margin-bottom:var(--spacing-xs, .5rem)}.demo-input[_ngcontent-%COMP%]{width:100%;padding:var(--spacing-sm, .75rem) var(--spacing-md, 1rem);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-md, .75rem);color:var(--text-primary);font-size:var(--font-size-base, 1rem);transition:all .2s ease}.demo-input[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--accent-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent-primary) 20%,transparent)}.demo-input[_ngcontent-%COMP%]::placeholder{color:var(--text-muted)}.demo-output[_ngcontent-%COMP%]{background:var(--glass-bg-deep);border:1px solid var(--glass-border);border-radius:var(--radius-md, .75rem);padding:var(--spacing-sm, .75rem) var(--spacing-md, 1rem);margin-bottom:var(--spacing-sm, .75rem);font-family:var(--font-mono, "Fira Code", monospace);font-size:var(--font-size-sm, .875rem);color:var(--text-secondary)}.demo-output[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--accent-primary);font-weight:600}.demo-button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:var(--spacing-xs, .5rem);padding:var(--spacing-sm, .5rem) var(--spacing-md, 1rem);background:var(--accent-gradient);border:none;border-radius:var(--radius-md, .75rem);color:#fff;font-size:var(--font-size-sm, .875rem);font-weight:600;cursor:pointer;transition:all .2s ease}.demo-button[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:var(--shadow-glow)}.demo-button[_ngcontent-%COMP%]:active{transform:translateY(0)}.demo-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:.875rem}.info-box[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--accent-primary) 8%,transparent);border:1px solid color-mix(in srgb,var(--accent-primary) 25%,transparent);border-radius:var(--radius-lg, 1rem);padding:var(--spacing-lg, 1.5rem);margin-top:var(--spacing-lg, 1.5rem)}.info-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:var(--font-size-md, 1rem);font-weight:700;margin:0 0 var(--spacing-md, 1rem);color:var(--text-primary);display:flex;align-items:center;gap:var(--spacing-xs, .5rem)}.info-box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0;padding-left:var(--spacing-lg, 1.5rem);color:var(--text-secondary)}.info-box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:var(--spacing-xs, .5rem);line-height:1.6}.info-box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{margin-bottom:0}.info-box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--text-primary)}.code-section[_ngcontent-%COMP%]{margin-top:var(--spacing-xxl, 3rem)}.section-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:var(--spacing-xl, 2rem)}.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:clamp(1.25rem,3vw,1.75rem);font-weight:700;margin:0 0 var(--spacing-sm, .5rem);color:var(--text-primary)}.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--text-secondary);margin:0}.code-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:var(--spacing-lg, 1.5rem)}.code-block[_ngcontent-%COMP%]{background:var(--glass-bg-deep);border:1px solid var(--glass-border);border-radius:var(--radius-lg, 1rem);overflow:hidden;transition:all .3s ease}.code-block[_ngcontent-%COMP%]:hover{border-color:var(--glass-border-strong);box-shadow:var(--shadow-md)}.code-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-sm, .5rem);padding:var(--spacing-sm, .75rem) var(--spacing-md, 1rem);background:color-mix(in srgb,var(--glass-bg) 80%,transparent);border-bottom:1px solid var(--glass-border)}.code-header[_ngcontent-%COMP%]   .code-icon[_ngcontent-%COMP%]{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-md, .5rem);font-size:1rem}.code-header[_ngcontent-%COMP%]   .code-icon--ts[_ngcontent-%COMP%]{background:color-mix(in srgb,#3178c6 15%,transparent);color:#3178c6}.code-header[_ngcontent-%COMP%]   .code-icon--html[_ngcontent-%COMP%]{background:color-mix(in srgb,#e34c26 15%,transparent);color:#e34c26}.code-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);font-weight:600;margin:0;color:var(--text-primary)}.code-content[_ngcontent-%COMP%]{padding:var(--spacing-md, 1rem);overflow-x:auto}.code-content[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{margin:0;font-family:var(--font-mono, "Fira Code", monospace);font-size:var(--font-size-sm, .875rem);line-height:1.6;color:var(--text-secondary)}.code-content[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:inherit}.comparison-table-wrapper[_ngcontent-%COMP%]{overflow-x:auto;margin-top:var(--spacing-lg, 1.5rem)}.comparison-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:var(--font-size-sm, .875rem)}.comparison-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .comparison-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:var(--spacing-sm, .75rem) var(--spacing-md, 1rem);text-align:left;border-bottom:1px solid var(--glass-border)}.comparison-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:700;color:var(--text-primary);background:color-mix(in srgb,var(--glass-bg) 60%,transparent)}.comparison-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:var(--text-secondary)}.comparison-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:var(--glass-bg-deep);padding:2px 6px;border-radius:var(--radius-sm, .25rem);font-family:var(--font-mono, "Fira Code", monospace);font-size:.8em;color:var(--accent-primary)}.comparison-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--glass-bg) 40%,transparent)}.migration-card[_ngcontent-%COMP%]{grid-column:1/-1;background:linear-gradient(135deg,color-mix(in srgb,var(--accent-primary) 5%,var(--glass-bg)) 0%,var(--glass-bg) 100%);border:1px solid var(--glass-border);border-radius:var(--radius-lg, 1rem);padding:var(--spacing-xl, 2rem);margin-top:var(--spacing-lg, 1.5rem)}.migration-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:var(--font-size-lg, 1.125rem);font-weight:700;margin:0 0 var(--spacing-lg, 1.5rem);color:var(--text-primary);display:flex;align-items:center;gap:var(--spacing-sm, .5rem)}.migration-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--spacing-lg, 1.5rem)}.migration-item[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:var(--font-size-sm, .875rem);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0 0 var(--spacing-sm, .75rem);color:var(--text-secondary)}.migration-item[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{background:var(--glass-bg-deep);border:1px solid var(--glass-border);border-radius:var(--radius-md, .75rem);padding:var(--spacing-md, 1rem);margin:0;font-family:var(--font-mono, "Fira Code", monospace);font-size:var(--font-size-sm, .8125rem);line-height:1.5;color:var(--text-secondary);overflow-x:auto}.playground[_ngcontent-%COMP%]{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-xl, 1.5rem);padding:var(--spacing-xl, 2rem);margin-top:var(--spacing-xxl, 3rem)}.playground-tabs[_ngcontent-%COMP%]{display:flex;gap:var(--spacing-xs, .5rem);margin-bottom:var(--spacing-lg, 1.5rem);border-bottom:1px solid var(--glass-border);padding-bottom:var(--spacing-sm, .75rem)}.playground-tab[_ngcontent-%COMP%]{padding:var(--spacing-sm, .5rem) var(--spacing-md, 1rem);background:transparent;border:1px solid transparent;border-radius:var(--radius-md, .75rem);color:var(--text-secondary);font-size:var(--font-size-sm, .875rem);font-weight:600;cursor:pointer;transition:all .2s ease}.playground-tab[_ngcontent-%COMP%]:hover{background:var(--glass-bg-deep);color:var(--text-primary)}.playground-tab.active[_ngcontent-%COMP%]{background:var(--accent-gradient);color:#fff;border-color:transparent}.playground-content[_ngcontent-%COMP%]{min-height:200px}@media(max-width:768px){.demo-container[_ngcontent-%COMP%]{padding:var(--spacing-md, 1rem)}.comparison[_ngcontent-%COMP%], .code-grid[_ngcontent-%COMP%], .migration-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.live-demo[_ngcontent-%COMP%]{padding:var(--spacing-md, 1rem)}}@keyframes _ngcontent-%COMP%_fadeInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.method-card[_ngcontent-%COMP%], .code-block[_ngcontent-%COMP%], .info-box[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeInUp .5s ease-out}.method-card[_ngcontent-%COMP%]:nth-child(1){animation-delay:.1s}.method-card[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.method-card[_ngcontent-%COMP%]:nth-child(3){animation-delay:.3s}']})}}return m})();export{V as DataBinding};
