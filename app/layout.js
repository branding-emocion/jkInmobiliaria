import { Inter } from "next/font/google";
import "./globals.css";
import MenuPrincipal from "./MenuPrincipal";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inmobiliaria",
  description:
    "Empresa moderna con profesionales de primera línea. Nuestros productos y servicios buscan dotar de felicidad y satisfacción. Institución ágil y dinámica para responder eficientemente a los imprevistos, beneficiando a nuestros clientes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
