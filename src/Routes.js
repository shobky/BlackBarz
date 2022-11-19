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
            <Route path="/dashboard" element={<Dashboard firestoreMembers={firestoreMembers} />} />
            <Route path="/dashboard/add-member" element={<AddMember />} />
            <Route path="/dashboard/find-member" element={<FindMember firestoreMembers={firestoreMembers} />} />
            <Route path="/dashboard/club" element={<FindMember
                isClub={true}
                firestoreMembers={firestoreMembers?.filter((member) => {
                    if (member.checked === true) {
                        return member
                    } else {

                    }
                })}
            />} />



            {
                firestoreMembers?.map((member) => (
                    <Route path={`/dashboard/find-member/${member.email}`} element={<Member member={member} />} />
                ))
            }
        </Routes>
    )
}

export default AllRoutes