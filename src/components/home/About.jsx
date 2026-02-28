import { FaPalette, FaHeart, FaStar } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  return (
    <section className="section-padding bg-cream-light">
      <div className="container-custom">
        <SectionHeading
          subtitle="About the Artist"
          title="Meet Prajkta"
          description="Passionate henna artist dedicated to creating stunning designs for your most cherished moments."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
          {/* Image placeholder */}
          <div className="scroll-reveal">
            <div className="relative">
              <div className="bg-gradient-to-br from-gold/20 to-maroon/20 rounded-2xl p-1">
                <div className="bg-cream rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gold to-maroon flex items-center justify-center mb-4">
                      <span className="font-vibes text-white text-5xl">P</span>
                    </div>
                    <p className="font-vibes text-gold text-2xl">Prajkta</p>
                    <p className="text-gray-500 text-sm mt-1">Mehandi Artist</p>
                  </div>
                </div>
              </div>
              {/* Decorative corner element */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-gold rounded-bl-2xl" />
            </div>
          </div>

          {/* Bio */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.2s' }}>
            <h3 className="font-vibes text-gold text-3xl mb-4">My Journey</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              With years of experience in the art of mehandi, I have had the privilege of being part of countless
              beautiful celebrations. My passion for henna art began at a young age, and over the years, I have
              honed my skills to create designs that blend traditional elegance with contemporary style.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every bride deserves to feel special on her big day, and my goal is to create mehandi designs
              that are as unique and beautiful as the occasion itself. From intricate bridal patterns to
              elegant Arabic designs, I pour my heart into every creation.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <FaPalette className="text-gold mx-auto mb-2" size={24} />
                <p className="font-playfair font-bold text-maroon text-lg">500+</p>
                <p className="text-gray-500 text-xs">Designs Created</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <FaHeart className="text-gold mx-auto mb-2" size={24} />
                <p className="font-playfair font-bold text-maroon text-lg">300+</p>
                <p className="text-gray-500 text-xs">Happy Brides</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <FaStar className="text-gold mx-auto mb-2" size={24} />
                <p className="font-playfair font-bold text-maroon text-lg">5+</p>
                <p className="text-gray-500 text-xs">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
