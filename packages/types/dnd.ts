import { CofeTree } from './tree';

export type CofeDndAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';

export interface CofeDndPayload {
  dragging: string | CofeTree;
  reference?: string;
  container?: string;
  adjacent: CofeDndAdjacent;
}
