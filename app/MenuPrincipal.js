"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ItemMenu from "./ItemMenu";
import { BiSolidDownArrow } from "react-icons/bi";
import { Clock10Icon, MailIcon, PhoneCallIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const MenuPrincipal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [SubMenuEmpresa, setSubMenuEmpresa] = useState(false);
  // const [SubMenuProyectosVenta, setSubMenuProyectosVenta] = useState(false);

  const pathname = usePathname();

  const handleMouseEnter = () => {
    setSubMenuEmpresa(true);
  };

  const handleMouseLeave = () => {
    setSubMenuEmpresa(false);
  };
  // const handleMouseEnterProyectos = () => {
  //   setSubMenuProyectosVenta(true);
  // };

  // const handleMouseLeaveProyectos = () => {
  //   setSubMenuProyectosVenta(false);
  // };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* <div className="fixed bottom-4 right-4 z-[60]">
        <a
          href="https://api.whatsapp.com/send?phone=51956223460&text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20"
          target="_blank"
          title="Contacto via whatsapp"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white focus:outline-none"
        >
          <FaWhatsapp className="w-10 h-10" />{" "}
        </a>
      </div> */}

      <div className={`hidden lg:flex justify-between items-center bg-white `}>
        <div className=" flex justify-around items-center w-full h-[110px] ">
          <div className="flex  space-x-3  ">
            {/* icons */}
            <Link href="/">
              <div
                className={`  cursor-pointer  flex justify-center items-center`}
              >
                <Image
                  title="Ir a inicio"
                  src={"/logo1.jpg"}
                  width={162}
                  height={65}
                  alt="Logotype"
                  className="object-contain  "
                />
              </div>
            </Link>
          </div>
          <div className="flex  gap-x-5">
            <div className="flex w-full h-full gap-x-3 text-[#004274]">
              <PhoneCallIcon className="flex justify-center self-center w-10 h-10" />
              <div className="grid">
                <a className="font-bold" href="tel:+">
                  +51 981 184 611
                </a>
                <a href="mailto:">ngarcia@jkinversiones.com</a>
              </div>
            </div>
            <div className="flex w-full h-full gap-x-3 text-[#004274]">
              <Clock10Icon className="flex justify-center self-center w-10 h-10" />
              <div className="grid">
                <a href="" className="font-bold">
                  9:00 am a 5:30 pm
                </a>
                <p>Lunes a viernes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className={`sticky  z-50 top-0  lg:mt-2 md:px-10 shadow-sm md:flex md:items-center md:justify-between   bg-[#001a56]
        `}
      >
        <div className="flex justify-between items-center  ">
          {/* Escudo Logo "inicio" */}

          <span className="text-3xl cursor-pointer mx-2 md:hidden block text-white">
            <button name="Menu" onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <svg
                className="h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>{" "}
            </button>
          </span>
        </div>
        <div className="flex grow px-3 lg:px-36 justify-start">
          <div
            className={` text-center bg-[#004274] flex flex-col h-screen md:h-auto  md:flex md:flex-row  md:items-center  z-50 md:z-auto md:static  absolute text-white md:text-white    w-full left-0 top-full md:w-auto md:py-0  md:p-0  pl-7  md:opacity-100 opacity-0 right-[-400px] transition-all ease-in  ${
              isOpen ? ` right-0 py-11 opacity-100` : `hidden`
            }`}
          >
            <ItemMenu ruta="/" setIsOpen={setIsOpen} pathname={pathname}>
              Inicio
            </ItemMenu>

            <ItemMenu
              ruta="/Proyectos"
              setIsOpen={setIsOpen}
              pathname={pathname}
            >
              Proyectos
            </ItemMenu>

            <ItemMenu ruta="/Blogs" setIsOpen={setIsOpen} pathname={pathname}>
              Blog
            </ItemMenu>
            <ItemMenu
              ruta="/Nosotros"
              setIsOpen={setIsOpen}
              pathname={pathname}
            >
              Acerca de
            </ItemMenu>

            <ItemMenu
              ruta="/Contacto"
              setIsOpen={setIsOpen}
              pathname={pathname}
            >
              Contáctenos
            </ItemMenu>
            <div
              className="relative inline-block text-center self-center md:border-l md:border-r h-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                name="Menu"
                type="button"
                className="cursor-pointer hover:opacity-40 hover:text-white p-4 flex items-center uppercase md:text-base text-base font-bold"
              >
                atención al cliente
                <BiSolidDownArrow
                  className={`h-3 w-3 ml-1 transition-transform ${
                    SubMenuEmpresa ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {SubMenuEmpresa && (
                <div
                  className="origin-top-right absolute right-0 w-60 left-0 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className=" flex flex-col items-center text-start ">
                    <Link
                      href={`/AtencionCliente/PreguntasFrecuentes`}
                      className="w-full h-full hover:bg-[#065f99] hover:text-white text-gray-900  py-2 px-2 flex items-start uppercase text-base "
                    >
                      Preguntas Frecuentes
                    </Link>
                    <Link
                      href={`/AtencionCliente/ProcesoCompra`}
                      className="w-full h-full hover:bg-[#065f99] hover:text-white text-gray-900  py-2 px-2 flex items-start uppercase text-base "
                    >
                      Proceso de Compra
                    </Link>
                    <Link
                      href={`/AtencionCliente/PostVenta`}
                      className="w-full h-full hover:bg-[#065f99] hover:text-white text-gray-900  py-2 px-2 flex items-start uppercase text-base "
                    >
                      Post - Venta{" "}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MenuPrincipal;
