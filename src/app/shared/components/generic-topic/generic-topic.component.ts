import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITopicContent } from '@app/shared';
import { GenerateContent, GENERIC_TOPIC_DATA } from '@app/features/topics/constants/generic-topic.const';
import { TopicTemplate } from '../topic-template/topic-template';

@Component({
  selector: 'app-generic-topic',
  standalone: true,
  imports: [CommonModule, TopicTemplate],
  templateUrl: './generic-topic.component.html'
})
export class GenericTopicComponent implements OnInit {
  content: ITopicContent = {
    title: '',
    tags: [],
    paragraphs: []
  };

  private topicData: { [key: string]: ITopicContent } = GENERIC_TOPIC_DATA;


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
