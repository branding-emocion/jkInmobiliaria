import ClientSideProyecto from "./ClienteSide";
import { Building } from "lucide-react";
import Link from "next/link";

async function getProyecto(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/proyectos/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error al obtener proyecto:", res.status);
      return null;
    }

    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching proyecto:", error);
    return null;
  }
}

export async function generateMetadata({ params }, parent) {
  const { id } = await params; 
  const parentMetadata = await parent;
  const previousImages = parentMetadata?.openGraph?.images || [];

  const info = await getProyecto(id);

  if (!info) {
    return {
      title: "Proyecto no encontrado",
      description: "No se encontró información del proyecto.",
    };
  }

  const cleanDescription = info.Description
    ? info.Description.replace(/<[^>]*>/g, "").trim()
    : "";

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.jkinmobiliaria.com";

  let imageUrl = "https://jkinmobiliaria.com/Metajk.png";
  if (info.Meta) {
    imageUrl = info.Meta.startsWith("http")
      ? info.Meta
      : `${baseUrl}${info.Meta.startsWith("/") ? info.Meta : `/${info.Meta}`}`;
  } else if (info.Imagen) {
    imageUrl = info.Imagen.startsWith("http")
      ? info.Imagen
      : `${baseUrl}${info.Imagen.startsWith("/") ? info.Imagen : `/${info.Imagen}`}`;
  }

  return {
    title: `${info.Name} - JK Inmobiliaria`,
    description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,
    openGraph: {
      title: `${info.Name} - JK Inmobiliaria`,
      description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,
      url: `${baseUrl}/Proyectos/${id}`,
      images: [
        ...previousImages,
        {
          url: imageUrl,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${info.Name} - JK Inmobiliaria`,
      description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/Proyectos/${id}`,
    },
  };
}

export default async function Proyecto({ params }) {
  const { id } = await params;
  const info = await getProyecto(id);

  if (!info) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <Building className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">
          Proyecto no encontrado
        </h1>
        <p className="text-gray-500 mb-6">
          El proyecto que buscas no existe o ha sido eliminado.
        </p>
        <Link href="/Proyectos" className="text-blue-600 hover:underline">
          ← Volver a proyectos
        </Link>
      </div>
    );
  }

  return <ClientSideProyecto params={{ id }} info={info} />;
}
