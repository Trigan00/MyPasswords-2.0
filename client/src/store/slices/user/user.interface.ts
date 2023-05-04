export type authError = {
  message: string;
  email: string;
  password: string;
};

export interface UserState {
  email: string;
  id: string | number;
  token: string;
  isLoading: boolean;
  secretKey: string;
  error: authError | null;
}

export interface LoginProps {
  email: string;
  password: string;
  code: string;
}

export interface LoginResponse {
  email: string;
  id: string;
  token: string;
  secretKey: string;
}
