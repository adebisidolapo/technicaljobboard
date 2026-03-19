import "./globals.css";
import Chrome from "@/components/Chrome";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "TechnicalJobBoard",
  description: "Curated technical roles from trusted teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.variable} font-sans min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}