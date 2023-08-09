import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    case "CLEAR":
        return null
    default:
        return null
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const value = useContext(NotificationContext)
  return value[0]
}

export const useNotificationDispatch  = () => {
  const value = useContext(NotificationContext)
  return value[1]
}

export const setNotification = (message) => {
  return { type: 'SET', payload: message }
}

export const clearNotification = () => {
  return { type: 'CLEAR' }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext