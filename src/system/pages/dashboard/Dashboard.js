import React, { useEffect, useState } from 'react'
// import { HiCheckCircle } from 'react-icons/hi'
// import { RiLoginBoxFill } from 'react-icons/ri'
// import { FaNotesMedical } from 'react-icons/fa'
// import { BsPeopleFill } from 'react-icons/bs'
import './dashboard.css'
import Nav from '../../components/nav/Nav'
import { db } from '../../../firebase/Config'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
// import { useAuth } from '../../../contexts/AuthContext'
import noPhoto from '../../../assets/noprofile.webp'
import { MdAttachMoney, MdOutlineClose, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { HiOutlineCheck } from 'react-icons/hi'
import { IoAddCircle } from 'react-icons/io5'
import { BiCheckCircle } from 'react-icons/bi'
import { useAuth } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import greprog from '../../../assets/greenprgo.png'
import oragneNew from '../../../assets/oragneNew.png'
import { SiFuturelearn } from 'react-icons/si'



const Dashboard = ({ firestoreMembers }) => {
    const { currentUser } = useAuth()
    console.log(currentUser)

    const plansQ = collection(db, `plans`)
    const [plans] = useCollectionData(plansQ)

    return (
        <div className='dashboard'>
            <nav>
                <Nav page="dashboard" />
            </nav>
            {/* <header>
                <img alt='' className='dashboard_admin-photo' src={currentUser?.photoURL} />
                <p>{currentUser?.displayName}</p>
            </header> */}
            <main className='dashboard_content'>
                <div className=" dashboard_top-div dashboard_top-div__members">
                    <h1>Members</h1>
                    <Link className='dashbaord_top-div_link'>View list <MdOutlineKeyboardArrowDown /></Link>
                    <div className='dahboard_flex'>
                        <p>150</p>
                        <img className='dashboard_top_photo' src={greprog} alt="" />
                    </div>
                </div>
                <div className=" dashboard_top-div dashboard_top-div__New">
                    <h1>New Members</h1>
                    <div className='dahboard_flex'>
                        <p>30</p>
                        <img className='dashboard_top_photo_new' src={oragneNew} alt="" />

                    </div>
                    {/* <Link className='dashbaord_top-div_link'>View list <MdOutlineKeyboardArrowDown/></Link> */}
                </div>
                <div className=" dashboard_top-div dashboard_top-div__revenue">
                    <h1>Day Income</h1>
                    <div className='dahboard_flex'>
                        <p>1500 L.e</p>
                        <i><MdAttachMoney className="dashboard_rev_ioc" /></i>

                    </div>

                </div>
                <div className=" dashboard_top-div dashboard_top-div__moth-ico">
                    <h1>Monthly Income</h1>
                    <div className='dahboard_flex'>
                        <p>8550 L.e</p>
                        <i><SiFuturelearn className="dashboard_money_ioc " /></i>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard