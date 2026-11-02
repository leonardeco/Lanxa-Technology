import { NextRequest, NextResponse } from "next/server";

/*
 * Envía el formulario de contacto por correo con Resend.
 * Variables de entorno:
 *   RESEND_API_KEY  (obligatoria) clave de Resend
 *   CONTACT_TO      (opcional)   destinatario, por defecto leonardecojt@gmail.com
 *   RESEND_FROM     (opcional)   remitente de un dominio verificado en Resend.
 *                                Sin dominio verificado se usa onboarding@resend.dev,
 *                                que solo entrega al correo dueño de la cuenta de Resend.
 */

const TO = process.env.CONTACT_TO || "leonardecojt@gmail.com";
const FROM = process.env.RESEND_FROM || "Lanxa Technology <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const field = (body: Record<string, unknown>, key: string, max: number) =>
  typeof body[key] === "string" ? (body[key] as string).trim().slice(0, max) : "";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const nombre = field(body, "nombre", 120);
  const email = field(body, "email", 200);
  const mensaje = field(body, "mensaje", 5000);
  if (!nombre || !mensaje || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Completa nombre, un email válido y el mensaje." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin clave no se puede enviar: lo decimos en vez de fingir éxito.
    console.error("[contact] RESEND_API_KEY no está configurada; el mensaje no se envió.");
    return NextResponse.json({ error: "El formulario no está disponible en este momento." }, { status: 503 });
  }

  const extras: [string, string][] = [
    ["Empresa", field(body, "empresa", 200)],
    ["Tipo de proyecto", field(body, "tipo", 100)],
    ["Presupuesto", field(body, "presupuesto", 100)],
    ["Plazo", field(body, "plazo", 100)],
  ];
  const rows = [["Nombre", nombre], ["Email", email], ...extras.filter(([, v]) => v)]
    .map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v)}</p>`)
    .join("");

  try {
    const { Resend } = await import("resend");
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Nuevo contacto web: ${nombre}`,
      html: `<h2>Nuevo mensaje desde la web de Lanxa Technology</h2>${rows}<p><strong>Mensaje:</strong></p><p>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>`,
    });
    if (error) {
      console.error("[contact] Resend rechazó el envío:", error);
      return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Error enviando el correo:", err);
    return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 500 });
  }
}
