import { compose } from '@cofe/api';
import { post } from '@cofe/io';
import { CofeUser } from '@cofe/types';
import { withApiCatch } from '@/api/withApiCatch';

export default compose([withApiCatch], async (req, res) => {
  if (req.method === 'POST') {
    const user: CofeUser = await post(
      `${process.env.DB_URL}/api/users`,
      req.body,
    );

    res.status(201).json(user);
  } else {
    res.status(405).end();
  }
});
