"use client";


import { useAuth } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoggedOutHeader from "@/components/Headers/LoggedOutHeader";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/home'); // or any default logged-in page
        }
    }, [isLoggedIn, router]);

    if (isLoggedIn) {
        return null; // or a loading spinner
    }

    return (
        <div>
            <LoggedOutHeader />
            {children}
        </div>
    );
}