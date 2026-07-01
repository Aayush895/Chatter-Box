import MockConversationPanel from '../Utils/MockConversationPanel';

function BrandPanel() {
  return (
    <div className="w-[35%] font-bold bg-[radial-gradient(120%_120%_at_0%_0%,#201A38_0%,#14111F_60%)] px-9 py-14">
      <div className="navbar">
        <p className="flex items-center gap-2.5 mb-7">
          <span className="text-[22px] text-[#FF6B4D] rotate-180 inline-block">◡</span>
          <span className="font-['Fraunces',serif] italic font-semibold text-2xl tracking-[-0.01em]">
            Wisp
          </span>
        </p>
      </div>
      <h1 className="font-['Fraunces',serif] font-medium w-112.5 text-3xl leading-tight  text-[#F3F1F7]">
        Conversations that feel like that they are actually happening
      </h1>

      <MockConversationPanel />
      <p className="text-slate-400 font-['JetBrains_Mono',monospace] text-[12px] leading-[1.6] tracking-[0.01em]">
        Real-time delivery. Zero setup. Built for people who talk fast.
      </p>
    </div>
  );
}
export default BrandPanel;
