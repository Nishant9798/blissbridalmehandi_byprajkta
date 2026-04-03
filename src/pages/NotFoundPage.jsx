import { Link } from 'react-router-dom';
import { FaImages, FaCalendarAlt, FaHome, FaRupeeSign } from 'react-icons/fa';
import SEOHead from '../components/ui/SEOHead';

const SUGGESTED_PAGES = [
  { name: 'Home', path: '/', icon: FaHome, desc: 'Back to main page' },
  { name: 'Gallery', path: '/gallery', icon: FaImages, desc: 'Browse designs' },
  { name: 'Book Now', path: '/booking', icon: FaCalendarAlt, desc: 'Schedule appointment' },
  { name: 'Pricing', path: '/pricing', icon: FaRupeeSign, desc: 'View packages' },
];

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="Page Not Found | Bliss Bridal Mehandi" description="The page you're looking for doesn't exist." />
      <div className="min-h-screen flex items-center justify-center bg-cream-light dark:bg-dark-bg pt-20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 mehndi-pattern opacity-20" />

        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-gold/15 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-gold/10 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-maroon/10 rounded-full animate-float-slower" />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <p className="font-vibes text-gold text-8xl md:text-9xl mb-2 animate-fade-in text-gradient-gold">404</p>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-maroon dark:text-cream mb-4 animate-slide-up">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            The page you are looking for might have been moved or doesn&apos;t exist. Let us guide you somewhere beautiful.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium uppercase tracking-wider">
            Try these popular pages
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {SUGGESTED_PAGES.map(({ name, path, icon: Icon, desc }) => (
              <Link
                key={path}
                to={path}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 dark:bg-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  <Icon className="text-gold group-hover:text-white transition-colors" size={20} />
                </div>
                <span className="font-poppins font-medium text-sm text-maroon dark:text-cream">{name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
