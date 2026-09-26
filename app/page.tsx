import { ContactSection } from "./components/contact-section";
import { HeroSection } from "./components/hero-section";
import { SiteHeader } from "./components/site-header";
import SpotlightSection from "./components/spotlight-section";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <SpotlightSection />
      <ContactSection />
    </main>
  );
}
