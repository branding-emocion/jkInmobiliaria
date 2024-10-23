import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const data = await request.json();

  const transporter = nodemailer.createTransport({
    host: "mail.cltsac.com.pe",
    port: 465,
    secure: true,
    auth: {
      user: "notificaciones@cltsac.com.pe",
      pass: "#yeeb4Fw",
    },
  });

  const mailOptions = {
    from: '"Reclamos Zetzun" <notificaciones@cltsac.com.pe>',
    to: `${data.mailEmpresa}, ${data.email}`, // Enviar a la empresa y al cliente
    subject: `Reclamo recibido - Pedido N° ${data.numeroPedido}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Formulario de Reclamos</h2>
      <p style="text-align: center; color: #333;">Hemos recibido su reclamo y lo estamos procesando. A continuación, los detalles de su solicitud:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>RUC:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.ruc}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Dirección Fiscal:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.direccionFiscal}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Tipo de Documento:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.tipoDocumento}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Número de Documento:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.numeroDocumento}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Cliente:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.nombres} ${data.apellidos}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Email:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Teléfono:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.telefono}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Dirección:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.direccion}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Monto Reclamado:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.montoReclamado}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Número de Pedido:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.numeroPedido}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Número de Factura:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.numeroFactura}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>Detalles del Reclamo:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.detallesReclamo}</td>
        </tr>
      </table>
      <p style="text-align: center; color: #555; margin-top: 20px;">Nos pondremos en contacto con usted en un plazo máximo de 48 horas para resolver su queja.</p>
      <p style="text-align: center; color: #999; font-size: 12px;">Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Reclamo enviado con éxito" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al enviar el reclamo", error },
      { status: 500 }
    );
  }
}
