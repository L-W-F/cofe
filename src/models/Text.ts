import { CofeAtom } from '../types';

export const TextModel: CofeAtom = {
  type: 'text',
  isInline: true,
  isLeaf: true,
  properties: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        title: 'Content',
        description: 'plain text',
      },
    },
    required: ['content'],
  },
};
