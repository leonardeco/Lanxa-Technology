import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stack from "@/components/Stack";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import B2B from "@/components/B2B";
import WhyLanxa from "@/components/WhyLanxa";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Team from "@/components/Team";
import LaunchCTA from "@/components/LaunchCTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SITE_URL } from "@/lib/site";

// Datos estructurados para que Google entienda quiénes somos y dónde estamos.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lanxa Technology",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description: "Estudio de ingeniería de software con más de 2 años desarrollando aplicaciones web, móviles y de escritorio a la medida.",
  email: "leonardecojt@gmail.com",
  telephone: "+57 322 699 3891",
  address: { "@type": "PostalAddress", addressLocality: "Armenia", addressRegion: "Quindío", addressCountry: "CO" },
  areaServed: ["CO", "Latinoamérica"],
  knowsAbout: ["Aplicaciones web", "Aplicaciones móviles", "Aplicaciones de escritorio", "APIs y backend", "Integración de IA"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Experience />
        <Services />
        <Portfolio />
        <Process />
        <Stack />
        <B2B />
        <WhyLanxa />
        <Team />
        <Pricing />
        <LaunchCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
