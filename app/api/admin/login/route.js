import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validar credenciales contra las variables de entorno
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({
        success: true,
        message: "Autenticación exitosa",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { success: false, error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
