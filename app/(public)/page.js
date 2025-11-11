"use client";

import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Button } from "@/components/ui/button";
import { Modal } from "../Modal";
import {
  Building,
  Star,
  ThumbsUp,
  User2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // ======== Estados ========
  const [ModalState, setModalState] = useState({ Visible: false, Info: [] });
  const [Data, setData] = useState([]);
  const [loadingProyectos, setLoadingProyectos] = useState(true);
  const [error, setError] = useState(null);

  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  // ======== Cargar proyectos desde tu API ========
  useEffect(() => {
    const loadProyectos = async () => {
      setLoadingProyectos(true);
      try {
        const res = await fetch("/api/proyectos?status=Disponible");
        const data = await res.json();

        if (data.success) {
          setData(data.data);
          setError(null);
        } else {
          setError("Error al cargar proyectos");
        }
      } catch (err) {
        console.error("Error cargando proyectos:", err);
        setError("Error de conexión con el servidor");
      } finally {
        setLoadingProyectos(false);
      }
    };

    loadProyectos();
  }, []);

  // ======== Cargar banners desde la API (no Firestore directo) ========
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const res = await fetch("/api/carrousel");
        const data = await res.json();
        if (data.success) {
          const activos = data.banners.filter((b) => b.activo === true);
          setBanners(activos);
        }
      } catch (err) {
        console.error("Error al cargar banners:", err);
      } finally {
        setLoadingBanners(false);
      }
    };

    loadBanners();
  }, []);

  // ======== Datos estáticos ========
  const Asociaciones = [
    {
      id: 1,
      image:
        "https://jkinmobiliaria.com/wp-content/uploads/2021/01/logo2-292x300.png",
    },
    { id: 2, image: "/slider/Asc2.png" },
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

  // ======== Render ========
  return (
    <div>
      {/* Modal */}
      {ModalState?.Visible && (
        <Modal setModalState={setModalState} ModalState={ModalState} />
      )}

      {/* ======== CARRUSEL ======== */}
      {loadingBanners ? (
        <div className="h-[400px] flex justify-center items-center bg-gray-100">
          <Loader2 className="w-12 h-12 animate-spin text-[#001a56]" />
        </div>
      ) : banners.length === 0 ? (
        <div className="h-[400px] flex justify-center items-center bg-gray-100 text-gray-500">
          No hay banners activos
        </div>
      ) : (
        <Carousel
          infiniteLoop
          autoPlay
          interval={4000}
          showThumbs={false}
          showStatus={false}
          emulateTouch
        >
          {banners.map((b, key) => (
            <div
              key={key}
              className="relative w-full h-[250px] sm:h-[450px] lg:h-[500px] 2xl:h-[700px]"
            >
              <Image
                src={b.imagen}
                alt={b.titulo || `Banner ${key + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
                {b.titulo && (
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">
                    {b.titulo}
                  </h2>
                )}
                {b.descripcion && (
                  <p className="text-lg md:text-xl max-w-2xl">
                    {b.descripcion}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      )}

      {/* ======== PROYECTOS ======== */}
      <div className="py-10">
        <Building className="w-11 h-11 mx-auto text-[#000f66] mb-2" />
        <h1 className="text-center font-bold text-2xl">NUESTROS PROYECTOS</h1>

        {loadingProyectos ? (
          <div className="container mx-auto pt-4 flex flex-col justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-[#000f66] mb-4" />
            <p className="text-gray-600">Cargando proyectos...</p>
          </div>
        ) : error ? (
          <div className="container mx-auto pt-4 flex flex-col justify-center items-center h-64">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-gray-700 font-semibold mb-2">
              Error al cargar proyectos
            </p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        ) : Data.length === 0 ? (
          <div className="container mx-auto pt-4 flex flex-col justify-center items-center h-64">
            <Building className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-700 font-semibold mb-2">
              No hay proyectos disponibles
            </p>
            <p className="text-gray-500 text-sm">
              Los proyectos aparecerán aquí cuando se publiquen
            </p>
          </div>
        ) : (
          <div className="container mx-auto pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Data.map((proyecto) => (
              <Link href={`/Proyectos/${proyecto.id}`} key={proyecto.id}>
                <div className="rounded-lg bg-white p-5 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
                  <div className="relative h-[240px] overflow-hidden rounded-lg">
                    <Image
                      src={proyecto.Imagen}
                      fill
                      alt={`Imagen del proyecto ${proyecto.Name || "inmobiliario"}`}
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <span className="absolute top-3 right-3 bg-[#001a56] text-white text-xs px-2 py-1 rounded">
                      {proyecto.Status}
                    </span>
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-2xl font-bold text-[#001a56]">
                      {proyecto.Name}
                    </h2>
                    <p className="text-gray-600">{proyecto.Direction}</p>
                    <p className="text-lg text-gray-700 font-medium mt-1">
                      {proyecto.Type}
                    </p>
                    <Button className="mt-3 bg-[#001a56] hover:bg-[#002a88] text-white px-6">
                      Detalles
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ======== POR QUÉ ELEGIRNOS ======== */}
      <div className="container mx-auto bg-[#eaeaea] p-10">
        <div className="flex flex-col justify-center items-center space-y-8">
          <ThumbsUp className="h-12 w-12 text-[#001a56]" />
          <h1 className="text-2xl font-semibold text-center">
            ¿POR QUÉ ELEGIRNOS?
          </h1>

          <div className="flex flex-wrap justify-center gap-6">
            {PorqueElegirnos.map(({ id, img, text }) => (
              <div className="text-center" key={id}>
                <div className="p-2 rounded-full bg-[#004274]">
                  <Image
                    src={img}
                    width={180}
                    height={180}
                    alt={text}
                    className="rounded-full object-cover"
                  />
                </div>
                <p className="max-w-[180px] text-lg mt-3">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======== COLABORADORES ======== */}
      <div className="container mx-auto bg-white p-10">
        <div className="flex flex-col justify-center items-center space-y-8">
          <User2 className="h-12 w-12 text-[#001a56]" />
          <h1 className="text-2xl font-semibold">COLABORADORES</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Colaborades.map(({ id, nombre, cargo, cell, mail, image }) => (
              <div
                key={id}
                className="bg-gray-50 rounded-lg p-8 flex flex-col items-center hover:shadow-lg hover:-translate-y-2 transition-all"
              >
                <Image
                  src={image}
                  alt={`Foto de ${nombre}`}
                  width={144}
                  height={144}
                  className="rounded-full object-cover mb-4"
                />
                <p className="text-xl font-bold">{nombre}</p>
                <p className="text-gray-700 font-medium">{cargo}</p>
                <p className="text-gray-600">Móvil: {cell}</p>
                <p className="text-gray-600">Email: {mail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======== ASOCIACIONES ======== */}
      <div className="container mx-auto bg-[#eaeaea] p-10">
        <div className="flex flex-col justify-center items-center space-y-8">
          <Star className="h-12 w-12 text-[#001a56]" />
          <h1 className="text-2xl font-semibold">
            ASOCIACIONES A LAS QUE PERTENECEMOS
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-6">
            {Asociaciones.map(({ id, image }) => (
              <div key={id}>
                <Image
                  src={image}
                  width={200}
                  height={200}
                  alt={`Logo de asociación ${id}`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
