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
        const user = await getOne('users', id);

        res.status(200).json(user);
      } else if (req.method === 'PATCH') {
        await set('users', {
          id,
          updatedAt: Date.now(),
          ...req.body,
        });

        res.status(200).end();
      } else if (req.method === 'DELETE') {
        await del('users', id);

        res.status(200).end();
      } else {
        res.status(405).end();
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
