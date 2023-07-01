import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IAuthState, SigninResponse, User } from "types/auth";

export const signin = createAsyncThunk(
  "auth/signin",
  async (data: { email: string; password: string }, thunkApi) => {
    try {
      const response = await axios.post<SigninResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/signin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/google",
  async (data: { token: string }, thunkApi) => {
    try {
      const response = await axios.post<SigninResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: { email: string; password: string }, thunkApi) => {
    try {
      const response = await axios.post<SigninResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/check",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<SigninResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/check`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (data: any, thunkApi) => {
    try {
      const response = await axios.put<SigninResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<SigninResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

const fakeUser: User = {
  _id: "1", name: "nie", role: "admin", email: "bibek@gmail.com", imageLink: "", verified: true, password: "", viewPolitical: true, viewSensitive: true, releventCategories: []
}

const initialState: IAuthState = {
  user: null,
  initialLoading: true,
  isSigningIn: false,
  signinError: "",
  isSigningUp: false,
  signupError: "",
  loggingout: false,
  logoutError: "",
  updating: false,
  updateError: "",
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase("HYDRATE", (state, action) => {
        state = { ...state, ...action };
      })
      .addCase(fetchUserData.pending, (state, action) => {
        state.initialLoading = true;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<SigninResponse>) => {
          state.initialLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(fetchUserData.rejected, (state, action: PayloadAction<any>) => {
        state.initialLoading = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state, action) => {
        state.isSigningIn = true;
      })
      .addCase(
        signin.fulfilled,
        (state, action: PayloadAction<SigninResponse>) => {
          state.isSigningIn = false;
          state.user = action.payload.user;
        }
      )
      .addCase(signin.rejected, (state, action: PayloadAction<any>) => {
        state.isSigningIn = false;
        state.signinError = action.payload;
      })
      .addCase(signup.pending, (state, action) => {
        state.isSigningUp = true;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<SigninResponse>) => {
          state.isSigningUp = false;
          state.user = action.payload.user;
        }
      )
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.isSigningUp = false;
        state.signupError = action.payload;
      })
      .addCase(googleLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        googleLogin.fulfilled,
        (state, action: PayloadAction<SigninResponse>) => {
          state.loading = false;
          state.error = "";
          state.user = action.payload.user;
        }
      )
      .addCase(googleLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state, action) => {
        state.loggingout = true;
      })
      .addCase(
        logout.fulfilled,
        (state, action: PayloadAction<SigninResponse>) => {
          state.loggingout = false;
          state.logoutError = "";
          state.user = null;
        }
      )
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.loggingout = false;
        state.logoutError = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loggingout = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<SigninResponse>) => {
          state.user = action.payload.user;
        }
      )
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.loggingout = false;
        state.logoutError = action.payload;
      });
  },
});

export default userSlice.reducer;
