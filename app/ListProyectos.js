"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Building, ChevronLeft, ChevronRight } from "lucide-react";

const ListProyectos = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

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

  // Autoplay: cambiar cada 4 segundos
  useEffect(() => {
    if (Data.length <= 1 || loading) return;

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        // Si llegamos al final, volver al inicio
        if (prev === Data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [Data.length, loading]);

  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    setIsPaused(true);
  };

  const resumeAutoplay = () => {
    if (Data.length <= 1) return;
    
    pauseAutoplay();
    setIsPaused(false);
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === Data.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    pauseAutoplay();
    setIsAnimating(true);
    
    if (currentIndex === Data.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
      resumeAutoplay();
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    pauseAutoplay();
    setIsAnimating(true);
    
    if (currentIndex === 0) {
      setCurrentIndex(Data.length - 1);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
      resumeAutoplay();
    }, 500);
  };

  return (
    <div className="lg:col-span-3 bg-white rounded-lg shadow-lg overflow-hidden sticky top-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#001a56] to-[#003399] p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-white" />
            <h1 className="text-white font-bold text-base">
              Proyectos Disponibles
            </h1>
            {Data.length > 1 && !isPaused && (
              <div className="flex items-center gap-1 ml-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/70 text-xs">Auto</span>
              </div>
            )}
          </div>
          {!loading && Data.length > 0 && (
            <span className="bg-white text-[#001a56] px-3 py-1 rounded-full text-sm font-bold">
              {currentIndex + 1} / {Data.length}
            </span>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-[400px] bg-gray-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-[#001a56] mx-auto mb-3" />
            <p className="text-gray-600 text-sm">Cargando proyectos...</p>
          </div>
        </div>
      ) : Data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50">
          <Building className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-gray-500 font-medium">No hay proyectos disponibles</p>
        </div>
      ) : (
        <div 
          className="relative group"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Carrusel Container */}
          <div className="overflow-hidden">
            <Link href={`/Proyectos/${currentIndex}`}>
              <div className="relative h-[400px] cursor-pointer">
                {/* Imagen del proyecto actual */}
                <Image
                  src={Data[currentIndex].Imagen}
                  fill
                  alt={Data[currentIndex].Name}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay sutil solo en la parte inferior */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Info del proyecto */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <h2 className="text-xl font-bold mb-1 drop-shadow-lg">
                    {Data[currentIndex].Name}
                  </h2>
                  {Data[currentIndex].Direction && (
                    <p className="text-xs text-gray-200 line-clamp-1 drop-shadow mb-2">
                      {Data[currentIndex].Direction}
                    </p>
                  )}
                  
                  <Button className="bg-white text-[#001a56] hover:bg-gray-100 font-semibold text-sm py-2 px-4">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Botones de navegación */}
          {Data.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001a56] rounded-full p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001a56] rounded-full p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ListProyectos;
