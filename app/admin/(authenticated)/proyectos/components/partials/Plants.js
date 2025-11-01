"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, X, Upload, Building2, Maximize2 } from "lucide-react";
import Image from "next/image";

export default function PlantsTab({
  plantas,
  addPlanta,
  updatePlanta,
  removePlanta,
  handlePlantaImageSelect
}) {
  return (
    <div className="space-y-4">
      {/* Header con botón */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Plantas del Proyecto
          </h3>
          <p className="text-xs lg:text-sm text-gray-500 mt-1">
            {plantas.length === 0 ? "No hay plantas agregadas" : `${plantas.length} planta${plantas.length !== 1 ? 's' : ''} agregada${plantas.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Button 
          type="button" 
          onClick={addPlanta} 
          size="sm" 
          className="gap-2 bg-blue-600 hover:bg-blue-700 h-9 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Agregar</span>
        </Button>
      </div>

      {/* Grid de plantas */}
      {plantas.length === 0 ? (
        <Card className="p-8 lg:p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-base font-semibold text-gray-900 mb-2">
              No hay plantas agregadas
            </h4>
            <p className="text-sm text-gray-500 mb-6">
              Agrega las plantas del proyecto con sus características
            </p>
            <Button 
              type="button" 
              onClick={addPlanta} 
              size="sm" 
              className="gap-2 bg-blue-600 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Agregar Primera Planta
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
          {plantas.map((planta, index) => (
            <Card key={planta.id} className="p-4 lg:p-5 hover:shadow-lg transition-shadow">
              {/* Header de la planta */}
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {planta.name || `Planta ${index + 1}`}
                    </h4>
                    {planta.size && (
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        {planta.size} m²
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePlanta(planta.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Imagen */}
              <div className="mb-3">
                {planta.imagePreview ? (
                  <div className="relative w-full h-32 lg:h-40 group rounded-lg overflow-hidden">
                    <Image
                      src={planta.imagePreview}
                      alt={`Planta ${planta.name || index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 cursor-pointer"
                      onClick={() => {
                        updatePlanta(planta.id, "imageFile", null);
                        updatePlanta(planta.id, "imagePreview", "");
                      }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ) : (
                  <label 
                    htmlFor={`planta-image-${planta.id}`}
                    className="border-2 border-dashed border-gray-300 rounded-lg h-32 lg:h-40 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer bg-gray-50 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-0.5">
                        Click para subir imagen
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WEBP hasta 5MB
                      </p>
                    </div>
                    <Input
                      id={`planta-image-${planta.id}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePlantaImageSelect(e, planta.id)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
                <div>
                  <Label className="text-xs lg:text-sm font-medium">Nombre</Label>
                  <Input
                    value={planta.name || ""}
                    onChange={(e) => updatePlanta(planta.id, "name", e.target.value)}
                    placeholder="Tipo A - 101"
                    className="mt-1.5 h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs lg:text-sm font-medium">Tamaño (m²)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={planta.size || ""}
                    onChange={(e) => updatePlanta(planta.id, "size", e.target.value)}
                    placeholder="56.00"
                    className="mt-1.5 h-9 text-sm"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
