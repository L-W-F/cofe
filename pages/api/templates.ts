import { compose } from '@cofe/api';
import { withApiAuth } from '@/api/withApiAuth';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('templates')
      .select('type,template,description');

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(data);
    }
  } else if (req.method === 'POST') {
    const { data, error } = await supabase.from('templates').insert(req.body);

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json(data[0]);
    }
  } else {
    res.status(405).json(null);
  }
});
