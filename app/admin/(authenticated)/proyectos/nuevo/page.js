"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Loader2 } from "lucide-react";
import Link from "next/link";
import Form from "../components/_Form";

export default function NuevoProyecto() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="pb-12">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Proyecto</h1>
            <p className="text-sm text-gray-500 mt-1">Completa la información del proyecto inmobiliario</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Info className="w-4 h-4" />
            <span className="hidden md:inline">Los campos con * son obligatorios</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Form mode="create" onLoadingChange={setLoading} />
        
        {/* Botones */}
        <div className="flex justify-end gap-4 mt-6">
          <Link href="/admin/proyectos">
            <Button type="button" variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" form="proyecto-form" disabled={loading} className="bg-blue-600 hover:bg-blue-700 gap-2">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear Proyecto"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
