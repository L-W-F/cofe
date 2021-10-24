export interface CofeTreeProperties extends Record<string, any> {}
export interface CofeTreeActions extends Record<string, any> {}
export interface CofeTreeEvents extends Record<string, any> {}

export interface CofeTree {
  id: string;
  type: string;
  title?: string;
  description?: string;
  properties?: CofeTreeProperties;
  actions?: CofeTreeActions;
  events?: CofeTreeEvents;
  parent?: CofeTree;
  children?: CofeTree[];
}
