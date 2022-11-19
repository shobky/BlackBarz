import React, { useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { HiHome, HiLogout } from 'react-icons/hi'
import { RiUserFill } from 'react-icons/ri'
import { IoSettingsSharp } from 'react-icons/io5'
import { GoSearch } from 'react-icons/go'
import './nav.css'
import { MdAdd, MdSpaceDashboard } from 'react-icons/md'
import { useAuth } from '../../../contexts/AuthContext'
import { CgGym } from 'react-icons/cg'

const Nav = ({ page }) => {
    const { logout } = useAuth()
    const [showNav, setShowNav] = useState(false)
    return (
        <>
            <IoMdMenu onClick={() => setShowNav(!showNav)}  className={showNav ? 'dashboard_nav-menu-ico__mobile__active' : 'dashboard_nav-menu-ico__mobile'} />

            <div id='dashboardNav' className={showNav ? 'dashboard_nav__active' : 'dashboard_nav'}>
                <IoMdMenu className='dashboard_nav-menu-ico' />
                <br/>
                <br/>
                <br/>

                <div className='dashboard_nav-menu-link__system'>
                    <Link to="/dashboard/add-member" className={page === 'addMember' ? "dashboard_nav_link dashboard_nav_link__active dashboard_nav_link__small" : 'dashboard_nav_link dashboard_nav_link__small'}><MdAdd /> </Link>
                    <Link to="/dashboard/find-member" className={page === 'findMember' ? 'dashboard_nav_link dashboard_nav_link__active' : 'dashboard_nav_link'}><GoSearch /></Link>
                    <Link to="/dashboard/club" className={page === 'club' ? 'dashboard_nav_link dashboard_nav_link__active' : 'dashboard_nav_link'}><CgGym /></Link>



                </div>
                <div className='dashboard_nav_menu-links__website'>
                    <Link to='/dashboard' className={page === 'dashboard' ? 'dashboard_nav_link__active dashboard_nav_link' : 'dashboard_nav_link'}><MdSpaceDashboard /></Link>
                    <Link className='dashboard_nav_link'><RiUserFill /> </Link>
                    <Link to='/' className='dashboard_nav_link'><HiHome /> </Link>
                    <Link className='dashboard_nav_link'><IoSettingsSharp /></Link>
                    <button onClick={() => logout()} className='dashboard_nav_btn'><HiLogout /></button>
                </div>
            </div></>
    )
}

export default Nav