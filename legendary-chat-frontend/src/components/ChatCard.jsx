import React from 'react'

export const ChatCard = ({message, mine}) => {

  const time = new Date(message.timestamp).toLocaleTimeString().split(':')

  return (
    <div className={mine ? 'message-card mine': 'message-card'}>
        <p className='message-time'>{time[0]+':'+time[1]+' '+time[2].split(' ')[1]}</p>
        <p className='message-sender'>{message.sender.username}</p>
        <p className='message-text'>{message.content}</p>
    </div>
  )
}
