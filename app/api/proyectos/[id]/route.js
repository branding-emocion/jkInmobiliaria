import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// GET - Obtener un proyecto por ID
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
    console.error("Error getting proyecto:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un proyecto (con mejores prácticas)
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

    // ✅ MEJOR PRÁCTICA: Usar serverTimestamp de Firestore
    const { Timestamp, FieldValue } = await import('firebase-admin/firestore');
    
    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    // No permitir actualizar createdAt
    delete updateData.createdAt;

    await docRef.update(updateData);

    return NextResponse.json({
      success: true,
      data: { id, ...updateData },
    });
  } catch (error) {
    console.error("Error updating proyecto:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un proyecto
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

    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: "Proyecto eliminado correctamente",
    });
  } catch (error) {
    console.error("Error deleting proyecto:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
