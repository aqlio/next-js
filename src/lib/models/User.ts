// src/lib/models/User.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from '@/lib/interfaces/IUser';

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    roles: { type: [String], default: ['owner'] },
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
    username: { type: String }, // Ensure this field exists if used
  },
  { timestamps: true }
);

const User: Model<IUserDocument> = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

export default User;
