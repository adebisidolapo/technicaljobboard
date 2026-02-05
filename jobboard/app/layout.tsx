import "./globals.css";
import type { Metadata } from "next";
import Footer from "../components/Footer";
import SiteHeader from "../components/SiteHeader";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
