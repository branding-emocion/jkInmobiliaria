"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    router.replace(isAuthenticated === "true" ? "/admin/proyectos" : "/admin/login");
  }, [router]);

  return null; // No renderiza nada, solo redirige
}
