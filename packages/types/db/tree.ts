import { CofeTree } from '../tree';

export interface CofeDbTree {
  id: number;
  user_id: string;
  app_id: number;
  tree: CofeTree;
  state: number;
  created_at: string;
  updated_at: string;
}
