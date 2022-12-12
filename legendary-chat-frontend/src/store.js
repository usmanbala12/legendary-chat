import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import roomReducer from "./reducers/roomReducer";
import friendReducer from "./reducers/friendReducer";

const store = configureStore({
    reducer: {
        rooms: roomReducer,
        user: userReducer,
        friends: friendReducer
    }
})

export default store