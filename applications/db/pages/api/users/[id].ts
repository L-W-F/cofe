import { compose } from '@cofe/api';
import { delOne, getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  const id = req.query.id as string;

  if (req.method === 'GET') {
    const user = await getOne('users', id);

    res.status(200).json(user);
  } else if (req.method === 'PATCH') {
    const user = await set('users', req.body, id);

    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    const user = await delOne('users', id);

    res.status(200).json(user);
  } else {
    res.status(405).end();
  }
});
