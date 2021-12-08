import { TextRenderer } from './renderers/Text';

export const text = {
  type: 'text',
  isInline: true,
  properties: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        title: '内容',
        description: '支持 Markdown',
      },
    },
    required: ['content'],
  },
  renderer: TextRenderer,
};
