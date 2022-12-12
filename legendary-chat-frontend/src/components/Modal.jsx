import React from 'react'

const Modal = (props) => {

    if(props.open === true) {
        return(
            <div className="profile-modal">
                {props.children}
            </div>  
        )
    }
    
}

export default Modal