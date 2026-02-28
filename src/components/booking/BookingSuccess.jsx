import { FaCheckCircle } from 'react-icons/fa';
import Button from '../ui/Button';

export default function BookingSuccess({ onReset }) {
  return (
    <div className="text-center py-12 animate-fade-in">
      <FaCheckCircle className="text-green-500 mx-auto mb-4" size={64} />
      <h3 className="font-playfair text-2xl md:text-3xl font-bold text-maroon mb-3">
        Booking Confirmed!
      </h3>
      <p className="text-gray-600 max-w-md mx-auto mb-2">
        Thank you for choosing Bliss Bridal Mehandi! Your booking request has been received.
      </p>
      <p className="text-gray-500 text-sm mb-8">
        I will contact you shortly to confirm the details. Stay excited!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button to="/" variant="primary">Back to Home</Button>
        <Button onClick={onReset} variant="outline">Book Another</Button>
      </div>
    </div>
  );
}
