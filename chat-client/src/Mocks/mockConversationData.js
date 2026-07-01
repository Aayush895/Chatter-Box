export const mockConversationData = [
  {
    id: 'msg_001',
    senderName: 'Alex',
    timestamp: '10:00 AM',
    message:
      'Hey! I just pushed the new v0 prototype to staging. The document sharing feature is live.',
  },
  {
    id: 'msg_002',
    senderName: 'You',
    timestamp: '10:02 AM',
    message:
      'Awesome, checking it out now. Did you fix that JSX issue with the JetBrains Mono font?',
  },
  {
    id: 'msg_003',
    senderName: 'Alex',
    timestamp: '10:03 AM',
    message:
      'Yeah, used className instead of class, and added the underscores. All sorted!',
  },
  {
    id: 'msg_004',
    senderName: 'You',
    timestamp: '10:05 AM',
    message:
      'Perfect. By the way, how is the AI document summarization handling larger PDFs?',
  },
  {
    id: 'msg_005',
    senderName: 'Alex',
    timestamp: '10:07 AM',
    message:
      'It is surprisingly fast. Under the hood, the system chunks the text into smaller segments, processes them through the LLM, and stitches the summary back together. It takes about 3 to 5 seconds for a standard 10-page document.',
  },
];
