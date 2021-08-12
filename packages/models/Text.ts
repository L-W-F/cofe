import { CofeAtomModel } from '@cofe/types';

export const TextModel: CofeAtomModel = {
  type: 'text',
  isInline: true,
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
