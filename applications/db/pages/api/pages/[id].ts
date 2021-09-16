import type { NextApiRequest, NextApiResponse } from 'next';
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
        const page = await getOne('pages', id);

        res.status(200).json(page);
      } else if (req.method === 'PATCH') {
        await set('pages', {
          id,
          updatedAt: Date.now(),
          ...req.body,
        });

        res.status(200).end();
      } else if (req.method === 'DELETE') {
        await del('pages', id);

        res.status(200).end();
      } else {
        res.status(405).end();
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
