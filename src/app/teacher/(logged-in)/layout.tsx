import TeacherLoggedInHeader from "@/components/Headers/TeacherLoggedInHeader";
import TeacherLeftNavigation from "@/components/Navigations/TeacherLeftNavigation";

export default function TeacherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <TeacherLeftNavigation />
            <TeacherLoggedInHeader />
            {children}
        </div>
    );
}