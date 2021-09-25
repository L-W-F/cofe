import { compose } from '@cofe/api';
import { CofeToken } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { pick } from 'lodash';
import { del, getOne, set } from '@/db';
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

      if (user) {
        user.lastLogin = Date.now();

        await set('users', user);

        await del('tokens', (item) => item.userId === user.id);

        const token: CofeToken = {
          userId: user.id,
          token: makeId(),
          expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
        };

        await set('tokens', token);

        res.status(201).json(pick(token, ['token', 'expiresAt']));
      } else {
        res.status(404).end('用户名或密码不正确！');
      }
    } else if (req.method === 'DELETE') {
      await del(
        'tokens',
        (item) => `Bearer ${item.token}` === req.headers.authorization,
      );

      res.status(200).end();
    } else {
      res.status(405).end();
    }
  },
);
