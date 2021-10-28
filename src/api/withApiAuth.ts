import { createApiAuth } from '@cofe/api';
import { supabase } from '@/utils/supabase';

export const withApiAuth = createApiAuth({
  auth: async (req) => {
    const { user, error } = await supabase.auth.api.getUserByCookie(req);

    if (error) {
      throw error;
    }

    supabase.auth.setAuth(req.cookies['sb:token']);

    return user;
  },
});
