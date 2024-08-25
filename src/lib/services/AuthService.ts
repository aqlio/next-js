// authService.tsx

import IUserLoginRequestData from '@/lib/interfaces/Auth/IUserLoginRequestData'

const API_BASE_URL = 'http://localhost:8083'; // Update this to your actual API base URL

interface AuthResponse {
	token?: string;
	user?: {
		id: string;
		email: string;
	};
	error?: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
	return authRequest('/auth/local', { email, password });
}

export async function signup(email: string, password: string): Promise<AuthResponse> {
	return authRequest('/auth/local', { email, password });
}

async function authRequest(endpoint: string, data: IUserLoginRequestData): Promise<AuthResponse> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error('Authentication failed');
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Auth error:', error);
		return { error: 'Authentication failed. Please try again.' };
	}
}