import { Component } from '@angular/core';
import { HttpPrerequisites } from '@app/features/topics/constants';
import { ICodeExample, TopicTemplate } from '@app/shared';

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


