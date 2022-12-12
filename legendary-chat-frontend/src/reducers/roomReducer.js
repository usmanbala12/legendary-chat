import { createSlice } from "@reduxjs/toolkit"

const roomSlice = createSlice({
    name: 'rooms',
    initialState: [],
    reducers: {
      appendRoom(state, action) {
        state.push(action.payload)
      },
      setRooms(state, action){
        return action.payload
      }
  }
})

export const { appendRoom, setRooms } = roomSlice.actions

export default roomSlice.reducer
  