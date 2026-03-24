import BookingForm from '../components/booking/BookingForm';
import SectionHeading from '../components/ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function BookingPage() {
  useScrollReveal();

  return (
    <div className="pt-20 md:pt-24">
      <section className="section-padding bg-cream-light min-h-screen">
        <div className="container-custom">
          <SectionHeading
            subtitle="Get in Touch"
            title="Book Your Appointment"
            description="Fill out the form below and I will get back to you to confirm your booking."
          />
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
