import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import reduxStore from './Store/reduxStore';
import Main from './Components/Routes/Main';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <QueryClientProvider client={new QueryClient()}>
        <Main />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
