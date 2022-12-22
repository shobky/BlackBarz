import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import logo from '../../../assets/logo.png'
import './finishProfile.css'

const FinishProfile = () => {
    const { currentUser, firestoreMembers } = useAuth()
    const [registerd, setRegistered] = useState(false)
    useEffect(() => {
        firestoreMembers?.map((member) => {
            if (member.email === currentUser.email) {
                setRegistered(true)
            }
        })
    })

    return (
        <div>
            {
                registerd ?
                    <div>
                        hi
                    </div>
                    :
                    <div className='finish-profile_nomember-div'>
                        <Link className='finish-profile_nomember_back-link' to='/'><BiArrowBack className='finish-profile_nomember_back-ico' /></Link>
                        <p className='finish-profile_oops'>oops</p>
                        <p className='finish-profile_nomember-article'>We can't find your email in our database.
                            <br />
                            <span>
                                You have to visit the gym and get registered in order to complete your profile.
                            </span>
                        </p>
                        <p className='finish-profile_nomember-hint'>HINT!</p>
                        <p className='finish-profile_nomember-hint-content'>Use The Same Email Address  {`( ${currentUser.email} )`}</p>
                        <img alt="" src={logo} className="finish-profile_logo"/>
                    </div>
            }
        </div>
    )
}

export default FinishProfile