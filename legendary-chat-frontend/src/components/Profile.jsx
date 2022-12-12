import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faArrowLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Dp from './Dp'
import profileService from '../services/userService'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Modal from './Modal'

export const Profile = () => {


  const [modal, setModal] = useState(false)
  const [menu, setMenu] = useState(false)
  const [file, setFile] = useState('')
  const [filepath, setFilepath] = useState('')

  const profile = useSelector(state => state.user)

  useEffect(() => {
    setFilepath(profile.dpUrl)
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFileChange = async e => {
    setFile(e.target.files[0])
    console.log('called onchange')
    
    setModal(!modal)
    if(dpForm) {
      dpForm.requestSubmit()
    }
  }

  

  const submitdp = async e => {
    e.preventDefault()
    console.log('called on submit')
    const formData = new FormData()
    
    formData.append('file', file)
    const dpInfo = await profileService.uploadDp(formData)
    const newProfileData = await profileService.updateProfile({...profile, dpUrl: `https://codegeek-static-server.herokuapp.com${dpInfo.filePath}`})
    dispatch(setUser(newProfileData))
    setFilepath(newProfileData.dpUrl)
  }

  const goBack = () => {
    navigate('/')
  }

  const logout = () => {
    window.localStorage.removeItem('legendaryChatUser')
    navigate('/login')
  }

  const clickFile = () => {
    if(profilePic) {
      profilePic.click()
    }
  }

  return (
    <div className='profile' onClick={() => menu === true ? setMenu(!menu) : null}>
      <button className='goback' onClick={goBack}><FontAwesomeIcon icon={faArrowLeft}/></button>
      <button className='profile-menu' onClick={() => setMenu(!menu)}><FontAwesomeIcon icon={faEllipsisVertical}/></button>
      
        <div className="profile-card">
          <div className="profile-picture">
            <Dp src={filepath} type='contact' />
            <button onClick={() => setModal(!modal)}>
            <FontAwesomeIcon icon={faCamera} />
            </button>
          </div>
            
            <div className="profile-name">
                <span className='title'>Name</span>
                <span className="name">{profile.name}</span>
            </div>
            <div className="profile-about">
                <span className='title'>About</span>
                <span className="about">hey there i'm using legendary  </span>
            </div> 
        </div>
        <Modal open={modal}>
          <div className="modal-content">
              <form onSubmit={submitdp} id='dpForm'>
                <input type="file" name="profile-pic" id="profilePic" onChange={onFileChange} />
              </form>
              <button onClick={clickFile}>
                choose image
              </button>
              <button onClick={() => setModal(!modal)}>
                cancel
              </button>
            </div>
        </Modal>
        {
          menu ? 
          <div className="profile-menu-modal">
            <div className='items'>
              <p onClick={logout}>Log out</p>
            </div> 
          </div> :
          ''
        }
          
    </div>
  )
}
