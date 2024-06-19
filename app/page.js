"use client";

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Title from "./Title";
import { Button } from "@/components/ui/button";
import { Modal } from "./Modal";
import { Building, Star, ThumbsUp, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DataProyectos } from "@/utils/DataProyectos";

const HomePage = () => {
  const [ModalState, setModalState] = useState({
    Visible: false,
    Info: [],
  });

  const Data = DataProyectos.filter((pro) => pro.Status == "Disponible");
  const Asociaciones = [
    {
      id: 1,
      image:
        "https://jkinmobiliaria.com/wp-content/uploads/2021/01/logo2-292x300.png",
    },
    {
      id: 2,
      image:
        "https://jkinmobiliaria.com/wp-content/uploads/2021/01/logo1-292x300.png",
    },
  ];

  const Colaborades = [
    {
      id: 1,
      nombre: "Nelly García León",
      cargo: "Ventas",
      cell: "981 184 611",
      mail: "ngarcia@jkinversiones.com",
      image:
        "https://jkinmobiliaria.com/wp-content/uploads/2019/03/profile-1-150x150.png",
    },
    {
      id: 2,
      nombre: "Alexander Hijar García",
      cargo: "Ventas",
      cell: "981 184 611",
      mail: "ventas@jkinversiones.com",
      image:
        "https://jkinmobiliaria.com/wp-content/uploads/2019/03/profile-150x150.png",
    },
  ];

  const PorqueElegirnos = [
    {
      id: 1,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2016/03/alm-e1553225893602.jpg",
      text: "Amplia experiencia en el sector inmobiliario.",
    },
    {
      id: 2,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2016/03/vercelli4-208x208.png",
      text: "Calidad y seguridad totalmente garantizada.",
    },
    {
      id: 3,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2016/03/Terraza-169x169.jpeg",
      text: "Dptos disponibles al alcance de tu bolsillo.",
    },
    {
      id: 4,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2019/03/job-interview-3410427_1920-200x200.jpg",
      text: "Te asesoramos con los trámites.",
    },
    {
      id: 5,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2019/03/team-3373638_1920-196x196.jpg",
      text: "Equipo de profesionales a tu servicio.",
    },
    {
      id: 6,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2019/03/men-1979261_1920-282x282.jpg",
      text: "Responderemos todas tus inquietudes.",
    },
  ];

  const ArrCarousel = [
    {
      img: "/slider/Slider1.webp",
    },
    {
      img: "https://jkinmobiliaria.com/wp-content/uploads/2021/01/triana.jpg",
    },
    {
      img: "https://jkinmobiliaria.com/wp-content/uploads/2021/01/bari.jpg",
    },
    {
      img: "https://jkinmobiliaria.com/wp-content/uploads/2021/01/WhatsApp-Image-2021-01-12-at-9.25.10-AM-2.jpeg",
    },
  ];
  return (
    <div>
      {ModalState?.Visible && (
        <Modal setModalState={setModalState} ModalState={ModalState} />
      )}
      <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
        {ArrCarousel.map(({ id, img }, key) => (
          <div
            key={key}
            className="relative w-full h-[250px] sm:h-[450px]  lg:h-[500px]"
          >
            <section className="h-full w-full object-cover overflow-hidden">
              <Image src={img} alt={`${id}`} fill />
            </section>

            <div className=" absolute top-0 left-0 bg-black/60 w-full h-full text-white"></div>
          </div>
        ))}
      </Carousel>
      {/* <Title
        title={"NUESTROS PROYECTOS"}
        image={"/ContactBanner.jpg"}
      /> */}
      <div className="py-10">
        <Building className="w-11 h-11 mx-auto text-[#000f66] mb-2" />
        <h1 className="text-center font-bold text-2xl">NUESTROS PROYECTOS</h1>

        <div className="container mx-auto pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 ">
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
      </div>

      <div className="container mx-auto bg-[#eaeaea] p-10">
        <div className="flex flex-col justify-center items-center space-y-8">
          <ThumbsUp className="h-12 w-12 text-[#001a56]" />

          <h1 className="text-2xl font-semibold text-center">
            ¿POR QUÉ ELEGIRNOS ?{" "}
          </h1>

          <div className=" flex flex-wrap justify-center items-center gap-2 gap-x-4">
            {PorqueElegirnos.map(({ id, img, text }) => (
              <div className="space-y-4" key={id}>
                <div className="p-2 rounded-full bg-[#004274]">
                  <Image
                    src={img}
                    width={180}
                    height={180}
                    alt={img}
                    className="rounded-full"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p className="max-w-[180px] text-lg text-center">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto bg-white p-10">
        <div className="flex flex-col justify-center items-center space-y-8">
          <User2 className="h-12 w-12 text-[#001a56]" />

          <h1 className="text-2xl font-semibold">COLABORADORES </h1>

          <div className=" flex flex-wrap gap-2 gap-x-4">
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
              {Colaborades.map(({ id, nombre, cargo, cell, mail, image }) => (
                <div
                  key={id}
                  className="w-full bg-gray-50 rounded-lg p-12 flex flex-col justify-center items-center hover:shadow-lg hover:-translate-y-2"
                >
                  <div className="mb-8">
                    {/* <img className="object-center object-cover rounded-full h-36 w-36" /> */}

                    <Image
                      src={image}
                      alt={nombre}
                      width={144}
                      height={144}
                      style={{
                        objectFit: "cover",
                      }}
                      className="rounded-full "
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xl text-gray-800 font-bold mb-2">
                      {nombre}
                    </p>
                    <p className="text-xl text-gray-800 font-bold mb-2">
                      {cargo}
                    </p>
                    <p className="text-base text-gray-600 font-normal">
                      Móvil:{cell}
                    </p>
                    <p className="text-base text-gray-600 font-normal">
                      Email:{mail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-[#eaeaea] p-10">
        <div className="flex flex-col justify-center items-center space-y-8">
          <Star className="h-12 w-12 text-[#001a56]" />

          <h1 className="text-2xl font-semibold">
            ASOCIACIONES A LAS QUE PERTENECEMOS
          </h1>

          <div className=" flex flex-wrap gap-2 gap-x-4">
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
              {Asociaciones.map(({ id, image }) => (
                <div key={id}>
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    alt={id}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
