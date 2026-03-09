const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const sendBookingNotification = async (bookingData) => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram is not configured. Skipping notification.');
    return;
  }

  const message =
    `🆕 *New Booking Received!*\n\n` +
    `👤 *Name:* ${bookingData.name}\n` +
    `📱 *Mobile:* ${bookingData.mobile}\n` +
    `📍 *Address:* ${bookingData.address}\n` +
    `📅 *Event Date:* ${bookingData.eventDate}\n` +
    `💍 *Event Type:* ${bookingData.eventType}\n` +
    `💬 *Message:* ${bookingData.message || 'No message provided'}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }),
  });
};
