import type { NextApiRequest, NextApiResponse } from 'next';
import { CofeToken } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { del, getOne, set } from 'db';
import { pick } from 'lodash';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
          expiresAt: Date.now() + 1000 * 60 * 60,
        };

        await set('tokens', token);

        res.status(201).json(pick(token, ['token', 'expiresAt']));
      } else {
        res.status(404).end('username or password is not correct!');
      }
    } else if (req.method === 'DELETE') {
      if (!req.headers.authorization) {
        res.status(401).end();
      } else {
        await del(
          'tokens',
          (item) => `Bearer ${item.token}` === req.headers.authorization,
        );
        res.status(200).end();
      }
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
};
