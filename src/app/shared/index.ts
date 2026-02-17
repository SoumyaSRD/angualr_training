/**
 * Shared module - reusable UI, pipes, directives, models.
 * Import from '@app/shared'.
 */

// Models
export type { ICodeExample } from './models/code-example';
export type { ITopicContent, ISection } from './models/topic';

// Pipes
export { CustomFilterPipe } from './pipes/custom-filter.pipe';

// Directives
export { VisibleIfDirective } from './directives/visible-if.directive';

// Shared components (re-export from current location to avoid moving templates)
export { TopicTemplate } from '../components/topic-template/topic-template';
