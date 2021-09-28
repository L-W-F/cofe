export interface CofeUser {
  id: string;
  level: number;
  username: string;
  password?: string;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
  lastLogin: number;
}
