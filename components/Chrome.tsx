"use client";

import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
}