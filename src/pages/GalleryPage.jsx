import GalleryGrid from '../components/gallery/GalleryGrid';
import SectionHeading from '../components/ui/SectionHeading';
import SEOHead from '../components/ui/SEOHead';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function GalleryPage() {
  useScrollReveal();

  return (
    <>
      <SEOHead
        title="Mehandi Design Gallery | Bliss Bridal Mehandi"
        description="Browse our collection of stunning bridal, Arabic, traditional & minimal mehandi designs. View our portfolio of beautiful henna art."
      />
      <div className="pt-20 md:pt-24">
        <section className="section-padding bg-cream-light dark:bg-dark-bg">
          <div className="container-custom">
            <SectionHeading
              subtitle="My Portfolio"
              title="Design Gallery"
              description="Browse through my collection of mehandi designs. Click on any image to view it in full."
            />
            <GalleryGrid />
          </div>
        </section>
      </div>
    </>
  );
}
