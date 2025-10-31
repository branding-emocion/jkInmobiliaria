"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Plus, CheckCircle2, AlertCircle, List, Info } from "lucide-react";
import Image from "next/image";

const scrollbarStyles = {
  maxHeight: '140px',
  scrollbarWidth: 'thin',
  scrollbarColor: '#d1d5db #f3f4f6'
};

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 auto-rows-fr">
      {/* Información Básica */}
      <Card className="p-4 lg:p-5">
        <h3 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 flex items-center gap-2 text-gray-900">
          <Info className="w-4 h-4 text-blue-600" />
          Información Básica
        </h3>
        
        <div className="space-y-2.5 lg:space-y-3">
          <div>
            <Label className="text-xs lg:text-sm font-medium">Nombre del Proyecto <span className="text-red-500">*</span></Label>
            <Input
              value={formData.Name}
              onChange={(e) => handleInputChange("Name", e.target.value)}
              placeholder="Ej: EDIFICIO AURORA"
              required
              className="mt-1.5 h-9 lg:h-10 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:gap-3">
            <div>
              <Label className="text-xs lg:text-sm font-medium">Estado</Label>
              <Select value={formData.Status} onValueChange={(value) => handleInputChange("Status", value)}>
                <SelectTrigger className="mt-1.5 h-9 lg:h-10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Vendido">Vendido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs lg:text-sm font-medium">Tipo</Label>
              <Input
                value={formData.Type}
                onChange={(e) => handleInputChange("Type", e.target.value)}
                placeholder="Flat, Dúplex"
                className="mt-1.5 h-9 lg:h-10 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs lg:text-sm font-medium">Dirección</Label>
            <Input
              value={formData.Direction}
              onChange={(e) => handleInputChange("Direction", e.target.value)}
              placeholder="Dirección completa"
              className="mt-1.5 h-9 lg:h-10 text-sm"
            />
          </div>
        </div>
      </Card>

      {/* Imagen Principal */}
      <Card className="p-4 lg:p-5">
        <Label className="text-xs lg:text-sm font-semibold mb-3 flex items-center gap-2">
          🖼️ Imagen Principal <span className="text-red-500">*</span>
        </Label>
        {previews.imagenPrincipal ? (
          <div className="relative w-full h-40 sm:h-48 lg:h-52 group">
            <Image
              src={previews.imagenPrincipal}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
              onClick={() => removeFile("imagenPrincipal")}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 sm:h-48 lg:h-52 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="w-8 lg:w-10 h-8 lg:h-10 text-gray-400 mb-2" />
            <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">Arrastra o haz click</p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e, "imagenPrincipal")}
              className="max-w-[180px] lg:max-w-[200px] text-xs"
            />
          </div>
        )}
      </Card>

      {/* Características */}
      <Card className="p-4 lg:p-5 flex flex-col">
        <h3 className="text-sm lg:text-base font-semibold mb-2.5 lg:mb-3 flex items-center gap-2 text-gray-900">
          <List className="w-4 h-4 text-blue-600" />
          Características
        </h3>
        
        <div className="flex gap-2 mb-2.5 lg:mb-3">
          <Input
            value={nuevaCaracteristica}
            onChange={(e) => setNuevaCaracteristica(e.target.value)}
            placeholder="Ej: Cochera techada"
            className="flex-1 h-9 text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                agregarCaracteristica();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={agregarCaracteristica} 
            size="sm" 
            className="bg-blue-600 h-9 px-2.5 lg:px-3"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {caracteristicas.length > 0 ? (
          <>
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f3f4f6;
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #d1d5db;
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
              }
            `}</style>
            <div 
              className="bg-gray-50 rounded-lg p-2.5 lg:p-3 overflow-y-auto custom-scrollbar"
              style={scrollbarStyles}
            >
              <ul className="space-y-1.5">
                {caracteristicas.map((caracteristica, index) => (
                  <li key={index} className="flex items-center justify-between bg-white p-2 lg:p-2.5 rounded border hover:border-blue-300 transition-colors">
                    <span className="flex items-center gap-2 flex-1 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                      <span className="text-xs lg:text-sm truncate">{caracteristica}</span>
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarCaracteristica(index)}
                      className="text-red-600 h-6 w-6 lg:h-7 lg:w-7 p-0 flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 border border-dashed rounded-lg min-h-[100px]">
            <div className="text-center py-4 lg:py-6">
              <AlertCircle className="w-5 lg:w-6 h-5 lg:h-6 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">No hay características</p>
            </div>
          </div>
        )}
      </Card>

      {/* Brochure PDF */}
      <Card className="p-4 lg:p-5">
        <Label className="text-xs lg:text-sm font-semibold mb-3 flex items-center gap-2">
          📄 Brochure (PDF)
        </Label>
        {(tempFiles.brochurePDF || previews.brochurePDF) ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 h-40 sm:h-48 lg:h-52 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 lg:w-16 h-12 lg:h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <svg className="w-8 lg:w-10 h-8 lg:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs lg:text-sm font-medium text-green-900 mb-1">
                {tempFiles.brochurePDF ? "PDF Seleccionado" : "PDF Actual"}
              </p>
              <p className="text-xs text-green-700 mb-2 lg:mb-3 truncate max-w-[150px] lg:max-w-[200px] mx-auto">
                {tempFiles.brochurePDF ? tempFiles.brochurePDF.name : "Brochure existente"}
              </p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => removeFile("brochurePDF")}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Eliminar
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 sm:h-48 lg:h-52 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="w-8 lg:w-10 h-8 lg:h-10 text-gray-400 mb-2" />
            <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">Arrastra o haz click</p>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileSelect(e, "brochurePDF")}
              className="max-w-[180px] lg:max-w-[200px] text-xs"
            />
          </div>
        )}
      </Card>
    </div>
  );
}
