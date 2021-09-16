import type { NextApiRequest, NextApiResponse } from 'next';
import { CofeApp } from '@cofe/types';
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
        const apps = await get('apps', (item) => item.userId === userId);

        console.log(apps);
        res.status(200).json(apps);
      } else if (req.method === 'POST') {
        const app: CofeApp = {
          id: makeId(),
          userId,
          state: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          ...req.body,
        };

        await set('apps', app);

        res.status(201).end(app);
      } else {
        res.status(405).end();
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
