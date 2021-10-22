import { compose } from '@cofe/api';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'DELETE') {
    const id = req.query.id as string;
    const index = req.query.index as string;

    const { data: d1, error: e1 } = await supabase
      .from('snapshots')
      .select('stack')
      .eq('id', id);

    if (e1) {
      res.status(500).json(e1);
    } else {
      const stack = d1[0]?.stack;

      if (stack) {
        stack.splice(index, 1);

        const { error: e2 } = await supabase
          .from('snapshots')
          .upsert({ stack, id });

        if (e2) {
          res.status(500).json(e2);
        } else {
          res.status(200).json(null);
        }
      }
    }
  } else {
    res.status(405).json(null);
  }
});
