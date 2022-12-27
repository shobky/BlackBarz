import React, { useRef, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './auth.css'

const Auth = () => {
  const { login, EmailAndPasswordLogin, authError, buffer } = useAuth()
  const [show, setShow] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()


  const submitAuth = (e) => {
    e.preventDefault()
    EmailAndPasswordLogin(emailRef.current.value, passwordRef.current.value)
  }


  return (
    <div className='regi'>
      {buffer && <div className='auth_buffering'></div>}
      <p className='regi_txt'>Welcome Back ! </p>
      {
        authError && <p className='auth_error'>{authError}</p>
      }
      <form onSubmit={submitAuth} autoCapitalize='none' autoComplete='on' className='auth_form'>
        <input ref={emailRef} type='email' placeholder='email' className='auth_form-input' />
        <div className='auth_password'>
          <input type={show ? 'text' : 'password'} ref={passwordRef} placeholder='password' className='auth_form-input' />
          <button type='button' className='auth_password-show-ico'>
            {
              show ? <AiOutlineEye onClick={() => setShow(false)} /> :
                <AiOutlineEyeInvisible onClick={() => setShow(true)} />
            }
          </button>
        </div>
        <p className='auth_forget-pass'>Forget Password?</p>
      </form>
      <div className='regi_btn-group'>
        <button onClick={() => EmailAndPasswordLogin(emailRef.current.value, passwordRef.current.value)} className='regi_continue_with_password-btn'>
          Sign In
        </button>
        <button onClick={() => login()} className='regi_continue_with_google-btn'>
          <FcGoogle className='regi_btn_g-ico' /> Continue with Google
        </button>
        <Link to='/signup' className='auth_another-page-btn'>Signup Instead <AiOutlineArrowRight /></Link>
      </div>
    </div>
  )
}

export default Auth