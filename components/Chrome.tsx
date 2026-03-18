"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isEmployer = pathname?.startsWith("/employer");
  const isJobseeker = pathname?.startsWith("/jobseeker");
  const isDashboard = isEmployer || isJobseeker;

  return (
    <>
      {!isDashboard && <SiteHeader />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}