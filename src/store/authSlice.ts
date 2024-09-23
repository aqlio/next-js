// src/store/authSlice.ts

import AuthService from "@/Services/AuthService";
import UserService from "@/Services/UserService";
import IAuthState from "@/interfaces/IAuthState";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IUserLoginResponse from "@/interfaces/IUserLoginResponse";
import IUserLoginRequestData from "@/interfaces/IUserLoginRequestData";
import { getInitialToken, setToken, removeToken } from "@/utils/tokenUtils";
import { IUserData } from "@/interfaces/IUserData";

const authService = new AuthService();
const userService = new UserService();

const initialState: IAuthState = {
  user: null,
  token: getInitialToken(),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: IUserLoginRequestData, { dispatch, rejectWithValue }) => {
    try {
      const response: IUserLoginResponse = await authService.login(email, password);
      if (response.token) {
        setToken(response.token);
        dispatch(fetchUserData());
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: IUserLoginRequestData, { dispatch, rejectWithValue }) => {
    try {
      const response: IUserLoginResponse = await authService.signup(email, password);
      if (response.token) {
        setToken(response.token);
        dispatch(fetchUserData());
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: IAuthState };
    if (!auth.token) {
      return rejectWithValue("No token available");
    }
    try {
      return await userService.getUser(auth.token);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user data");
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { getState, dispatch }) => {
    const { auth } = getState() as { auth: IAuthState };
    if (auth.token && !auth.user) {
      await dispatch(fetchUserData());
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Token is already set in loginUser thunk
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
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Token is already set in signupUser thunk
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
        state.user = action.payload as IUserData;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
        state.token = null;
        removeToken();
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
