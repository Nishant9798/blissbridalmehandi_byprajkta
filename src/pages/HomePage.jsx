import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import CTA from '../components/home/CTA';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <About />
      <Services />
      <CTA />
    </>
  );
}
