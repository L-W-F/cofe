import { compose } from '@cofe/api';
import { add, get } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [
    withApiCatch(),
    withApiAuth({
      predicate: (req) => req.method === 'POST',
    }),
  ],
  async (req, res) => {
    if (req.method === 'GET') {
      const users = await get(
        'users',
        req.query.username
          ? ({ username }) => req.query.username === username
          : undefined,
      );

      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const user = await add(
        'users',
        {
          level: 0,
          enabled: true,
          lastLogin: 0,
          ...req.body,
        },
        (item) => item.username === req.body.username,
      );

      res.status(201).json(user);
    } else {
      res.status(405).end();
    }
  },
);
