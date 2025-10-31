"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, ArrowLeft, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si ya está autenticado
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (isAuthenticated === "true") {
      router.push("/admin/proyectos");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminAuthenticated", "true");
        router.push("/admin/proyectos");
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Contenedor Principal */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl">
          {/* Logo y Título */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg mb-4">
              <Image
                src="/logo1.jpg"
                alt="JK Inmobiliaria"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Panel de Administración
            </h1>
            <p className="text-gray-600 text-center mt-2 font-medium">
              JK Inmobiliaria
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Acceso Restringido</span>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jkinmobiliaria.com"
                required
                disabled={loading}
                className="h-11"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="h-11"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          {/* Link al sitio público */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              <Globe className="w-4 h-4" />
              Ver sitio web público
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
