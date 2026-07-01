import AuthPage from './Components/Auth/AuthPage';
import { useHealthQuery } from './Hooks/Queries/useHealthQuery';
import './App.css';

function App() {
  const { data, isLoading } = useHealthQuery();
  if (isLoading) return <h1>Loading...</h1>;
  console.log(data);
  return (
    <>
      <AuthPage />
    </>
  );
}

export default App;
