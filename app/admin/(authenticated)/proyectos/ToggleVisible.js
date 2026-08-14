"use client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ToggleVisible({ id, nombre, visible }) {
  const router = useRouter();

  const handleToggle = async () => {
    try {
      const response = await fetch(`/api/proyectos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !visible }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success(
          visible
            ? `"${nombre}" ocultado del sitio público`
            : `"${nombre}" visible en el sitio público`
        );
        router.refresh();
      } else {
        toast.error(data.error || "Error al actualizar el proyecto");
      }
    } catch (error) {
      toast.error("Error al actualizar el proyecto");
    }
  };

  return (
    <Button
      variant={visible ? "outline" : "default"}
      size="sm"
      onClick={handleToggle}
      className={`cursor-pointer w-full gap-1 text-xs h-8 ${
        visible
          ? "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"
          : "bg-amber-600 hover:bg-amber-700"
      }`}
    >
      {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      {visible ? "Ocultar" : "Mostrar"}
    </Button>
  );
}
