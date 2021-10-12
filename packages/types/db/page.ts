export interface CofeDbPage {
  id: string;
  user_id: string;
  app_id: string;
  title: string;
  description?: string;
  keywords?: string[];
  parent_id?: string;
  state: number;
  created_at: string;
  updated_at: string;
}
