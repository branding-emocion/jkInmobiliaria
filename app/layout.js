// import { Inter } from "next/font/google";
// import "./globals.css";
// import MenuPrincipal from "./MenuPrincipal";
// import Footer from "./Footer";

// const inter = Inter({ subsets: ["latin"] });

// // Metadata base para todo el sitio
// export const metadata = {
//   title: "JK Inmobiliaria",
//   description:
//     "Empresa moderna con profesionales de primera línea. Nuestros productos y servicios buscan dotar de felicidad y satisfacción. Institución ágil y dinámica para responder eficientemente a los imprevistos, beneficiando a nuestros clientes.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="es">
//       <body className={inter.className}>
//         <div className="max-w-[1800px] mx-auto ">
//           <MenuPrincipal />
//           {children}
//           <Footer />
//         </div>
//       </body>
//     </html>
//   );
// }

import { Inter } from "next/font/google";
import "./globals.css";
import MenuPrincipal from "./MenuPrincipal";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

// Metadata base para todo el sitio
export const metadata = {
  metadataBase: new URL("https://www.jkinmobiliaria.com"),
  title: {
    default: "JK Inmobiliaria",
    template: "%s | JK Inmobiliaria",
  },
  description:
    "Empresa moderna con profesionales de primera línea. Nuestros productos y servicios buscan dotar de felicidad y satisfacción. Institución ágil y dinámica para responder eficientemente a los imprevistos, beneficiando a nuestros clientes.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.jkinmobiliaria.com",
    siteName: "JK Inmobiliaria",
    images: [
      {
        url: "https://www.jkinmobiliaria.com/Metajk.png", // URL ABSOLUTA para la imagen por defecto
        width: 1200,
        height: 630,
        alt: "JK Inmobiliaria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Inmobiliaria",
    description: "Empresa moderna con profesionales de primera línea.",
    images: ["https://www.jkinmobiliaria.com/Metajk.png"], // URL ABSOLUTA
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="max-w-[1800px] mx-auto ">
          <MenuPrincipal />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
