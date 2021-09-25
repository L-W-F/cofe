import type { NextApiRequest, NextApiResponse } from 'next';
import { compose } from '@cofe/api';
import { getOne, set } from '@/db';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch()],
  async (req: NextApiRequest, res: NextApiResponse) => {
    const provider = req.query.provider as string;
    const externalId = req.query.externalId as string;
    const test = (item) =>
      item.provider === provider && item.externalId === externalId;

    if (req.method === 'GET') {
      const { userId } = await getOne('externals', test);

      res.status(200).json(await getOne('users', userId));
    } else if (req.method === 'PUT') {
      await set('externals', {
        userId: req.body.userId,
        provider: 'github',
        externalId,
      });

      res.status(201).json(await getOne('externals', test));
    } else {
      res.status(405).end();
    }
  },
);
