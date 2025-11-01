"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { compressImage, isValidImage } from "@/lib/imageCompression";
import { toast } from "sonner";

// Importar partials
import DescriptionTab from "./partials/Description";
import PlantsTab from "./partials/Plants";
import ToursTab from "./partials/Tours";

export default function Form({ mode = "create", projectId = null, onLoadingChange }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(mode === "edit");

  // Notificar cambios de loading
  useEffect(() => {
    if (onLoadingChange) onLoadingChange(loading);
  }, [loading, onLoadingChange]);

  // State
  const [formData, setFormData] = useState({
    Name: "", Status: "Disponible", Type: "", Direction: "", Description: "",
    Plantas: [], RecorridosVirtuales: []
  });
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("");
  const [tempFiles, setTempFiles] = useState({ imagenPrincipal: null, brochurePDF: null });
  const [previews, setPreviews] = useState({ imagenPrincipal: "", brochurePDF: "" });

  // Load Data
  const fetchProyecto = useCallback(async () => {
    try {
      setLoadingData(true);
      const res = await fetch(`/api/proyectos/${projectId}`);
      const data = await res.json();

      if (data.success) {
        const p = data.data;
        setFormData({
          Name: p.Name || "", Status: p.Status || "Disponible", Type: p.Type || "",
          Direction: p.Direction || "", Description: p.Description || "",
          Plantas: Array.isArray(p.Plantas) ? p.Plantas.map(pl => ({ ...pl, imagePreview: pl.image || "" })) : [],
          RecorridosVirtuales: Array.isArray(p.RecorridosVirtuales) ? p.RecorridosVirtuales : []
        });

        // Extraer características
        if (p.Description) {
          const matches = p.Description.match(/<li>(.*?)<\/li>/g);
          if (matches) setCaracteristicas(matches.map(m => m.replace(/<\/?li>/g, "")));
        }

        // Previews
        if (p.Imagen) setPreviews(prev => ({ ...prev, imagenPrincipal: p.Imagen }));
        if (p.Brochure) setPreviews(prev => ({ ...prev, brochurePDF: p.Brochure }));
      } else {
        toast.error("Error al cargar el proyecto");
        router.push("/admin/proyectos");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cargar el proyecto");
      router.push("/admin/proyectos");
    } finally {
      setLoadingData(false);
    }
  }, [projectId, router]);

  useEffect(() => {
    if (mode === "edit" && projectId) fetchProyecto();
  }, [mode, projectId, fetchProyecto]);

  // Características
  useEffect(() => {
    const html = caracteristicas.length > 0 
      ? `<ul>${caracteristicas.map(c => `<li>${c}</li>`).join("")}</ul>` 
      : "";
    setFormData(prev => ({ ...prev, Description: html }));
  }, [caracteristicas]);

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim()) {
      setCaracteristicas([...caracteristicas, nuevaCaracteristica.trim()]);
      setNuevaCaracteristica("");
    }
  };

  const eliminarCaracteristica = (index) => {
    setCaracteristicas(caracteristicas.filter((_, i) => i !== index));
  };

  // File Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (e, fileType) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar PDF
    if (fileType === "brochurePDF") {
      if (file.type !== "application/pdf") {
        toast.error("Por favor selecciona un archivo PDF");
        return;
      }
      setTempFiles(prev => ({ ...prev, [fileType]: file }));
      setPreviews(prev => ({ ...prev, [fileType]: URL.createObjectURL(file) }));
      return;
    }

    // Comprimir imagen
    if (fileType === "imagenPrincipal" && isValidImage(file)) {
      try {
        const compressedFile = await compressImage(file, 1200, 0.85);
        console.log(`📦 Imagen comprimida: ${(file.size / 1024).toFixed(0)}KB → ${(compressedFile.size / 1024).toFixed(0)}KB`);
        setTempFiles(prev => ({ ...prev, [fileType]: compressedFile }));
        setPreviews(prev => ({ ...prev, [fileType]: URL.createObjectURL(compressedFile) }));
      } catch (error) {
        console.error("Error al comprimir:", error);
        toast.error("Error al procesar la imagen");
      }
    } else {
      toast.error("Por favor selecciona una imagen válida");
    }
  };

  const removeFile = (fileType) => {
    setTempFiles(prev => ({ ...prev, [fileType]: null }));
    setPreviews(prev => ({ ...prev, [fileType]: "" }));
  };

  // Plantas
  const addPlanta = () => {
    setFormData(prev => ({
      ...prev,
      Plantas: [...prev.Plantas, { id: Date.now(), name: "", size: "", imageFile: null, imagePreview: "" }]
    }));
  };

  const updatePlanta = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      Plantas: prev.Plantas.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const removePlanta = (id) => {
    setFormData(prev => ({
      ...prev,
      Plantas: prev.Plantas.filter(p => p.id !== id)
    }));
  };

  const handlePlantaImageSelect = async (e, plantaId) => {
    const file = e.target.files?.[0];
    if (!file || !isValidImage(file)) {
      toast.error("Por favor selecciona una imagen válida");
      return;
    }

    try {
      const compressedFile = await compressImage(file, 1200, 0.85);
      console.log(`📦 Planta comprimida: ${(file.size / 1024).toFixed(0)}KB → ${(compressedFile.size / 1024).toFixed(0)}KB`);
      const previewUrl = URL.createObjectURL(compressedFile);
      setFormData(prev => ({
        ...prev,
        Plantas: prev.Plantas.map(p => p.id === plantaId ? { ...p, imageFile: compressedFile, imagePreview: previewUrl } : p)
      }));
    } catch (error) {
      console.error("Error al comprimir:", error);
      toast.error("Error al procesar la imagen");
    }
  };

  // Recorridos
  const addRecorrido = () => {
    setFormData(prev => ({
      ...prev,
      RecorridosVirtuales: [...prev.RecorridosVirtuales, { id: Date.now(), dpto: "", url: "" }]
    }));
  };

  const updateRecorrido = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      RecorridosVirtuales: prev.RecorridosVirtuales.map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const removeRecorrido = (id) => {
    setFormData(prev => ({
      ...prev,
      RecorridosVirtuales: prev.RecorridosVirtuales.filter(r => r.id !== id)
    }));
  };

  // Upload & Submit
  const uploadFile = async (file, fileType) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("projectName", formData.Name);
    fd.append("fileType", fileType);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Error al subir archivo");
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Name?.trim()) {
      toast.error("Por favor ingresa el nombre del proyecto");
      return;
    }

    setLoading(true);

    try {
      let imagenUrl = previews.imagenPrincipal;
      let brochureUrl = previews.brochurePDF;

      if (tempFiles.imagenPrincipal) imagenUrl = await uploadFile(tempFiles.imagenPrincipal, "imagen-principal");
      if (tempFiles.brochurePDF) brochureUrl = await uploadFile(tempFiles.brochurePDF, "brochure");

      const plantasConUrls = await Promise.all(
        formData.Plantas.map(async (p) => {
          if (p.imageFile) {
            const imageUrl = await uploadFile(p.imageFile, "planta");
            return { id: p.id, name: p.name, size: p.size, image: imageUrl };
          }
          return { id: p.id, name: p.name, size: p.size, image: p.image || p.imagePreview || "" };
        })
      );

      const proyectoData = {
        ...formData,
        Imagen: imagenUrl,
        Brochure: brochureUrl,
        Meta: "/Metajk.png",
        Plantas: plantasConUrls
      };

      const url = mode === "edit" ? `/api/proyectos/${projectId}` : "/api/proyectos";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proyectoData)
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Proyecto ${mode === "edit" ? "actualizado" : "creado"} exitosamente`);
        router.push("/admin/proyectos");
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Integrado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "edit" ? "Editar Proyecto" : "Nuevo Proyecto"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {mode === "edit" 
              ? "Actualiza la información del proyecto inmobiliario" 
              : "Completa la información del proyecto inmobiliario"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/admin/proyectos")}
            disabled={loading}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            form="proyecto-form" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                {mode === "edit" ? "Actualizando..." : "Creando..."}
              </>
            ) : (
              mode === "edit" ? "Actualizar Proyecto" : "Crear Proyecto"
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      <form id="proyecto-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="description"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              📝 Descripción
            </TabsTrigger>
            <TabsTrigger 
              value="plants"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              🏢 Plantas
            </TabsTrigger>
            <TabsTrigger 
              value="tours"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              🌐 Tours 360°
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="description" className="mt-0">
              <DescriptionTab
                formData={formData}
                handleInputChange={handleInputChange}
                caracteristicas={caracteristicas}
                nuevaCaracteristica={nuevaCaracteristica}
                setNuevaCaracteristica={setNuevaCaracteristica}
                agregarCaracteristica={agregarCaracteristica}
                eliminarCaracteristica={eliminarCaracteristica}
                tempFiles={tempFiles}
                previews={previews}
                handleFileSelect={handleFileSelect}
                removeFile={removeFile}
                mode={mode}
              />
            </TabsContent>

            <TabsContent value="plants" className="mt-0">
              <PlantsTab
                plantas={formData.Plantas}
                addPlanta={addPlanta}
                updatePlanta={updatePlanta}
                removePlanta={removePlanta}
                handlePlantaImageSelect={handlePlantaImageSelect}
              />
            </TabsContent>

            <TabsContent value="tours" className="mt-0">
              <ToursTab
                recorridos={formData.RecorridosVirtuales}
                addRecorrido={addRecorrido}
                updateRecorrido={updateRecorrido}
                removeRecorrido={removeRecorrido}
              />
            </TabsContent>
          </div>
        </Tabs>
      </form>
    </div>
  );
}
