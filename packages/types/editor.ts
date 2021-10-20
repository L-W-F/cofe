import { CofeTree } from './tree';

export interface CofeEditor {
  stack?: CofeTree[];
  cursor?: number;
  app_id?: number;
  page_id?: number;
}
