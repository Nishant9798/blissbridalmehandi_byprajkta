import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../utils/constants';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="section-padding bg-gradient-to-br from-maroon-dark via-maroon to-rose-deep relative overflow-hidden">
      <div className="absolute inset-0 mehndi-pattern opacity-10" />

      <div className="container-custom relative z-10">
        <SectionHeading
          subtitle="Client Love"
          title="What Brides Say"
          light
        />

        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center relative">
            <FaQuoteLeft className="text-gold/30 absolute top-6 left-6" size={32} />

            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <FaStar key={i} className="text-gold" size={18} />
              ))}
            </div>

            <p className="text-cream/90 text-base md:text-lg leading-relaxed mb-6 italic">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            <div>
              <p className="font-playfair font-semibold text-gold-light text-lg">
                {testimonial.name}
              </p>
              <p className="text-cream/60 text-sm">{testimonial.event}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="p-2 rounded-full border border-cream/30 text-cream/60 hover:bg-cream/10 hover:text-gold transition-colors"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft size={14} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? 'bg-gold w-6' : 'bg-cream/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="p-2 rounded-full border border-cream/30 text-cream/60 hover:bg-cream/10 hover:text-gold transition-colors"
                aria-label="Next testimonial"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
