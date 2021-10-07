import type { NextApiRequest, NextApiResponse } from 'next';
import { compose } from '@cofe/api';
import { CofeDbPage } from '@cofe/types';
import { delOne, getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req: NextApiRequest, res: NextApiResponse, { auth: { userId } }) => {
    const id = req.query.id as string;
    const test = (item: CofeDbPage) => item.id === id && item.userId === userId;

    if (req.method === 'GET') {
      const page = await getOne('pages', test);

      res.status(200).json(page);
    } else if (req.method === 'PATCH') {
      const page = await set('pages', req.body, test);

      res.status(200).json(page);
    } else if (req.method === 'DELETE') {
      const page = await delOne('pages', test);

      res.status(200).json(page);
    } else {
      res.status(405).end();
    }
  },
);
