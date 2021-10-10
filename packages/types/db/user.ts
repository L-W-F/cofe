export interface CofeDbUser {
  app_metadata: { provider: string };
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_change_confirm_status: number;
  email_confirmed_at: string;
  id: string;
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
  user_metadata: {
    avatar_url: string;
    full_name: string;
    user_name: string;
  };
}
