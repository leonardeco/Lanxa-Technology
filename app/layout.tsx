import type { Metadata, Viewport } from "next";

export const viewport: Viewport = { themeColor: "#06060f" };
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Lanxa Technology — Ingeniería de software a la medida",
  description: "Estudio de ingeniería de software en Colombia. Diseñamos y construimos aplicaciones web, de escritorio y móviles a la medida: sólidas, escalables y listas para crecer.",
  metadataBase: new URL("https://lanxa-technology.netlify.app"),
  openGraph: {
    title: "Lanxa Technology — Estudio de ingeniería de software",
    description: "Aplicaciones web, de escritorio y móviles a la medida. Sólidas, escalables, listas para crecer.",
    type: "website",
    locale: "es_CO",
    url: "https://lanxa-technology.netlify.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lanxa Technology — Ingeniería de software a la medida",
    description: "Aplicaciones web, de escritorio y móviles a la medida.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
