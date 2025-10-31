import { NextResponse } from "next/server";
import { getStorage } from "firebase-admin/storage";
import { getApps, initializeApp, cert } from "firebase-admin/app";

// POST - Subir archivos a Firebase Storage organizados por proyecto
export async function POST(request) {
  try {
    // Inicializar Firebase Admin si no existe
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        storageBucket: "jkinmobiliaria-f8394.firebasestorage.app",
      });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const projectName = formData.get("projectName") || "temp";
    const fileType = formData.get("fileType") || "archivo"; // imagen-principal, meta, brochure, planta

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    // Convertir el archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Limpiar nombre del proyecto (quitar espacios y caracteres especiales)
    const cleanProjectName = projectName.trim().replace(/[^a-zA-Z0-9]/g, '_');
    
    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${timestamp}_${sanitizedFileName}`;

    // Organizar por proyecto y tipo (igual que el script de migración)
    let destination;
    if (fileType === 'planta') {
      destination = `proyectos/${cleanProjectName}/plantas/${uniqueFileName}`;
    } else if (fileType === 'brochure') {
      destination = `proyectos/${cleanProjectName}/brochure/${uniqueFileName}`;
    } else if (fileType === 'meta') {
      destination = `proyectos/${cleanProjectName}/meta/${uniqueFileName}`;
    } else {
      // imagen-principal o cualquier otro
      destination = `proyectos/${cleanProjectName}/${uniqueFileName}`;
    }

    // Obtener referencia al storage
    const app = getApps()[0];
    const bucket = getStorage(app).bucket("jkinmobiliaria-f8394.firebasestorage.app");
    const fileRef = bucket.file(destination);

    // Subir el archivo
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
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
