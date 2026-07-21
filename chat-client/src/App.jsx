import AuthPage from './Components/Auth/AuthPage';
import { useHealthQuery } from './Hooks/Queries/useHealthQuery';
import './App.css';

function App() {
  const { isLoading } = useHealthQuery();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <AuthPage />
    </>
  );
}

export default App;
