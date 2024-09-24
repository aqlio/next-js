// src/lib/models/Billing.ts

import { Expose } from 'class-transformer';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { IBilling } from '@/lib/interfaces/IBilling';
import { BaseModel } from './BaseModel';
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBillingDocument extends IBilling, Document {
  id: string; // Virtual field
}

const BillingSchema: Schema<IBillingDocument> = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    address_line: { type: String, required: true },
    city: { type: String, required: true },
    state_code: { type: String, required: true },
    country_code: { type: String, required: true },
    postal: { type: String, required: true },
    currency: { type: String, required: true },
    gst_number: { type: String, required: true },
    emails: { type: [String], required: true },
  },
  { timestamps: true }
);

// Virtual for 'id'
BillingSchema.virtual('id').get(function (this: IBillingDocument) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
BillingSchema.set('toJSON', {
  virtuals: true,
});
BillingSchema.set('toObject', {
  virtuals: true,
});

const Billing: Model<IBillingDocument> = mongoose.models.Billing || mongoose.model<IBillingDocument>('Billing', BillingSchema);

export default Billing;
