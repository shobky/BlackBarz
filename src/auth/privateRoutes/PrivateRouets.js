import React from 'react'
import { Outlet } from 'react-router'
import { auth } from '../../firebase/Config'
import Auth from '../Auth'

const PrivateRouets = () => {
    return (
        <div>
            {
                auth.currentUser.uid === 'OqWEn6fJcZNgyLEskceO6RCa1qV2' || auth.currentUser.uid === 'Ac0cCKWKxUWfaGe2HcHL1LX2TWD2'  || auth.currentUser.uid === '14ntzuPO1safPwDfmKDrTp2CcQ63' ? <Outlet /> : <Auth />
            }
        </div>
    )
}

export default PrivateRouets