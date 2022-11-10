import React from 'react'
import './home.css'
import grid from '../../assets/grid.png'
import { Link } from 'react-router-dom'
import { HiHome, HiMenuAlt3 } from 'react-icons/hi'
import { RiUserFill } from 'react-icons/ri'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdSpaceDashboard } from 'react-icons/md'

import { useAuth } from '../../contexts/AuthContext'

import { FcGoogle } from 'react-icons/fc'




const Home = () => {
    const { login, currentUser } = useAuth()


    return (
        <div className='home_section-1'>
            <nav className='nav-container'>
                <Link className='nav_link'><IoSettingsSharp /></Link>
                {/* <Link className='nav_link'><HiHome /></Link>[] */}
                <Link className='nav_link'><RiUserFill /></Link>
                <Link to='/dashboard' className='nav_link'><MdSpaceDashboard /></Link>
            </nav>
            <Link to='/dashboard'> <HiMenuAlt3 className='nav_menu-ico' /></Link>
            <header>
                <h1 className='home_header_logo'>BLACK <span>BARZ</span></h1>
                <p className='home_header-slogan'>Health Fitnes Club</p>
            </header>
            <main className='home_section-1_main'>
                <img className='home_section-1_main-grid' src={grid} alt="" />
                <img className='home_section-1_main-grid-bottom' src={grid} alt="" />
                <ul className='home_section-1_main-list'>
                    <li>Build Your Body <span>Strong</span></li>
                    {
                        currentUser ?
                            <p className='home_welcome-msg'>
                                Welcome,  <span>  {currentUser.displayName}</span>
                                <br />
                                <br />
                                <Link className='login-link'>
                                    Compelete Profile</Link>
                            </p>
                            :
                            <>
                                <p className='home_section-1_main-login-txt'>Join to monitor your progress</p>

                                <p onClick={() => login()} className='login-link-paragraph'>
                                    <Link className='login-link'>
                                        <FcGoogle className="home_login-btn-google-ico" />
                                        SIGN IN</Link>
                                </p>
                            </>
                    }

                </ul>
            </main>

        </div>
    )
}

export default Home