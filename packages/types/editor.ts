import { JSONSchema7 } from 'json-schema';
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

export interface CofeAtomModel {
  type: string;
  isRoot?: boolean;
  isInline?: boolean;
  accept?: string[];
  properties?: JSONSchema7;
  actions?: JSONSchema7;
  events?: JSONSchema7;
}

export type CofeInsertAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';
