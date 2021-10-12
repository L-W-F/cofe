import { compose } from '@cofe/api';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'PUT') {
    const [tree, ...stack] = req.body;

    const [{ error }, { error: e }] = await Promise.all([
      supabase.from('trees').upsert({ tree, id: req.query.id }),
      supabase.from('snapshots').upsert({ stack, id: req.query.id }),
    ]);

    if (error || e) {
      res.status(500).json(error || e);
    } else {
      res.status(200).json(null);
    }
  } else {
    res.status(405).end();
  }
});
