import { useEffect, useRef, useState } from 'react';
import { FaPalette, FaHeart, FaStar } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  return (
    <section className="section-padding bg-cream-light dark:bg-dark-bg">
      <div className="container-custom">
        <SectionHeading
          subtitle="About the Artist"
          title="Meet Prajkta"
          description="Passionate henna artist dedicated to creating stunning designs for your most cherished moments."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
          {/* Image placeholder */}
          <div className="scroll-reveal-left">
            <div className="relative">
              <div className="bg-gradient-to-br from-gold/20 to-maroon/20 rounded-2xl p-1">
                <div className="bg-cream dark:bg-dark-surface rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gold to-maroon flex items-center justify-center mb-4 animate-pulse-glow">
                      <span className="font-vibes text-white text-5xl">P</span>
                    </div>
                    <p className="font-vibes text-gold text-2xl">Prajkta</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Mehandi Artist</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-gold rounded-bl-2xl" />
            </div>
          </div>

          {/* Bio */}
          <div className="scroll-reveal-right">
            <h3 className="font-vibes text-gold text-3xl mb-4">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              With years of experience in the art of mehandi, I have had the privilege of being part of countless
              beautiful celebrations. My passion for henna art began at a young age, and over the years, I have
              honed my skills to create designs that blend traditional elegance with contemporary style.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Every bride deserves to feel special on her big day, and my goal is to create mehandi designs
              that are as unique and beautiful as the occasion itself. From intricate bridal patterns to
              elegant Arabic designs, I pour my heart into every creation.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-dark-surface rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <FaPalette className="text-gold mx-auto mb-2 animate-bounce-gentle" size={24} />
                <p className="font-playfair font-bold text-maroon dark:text-cream text-lg">
                  <AnimatedCounter target={500} suffix="+" />
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Designs Created</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-dark-surface rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <FaHeart className="text-gold mx-auto mb-2 animate-bounce-gentle" style={{ animationDelay: '0.3s' }} size={24} />
                <p className="font-playfair font-bold text-maroon dark:text-cream text-lg">
                  <AnimatedCounter target={300} suffix="+" />
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Happy Brides</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-dark-surface rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <FaStar className="text-gold mx-auto mb-2 animate-bounce-gentle" style={{ animationDelay: '0.6s' }} size={24} />
                <p className="font-playfair font-bold text-maroon dark:text-cream text-lg">
                  <AnimatedCounter target={5} suffix="+" />
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
