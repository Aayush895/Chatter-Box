import { useHealthQuery } from './Hooks/Queries/useHealthQuery'

function App() {
  const {data, isLoading} = useHealthQuery()
  if(isLoading) return <h1>Loading...</h1>
  return (
    <>
      <div>{data?.description}</div>
    </>
  )
}

export default App
