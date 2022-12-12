import React from 'react'
import $ from 'jquery';
import { useState } from 'react'
import { ChatCard } from './ChatCard'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Dp from './Dp';
import { useEffect } from 'react';


export const ChatScreen = ({socket}) => {

    const [message, setMessage] = useState('')
    const [roomMessages, setRoomMessages] = useState([])

    const navigate = useNavigate()
    const id = useParams().id

    const user = useSelector(state => {
        return state.user
    })

    const friend = useSelector(state => {
        console.log(state.friends.find(item => item.id === id))
        return state.friends.find(friend => friend.id === id)
    })

    const roomid = () => {
        const firstSub = id.substring(12,24)
        const secondSub = user.id.substring(12, 24)
        let roomId;
        if(firstSub > secondSub) {
            roomId = firstSub + secondSub
        } else {
            roomId = secondSub + firstSub
        }
        return roomId
    }

    socket.on('messages', (res) => {
        setRoomMessages(res)
    })
    
    useEffect(() => {
        socket.emit('joinRoom', {roomId: roomid(), type: 'private', user: user})
    }, [])

    autosize();
    function autosize(){
        var text = $('.autosize');

        text.each(function(){
            $(this).attr('rows',1);
            resize($(this));
        });

        text.on('input', function(){
            resize($(this));
        });
        
        function resize ($text) {
            $text.css('height', 'auto');
            $text.css('height', $text[0].scrollHeight+'px');
        }
    }

    const submitMessage = (e) => {
        e.preventDefault()
        const res = {
            message,
            user: user.id,
            room: roomid(),
            type: 'private'
        }

        socket.emit('chatMessage', res)
        setMessage('')
    }

    const goBack = () => {
        navigate('/')
    }

    socket.on('message', (msg) => {
        const parsed = JSON.parse(msg)
        setRoomMessages(roomMessages.concat(parsed))
        console.log(msg)
        messages.scrollTop = messages.scrollHeight
    })

    let messageCards;

    if(roomMessages) {
        messageCards = roomMessages.map(message => {
            return <ChatCard message={message} key={message.id} mine={user.id === message.sender.id} />
        })
    }
   

  return (
    <div className='chat-screen'>
        <div className='room-header'>
                <button className='gobackroom' onClick={goBack}><FontAwesomeIcon icon={faArrowLeft}/></button>
                <Dp src={friend.dpUrl} type='contact' classname='display-pic' />
                <h3 className='room-title'>{friend.name}</h3>
        </div>
        <div className='messages' id='messages'>
            {messageCards}
        </div>
        <div className='input-group'>
            <form onSubmit={submitMessage}>
            <textarea className='autosize'
            onChange={({target}) => setMessage(target.value)}
            value={message}
            >
            </textarea>
            <button><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
        </div>
    </div>
  )
}
