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
    imageUrl = "/default-og-image.jpg"; // Imagen por defecto
  }

  // Metadatos específicos para esta página, extendiendo los del padre
  return {
    title: `${info.Name}`,
    description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,

    openGraph: {
      ...parentMetadata.openGraph,
      title: `${info.Name} - JK Inmobiliaria`,
      description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,
      url: `${baseUrl}/Proyectos/${id}`,
      images: [
        {
          url: imageUrl,

          alt: info.Name,
        },
        ...previousImages,
      ],
    },

    twitter: {
      ...parentMetadata.twitter,
      title: `${info.Name} - JK Inmobiliaria`,
      description: cleanDescription || `Proyecto inmobiliario ${info.Name}`,
      images: [imageUrl],
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
