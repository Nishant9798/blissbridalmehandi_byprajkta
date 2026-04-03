import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { HiCalendar, HiPhotograph, HiClock, HiTrendingUp } from 'react-icons/hi';
import { useFirestoreCollection } from '../../hooks/useFirestore';
import { useAnalytics } from '../../hooks/useAnalytics';
import StatCard from './StatCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const COLORS = ['#D4A338', '#8B1A2B', '#E8C568', '#A52240', '#B8872E', '#6D1422', '#C2185B'];

const STATUS_COLORS = {
  Pending: '#EAB308',
  Confirmed: '#3B82F6',
  Completed: '#22C55E',
  Cancelled: '#EF4444',
};

export default function AnalyticsDashboard() {
  const { documents: bookings, loading: loadingBookings } = useFirestoreCollection('bookings', {
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });

  const { documents: galleryImages, loading: loadingGallery } = useFirestoreCollection('gallery', {
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });

  const analytics = useAnalytics(bookings, galleryImages);

  if (loadingBookings || loadingGallery) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  const {
    totalBookings,
    totalImages,
    thisMonthBookings,
    pendingCount,
    monthlyTrends,
    eventTypeData,
    statusData,
  } = analytics;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiCalendar} label="Total Bookings" value={totalBookings} color="text-maroon" bgColor="bg-maroon/10" />
        <StatCard icon={HiClock} label="Pending" value={pendingCount} color="text-yellow-600" bgColor="bg-yellow-100" />
        <StatCard icon={HiTrendingUp} label="This Month" value={thisMonthBookings} color="text-green-600" bgColor="bg-green-100" />
        <StatCard icon={HiPhotograph} label="Gallery Images" value={totalImages} color="text-gold" bgColor="bg-gold/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Booking Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-4">Booking Trends</h3>
          {monthlyTrends.some((m) => m.bookings > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                />
                <Bar dataKey="bookings" fill="#D4A338" radius={[4, 4, 0, 0]} name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">No booking data yet</p>
          )}
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-4">Booking Status</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                  labelLine={false}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#888'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">No booking data yet</p>
          )}
        </div>

        {/* Popular Event Types */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:col-span-2">
          <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-4">Popular Event Types</h3>
          {eventTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={eventTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                />
                <Bar dataKey="value" name="Bookings" radius={[0, 4, 4, 0]}>
                  {eventTypeData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">No event data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
