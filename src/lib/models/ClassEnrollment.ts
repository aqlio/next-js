// src/lib/models/ClassEnrollment.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IClassEnrollment } from '@/lib/interfaces/IClassEnrollment';

export interface IClassEnrollmentDocument extends IClassEnrollment, Document {
  id: string; // Virtual field
}

const ClassEnrollmentSchema: Schema<IClassEnrollmentDocument> = new Schema(
  {
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    orgId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { type: String, enum: ['pending', 'enrolled', 'rejected'], default: 'pending' },
    scores: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
    deleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Virtual for 'id'
ClassEnrollmentSchema.virtual('id').get(function (this: IClassEnrollmentDocument) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
ClassEnrollmentSchema.set('toJSON', {
  virtuals: true,
});
ClassEnrollmentSchema.set('toObject', {
  virtuals: true,
});

const ClassEnrollment: Model<IClassEnrollmentDocument> = mongoose.models.ClassEnrollment || mongoose.model<IClassEnrollmentDocument>('ClassEnrollment', ClassEnrollmentSchema);

export default ClassEnrollment;
