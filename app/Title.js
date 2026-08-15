"use client";
function Title({ title, image, children }) {
  return (
    <section
      style={{
        backgroundImage: image ? `url("${image}")` : 'none',
      }}
    >
      <div className="py-7 flex h-full w-full items-center justify-center  mx-auto px-8 lg:w-full bg-black/50">
        <div className="max-w-2xl text-center">
          <h1 className={` text-white lg:text-6xl font-semibold uppercase ${children ? "py-10" : "py-20"}`}>
            {title}
          </h1>
          {children}
        </div>
      </div>
    </section>
  );
}

export default Title;
