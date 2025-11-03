import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");

    let query = adminDb
      .collection("proyectos")
      .orderBy("createdAt", "desc")
      .limit(limit);

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
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.Name || !data.Status) {
      return NextResponse.json(
        { success: false, error: "Name y Status son requeridos" },
        { status: 400 }
      );
    }

    const { FieldValue } = await import('firebase-admin/firestore');
    
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
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
