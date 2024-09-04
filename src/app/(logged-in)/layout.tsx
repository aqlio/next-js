import LoggedInHeader from "@/components/Headers/LoggedInHeader";

export default function TeacherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <LoggedInHeader />
            {children}
        </div>
    );
}