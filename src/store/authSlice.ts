import IAuthState from "@/lib/interfaces/Auth/IAuthState";
import AuthService from "@/lib/services/AuthService";
import UserService from "@/lib/services/UserService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IAuthApiResponse from "@/lib/interfaces/Auth/IAuthApiResponse";
import IUserLoginRequestData from "@/lib/interfaces/Auth/IUserLoginRequestData";
import { getInitialToken, setToken, removeToken } from "@/lib/utils/tokenUtils";

const authService = new AuthService();
const userService = new UserService();

const initialState: IAuthState = {
	user: null,
	token: getInitialToken(),
	isLoading: false,
	error: null,
};

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }: IUserLoginRequestData, { dispatch, rejectWithValue }) => {
	try {
		const response: IAuthApiResponse = await authService.login(email, password);
		if (response.token) {
			dispatch(fetchUserData());
		}
		return response;
	} catch (error) {
		return rejectWithValue("Login failed");
	}
});

export const signupUser = createAsyncThunk("auth/signup", async ({ email, password }: IUserLoginRequestData, { rejectWithValue }) => {
	try {
		const response: IAuthApiResponse = await authService.signup(email, password);
		return response;
	} catch (error) {
		return rejectWithValue("Signup failed");
	}
});

export const fetchUserData = createAsyncThunk("auth/fetchUserData", async (_, { getState, rejectWithValue }) => {
	const { auth } = getState() as { auth: IAuthState };
	if (!auth.token) {
		return rejectWithValue("No token available");
	}
	try {
		return await userService.getUser(auth.token);
	} catch (error) {
		return rejectWithValue("Failed to fetch user data");
	}
});

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
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.token) {
					state.token = action.payload.token;
					setToken(action.payload.token);
				} else {
					state.token = null;
					removeToken();
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
					setToken(action.payload.token);
				} else {
					state.token = null;
					removeToken();
				}
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
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
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
