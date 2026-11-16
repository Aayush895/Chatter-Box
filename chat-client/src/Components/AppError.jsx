function AppError({ status, description, onRetry, isRetrying = false }) {
  return (
    <div
      role="alert"
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-[#14111F] px-6 text-center sm:gap-10"
    >
      {/* soft background glow */}
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-rose-600/20 blur-3xl sm:h-96 sm:w-96" />

      {/* icon */}
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-rose-500/30 bg-rose-500/10 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-rose-400 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      {/* message */}
      <div className="relative flex max-w-md animate-[fadeIn_0.5s_ease-out] flex-col items-center gap-3">
        <h1 className="text-xl font-semibold tracking-wide text-white sm:text-2xl lg:text-3xl">
          Something went wrong
        </h1>
        <p className="text-sm text-white/60 sm:text-base">
          {description || 'We could not start the app. Please try again.'}
        </p>
        {status && (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40">
            {status}
          </span>
        )}
      </div>

      {/* retry */}
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="relative flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {isRetrying && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        )}
        {isRetrying ? 'Retrying…' : 'Try again'}
      </button>
    </div>
  );
}

export default AppError;
