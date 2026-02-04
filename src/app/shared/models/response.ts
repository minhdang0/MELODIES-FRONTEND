export interface ApiResponse<T> {
  status: number;
  message: string;
  response_data?: T;
}
