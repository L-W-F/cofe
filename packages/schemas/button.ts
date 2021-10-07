import { CofeSchema } from '@cofe/types';

export const button: CofeSchema = {
  type: 'button',
  accept: ['text', 'icon'],
  properties: {
    type: 'object',
    properties: {
      disabled: {
        type: 'boolean',
      },
    },
  },
  actions: {
    type: 'object',
    properties: {
      click: {
        type: 'string',
        const: ['alert'],
      },
    },
  },
  events: {
    type: 'object',
    properties: {
      onClick: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            const: ['alert'],
          },
          payload: {
            type: 'string',
          },
        },
        required: ['type', 'payload'],
      },
    },
  },
};
