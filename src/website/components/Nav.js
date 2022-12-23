import React, { useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './nav.css'

const Nav = () => {
    const { currentUser } = useAuth()
    const [menuOpen, setMenuOpen] = useState('closed')


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
    return (
        <div>
            {
                <HiMenuAlt3 onClick={handleMenu} className='mb-nav-ico' />
            }
            {
                <div id='mb-nav-menu' className='mb-nav-container mb-nav-menu'>
                    <div className='mb-nav_profile-info'>
                        <img alt='' className='mb-nav_profile-img' src={currentUser?.photoURL} />
                        <p className='mb-nav_profile-name'>{currentUser?.displayName.slice(0, 15)}</p>
                    </div>
                    <div className='mb-nav_links-group'>
                        <Link className='mb-nav_link__to'> <p className='mb-nav_link'>Home  <MdKeyboardArrowRight /> </p> </Link>
                        <Link className='mb-nav_link__to'> <p className='mb-nav_link'>RULES  <MdKeyboardArrowRight /></p></Link>
                        <Link to='/schedule' className='mb-nav_link__to'> <p className='mb-nav_link'>SCHEDULE <MdKeyboardArrowRight /> </p> </Link>
                        {/* <p><Link className='mb-nav_link'>Home</Link> </p> */}
                    </div>
                </div>
            }
        </div>
    )
}

export default Nav