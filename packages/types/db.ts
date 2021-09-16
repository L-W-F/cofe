import { CofeApp } from './app';
import { CofePage } from './page';
import { CofeSnapshot } from './snapshot';
import { CofeToken } from './token';
import { CofeUser } from './user';

export interface Db {
  users?: CofeUser[];
  apps?: CofeApp[];
  pages?: CofePage[];
  snapshots?: CofeSnapshot[];
  tokens?: CofeToken[];
}
