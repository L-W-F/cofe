import { CofeAtomModel } from '@cofe/types';

export const TextModel: CofeAtomModel = {
  type: 'text',
  isInline: true,
  properties: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        title: '内容',
        description: '支持 Markdown',
        default: 'COFE',
      },
    },
    required: ['content'],
  },
};
