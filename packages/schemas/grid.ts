import { CofeSchema } from '@cofe/types';

export const grid: CofeSchema = {
  type: 'grid',
  accept: ['!fragment'],
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
