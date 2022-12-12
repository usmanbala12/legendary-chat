import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/userService"
import { setFriends } from "./friendReducer"
import { setRooms } from "./roomReducer"

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
      setUser(state, action){
        return action.payload
      }
    }
})

export const { setUser } = userSlice.actions

export const initializeUser = (id) => {
  return async dispatch => {
      const response = await userService.getUser(id)
      console.log(response)
      dispatch(setUser(response))
      if(response.friends){
        dispatch(setFriends(response.friends))
      }
  }
}

export default userSlice.reducer