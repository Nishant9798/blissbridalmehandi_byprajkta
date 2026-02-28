import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, firebaseConfigured } from '../../config/firebase';
import { validateBookingForm } from '../../utils/validators';
import { EVENT_TYPES } from '../../utils/constants';
import toast from 'react-hot-toast';
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

export default function BookingForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
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

  if (submitted) {
    return <BookingSuccess onReset={handleReset} />;
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    } focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors font-poppins text-sm`;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={inputClass('name')}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
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
        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Event / home address"
          className={inputClass('address')}
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      {/* Event Date & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={inputClass('eventDate')}
          />
          {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
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
          {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any special requests or design preferences..."
          rows={4}
          className={inputClass('message')}
        />
      </div>

      <Button type="submit" variant="secondary" disabled={submitting} className="w-full">
        {submitting ? 'Submitting...' : 'Book Appointment'}
      </Button>
    </form>
  );
}
