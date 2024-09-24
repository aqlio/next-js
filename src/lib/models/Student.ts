// src/lib/models/Student.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IStudent } from '@/lib/interfaces/IStudent';

export interface IStudentDocument extends IStudent, Document {
  id: string; // Virtual field
}

const StudentSchema: Schema<IStudentDocument> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    roles: { type: [String], default: ['student'] },
    googleId: { type: String },
    provider: { type: String, default: 'local' },
    photoUrl: { type: String },
    displayName: { type: String },
    orgId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    hashedPassword: { type: String },
    salt: { type: String },
    emailConfirmToken: { type: String },
    resetToken: { type: String },
    trackingPermission: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    last_login: { type: Date },
    last_login_ip: { type: String },
  },
  { timestamps: true }
);

// Virtual for 'id'
StudentSchema.virtual('id').get(function (this: IStudentDocument) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
StudentSchema.set('toJSON', {
  virtuals: true,
});
StudentSchema.set('toObject', {
  virtuals: true,
});

const Student: Model<IStudentDocument> = mongoose.models.Student || mongoose.model<IStudentDocument>('Student', StudentSchema);

export default Student;
