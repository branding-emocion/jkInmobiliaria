"use client";
import ListProyectos from "@/app/ListProyectos";
import { ModalImageSee } from "@/app/ModalImage";
import Title from "@/app/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataProyectos } from "@/utils/DataProyectos";
import Image from "next/image";
import React, { useState } from "react";

const Proyecto = ({ params: { id } }) => {
  const [Navigation, setNavigation] = useState({
    Description: true,
    PlantaBaja: false,
  });
  const info = DataProyectos[id];

  const [ModalImage, setModalImage] = useState({
    id: null,
    img: "",
    nombre: "",
  });
  return (
    <div className="  bg-[#eaeaea]  ">
      {ModalImage?.Visible && (
        <ModalImageSee setModalImage={setModalImage} ModalImage={ModalImage} />
      )}
      <Title title={`Proyecto ${info.Name}`} image={`${info.Imagen}`} />

      <div className=" p-2 lg:container space-y-4">
        <section
          onClick={(e) => {
            e.preventDefault();
            setModalImage({
              Visible: true,
              Nombre: `${info.Name}`,
              src: info.Imagen,
            });
          }}
          className="cursor-pointer relative h-[42rem]"
        >
          <Image
            src={info.Imagen}
            style={{
              objectFit: "cover",
            }}
            fill
            alt={info.Name}
          />
        </section>

        <div className="  grid grid-cols-1 lg:grid-cols-9   gap-x-10">
          <div className="lg:col-span-6 bg-white px-10 py-5">
            <div className="flex gap-x-4 pb-2">
              <Button
                onClick={() => {
                  setNavigation({
                    Description: true,
                    PlantaBaja: false,
                  });
                }}
                className="uppercase active:bg-[#004274]"
              >
                Descripción
              </Button>
              <Button
                onClick={() => {
                  setNavigation({
                    Description: false,
                    PlantaBaja: true,
                  });
                }}
                className="uppercase active:bg-[#004274]"
              >
                Planta Baja
              </Button>
              {info?.RecorridosVirtuales?.length && (
                <Button
                  onClick={() => {
                    setNavigation({
                      Description: false,
                      PlantaBaja: false,
                      RecorridoVirtual: true,
                    });
                  }}
                  className="uppercase active:bg-[#004274]"
                >
                  Recorridos Virtuales{" "}
                </Button>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="uppercase">
                  {(Navigation.Description && "Descripción") ||
                    (Navigation.PlantaBaja && "Planta baja") ||
                    (Navigation.RecorridoVirtual &&
                      "Recorridos virtuales")}{" "}
                  {info.Name}
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                {(Navigation.Description && (
                  <>
                    {info.Direction && (
                      <h1 className="pb-2">
                        <span className="font-bold pr-2 uppercase">
                          {" "}
                          Dirección:
                        </span>
                        {info.Direction}
                      </h1>
                    )}

                    {info.Description && (
                      <div
                        className="pb-3"
                        dangerouslySetInnerHTML={{
                          __html: `${info.Description}`,
                        }}
                      />
                    )}
                    <a
                      href={`https://api.whatsapp.com/send?phone=51981184611&text=Me%20gustar%C3%ADa%20recibir%20mas%20informaci%C3%B3n%20acerca%20del%20proyecto%20${info.Name}%20`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={
                          "https://jkinmobiliaria.com/wp-content/uploads/2022/03/BOTON-WHATSAPP-300x107.webp"
                        }
                        alt="Contacto"
                        width={250}
                        height={80}
                        style={{
                          objectFit: "cover",
                        }}
                        className="pb-4"
                      />
                    </a>

                    {info.Brochure && (
                      <a
                        href={info.Brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>BROCHURE</Button>
                      </a>
                    )}
                    {}
                  </>
                )) ||
                  (Navigation.PlantaBaja && (
                    <>
                      {info?.Plantas?.length && info.Plantas && (
                        <Accordion type="single" collapsible>
                          {info?.Plantas?.map((Planta, key) => (
                            <AccordionItem key={key} value={`item-${key + 1}`}>
                              <AccordionTrigger>
                                {Planta.name} Tamaño: {Planta.size} mt²
                              </AccordionTrigger>
                              <AccordionContent>
                                <figure
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setModalImage({
                                      Visible: true,
                                      Nombre: `${Planta.name}`,
                                      src: Planta.image,
                                    });
                                  }}
                                  className="w-full h-[21rem] relative cursor-pointer"
                                >
                                  <Image
                                    src={Planta.image}
                                    alt={key}
                                    style={{
                                      objectFit: "cover",
                                    }}
                                    fill
                                  />
                                </figure>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      )}
                    </>
                  )) ||
                  (Navigation.RecorridoVirtual && (
                    <>
                      <div className="py-1 grid grid-cols-1 md:grid-cols-2  gap-3">
                        {info.RecorridosVirtuales?.map((item) => (
                          <Button key={item.id}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.dpto}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </>
                  ))}
              </CardContent>
            </Card>
          </div>
          <>
            <ListProyectos />
          </>{" "}
        </div>
      </div>
    </div>
  );
};

export default Proyecto;
