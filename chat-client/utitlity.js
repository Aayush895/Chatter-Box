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
