import { useMutation, useQueryClient } from 'react-query'
import { updateAnecdote } from '../requests'

import { setNotification, clearNotification, useNotificationDispatch } from "../contexts/NotificationContext"

const Anecdote = ({ anecdote }) => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === anecdote.id ? anecdote : a))
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    updateAnecdoteMutation.mutate(updatedAnecdote)

    dispatch(setNotification(`voted for '${updatedAnecdote.content}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return(
    <div>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </div>
  )
}



export default AnecdoteList