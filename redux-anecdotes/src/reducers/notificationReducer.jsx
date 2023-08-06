import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      const message = action.payload
      return message
    },
    clearNotification(state, action) {
      return null
    }
  }
})
export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch(addNotification(message))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer