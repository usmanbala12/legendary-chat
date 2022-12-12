import React from 'react'
import Dp from './Dp'

export const RoomCard = ({room}) => {

  return (
    <div className='room-card'>
            <div className="name-message">
                <Dp src={room.dpUrl} type='contact' />
                <div className="just-flex">
                    <span className="d-name">
                        {room.name}
                    </span>
                    <span className="last-message">
                    </span>
                </div>
            </div>
            <div className="time-count">
                <span className="last-message-time">
                </span>
            </div>
    </div>
  )
}
