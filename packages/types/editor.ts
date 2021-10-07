import { CofeTree, CofeTreeNodeIdentity } from './tree';

export interface CofeEditor {
  stack?: CofeTree[];
  cursor?: number;
  selected?: CofeTreeNodeIdentity;
}
