import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/constants/apiConstants';

export default class BaseApiService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  protected setAuthToken(token: string) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}