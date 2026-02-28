import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="section-padding bg-cream-light relative overflow-hidden">
      <div className="absolute inset-0 mehndi-pattern opacity-20" />
      <div className="container-custom relative z-10 text-center">
        <p className="font-vibes text-gold text-3xl mb-3">Ready to Get Beautiful Mehandi?</p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-maroon mb-4">
          Book Your Appointment Today
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Let me create a stunning mehandi design that you&#39;ll cherish forever.
          Available for weddings, parties, festivals, and all special occasions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/booking" variant="secondary">
            Book Now
          </Button>
          <Button to="/gallery" variant="outline">
            Explore Designs
          </Button>
        </div>
      </div>
    </section>
  );
}
