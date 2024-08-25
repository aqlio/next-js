import TeacherLoggedInHeader from "@/components/Headers/TeacherLoggedInHeader";

export default function TeacherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <TeacherLoggedInHeader />
                {children}
            </body>
        </html>
    );
}