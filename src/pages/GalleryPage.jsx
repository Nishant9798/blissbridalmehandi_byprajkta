import GalleryGrid from '../components/gallery/GalleryGrid';
import SectionHeading from '../components/ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function GalleryPage() {
  useScrollReveal();

  return (
    <div className="pt-20 md:pt-24">
      <section className="section-padding bg-cream-light">
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
  );
}
