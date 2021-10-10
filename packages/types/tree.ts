export interface CofeTreeNodeProperties extends Record<string, any> {}
export interface CofeTreeNodeActions extends Record<string, any> {}
export interface CofeTreeNodeEvents extends Record<string, any> {}

export interface CofeTreeNodeIdentity {
  type: string;
  id?: string;
}

export interface CofeTree {
  id: string;
  type: string;
  title?: string;
  description?: string;
  created_at?: number;
  updated_at?: number;
  properties?: CofeTreeNodeProperties;
  actions?: CofeTreeNodeActions;
  events?: CofeTreeNodeEvents;
  children?: CofeTree[];
}
