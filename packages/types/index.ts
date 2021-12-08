import { UiSchema } from '@rjsf/core';
import { JSONSchema4, JSONSchema7 } from 'json-schema';

export interface CofeTreeProperties extends Record<string, any> {}

export interface CofeTreeActions
  extends Array<{
    type: string;
    action: string;
    params?: string[];
  }> {}

export interface CofeTree {
  type: string;
  id: string;
  properties?: CofeTreeProperties;
  actions?: CofeTreeActions;
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

export interface CofeTemplate {
  type: string;
  icon?: string;
  description?: string;
  template: {
    type: string;
    properties?: CofeTreeProperties;
    actions?: CofeTreeActions;
    children?: CofeTemplate['template'][];
  };
}

export interface CofeSchema {
  type: string;
  icon?: string;
  description?: string;
  isInline?: boolean;
  accept?: string[];
  properties?: JSONSchema4 & JSONSchema7;
  actions?: JSONSchema4 & JSONSchema7;
  children?: CofeSchema[];
  uiSchema?: {
    properties?: UiSchema;
    actions?: UiSchema;
  };
  renderer?: CofeRenderer;
}

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

export interface CofeRendererProps {
  isDesign?: boolean;
}

export interface CofeRenderer {
  (props: CofeRendererProps & Record<string, any>): JSX.Element;
}
