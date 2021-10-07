import { CofeDbBase } from './_base';

export interface CofeDbUser extends CofeDbBase {
  id: string;
  level: number;
  username: string;
  password?: string;
  enabled: boolean;
  lastLogin: number;
}
