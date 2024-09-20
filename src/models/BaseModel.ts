// src/models/BaseModel.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
// import { API_BASE_URL } from '../config/config';
import { handleApiError } from '../utils/ErrorHandler';


const API_BASE_URL = process.env.API_BASE_URL;


export abstract class BaseModel<T> {
  protected static apiEndpoint: string;

  protected static axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Set up request interceptor to include auth token
  protected static setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Method to remove auth token
  protected static removeAuthToken() {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }

  // Deserialize JSON to class instance
  protected static fromJSON<U>(this: new () => U, json: any): U {
    return plainToClass(this, json, { excludeExtraneousValues: true });
  }

  // Create a new instance
  static async create<U>(this: new () => U, data: Partial<U>): Promise<U> {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(this.apiEndpoint, data);
      return this.fromJSON(response.data);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  // Retrieve an instance by ID
  static async getById<U>(this: new () => U, id: string): Promise<U> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(`${this.apiEndpoint}/${id}`);
      return this.fromJSON(response.data);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  // Retrieve all instances with optional query parameters
  static async getAll<U>(this: new () => U, params?: Record<string, any>): Promise<U[]> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(this.apiEndpoint, { params });
      return response.data.map((item: any) => this.fromJSON(item));
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  // Update an existing instance
  async update(): Promise<this> {
    try {
      const constructor = this.constructor as typeof BaseModel;
      const response: AxiosResponse = await constructor.axiosInstance.put(
        `${constructor.apiEndpoint}/${(this as any).id}`,
        this
      );
      Object.assign(this, constructor.fromJSON(response.data));
      return this;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  // Delete an instance
  async delete(): Promise<void> {
    try {
      const constructor = this.constructor as typeof BaseModel;
      await constructor.axiosInstance.delete(`${constructor.apiEndpoint}/${(this as any).id}`);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
}
