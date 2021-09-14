import { CofeApp, CofePage } from '@cofe/types';
import { u } from 'unist-builder';

const examplePage: CofePage = u(
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

const exampleApp: CofeApp = {
  id: '_kxw3SWUUg',
  name: 'Example',
};

export const example = {
  _1: {
    config: {
      leftPaneSize: 240,
      rightPaneSize: 240,
    },
    apps: [exampleApp],
    pages: [examplePage],
  },
};
