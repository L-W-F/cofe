import { compose } from '@cofe/api';
import { serialize } from 'cookie';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'POST') {
    await supabase.auth.api.signOut(req.cookies['sb:token']);

    res.setHeader(
      'set-cookie',
      serialize('sb:token', '', {
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
