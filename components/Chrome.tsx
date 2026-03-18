"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isEmployerDashboard =
    pathname?.startsWith("/employer") &&
    !pathname?.includes("/login") &&
    !pathname?.includes("/register");

  const isJobseekerDashboard =
    pathname?.startsWith("/jobseeker") &&
    !pathname?.includes("/login") &&
    !pathname?.includes("/register");

  const isDashboard = isEmployerDashboard || isJobseekerDashboard;

  return (
    <>
      {!isDashboard && <SiteHeader />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}