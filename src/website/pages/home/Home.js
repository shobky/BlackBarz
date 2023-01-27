import React, { useEffect, useState } from 'react'
import './home.css'
import grid from '../../../assets/grid.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import Nav from '../../components/Nav'
import { TbTrafficCone } from 'react-icons/tb'
import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import workouts from '../../../assets/workouts.jpg'
const Home = () => {
    const { currentUser, buffer, member } = useAuth()

    const [traffic, setTraffic] = useState(0)

    useEffect(() => {
        const getTraffic = async () => {
            const coll = collection(db, "members");
            const query_ = query(coll, where('checked', '==', true));
            const snapshot = await getCountFromServer(query_);
            setTraffic(snapshot.data().count);
        }
        getTraffic()
    }, [])

    return (
        <>
            <div className='home_section-1'>
                {buffer && <div className='auth_buffering'></div>}

                <Nav active={'home'} />
                <header>
                    {/* <img alt='' src={logo} className="home_header_logo-img" /> */}
                    {/* <h1 className='home_header_logo'> FX<span>3</span></h1> */}
                </header>
                <main className='home_section-1_main'>
                    <img className='home_section-1_main-grid' src={grid} alt="" />
                    <img className='home_section-1_main-grid-bottom' src={grid} alt="" />
                    <ul className='home_section-1_main-list'>
                        <li className='home_section-1_slogan-txt'>FIT. FIGHT. FLOW. <span>FX3</span></li>
                        <p className={traffic > 30 ? 'home_trafic_high' : traffic < 15 ? 'home_trafic_low' : 'home_trafic_ok'}><TbTrafficCone className='home_cone-ico' /> {traffic > 30 ? 'High' : traffic < 15 ? 'Low' : 'Moderate'}</p>
                        {
                           currentUser &&  !member?.finished ? (
                                <p className="home_welcome-msg">
                                    <Link to="/finish-profile" className="finish-profile-link">
                                        FINISH PROFILE
                                    </Link>
                                </p>
                            ) : !currentUser ? (
                                <>
                                    <p className="login-link-paragraph">
                                        <Link to="/signup" className="login-link">
                                            REGISTER
                                        </Link>
                                    </p>
                                </>
                            ) : ""
                        }

                    </ul>
                </main>

            </div>
        </>
    )
}

export default Home