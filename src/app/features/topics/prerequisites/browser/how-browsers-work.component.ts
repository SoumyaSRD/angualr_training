import { Component } from '@angular/core';
import { BrowserPrerequisites } from '@app/features/topics/constants';
import { ICodeExample, TopicTemplate } from '@app/shared';



@Component({
  selector: 'app-how-browsers-work',
  standalone: true,
  imports: [TopicTemplate],
  templateUrl: './how-browsers-work.component.html',
})
export class HowBrowsersWorkComponent {
  title = 'How Browsers Work';
  tags = ['Fundamentals', 'Web Basics', 'Performance'];

  codeExamples: ICodeExample[] = BrowserPrerequisites.codeExamples;

  keyPoints = BrowserPrerequisites.keyPoints;
}
