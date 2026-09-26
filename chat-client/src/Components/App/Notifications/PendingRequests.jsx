import PendingRequestCard from './PendingRequestCard';

function PendingRequests({ pendingRequests }) {
  return (
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
  );
}

export default PendingRequests;
