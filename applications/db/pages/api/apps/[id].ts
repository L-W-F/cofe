import { compose } from '@cofe/api';
import { CofeDbApp } from '@cofe/types';
import { delOne, getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req, res, { auth: { userId } }) => {
    const id = req.query.id as string;
    const test = (item: CofeDbApp) => item.id === id && item.userId === userId;

    if (req.method === 'GET') {
      const app = await getOne('apps', test);

      res.status(200).json(app);
    } else if (req.method === 'PATCH') {
      const app = await set('apps', req.body, test);

      res.status(200).json(app);
    } else if (req.method === 'DELETE') {
      await delOne('apps', test);

      res.status(200).json(null);
    } else {
      res.status(405).end();
    }
  },
);
