import Title from "@/app/Title";
import React from "react";

const PostVenta = () => {
  return (
    <div className="  bg-[#eaeaea]  ">
      <Title
        title={"Servicio de Post-Venta"}
        image="https://jkinmobiliaria.com/wp-content/uploads/2019/03/Servicios-Atencion-al-Cliente.jpg"
      />

      <div className="p-2 lg:container">
        <div className="  grid grid-cols-1 lg:grid-cols-9  p-1 lg:p-10 gap-x-10">
          <div className=" lg:col-span-6 bg-white p-10">
            <div className="   space-y-7 ">
              <p className="text-justify">
                Frente a cualquier inconveniente después de la entrega de su
                departamento, <strong>JK INMOBILIARIA</strong> cuenta con
                personal especializado que atenderá en forma oportuna sus
                necesidades.
              </p>
              <p className="text-justify">
                Envíe un correo a postventa@jkinversiones.com o en caso de
                emergencia llámenos al <strong>743-3661</strong> (Anexo 102)
              </p>
              <p className="text-justify">
                Horarios de atención de lunes a viernes de 9:00am a 5:30pm
              </p>
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

export default PostVenta;
