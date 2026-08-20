import { useState, useEffect } from 'react';

export function useDebounceSearch(value) {
  const [debouncedSearch, setdebouncedSearch] = useState('');

  useEffect(() => {
    const timerID = setTimeout(() => {
      setdebouncedSearch(value);
    }, 500);
    return () => clearTimeout(timerID);
  }, [debouncedSearch, value]);

  return debouncedSearch;
}
