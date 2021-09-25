import type { NextApiRequest, NextApiResponse } from 'next';
import { compose } from '@cofe/api';
import { del, getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req: NextApiRequest, res: NextApiResponse, { auth: { userId } }) => {
    const id = req.query.id as string;
    const test = (item) => item.id === id && item.userId === userId;

    if (req.method === 'GET') {
      const page = await getOne('pages', test);

      res.status(200).json(page);
    } else if (req.method === 'PATCH') {
      const page = {
        ...(await getOne('pages', test)),
        updatedAt: Date.now(),
        ...req.body,
      };

      await set('pages', page);

      res.status(200).json(page);
    } else if (req.method === 'DELETE') {
      const page = await getOne('pages', test);

      await del('pages', id);

      res.status(200).json(page);
    } else {
      res.status(405).end();
    }
  },
);
