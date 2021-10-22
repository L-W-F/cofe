import { CofeTree } from './tree';

export interface CofeEditor {
  app_id?: number;
  page_id?: number;
  stack?: CofeTree[];
  cursor?: number;
  mode?: 1 | 2 | 3;
}
