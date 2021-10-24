import { CofeSchema } from '@cofe/types';

export const actions: CofeSchema = {
  type: 'mixin:actions',
  actions: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          default: 'onClick',
          enum: ['onClick'],
        },
        action: {
          type: 'string',
          default: 'goto',
          enum: ['goto'],
        },
        params: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['type', 'action'],
    },
  },
};
