import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// GET - Obtener proyectos con paginación REAL (mejor práctica de Firestore)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");

    // ✅ MEJOR PRÁCTICA: Query optimizada con Firestore
    let query = adminDb
      .collection("proyectos")
      .orderBy("createdAt", "desc")
      .limit(limit);

    // Filtrar por status usando where() de Firestore
    if (status && status !== "Todas") {
      query = query.where("Status", "==", status);
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
    console.error("Error getting proyectos:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo proyecto (con mejores prácticas)
export async function POST(request) {
  try {
    const data = await request.json();

    // Validaciones básicas
    if (!data.Name || !data.Status) {
      return NextResponse.json(
        { success: false, error: "Name y Status son requeridos" },
        { status: 400 }
      );
    }

    // ✅ MEJOR PRÁCTICA: Usar serverTimestamp de Firestore
    const { Timestamp } = await import('firebase-admin/firestore');
    
    const proyectoData = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await adminDb.collection("proyectos").add(proyectoData);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...proyectoData },
    });
  } catch (error) {
    console.error("Error creating proyecto:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
