import { Button } from "@/components/ui/button";
import { DataProyectos } from "@/utils/DataProyectos";
import Image from "next/image";
import Link from "next/link";

const ListProyectos = () => {
  const Data = DataProyectos.filter((pro) => pro.Status == "Disponible");

  return (
    <div className="lg:col-span-3 bg-white p-3">
      <h1 className="text-start font-bold text-xl pb-2">Proyectos</h1>
      <div className=" grid grid-cols-1  gap-3 ">
        {Data.map((proyecto, index) => (
          <Link href={`/Proyectos/${index}`} key={proyecto.Id}>
            <div className="relative mx-auto w-full h-full">
              <div className="relative inline-block w-full h-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md">
                <div className="rounded-lg bg-white p-5 shadow-md w-full h-full">
                  <div className="relative flex  h-[200px]  justify-center overflow-hidden rounded-lg">
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

                    <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#001a56] px-2 py-1 text-xs font-semibold text-white">
                      {proyecto.Status}
                    </span>
                    <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                      {" "}
                      <i className="fa fa-star" />{" "}
                    </span>
                  </div>
                  <div>
                    <div className="mt-4">
                      <h1 className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                        <span className="text-2xl">{proyecto.Name}</span>
                      </h1>

                      {proyecto.Direction && <p>{proyecto.Direction}</p>}
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListProyectos;
