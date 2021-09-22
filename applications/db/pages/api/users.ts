import { CofeUser } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { get, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default withApiCatch(
  withApiAuth(
    async (req, res) => {
      if (req.method === 'GET') {
        const users = await get('users');

        res.status(200).json(users);
      } else if (req.method === 'POST') {
        const users = await get(
          'users',
          (item) => item.username === req.body.username,
        );

        if (users.length) {
          res.status(409).end('账号已存在！');
        } else {
          const user: CofeUser = {
            id: makeId(),
            level: 0,
            config: {},
            enabled: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            lastLogin: 0,
            ...req.body,
          };

          await set('users', user);

          res.status(201).json(user);
        }
      } else {
        res.status(405).end();
      }
    },
    (req) => req.method === 'POST',
  ),
);
