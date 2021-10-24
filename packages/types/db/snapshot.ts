import { CofeSnapshot } from '../snapshot';

export interface CofeDbSnapshot {
  id: number;
  user_id: string;
  page_id: string;
  stack: CofeSnapshot[];
  created_at: string;
  updated_at: string;
}
