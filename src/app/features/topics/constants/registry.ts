import * as Constants from './index';
import { ITopicContent } from '@app/shared';

export const ALL_TOPIC_CONSTANTS: ITopicContent[] = Object.values(Constants).filter(
  (value) => typeof value === 'object' && value !== null && 'title' in value
) as ITopicContent[];
