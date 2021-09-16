import type { NextApiRequest, NextApiResponse } from 'next';
import { getOne } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default withApiCatch(
  withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
    const pageId = req.query.id as string;
    const test = (item) => item.pageId === pageId;

    if (req.method === 'GET') {
      const snapshot = await getOne('snapshots', test).catch(() => null);

      res.status(200).json(snapshot?.stack ?? []);
    } else {
      res.status(405).end();
    }
  }),
);
