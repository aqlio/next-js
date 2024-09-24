// src/lib/models/Class.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IClass } from '@/lib/interfaces/IClass';

export interface IClassDocument extends IClass, Document {
  id: string; // Adding virtual 'id'
}

const ClassSchema: Schema<IClassDocument> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    classCode: { type: String, required: true, unique: true },
    orgId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: Date, required: true },
    durationInSeconds: { type: Number, required: true },
    tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Virtual for 'id' to map to '_id'
ClassSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
ClassSchema.set('toJSON', {
  virtuals: true,
});

const Class: Model<IClassDocument> = mongoose.models.Class || mongoose.model<IClassDocument>('Class', ClassSchema);

export default Class;
