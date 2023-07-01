export interface User {
  _id: string;
  name: string;
  email: string;
  gender?: string ;
  occupation?: string;
  imageLink: string;
  verified: boolean;
  password: string;
  role: string;
  viewSensitive: boolean;
  viewPolitical: boolean;
  releventCategories: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileForm {
  id: string;
  name?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  userFiles?: any;
}

export interface SigninResponse {
  user: User;
  token: string;
  message: string;
  error?: string | null;
}

export interface SignupResponse {
  user: User;
  token: string;
  message: string;
  error?: string | null;
}

export interface IAuthContext {
  state: IAuthState;
  actions: IAuthAction;
}

export interface IAuthState {
  user: User | null | undefined;
  initialLoading: boolean;
  isSigningIn: boolean;
  signinError: string;
  isSigningUp: boolean;
  signupError: string;
  loggingout: boolean;
  logoutError: string;
  loading: boolean;
  updating: false;
  updateError: "";
  error: string;
}

export interface IAuthAction {
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
}
