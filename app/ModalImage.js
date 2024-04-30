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

export function ModalImageSee({ setModalImage, ModalImage }) {
  return (
    <Dialog
      open={ModalImage?.Visible}
      onOpenChange={(isOpen) => {
        console.log(isOpen);
        if (!isOpen) {
          setModalImage({
            Visible: false,
          });
        }
      }}
    >
      <DialogContent className="max-h-[90vh] w-full overflow-auto max-w-3xl">
        <DialogHeader>
          <DialogTitle className="uppercase">
            Imagen {ModalImage.Nombre}
          </DialogTitle>
          <DialogDescription>
            <div>
              <img src={ModalImage.src} alt={ModalImage.Nombre} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
