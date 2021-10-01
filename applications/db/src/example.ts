import { CofeApp, CofePage, CofeToken, CofeUser } from '@cofe/types';
import { u } from 'unist-builder';

const users: CofeUser[] = [
  {
    id: '_ZcNY8EZVc',
    level: -1,
    username: 'Admin',
    password: '88888',
    enabled: true,
    createdAt: 0,
    updatedAt: 0,
    lastLogin: 0,
  },
];

const tokens: CofeToken[] = [
  {
    userId: '_ZcNY8EZVc',
    token: '_28NoTusa4j',
    expiresAt: 9999999999999,
  },
];

const apps: CofeApp[] = [
  {
    id: '_fXjLwZ8mp',
    userId: '_ZcNY8EZVc',
    title: '第一个应用',
    state: 0,
    createdAt: 0,
    updatedAt: 0,
  },
];

const pages: CofePage[] = [
  {
    id: '_X5z4g9HA8',
    userId: '_ZcNY8EZVc',
    appId: '_fXjLwZ8mp',
    title: '第一个页面',
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
            properties: {
              rows: 1,
              columns: 1,
            },
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
  tokens,
  apps,
  pages,
});
