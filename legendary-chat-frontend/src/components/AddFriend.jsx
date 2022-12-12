import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { appendFriend, removeFriend } from '../reducers/friendReducer'
import userService from '../services/userService'
import Dp from './Dp'

export const FriendCard = ({user, friend}) => {

  const [fCheck, setFcheck] = useState(friend)

  const userid = useSelector(state => {
    return state.user.id
  })

  const dispatch = useDispatch()

  const addfriend = async () => {
    console.log(userid, 'userid')
    const result = await userService.toggleFriends(userid, {id: user.id, action: 'add'})
    dispatch(appendFriend(user.id))
    setFcheck(!fCheck)
    console.log(result)
  }

  const removeFriendfrom = async () => {
    const result = await userService.toggleFriends(userid, {id: user.id, action: 'remove'})
    dispatch(removeFriend(user.id))
    setFcheck(!fCheck)
  }

  return (
    <div className='friend-card'>
      <div className="display-pic">
        <Dp type='contact' src={user.dpUrl} classname='display-pic'/>
      </div>
      <div className="names">
        <p className='friend-username'>{user.username}</p>
        <p className='friend-name'>{user.name}</p>
      </div>
      <button onClick={fCheck ? removeFriendfrom : addfriend}>
        {fCheck ? 'remove friend' : 'add friend'}
      </button>
    </div>
  )
}


const AddFriend = () => {

    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        userService.getAllUsers().then(users => setUsers(users))
    }, [])

    const friends = useSelector(state => {
       return state.friends.map(friend => friend.id)
    })

    const goBack = () => {
      navigate('/')
    }

  return (
    <div>
      <div className="friends-top-bar">
      <button className='goback' onClick={goBack}><FontAwesomeIcon icon={faArrowLeft}/></button>
        <input className='search-friends'/>
      </div>
        {
        users.map(user => {
        return <FriendCard user={user} key={user.id} friend={friends.includes(user.id)} />
    })}
    </div> 
  )
}

export default AddFriend