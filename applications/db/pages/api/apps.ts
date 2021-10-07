import { compose } from '@cofe/api';
import { add, get } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req, res, { auth: { userId } }) => {
    if (req.method === 'GET') {
      const apps = await get('apps', (item) => item.userId === userId);

      res.status(200).json(apps);
    } else if (req.method === 'POST') {
      const app = await add(
        'apps',
        {
          userId,
          state: 0,
          ...req.body,
        },
        (item) => item.userId === userId && item.title === req.body.title,
      );

      res.status(201).json(app);
    } else {
      res.status(405).end();
    }
  },
);
