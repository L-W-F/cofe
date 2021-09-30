import { CofeAtomModel } from '@cofe/types';

export const IconModel: CofeAtomModel = {
  type: 'icon',
  isInline: true,
  properties: {
    type: 'object',
    properties: {
      width: {
        type: 'number',
        title: 'Width',
        default: 24,
      },
      height: {
        type: 'number',
        title: 'Width',
        default: 24,
      },
      color: {
        type: 'string',
        title: 'Color',
        default: 'currentColor',
      },
      path: {
        type: 'string',
        title: 'Path',
        default: 'M 12, 12 m -9, 0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0',
      },
    },
    required: ['path'],
  },
};
