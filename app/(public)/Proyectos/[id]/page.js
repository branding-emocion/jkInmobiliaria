import ClientSideProyecto from "./ClienteSide";
import { Building } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

/* =========================================================
   🔹 OBTENER PROYECTO (funciona en SSR y producción Vercel)
   ========================================================= */
async function getProyecto(id) {
  try {
    // Obtiene el host dinámico del request (Next.js App Router)
    const headersList = headers();
    const host = headersList.get("host");

    // Asegura el protocolo correcto
    const protocol =
      host && host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const apiUrl = `${baseUrl}/api/proyectos/${id}`;

    console.log("🔍 SSR Fetch desde:", apiUrl); // se verá en logs de Vercel

    // Petición a la API interna
    const res = await fetch(apiUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error("❌ Error al obtener proyecto:", res.status, apiUrl);
      return null;
    }

    const data = await res.json();
    return data?.success ? data.data : null;
  } catch (error) {
    console.error("💥 Error fetching proyecto:", error);
    return null;
  }
}

/* =========================================================
   🔹 METADATA DINÁMICA (SEO + redes sociales)
   ========================================================= */
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

  // Limpia etiquetas HTML del campo Description
  const cleanDescription = info.Description
    ? info.Description.replace(/<[^>]*>/g, "").trim()
    : "";

  // Determina la URL base del sitio
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://www.jkinmobiliaria.com";

  // Define la imagen de OpenGraph / Twitter Card
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

/* =========================================================
   🔹 COMPONENTE PRINCIPAL (Render del proyecto)
   ========================================================= */
export default async function Proyecto({ params }) {
  const { id } = await params;
  const info = await getProyecto(id);

  // Si no se encuentra el proyecto
  if (!info) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
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

  // Si se encontró, renderiza el componente cliente
  return <ClientSideProyecto params={{ id }} info={info} />;
}
