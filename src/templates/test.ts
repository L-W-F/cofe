import { u } from 'unist-builder';
import { CofeTree } from '../types';

export const test: CofeTree = u(
  'root',
  {
    id: '_CMTfvJfoS',
    createdAt: Date.now(),
  },
  [
    u(
      'grid',
      {
        id: '_HqoZgh82S',
      },
      [
        u('text', {
          id: '_eEHtQ7M4d',
        }),
      ],
    ),
  ],
);
