import{R as u,j as m}from"./chunk-QXA3BHRF.js";import"./chunk-6J7NVHL7.js";import{Cb as e,Ma as c,db as a,eb as n,fb as t,gb as l,za as s}from"./chunk-LWJ6XB4K.js";var v=(()=>{class r{constructor(){this.content=u,this.subjectExample=`
const subject = new Subject<number>();

subject.subscribe(value => console.log('Subscriber A:', value));
subject.subscribe(value => console.log('Subscriber B:', value));

subject.next(1);
subject.next(2);
`,this.behaviorSubjectExample=`
const behavior = new BehaviorSubject<number>(0);

behavior.subscribe(value => console.log('First:', value));

behavior.next(1);
behavior.next(2);

behavior.subscribe(value => console.log('Second:', value));
`,this.replaySubjectExample=`
const replay = new ReplaySubject<number>(2);

replay.next(1);
replay.next(2);
replay.next(3);

replay.subscribe(value => console.log(value));
`,this.asyncSubjectExample=`
const async = new AsyncSubject<number>();

async.subscribe(value => console.log(value));

async.next(1);
async.next(2);
async.complete();
`}static{this.\u0275fac=function(o){return new(o||r)}}static{this.\u0275cmp=c({type:r,selectors:[["app-rxjs-subject"]],decls:110,vars:11,consts:[[3,"title","tags","paragraphs","sections","codeExamples","bestPractices","keyPoints"],[3,"textContent"]],template:function(o,i){o&1&&(n(0,"app-topic-template",0)(1,"h3"),e(2,"RxJS Subjects Introduction"),t(),n(3,"p"),e(4," RxJS Subjects are a special type of Observable that allow values to be multicasted to multiple subscribers simultaneously. Unlike regular Observables, which are typically unicast (each subscriber receives its own execution), Subjects act as both an "),n(5,"strong"),e(6,"Observable"),t(),e(7," and an "),n(8,"strong"),e(9,"Observer"),t(),e(10,". This means they can emit values as well as allow subscriptions to receive those values. "),t(),n(11,"p"),e(12," Subjects are widely used in Angular applications for event communication, state sharing, and reactive data flow between components or services. They provide a flexible way to manage streams of data where multiple parts of the application need to listen to or emit updates. "),t(),n(13,"h3"),e(14,"Key Characteristics of Subjects"),t(),n(15,"ul")(16,"li")(17,"strong"),e(18,"Multicast:"),t(),e(19," Multiple subscribers receive the same emitted values. "),t(),n(20,"li")(21,"strong"),e(22,"Observer + Observable:"),t(),e(23," Can both emit and listen to data. "),t(),n(24,"li")(25,"strong"),e(26,"Hot Observable:"),t(),e(27," Starts emitting values regardless of subscribers. "),t(),n(28,"li")(29,"strong"),e(30,"Real-time Updates:"),t(),e(31," Useful for event-driven architectures. "),t()(),n(32,"h3"),e(33,"Creating and Using a Subject"),t(),n(34,"p"),e(35," A Subject can be created using the RxJS "),n(36,"code"),e(37,"Subject"),t(),e(38," class. Values are emitted using the "),n(39,"code"),e(40,"next()"),t(),e(41," method, and subscribers receive updates whenever new values are pushed. "),t(),n(42,"pre"),l(43,"code",1),e(44,`
`),t(),n(45,"h3"),e(46,"Types of RxJS Subjects"),t(),n(47,"h4"),e(48,"1. Subject"),t(),n(49,"p"),e(50," The basic Subject does not store previous values. Subscribers only receive values emitted after they subscribe. "),t(),n(51,"h4"),e(52,"2. BehaviorSubject"),t(),n(53,"p"),e(54," BehaviorSubject stores the latest value and immediately emits it to new subscribers. It requires an initial value and is commonly used for state management. "),t(),n(55,"pre"),l(56,"code",1),e(57,`
`),t(),n(58,"h4"),e(59,"3. ReplaySubject"),t(),n(60,"p"),e(61," ReplaySubject stores multiple previous values and replays them to new subscribers. Developers can specify how many values should be replayed. "),t(),n(62,"pre"),l(63,"code",1),e(64,`
`),t(),n(65,"h4"),e(66,"4. AsyncSubject"),t(),n(67,"p"),e(68," AsyncSubject emits only the final value when the observable completes. It is useful when only the last result is important. "),t(),n(69,"pre"),l(70,"code",1),e(71,`
`),t(),n(72,"h3"),e(73,"Common Angular Use Cases"),t(),n(74,"ul")(75,"li"),e(76," Component-to-component communication using shared services. "),t(),n(77,"li"),e(78," Managing application state. "),t(),n(79,"li"),e(80," Broadcasting events across the application. "),t(),n(81,"li"),e(82," Handling real-time data updates. "),t()(),n(83,"h3"),e(84,"Subject vs Observable"),t(),n(85,"ul")(86,"li"),e(87," Observables are unicast by default; Subjects are multicast. "),t(),n(88,"li"),e(89," Observables usually produce values internally; Subjects allow manual emission. "),t(),n(90,"li"),e(91," Subjects are often used as event emitters. "),t()(),n(92,"h3"),e(93,"Best Practices for Using Subjects"),t(),n(94,"ul")(95,"li"),e(96," Use BehaviorSubject when maintaining application state. "),t(),n(97,"li"),e(98," Avoid exposing Subject directly; expose as Observable using "),n(99,"code"),e(100,"asObservable()"),t(),e(101,". "),t(),n(102,"li"),e(103," Unsubscribe when necessary to prevent memory leaks. "),t(),n(104,"li"),e(105," Use Subjects only when multicasting is required. "),t()(),n(106,"h3"),e(107,"Summary"),t(),n(108,"p"),e(109," RxJS Subjects provide a powerful way to share and emit data streams across multiple subscribers. By combining observer and observable capabilities, Subjects enable flexible reactive communication patterns in Angular applications. Understanding different Subject types helps developers choose the right tool for state management, event handling, and reactive workflows. "),t()()),o&2&&(a("title",i.content.title)("tags",i.content.tags)("paragraphs",i.content.paragraphs)("sections",i.content.sections)("codeExamples",i.content.codeExamples)("bestPractices",i.content.bestPractices)("keyPoints",i.content.keyPoints),s(43),a("textContent",i.subjectExample),s(13),a("textContent",i.behaviorSubjectExample),s(7),a("textContent",i.replaySubjectExample),s(7),a("textContent",i.asyncSubjectExample))},dependencies:[m],encapsulation:2})}}return r})();export{v as RxjsSubject};
