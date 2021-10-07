import { compose } from '@cofe/api';
import { delOne, getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  const id = req.query.id as string;

  if (req.method === 'GET') {
    const snapshot = await getOne('snapshots', id);

    res.status(200).json(snapshot);
  } else if (req.method === 'PATCH') {
    const snapshot = await set('snapshots', req.body, id);

    res.status(200).json(snapshot);
  } else if (req.method === 'DELETE') {
    const snapshot = await delOne('snapshots', id);

    res.status(200).json(snapshot);
  } else {
    res.status(405).end();
  }
});
