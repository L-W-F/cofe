import { compose } from '@cofe/api';
import { del, getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req, res, { auth: { userId } }) => {
    const id = req.query.id as string;
    const test = (item) => item.id === id && item.userId === userId;

    if (req.method === 'GET') {
      const app = await getOne('apps', test);

      res.status(200).json(app);
    } else if (req.method === 'PATCH') {
      const app = {
        ...(await getOne('apps', test)),
        updatedAt: Date.now(),
        ...req.body,
      };

      await set('apps', app);

      res.status(200).json(app);
    } else if (req.method === 'DELETE') {
      const app = await getOne('apps', test);

      await del('apps', id);

      res.status(200).json(app);
    } else {
      res.status(405).end();
    }
  },
);
