"use client";

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Title from "./Title";
import { Button } from "@/components/ui/button";
import { Modal } from "./Modal";
import { Star, ThumbsUp, User2 } from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  const [ModalState, setModalState] = useState({
    Visible: false,
    Info: [],
  });

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
      id: 1,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2021/01/triana.jpg",
    },
    {
      id: 2,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2021/01/bari.jpg",
    },
    {
      id: 3,
      img: "https://jkinmobiliaria.com/wp-content/uploads/2021/01/WhatsApp-Image-2021-01-12-at-9.25.10-AM-2.jpeg",
    },
  ];
  return (
    <div>
      {ModalState?.Visible && (
        <Modal setModalState={setModalState} ModalState={ModalState} />
      )}
      <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
        {ArrCarousel.map(({ id, img }) => (
          <div key={id} className="relative w-full  sm:max-h-[450px] ">
            <img
              src={img}
              className="h-full w-full object-cover overflow-hidden  "
              alt={`${id}`}
            />

            <div className=" absolute top-0 left-0 bg-black/60 w-full h-full text-white">
              {/* <div className=" flex  justify-start items-center max-w-[883px] h-full pl-2 sm:text-3xl  sm:pl-20"></div> */}
            </div>
          </div>
        ))}
      </Carousel>
      <Title
        title={"Algunos Nuestros Proyectos"}
        image={"/ContactBanner.jpg"}
      />
      <div className="py-10">
        <div className="grid px-10 w-full grid-cols-1 gap-6 sm:grid-cols-2   ">
          <div className="relative mx-auto w-full">
            <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md">
              <div
                onClick={() => {
                  setModalState({
                    Visible: true,
                    name: "PRIME LIFESTYLE",
                    Brochure:
                      "https://jkinmobiliaria.com/wp-content/uploads/2023/10/BROCHURE_COMPLETO_PRIME.pdf",
                    Imagenes: ["/PrimeImg.png"],
                    Info: [
                      {
                        id: 1,
                        dpto: "DEP.101 (TIPO A)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7cYL2?logo=bWVkaWEvNDgxMzA5LzY1ZGQtMGJkOC1iZmFjLWU4MjIucG5n&card=1&info=1&logosize=190&fs=1&vr=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 1,
                        dpto: "DEP.102 (TIPO B)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7cPDZ?logo=bWVkaWEvNDgxMzA5LzY1ZGQtMGJkOC1iZmFjLWU4MjIucG5n&card=1&info=0&logosize=190&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 1,
                        dpto: "DEP.201 AL 501 (TIPO C)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7cfr2?logo=bWVkaWEvNDgxMzA5LzY1ZGQtMGJkOC1iZmFjLWU4MjIucG5n&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 1,
                        dpto: "EP.202 AL 502 (TIPO D) ",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7cGl0?logo=bWVkaWEvNDgxMzA5LzY1ZGQtMGJkOC1iZmFjLWU4MjIucG5n&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 1,
                        dpto: " DEP.203 AL 603 (TIPO E)",
                        url: " https://jkinmobiliaria.viewin360.co/share/collection/7clb8?logo=bWVkaWEvNDgxMzA5LzY1ZGQtMGJkOC1iZmFjLWU4MjIucG5n&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 1,
                        dpto: "DUPLEX 601 (TIPO F)",
                        url: " https://jkinmobiliaria.viewin360.co/share/collection/7ckpV?logo=bWVkaWEvNDgxMzA5LzY1ZGQtMGJkOC1iZmFjLWU4MjIucG5n&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 1,
                        dpto: "DUPLEX 602 (TIPO G)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7ckqd?logo=bWVkaWEvNDgxMzA5LzY1ZGQtMGJkOC1iZmFjLWU4MjIucG5n&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 1,
                        dpto: "DUPLEX 604 (TIPO H)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7cYVc?logo=bWVkaWEvNDgxMzA5LzY1ZGQtMGJkOC1iZmFjLWU4MjIucG5n&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                    ],
                  });
                }}
                className=" rounded-lg bg-white p-6 shadow-md"
              >
                <div className="relative flex h-[30rem] justify-center overflow-hidden rounded-lg">
                  <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                    <div className=" cursor-pointer  absolute inset-0 bg-black bg-opacity-80">
                      <img
                        src="/PrimeImg.png"
                        alt="Prime"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-5 mb-3 flex">
                    <p className="flex items-center font-medium text-gray-800">
                      <i className="fa fa-heart mr-2 text-2xl text-white" />
                    </p>
                  </div>
                  <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#001a56] px-2 py-1 text-xs font-semibold text-white">
                    Disponible{" "}
                  </span>
                  <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                    {" "}
                    <i className="fa fa-star" />{" "}
                  </span>
                </div>
                <div className="mt-4">
                  <h1 className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight text-2xl">
                    PRIME LIFESTYLE
                  </h1>

                  <p>AV. Cesar Vallejo N°1515 – 1519, Lince</p>
                  <h2 className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight text-xl">
                    DUPLEX, FLAT
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
          <div className="relative mx-auto w-full">
            <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md">
              <div
                onClick={() => {
                  setModalState({
                    Visible: true,
                    name: "VIEW 684",
                    Imagenes: ["/ViewImg.png"],

                    Info: [
                      {
                        id: 1,
                        dpto: "TRIPLEX 504",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7cGxS?logo=bWVkaWEvNDgxMzA5LzY1ZWYtODc3ZC0wNWQyLWExNjMuSlBH&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                    ],
                  });
                }}
                className="rounded-lg bg-white p-6 shadow-md"
              >
                <div className="relative flex h-[30rem] justify-center overflow-hidden rounded-lg">
                  <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                    <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-80">
                      <img
                        src="/ViewImg.png"
                        alt="VIEW 684"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-5 mb-3 flex">
                    <p className="flex items-center font-medium text-gray-800">
                      <i className="fa fa-heart mr-2 text-2xl text-white" />
                    </p>
                  </div>
                  <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#001a56] px-2 py-1 text-xs font-semibold text-white">
                    Disponible
                  </span>
                  <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                    {" "}
                    <i className="fa fa-star" />{" "}
                  </span>
                </div>
                <div className="mt-4">
                  <h1 className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                    <span className="text-2xl">VIEW 684</span>
                  </h1>

                  <p>
                    Magdalena del Mar, Lima, Lima Metropolitana, Lima, 15076,
                    Perú
                  </p>
                  <h2 className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight text-xl">
                    FLAT, TRIPLEX
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
          <div className="relative mx-auto w-full">
            <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md">
              <div
                onClick={() => {
                  setModalState({
                    Visible: true,
                    name: "SIENNA",
                    Imagenes: ["/SiennaImg.jpg"],

                    Info: [
                      {
                        id: 1,
                        dpto: "DEP.101 (TIPO A)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7c9xK?logo=bWVkaWEvNDgxMzA5LzY1ZjEtZjNiNi0xMzZlLTIxNzQuanBn&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 2,
                        dpto: "DEP.102 (TIPO B)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7c9xw?logo=bWVkaWEvNDgxMzA5LzY1ZjEtZjNiNi0xMzZlLTIxNzQuanBn&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 3,
                        dpto: "DEP.201 AL 801 (TIPO C)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7cvSc?logo=bWVkaWEvNDgxMzA5LzY1ZjEtZjNiNi0xMzZlLTIxNzQuanBn&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 4,
                        dpto: "DEP.202 AL 802 (TIPO D)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7c95L?logo=bWVkaWEvNDgxMzA5LzY1ZjEtZjNiNi0xMzZlLTIxNzQuanBn&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 5,
                        dpto: "DEP.203 AL 803 (TIPO E)",
                        url: " https://jkinmobiliaria.viewin360.co/share/collection/7c9L0?logo=bWVkaWEvNDgxMzA5LzY1ZjEtZjNiNi0xMzZlLTIxNzQuanBn&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                      {
                        id: 6,
                        dpto: "DUPLEX 902  (TIPO G)",
                        url: "https://jkinmobiliaria.viewin360.co/share/collection/7cFls?logo=bWVkaWEvNDgxMzA5LzY1ZjEtZjNiNi0xMzZlLTIxNzQuanBn&card=1&info=0&logosize=159&fs=1&vr=1&zoom=1&initload=0&autorotate=-0.51&autop=10&thumbs=1&inst=es",
                      },
                    ],
                  });
                }}
                className="rounded-lg bg-white p-6 shadow-md"
              >
                <div className="relative flex h-[30rem] justify-center overflow-hidden rounded-lg">
                  <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                    <div className="absolute inset-0 bg-black bg-opacity-80 cursor-pointer">
                      <img
                        src="/SiennaImg.jpg"
                        className="object-cover w-full h-full"
                        alt="Sienna"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-5 mb-3 flex">
                    <p className="flex items-center font-medium text-gray-800">
                      <i className="fa fa-heart mr-2 text-2xl text-white" />
                    </p>
                  </div>
                  <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#001a56] px-2 py-1 text-xs font-semibold text-white">
                    Disponible
                  </span>
                  <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                    {" "}
                    <i className="fa fa-star" />{" "}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                    <span className="text-2xl">SIENNA</span>
                  </p>
                </div>

                <div className="mt-2    ">
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
      </div>

      <div className="container mx-auto bg-[#eaeaea] p-10">
        <div className="flex flex-col justify-center items-center space-y-8">
          <ThumbsUp className="h-12 w-12 text-[#001a56]" />

          <h1 className="text-2xl font-semibold">¿POR QUÉ ELEGIRNOS ? </h1>

          <div className=" flex flex-wrap gap-2 gap-x-4">
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
                    <img
                      className="object-center object-cover rounded-full h-36 w-36"
                      src={image}
                      alt={nombre}
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
