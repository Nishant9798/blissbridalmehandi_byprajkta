import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Book Now', path: '/booking' },
  { name: 'Admin', path: '/admin' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const navBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-md'
    : 'bg-transparent';
  const textColor = scrolled || !isHome ? 'text-maroon' : 'text-white';
  const logoColor = scrolled || !isHome ? 'text-maroon' : 'text-gold-light';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        <Link to="/" className={`font-vibes text-2xl md:text-3xl transition-colors ${logoColor}`}>
          Bliss Bridal Mehandi
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-poppins font-medium text-sm uppercase tracking-wider transition-colors hover:text-gold ${
                pathname === link.path ? 'text-gold' : textColor
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors ${textColor}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg animate-slide-down">
          <div className="container-custom py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-poppins font-medium text-sm uppercase tracking-wider py-2 transition-colors hover:text-gold ${
                  pathname === link.path ? 'text-gold' : 'text-maroon'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
