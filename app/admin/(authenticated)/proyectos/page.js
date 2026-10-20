import { adminDb } from "@/lib/firebase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, Plus } from "lucide-react";
import Link from "next/link";
import ProjectsBoard from "./ProjectsBoard";

// 🗂️ Modo kanban: las tarjetas se pueden arrastrar para reordenar;
// ese orden es el que el sitio público respeta al mostrar los proyectos.

async function getProyectos(filter) {
  try {
    // Traer todos los proyectos ordenados por fecha
    const snapshot = await adminDb
      .collection("proyectos")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    // Convertir a arreglo JS
    let proyectos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ↕️ Respetar el orden manual (kanban); los sin "orden" van al final
    proyectos.sort((a, b) => {
      const oa = a.orden ?? Number.MAX_SAFE_INTEGER;
      const ob = b.orden ?? Number.MAX_SAFE_INTEGER;
      return oa - ob;
    });

    // ✅ Filtrado flexible (no sensible a mayúsculas/plurales)
    if (filter && filter !== "Todas") {
      proyectos = proyectos.filter(
        (p) =>
          p.Status &&
          p.Status.toString().toLowerCase().includes(filter.toLowerCase())
      );
    }

    return proyectos;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default async function AdminDashboard({ searchParams }) {
  const params = await searchParams;
  const filter = params?.filter || "Todas";
  const proyectos = await getProyectos(filter);

  const filters = [
    { label: "Todas", value: "Todas", color: "blue" },
    { label: "Disponibles", value: "Disponible", color: "green" },
    { label: "Vendidos", value: "Vendido", color: "purple" },
    { label: "Próximamente", value: "Próximamente", color: "amber" },
  ];

  // Datos "planos" seguros para pasar al componente cliente
  // (sin objetos de Firestore como Timestamp)
  const plainProyectos = proyectos.map((p) => ({
    id: p.id,
    Imagen: p.Imagen ?? "",
    Name: p.Name ?? "",
    Type: p.Type ?? "",
    Status: p.Status ?? "",
    visible: p.visible !== false,
  }));

  return (
    <>
      {/* Barra de Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Filtros */}
        <div className="flex items-center gap-3">
          <h2 className="text-base lg:text-lg font-semibold text-gray-900">
            Proyectos
          </h2>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <Link key={f.value} href={`?filter=${f.value}`}>
                <Button
                  variant={filter === f.value ? "default" : "ghost"}
                  size="sm"
                  className={`cursor-pointer h-9 gap-2 ${
                    filter === f.value
                      ? f.color === "green"
                        ? "bg-green-600 hover:bg-green-700"
                        : f.color === "purple"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : f.color === "amber"
                        ? "bg-amber-600 hover:bg-amber-700"
                        : f.color === "gray"
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-blue-600 hover:bg-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {f.label}
                  {filter === f.value && (
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold min-w-[24px] text-center">
                      {proyectos.length}
                    </span>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/admin/proyectos/nuevo">
          <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2 shadow-md hover:shadow-lg transition-all h-9">
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </Button>
        </Link>
      </div>

      {/* Projects Grid (tablero kanban con orden manual) */}
      {proyectos.length === 0 ? (
        <Card className="p-12 text-center border-0 shadow-lg bg-white">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No hay proyectos {filter !== "Todas" && `"${filter}"`}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {filter === "Todas"
              ? "Comienza creando tu primer proyecto inmobiliario"
              : `No hay proyectos con el estado "${filter}"`}
          </p>
          <Link href="/admin/proyectos/nuevo">
            <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md">
              Crear Proyecto
            </Button>
          </Link>
        </Card>
      ) : (
        <ProjectsBoard proyectos={plainProyectos} filter={filter} />
      )}
    </>
  );
}
