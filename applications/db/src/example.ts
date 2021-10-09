import { CofeDbApp, CofeDbPage, CofeDbToken, CofeDbUser } from '@cofe/types';
import { u } from 'unist-builder';

const users: CofeDbUser[] = [
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

const tokens: CofeDbToken[] = [
  {
    userId: '_ZcNY8EZVc',
    token: '_28NoTusa4j',
    expiresAt: 9999999999999,
    createdAt: 0,
    updatedAt: 0,
  },
];

const apps: CofeDbApp[] = [
  {
    id: '_fXjLwZ8mp',
    userId: '_ZcNY8EZVc',
    title: '第一个应用',
    state: 0,
    createdAt: 0,
    updatedAt: 0,
  },
];

const pages: CofeDbPage[] = [
  {
    id: '_X5z4g9HA8',
    userId: '_ZcNY8EZVc',
    appId: '_fXjLwZ8mp',
    title: '第一个页面',
    tree: u(
      'fragment',
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
