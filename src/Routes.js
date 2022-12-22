import { collection } from 'firebase/firestore'
import React, { Suspense } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Route, Routes } from 'react-router'
import Auth from './auth/Auth'
import Loading from './components/Loading'
import { useAuth } from './contexts/AuthContext'
import { db } from './firebase/Config'
import AddMember from './system/pages/addMember/AddMember'
import AddVarientsForm from './system/pages/AddVarients/AddVarientsForm'
import Dashboard from './system/pages/dashboard/Dashboard'
import FindMember from './system/pages/findMember/FindMember'
import FindTrainer from './system/pages/findTrainer/FindTrainer'
import Member from './system/pages/member/Member'
const FinishProfile = React.lazy(() => import("./website/pages/finishProfile/FinishProfile"))
const Home = React.lazy(() => import("./website/pages/home/Home"))
const Schedule = React.lazy(() => import('./website/pages/trainerTable/Schedule'))



const AllRoutes = () => {
    const { firestoreMembers, city } = useAuth()
    const dayChekinQuery = collection(db, `dayCheckin${city}`)
    const [dayChikinMembers] = useCollectionData(dayChekinQuery)
    return (
        <Routes>
            <Route path="/" element={<Suspense fallback={<Loading />}>
                <Home />
            </Suspense>} />
            <Route path='auth' element={<Auth />} />

            <Route path="/dashboard" element={<Dashboard firestoreMembers={firestoreMembers} />} />
            <Route path="/dashboard/add-member" element={<AddMember />} />
            <Route path="/dashboard/find-member" element={<FindMember firestoreMembers={firestoreMembers} />} />
            <Route path="/dashboard/add-varient" element={<AddVarientsForm />} />
            <Route path="/dashboard/trainers" element={<FindTrainer />} />



            <Route path="/dashboard/club" element={<FindMember
                isClub={true}
                firestoreMembers={dayChikinMembers}
            />} />




            {
                firestoreMembers?.map((member) => (
                    <Route key={member.email} path={`/dashboard/find-member/${member.email}`} element={<Member member={member} />} />
                ))
            }


            <Route path="/finish-profile" element={<Suspense fallback={<Loading />}>
                <FinishProfile firestoreMembers={firestoreMembers} />
            </Suspense>} />
            <Route path="/schedule" element={<Suspense fallback={<Loading />}>
                <Schedule />
            </Suspense>} />
        </Routes>
    )
}

export default AllRoutes