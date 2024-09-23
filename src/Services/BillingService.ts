// src/lib/services/BillingService.ts

import { API_PATHS } from "@/constants/apiConstants";
import { IBilling } from "@/interfaces/IBilling";
import axios, { AxiosInstance } from "axios";
import { plainToInstance } from "class-transformer";
import { Billing } from "@/models/Billing";

class BillingService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_PATHS.BILLING.GET_BILLINGS, // Adjust the API path accordingly
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetch billing information.
   * @param token 
   * @returns IBilling
   */
  async getBilling(token: string): Promise<IBilling> {
    const response = await this.axiosInstance.get<IBilling>(API_PATHS.BILLING.GET_BILLINGS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(Billing, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Update billing information.
   * @param token 
   * @param data 
   * @returns IBilling
   */
  async updateBilling(token: string, data: Partial<IBilling>): Promise<IBilling> {
    const response = await this.axiosInstance.put<IBilling>(API_PATHS.BILLING.UPDATE_BILLINGS, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(Billing, response.data, { excludeExtraneousValues: true });
  }
}

export default BillingService;
