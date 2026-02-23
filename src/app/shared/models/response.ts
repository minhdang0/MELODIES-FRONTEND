import { User } from './user.model';

export interface ApiResponse<T> {
  status: number;
  message: string;
  response_data?: T;
}
export interface LoginData {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}
