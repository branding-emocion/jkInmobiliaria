import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

// ↕️ Guardar el orden manual de los proyectos (kanban)
// Recibe: { ids: ["id1", "id2", ...] } en el orden deseado
export async function POST(request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "Lista de proyectos inválida" },
        { status: 400 }
      );
    }

    // Reasignar "orden" según la posición (0, 1, 2, ...) en un solo lote
    const batch = adminDb.batch();
    ids.forEach((id, index) => {
      const docRef = adminDb.collection("proyectos").doc(id);
      batch.update(docRef, { orden: index, updatedAt: new Date() });
    });
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Orden guardado correctamente",
    });
  } catch (error) {
    console.error("Error al guardar el orden de los proyectos:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
