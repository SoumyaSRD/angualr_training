import { Component } from '@angular/core';
import { HttpPrerequisites } from '../../../../constants/prerequisites.const';
import { ICodeExample } from '../../../../interfaces/code-example';
import { TopicTemplateComponent } from '../../../topic-template/topic-template.component';

@Component({
  selector: 'app-http-https',
  standalone: true,
  imports: [TopicTemplateComponent],
  templateUrl: './http-https.component.html',
})
export class HttpHttpsComponent {
  title = 'HTTP & HTTPS';
  tags = ['Web Fundamentals', 'Networking', 'Security'];

  codeExamples: ICodeExample[] = HttpPrerequisites.codeExamples;

  keyPoints = HttpPrerequisites.keyPoints;
}


