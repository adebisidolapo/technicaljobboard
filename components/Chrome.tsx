"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.includes("/login") ||
    pathname?.includes("/register");

  const isEmployerDashboard =
    pathname?.startsWith("/employer") && !isAuthPage;

  const isJobseekerDashboard =
    pathname?.startsWith("/jobseeker") && !isAuthPage;

  const isDashboard = isEmployerDashboard || isJobseekerDashboard;

  return (
    <>
      {!isDashboard && <SiteHeader />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}