import { NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
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

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "El archivo excede el tamaño máximo de 10MB" },
        { status: 400 }
      );
    }

    const bucket = adminStorage.bucket();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const sanitizedProjectName = projectName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const originalFileName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "-");
    
    let filePath;
    if (fileType === "imagen-principal") {
      filePath = `proyectos/${sanitizedProjectName}/imagenprincipal.${extension}`;
    } else if (fileType === "brochure") {
      filePath = `proyectos/${sanitizedProjectName}/brochure.${extension}`;
    } else if (fileType === "planta") {
      filePath = `proyectos/${sanitizedProjectName}/plantas/${originalFileName}-${timestamp}.${extension}`;
    } else {
      filePath = `proyectos/${sanitizedProjectName}/${originalFileName}-${timestamp}.${extension}`;
    }
    
    const fileUpload = bucket.file(filePath);

    await fileUpload.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          firebaseStorageDownloadTokens: crypto.randomUUID(),
        }
      },
    });

    await fileUpload.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filePath: filePath,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
