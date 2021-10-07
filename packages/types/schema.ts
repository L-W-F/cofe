import { JSONSchema4, JSONSchema7 } from 'json-schema';

export interface CofeSchema {
  type: string;
  isInline?: boolean;
  accept?: string[];
  properties?: JSONSchema4 & JSONSchema7;
  actions?: JSONSchema4 & JSONSchema7;
  events?: JSONSchema4 & JSONSchema7;
  children?: CofeSchema[];
  template?: CofeSchema;
}
