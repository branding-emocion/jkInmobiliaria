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
import { View } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function ClientSideProyecto({ params: { id }, info }) {
  const [Navigation, setNavigation] = useState({
    Description: true,
    PlantaBaja: false,
    RecorridoVirtual: false,
  });

  const [ModalImage, setModalImage] = useState({
    id: null,
    img: "",
    nombre: "",
  });

  return (
    <div className="bg-[#eaeaea] ">
      {ModalImage?.Visible && (
        <ModalImageSee setModalImage={setModalImage} ModalImage={ModalImage} />
      )}

      <Title title={`Proyecto ${info.Name}`} image={`${info?.Imagen}`} />

      <div className="p-2 container space-y-4 mx-auto">
        {/* ==== Imagen principal del proyecto ==== */}
        <section
          onClick={(e) => {
            e.preventDefault();
            setModalImage({
              Visible: true,
              Nombre: `${info?.Name}`,
              src: info.Imagen,
            });
          }}
          className="cursor-pointer relative h-[42rem]"
        >
          <Image
            src={info.Imagen || "/placeholder.svg"}
            style={{
              objectFit: "cover",
            }}
            fill
            alt={info.Name || "Proyecto inmobiliario"}
            priority
          />
        </section>

        {/* ==== Contenido principal ==== */}
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-x-10">
          <div className="lg:col-span-6 bg-white px-10 py-5">
            {/* ==== Navegación ==== */}
            <div className="flex gap-x-4 pb-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setNavigation({
                    Description: true,
                    PlantaBaja: false,
                    RecorridoVirtual: false,
                  });
                }}
                className="cursor-pointer uppercase active:bg-[#004274]"
              >
                Descripción
              </Button>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setNavigation({
                    Description: false,
                    PlantaBaja: true,
                    RecorridoVirtual: false,
                  });
                }}
                className="cursor-pointer uppercase active:bg-[#004274]"
              >
                Planta Baja
              </Button>

              {info?.RecorridosVirtuales?.length > 0 && (
                <Button
                  onClick={() => {
                    setNavigation({
                      Description: false,
                      PlantaBaja: false,
                      RecorridoVirtual: true,
                    });
                  }}
                  className="cursor-pointer uppercase active:bg-[#004274]"
                >
                  Recorridos Virtuales
                </Button>
              )}
            </div>

            {/* ==== Tarjeta principal ==== */}
            <Card>
              <CardHeader>
                <CardTitle className="uppercase">
                  {(Navigation.Description && "Descripción") ||
                    (Navigation.PlantaBaja && "Plantas") ||
                    (Navigation.RecorridoVirtual && "Recorridos Virtuales")}{" "}
                  {info.Name}
                </CardTitle>
                <Separator />
              </CardHeader>

              <CardContent>
                {/* ==== Descripción ==== */}
                {Navigation.Description && (
                  <>
                    {info.Direction && (
                      <h1 className="pb-2">
                        <span className="font-bold pr-2 uppercase">
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
                      href={`https://api.whatsapp.com/send?phone=51981184611&text=Me%20gustar%C3%ADa%20recibir%20más%20informaci%C3%B3n%20acerca%20del%20proyecto%20${info.Name}%20`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <Image
                        src="/inicio/BOTON-WHATSAPP-300x107.webp"
                        alt="Contacto por WhatsApp"
                        width={250}
                        height={80}
                        className="pb-4"
                      />
                    </a>

                    {info.Brochure && (
                      <a
                        href={info.Brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        <Button className="cursor-pointer">BROCHURE</Button>
                      </a>
                    )}

                    {/* Botón especial si id == 1 */}
                    {id == 1 && (
                      <Button
                        variant="outline"
                        className="cursor-pointer border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                      >
                        <View className="w-5 h-5 mr-2" />
                        Recorrido Virtual
                      </Button>
                    )}
                  </>
                )}

                {/* ==== Plantas ==== */}
                {Navigation.PlantaBaja && (
                  <>
                    {info?.Plantas?.length > 0 && (
                      <Accordion type="single" collapsible>
                        {info.Plantas.map((Planta, key) => (
                          <AccordionItem key={key} value={`item-${key + 1}`}>
                            <AccordionTrigger>
                              {Planta.name} — Tamaño: {Planta.size} m²
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
                                className="mx-auto relative aspect-[16/9] w-full max-w-4xl bg-white rounded-xl border shadow-md overflow-hidden cursor-pointer"
                              >
                                <Image
                                  src={Planta.image || "/placeholder.svg"}
                                  alt={Planta.name}
                                  fill
                                  className="object-contain"
                                />
                              </figure>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </>
                )}

                {/* ==== Recorridos Virtuales ==== */}
                {Navigation.RecorridoVirtual && (
                  <div className="py-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {info.RecorridosVirtuales?.map((item) => (
                      <Button key={item.id} className="cursor-pointer">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer"
                        >
                          {item.dpto}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ==== Listado lateral ==== */}
          <ListProyectos />
        </div>
      </div>
    </div>
  );
}

export default ClientSideProyecto;
