import { useState, useContext } from 'react';
import { useFetchUsersQuery } from '../../../Hooks/Queries/useFetchUsersQuery';
import UserContext from '../../../Context/UserContext';
import { useDebounceSearch } from '../../../Hooks/useDebounceSearch';
import SearchResultDialog from './SearchResultDialog';

function SearchUsers() {
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [searchResultDialog, setSearchResultDialog] = useState(false);
  const { userInfo } = useContext(UserContext);
  const debouncedVal = useDebounceSearch(userSearchQuery);
  const { data, isLoading } = useFetchUsersQuery(debouncedVal, userInfo.accessToken);

  function handleSearchQuery(e) {
    const { value } = e.target;
    if (value.trim().length == 0) return;
    setUserSearchQuery(value);
    setSearchResultDialog(true);
  }
  // TODO: Need to handle the part where user sends the request more than once
  return (
    <>
      <div className="mb-5 w-full flex justify-center items-center">
        <label className="input w-full sm:w-[70%] md:w-[50%] lg:w-[30%] rounded-xl bg-[#241E38]">
          <svg
            className="h-[1em] opacity-50 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search by username or email"
            onChange={handleSearchQuery}
          />
        </label>
      </div>
      {userSearchQuery && userSearchQuery.length > 0 && searchResultDialog && (
        <SearchResultDialog
          users={data?.data}
          isLoading={isLoading}
          setSearchResultDialog={setSearchResultDialog}
        />
      )}
    </>
  );
}

export default SearchUsers;
