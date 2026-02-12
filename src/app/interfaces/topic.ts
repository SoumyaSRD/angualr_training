import { ICodeExample } from "./code-example";

export interface ITopicContent {
    title?: string;
    tags?: string[];

    paragraphs?: string[];
    keyPoints?: string[];

    sections?: ISection[];

    codeExamples?: ICodeExample[];

    bestPractices?: string[];
}

/**
 * Interface representing a section in the Angular introduction content
 */
export interface ISection {
    id?: string;
    heading?: string;
    content?: string;
    list?: string[];
    additionalExplanation?: string; // Optional property for extra explanations
}

/**
 * Main interface representing the Angular Introduction content structure
 */


