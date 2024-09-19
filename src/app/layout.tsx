import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/app/ReduxProvider"; // adjust this path as needed
import AuthInitializer from "@/components/AuthInitializer";
import Footer from "@/components/Footer"; // Add this import
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "My Academy - Tuition Academy Management Software",
	description: "Streamline your tuition academy operations with My Academy. Manage students, classes, attendance, and more efficiently.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReduxProvider>
					<AuthInitializer />
					<div className="flex flex-col min-h-screen">
						<main className="flex-grow">
							{children}
						</main>
						<Footer />
					</div>
				</ReduxProvider>
			</body>
		</html>
	);
}