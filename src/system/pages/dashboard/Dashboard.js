import React, { useEffect, useState } from 'react'
import './dashboard.css'
import Nav from '../../components/nav/Nav'
import { MdAttachMoney, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useAuth } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import greprog from '../../../assets/greenprgo.png'
import oragneNew from '../../../assets/oragneNew.png'
import { SiFuturelearn } from 'react-icons/si'
import { collection, doc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../../firebase/Config'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { TbLetterC } from 'react-icons/tb'
import { CgGym } from 'react-icons/cg'



const Dashboard = ({ firestoreMembers }) => {
    const { onSetVarient, city } = useAuth()
    const [thisMonth, setTisMonth] = useState()

    const [dayTotal, setDayTotal] = useState(0)

    const dayPaymentQ = collection(db, `dayPayments${city}`)
    const [dayPayments] = useCollectionData(dayPaymentQ)



    useEffect(() => {
        const countDayTotal = () => {
            let allPrices = [];
            dayPayments?.map((payment) =>
                allPrices.push(payment.price)
            )
            setDayTotal(allPrices.reduce((a, b) => a + b, 0))
        }
        countDayTotal()
    }, [dayPayments])

    useEffect(() => {
        const getdate = () => {
            const currentdate = new Date();
            setTisMonth(currentdate.getMonth() + 1)
        }
        getdate()
        return
    }, [])


    return (
        <div className='dashboard'>
            <nav>
                <Nav page="dashboard" />
            </nav>
            <main className='dashboard_content'>
                <div className=" dashboard_top-div dashboard_top-div__members">
                    <h1>Members</h1>
                    <Link className='dashbaord_top-div_link'>View list <MdOutlineKeyboardArrowDown /></Link>
                    <div className='dahboard_flex'>
                        <p>{firestoreMembers?.length}</p>
                        <img className='dashboard_top_photo' src={greprog} alt="" />
                    </div>
                </div>
                <div className=" dashboard_top-div dashboard_top-div__New">
                    <h1>New Members</h1>
                    <div className='dahboard_flex'>
                        <div>
                            <p>{
                                firestoreMembers?.filter((fmember) => {
                                    if ((fmember.memberShipDate.month >= thisMonth) && fmember.memberShipDate.msYear === 2022) {
                                        return fmember
                                    }
                                }).length
                            }</p>
                            <p>This Month</p>

                        </div>
                        <img className='dashboard_top_photo_new' src={oragneNew} alt="" />

                    </div>
                    {/* <Link className='dashbaord_top-div_link'>View list <MdOutlineKeyboardArrowDown/></Link> */}
                </div>
                <div className=" dashboard_top-div dashboard_top-div__revenue">
                    <h1>Day Income</h1>
                    <div className='dahboard_flex'>
                        <div>
                            <p>{dayTotal} L.e</p>
                        </div>

                        <i><MdAttachMoney className="dashboard_rev_ioc" /></i>

                    </div>

                </div>
                <div className=" dashboard_top-div dashboard_top-div__moth-ico">
                    <h1>Monthly Income</h1>
                    <div className='dahboard_flex'>
                        <p>soon</p>
                        <i><SiFuturelearn className="dashboard_money_ioc " /></i>

                    </div>
                </div>

            </main>
            <div className='dashboard_med_add-collec'>
                <Link className='dashboard_med-link-varient' onClick={() => onSetVarient('plans')} to="/dashboard/add-varient"><AiTwotoneCalendar className='dashboard_var-ico'/>Add Plans</Link>
                <Link className='dashboard_med-link-varient' onClick={() => onSetVarient('trainers')} to="/dashboard/add-varient"><TbLetterC className='dashboard_var-ico'/>Add Trainers</Link>
                <Link className='dashboard_med-link-varient' onClick={() => onSetVarient('workouts')} to="/dashboard/add-varient"><CgGym className='dashboard_var-ico'/>Add Workouts</Link>
            </div>
        </div>
    )
}

export default Dashboard