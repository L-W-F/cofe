import type { NextApiRequest, NextApiResponse } from 'next';
import { compose } from '@cofe/api';
import { set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req: NextApiRequest, res: NextApiResponse, { auth: { userId } }) => {
    if (req.method === 'PUT') {
      const id = req.query.id as string;

      const page = await set(
        'pages',
        {
          tree: req.body,
        },
        (item) => item.id === id && item.userId === userId,
      );

      res.status(200).json(page);
    } else {
      res.status(405).end();
    }
  },
);
