import Title from "@/app/Title";
import DataBlogs from "@/utils/DataBlogs";
import Link from "next/link";
import React from "react";

const ItemBlog = ({ params: { id } }) => {
  const blog = DataBlogs.find((blo) => blo.id == id);

  return (
    <div>
      <Title title={"Bienvenido a nuestro blog"} />
      <div className=" mx-auto">
        <main className="mt-12">
          {/* featured section */}
          <div className="grid sm:grid-cols-3 gap-4">
            {/* main post */}

            <div className="mb-4 lg:mb-0  p-4 block sm:col-span-2 text-justify   ">
              <h1 className="text-center font-bold uppercase text-xl lg:text-2xl pb-2">
                {blog.titulo}
              </h1>
              <div
                className="space-y-5"
                dangerouslySetInnerHTML={{ __html: `${blog.contenido}` }}
              />{" "}
            </div>
            {/* sub-main posts */}
            <div className="px-2 sm:px-0 sm:w-full sm:py-10 sm:col-span-1">
              {DataBlogs.filter((item, index) => item.id != id)?.map(
                (blog, index) => (
                  <Link key={blog.id} href={`/Blogs/${blog.id}`}>
                    <div className="rounded mx-auto max-w-sm sm:w-full flex flex-col md:flex-row mb-10">
                      <img
                        src={blog.imagen}
                        className="block md:hidden lg:block rounded-md  w-[167px] h-28 m-4 md:m-0 object-contain"
                      />
                      <div className="bg-white rounded pl-3">
                        <div className=" text-gray-p00 font-semibold text-base mb-2">
                          {blog.titulo}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </main>
        {/* main ends here */}
        {/* footer */}
      </div>
    </div>
  );
};

export default ItemBlog;
