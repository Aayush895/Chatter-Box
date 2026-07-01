function MockConversationPanel() {
  return (
    <div className="w-full h-48 bg-[#1D1830] border-[#2C2640] mx-auto my-32 rounded-2xl p-4">
      <div className="flex items-center justify-between gap-1.5 font-['JetBrains_Mono',monospace] text-[11px] mb-3.5 lowercase">
        <div className="relative">
          <span className="absolute bottom-0 right-0 flex h-3 w-3 top-1/2 left-0.5 -translate-x-1/2 -translate-y-1/2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400 border-2 border-white"></span>
          </span>
          <span className="text-sm font-medium text-slate-400 mx-4">Online</span>
        </div>
        <p className="text-slate-400">12s ago</p>
      </div>
    </div>
  );
}
export default MockConversationPanel


// TypeWriter Effect functionality:
// 1. First wait for 3 seconds and show the bubbles
// 2. After the 3 seconds are over create a typing effect. It is similar to the countdown timer but instead of countdown timer we will be merging strings
// 3. Do this atleast 4 times and the conversations should be showing the conversation back & forth