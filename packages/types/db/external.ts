import { CofeDbBase } from './_base';

export interface CofeDbExternal extends CofeDbBase {
  userId: string;
  externalId?: string;
  provider?: string;
  enabled: boolean;
}
