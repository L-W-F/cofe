import { CofeTree } from './tree';

export interface CofeAtomIdentity {
  type: string;
  id?: string;
}

export interface CofeEditor {
  stack?: CofeTree[];
  cursor?: number;
  selected?: CofeAtomIdentity;
}

export type CofeInsertAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';
