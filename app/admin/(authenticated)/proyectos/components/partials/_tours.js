"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Globe, Link as LinkIcon, ExternalLink } from "lucide-react";

export default function ToursTab({
  recorridos,
  addRecorrido,
  updateRecorrido,
  removeRecorrido
}) {
  return (
    <div className="space-y-4">
      {/* Header con botón */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Recorridos Virtuales 360°
          </h3>
          <p className="text-xs lg:text-sm text-gray-500 mt-1">
            {recorridos.length === 0 ? "No hay recorridos agregados" : `${recorridos.length} recorrido${recorridos.length !== 1 ? 's' : ''} agregado${recorridos.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Button 
          type="button" 
          onClick={addRecorrido} 
          size="sm" 
          className="gap-2 bg-blue-600 hover:bg-blue-700 h-9"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Agregar</span>
        </Button>
      </div>

      {/* Grid de recorridos */}
      {recorridos.length === 0 ? (
        <Card className="p-8 lg:p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-base font-semibold text-gray-900 mb-2">
              No hay recorridos virtuales
            </h4>
            <p className="text-sm text-gray-500 mb-6">
              Agrega enlaces de tours 360° del proyecto
            </p>
            <Button 
              type="button" 
              onClick={addRecorrido} 
              size="sm" 
              className="gap-2 bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              Agregar Primer Recorrido
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:gap-4">
          {recorridos.map((recorrido, index) => (
            <Card key={recorrido.id} className="p-4 lg:p-5 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Badge de número */}
                <div className="flex items-start sm:items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold text-white">#{index + 1}</span>
                  </div>
                  
                  {/* Inputs */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs lg:text-sm font-medium flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 text-gray-400" />
                        Título/Departamento
                      </Label>
                      <Input
                        value={recorrido.dpto}
                        onChange={(e) => updateRecorrido(recorrido.id, "dpto", e.target.value)}
                        placeholder="DEP.101 (TIPO A)"
                        className="mt-1.5 h-9 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs lg:text-sm font-medium flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                        URL del Tour 360°
                      </Label>
                      <Input
                        value={recorrido.url}
                        onChange={(e) => updateRecorrido(recorrido.id, "url", e.target.value)}
                        placeholder="https://tour.ejemplo.com"
                        className="mt-1.5 h-9 text-sm"
                        type="url"
                      />
                    </div>
                  </div>
                </div>

                {/* Botón eliminar */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRecorrido(recorrido.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0 flex-shrink-0 sm:self-end"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Preview URL (si existe) */}
              {recorrido.url && (
                <div className="mt-3 pt-3 border-t">
                  <a 
                    href={recorrido.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1.5 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span className="truncate">{recorrido.url}</span>
                  </a>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
