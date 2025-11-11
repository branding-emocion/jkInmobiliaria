import Header from "./Header";

export const metadata = {
  title: "Panel Administrativo - JK Inmobiliaria",
  description: "Administración de proyectos y contenido del sitio web.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
