// src/lib/Services/BillingService.ts

import ApiService from './ApiService';
import { API_PATHS } from '@/lib/constants/apiConstants';
import { IBilling } from '@/lib/interfaces/IBilling';

class BillingService {
  /**
   * Fetch billing information.
   * @returns IBilling
   */
  async getBilling(): Promise<IBilling> {
    const response = await ApiService.get<{ data: IBilling }>(API_PATHS.BILLING.GET_BILLINGS);
    return response.data;
  }

  /**
   * Update billing information.
   * @param data 
   * @returns IBilling
   */
  async updateBilling(data: Partial<IBilling>): Promise<IBilling> {
    const response = await ApiService.put<{ data: IBilling }>(API_PATHS.BILLING.UPDATE_BILLINGS, data);
    return response.data;
  }
}

export default new BillingService();
