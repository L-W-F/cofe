import { UiSchema } from '@rjsf/core';
import { JSONSchema4, JSONSchema7 } from 'json-schema';

export interface CofeTreeProperties extends Record<string, any> {}

export interface CofeTree {
  type: string;
  id: string;
  properties?: CofeTreeProperties;
  parent?: CofeTree;
  children?: CofeTree[];
}

export interface CofeTheme {
  colors?: Record<string, string>;
  shapes?: Record<string, string>;
}

export interface CofePage {
  id: string;
  title: string;
  description?: string;
  keywords?: string[];
  theme?: CofeTheme;
  tree?: CofeTree;
  pages?: Record<CofePage['id'], CofePage>;
}

export interface CofeApp {
  id: string;
  title: string;
  description?: string;
  theme?: CofeTheme;
  pages?: Record<CofePage['id'], CofePage>;
}

export interface CofeMolecule {
  type: string;
  icon?: string;
  description?: string;
  pattern: {
    type: CofeAtom['type'];
    properties?: CofeTreeProperties;
    children?: CofeMolecule['pattern'][];
  };
}

export interface CofeAtom {
  type: string;
  icon?: string;
  description?: string;
  isInline?: boolean;
  accept?: string[];
  properties?: JSONSchema4 & JSONSchema7;
  children?: CofeAtom[];
  form?: UiSchema;
  renderer?: CofeRenderer;
}

export type CofeDndAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';

export interface CofeDndIdentity {
  type: string;
  id?: string;
}

export interface CofeAppendPayload {
  from: CofeTree;
  to: CofeDndIdentity['id'];
}

export interface CofeInsertPayload {
  from: CofeDndIdentity['id'];
  before?: CofeDndIdentity['id'];
  after?: CofeDndIdentity['id'];
}

export interface CofeRendererProps {}

export interface CofeRenderer {
  (props: CofeRendererProps & Record<string, any>): JSX.Element;
}
