"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Home,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchProyectos();
  }, [currentPage, filter]);

  const fetchProyectos = async () => {
    try {
      setLoading(true);
      const statusParam = filter !== "Todas" ? `&status=${filter}` : "";
      const response = await fetch(`/api/proyectos?page=${currentPage}&limit=10${statusParam}`);
      const data = await response.json();

      if (data.success) {
        setProyectos(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching proyectos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return;

    try {
      const response = await fetch(`/api/proyectos/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Proyecto eliminado correctamente");
        fetchProyectos();
      } else {
        alert("Error al eliminar el proyecto");
      }
    } catch (error) {
      console.error("Error deleting proyecto:", error);
      alert("Error al eliminar el proyecto");
    }
  };

  const stats = [
    {
      title: "Total Proyectos",
      value: pagination?.total || 0,
      icon: Home,
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Disponibles",
      value: proyectos.filter((p) => p.Status === "Disponible").length,
      icon: CheckCircle2,
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Vendidos",
      value: proyectos.filter((p) => p.Status === "Vendido").length,
      icon: TrendingUp,
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <>
        {/* Barra de Control Unificada */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          {/* Estadísticas Compactas */}
          <div className="grid grid-cols-3 gap-4 mb-5 pb-5 border-b border-gray-100">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`${stat.bgColor} p-2.5 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-2">
                Filtrar Proyectos
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => { setFilter("Todas"); setCurrentPage(1); }}
                  variant={filter === "Todas" ? "default" : "outline"}
                  size="sm"
                  className={
                    filter === "Todas"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "hover:bg-blue-50 hover:text-blue-700"
                  }
                >
                  Todas
                </Button>
                <Button
                  onClick={() => { setFilter("Disponible"); setCurrentPage(1); }}
                  variant={filter === "Disponible" ? "default" : "outline"}
                  size="sm"
                  className={
                    filter === "Disponible"
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:bg-green-50 hover:text-green-700"
                  }
                >
                  Disponibles
                </Button>
                <Button
                  onClick={() => { setFilter("Vendido"); setCurrentPage(1); }}
                  variant={filter === "Vendido" ? "default" : "outline"}
                  size="sm"
                  className={
                    filter === "Vendido"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "hover:bg-purple-50 hover:text-purple-700"
                  }
                >
                  Vendidos
                </Button>
              </div>
            </div>

            <Link href="/admin/proyectos/nuevo">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2 shadow-md hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                Nuevo Proyecto
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white rounded-xl shadow-sm">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600 font-medium">Cargando proyectos...</p>
          </div>
        ) : proyectos.length === 0 ? (
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
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md">
                Crear Proyecto
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {proyectos.map((proyecto) => (
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
                    <Link
                      href={`/Proyectos/${proyectos.indexOf(proyecto)}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-1 text-xs h-8 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
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
                        className="w-full gap-1 text-xs h-8 bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(proyecto.id)}
                      className="h-8 px-2 hover:bg-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Paginación */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!pagination.hasPrev || loading}
              className="gap-2"
            >
              ← Anterior
            </Button>
            
            <div className="flex items-center gap-2">
              {[...Array(pagination.totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                const showPage = 
                  pageNumber === 1 ||
                  pageNumber === pagination.totalPages ||
                  Math.abs(pageNumber - currentPage) <= 1;

                if (!showPage) {
                  if (pageNumber === 2 || pageNumber === pagination.totalPages - 1) {
                    return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    disabled={loading}
                    className={currentPage === pageNumber ? "bg-blue-600" : ""}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
              disabled={!pagination.hasNext || loading}
              className="gap-2"
            >
              Siguiente →
            </Button>
          </div>
        )}
    </>
  );
}
