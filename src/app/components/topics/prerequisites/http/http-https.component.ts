import { Component } from '@angular/core';
import { HttpPrerequisites } from '../../../../constants/prerequisites.const';
import { ICodeExample } from '../../../../interfaces/code-example';
import { TopicTemplate } from '../../../topic-template/topic-template';

@Component({
  selector: 'app-http-https',
  standalone: true,
  imports: [TopicTemplate],
  templateUrl: './http-https.component.html',
})
export class HttpHttpsComponent {
  title = 'HTTP & HTTPS';
  tags = ['Web Fundamentals', 'Networking', 'Security'];

  codeExamples: ICodeExample[] = HttpPrerequisites.codeExamples;

  keyPoints = HttpPrerequisites.keyPoints;
}


