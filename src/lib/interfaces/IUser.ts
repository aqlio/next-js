// src/interfaces/IUser.ts
export interface IUser {
    email: string;
    roles: string[];
    googleId?: string;
    provider?: string;
    photoUrl?: string;
    displayName?: string;
    orgId?: string;
    hashedPassword?: string;
    salt?: string;
    emailConfirmToken?: string;
    resetToken?: string;
    trackingPermission: boolean;
    emailVerified: boolean;
    deleted: boolean;
    last_login?: string; // ISO string
    last_login_ip?: string;
    createdAt?: string; // ISO string
    updatedAt?: string; // ISO string
    username?: string;
  }
  