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

export function getErrorMessage(error) {
  // Stage 1: server responded with an error status
  if (error.response) {
    return {
      status: error.response.statusText || 'Error',
      description:
        error.response.data?.description ?? 'Something went wrong. Please try again.',
    };
  }

  // Stage 2: request was sent, but no response came back
  if (error.code === 'ECONNABORTED') {
    return { status: 'Timeout', description: 'The server took too long to respond.' };
  }

  if (error.request) {
    return {
      status: 'Network Error',
      description: 'Unable to reach the server. Please check your connection.',
    };
  }

  // Stage 3: failed before sending
  return { status: 'Error', description: error.message };
}
