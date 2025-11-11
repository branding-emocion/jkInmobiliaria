import { adminDb } from "@/lib/firebase-admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, Plus, Edit, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

async function getProyectos(filter) {
  try {
    let query = adminDb
      .collection("proyectos")
      .orderBy("createdAt", "desc")
      .limit(50);

    if (filter && filter !== "Todas") {
      query = query.where("Status", "==", filter);
    }

    const snapshot = await query.get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
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
  ];

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

      {/* Projects Grid */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {proyectos.map((proyecto, index) => (
            <Card
              key={proyecto.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm group"
            >
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

                <div className="flex gap-1.5">
                  <Link href={`/Proyectos/${index}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer w-full gap-1 text-xs h-8 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Ver
                    </Button>
                  </Link>
                  <Link href={`/admin/proyectos/editar/${proyecto.id}`} className="flex-1">
                    <Button
                      size="sm"
                      className="cursor-pointer w-full gap-1 text-xs h-8 bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Editar
                    </Button>
                  </Link>
                  
                  {/* ✅ Client Component para eliminar */}
                  <DeleteButton id={proyecto.id} nombre={proyecto.Name} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
