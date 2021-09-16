import { CofeUser } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { get, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default withApiCatch(
  withApiAuth(async (req, res) => {
    if (req.method === 'GET') {
      const users = await get('users');

      res.status(200).json(users);
    } else if (req.method === 'POST') {
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
    } else {
      res.status(405).end();
    }
  }),
);
