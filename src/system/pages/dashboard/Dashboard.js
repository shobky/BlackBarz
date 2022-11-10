import React from 'react'
// import { HiCheckCircle } from 'react-icons/hi'
// import { RiLoginBoxFill } from 'react-icons/ri'
// import { FaNotesMedical } from 'react-icons/fa'
// import { BsPeopleFill } from 'react-icons/bs'
import './dashboard.css'
import Nav from '../../components/nav/Nav'
// import { useAuth } from '../../../contexts/AuthContext'
const Dashboard = () => {
    // const { currentUser } = useAuth()
    return (
        <div className='dashboard'>
            <nav>
                <Nav page="dashboard" />
            </nav>
            <div id='dashboardContent' className='dashboard_content'>
                <main>
                    <div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard