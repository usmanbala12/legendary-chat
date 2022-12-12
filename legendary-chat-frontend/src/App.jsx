import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import io from 'socket.io-client';
import { ChatScreen } from './components/ChatScreen';
import './App.css'
import { RoomList } from './components/RoomList';
import { Profile } from './components/Profile';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes';
import RegisterScreen from './components/RegisterScreen';
import { initializeUser } from './reducers/userReducer';
import AddFriend from './components/AddFriend';
import Login from './components/Login';


const socket = io();

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const legendary = window.localStorage.getItem('legendaryChatUser')
    console.log(legendary)
    if (legendary) {
      const profile = JSON.parse(legendary)
      console.log(profile)
      dispatch(initializeUser(profile.id))
    }
  }, [])


  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<RoomList />} />
          <Route path='rooms/:id' element={<ChatScreen socket={socket}/>} />
          <Route path='profile' element={<Profile />} />
          <Route path='/addfriends' element={<AddFriend />} />
        </Route>
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;