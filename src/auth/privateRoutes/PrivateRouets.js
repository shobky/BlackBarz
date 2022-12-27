import React from 'react'
import { Outlet } from 'react-router'
import { auth } from '../../firebase/Config'
import Auth from '../Auth'

const PrivateRouets = () => {
    return (
        <div>
            {
                auth.currentUser.email === 'shobkyy@gmail.com' ? <Outlet /> : <Auth />
            }
        </div>
    )
}

export default PrivateRouets