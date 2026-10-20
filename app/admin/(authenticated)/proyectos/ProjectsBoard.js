"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building,
  Edit,
  Eye,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ToggleVisible from "./ToggleVisible";
import DeleteButton from "./DeleteButton";

// 🗂️ Tablero kanban: arrastra las tarjetas (o usa las flechas) para
// definir el orden en que aparecen los proyectos en el sitio público
export default function ProjectsBoard({ proyectos = [], filter = "Todas" }) {
  const [items, setItems] = useState(proyectos);
  const [dragIndex, setDragIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const router = useRouter();

  // Sincronizar cuando el servidor re-renderiza (p.ej. al cambiar filtro)
  useEffect(() => {
    setItems(proyectos);
  }, [proyectos]);

  // === Guardar el nuevo orden ===
  const saveOrder = async (orderedItems) => {
    setSavingOrder(true);
    setItems(orderedItems); // actualización optimista
    try {
      const res = await fetch("/api/proyectos/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: orderedItems.map((p) => p.id) }),
      });
      const result = await res.json();

      if (result.success) {
        toast.success("↕️ Orden guardado correctamente");
        router.refresh();
      } else {
        toast.error("❌ Error al guardar el orden: " + (result.error || ""));
      }
    } catch (error) {
      toast.error("❌ Error de conexión al guardar el orden");
      console.error("Error al guardar el orden:", error);
    } finally {
      setSavingOrder(false);
    }
  };

  // === Mover con flechas (subir/bajar) ===
  const moverProyecto = (index, direccion) => {
    if (savingOrder) return;
    const nuevo = [...items];
    const target = index + direccion;
    if (target < 0 || target >= nuevo.length) return;
    [nuevo[index], nuevo[target]] = [nuevo[target], nuevo[index]];
    saveOrder(nuevo);
  };

  // === Drag & Drop (arrastrar y soltar) ===
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setHoverIndex(null);
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      return;
    }
    const nuevo = [...items];
    const [movido] = nuevo.splice(dragIndex, 1);
    nuevo.splice(index, 0, movido);
    saveOrder(nuevo);
    setDragIndex(null);
  };

  return (
    <div>
      {/* Pista de uso */}
      <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
        {savingOrder ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
            <span>Guardando orden...</span>
          </>
        ) : (
          <>
            <GripVertical className="w-4 h-4 text-gray-300" />
            <span>
              Arrastra las tarjetas o usa las flechas ↑ ↓ para elegir el orden
              en que aparecen los proyectos en el sitio.
            </span>
          </>
        )}
      </div>
      {filter !== "Todas" && (
        <p className="mb-4 text-[11px] text-amber-600">
          💡 Consejo: organiza el orden en la vista «Todas» para que aplique a
          todos los proyectos de forma global.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((proyecto, index) => (
          <Card
            key={proyecto.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={() => {
              setDragIndex(null);
              setHoverIndex(null);
            }}
            onDragOver={handleDragOver}
            onDragEnter={() => setHoverIndex(index)}
            onDrop={(e) => handleDrop(e, index)}
            className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm group cursor-grab active:cursor-grabbing ${
              dragIndex === index ? "opacity-50 scale-95" : ""
            } ${
              dragIndex !== null &&
              hoverIndex === index &&
              dragIndex !== index
                ? "ring-2 ring-blue-400"
                : ""
            }`}
          >
            {/* Número de posición */}
            <div className="absolute top-2 left-2 z-10 bg-blue-600/90 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
              {index + 1}
            </div>

            <div className="relative h-40 overflow-hidden bg-gray-100">
              {proyecto.Imagen ? (
                <Image
                  src={proyecto.Imagen}
                  alt={proyecto.Name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Building className="w-10 h-10 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <span
                className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold backdrop-blur-sm shadow-md ${
                  proyecto.Status === "Disponible"
                    ? "bg-green-500/90 text-white"
                    : proyecto.Status === "Vendido"
                    ? "bg-purple-500/90 text-white"
                    : proyecto.Status === "Próximamente"
                    ? "bg-amber-500/90 text-white"
                    : "bg-gray-700/90 text-white"
                }`}
              >
                {proyecto.Status}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-base mb-1 text-gray-900 line-clamp-1">
                {proyecto.Name}
              </h3>
              <p className="text-xs text-gray-600 font-medium mb-3">
                {proyecto.Type}
              </p>

              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1.5">
                  <Link
                    href={`/Proyectos/${proyecto.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer w-full gap-1 text-xs h-8 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Ver
                    </Button>
                  </Link>

                  <Link
                    href={`/admin/proyectos/editar/${proyecto.id}`}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="cursor-pointer w-full gap-1 text-xs h-8 bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Editar
                    </Button>
                  </Link>
                </div>

                <div className="flex gap-1.5 items-center">
                  <div className="flex-1 min-w-0">
                    <ToggleVisible
                      id={proyecto.id}
                      nombre={proyecto.Name}
                      visible={proyecto.visible}
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0 cursor-pointer"
                    onClick={() => moverProyecto(index, -1)}
                    disabled={index === 0}
                    title="Subir"
                  >
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0 cursor-pointer"
                    onClick={() => moverProyecto(index, 1)}
                    disabled={index === items.length - 1}
                    title="Bajar"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </Button>
                  <DeleteButton id={proyecto.id} nombre={proyecto.Name} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
