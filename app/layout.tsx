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
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
