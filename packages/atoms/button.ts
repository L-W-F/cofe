import { Schema } from '@cofe/core';

Schema.add({
  type: 'button',
  extends: ['mixin:actions'],
  accept: ['text', 'icon'],
  isInline: true,
  properties: {
    type: 'object',
    properties: {
      disabled: {
        type: 'boolean',
      },
    },
  },
});
