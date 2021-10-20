export interface CofeDbPage {
  id: number;
  user_id: string;
  app_id: number;
  title: string;
  description?: string;
  keywords?: string[];
  parent_id?: number;
  state: number;
  created_at: string;
  updated_at: string;
}
