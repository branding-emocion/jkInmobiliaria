import React from "react";
import Title from "../Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Nosotros = () => {
  return (
    <div className="  bg-[#eaeaea]  ">
      <Title
        title={"JK INMOBILIARIA"}
        image="https://jkinmobiliaria.com/wp-content/uploads/2019/03/2019-03-19-11_30_12-Documento1-Word.png"
      />

      <div className=" p-2 lg:container">
        <div className="  grid grid-cols-1 lg:grid-cols-9  p-1 lg:p-10 gap-x-10">
          <div className=" lg:col-span-6 bg-white p-10">
            <div className=" flex flex-col items-center  space-y-7 ">
              <p className="text-justify">
                Somos una empresa moderna, dotada de profesionales de primera
                línea, que ha crecido muy rápidamente gracias a que buscamos que
                nuestros productos y servicios doten de felicidad y satisfacción
                a los que confiaron plenamente en nosotros. Hemos desarrollado
                una institución moderna, ágil y dinámica que nos permite actuar
                e incursionar rápidamente de manera eficiente en el mundo de los
                negocios y poder responder con eficacia ante los imprevistos
                naturales que se presenten para beneficio de nuestros clientes
              </p>

              <Tabs defaultValue="Mision" className=" max-w-[400px] mx-auto">
                <TabsList>
                  <TabsTrigger value="Mision">Misión</TabsTrigger>
                  <TabsTrigger value="Vision">Visión</TabsTrigger>
                  <TabsTrigger value="Objetivo">Objetivo</TabsTrigger>
                </TabsList>
                <TabsContent value="Mision">
                  <p className="max-w-[400px] text-justify">
                    Proporcionar productos y servicios de calidad y de manera
                    eficiente para hacer del cliente una persona que nos
                    recomiende y nos distinga ante la sociedad.{" "}
                  </p>
                </TabsContent>
                <TabsContent value="Vision">
                  <p className="max-w-[400px] text-justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Placeat optio ab perferendis debitis labore earum, officiis
                    quos possimus nobis quisquam quibusdam, odit, architecto
                    impedit illo aperiam soluta quasi cum vitae?
                  </p>
                </TabsContent>
                <TabsContent value="Objetivo">
                  <p className="max-w-[400px] text-justify">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Eos ducimus, impedit, id dolorem dolorum quibusdam nobis
                    exercitationem corrupti fuga distinctio, eaque itaque
                    molestiae perferendis. Dolores mollitia aut recusandae quae
                    distinctio!
                  </p>
                </TabsContent>
              </Tabs>

              <div>
                <h1 className="font-bold text-2xl pb-4 text-center">
                  Nuestros Pilares
                </h1>
                <ul className="list-decimal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="lg:col-span-3 bg-white p-8">
            <h1 className="text-start">Proyectos</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
