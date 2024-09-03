import { login, signup } from "@/lib/services/AuthService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import IAuthState from "@/lib/interfaces/Auth/IAuthState";
import IAuthApiResponse from "@/lib/interfaces/Auth/IAuthApiResponse";
import IUserLoginRequestData from "@/lib/interfaces/Auth/IUserLoginRequestData";


const initialState: IAuthState = {
	user: null,
	token: null,
	isLoading: false,
	error: null,
};

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }: IUserLoginRequestData, { rejectWithValue }) => {
	try {
		const response: IAuthApiResponse = await login(email, password);
		return response;
	} catch (error) {
		return rejectWithValue("Login failed");
	}
}
);

export const signupUser = createAsyncThunk("auth/signup", async ({ email, password }: IUserLoginRequestData, { rejectWithValue }) => {
	try {
		const response: IAuthApiResponse = await signup(email, password);
		return response;
	} catch (error) {
		return rejectWithValue("Signup failed");
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
			localStorage.removeItem("token");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.token) {
					state.token = action.payload.token;
					localStorage.setItem("token", action.payload.token);
				} else {
					state.token = null;
					localStorage.removeItem("token");
				}
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(signupUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.token) {
					state.token = action.payload.token;
					localStorage.setItem("token", action.payload.token);
				} else {
					state.token = null;
					localStorage.removeItem("token");
				}
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
