import { CofeApp, CofePage, CofeUser } from '@cofe/types';
import { u } from 'unist-builder';

const users: CofeUser[] = [
  {
    id: '_ZcNY8EZVc',
    level: -1,
    username: 'Admin',
    password: '88888',
    config: {
      leftPaneSize: 240,
      rightPaneSize: 0,
    },
    enabled: true,
    createdAt: 0,
    updatedAt: 0,
    lastLogin: 0,
  },
];

const apps: CofeApp[] = [
  {
    id: '_fXjLwZ8mp',
    userId: '_ZcNY8EZVc',
    title: 'My first app',
    state: 0,
    createdAt: 0,
    updatedAt: 0,
  },
];

const pages: CofePage[] = [
  {
    id: '_X5z4g9HA8',
    appId: '_fXjLwZ8mp',
    title: 'My first page',
    tree: u(
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
    ),
    state: 0,
    createdAt: 0,
    updatedAt: 0,
  },
];

export const makeExample = () => ({
  users,
  apps,
  pages,
});