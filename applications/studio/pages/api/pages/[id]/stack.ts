import { compose } from '@cofe/api';
import { isEqual } from 'lodash';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'GET') {
    const id = req.query.id as string;

    const { data, error } = await supabase
      .from('snapshots')
      .select('stack')
      .eq('id', id);

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(data[0]?.stack ?? []);
    }
  } else if (req.method === 'POST') {
    const id = req.query.id as string;
    const tree = req.body;

    const [{ data: d1, error: e1 }, { data: d2, error: e2 }] =
      await Promise.all([
        supabase.from('trees').select('tree').eq('id', id),
        supabase.from('snapshots').select('stack').eq('id', id),
      ]);

    if (e1 || e2) {
      res.status(500).json(e1 || e2);
    } else if (isEqual(d1[0]?.tree, tree)) {
      res.status(200).json(null);
    } else {
      const stack = d2[0]?.stack ?? [];

      if (d1[0]?.tree) {
        stack.unshift(d1[0].tree);
      }

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
  } else if (req.method === 'PUT') {
    // 还原
    const id = req.query.id as string;
    const tree = req.body;

    const { error } = await supabase.from('trees').upsert({ tree, id });

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(null);
    }
  } else {
    res.status(405).json(null);
  }
});
