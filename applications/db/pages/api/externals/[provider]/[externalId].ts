import type { NextApiRequest, NextApiResponse } from 'next';
import { compose } from '@cofe/api';
import { add, getOne } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCan } from '@/withApiCan';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiCan(), withApiAuth()],
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    // { auth: { userId } }
  ) => {
    const provider = req.query.provider as string;
    const externalId = req.query.externalId as string;

    if (req.method === 'GET') {
      const { userId } = await getOne(
        'externals',
        (item) => item.provider === provider && item.externalId === externalId,
      );

      const user = await getOne('users', userId);

      res.status(200).json(user);
    } else if (req.method === 'PUT') {
      const external = await add(
        'externals',
        {
          userId: req.body.userId,
          provider: 'github',
          externalId,
        },
        (item) => item.provider === provider && item.externalId === externalId,
      );

      res.status(201).json(external);
    } else {
      res.status(405).end();
    }
  },
);
