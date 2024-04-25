"use client";
import Link from "next/link";

const ItemMenu = ({ children, ruta, pathname }) => {
  return (
    <Link href={`${ruta || ""}`}>
      <div
        className={`cursor-pointer md:border-l md:border-r hover:opacity-40 p-4 ${
          ruta == pathname && " bg-opacity-40"
        }`}
      >
        <div className="uppercase font-semibold ">{children}</div>
      </div>
    </Link>
  );
};

export default ItemMenu;
