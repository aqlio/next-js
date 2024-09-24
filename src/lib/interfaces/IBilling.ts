// src/interfaces/IBilling.ts
export interface IBilling {
    name: string;
    address: string;
    address_line: string;
    city: string;
    state_code: string;
    country_code: string;
    postal: string;
    currency: string;
    gst_number: string;
    emails: string[];
  }
  