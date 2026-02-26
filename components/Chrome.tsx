"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Employer area should NOT show public header/footer
  const isEmployer = pathname?.startsWith("/employer");

  return (
    <>
      {!isEmployer && <SiteHeader />}
      {children}
      {!isEmployer && <Footer />}
    </>
  );
}