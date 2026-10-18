import { useState, useEffect } from 'react';
import { useTypeWriter } from '../../Hooks/useTypeWriter';
import ChatBubble from './ChatBubble';

function TypeWriterEffect({ text, senderName, timeStamp }) {
  const [hasTypingStarted, setHasTypingStarted] = useState(false);
  const typeWriterStr = useTypeWriter(text, hasTypingStarted);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setHasTypingStarted(true);
    }, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <ChatBubble
      name={senderName}
      message={typeWriterStr}
      timeStamp={timeStamp}
      hasTypingStarted={hasTypingStarted && Boolean(typeWriterStr)}
    />
  );
}
export default TypeWriterEffect;
