import { CofeSchema } from '@cofe/types';

export const LinkSchema: CofeSchema = {
  type: 'link',
  accept: ['text', 'icon'],
  isInline: true,
  properties: {
    type: 'object',
    properties: {
      disabled: {
        type: 'boolean',
      },
      href: {
        type: 'string',
      },
      isExternal: {
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
