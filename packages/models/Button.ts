import { CofeAtomModel } from '@cofe/types';

export const ButtonModel: CofeAtomModel = {
  type: 'button',
  accept: ['text'],
  // isInline: true,
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
