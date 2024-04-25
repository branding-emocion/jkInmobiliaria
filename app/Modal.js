import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImagenZoom from "@/components/ShowData/ImagenZoom";
import { BsFacebook, BsFilePdf, BsWhatsapp } from "react-icons/bs";
import { CalculatorIcon, Contact, Contact2 } from "lucide-react";

export function Modal({ setModalState, ModalState }) {
  return (
    <Dialog
      open={ModalState?.Visible}
      onOpenChange={(isOpen) => {
        console.log(isOpen);
        if (!isOpen) {
          setModalState({
            Visible: false,
          });
        }
      }}
    >
      <DialogContent className="h-auto w-[90%] md:w-full overflow-auto   sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="uppercase">
            información del Proyecto
          </DialogTitle>
          <DialogDescription>
            <div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col lg:flex-row ">
                  <div className="md:flex-1 px-4">
                    <div>
                      <div className="   rounded-lg bg-gray-100  ">
                        <Carousel
                          infiniteLoop
                          autoPlay
                          showThumbs={false}
                          showStatus={false}
                        >
                          {ModalState?.Imagenes?.map((img, index) => (
                            <div key={index} className="   ">
                              <ImagenZoom src={img} ModalState={ModalState} />
                            </div>
                          ))}
                        </Carousel>
                      </div>
                    </div>
                  </div>
                  <div className="md:flex-1 px-4 space-y-3 w-full h-full max-h-[70%] overflow-auto">
                    <h1 className="text-[#001a56] text-4xl">
                      {ModalState.name}
                    </h1>
                    <div
                      className="text-gray-500 text-justify"
                      dangerouslySetInnerHTML={{
                        __html: `Contenido`,
                      }}
                    />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus reiciendis quae laborum suscipit. Porro
                    distinctio sunt fugiat, eveniet quibusdam delectus ipsam
                    doloremque aperiam facere, optio tempore. Quibusdam id
                    temporibus iste.
                    <div>
                      <h1 className="font-bold text-xl">Recoridos virtuales</h1>
                      <div className="py-4 grid grid-cols-1 md:grid-cols-2  gap-3">
                        {ModalState?.Info?.map((item) => (
                          <Button key={item.id}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.dpto}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2   pt-4">
                      <a
                        href={`https://wa.me/+51906544426?text=Estoy interesado en el proyecto ${ModalState.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex place-items-center h-12 px-3 py-2 font-semibold rounded-xl bg-[#175e33] hover:opacity-50 text-white"
                      >
                        <BsWhatsapp className=" h-6 w-6" />
                      </a>
                      <a
                        href={
                          "https://www.facebook.com/profile.php?id=100093333824055"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex place-items-center h-12 px-3 py-2 font-semibold rounded-xl bg-[#001a56] hover:opacity-50 text-white"
                      >
                        <BsFacebook className=" h-6 w-6" />
                      </a>

                      {ModalState.Brochure && (
                        <a
                          href={ModalState.Brochure}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex place-items-center h-12 px-3 py-2 font-semibold rounded-xl bg-[#001a56] hover:opacity-50 text-white"
                        >
                          <BsFilePdf className="mr-2 w-6 h-6" />
                          Brochure
                        </a>
                      )}

                      <a
                        href={`/Contacto`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex place-items-center h-12 px-3 py-2 font-semibold rounded-xl bg-[#001a56] hover:opacity-50 text-white"
                      >
                        <Contact2 className="mr-2 w-6 h-6" />
                        Formulario
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
