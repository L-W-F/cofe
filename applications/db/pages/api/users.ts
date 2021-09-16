import type { NextApiRequest, NextApiResponse } from 'next';
import { CofeUser } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { auth } from 'auth';
import { get, set } from 'db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await auth(req.headers.authorization);

    if (!userId) {
      res.status(401).end();
    } else {
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

        res.status(201).end(user);
      } else {
        res.status(405).end();
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
