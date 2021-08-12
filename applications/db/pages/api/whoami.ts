import { getOne } from 'db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default withApiCatch(
  withApiAuth(async (req, res, userId) => {
    if (req.method === 'GET') {
      const user = await getOne('users', userId);

      res.status(200).json(user);
    } else {
      res.status(405).end();
    }
  }),
);
