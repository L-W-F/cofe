import { compose } from '@cofe/api';
import { CofeUser } from '@cofe/types';
import { withApiCatch } from '@/api/withApiCatch';
import { post } from '@/utils/io';

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
