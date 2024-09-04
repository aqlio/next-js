import ProtectedRoute from '@/components/ProtectedRoute';
import LoggedInHeader from "@/components/Headers/LoggedInHeader";

export default function TeacherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute>
            <div>
                <LoggedInHeader />
                {children}
            </div>
        </ProtectedRoute>
    );
}