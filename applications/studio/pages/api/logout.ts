import { compose } from '@cofe/api';
import { serialize } from 'cookie';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { del } from '@/utils/io';

export default compose([withApiCatch, withApiAuth], async (req, res) => {
  if (req.method === 'POST') {
    await del(`${process.env.DB_URL}/api/tokens`, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    res.setHeader(
      'set-cookie',
      serialize('token', '', {
        httpOnly: true,
        path: '/',
        maxAge: -1,
      }),
    );

    res.status(200).end();
  } else {
    res.status(405).end();
  }
});
