import type { NextApiRequest, NextApiResponse } from 'next';
import { getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default withApiCatch(
  withApiAuth(async (req: NextApiRequest, res: NextApiResponse, userId) => {
    const id = req.query.id as string;
    const test = (item) => item.id === id && item.userId === userId;

    if (req.method === 'PUT') {
      await set(
        'pages',
        {
          tree: req.body,
        },
        test,
      );

      res.status(200).json(await getOne('pages', test));
    } else {
      res.status(405).end();
    }
  }),
);