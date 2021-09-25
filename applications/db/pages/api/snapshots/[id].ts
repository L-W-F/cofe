import { compose } from '@cofe/api';
import { del, getOne, set } from '@/db';
import { withApiAuth } from '@/withApiAuth';
import { withApiCatch } from '@/withApiCatch';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  const id = req.query.id as string;

  if (req.method === 'GET') {
    const snapshot = await getOne('snapshots', id);

    res.status(200).json(snapshot);
  } else if (req.method === 'PATCH') {
    await set('snapshots', {
      id,
      ...req.body,
    });

    res.status(200).end();
  } else if (req.method === 'DELETE') {
    await del('snapshots', id);

    res.status(200).end();
  } else {
    res.status(405).end();
  }
});
