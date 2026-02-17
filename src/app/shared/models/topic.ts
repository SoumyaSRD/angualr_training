import type { ICodeExample } from './code-example';

export interface ITopicContent {
  title?: string;
  tags?: string[];
  paragraphs?: string[];
  keyPoints?: string[];
  sections?: ISection[];
  codeExamples?: ICodeExample[];
  bestPractices?: string[];
}

export interface ISection {
  id?: string;
  heading?: string;
  content?: string;
  list?: string[];
  additionalExplanation?: string;
}
