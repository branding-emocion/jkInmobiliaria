"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Globe,
  ExternalLink,
  Images,
  Building2,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
          {/* Logo + título */}
          <Link
            href="/admin/authenticated/proyectos"
            className="flex items-center gap-3 group"
          >
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

          {/* Botón menú (solo móvil) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Menú principal (desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <Link href="./proyectos">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 h-9"
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm">Proyectos</span>
              </Button>
            </Link>

            <Link href="./carrousel">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 h-9"
              >
                <Images className="w-4 h-4" />
                <span className="text-sm">Carrusel</span>
              </Button>
            </Link>

            <div className="h-6 w-px bg-gray-300"></div>

            <Link href="/" target="_blank">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 h-9"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">Ver Sitio</span>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>

            <div className="h-6 w-px bg-gray-300"></div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="cursor-pointer gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50 h-9"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Salir</span>
            </Button>
          </div>
        </div>

        {/* Menú desplegable móvil */}
        {menuOpen && (
          <div className="sm:hidden flex flex-col gap-2 pb-3 border-t border-gray-200 mt-2">
            <Link
              href="./proyectos"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:bg-blue-50 rounded-md px-3 py-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Proyectos</span>
            </Link>

            <Link
              href="./carrousel"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:bg-blue-50 rounded-md px-3 py-2"
            >
              <Images className="w-4 h-4" />
              <span>Carrusel</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-gray-700 hover:bg-blue-50 rounded-md px-3 py-2"
            >
              <Globe className="w-4 h-4" />
              <span>Ver Sitio</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md px-3 py-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
