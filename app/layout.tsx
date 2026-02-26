import "./globals.css";
import Chrome from "@/components/Chrome";

export const metadata = {
  title: "TechnicalJobBoard",
  description: "Curated technical roles from trusted teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}