export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string; 
  avatarUrl?: string;
  city?: string;
  state?: string;
  favorites?: string[]; 
  createdAt: string;
}
