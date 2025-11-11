"use client";
import { useState, useEffect } from "react";
import Title from "../../Title";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Loader2, AlertCircle } from "lucide-react";

const Proyectos = () => {
  const [Data, setData] = useState([]);
  const [allProyectos, setAllProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/proyectos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const ordenados = data.data.sort((a, b) => {
            if (a.Status === "Disponible" && b.Status !== "Disponible") return -1;
            if (a.Status !== "Disponible" && b.Status === "Disponible") return 1;
            return 0;
          });

          setAllProyectos(ordenados);
          setData(ordenados);
          setError(null);
        } else {
          setError("Error al cargar proyectos");
        }
      })
      .catch((err) => {
        setError("Error de conexión con el servidor");
        console.error("Error cargando proyectos:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#eaeaea]">
      <Title
        title={"Nuestros Proyectos"}
        image="https://jkinmobiliaria.com/wp-content/uploads/2019/03/2019-03-21-13_00_46-Window.png"
      />

      <Card className="container bg-[#eaeaea] mx-auto p-0 md:p-8">
        <CardContent>
          {/* === Filtros === */}
          <div className="flex flex-col md:flex-row flex-wrap gap-x-3 gap-y-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setData(allProyectos);
              }}
              className="cursor-pointer focus:bg-white focus:text-black bg-[#001a56]"
            >
              TODAS
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                const info = allProyectos.filter(
                  (proyecto) => proyecto.Status === "Disponible"
                );
                setData(info);
              }}
              className="cursor-pointer focus:bg-white focus:text-black bg-[#001a56]"
            >
              DISPONIBLE
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                const info = allProyectos.filter(
                  (proyecto) => proyecto.Status === "Vendido"
                );
                setData(info);
              }}
              className="cursor-pointer focus:bg-white focus:text-black bg-[#001a56]"
            >
              VENDIDO
            </Button>
          </div>

          {/* === Estado de carga === */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 pt-4">
              <Loader2 className="w-12 h-12 animate-spin text-[#001a56] mb-4" />
              <p className="text-gray-600">Cargando proyectos...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center h-64 pt-4">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-gray-700 font-semibold mb-2">
                Error al cargar proyectos
              </p>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="cursor-pointer bg-[#001a56]"
              >
                Reintentar
              </Button>
            </div>
          ) : Data.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 pt-4">
              <Building className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-700 font-semibold mb-2">
                No hay proyectos disponibles
              </p>
              <p className="text-gray-500 text-sm">
                Los proyectos aparecerán aquí cuando se publiquen desde el
                panel admin
              </p>
            </div>
          ) : (
            // === Grid de proyectos ===
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
              {Data.map((proyecto) => (
                <Link href={`/Proyectos/${proyecto.id}`} key={proyecto.id}>
                  <div className="relative mx-auto w-full h-full">
                    <div className="relative inline-block w-full h-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md">
                      <div className="rounded-lg bg-white p-5 shadow-md w-full h-full">
                        <div className="relative flex h-[240px] justify-center overflow-hidden rounded-lg">
                          <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                            <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-80">
                              <Image
                                src={proyecto.Imagen}
                                fill
                                alt={proyecto.Name || "Proyecto"}
                                style={{
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </div>

                          <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#001a56] px-2 py-1 text-xs font-semibold text-white">
                            {proyecto.Status}
                          </span>
                        </div>

                        <div className="mt-4">
                          <h1 className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                            <span className="text-2xl">{proyecto.Name}</span>
                          </h1>

                          {proyecto.Direction && <p>{proyecto.Direction}</p>}

                          <h2 className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight text-xl">
                            {proyecto.Type}
                          </h2>
                        </div>

                        <div className="mt-2">
                          <div className="flex justify-center gap-x-2">
                            <Button className="cursor-pointer bg-[#001a56] text-white hover:scale-105 hover:bg-[#001a56] hover:text-white">
                              Detalles
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Proyectos;
