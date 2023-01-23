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
import Signup from './auth/Signup'
import Rules from './website/pages/rules/Rules'
import UserChangeProfile from './website/pages/profile/UserChangeProfile'
import Payments from './system/pages/payments/Payments'
import AddDayWorkouts from './system/pages/addDayWorkots/AddDayWorkouts'
import UserView from './website/pages/dayWorkouts/UserView'
import UserViewLoss from './website/pages/dayWorkouts/UserViewLoss'
const FinishProfile = React.lazy(() => import("./website/pages/finishProfile/FinishProfile"))
const Home = React.lazy(() => import("./website/pages/home/Home"))
const Schedule = React.lazy(() => import('./website/pages/trainerTable/Schedule'))

const AllRoutes = () => {
    const { firestoreMembers, city, currentUser } = useAuth()
    const dayChekinQuery = collection(db, `dayCheckin${city}`)
    const [dayChikinMembers] = useCollectionData(dayChekinQuery)
    return (
        <Routes>

            {/* PUPLIC */}
            <Route path="/" element={<Suspense fallback={<Loading />}>
                <Home />
            </Suspense>} />
            <Route path='login' element={<Auth />} />
            <Route path='Signup' element={<Signup />} />

            {/* ADMIN */}

            <Route path="/dashboard" element={<Dashboard firestoreMembers={firestoreMembers} />} />
            <Route path="/dashboard/add-day-workouts" element={<AddDayWorkouts />} />
            <Route path="/dashboard/add-member" element={<AddMember />} />
            <Route path="/dashboard/find-member" element={<FindMember firestoreMembers={firestoreMembers} />} />
            <Route path="/dashboard/add-varient" element={<AddVarientsForm />} />
            <Route path="/dashboard/trainers" element={<FindTrainer />} />
            <Route path="/dashboard/payments" element={<Payments />} />

            {
                firestoreMembers?.map((member) => (
                    <Route key={member.email} path={`/${member.email}`} element={<Member member={member} />} />
                ))
            }

            {/* USER */}
            <Route path="/finish-profile" element={<Suspense fallback={<Loading />}>
                <FinishProfile firestoreMembers={firestoreMembers} />
            </Suspense>} />
            <Route path="/schedule" element={<Suspense fallback={<Loading />}>
                <Schedule />
            </Suspense>} />
            <Route path="/rules" element={<Suspense fallback={<Loading />}>
                <Rules />
            </Suspense>} />
            <Route path="/workouts-gain" element={<Suspense fallback={<Loading />}>
                <UserView />
            </Suspense>} />
            <Route path="/workouts-loss" element={<Suspense fallback={<Loading />}>
                <UserViewLoss />
            </Suspense>} />
            <Route path={`/${currentUser?.displayName ?? currentUser?.email}`} element={<Suspense fallback={<Loading />}>
                <UserChangeProfile />
            </Suspense>} />
        </Routes>
    )
}

export default AllRoutes