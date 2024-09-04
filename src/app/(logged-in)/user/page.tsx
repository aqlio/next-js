"use client";

import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchUserData } from '@/store/authSlice';

export default function UserPage() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Provider:</strong> {user.provider}</p>
          <p><strong>Organization ID:</strong> {user.orgId}</p>
          <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
        </CardContent>
      </Card>
    </div>
  );
}