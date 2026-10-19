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
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
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
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
