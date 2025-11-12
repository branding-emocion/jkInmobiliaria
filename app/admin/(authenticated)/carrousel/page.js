"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Image as ImageIcon,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
export default function CarrouselAdmin() {
  const [banners, setBanners] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // === Cargar banners ===
  const loadBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/carrousel");
      const data = await res.json();
      if (data.success) setBanners(data.banners);
    } catch (error) {
      toast.error("Error al cargar los banners");
      console.error("Error al cargar banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  // === Subir nuevo banner ===
  const handleUpload = async () => {
    if (!file || !titulo) {
      toast.warning("Completa el título y selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);

    setUploading(true);
    try {
      const res = await fetch("/api/carrousel", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        toast.success("✅ Banner agregado correctamente");
        setTitulo("");
        setDescripcion("");
        setFile(null);
        loadBanners();
      } else {
        toast.error("❌ Error: " + result.error);
      }
    } catch (error) {
      toast.error("❌ Error al subir: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // === Eliminar banner ===
  const handleDelete = async (id) => {
    if (!confirm("¿Deseas eliminar este banner?")) return;
    try {
      const res = await fetch(`/api/carrousel/${id}`, { method: "DELETE" });
      const result = await res.json();

      if (result.success) {
        toast.success("🗑️ Banner eliminado correctamente");
        loadBanners();
      } else {
        toast.error("❌ Error al eliminar el banner");
      }
    } catch (error) {
      toast.error("❌ Error de conexión al eliminar");
      console.error("Error al eliminar:", error);
    }
  };

  // === Activar/Desactivar ===
  const toggleActivo = async (id, estado) => {
    try {
      const res = await fetch(`/api/carrousel/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: !estado }),
      });
      const result = await res.json();

      if (result.success) {
        toast.success(
          !estado ? "✅ Banner activado" : "🚫 Banner desactivado"
        );
        loadBanners();
      } else {
        toast.error("❌ Error al cambiar estado");
      }
    } catch (error) {
      toast.error("❌ Error al cambiar estado");
      console.error("Error al cambiar estado:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* === ENCABEZADO === */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-blue-600" />
          Carrusel Principal
        </h1>
      </div>

      {/* === FORMULARIO === */}
      <Card className="p-6 bg-white shadow-md border-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Agregar nuevo banner
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="col-span-full border border-gray-200 rounded-md p-2 text-sm cursor-pointer"
          />
        </div>
        <div className="mt-5">
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> Subir Banner
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* === LISTA === */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Cargando banners...</p>
      ) : banners.length === 0 ? (
        <Card className="p-10 text-center border-0 shadow-sm bg-white">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No hay banners registrados
          </h3>
          <p className="text-gray-600 mb-4">
            Sube un banner para mostrarlo en el carrusel principal del sitio.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((b) => (
            <Card
              key={b.id}
              className="overflow-hidden shadow-sm hover:shadow-md border-0 transition-all duration-300"
            >
              <div className="relative w-full h-48 bg-gray-100">
                <Image
                  src={b.imagen}
                  alt={b.titulo}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/70 hover:bg-white"
                    onClick={() => toggleActivo(b.id, b.activo)}
                    title={b.activo ? "Desactivar" : "Activar"}
                  >
                    {b.activo ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-500" />
                    )}
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/70 hover:bg-white"
                    onClick={() => handleDelete(b.id)}
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                  {b.titulo}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {b.descripcion || "Sin descripción"}
                </p>
                <div className="mt-3">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      b.activo
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {b.activo ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
