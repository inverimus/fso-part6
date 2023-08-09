import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes)

  const anecdotes = result.data

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isLoadingError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes}/>
    </div>
  )
}

export default App