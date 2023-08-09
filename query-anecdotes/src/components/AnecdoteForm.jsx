import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from "../requests"

import { setNotification, clearNotification, useNotificationDispatch } from "../contexts/NotificationContext"

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(anecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, votes: 0 }, {
      onSuccess: (anecdote) => {
        dispatch(setNotification(`added anecdote: '${anecdote.content}'`))
        setTimeout(() => dispatch(clearNotification()), 5000)
      },
      onError: (e => {
        dispatch(setNotification('The anecdote must be at least 5 characters'))
        setTimeout(() => dispatch(clearNotification()), 5000)
      })
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm