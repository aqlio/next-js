// src/utils/ErrorHandler.ts
import { AxiosError } from 'axios';

export function handleApiError(error: any): void {
  if (error.isAxiosError) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('API Error:', axiosError.response.status, axiosError.response.data);
      // You can implement more sophisticated error handling here
    } else if (axiosError.request) {
      console.error('No response received:', axiosError.request);
    } else {
      console.error('Axios Error:', axiosError.message);
    }
  } else {
    console.error('Unexpected Error:', error);
  }
}
