import { compose } from '@cofe/api';
import { post } from '@cofe/io';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'POST') {
    const app = await post(`${process.env.DB_URL}/api/apps`, req.body, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    res.status(201).json(app);
  } else {
    res.status(405).end();
  }
});
