import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stack from "@/components/Stack";
import Work from "@/components/Work";
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
        <Services />
        <Process />
        <Stack />
        <Work />
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
