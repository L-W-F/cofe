import { compose } from '@cofe/api';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'PATCH') {
    const { data, error } = await supabase.from('profiles').upsert({
      id: req.query.id,
      ...req.body,
    });

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(data[0]);
    }
  } else {
    res.status(405).json(null);
  }
});
