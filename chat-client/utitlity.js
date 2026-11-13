// List of utitlity functions:

export function getInitials(userName, fallback = '?') {
  const WORD_REGEX = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g;
  if (typeof userName !== 'string') return fallback;

  const words = userName.match(WORD_REGEX);
  if (!words) return fallback;

  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';

  return (first + last).toUpperCase();
}

export function getHowMuchTimePassed(time) {
  const date = new Date(time);
  const secondsElapsed = Math.floor((Date.now() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(Math.abs(secondsElapsed) / interval.seconds);
    if (count >= 1) {
      // Negative values produce "ago", positive values produce "in X..."
      const value = secondsElapsed > 0 ? -count : count;
      return rtf.format(value, interval.unit);
    }
  }

  return 'just now';
}
