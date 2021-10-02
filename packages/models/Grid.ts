import { CofeAtomModel } from '@cofe/types';

export const GridModel: CofeAtomModel = {
  type: 'grid',
  accept: ['grid', 'button', 'text', 'icon'],
  properties: {
    type: 'object',
    properties: {
      rows: {
        type: 'number',
        default: 1,
        minimum: 1,
      },
      columns: {
        type: 'number',
        default: 1,
        minimum: 1,
      },
      placeItems: {
        type: 'string',
        default: 'center',
        enum: [
          'center',
          'end',
          'flex-end',
          'flex-start',
          'self-end',
          'self-start',
          'start',
          'baseline',
          'normal',
          'stretch',
        ],
      },
    },
  },
};
