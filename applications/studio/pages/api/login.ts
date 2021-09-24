import { compose } from '@cofe/api';
import { CofeToken } from '@cofe/types';
import { serialize } from 'cookie';
import { withApiCatch } from '@/api/withApiCatch';
import { post } from '@/utils/io';

export default compose([withApiCatch], async (req, res) => {
  if (req.method === 'POST') {
    const { token, expiresAt }: CofeToken = await post(
      `${process.env.DB_URL}/api/tokens`,
      req.body,
    );

    res.setHeader(
      'set-cookie',
      serialize('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: (expiresAt - Date.now()) / 1000,
      }),
    );

    res.status(201).end();
  } else {
    res.status(405).end();
  }
});
