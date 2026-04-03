import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import ThemeToggle from '../ui/ThemeToggle';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Pricing', path: '/pricing' },
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
    ? 'bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-md'
    : 'bg-transparent';
  const textColor = scrolled || !isHome ? 'text-maroon dark:text-cream' : 'text-white';
  const logoColor = scrolled || !isHome ? 'text-maroon dark:text-gold-light' : 'text-gold-light';

  return (
    <nav className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
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
              className={`relative group font-poppins font-medium text-sm uppercase tracking-wider transition-colors hover:text-gold ${
                pathname === link.path ? 'text-gold' : textColor
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300 ${
                  pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
          <ThemeToggle />
          <Link
            to="/booking"
            className="ml-2 px-5 py-2 rounded-full bg-gold text-white text-sm font-poppins font-medium shadow-md hover:bg-gold-dark hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors ${textColor}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-lg animate-slide-down">
          <div className="container-custom py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-poppins font-medium text-sm uppercase tracking-wider py-2 transition-colors hover:text-gold ${
                  pathname === link.path ? 'text-gold' : 'text-maroon dark:text-cream'
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/booking"
              className="mt-2 px-5 py-3 rounded-full bg-gold text-white text-sm font-poppins font-medium text-center shadow-md hover:bg-gold-dark transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
