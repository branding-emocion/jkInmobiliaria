import { adminDb } from "@/lib/firebase-admin";
import { getStorage } from "firebase-admin/storage";
import { NextResponse } from "next/server";

// 🗑️ Eliminar banner
export async function DELETE(_, { params }) {
  try {
    const { id } = params;

    // Buscar documento
    const docRef = adminDb.collection("carrousel").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ success: false, error: "El banner no existe" }, { status: 404 });
    }

    const banner = docSnap.data();

    // Eliminar imagen del storage si existe
    if (banner.imagen) {
      const bucket = getStorage().bucket();
      const filePath = banner.imagen.split(`${bucket.name}/`)[1]; // obtiene 'banners/...'
      if (filePath) {
        await bucket.file(filePath).delete().catch(() => {}); // ignora error si no existe
      }
    }

    // Eliminar documento en Firestore
    await docRef.delete();

    return NextResponse.json({ success: true, message: "Banner eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar banner:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🔁 Activar/Desactivar banner
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    await adminDb.collection("carrousel").doc(id).update({
      activo: data.activo,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Estado actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar banner:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
