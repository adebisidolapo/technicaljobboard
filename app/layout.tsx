import "./globals.css";
import Chrome from "@/components/Chrome";
import { Inter, Baloo_2 } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-title",
});

export const metadata = {
  title: "TechnicalJobBoard",
  description: "Curated technical roles from trusted teams."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${baloo.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}