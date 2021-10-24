import { CofeTree } from './tree';

export type CofeDndAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';

export interface CofeDndIdentity {
  type: string;
  id?: string;
}

export interface CofeDndPayload {
  dragging: CofeDndIdentity['id'] | CofeTree;
  reference?: CofeDndIdentity['id'];
  container?: CofeDndIdentity['id'];
  adjacent: CofeDndAdjacent;
}
