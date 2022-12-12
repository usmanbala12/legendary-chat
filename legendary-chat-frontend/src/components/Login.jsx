import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import userService from '../services/userService'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUserName] = useState('')

  const submitName = async e => {
    e.preventDefault()
    const res = await userService.login({username: username})
    console.log(res)
    window.localStorage.setItem('legendaryChatUser', JSON.stringify(res))
    dispatch(setUser(res))
    setUserName('')
    navigate('/', {replace: true})
  }

  return (
    <div className='login'>
        <form onSubmit={submitName}>
            <input type="text" name="username" placeholder='Username' value={username} onChange={({target})=> setUserName(target.value)} pattern='^[a-zA-Z_](?!.*?\.{2})[\w.]{1,28}[\w]$' />
            <button>login</button>
        </form>
        <p onClick={() => navigate('/register')}>Sign Up</p>
    </div>
  )
}

export default Login