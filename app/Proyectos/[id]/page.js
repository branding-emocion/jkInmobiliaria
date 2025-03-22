import { DataProyectos } from "@/utils/DataProyectos";
import ClientSideProyecto from "./ClienteSide";

// Función para generar metadatos para redes sociales
export async function generateMetadata({ params }, parent) {
  // Obtener los metadatos del padre
  const parentMetadata = await parent;
  const previousImages = (await parent).openGraph?.images || [];

  console.log("previousImages:", previousImages);

  const { id } = await params;
  const info = DataProyectos[id];

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
  const info = DataProyectos[id];

  if (!info) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <>
      <ClientSideProyecto params={{ id }} info={info} />
    </>
  );
}
