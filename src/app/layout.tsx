import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.scss";

import { Header } from "@/components/header";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Stack Learner | Building knowledge in public.",
	description:
		"Stack Learner is Guilherme's personal journal / portfolio, where he explores and shares insights about the world of Software Engineering through code and continuous learning.",
	openGraph: {
		title: "Stack Learner | Building knowledge in public.",
		description:
			"Stack Learner is Guilherme's personal journal / portfolio, where he explores and shares insights about the world of Software Engineering through code and continuous learning.",
		type: "website",
		images: [
			{
				url: "/og-image.webp",
				width: 1200,
				height: 630,
			},
		],
		url: "https://example.com",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />

				{children}
			</body>
		</html>
	);
}
