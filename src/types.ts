import { JSONSchema7 } from 'json-schema';
import { Node } from 'unist-builder';

export interface CofeAtom {
  type: string;
  isRoot?: boolean;
  isLeaf?: boolean;
  isInline?: boolean;
  accept?: string[];
  properties?: JSONSchema7;
  actions?: JSONSchema7;
  events?: JSONSchema7;
}

export interface CofeTree extends Node {
  id?: string;
  createdAt?: number;
  value?: string;
  children?: CofeTree[];
  properties?: Record<string, any>;
  actions?: Record<string, any>;
  events?: Record<string, any>;
}

export interface CofeAtomIdentity {
  type: string;
  id?: string;
}

export type CofeInsertAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';
