import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useFirestoreCollection } from '../../hooks/useFirestore';
import { BOOKING_STATUSES } from '../../utils/constants';
import LoadingSpinner from '../ui/LoadingSpinner';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function BookingList() {
  const { documents: bookings, loading } = useFirestoreCollection('bookings', {
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status: newStatus });
      toast.success(`Booking ${newStatus}`);
    } catch (err) {
      console.error('Status update error:', err);
      toast.error('Failed to update status');
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-12" />;

  if (bookings.length === 0) {
    return <p className="text-gray-500 text-center py-12">No bookings yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-2 font-semibold text-gray-700">Name</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-700">Mobile</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-700 hidden md:table-cell">Event</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-700">Date</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-700">Status</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-2">
                <div>
                  <p className="font-medium text-gray-800">{booking.name}</p>
                  <p className="text-xs text-gray-500 hidden sm:block truncate max-w-[150px]">{booking.address}</p>
                </div>
              </td>
              <td className="py-3 px-2 text-gray-600">
                <a href={`tel:+91${booking.mobile}`} className="text-blue-600 hover:underline">
                  {booking.mobile}
                </a>
              </td>
              <td className="py-3 px-2 text-gray-600 hidden md:table-cell">{booking.eventType}</td>
              <td className="py-3 px-2 text-gray-600">{booking.eventDate}</td>
              <td className="py-3 px-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[booking.status] || 'bg-gray-100 text-gray-600'}`}>
                  {booking.status}
                </span>
              </td>
              <td className="py-3 px-2">
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className="px-2 py-1 rounded border border-gray-200 text-xs focus:outline-none focus:border-gold"
                >
                  {BOOKING_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile-friendly cards view for small screens */}
      <div className="md:hidden mt-4 space-y-3">
        {bookings.map((booking) => (
          <div key={`card-${booking.id}`} className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{booking.name}</p>
                <a href={`tel:+91${booking.mobile}`} className="text-blue-600 text-sm">{booking.mobile}</a>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[booking.status]}`}>
                {booking.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{booking.eventType} &middot; {booking.eventDate}</p>
            <p className="text-xs text-gray-500">{booking.address}</p>
            {booking.message && <p className="text-xs text-gray-400 italic">{booking.message}</p>}
            <select
              value={booking.status}
              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
              className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm focus:outline-none focus:border-gold"
            >
              {BOOKING_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
