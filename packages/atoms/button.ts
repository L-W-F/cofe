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
      // fullWidth: {
      //   type: 'boolean',
      //   default: false,
      // },
      // variant: {
      //   type: 'string',
      //   enum: ['contained', 'outlined', 'ghost', 'text'],
      //   default: 'contained',
      // },
    },
  },
});
