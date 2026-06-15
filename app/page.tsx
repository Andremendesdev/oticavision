import Navbar from "@/components/barbearia/Navbar";
import MotionProvider from "@/components/barbearia/MotionProvider";
import Hero from "@/components/barbearia/Hero";
import Services from "@/components/barbearia/Services";
import Gallery from "@/components/barbearia/Gallery";
import GalleryPic from "@/components/barbearia/GalleryPic";
import MapSection from "@/components/barbearia/MapSection";
import Footer from "@/components/barbearia/Footer";
import FloatingWhatsApp from "@/components/barbearia/FloatingWhatsApp";
import Preview from "@/components/barbearia/Preview";
import { getSanityClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  getDefaultWhatsAppUrl,
  isWhatsAppConfigured,
} from "@/lib/site/env";

export const revalidate = 60; // Revalida a cada 60 segundos

export default async function Page() {
  let services: Awaited<ReturnType<ReturnType<typeof getSanityClient>["fetch"]>>[] =
    [];
  let canalhaPhotos: typeof services = [];

  if (isSanityConfigured) {
    const client = getSanityClient();
    services = await client.fetch(`*[_type == "service"] | order(order asc)`);
    canalhaPhotos = await client.fetch(
      `*[_type == "canalhaPhoto"] | order(order asc)`
    );
  }

  const whatsappLink = getDefaultWhatsAppUrl();

  return (
    <MotionProvider>
      <main className="min-h-screen" style={{ background: "#0a0a0a" }}>
        <Navbar />
        <Hero whatsappLink={whatsappLink} />
        <Services services={services} />
        <GalleryPic photos={canalhaPhotos} />
        <Gallery />
        <Preview />
        <MapSection />
        <Footer />
        <FloatingWhatsApp
          whatsappLink={whatsappLink}
          whatsappConfigured={isWhatsAppConfigured}
        />
      </main>
    </MotionProvider>
  );
}

