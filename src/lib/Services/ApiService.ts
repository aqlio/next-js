// src/lib/services/ApiService.ts

import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/lib/constants/apiConstants';
import { logout } from '@/store/authSlice';
import { store } from '@/store/store';
import { toast } from 'react-toastify'; // Optional: For user-friendly error messages

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important for sending cookies
    });

    // Request interceptor (no need to add Authorization header)
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // No token manipulation needed
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors globally
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          const { status, data } = error.response;

          // Handle unauthorized errors
          if (status === 401) {
            store.dispatch(logout());
            // Optionally redirect to login
            window.location.href = '/login';
          }

          // Optionally display error messages
          if (data && (data as any).error?.message) {
            toast.error((data as any).error.message);
          } else {
            toast.error('An unexpected error occurred.');
          }
        } else {
          toast.error('Network error. Please try again.');
        }
        return Promise.reject(error);
      }
    );
  }

  // GET request
  public async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  // POST request
  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  // PUT request
  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  // DELETE request
  public async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }
}

export default new ApiService();
