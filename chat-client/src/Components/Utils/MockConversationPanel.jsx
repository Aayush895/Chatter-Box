import TypeWriterEffect from './TypeWriterEffect';
import { mockConversationData } from '../../Mocks/mockConversationData';

function MockConversationPanel() {
  return (
    <>
      <div className="w-full mx-auto my-10 bg-[#1D1830] border border-[#2C2640] rounded-2xl p-4 flex flex-col">
        <div className="flex items-center gap-1.5 font-['JetBrains_Mono',monospace] text-[11px] mb-3.5 lowercase text-[#6B6480]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EEAD4] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5EEAD4]" />
          </span>
          <span>online</span>
          <span className="ml-auto">12s ago</span>
        </div>
        <div className="flex flex-col gap-2 pr-1">
          {mockConversationData.map((conversationData) => {
            const isMe = conversationData.senderName === 'You';
            return (
              <div
                key={conversationData.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <TypeWriterEffect
                  text={conversationData.message}
                  senderName={conversationData.senderName}
                  timeStamp={conversationData.timestamp}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default MockConversationPanel;
