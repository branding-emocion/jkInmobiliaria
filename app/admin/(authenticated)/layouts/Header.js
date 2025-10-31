"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    router.push("/admin/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo y Título */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                <Image
                  src="/logo1.jpg"
                  alt="JK Inmobiliaria"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Panel de Administración
                </h1>
                <p className="text-xs text-gray-500 font-medium">JK Inmobiliaria</p>
              </div>
            </Link>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Ver Sitio</span>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
