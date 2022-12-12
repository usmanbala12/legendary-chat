import { createSlice } from "@reduxjs/toolkit"

const friendSlice = createSlice({
    name: 'friends',
    initialState: [],
    reducers: {
      appendFriend(state, action) {
        state.push(action.payload)
      },
      removeFriend(state, action) {
        return state.filter(friend => friend.id !== action.payload)
      },
      setFriends(state, action){
        return action.payload
      }
    }
})

export const { appendFriend, setFriends, removeFriend } = friendSlice.actions

export default friendSlice.reducer
  