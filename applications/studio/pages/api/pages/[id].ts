import { compose } from '@cofe/api';
import { del, patch } from '@cofe/io';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'PATCH') {
    const page = await patch(
      `${process.env.DB_URL}/api/pages/${req.query.id as string}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );

    res.status(200).json(page);
  } else if (req.method === 'DELETE') {
    await del(`${process.env.DB_URL}/api/pages/${req.query.id as string}`, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    res.status(200).end();
  } else {
    res.status(405).end();
  }
});
