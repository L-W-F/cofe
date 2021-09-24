import { CofeConfig } from './config';

export interface CofeUser {
  id: string;
  level: number;
  username: string;
  password?: string;
  config: CofeConfig;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
  lastLogin: number;
}
