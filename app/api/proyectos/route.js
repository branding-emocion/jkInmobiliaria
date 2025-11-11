import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// ✅ GET — Listar proyectos
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    // 🔧 Aumentamos el límite por defecto a 50
    const limit = parseInt(searchParams.get("limit") || "50");

    let query = adminDb.collection("proyectos").orderBy("createdAt", "desc");

    // 🔍 Filtrar por estado si se envía
    if (status && status !== "Todas") {
      query = query.where("Status", "==", status);
    }

    // 🔧 Solo aplicamos límite si se especifica manualmente
    if (limit > 0) {
      query = query.limit(limit);
    }

    const snapshot = await query.get();

    const proyectos = [];
    snapshot.forEach((doc) => {
      proyectos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return NextResponse.json({
      success: true,
      data: proyectos,
      total: proyectos.length,
    });
  } catch (error) {
    console.error("Error en GET /api/proyectos:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST — Crear nuevo proyecto
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.Name || !data.Status) {
      return NextResponse.json(
        { success: false, error: "Los campos Name y Status son requeridos." },
        { status: 400 }
      );
    }

    const { FieldValue } = await import("firebase-admin/firestore");

    const proyectoData = {
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await adminDb.collection("proyectos").add(proyectoData);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...proyectoData },
    });
  } catch (error) {
    console.error("Error en POST /api/proyectos:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
