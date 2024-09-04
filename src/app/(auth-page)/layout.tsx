import LoggedOutHeader from "@/components/Headers/LoggedOutHeader";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <LoggedOutHeader />
                {children}
            </body>
        </html>
    );
}