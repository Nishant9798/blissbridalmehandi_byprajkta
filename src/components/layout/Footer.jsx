import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-maroon text-cream">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-vibes text-3xl text-gold-light mb-3">Bliss Bridal Mehandi</h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Creating beautiful henna art for your special moments.
              Expert bridal, Arabic, and traditional mehandi designs by Prajkta.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://www.instagram.com/blissbridalmehandi_byprajkta?igsh=dXpicGFhcDdwd2ph" target="_blank" rel="noopener noreferrer" className="text-cream/60 hover:text-gold transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-gold-light mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-cream/70 hover:text-gold transition-colors text-sm">Home</Link></li>
              <li><Link to="/gallery" className="text-cream/70 hover:text-gold transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/booking" className="text-cream/70 hover:text-gold transition-colors text-sm">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-gold-light mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <FaEnvelope className="text-gold flex-shrink-0" size={14} />
                <span>blissbridalmehandi@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-cream/70 text-sm">
                <FaMapMarkerAlt className="text-gold flex-shrink-0 mt-0.5" size={14} />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-6 text-center">
          <p className="text-cream/50 text-xs">
            &copy; {currentYear} Bliss Bridal Mehandi by Prajkta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
