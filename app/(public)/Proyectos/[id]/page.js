import ClientSideProyecto from "./ClienteSide";
import { Building } from "lucide-react";

// Función para obtener proyecto desde Firebase
async function getProyecto(index) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/proyectos`, {
      cache: 'no-store'
    });
    const data = await res.json();
    
    if (data.success && data.data && data.data[index]) {
      return data.data[index];
    }
    return null;
  } catch (error) {
    console.error('Error fetching proyecto:', error);
    return null;
  }
}

// Función para generar metadatos para redes sociales
export async function generateMetadata({ params }, parent) {
  // Obtener los metadatos del padre
  const parentMetadata = await parent;
  const previousImages = (await parent).openGraph?.images || [];

  console.log("previousImages:", previousImages);

  const { id } = await params;
  const info = await getProyecto(id);

  if (!info) {
    return {
      title: "Proyecto no encontrado",
      description: "No se encontró información del proyecto",
    };
  }

  const cleanDescription = info.Description
    ? info.Description.replace(/<[^>]*>/g, "").trim()
    : "";

  // URL base ya está definida en el layout principal con metadataBase
  const baseUrl = "https://www.jkinmobiliaria.com";

  // URL de la imagen para compartir en redes sociales
  let imageUrl;
  if (info.Meta) {
    imageUrl = info.Meta.startsWith("http")
      ? info.Meta
      : `${info.Meta.startsWith("/") ? info.Meta : `/${info.Meta}`}`;
  } else if (info.Imagen) {
    imageUrl = info.Imagen.startsWith("http")
      ? info.Imagen
      : `${info.Imagen.startsWith("/") ? info.Imagen : `/${info.Imagen}`}`;
  } else {
    imageUrl = "https://jkinmobiliaria.com/Metajk.png"; // Imagen por defecto
  }

  // Metadatos específicos para esta página, extendiendo los del padre
  return {
    title: `${info.Name}`,
    description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,

    openGraph: {
      title: `${info.Name} - JK Inmobiliaria`,
      description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,
      url: `${baseUrl}`,
      images: [
        {
          url: `${imageUrl}`, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
    },

    twitter: {
      title: `${info.Name} - JK Inmobiliaria`,
      description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,
      images: "https://jkinmobiliaria.com/Metajk.png",
    },

    alternates: {
      canonical: `${baseUrl}/Proyectos/${id}`,
    },
  };
}

// Componente de página (Server Component)
export default async function Proyecto({ params }) {
  const { id } = await params;
  const info = await getProyecto(id);

  if (!info) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <Building className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Proyecto no encontrado</h1>
        <p className="text-gray-500 mb-6">El proyecto que buscas no existe o ha sido eliminado</p>
        <a href="/Proyectos" className="text-blue-600 hover:underline">← Volver a proyectos</a>
      </div>
    );
  }

  return (
    <>
      <ClientSideProyecto params={{ id }} info={info} />
    </>
  );
}
