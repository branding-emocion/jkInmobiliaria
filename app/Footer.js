"use client";
import Image from "next/image";
import React from "react";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className=" border-t  pt-8 relative  px-4 lg:px-0  bg-[#004274] text-white">
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-x-4 items-center sm:items-start">
          <div className="sm:max-w-[300px] sm:mx-auto sm:col-span-2 lg:col-span-1  mx-auto">
            <h6 className="font-bold mb-4 text-xl">Sobre nosotros</h6>
            <div className="space-y-8">
              <p className="text-gray-50 pb-3 text-justify">
                Somos una empresa moderna, dotada de profesionales de primera
                línea, que ha crecido muy rápidamente gracias a que buscamos que
                nuestros productos y servicios doten de felicidad y satisfacción
                a los que confiaron plenamente en nosotros.
              </p>
              {/* <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/corp.lugarsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:animate-bounce"
                >
                  <BsFacebook className="text-white w-8 h-8" />
                </a>
                <a
                  href="https://www.instagram.com/lugarsa.constructora/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:animate-bounce"
                >
                  <BsInstagram className="text-white w-8 h-8" />
                </a>

                <a
                  href="https://bit.ly/lotes-en-pimentel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:animate-bounce"
                >
                  <BsWhatsapp className="text-white w-8 h-8" />
                </a>
              </div> */}
            </div>
          </div>
          <div className="sm:max-w-[290px] sm:mx-auto sm:col-span-2 lg:col-span-1  mx-auto ">
            <h6 className="font-semibold mb-4 text-xl">Contacto</h6>
            <div className="space-y-2">
              <div className="flex space-x-2 items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-4.72 4.72a.75.75 0 11-1.06-1.06l4.72-4.72h-2.69a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <div>
                  <a
                    href="tel:+51981184611"
                    className="  hover:text-pink-500 transition-colors duration-300"
                  >
                    (+51) 981-184-611{" "}
                  </a>
                </div>
              </div>

              <div className="flex space-x-2 items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>

                <a
                  className=" hover:text-pink-500 transition-colors duration-300"
                  href="mailto:ngarcia@jkinversiones.com"
                >
                  ngarcia@jkinversiones.com
                </a>
              </div>

              <div className="flex space-x-2 items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="  hover:text-pink-500 transition-colors duration-300">
                  Av. Circunvalación Golf <br /> Los Incas N° 206 <br /> Int.
                  803 Urb. Club Golf Los Incas, Surco
                </p>
              </div>
            </div>
          </div>

          <div className="sm:max-w-[290px] sm:mx-auto sm:col-span-2 lg:col-span-1  mx-auto z-20 ">
            <h6 className="font-bold mb-4 text-xl">Nuestras Redes</h6>
            <div className="flex gap-3 z-10">
              <a
                href="https://www.facebook.com/profile.php?id=61555600976453&mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:animate-bounce"
              >
                <BsFacebook className="text-white w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com/cinthiavigilaltacostura"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:animate-bounce"
              >
                <BsInstagram className="text-white w-8 h-8" />
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=51962710152&text=%C2%A1%20Hola%20!%20%20Me%20gustar%C3%ADa%20recibir%20mas%20informaci%C3%B3n%20acerca%20de%20"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:animate-bounce"
              >
                <BsWhatsapp className="text-white w-8 h-8" />
              </a>
            </div>
          </div>

          <div className="   sm:col-span-2 lg:col-span-3 ">
            <div className=" py-6 bg-[#00335a]">
              <div className="flex  flex-wrap items-center bg- md:justify-between justify-center">
                <div className="w-full   px-4 mx-auto text-center">
                  <div className="text-sm font-semibold text-white py-1">
                    Copyright ©{" "}
                    <span id="get-current-year">
                      {new Date().getFullYear()}
                    </span>{" "}
                    JKINMOBILIARIA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  s;
};

export default Footer;
