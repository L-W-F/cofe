import { Schema } from '@cofe/core';

Schema.add({
  type: 'icon',
  isInline: true,
  properties: {
    type: 'object',
    properties: {
      width: {
        type: 'number',
        title: '宽度',
        default: 24,
      },
      height: {
        type: 'number',
        title: '高度',
        default: 24,
      },
      color: {
        type: 'string',
        title: '颜色',
        default: 'currentColor',
      },
      path: {
        type: 'string',
        title: '路径',
        default: 'M 12, 12 m -9, 0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0',
      },
    },
    required: ['path'],
  },
});
