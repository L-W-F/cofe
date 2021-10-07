import { CofeTree } from '../tree';
import { CofeDbBase } from './_base';

export interface CofeDbPage extends CofeDbBase {
  id: string;
  userId: string;
  appId: string;
  title: string;
  description?: string;
  keywords?: string[];
  parentId?: string;
  tree: CofeTree;
  state: number;
}
