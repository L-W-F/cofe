import { CofeTree } from './tree';

export interface CofeEditor {
  stack?: CofeTree[];
  cursor?: number;
}
