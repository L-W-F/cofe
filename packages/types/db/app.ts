export interface CofeDbApp {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  state: number;
  created_at: string;
  updated_at: string;
}
