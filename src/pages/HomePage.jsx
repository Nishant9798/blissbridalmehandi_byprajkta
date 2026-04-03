import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import CTA from '../components/home/CTA';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SEOHead from '../components/ui/SEOHead';

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <SEOHead
        title="Bliss Bridal Mehandi by Prajkta | Expert Henna Artist Mumbai"
        description="Adorning your hands with timeless henna artistry. Expert bridal, Arabic & traditional mehandi designs in Mumbai. Book your appointment today!"
      />
      <Hero />
      <About />
      <Services />
      <CTA />
    </>
  );
}
