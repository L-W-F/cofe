import { CofeDbBase } from './_base';

export interface CofeDbApp extends CofeDbBase {
  id: string;
  userId: string;
  title: string;
  description?: string;
  state: number;
}
