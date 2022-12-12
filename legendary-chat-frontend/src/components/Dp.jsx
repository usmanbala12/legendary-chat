import React from 'react'

const Dp = ({src, type, classname}) => {

  if(src===''){
    if(type==='contact'){
      return <img src='/src/assets/user.svg' className={classname}/>
    }
    else {
      return <img src='/src/assets/users.svg' className={classname}/>
    }
  } else {
    return <img src={src} alt="dp" className={classname}/>
  }
}

export default Dp