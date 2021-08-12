import { compose } from '@cofe/api';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { del, patch } from '@/utils/io';

export default compose([withApiCatch, withApiAuth], async (req, res) => {
  if (req.method === 'PATCH') {
    const app = await patch(
      `${process.env.DB_URL}/api/apps/${req.query.id as string}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );

    res.status(200).json(app);
  } else if (req.method === 'DELETE') {
    await del(`${process.env.DB_URL}/api/apps/${req.query.id as string}`, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    res.status(200).end();
  } else {
    res.status(405).end();
  }
});
