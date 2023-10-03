function formateTimeDifference(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const intervals = {
    year: 31536000000,
    month: 2592000000,
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
  };
  
  for (const [unit, interval] of Object.entries(intervals)) {
    const count = Math.floor(diff / interval);
    if(count > 0) {
      return `${count}${unit.charAt(0)} ago`;
    }
  }
  
  return 'just now';
}

export default formateTimeDifference;
