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
  title?: string;
  description?: string;
  properties?: CofeTreeProperties;
  actions?: CofeTreeActions;
  parent?: CofeTree;
  children?: CofeTree[];
}
