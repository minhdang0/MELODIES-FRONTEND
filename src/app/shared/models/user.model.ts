export interface User {
  id: number;

  username: string;
  email: string;
  password: string;

  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;

  profile_pic?: string | null;
  bio?: string | null;
  birth_date?: string | null;

  gender?: string | null;
  country?: string | null;

  is_premium: boolean;
  is_verified: boolean;
  is_active: boolean;

  created_at: string; // ISO datetime
  updated_at: string;
}
