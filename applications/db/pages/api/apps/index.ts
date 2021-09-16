import { CofeApp } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { get, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default withApiCatch(
  withApiAuth(async (req, res, userId) => {
    if (req.method === 'GET') {
      res.status(200).json(await get('apps', (item) => item.userId === userId));
    } else if (req.method === 'POST') {
      const app: CofeApp = {
        id: makeId(),
        userId,
        state: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...req.body,
      };

      await set('apps', app);

      res.status(201).json(app);
    } else {
      res.status(405).end();
    }
  }),
);
