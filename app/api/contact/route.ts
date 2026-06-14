import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, empresa, tipo, presupuesto, plazo, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    // Si tienes RESEND_API_KEY en .env.local, envía el email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Lanxa Technology <noreply@lanxa-technology.netlify.app>",
        to: ["leonardecojt@gmail.com"],
        subject: `Nuevo contacto: ${nombre}`,
        html: `
          <h2>Nuevo mensaje desde lanxa-technology.netlify.app</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ""}
          ${tipo ? `<p><strong>Tipo de proyecto:</strong> ${tipo}</p>` : ""}
          ${presupuesto ? `<p><strong>Presupuesto:</strong> ${presupuesto}</p>` : ""}
          ${plazo ? `<p><strong>Plazo:</strong> ${plazo}</p>` : ""}
          <p><strong>Mensaje:</strong></p>
          <p>${mensaje.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
