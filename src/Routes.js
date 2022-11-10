import React from 'react'
import { Route, Routes } from 'react-router'
import { useAuth } from './contexts/AuthContext'
import AddMember from './system/pages/addMember/AddMember'
import Dashboard from './system/pages/dashboard/Dashboard'
import FindMember from './system/pages/findMember/FindMember'
import Member from './system/pages/member/Member'
import Home from './website/pages/Home'


const AllRoutes = () => {
    const { firestoreMembers } = useAuth()
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add-member" element={<AddMember />} />
            <Route path="/dashboard/find-member" element={<FindMember />} />

            {
                firestoreMembers?.map((member) => (
                    <Route path={`/dashboard/members/${member.email}`} element={<Member member={member} />} />
                ))
            }
        </Routes>
    )
}

export default AllRoutes