import React, { useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { HiHome, HiLogout } from 'react-icons/hi'
import { RiUserFill } from 'react-icons/ri'
import { GoSearch } from 'react-icons/go'
import './nav.css'
import { MdAdd, MdSpaceDashboard } from 'react-icons/md'
import { useAuth } from '../../../contexts/AuthContext'
import { BsFileEarmarkSpreadsheetFill } from 'react-icons/bs'


const Nav = ({ page }) => {
    const { logout, city, handleCity } = useAuth()
    const [showNav, setShowNav] = useState(false)
    return (
        <>
            <IoMdMenu onClick={() => setShowNav(!showNav)} className={showNav ? 'dashboard_nav-menu-ico__mobile__active' : 'dashboard_nav-menu-ico__mobile'} />

            <div id='dashboardNav' className={showNav ? 'dashboard_nav__active' : 'dashboard_nav'}>
                <IoMdMenu className='dashboard_nav-menu-ico' />
                <button onDoubleClick={() => handleCity()} className={city === 'PS' ? 'nav_switch-places' : 'nav_seitch-places-PF'}>{city}</button>

                <br />

                <div className='dashboard_nav-menu-link__system'>
                    <Link to="/dashboard/add-member" className={page === 'addMember' ? "dashboard_nav_link dashboard_nav_link__active dashboard_nav_link__small" : 'dashboard_nav_link dashboard_nav_link__small'}><MdAdd /> </Link>
                    <Link to="/dashboard/find-member" className={page === 'findMember' ? 'dashboard_nav_link dashboard_nav_link__active' : 'dashboard_nav_link'}><GoSearch /></Link>
                    <Link to="/dashboard/payments" className={page === 'payments' ? 'dashboard_nav_link dashboard_nav_link__active' : 'dashboard_nav_link'}><BsFileEarmarkSpreadsheetFill /></Link>
                    {/* <Link to="/dashboard/trainers" className={page === 'findTrainer' ? 'dashboard_nav_link dashboard_nav_link__active' : 'dashboard_nav_link'}><TbLetterC /></Link> */}
                </div>
                <div className='dashboard_nav_menu-links__website'>
                    <Link to='/dashboard' className={page === 'dashboard' ? 'dashboard_nav_link__active dashboard_nav_link' : 'dashboard_nav_link'}><MdSpaceDashboard /></Link>
                    <Link to='/' className='dashboard_nav_link'><HiHome /> </Link>
                    <button onClick={() => logout()} className='dashboard_nav_btn'><HiLogout /></button>
                </div>
            </div></>
    )
}

export default Nav