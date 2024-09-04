import { Lilita_One } from "next/font/google";
import "./globals.css";

const lilita_One = Lilita_One({ subsets: ["latin"], weight: "400" });

export const metadata = {
	title: "MC Server Remote",
	description: "A web remote for my self-hosted minecraft server.",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={lilita_One.className}>{children}</body>
		</html>
	);
}
