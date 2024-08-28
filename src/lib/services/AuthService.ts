import axios from 'axios';
import IAuthApiResponse from '../interfaces/Auth/IAuthApiResponse';
import IUserLoginRequestData from '@/lib/interfaces/Auth/IUserLoginRequestData';

const API_BASE_URL = 'https://api.aqlio.com'; // Update this to your actual API base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function login(email: string, password: string): Promise<IAuthApiResponse> {
  return authRequest('/auth/local', { email, password });
}

export async function signup(email: string, password: string): Promise<IAuthApiResponse> {
  return authRequest('/auth/local', { email, password });
}

async function authRequest(endpoint: string, data: IUserLoginRequestData): Promise<IAuthApiResponse> {
  try {
    const response = await axiosInstance.post<IAuthApiResponse>(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}