import { CofeTree } from '../tree';
import { CofeDbBase } from './_base';

export interface CofeDbSnapshot extends CofeDbBase {
  id: string;
  pageId: string;
  stack: CofeTree[];
}
