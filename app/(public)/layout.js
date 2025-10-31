import MenuPrincipal from "../MenuPrincipal";
import Footer from "../Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="max-w-[1800px] mx-auto">
      <MenuPrincipal />
      {children}
      <Footer />
    </div>
  );
}
