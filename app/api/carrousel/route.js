import { adminDb } from "@/lib/firebase-admin";
import { getStorage } from "firebase-admin/storage";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const titulo = formData.get("titulo");
    const descripcion = formData.get("descripcion");

    if (!file || !titulo) {
      return NextResponse.json({ success: false, error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // Leer archivo en buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = getStorage().bucket();
    const fileName = `banners/${Date.now()}-${file.name}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(buffer, {
      contentType: file.type,
      public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Guardar en Firestore
    await adminDb.collection("carrousel").add({
      titulo,
      descripcion,
      imagen: publicUrl,
      activo: true,
      orden: Date.now(),
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Banner agregado correctamente" });
  } catch (error) {
    console.error("Error al subir banner:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snapshot = await adminDb.collection("carrousel").orderBy("orden", "asc").get();
    const banners = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, banners });
  } catch (error) {
    console.error("Error al obtener banners:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
