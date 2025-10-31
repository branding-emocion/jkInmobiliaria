"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export default function ToursTab({
  recorridos,
  addRecorrido,
  updateRecorrido,
  removeRecorrido
}) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recorridos Virtuales 360°</h3>
        <Button type="button" onClick={addRecorrido} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Agregar Recorrido
        </Button>
      </div>

      {recorridos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay recorridos virtuales agregados. Haz clic en "Agregar Recorrido" para comenzar.
        </div>
      ) : (
        <div className="space-y-4">
          {recorridos.map((recorrido) => (
            <Card key={recorrido.id} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Recorrido #{recorrido.id}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeRecorrido(recorrido.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Título/Departamento</Label>
                    <Input
                      value={recorrido.dpto}
                      onChange={(e) => updateRecorrido(recorrido.id, "dpto", e.target.value)}
                      placeholder="Ej: DEP.101 (TIPO A)"
                    />
                  </div>
                  <div>
                    <Label>URL del Recorrido Virtual</Label>
                    <Input
                      value={recorrido.url}
                      onChange={(e) => updateRecorrido(recorrido.id, "url", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
