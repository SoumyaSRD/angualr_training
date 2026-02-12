import { Component } from '@angular/core';
import { ICodeExample } from '../../../../interfaces/code-example';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { BrowserPrerequisites } from '../../../../constants/prerequisites.const';



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
