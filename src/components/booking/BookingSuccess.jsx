import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import Button from '../ui/Button';

export default function BookingSuccess({ onReset }) {
  useEffect(() => {
    const fire = (opts) =>
      confetti({
        ...opts,
        particleCount: 80,
        spread: 70,
        colors: ['#D4A338', '#E8C568', '#8B1A2B', '#FDF0D5', '#A52240'],
        zIndex: 9999,
      });

    fire({ angle: 60, origin: { x: 0, y: 0.7 } });
    setTimeout(() => fire({ angle: 120, origin: { x: 1, y: 0.7 } }), 250);
    setTimeout(() => fire({ angle: 90, origin: { x: 0.5, y: 0.6 } }), 500);
  }, []);

  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="relative inline-block mb-4">
        <FaCheckCircle className="text-green-500 mx-auto animate-scale-in" size={64} />
        <div className="absolute inset-0 rounded-full animate-pulse-glow" />
      </div>
      <h3 className="font-playfair text-2xl md:text-3xl font-bold text-maroon dark:text-cream mb-3">
        Booking Confirmed!
      </h3>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-2">
        Thank you for choosing Bliss Bridal Mehandi! Your booking request has been received.
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        I will contact you shortly to confirm the details. Stay excited!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button to="/" variant="primary">Back to Home</Button>
        <Button onClick={onReset} variant="outline">Book Another</Button>
      </div>
    </div>
  );
}
