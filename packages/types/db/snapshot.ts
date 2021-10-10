import { CofeTree } from '../tree';

export interface CofeDbSnapshot {
  id: string;
  user_id: string;
  page_id: string;
  stack: CofeTree[];
  created_at: string;
  updated_at: string;
}
