import { useEffect, useState } from 'react';

const STAGES = [
  { at: 0, text: 'Initialising…' },
  { at: 2500, text: 'Loading the app…' },
  { at: 8000, text: 'Still working on it, hang tight…' },
];

function AppLoader() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = STAGES.slice(1).map((s, i) => setTimeout(() => setStage(i + 1), s.at));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-[#14111F] px-6 sm:gap-10"
    >
      {/* soft background glow */}
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-violet-600/20 blur-3xl sm:h-96 sm:w-96" />

      {/* spinner */}
      <div className="relative h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-violet-500/40 border-t-violet-500" />
        <div className="absolute inset-3 animate-[spin_1.6s_linear_infinite] rounded-full border-4 border-transparent border-b-fuchsia-400 border-l-fuchsia-400/40 [animation-direction:reverse] sm:inset-4" />
        <div className="absolute inset-0 m-auto h-3 w-3 animate-pulse rounded-full bg-violet-400 shadow-[0_0_24px_6px_rgba(167,139,250,0.5)] sm:h-4 sm:w-4" />
      </div>

      {/* status text, re-keyed so it fades in on every change */}
      <div className="relative flex flex-col items-center gap-2 text-center">
        <p
          key={stage}
          className="animate-[fadeIn_0.5s_ease-out] text-lg font-medium tracking-wide text-white sm:text-xl lg:text-2xl"
        >
          {STAGES[stage].text}
        </p>
        <p className="text-xs text-white/40 sm:text-sm">This will only take a moment</p>
      </div>
    </div>
  );
}

export default AppLoader;
