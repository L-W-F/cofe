import { compose } from '@cofe/api';
import { withApiCatch } from '@/api/withApiCatch';
import { supabase } from '@/utils/supabase';

export default compose([withApiCatch()], async (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
});
