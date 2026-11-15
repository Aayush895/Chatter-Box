import EmptyNotification from './EmptyNotification';
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
                  userName={pendingRequest.requester.userName}
                  requestData={pendingRequest}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyNotification />
      )}
    </>
  );
}

export default PendingRequests;
