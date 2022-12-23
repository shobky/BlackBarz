import React from 'react'
import './home.css'
import grid from '../../../assets/grid.png'
import { Link } from 'react-router-dom'
import { RiUserFill } from 'react-icons/ri'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdSpaceDashboard } from 'react-icons/md'
import { useAuth } from '../../../contexts/AuthContext'
import logo from '../../../assets/logo.png'
import Nav from '../../components/Nav'
import { GrSchedule } from 'react-icons/gr'
import { AiFillSchedule } from 'react-icons/ai'

const Home = () => {
    const { currentUser } = useAuth()


    return (
        <div className='home_section-1'>
            <nav className='nav-container'>
                <Link className='nav_link'><RiUserFill /></Link>
                {/* <Link to='/dashboard' className='nav_link'><MdSpaceDashboard /></Link> */}
            </nav>
            <Nav />

            <Link className='home_dashbalinkhfods' to='/dashboard'> <MdSpaceDashboard className='nav_menu-ico' /></Link>
            <header>
                <h1 className='home_header_logo'> <img src={logo} className="home_header_logo" alt="" />FX<span>3</span></h1>
                <p className='home_header-slogan'>Health Fitnes Club</p>
            </header>
            <main className='home_section-1_main'>
                <img className='home_section-1_main-grid' src={grid} alt="" />
                <img className='home_section-1_main-grid-bottom' src={grid} alt="" />
                <ul className='home_section-1_main-list'>
                    <li>FIT. FIGHT. FLOW. <span>FX3</span></li>
                    {
                        currentUser ?
                            <p className='home_welcome-msg'>
                                Welcome,  <span>  {currentUser.displayName}</span>
                                <br />
                                <br />
                                <Link to="/finish-profile" className='login-link'>
                                    FINISH PROFILE</Link>
                                <br />
                                <br />

                                <Link style={{display:"flex", alignItems:"center", width:"fit-content", border:'none'}} to="/schedule" className='login-link'>
                                    <AiFillSchedule style={{ color: "white", fontSize: "30px" }} /></Link>

                            </p>
                            :
                            <>
                                <p className='home_section-1_main-login-txt'>Join to monitor your progress</p>

                                <p className='login-link-paragraph'>
                                    <Link to='/auth' className='login-link'>
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