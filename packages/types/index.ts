import { JSONSchema7 } from 'json-schema';

export interface DbData {
  config?: CofeConfig;
  apps?: CofeApp[];
  pages?: Pick<CofePage, 'id' | 'title' | 'description' | 'createdAt'>[];
  whoami?: WhoamiState;
}
export interface WhoamiState {
  name?: string;
  permissions?: string[];
  states?: Record<string, number>;
}

export interface CofeConfig {
  editMode?: boolean;
  leftPaneSize?: number;
  rightPaneSize?: number;
}

export interface CofeEditor {
  stack?: CofeTree[];
  cursor?: number;
  selected?: CofeAtomIdentity;
}

export interface CofeApp {
  id: string;
  name: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface CofePage extends CofeTree {
  title?: string;
  description?: string;
  children?: CofePage[];
}

export interface CofeNodeProperties extends Record<string, any> {}
export interface CofeNodeActions extends Record<string, any> {}
export interface CofeNodeEvents extends Record<string, any> {}

export interface CofeTree {
  id: string;
  type: string;
  title?: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
  properties?: CofeNodeProperties;
  actions?: CofeNodeActions;
  events?: CofeNodeEvents;
  children?: CofeTree[];
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

export interface CofeAtomIdentity {
  type: string;
  id?: string;
}

export type CofeInsertAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';
