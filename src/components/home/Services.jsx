import { FaGem, FaPaintBrush, FaFeatherAlt, FaStar, FaGlassCheers, FaCandyCane } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import { SERVICES } from '../../utils/constants';

const ICON_MAP = {
  GiDiamondRing: FaGem,
  GiFlowerPot: FaPaintBrush,
  GiPeacockTail: FaFeatherAlt,
  GiFlowerStar: FaStar,
  GiPartyPopper: FaGlassCheers,
  GiLanternFlame: FaCandyCane,
};

export default function Services() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          subtitle="What I Offer"
          title="My Services"
          description="From bridal masterpieces to everyday elegance, I offer a wide range of mehandi styles to suit every occasion."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <div
                key={service.title}
                className="scroll-reveal group bg-cream-light rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gold/20"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold/20 to-maroon/20 flex items-center justify-center group-hover:from-gold group-hover:to-maroon transition-all duration-300">
                  <Icon className="text-gold group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-maroon mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
