 import "./globals.css";
import Chrome from "@/components/Chrome";

export const metadata = {
  title: "TechnicalJobBoard",
  description: "Curated technical roles from trusted teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}