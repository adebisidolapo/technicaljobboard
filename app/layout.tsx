import "./globals.css";
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
  description: "Find technical jobs across the United States",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${baloo.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}