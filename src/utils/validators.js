export function validateName(name) {
  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return '';
}

export function validateMobile(mobile) {
  const cleaned = mobile.replace(/\s/g, '');
  if (!cleaned) {
    return 'Mobile number is required';
  }
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return 'Enter a valid 10-digit Indian mobile number';
  }
  return '';
}

export function validateAddress(address) {
  if (!address || address.trim().length < 5) {
    return 'Please enter a valid address';
  }
  return '';
}

export function validateEventDate(date) {
  if (!date) {
    return 'Event date is required';
  }
  const selected = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) {
    return 'Event date cannot be in the past';
  }
  return '';
}

export function validateEventType(type) {
  if (!type) {
    return 'Please select an event type';
  }
  return '';
}

export function validateBookingForm(formData) {
  const errors = {};
  const nameErr = validateName(formData.name);
  if (nameErr) errors.name = nameErr;
  const mobileErr = validateMobile(formData.mobile);
  if (mobileErr) errors.mobile = mobileErr;
  const addressErr = validateAddress(formData.address);
  if (addressErr) errors.address = addressErr;
  const dateErr = validateEventDate(formData.eventDate);
  if (dateErr) errors.eventDate = dateErr;
  const typeErr = validateEventType(formData.eventType);
  if (typeErr) errors.eventType = typeErr;
  return errors;
}
