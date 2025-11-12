export const runtime = "nodejs"; 
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// =====================
// GET - Obtener proyecto por ID
// =====================
export async function GET(request, context) {
  try {
    // ✅ En App Router, params debe esperarse
    const { id } = await context.params;

    const docRef = adminDb.collection("proyectos").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id: doc.id, ...doc.data() },
    });
  } catch (error) {
    console.error("Error en GET /api/proyectos/[id]:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// =====================
// PUT - Actualizar proyecto
// =====================
export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const data = await request.json();

    const docRef = adminDb.collection("proyectos").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    const { FieldValue } = await import("firebase-admin/firestore");

    const updateData = {
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    };

    // Evitamos sobreescribir createdAt accidentalmente
    delete updateData.createdAt;

    await docRef.update(updateData);

    return NextResponse.json({
      success: true,
      data: { id, ...updateData },
    });
  } catch (error) {
    console.error("Error en PUT /api/proyectos/[id]:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// =====================
// DELETE - Eliminar proyecto y sus archivos
// =====================
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    const docRef = adminDb.collection("proyectos").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    const proyectoData = doc.data();

    // ✅ Cargar adminStorage de forma dinámica
    const { adminStorage } = await import("@/lib/firebase-admin");
    const bucket = adminStorage.bucket();

    // Sanitizar nombre del proyecto para evitar errores de ruta
    const sanitizedProjectName = proyectoData.Name?.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    const projectFolder = `proyectos/${sanitizedProjectName}/`;

    try {
      const [files] = await bucket.getFiles({ prefix: projectFolder });

      if (files.length > 0) {
        await Promise.all(
          files.map(async (file) => {
            try {
              await file.delete();
            } catch (err) {
              console.warn("No se pudo eliminar un archivo:", file.name, err.message);
            }
          })
        );
      }
    } catch (storageError) {
      console.warn("Error al eliminar archivos del Storage:", storageError);
    }

    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: "Proyecto y archivos eliminados correctamente",
    });
  } catch (error) {
    console.error("Error en DELETE /api/proyectos/[id]:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
