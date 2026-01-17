import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteHeader from "./components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Technical Job Board",
  description: "Where technical careers meet opportunity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-50 font-sans antialiased">
        <SiteHeader />
        {/* Push content down so sticky header doesn't cover it */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
