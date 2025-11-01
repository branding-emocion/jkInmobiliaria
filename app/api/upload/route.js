import { NextResponse } from "next/server";
import { getStorage } from "firebase-admin/storage";
import { getApps } from "firebase-admin/app";

// ✅ MEJOR PRÁCTICA: Subir archivos usando Firebase Storage con manejo optimizado
export async function POST(request) {
  try {
    if (!getApps().length) {
      return NextResponse.json(
        { success: false, error: "Firebase Admin no inicializado" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const projectName = formData.get("projectName") || "temp";
    const fileType = formData.get("fileType") || "archivo";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    // Validar tamaño (10MB máximo)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "El archivo excede el tamaño máximo de 10MB" },
        { status: 400 }
      );
    }

    // Convertir el archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Limpiar nombre del proyecto
    const cleanProjectName = projectName.trim().replace(/[^a-zA-Z0-9]/g, '_');
    
    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${timestamp}_${sanitizedFileName}`;

    // ✅ MEJOR PRÁCTICA: Organizar archivos por carpetas
    let destination;
    if (fileType === 'planta') {
      destination = `proyectos/${cleanProjectName}/plantas/${uniqueFileName}`;
    } else if (fileType === 'brochure') {
      destination = `proyectos/${cleanProjectName}/brochure/${uniqueFileName}`;
    } else if (fileType === 'meta') {
      destination = `proyectos/${cleanProjectName}/meta/${uniqueFileName}`;
    } else {
      destination = `proyectos/${cleanProjectName}/${uniqueFileName}`;
    }

    // Obtener referencia al storage
    const bucket = getStorage().bucket();
    const fileRef = bucket.file(destination);

    // ✅ MEJOR PRÁCTICA: Subir con metadata correcta
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          firebaseStorageDownloadTokens: crypto.randomUUID(),
        }
      },
    });

    // Hacer el archivo público
    await fileRef.makePublic();

    // Obtener URL pública
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: destination,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
