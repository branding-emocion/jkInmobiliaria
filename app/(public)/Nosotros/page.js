"use client";
import { useState, useEffect } from "react";
import Title from "../../Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ListProyectos from "../../ListProyectos";

const Nosotros = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proyectos?status=Disponible")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.error("Error cargando proyectos:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="  bg-[#eaeaea]  ">
      <Title
        title={"JK INMOBILIARIA"}
        image="https://jkinmobiliaria.com/wp-content/uploads/2019/03/2019-03-19-11_30_12-Documento1-Word.png"
      />

      <div className=" p-2 lg:container">
        <div className="  grid grid-cols-1 lg:grid-cols-9  p-1 lg:p-10 gap-x-10">
          <div className=" lg:col-span-6 bg-white p-5 md:p-10">
            <div className=" flex flex-col items-center  space-y-7 ">
              <p className="text-justify">
                Somos una empresa moderna, dotada de profesionales de primera
                línea, que ha crecido muy rápidamente gracias a que buscamos que
                nuestros productos y servicios doten de felicidad y satisfacción
                a los que confiaron plenamente en nosotros. Hemos desarrollado
                una institución moderna, ágil y dinámica que nos permite actuar
                e incursionar rápidamente de manera eficiente en el mundo de los
                negocios y poder responder con eficacia ante los imprevistos
                naturales que se presenten para beneficio de nuestros clientes.
              </p>

              <Tabs defaultValue="Mision" className=" max-w-[400px] mx-auto">
                <TabsList>
                  <TabsTrigger value="Mision">Misión</TabsTrigger>
                  <TabsTrigger value="Vision">Visión</TabsTrigger>
                  <TabsTrigger value="Objetivo">Objetivo</TabsTrigger>
                </TabsList>
                <TabsContent value="Mision">
                  <p className="max-w-[400px] text-justify">
                    Presentar al mercado proyectos residenciales que cubran con
                    las necesidades de las familias peruanas, ofreciéndoles una
                    construcción de primera calidad con acabados de altos
                    estándares y adecuándonos a las ultimas tendencias en diseño
                    y tecnología del mercado, siempre contando con el apoyo de
                    un equipo altamente capacitado en el sector inmobiliario.
                  </p>
                </TabsContent>
                <TabsContent value="Vision">
                  <p className="max-w-[400px] text-justify">
                    Posicionarnos como la empresa líder y de referencia a nivel
                    nacional en el sector inmobiliario con proyectos propios
                    logrando crear espacios ideales donde las familias peruanas
                    puedan compartir momentos inolvidables.
                  </p>
                </TabsContent>
                <TabsContent value="Objetivo">
                  <p className="max-w-[400px] text-justify">
                    Consolidar nuestra presencia en el mercado inmobiliario
                    peruano mediante el desarrollo continuo de proyectos
                    residenciales innovadores que superen las expectativas de
                    nuestros clientes en términos de calidad, diseño y
                    tecnología, estableciéndonos como la opción preferida para
                    las familias que buscan hogares de excelencia y creando
                    comunidades vibrantes donde se construyan relaciones
                    duraderas y se vivan experiencias memorables.
                  </p>
                </TabsContent>
              </Tabs>

              <div>
                <h1 className="font-bold text-2xl pb-4 text-center">
                  Nuestros Pilares
                </h1>
                <ul className="list-decimal pl-3 md:pl-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <li>
                    <span className="font-bold text-xl">Seguridad</span>
                    <p>Aislaciones sísmicas.</p>
                  </li>
                  <li>
                    <span className="font-bold text-xl">Innovación</span>
                    <p>Diseños a la vanguardia.</p>
                  </li>
                  <li>
                    <span className="font-bold text-xl">Calidad</span>
                    <p>Los mejores materiales.</p>
                  </li>
                  <li>
                    <span className="font-bold text-xl">Modernidad</span>
                    <p>Cocinas, entradas y ascensores de lujo.</p>
                  </li>
                  <li>
                    <span className="font-bold text-xl">Espacios</span>
                    <p>Amplios y cómodos cuartos principales.</p>
                  </li>
                  <li>
                    <span className="font-bold text-xl">Céntricos</span>
                    <p>Obras estratégicamente ubicadas.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <>
            <ListProyectos />
          </>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
