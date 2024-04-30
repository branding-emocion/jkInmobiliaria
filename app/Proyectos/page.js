"use client";
import Title from "../Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { DataProyectos } from "@/utils/DataProyectos";
import Image from "next/image";
import { useState } from "react";

const Proyectos = () => {
  const [Data, setData] = useState(DataProyectos);
  return (
    <div className="bg-[#eaeaea]">
      <Title
        title={"Nuestros Proyectos"}
        image="https://jkinmobiliaria.com/wp-content/uploads/2019/03/2019-03-21-13_00_46-Window.png"
      />

      <Card className="container bg-[#eaeaea] mx-auto p-0 md:p-8 ">
        <CardContent>
          <div className="flex flex-col  md:flex-row flex-wrap gap-x-3 gap-y-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setData(DataProyectos);
              }}
              className="focus:bg-white focus:text-black bg-[#001a56]"
            >
              TODAS
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                const info = DataProyectos.filter(
                  (proyecto) => proyecto.Status == "Disponible"
                );

                setData(info);
              }}
              className="focus:bg-white focus:text-black bg-[#001a56]"
            >
              DISPONIBLE
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                const info = DataProyectos.filter(
                  (proyecto) => proyecto.Status == "Vendido"
                );

                setData(info);
              }}
              className="focus:bg-white focus:text-black bg-[#001a56]"
            >
              VENDIDO
            </Button>
          </div>

          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 ">
            {Data.map((proyecto, index) => (
              <Link href={`/Proyectos/${index}`} key={proyecto.Id}>
                <div className="relative mx-auto w-full h-full">
                  <div className="relative inline-block w-full h-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md">
                    <div className="rounded-lg bg-white p-5 shadow-md w-full h-full">
                      <div className="relative flex  h-[240px]  justify-center overflow-hidden rounded-lg">
                        <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                          <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-80">
                            <Image
                              src={proyecto.Imagen}
                              fill
                              alt={proyecto.Id}
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>

                        <div className="absolute bottom-0 right-5 mb-3 flex">
                          <p className="flex items-center font-medium text-gray-800">
                            <i className="fa fa-heart mr-2 text-2xl text-white" />
                          </p>
                        </div>
                        <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#001a56] px-2 py-1 text-xs font-semibold text-white">
                          {proyecto.Status}
                        </span>
                        <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                          {" "}
                          <i className="fa fa-star" />{" "}
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

                      <div className="mt-2   ">
                        <div className="flex justify-center gap-x-2">
                          <Button className="bg-[#001a56] text-white hover:scale-105 hover:bg-[#001a56] hover:text-white">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Proyectos;
