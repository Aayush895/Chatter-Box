import { useState, useEffect } from 'react';

export function useTypeWriter(text, hasTypingStarted) {
  const [typeWriterStr, setTypeWriteStr] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (hasTypingStarted) {
        if (timer != text.length) {
          setTypeWriteStr(typeWriterStr + text[timer]);
          setTimer(timer + 1);
        } else {
          clearInterval(timerId);
        }
      }
    }, 50);

    return () => {
      clearInterval(timerId);
    };
  }, [timer, hasTypingStarted]);

  return typeWriterStr;
}
