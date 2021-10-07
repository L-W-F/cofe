import { CofeTree } from '../tree';
import { CofeDbBase } from './_base';

export interface CofeDbTemplate extends CofeDbBase {
  id: string;
  userId: string;
  description?: string;
  type: string;
  template: CofeTree;
  state: number;
}
