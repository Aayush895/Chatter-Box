import PendingRequestCard from './PendingRequestCard';

function PendingRequests({ pendingRequests }) {
  return (
    <>
      {pendingRequests && Array.isArray(pendingRequests) && pendingRequests.length > 0 ? (
        <ul className="list-none">
          {pendingRequests?.map((pendingRequest) => {
            return (
              <li key={pendingRequest.id}>
                <PendingRequestCard
                  userName={
                    pendingRequest.requester.userName.charAt(0).toUpperCase() +
                    pendingRequest.requester.userName.slice(1)
                  }
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-3 px-6 py-10 min-h-48">
          <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-indigo-300"
              aria-hidden="true"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </div>
          <p className="text-white/60 text-sm font-medium">
            There are currently no pending notifications
          </p>
        </div>
      )}
    </>
  );
}

export default PendingRequests;
