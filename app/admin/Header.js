"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Images,
  LogOut,
  Globe,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // 👉 Ocultar header en la página de login
  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* === LOGO === */}
          <Link href="/admin/proyectos" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all">
              <Image
                src="/logo1.jpg"
                alt="JK Inmobiliaria"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-gray-900 leading-tight">
                Panel Administrativo
              </h1>
              <p className="text-xs text-gray-500">JK Inmobiliaria</p>
            </div>
          </Link>

          {/* === MENÚ DE NAVEGACIÓN === */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link href="/admin/proyectos">
              <Button
                variant={pathname.startsWith("/admin/proyectos") ? "default" : "ghost"}
                size="sm"
                className={`gap-2 h-9 ${
                  pathname.startsWith("/admin/proyectos")
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Proyectos</span>
              </Button>
            </Link>

            <Link href="/admin/carrousel">
              <Button
                variant={pathname.startsWith("/admin/carrousel") ? "default" : "ghost"}
                size="sm"
                className={`gap-2 h-9 ${
                  pathname.startsWith("/admin/carrousel")
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Images className="w-4 h-4" />
                <span className="hidden sm:inline">Carrusel</span>
              </Button>
            </Link>

            <Link href="/" target="_blank">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 h-9"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Ver Sitio</span>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>

            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50 h-9"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline text-sm">Salir</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
