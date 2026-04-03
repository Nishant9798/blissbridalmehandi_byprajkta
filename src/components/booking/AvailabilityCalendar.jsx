import { useState, useMemo } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useFirestoreCollection } from '../../hooks/useFirestore';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function AvailabilityCalendar({ onDateSelect, selectedDate }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const { documents: bookings } = useFirestoreCollection('bookings', {
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });

  // Count bookings per date (only confirmed/pending)
  const bookingCounts = useMemo(() => {
    const counts = {};
    bookings.forEach((b) => {
      if (b.eventDate && (b.status === 'pending' || b.status === 'confirmed')) {
        counts[b.eventDate] = (counts[b.eventDate] || 0) + 1;
      }
    });
    return counts;
  }, [bookings]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const goToPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isPast = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const getDateStatus = (day) => {
    const dateStr = formatDate(currentYear, currentMonth, day);
    const count = bookingCounts[dateStr] || 0;
    if (count >= 3) return 'booked';
    if (count >= 1) return 'partial';
    return 'available';
  };

  const handleDateClick = (day) => {
    if (isPast(day)) return;
    const status = getDateStatus(day);
    if (status === 'booked') return;
    const dateStr = formatDate(currentYear, currentMonth, day);
    onDateSelect?.(dateStr);
  };

  const isPrevDisabled = currentYear === today.getFullYear() && currentMonth === today.getMonth();

  return (
    <div className="mb-8 scroll-reveal">
      <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="font-playfair text-lg font-semibold text-maroon dark:text-cream mb-4 text-center">
          Check Availability
        </h3>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPrev}
            disabled={isPrevDisabled}
            className="p-2 rounded-full hover:bg-gold/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-maroon dark:text-cream"
          >
            <HiChevronLeft size={20} />
          </button>
          <h4 className="font-playfair text-base font-semibold text-maroon dark:text-cream">
            {MONTHS[currentMonth]} {currentYear}
          </h4>
          <button
            onClick={goToNext}
            className="p-2 rounded-full hover:bg-gold/10 transition-colors text-maroon dark:text-cream"
          >
            <HiChevronRight size={20} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDate(currentYear, currentMonth, day);
            const past = isPast(day);
            const status = getDateStatus(day);
            const isSelected = dateStr === selectedDate;
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            let cellClass = 'aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 relative ';

            if (past) {
              cellClass += 'text-gray-300 dark:text-gray-600 cursor-not-allowed';
            } else if (status === 'booked') {
              cellClass += 'bg-red-100 dark:bg-red-900/30 text-red-400 dark:text-red-400 cursor-not-allowed';
            } else if (isSelected) {
              cellClass += 'bg-gold text-white shadow-md scale-110 cursor-pointer';
            } else if (status === 'partial') {
              cellClass += 'bg-gold/15 dark:bg-gold/20 text-gold-dark dark:text-gold-light hover:bg-gold/25 cursor-pointer';
            } else {
              cellClass += 'text-gray-700 dark:text-gray-300 hover:bg-gold/10 cursor-pointer';
            }

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={past || status === 'booked'}
                className={cellClass}
              >
                {day}
                {isToday && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-3 h-3 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700" />
            Available
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-3 h-3 rounded bg-gold/20 border border-gold/40" />
            Filling up
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-3 h-3 rounded bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700" />
            Fully booked
          </div>
        </div>
      </div>
    </div>
  );
}
