import { Component } from '@angular/core';
import { ICodeExample } from '../../../../interfaces/code-example';
import { TopicTemplateComponent } from '../../../topic-template/topic-template.component';
import { BrowserPrerequisites } from '../../../../constants/prerequisites.const';



@Component({
  selector: 'app-how-browsers-work',
  standalone: true,
  imports: [TopicTemplateComponent],
  templateUrl: './how-browsers-work.component.html',
})
export class HowBrowsersWorkComponent {
  title = 'How Browsers Work';
  tags = ['Fundamentals', 'Web Basics', 'Performance'];

  codeExamples: ICodeExample[] = BrowserPrerequisites.codeExamples;

  keyPoints = BrowserPrerequisites.keyPoints;
}
