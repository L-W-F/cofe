import { del, getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default withApiCatch(
  withApiAuth(async (req, res) => {
    const id = req.query.id as string;

    if (req.method === 'GET') {
      const user = await getOne('users', id);

      res.status(200).json(user);
    } else if (req.method === 'PATCH') {
      await set('users', {
        id,
        updatedAt: Date.now(),
        ...req.body,
      });

      res.status(200).end();
    } else if (req.method === 'DELETE') {
      await del('users', id);

      res.status(200).end();
    } else {
      res.status(405).end();
    }
  }),
);
