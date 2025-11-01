"use client";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { LogOut, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // ✅ Firebase Auth maneja la sesión automáticamente
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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
                Panel Admin
              </h1>
              <p className="text-xs text-gray-500">JK Inmobiliaria</p>
            </div>
          </Link>

          {/* Acciones */}
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </div>
    </header>
  );
}
