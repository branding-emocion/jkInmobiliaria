import DataBlogs from "@/utils/DataBlogs";
import Link from "next/link";
import React from "react";
import Title from "../Title";

const Blog = () => {
  return (
    <div>
      <Title title={"Bienvenido a nuestro blog"} />

      <div className="pt-4 max-w-7xl px-4 lg:px-0 gap-7 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {DataBlogs.map((blog) => (
          <div
            key={blog.id}
            className=" bg-white shadow-md border border-gray-200 rounded-lg w-full mb-5"
          >
            <Link href={`/Blogs/${blog.id}`}>
              <img
                className="rounded-t-lg h-[271.31px] w-full object-cover"
                src={`${blog.imagen}`}
                alt={`${blog.id}`}
              />
            </Link>
            <div className="p-5">
              <Link href={`/Blogs/${blog.id}`}>
                <h5 className="text-[#31c06f] font-bold text-2xl tracking-tight mb-2">
                  {blog.titulo}
                </h5>
              </Link>
              <p className="font-normal text-gray-700 mb-3 line-clamp-3 space-y-5">
                {blog.descripcion}
              </p>
              <Link
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                href={`/Blogs/${blog.id}`}
              >
                Leer más{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
