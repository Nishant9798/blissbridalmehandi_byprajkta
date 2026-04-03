import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, firebaseConfigured } from '../../config/firebase';
import { validateBookingForm } from '../../utils/validators';
import { EVENT_TYPES } from '../../utils/constants';
import toast from 'react-hot-toast';
import { sendBookingNotification } from '../../utils/emailService';
import BookingSuccess from './BookingSuccess';
import Button from '../ui/Button';

const INITIAL_FORM = {
  name: '',
  mobile: '',
  address: '',
  eventDate: '',
  eventType: '',
  message: '',
};

function FloatingField({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function BookingForm({ preselectedDate, preselectedPackage }) {
  const [formData, setFormData] = useState({
    ...INITIAL_FORM,
    eventDate: preselectedDate || '',
    message: preselectedPackage ? `Interested in: ${preselectedPackage}` : '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateBookingForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    if (!firebaseConfigured || !db) {
      toast.error('Firebase is not configured. Please contact the admin.');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        mobile: formData.mobile.replace(/\s/g, ''),
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      toast.success('Booking submitted successfully!');

      sendBookingNotification(formData).catch((err) =>
        console.error('Email notification failed:', err)
      );
    } catch (err) {
      console.error('Booking error:', err);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  const handleDateSelect = (date) => {
    setFormData((prev) => ({ ...prev, eventDate: date }));
    if (errors.eventDate) {
      setErrors((prev) => ({ ...prev, eventDate: '' }));
    }
  };

  if (submitted) {
    return <BookingSuccess onReset={handleReset} />;
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[field] ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-dark-surface'
    } focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all font-poppins text-sm dark:text-cream placeholder:text-gray-400 dark:placeholder:text-gray-500`;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5" onDateSelect={handleDateSelect}>
      <FloatingField label="Full Name *" error={errors.name}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={inputClass('name')}
        />
      </FloatingField>

      <FloatingField label="Mobile Number *" error={errors.mobile}>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-dark-card text-gray-500 dark:text-gray-400 text-sm">
            +91
          </span>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength={10}
            className={`${inputClass('mobile')} rounded-l-none`}
          />
        </div>
      </FloatingField>

      <FloatingField label="Address *" error={errors.address}>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Event / home address"
          className={inputClass('address')}
        />
      </FloatingField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FloatingField label="Event Date *" error={errors.eventDate}>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={inputClass('eventDate')}
          />
        </FloatingField>
        <FloatingField label="Event Type *" error={errors.eventType}>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className={inputClass('eventType')}
          >
            <option value="">Select event type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </FloatingField>
      </div>

      <FloatingField label="Message (Optional)">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any special requests or design preferences..."
          rows={4}
          className={inputClass('message')}
        />
      </FloatingField>

      <Button type="submit" variant="secondary" disabled={submitting} className="w-full">
        {submitting ? 'Submitting...' : 'Book Appointment'}
      </Button>
    </form>
  );
}
