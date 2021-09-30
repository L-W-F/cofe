import { JSONSchema4, JSONSchema7 } from 'json-schema';
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
  properties?: JSONSchema4 & JSONSchema7;
  actions?: JSONSchema4 & JSONSchema7;
  events?: JSONSchema4 & JSONSchema7;
}

export type CofeInsertAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';
