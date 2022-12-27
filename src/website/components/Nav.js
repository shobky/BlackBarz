import React, { useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdSpaceDashboard } from 'react-icons/md'
import { AiFillHome, AiOutlineCheck } from 'react-icons/ai'
import { AiFillSchedule } from 'react-icons/ai'

import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import noPhoto from '../../assets/noprofile.webp'
import './nav.css'

const Nav = () => {
    const { currentUser, logout } = useAuth()
    const [menuOpen, setMenuOpen] = useState('closed')
    const navigate = useNavigate()


    const handleMenu = () => {
        const menu = document.getElementById('mb-nav-menu')
        if (menuOpen === 'closed') {
            menu.classList.remove('mb-nav-menu')
            menu.classList.add('mb-nav-menu__show')
            setMenuOpen('opened')

        } else {
            menu.classList.remove('mb-nav-menu__show')
            menu.classList.add('mb-nav-menu')
            setMenuOpen('closed')

        }
    }
    const handleAuthFromNav = () => {
        if (currentUser) {
            logout()
        } else {
            navigate('/login')
        }
    }
    return (
        <div>
            {
                <HiMenuAlt3 onClick={handleMenu} className='mb-nav-ico' />
            }
            {
                <div id='mb-nav-menu' className='mb-nav-container mb-nav-menu'>
                    <div onClick={() => currentUser ? navigate(`/${currentUser?.displayName ?? currentUser?.email}`) : ""} className='mb-nav_profile-info'>
                        <img alt='' className='mb-nav_profile-img' src={currentUser?.photoURL ?? noPhoto} />
                        <p className='mb-nav_profile-name'>{currentUser?.displayName?.slice(0, 15) ?? currentUser?.email}</p>
                    </div>
                    <div className='mb-nav_links-group'>
                        <Link to="/" className='mb-nav_link__to'>  <p className='mb-nav_link'> <AiFillHome />Home  <MdKeyboardArrowRight /> </p> </Link>
                        <Link to='/rules' className='mb-nav_link__to'>  <p className='mb-nav_link'> <AiOutlineCheck />RULES  <MdKeyboardArrowRight /></p></Link>
                        <Link to='/schedule' className='mb-nav_link__to'>  <p className='mb-nav_link'> <AiFillSchedule /> SCHEDULE <MdKeyboardArrowRight /> </p> </Link>
                        {/* <p><Link className='mb-nav_link'>Home</Link> </p> */}
                    </div>
                    {
                        currentUser?.email === 'shobkyy@gmail.com' ?
                            <div className='mb-nav_links-group'>
                                <Link to="/dashboard" className='mb-nav_link__to'>  <p className='mb-nav_link'> <MdSpaceDashboard />Dashboard  <MdKeyboardArrowRight /> </p> </Link>
                            </div>
                            : ""
                    }
                    <button className={currentUser ? 'nav_logout-btn' : 'nav_login-btn'} onClick={handleAuthFromNav}>{currentUser ? 'Logout' : 'Login'} </button>
                </div>
            }
        </div>
    )
}

export default Nav