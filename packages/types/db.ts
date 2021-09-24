import { CofeApp } from './app';
import { CofeExternal } from './external';
import { CofePage } from './page';
import { CofeSnapshot } from './snapshot';
import { CofeToken } from './token';
import { CofeUser } from './user';

export interface Db {
  apps?: CofeApp[];
  pages?: CofePage[];
  snapshots?: CofeSnapshot[];
  externals?: CofeExternal[];
  tokens?: CofeToken[];
  users?: CofeUser[];
}
