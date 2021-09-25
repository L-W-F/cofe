import { compose } from '@cofe/api';
import { CofePage } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { get, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose(
  [withApiCatch(), withApiAuth()],
  async (req, res, { auth: { userId } }) => {
    const appId = req.query.id as string;
    const test = (item) => item.appId === appId && item.userId === userId;

    if (req.method === 'GET') {
      const pages = await get('pages', test);

      res.status(200).json(pages);
    } else if (req.method === 'POST') {
      const page: CofePage = {
        id: makeId(),
        userId,
        appId,
        state: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...req.body,
      };

      await set('pages', page);

      res.status(201).json(page);
    } else {
      res.status(405).end();
    }
  },
);
