import { compose } from '@cofe/api';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'GET') {
    const id = req.query.id as string;

    const { data, error } = await supabase
      .from('trees')
      .select('tree')
      .eq('id', id);

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(data[0]?.tree ?? {});
    }
  } else {
    res.status(405).json(null);
  }
});
