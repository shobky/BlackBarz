import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../contexts/AuthContext'
import './auth.css'

const Auth = () => {
  const { login } = useAuth()
  return (
    <div className='regi'>
      <h1 className='regi_logo'>FX3</h1>
      <p className='regi_txt'>Welcome to FX3, Create an account and track your progress along with other features. </p>
      <button onClick={() => login()} className='regi_continue_with_google-btn'>
         <FcGoogle className='regi_btn_g-ico'/> Continue with google
      </button>
    </div>
  )
}

export default Auth