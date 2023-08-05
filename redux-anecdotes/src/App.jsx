// import { useSelector, useDispatch } from 'react-redux'
// import anecdoteReducer from './reducers/anecdoteReducer'
import Anecdotes from './components/Anecdotes'

const App = () => {
  return (
    <div>
      <Anecdotes />
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App