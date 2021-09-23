import { compose } from '@cofe/api';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { put } from '@/utils/io';

export default compose([withApiCatch, withApiAuth], async (req, res) => {
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
