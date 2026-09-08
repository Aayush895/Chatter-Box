# Things learned while making this project on client side and worth writing a blog about

- Stale closures in react
- Understanding `useEffect` more in depth

# How to handle protected routes and redirection once logged in

- Login for the first time and get the access and refresh tokens --> Done
- Once we are logged in make the UI redirect to the dashboard page (Redirect it using react-router) --> In-Progress
- If the access token is expired then the backend will handle in creating a new access token if the refresh token is still valid
- If both the access and refresh tokens are not valid then redirect the user back to the login page.

# Some important points about the access & refresh tokens

- The access token will be stored in a react context --> Done
- We will have to build a `refresh` route to refresh the access token or refetch the access token in case the user closes the application or hard refreshes the application --> Done

# Search Result Component dropdown

- Type the user name in the search input
- Use debouncing to delay the api-request
- Once the user stops timing and does not type for atleast 2 seconds, then hit the api-request
- Once the api-request is hit show all the users filtered by the DB through the search query
- The api-request needs to be a get-request and the query needs to be sent via URL params

# How does the friend request work (From one individual to another individual)

- Click on the person whom you want to send the request
- Get the id of both the requester and the receiver
- From the receiver's end scan the table and fetch all the requests based on the requester id
- If the requester id is the same as the user id then that means we are the requester and if not then that means we are on the receiver end
- Based on whether the receiver accepts it or not, change the request.
- The requester and the receiver id's will be the id's of the one who sent the request and the one who will receive the request respectively
- If the requester and receiver id are same then that means the user is trying to send a request to itself. If that is the case then simply throw an error stating that it is not possible
