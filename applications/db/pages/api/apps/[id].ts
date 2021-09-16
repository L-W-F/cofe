import type { NextApiRequest, NextApiResponse } from 'next';
import { makeId } from '@cofe/utils';
import { auth } from 'auth';
import { del, getOne, set } from 'db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await auth(req.headers.authorization);

    if (!userId) {
      res.status(401).end();
    } else {
      const id = req.query.id as string;

      if (req.method === 'GET') {
        const app = await getOne(
          'apps',
          (item) => item.id === id && item.userId === userId,
        );

        res.status(200).json(app);
      } else if (req.method === 'POST') {
        await set('apps', {
          id: makeId(),
          userId,
          state: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          ...req.body,
        });

        res.status(200).end();
      } else if (req.method === 'PATCH') {
        await set('apps', {
          id,
          updatedAt: Date.now(),
          ...req.body,
        });

        res.status(200).end();
      } else if (req.method === 'DELETE') {
        await del('apps', id);

        res.status(200).end();
      } else {
        res.status(405).end();
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
