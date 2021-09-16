import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from 'auth';
import { getOne } from 'db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await auth(req.headers.authorization);

    if (!userId) {
      res.status(401).end();
    } else {
      if (req.method === 'GET') {
        const id = req.query.id as string;

        const snapshot = await getOne(
          'snapshots',
          (item) => item.pageId === id,
        );

        res.status(200).json(snapshot?.stack ?? []);
      } else {
        res.status(405).end();
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
