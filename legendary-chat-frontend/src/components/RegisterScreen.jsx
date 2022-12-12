import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import userService from '../services/userService'

const RegisterScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [username, setUserName] = useState('')

  const submitName = async e => {
    e.preventDefault()
    const res = await userService.createProfile({name: name, username: username})
    window.localStorage.setItem('legendaryChatUser', JSON.stringify(res))
    dispatch(setUser(res))
    setName('')
    setUserName('')
    navigate('/', {replace: true})
  }

  return (
    <div className='register'>
        <form onSubmit={submitName}>
            <input type="text" name="name" placeholder='Name' value={name} onChange={({target})=> setName(target.value)} pattern='[a-zA-z\s]{3,}' />
            <input type="text" name="username" placeholder='Username' value={username} onChange={({target})=> setUserName(target.value)} pattern='^[a-zA-Z_](?!.*?\.{2})[\w.]{1,28}[\w]$' />
            <button>register</button>
        </form>
        <p onClick={() => navigate('/login')}>Login</p>
    </div>
  )
}

export default RegisterScreen