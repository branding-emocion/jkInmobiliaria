"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Plus, CheckCircle2, AlertCircle, List, Info } from "lucide-react";
import Image from "next/image";

export default function DescriptionTab({
  formData,
  handleInputChange,
  caracteristicas,
  nuevaCaracteristica,
  setNuevaCaracteristica,
  agregarCaracteristica,
  eliminarCaracteristica,
  tempFiles,
  previews,
  handleFileSelect,
  removeFile,
  mode
}) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Información Básica */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Información Básica
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Nombre del Proyecto <span className="text-red-500">*</span></Label>
              <Input
                value={formData.Name}
                onChange={(e) => handleInputChange("Name", e.target.value)}
                placeholder="Ej: EDIFICIO AURORA"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label>Estado del Proyecto</Label>
              <Select value={formData.Status} onValueChange={(value) => handleInputChange("Status", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Vendido">Vendido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tipo de Inmuebles</Label>
              <Input
                value={formData.Type}
                onChange={(e) => handleInputChange("Type", e.target.value)}
                placeholder="Ej: Flat, Dúplex"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Dirección</Label>
              <Input
                value={formData.Direction}
                onChange={(e) => handleInputChange("Direction", e.target.value)}
                placeholder="Dirección completa del proyecto"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <List className="w-5 h-5 text-blue-600" />
            Características del Proyecto
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Agrega las características principales del proyecto.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex gap-2">
              <Input
                value={nuevaCaracteristica}
                onChange={(e) => setNuevaCaracteristica(e.target.value)}
                placeholder="Ej: Cochera techada"
                className="flex-1 h-11 bg-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    agregarCaracteristica();
                  }
                }}
              />
              <Button type="button" onClick={agregarCaracteristica} className="bg-blue-600">
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
          </div>

          {caracteristicas.length > 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <ul className="space-y-2">
                {caracteristicas.map((caracteristica, index) => (
                  <li key={index} className="flex items-start justify-between bg-white p-3 rounded-md border">
                    <span className="flex items-start gap-2 flex-1">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm">{caracteristica}</span>
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarCaracteristica(index)}
                      className="text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 border border-dashed rounded-lg">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No hay características agregadas</p>
            </div>
          )}
        </div>

        {/* Brochure PDF */}
        <div className="border-t pt-6">
          <Label className="text-sm font-semibold mb-2">Brochure del Proyecto (PDF)</Label>
          <p className="text-xs text-gray-600 mb-3">Documento PDF con información detallada (opcional)</p>
          
          {(tempFiles.brochurePDF || previews.brochurePDF) ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {tempFiles.brochurePDF ? "PDF seleccionado" : "PDF actual"}
                    </p>
                    <p className="text-xs text-green-700">
                      {tempFiles.brochurePDF ? tempFiles.brochurePDF.name : "Brochure existente"}
                    </p>
                  </div>
                </div>
                <Button type="button" variant="destructive" size="sm" onClick={() => removeFile("brochurePDF")}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-2">Selecciona el brochure en PDF</p>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileSelect(e, "brochurePDF")}
                className="max-w-xs mx-auto"
              />
            </div>
          )}
        </div>

        {/* Imagen Principal */}
        <div className="border-t pt-6">
          <Label className="text-sm font-semibold mb-2">
            Imagen Principal del Proyecto <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-gray-600 mb-3">Portada del proyecto (1200x800px)</p>
          
          {previews.imagenPrincipal ? (
            <div className="relative w-full h-48 mb-2">
              <Image
                src={previews.imagenPrincipal}
                alt="Preview"
                fill
                className="object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeFile("imagenPrincipal")}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Selecciona la imagen principal</p>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, "imagenPrincipal")}
              />
            </div>
          )}
        </div>

        {/* Nota sobre Meta */}
        <div className="border-t pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">📱 Imagen para Redes Sociales</p>
                <p className="text-xs text-blue-700">
                  Todos los proyectos comparten la misma imagen al compartirse en redes sociales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
