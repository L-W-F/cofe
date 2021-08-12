import { CofeAtom } from '../types';

export const ButtonModel: CofeAtom = {
  type: 'button',
  accept: ['test'],
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
