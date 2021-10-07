import type { NextApiRequest, NextApiResponse } from 'next';
import { compose } from '@cofe/api';
import { CofeDbExternal } from '@cofe/types';
import { add, getOne } from '@/db';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch()],
  async (req: NextApiRequest, res: NextApiResponse) => {
    const provider = req.query.provider as string;
    const externalId = req.query.externalId as string;
    const test = (item: CofeDbExternal) =>
      item.provider === provider && item.externalId === externalId;

    if (req.method === 'GET') {
      const { userId } = await getOne('externals', test);

      res.status(200).json(await getOne('users', userId));
    } else if (req.method === 'PUT') {
      const external = await add(
        'externals',
        {
          userId: req.body.userId,
          provider: 'github',
          externalId,
        },
        test,
      );

      res.status(201).json(external);
    } else {
      res.status(405).end();
    }
  },
);
