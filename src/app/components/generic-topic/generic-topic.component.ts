import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenerateContent, GENERIC_TOPIC_DATA } from '../../constants/generic-topic.const';
import { TopicTemplateComponent } from '../topic-template/topic-template.component';
import { ICodeExample } from '../../interfaces/code-example';

interface TopicContent {
  title: string;
  tags: string[];
  paragraphs: string[];
  sections?: {
    heading: string;
    content: string;
    list?: string[];
  }[];
  codeExamples?: ICodeExample[];
  keyPoints?: string[];
}

@Component({
  selector: 'app-generic-topic',
  standalone: true,
  imports: [CommonModule, TopicTemplateComponent],
  templateUrl: './generic-topic.component.html'
})
export class GenericTopicComponent implements OnInit {
  content: TopicContent = {
    title: '',
    tags: [],
    paragraphs: []
  };

  private topicData: { [key: string]: TopicContent } = GENERIC_TOPIC_DATA;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');
    const fullPath = '/' + currentPath;

    if (this.topicData[fullPath]) {
      this.content = this.topicData[fullPath];
    } else {
      const title = currentPath.split('/').pop()?.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ') || 'Topic';

      this.content = GenerateContent(title);
    }
  }
}
