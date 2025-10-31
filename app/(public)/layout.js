"use client";
import MenuPrincipal from "../MenuPrincipal";
import Footer from "../Footer";
import { Toaster } from "sonner";

export default function PublicLayout({ children }) {
  return (
    <div className="max-w-[1800px] mx-auto">
      <Toaster position="top-right" richColors closeButton />
      <MenuPrincipal />
      {children}
      <Footer />
    </div>
  );
}
