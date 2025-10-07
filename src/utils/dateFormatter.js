export function formatDateWithOffset(dateString) {
    const date = new Date(dateString);
    // Add 5 hours and 30 minutes to the date
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
  
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return date.toLocaleString('en-US', options);
  }