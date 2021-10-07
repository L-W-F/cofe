import { CofeDbApp } from './db/app';
import { CofeDbExternal } from './db/external';
import { CofeDbPage } from './db/page';
import { CofeDbSnapshot } from './db/snapshot';
import { CofeDbTemplate } from './db/template';
import { CofeDbToken } from './db/token';
import { CofeDbUser } from './db/user';

export interface Db {
  apps?: CofeDbApp[];
  templates?: CofeDbTemplate[];
  pages?: CofeDbPage[];
  snapshots?: CofeDbSnapshot[];
  externals?: CofeDbExternal[];
  tokens?: CofeDbToken[];
  users?: CofeDbUser[];
}
