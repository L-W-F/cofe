import { CofeSchema } from '@cofe/types';

export const button: CofeSchema = {
  type: 'button',
  extends: ['mixin:actions'],
  accept: ['text', 'icon'],
  properties: {
    type: 'object',
    properties: {
      disabled: {
        type: 'boolean',
      },
    },
  },
};
