"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, nombre }) {
  const router = useRouter();

  const handleDelete = () => {
    toast(
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-gray-900">¿Eliminar proyecto?</p>
          <p className="text-sm text-gray-600 mt-1">
            Se eliminará &quot;{nombre}&quot; permanentemente.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss();
              
              try {
                const response = await fetch(`/api/proyectos/${id}`, { method: "DELETE" });
                const data = await response.json();
                
                if (data.success) {
                  toast.success("Proyecto eliminado correctamente");
                  router.refresh(); // ✅ Refrescar Server Component
                } else {
                  toast.error(data.error || "Error al eliminar");
                }
              } catch (error) {
                toast.error("Error al eliminar el proyecto");
              }
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
          >
            Eliminar
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>,
      { duration: Infinity, closeButton: false }
    );
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      className="h-8 px-2 hover:bg-red-600"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </Button>
  );
}
