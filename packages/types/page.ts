import { CofeTree } from './tree';

export interface CofePage {
  id: string;
  appId: string;
  userId: string;
  title: string;
  description?: string;
  keywords?: string[];
  parentId?: string;
  tree: CofeTree;
  state: number;
  createdAt: number;
  updatedAt: number;
}
