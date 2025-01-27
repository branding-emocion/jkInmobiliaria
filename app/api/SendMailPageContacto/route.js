import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req) {
  try {
    const { Nombre, Apellidos, Correo, Telefono, DNI } = await req?.json();

    const transporter = nodemailer.createTransport({
      host: "mail.brandingemocion.net",
      port: 465,
      secure: true,
      auth: {
        user: "notificacion@brandingemocion.net",
        pass: "noti@2024",
      },
    });

    const mensaje = {
      from: '"Formulario - Contacto" <notificacion@brandingemocion.net>',
      to: "ngarcia@jkinversiones.com,ventas@jkinversiones.com",
      subject: `🎉🥳 ¡Solicitud de contacto: ${Nombre || ""}  ${
        Apellidos || ""
      }! 🥳🎉`,
      html: `
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #101c71; padding: 20px; color: #ffffff; border-radius: 5px 5px 0 0;">
            <h1 style="margin-top: 0; font-size: 24px;">Jk Inmobiliaria</h1>
          </div>
          <div style="padding: 20px;">
            <p style="margin-bottom: 15px;">Hemos recibido una solicitud de contacto de un nuevo usuario que se contactó a través de la página principal.</p>
            <p style="margin-bottom: 15px;">A continuación, encontrarás los detalles proporcionados:</p>
            <ul style="list-style: none; padding: 0; margin-bottom: 15px;">
            <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${Nombre}</li>
            <li style="margin-bottom: 10px;"><strong>Apellidos:</strong> ${Apellidos}</li>
            <li style="margin-bottom: 10px;"><strong>Correo electrónico:</strong> <a href="mailto:${Correo}" style="color: #101c71; text-decoration: none;">${Correo}</a></li>
              <li style="margin-bottom: 10px;"><strong>Teléfono:</strong> <a href='tel:+${Telefono}' style="color: #101c71; text-decoration: none;">${Telefono}</a></li>
              <li style="margin-bottom: 10px;"><strong>DNI:</strong> ${DNI}</li>
            </ul>
            <p style="margin-bottom: 0;">Por favor, ponte en contacto con el usuario lo antes posible para atender su solicitud.</p>
            <p style="margin-bottom: 0;">¡Gracias!</p>
          </div>
        </div>
      `,
    };

    // Envía el correo electrónico
    await transporter.sendMail(mensaje);
    return NextResponse.json(
      {
        body: "Se envio con éxito",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { body: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
