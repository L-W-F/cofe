import type { NextApiRequest, NextApiResponse } from 'next';
import { CofePage } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { auth } from 'auth';
import { get, set } from 'db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await auth(req.headers.authorization);

    if (!userId) {
      res.status(401).end();
    } else {
      const id = req.query.id as string;

      if (req.method === 'GET') {
        const pages = await get('pages', (item) => item.appId === id);

        res.status(200).json(pages);
      } else if (req.method === 'POST') {
        const page: CofePage = {
          id: makeId(),
          appId: id,
          state: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          ...req.body,
        };

        await set('pages', page);

        res.status(201).end(page);
      } else {
        res.status(405).end();
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
