import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// GET - Obtener proyectos con paginación
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const proyectosRef = adminDb.collection("proyectos");
    const snapshot = await proyectosRef.get();
    let proyectos = [];

    snapshot.forEach((doc) => {
      proyectos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Filtrar por status
    if (status) {
      proyectos = proyectos.filter(p => p.Status === status);
    }

    // Ordenar por fecha de creación (más reciente primero)
    proyectos.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });

    // Paginación
    const total = proyectos.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = proyectos.slice(startIndex, endIndex);

    return NextResponse.json({ 
      success: true, 
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Error getting proyectos:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo proyecto
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

    const proyectoData = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
