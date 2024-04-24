import Title from "../Title";
import { BsWhatsapp } from "react-icons/bs";
import { MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Contacto = () => {
  return (
    <div className="  bg-[#eaeaea]  ">
      <Title
        title={"Contáctenos"}
        image="https://jkinmobiliaria.com/wp-content/uploads/2019/03/2019-03-18-15_29_50-Window.png"
      />
      <div className="p-2 lg:container">
        <div className="  grid grid-cols-1 lg:grid-cols-9  p-1 lg:p-10 gap-x-10">
          <div className=" lg:col-span-6 bg-white p-10">
            <div className=" flex flex-col items-center lg:items-start lg:flex-row gap-x-9">
              <div className="space-y-4   md:max-w-md ">
                <p className="text-justify ">
                  En <span className="font-bold">JK inmobiliaria</span>, nos
                  esmeramos por brindar una atención cálida y amena a todo el
                  público en general; por ello, no dude en ponerse en contacto
                  con nosotros por medio de la vía de su preferencia. ¡Estaremos
                  muy contentos de poderte ayudar!
                </p>
                <p>Horarios de lunes a viernes de 9:00am a 7:00pm</p>

                <form className="space-y-4">
                  <div>
                    <label className="font-bold" htmlFor="Nombre">
                      Nombre (*)
                    </label>
                    <Input className="border-gray-800" />
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="Apellidos">
                      Apellidos (*)
                    </label>
                    <Input className="border-gray-800" />{" "}
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="Correo">
                      Correo (*)
                    </label>
                    <Input type="email" className="border-gray-800" />{" "}
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="Telefono">
                      Telefono (*)
                    </label>
                    <Input className="border-gray-800" />{" "}
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="DNI">
                      DNI (*)
                    </label>
                    <Input className="border-gray-800" />
                  </div>
                  <Button className="bg-[#065e9c]" type="submit">
                    Enviar
                  </Button>
                </form>
              </div>
              <div className="  ">
                <h1 className="font-bold pb-4">Teléfonos:</h1>
                <a href="tel:+981184611" className="">
                  +51 981 184 611
                </a>
                <a
                  href="https://bit.ly/JK_Proveedores_Whatsapp"
                  className="flex justify-start items-center gap-x-2 pt-4  "
                >
                  <BsWhatsapp className="w-6 h-6 text-[#28a41a]" />
                  <p>Atención Proveedores</p>
                </a>
                <a
                  href="https://bit.ly/JK-Clientes-Whatsapp"
                  className="flex justify-start items-center gap-x-2 pt-4  "
                >
                  <BsWhatsapp className="w-6 h-6 text-[#28a41a]" />
                  <p>Atención Clientes</p>
                </a>{" "}
                <a
                  href="https://bit.ly/wJkinmobiliaria"
                  className="flex justify-start items-center gap-x-2 pt-4  "
                >
                  <BsWhatsapp className="w-6 h-6 text-[#28a41a]" />
                  <p>Atención Informes</p>
                </a>
                <div className="pt-4  ">
                  <h1 className="font-bold ">Correos:</h1>
                  <div className="flex flex-col space-y-2 pt-4">
                    <a
                      className="flex gap-x-2"
                      href="mailto:ngarcia@jkinversiones.com"
                    >
                      <MailIcon className="w-6 h-6 text-orange-900" />
                      <span>ngarcia@jkinversiones.com</span>
                    </a>
                    <a
                      className="flex gap-x-2"
                      href="mailto:ventas@jkinversiones.com"
                    >
                      <MailIcon className="w-6 h-6 text-orange-900" />
                      ventas@jkinversiones.com
                    </a>
                  </div>
                </div>
                <div className="pt-4 md:max-w-md mx-auto">
                  <h1 className="font-bold ">Dirección:</h1>
                  <div className="flex flex-col space-y-2 pt-4 ">
                    <p>
                      Av. Circunvalación Golf Los Incas N° 206 Int. 803 Urb.
                      Club Golf Los Incas, Surco
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 bg-white p-8">
            <h1>Proyectos</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
