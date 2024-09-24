// src/repositories/BaseRepository.ts

import axios, { AxiosInstance, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { API_BASE_URL } from "../config/config";
import { handleApiError } from "../lib/utils/ErrorHandler";
import { IRepository } from "./IRepository";
import { BaseModel } from "../models/BaseModel";

export abstract class BaseRepository<T extends BaseModel> implements IRepository<T> {
  protected abstract apiEndpoint: string;
  protected abstract modelClass: new (partial?: Partial<T>) => T;

  protected axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  /**
   * Set the authentication token for Axios instance.
   */
  setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Remove the authentication token from Axios instance.
   */
  removeAuthToken() {
    delete this.axiosInstance.defaults.headers.common["Authorization"];
  }

  /**
   * Create a new entity via POST request.
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(this.apiEndpoint, data);
      return plainToInstance(this.modelClass, response.data, { excludeExtraneousValues: true });
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  /**
   * Retrieve an entity by ID via GET request.
   */
  async getById(id: string): Promise<T> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(`${this.apiEndpoint}/${id}`);
      return plainToInstance(this.modelClass, response.data, { excludeExtraneousValues: true });
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  /**
   * Retrieve all entities via GET request with optional query parameters.
   */
  async getAll(params?: Record<string, any>): Promise<T[]> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(this.apiEndpoint, { params });
      return response.data.map((item: any) =>
        plainToInstance(this.modelClass, item, { excludeExtraneousValues: true })
      );
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  /**
   * Update an existing entity via PUT request.
   */
  async update(entity: T): Promise<T> {
    try {
      const id = (entity as any).id;
      const response: AxiosResponse = await this.axiosInstance.put(`${this.apiEndpoint}/${id}`, entity.toJSON());
      return plainToInstance(this.modelClass, response.data, { excludeExtraneousValues: true });
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  /**
   * Delete an entity via DELETE request.
   */
  async delete(id: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`${this.apiEndpoint}/${id}`);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
}
