import { compose } from '@cofe/api';
import { makeId } from '@cofe/utils';
import { add, del, delOne, getOne, set } from '@/db';
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
    if (req.method === 'POST') {
      const user = await getOne(
        'users',
        (item) =>
          item.username === req.body.username &&
          item.password === req.body.password,
      );

      user.lastLogin = Date.now();

      await set('users', user);

      // 清除当前用户旧的 token
      await del('tokens', (item) => item.userId === user.id);

      const token = await add(
        'tokens',
        {
          userId: user.id,
          token: makeId(),
          expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
        },
        (item) => item.userId === user.id,
      );

      res.status(201).json(token);
    } else if (req.method === 'DELETE') {
      await delOne(
        'tokens',
        (item) => `Bearer ${item.token}` === req.headers.authorization,
      );

      res.status(200).end();
    } else {
      res.status(405).end();
    }
  },
);
