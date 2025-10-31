"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, X } from "lucide-react";
import Image from "next/image";

export default function PlantsTab({
  plantas,
  addPlanta,
  updatePlanta,
  removePlanta,
  handlePlantaImageSelect
}) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Plantas del Proyecto</h3>
        <Button type="button" onClick={addPlanta} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Agregar Planta
        </Button>
      </div>

      {plantas.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay plantas agregadas. Haz clic en "Agregar Planta" para comenzar.
        </div>
      ) : (
        <div className="space-y-4">
          {plantas.map((planta) => (
            <Card key={planta.id} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Planta #{planta.id}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removePlanta(planta.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre/Título</Label>
                    <Input
                      value={planta.name}
                      onChange={(e) => updatePlanta(planta.id, "name", e.target.value)}
                      placeholder="Ej: Flat tipo A - 101"
                    />
                  </div>
                  <div>
                    <Label>Tamaño (m²)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={planta.size}
                      onChange={(e) => updatePlanta(planta.id, "size", e.target.value)}
                      placeholder="56"
                    />
                  </div>
                </div>

                <div>
                  <Label>Imagen de la Planta</Label>
                  {planta.imagePreview ? (
                    <div className="relative w-full h-48 mt-2">
                      <Image
                        src={planta.imagePreview}
                        alt="Planta"
                        fill
                        className="object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          updatePlanta(planta.id, "imageFile", null);
                          updatePlanta(planta.id, "imagePreview", "");
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePlantaImageSelect(e, planta.id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
