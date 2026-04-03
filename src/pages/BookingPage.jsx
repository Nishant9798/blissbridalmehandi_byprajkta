import { useSearchParams } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import AvailabilityCalendar from '../components/booking/AvailabilityCalendar';
import SectionHeading from '../components/ui/SectionHeading';
import SEOHead from '../components/ui/SEOHead';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useState } from 'react';

export default function BookingPage() {
  useScrollReveal();
  const [searchParams] = useSearchParams();
  const preselectedPackage = searchParams.get('package');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <>
      <SEOHead
        title="Book Appointment | Bliss Bridal Mehandi"
        description="Book your mehandi appointment with Prajkta. Fill out the form and get confirmation for your bridal, party or festival mehandi."
      />
      <div className="pt-20 md:pt-24">
        <section className="section-padding bg-cream-light dark:bg-dark-bg min-h-screen">
          <div className="container-custom">
            <SectionHeading
              subtitle="Get in Touch"
              title="Book Your Appointment"
              description="Check availability and fill out the form below. I will get back to you to confirm your booking."
            />
            <div className="max-w-4xl mx-auto">
              <AvailabilityCalendar onDateSelect={setSelectedDate} selectedDate={selectedDate} />
              <BookingForm preselectedDate={selectedDate} preselectedPackage={preselectedPackage} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
