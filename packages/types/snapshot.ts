import { CofeTree } from './tree';

export interface CofeSnapshot {
  id: string;
  pageId: string;
  stack: CofeTree[];
}
