import { Link } from 'react-router-dom';
import { FaCheck, FaStar } from 'react-icons/fa';
import { PACKAGES } from '../utils/constants';
import SectionHeading from '../components/ui/SectionHeading';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';

function PricingCard({ pkg, index }) {
  const { name, price, priceNote, description, features, recommended } = pkg;

  return (
    <div
      className={`scroll-reveal-scale relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        recommended
          ? 'bg-gradient-to-b from-maroon to-maroon-dark text-white shadow-xl scale-[1.02] border-2 border-gold'
          : 'bg-white dark:bg-dark-surface text-gray-800 dark:text-cream shadow-lg border border-gray-200 dark:border-gray-700'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-gold text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
          <FaStar size={10} />
          POPULAR
        </div>
      )}

      <div className={`p-6 pb-4 ${recommended ? '' : 'border-b border-gray-100 dark:border-gray-700'}`}>
        <h3 className={`font-playfair text-xl font-bold mb-1 ${recommended ? 'text-gold-light' : 'text-maroon dark:text-gold'}`}>
          {name}
        </h3>
        <p className={`text-sm mb-4 ${recommended ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
          {description}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={`text-xs ${recommended ? 'text-white/60' : 'text-gray-400 dark:text-gray-500'}`}>
            {priceNote}
          </span>
        </div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className={`text-sm ${recommended ? 'text-gold-light' : 'text-gold'}`}>&#8377;</span>
          <span className={`font-playfair text-4xl font-bold ${recommended ? 'text-white' : 'text-maroon dark:text-cream'}`}>
            {price}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 pt-4">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <FaCheck className={`flex-shrink-0 mt-0.5 ${recommended ? 'text-gold-light' : 'text-gold'}`} size={12} />
              <span className={recommended ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 pt-0">
        <Button
          to={`/booking?package=${encodeURIComponent(name)}`}
          variant={recommended ? 'primary' : 'outline'}
          className="w-full"
        >
          Book {name}
        </Button>
      </div>
    </div>
  );
}

export default function PricingPage() {
  useScrollReveal();

  return (
    <>
      <SEOHead
        title="Pricing & Packages | Bliss Bridal Mehandi"
        description="View our mehandi packages - Essential, Classic Bridal, Royal Bridal & Party packages. Affordable pricing for beautiful henna designs in Mumbai."
      />
      <div className="pt-20 md:pt-24">
        <section className="section-padding bg-cream-light dark:bg-dark-bg">
          <div className="container-custom">
            <SectionHeading
              subtitle="Our Packages"
              title="Pricing & Plans"
              description="Choose the perfect package for your occasion. All packages include premium quality organic henna."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {PACKAGES.map((pkg, index) => (
                <PricingCard key={pkg.name} pkg={pkg} index={index} />
              ))}
            </div>

            <div className="text-center mt-12 scroll-reveal">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Prices may vary based on design complexity, location, and event requirements.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Need a custom quote?{' '}
                <Link to="/booking" className="text-gold font-medium hover:underline">
                  Contact me
                </Link>{' '}
                for personalized pricing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
