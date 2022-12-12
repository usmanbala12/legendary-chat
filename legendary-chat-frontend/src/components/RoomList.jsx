import { faClose, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RoomCard } from './RoomCard'
import Modal from './Modal'

export const RoomList = () => {

    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    const friends = useSelector(state => {
        console.log(state)
        return state.friends
    })

    let roomCards;

    if(friends) {
        console.log(friends)
        roomCards = friends.map(item => {
           return(
            <Link to={`rooms/${item.id}`} key={item.id}>
                <RoomCard room={item} />
            </Link>
        )
        })
    }

    const addChat = () => {
        navigate('addfriends')
    }

  return (
    <div className='room-list'>
        <div className="top-bar">
            <div className="name-icon">
                <span className="app-name">
                    Legendary
                </span>
                <div className="search-profile">
                    <FontAwesomeIcon icon={faSearch} />
                   <Link to={'profile'}><FontAwesomeIcon icon={faUser} /></Link> 
                </div>
            </div>
            <div className="section-title">
                <span>
                    {/* CHATS(100) */}
                </span>
            </div>
        </div>
        <div className="rooms">
            {roomCards}
        </div>
        <div className="add-chat" onClick={() => setModal(!modal)}>
            <FontAwesomeIcon icon={faPlus}/>
        </div>
        <Modal open={modal}>
          <div className="addchat-modal">
              <p onClick={addChat}>New chat</p>
              <button onClick={() => setModal(!modal)}>
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
        </Modal>
    </div>
  )
}
