import { compose } from '@cofe/api';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'PUT') {
    const id = req.query.id as string;
    const tree = req.body;

    const [{ data: d1, error: e1 }, { data: d2, error: e2 }] =
      await Promise.all([
        supabase.from('trees').select('tree').eq('id', id),
        supabase.from('snapshots').select('stack').eq('id', id),
      ]);

    if (e1 || e2) {
      res.status(500).json(e1 || e2);
    } else {
      const stack = d2[0].stack ?? [];

      stack.unshift(d1[0]?.tree);

      const [{ error: e3 }, { error: e4 }] = await Promise.all([
        supabase.from('trees').upsert({ tree, id }),
        supabase.from('snapshots').upsert({ stack, id }),
      ]);

      if (e3 || e4) {
        res.status(500).json(e3 || e4);
      } else {
        res.status(200).json(null);
      }
    }
  } else {
    res.status(405).end();
  }
});
