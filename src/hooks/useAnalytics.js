import { useMemo } from 'react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function useAnalytics(bookings, galleryImages) {
  return useMemo(() => {
    const totalBookings = bookings.length;
    const totalImages = galleryImages.length;

    // Status distribution
    const statusCounts = { pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    bookings.forEach((b) => {
      if (statusCounts[b.status] !== undefined) statusCounts[b.status]++;
    });

    // This month's bookings
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const thisMonthBookings = bookings.filter((b) => {
      const created = b.createdAt?.toDate?.();
      if (!created) return false;
      return `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}` === thisMonth;
    }).length;

    // Monthly trends (last 6 months)
    const monthlyTrends = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
      const count = bookings.filter((b) => {
        const created = b.createdAt?.toDate?.();
        if (!created) return false;
        return `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}` === key;
      }).length;
      monthlyTrends.push({ month: label, bookings: count });
    }

    // Event type distribution
    const eventTypeCounts = {};
    bookings.forEach((b) => {
      if (b.eventType) {
        eventTypeCounts[b.eventType] = (eventTypeCounts[b.eventType] || 0) + 1;
      }
    });
    const eventTypeData = Object.entries(eventTypeCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Gallery category distribution
    const categoryCounts = {};
    galleryImages.forEach((img) => {
      if (img.category) {
        categoryCounts[img.category] = (categoryCounts[img.category] || 0) + 1;
      }
    });
    const categoryData = Object.entries(categoryCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Status data for pie chart
    const statusData = Object.entries(statusCounts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

    return {
      totalBookings,
      totalImages,
      thisMonthBookings,
      pendingCount: statusCounts.pending,
      monthlyTrends,
      eventTypeData,
      categoryData,
      statusData,
    };
  }, [bookings, galleryImages]);
}
