// src/store/authSlice.ts

import IAuthState from "@/lib/interfaces/IAuthState";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IUserLoginRequestData from "@/lib/interfaces/IUserLoginRequestData";
import { removeToken } from "@/lib/utils/tokenUtils";
import AuthService from "@/lib/Services/AuthService";
import UserService from "@/lib/Services/UserService";

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: IUserLoginRequestData, { dispatch, rejectWithValue }) => {
    try {
      await AuthService.login(email, password);
      dispatch(fetchUserData());
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: IUserLoginRequestData, { dispatch, rejectWithValue }) => {
    try {
      await AuthService.signup(email, password);
      dispatch(fetchUserData());
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const user = await UserService.getUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user data");
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(fetchUserData()).unwrap();
    } catch (error: any) {
      // Optionally handle fetchUserData failure
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      removeToken();
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        // Token is managed via HTTP-only cookies
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
        // Token is managed via HTTP-only cookies
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch User Data
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      // Initialize Auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.isLoading = false;
        // User data is fetched in the thunk
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
