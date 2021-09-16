export interface CofeApp {
  id: string;
  userId: string;
  title: string;
  description?: string;
  state: number;
  createdAt: number;
  updatedAt: number;
}
