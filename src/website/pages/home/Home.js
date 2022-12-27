import React from 'react'
import './home.css'
import grid from '../../../assets/grid.png'
import { Link } from 'react-router-dom'
import { RiUserFill } from 'react-icons/ri'
import { IoSettingsSharp } from 'react-icons/io5'
import { useAuth } from '../../../contexts/AuthContext'
import logo from '../../../assets/logo.png'
import Nav from '../../components/Nav'
import { GrSchedule } from 'react-icons/gr'

const Home = () => {
    const { currentUser, buffer } = useAuth()


    return (
        <div className='home_section-1'>
            {buffer && <div className='auth_buffering'></div>}

            <Nav />
            <header>
                {/* <img alt='' src={logo} className="home_header_logo-img" /> */}
                <h1 className='home_header_logo'> FX<span>3</span></h1>
            </header>
            <main className='home_section-1_main'>
                <img className='home_section-1_main-grid' src={grid} alt="" />
                <img className='home_section-1_main-grid-bottom' src={grid} alt="" />
                <ul className='home_section-1_main-list'>
                    <li>FIT. FIGHT. FLOW. <span>FX3</span></li>
                    {
                        currentUser ?
                            <p className='home_welcome-msg'>
                                <Link to="/finish-profile" className='finish-profile-link'>
                                    FINISH PROFILE</Link>
                            </p>
                            :
                            <>
                                <p className='login-link-paragraph'>
                                    <Link to='/signup' className='login-link'>
                                        REGISTER</Link>
                                </p>
                            </>
                    }

                </ul>
            </main>
        </div>
    )
}

export default Home