import { compose } from '@cofe/api';
import { add, get } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req, res, { auth: { userId } }) => {
    if (req.method === 'GET') {
      const templates = await get(
        'templates',
        (item) => item.userId === userId,
      );

      res.status(200).json(templates);
    } else if (req.method === 'POST') {
      const template = await add(
        'templates',
        {
          userId,
          state: 0,
          ...req.body,
        },
        (item) => item.userId === userId && item.type === req.body.type,
      );

      res.status(201).json(template);
    } else {
      res.status(405).end();
    }
  },
);
