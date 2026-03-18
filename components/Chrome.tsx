"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Only hide header/footer inside the actual dashboard pages
  // Auth pages (login/register) still get the site header
  const isDashboard =
    (pathname?.startsWith("/employer") &&
      !pathname?.includes("/login") &&
      !pathname?.includes("/register")) ||
    (pathname?.startsWith("/jobseeker") &&
      !pathname?.includes("/login") &&
      !pathname?.includes("/register"));

  return (
    <>
      {!isDashboard && <SiteHeader />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}