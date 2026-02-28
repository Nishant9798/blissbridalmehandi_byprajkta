import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark via-maroon to-rose-deep" />

      {/* Decorative mehndi pattern overlay */}
      <div className="absolute inset-0 mehndi-pattern opacity-30" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,163,56,0.15)_0%,_transparent_70%)]" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full" />
      <div className="absolute bottom-32 right-10 w-48 h-48 border border-gold/10 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-gold/15 rounded-full" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="font-vibes text-gold-light text-3xl md:text-5xl mb-4 animate-fade-in">
          Welcome to
        </p>
        <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-slide-up">
          Bliss Bridal Mehandi
        </h1>
        <p className="font-vibes text-gold-light text-2xl md:text-4xl mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          by Prajkta
        </p>
        <p className="font-poppins text-cream/80 text-base md:text-lg max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Adorning your hands with timeless henna artistry.
          From bridal masterpieces to elegant party designs, every stroke tells a beautiful story.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button to="/booking" variant="primary">
            Book Appointment
          </Button>
          <Button to="/gallery" variant="outline-white">
            View Gallery
          </Button>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L48 55C96 50 192 40 288 38C384 36 480 42 576 50C672 58 768 68 864 65C960 62 1056 46 1152 40C1248 34 1344 38 1392 40L1440 42V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V60Z"
            fill="#FEF7EB"
          />
        </svg>
      </div>
    </section>
  );
}
