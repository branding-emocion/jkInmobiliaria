import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
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
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const docRef = adminDb.collection("proyectos").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    const { FieldValue } = await import('firebase-admin/firestore');
    
    const updateData = {
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    };

    delete updateData.createdAt;

    await docRef.update(updateData);

    return NextResponse.json({
      success: true,
      data: { id, ...updateData },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const docRef = adminDb.collection("proyectos").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    const proyectoData = doc.data();

    const { adminStorage } = await import("@/lib/firebase-admin");
    const bucket = adminStorage.bucket();

    const sanitizedProjectName = proyectoData.Name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    const projectFolder = `proyectos/${sanitizedProjectName}/`;

    try {
      const [files] = await bucket.getFiles({ prefix: projectFolder });
      
      if (files.length > 0) {
        await Promise.all(
          files.map(file => file.delete().catch(() => {}))
        );
      }
    } catch (storageError) {
    }

    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: "Proyecto y archivos eliminados correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
