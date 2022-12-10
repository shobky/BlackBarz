import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

const MemberRoute = () => {
    const { currentUser } = useAuth()

    return (
        <div>
            {
                currentUser?.email ? <Outlet /> : <Navigate to='/dashboard' />
            }
        </div>
    )
}

export default MemberRoute