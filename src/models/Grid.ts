import { CofeAtom } from '../types';

export const GridModel: CofeAtom = {
  type: 'grid',
  accept: ['grid', 'button', 'text'],
  properties: {
    type: 'object',
    properties: {
      rows: {
        type: 'number',
        default: 1,
      },
      columns: {
        type: 'number',
        default: 1,
      },
    },
  },
};
