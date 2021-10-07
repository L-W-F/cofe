import { CofeDbBase } from './_base';

export interface CofeDbToken extends CofeDbBase {
  userId: string;
  token: string;
  expiresAt: number;
}
