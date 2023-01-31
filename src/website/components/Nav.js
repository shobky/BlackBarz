import React, { useEffect } from 'react'
import './nav.css'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { auth } from '../../firebase/Config'
import { useState } from 'react'
import { RiArrowDropRightLine, RiLoginCircleFill } from 'react-icons/ri'
import { signOut } from 'firebase/auth'
import { useAuth } from '../../contexts/AuthContext'

const Nav = ({ active }) => {

    const { logout, currentUser } = useAuth()

    const [navOpen, setnavOpen] = useState(false)

    const activeNavMb = () => {
        if (!navOpen) {
            setnavOpen(true)
            document.getElementById('navMb').classList.add('nav_links-group__active')
        } else {
            document.getElementById('navMb').classList.remove('nav_links-group__active')
            setnavOpen(false)
        }
    }

    return (
        <nav className='navigation-container'>
            <div className='nav_header'>
                <p className='nav_name'>FX3</p>
                {
                    window.innerWidth < 800 ?
                        <button type='button' onClick={activeNavMb}
                            className='nav_mobile-ico_btn'>
                            {auth?.currentUser?.photoURL ?
                                <img src={auth?.currentUser?.photoURL}
                                    className='nav_userimg-link' alt="" />
                                : <CgProfile style={{ color: "white", fontSize: "20px" }} />}
                        </button> : ""
                }
            </div>

            <div id='navMb' className='nav_links-group__inActive nav_links-pc'>
                {
                    currentUser?.uid === 'Ac0cCKWKxUWfaGe2HcHL1LX2TWD2' || currentUser?.uid === 'OqWEn6fJcZNgyLEskceO6RCa1qV2' || auth.currentUser.uid === '14ntzuPO1safPwDfmKDrTp2CcQ63' ?
                        <div className='mb-nav_links-group'>
                            <Link to="/dashboard" className='nav_link'> Dashboard  <RiArrowDropRightLine className='nav_arr-ico' /> </Link>
                            <br className='disnone-pc' />

                        </div>
                        : ""
                }
                <Link to='/' className={active === 'home' ? 'nav_link__active' : "nav_link "}>Home <RiArrowDropRightLine className='nav_arr-ico' /></Link>
                <Link to='/rules' className={active === 'rules' ? 'nav_link__active' : "nav_link "}>Rules <RiArrowDropRightLine className='nav_arr-ico' /></Link>
                <Link to='/schedule' className={active === 'schedule' ? 'nav_link__active' : "nav_link "}>Sehedule <RiArrowDropRightLine className='nav_arr-ico' /></Link>
                <Link to={`/${currentUser?.displayName ?? currentUser?.email}`} className='nav_link'>Edit profile <RiArrowDropRightLine className='nav_arr-ico' /></Link>

                {window.innerWidth < 800 &&
                    <>
                        <br />
                        <Link className={'nav_link-static'}>Day workouts </Link>
                        <div style={{ margin: '0 5px' }}>
                            <Link to='/workouts-gain' className={active === 'gain' ? 'nav_link__active' : "nav_link "}>Gain <RiArrowDropRightLine className='nav_arr-ico' /></Link>
                            <Link to='/workouts-loss' className={active === 'loss' ? 'nav_link__active' : "nav_link "}>Loss <RiArrowDropRightLine className='nav_arr-ico' /></Link>
                        </div>
                    </>
                }



                {
                    !auth?.currentUser ?
                        <Link to='/login' className='nav_login-link'>Login <RiLoginCircleFill /></Link>
                        :
                        <button onClick={() => logout()} className='nav_logout-btn'>Logout <RiLoginCircleFill /></button>

                }
                {/* <Link to='/auth' className='nav_link nav_link_ico'><CgProfile /></Link> */}
            </div>



        </nav>
    )
}

export default Nav