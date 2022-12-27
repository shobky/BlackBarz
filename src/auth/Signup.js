import React, { useRef, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './auth.css'

const Singup = () => {
    const { login, EmailAndPasswordSignup, authError, buffer } = useAuth()
    const [show, setShow] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const submitAuth = (e) => {
        e.preventDefault()
        EmailAndPasswordSignup(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <div className='regi'>
            {buffer && <div className='auth_buffering'></div>}
            <h1 onClick={() => navigate('/')} className='regi_logo'>FX<span>3</span></h1>
            {
                authError && <p className='auth_error'>{authError}</p>
            }
            <form onSubmit={submitAuth} autoCapitalize='none' autoComplete='on' className='auth_form'>
                <input type='email' ref={emailRef} placeholder='email' className='auth_form-input' />
                <div className='auth_password'>
                    <input type={show ? 'text' : 'password'} ref={passwordRef} placeholder='password' className='auth_form-input' />
                    <button type='button' className='auth_password-show-ico'>
                        {
                            show ? <AiOutlineEye onClick={() => setShow(false)} /> :
                                <AiOutlineEyeInvisible onClick={() => setShow(true)} />
                        }
                    </button>
                </div>
            </form>
            <div className='regi_btn-group'>
                <button type='button' onClick={() => EmailAndPasswordSignup(emailRef.current.value, passwordRef.current.value)} className='regi_continue_with_password-btn'>
                    Sign Up
                </button>
                <button onClick={() => login()} className='regi_continue_with_google-btn'>
                    <FcGoogle className='regi_btn_g-ico' /> Continue with Google
                </button>
                <Link to='/login' className='auth_another-page-btn'>Login Instead <AiOutlineArrowRight /></Link>
            </div>
        </div>
    )
}

export default Singup