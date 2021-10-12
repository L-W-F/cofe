import { CofeTree } from '../tree';

export interface CofeDbTree {
  id: string;
  user_id: string;
  app_id: string;
  tree: CofeTree;
  state: number;
  created_at: string;
  updated_at: string;
}
