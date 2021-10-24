import { CofeSchema } from '@cofe/types';

export const link: CofeSchema = {
  type: 'link',
  extends: ['mixin:actions'],
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
};
