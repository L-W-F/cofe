import { compose } from '@cofe/api';
import { put } from '@cofe/io';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'PUT') {
    const page = await put(
      `${process.env.DB_URL}/api/pages/${req.query.id as string}/tree`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );

    res.status(200).json(page);
  } else {
    res.status(405).end();
  }
});
