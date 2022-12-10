import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import './finishProfile.css'
import Slider from './Slider'

const FinishProfile = () => {
    const [pageCounter, setPageCoutner] = useState(0)
    const { currentUser, firestoreMembers } = useAuth()
    const [isAMember, setIsAMember] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
        firestoreMembers?.forEach(fMember => {
            if (fMember.email === currentUser.email) {
                setIsAMember(true)
            }
        })
    }, [firestoreMembers])

    const movePage = () => {
        setPageCoutner(pageCounter + 1)
    }
    const backPage = () => {
        if (pageCounter <= 0) {

        } else {
            setPageCoutner(pageCounter - 1)
        }
    }

    // slider
    function showVal(val) {
        document.getElementById("valBox").innerHTML = val;
    }
    (
        <div >
            {
                isAMember ?
                    <div className='finish-profile_form'>
                        dfm
                        <form>
                            k
                            <div className="range_wrapper">
                                <input type="range" min="0" max="10" onInput={(e) => showVal(e.target.value)} onChange={(e) => showVal(e.target.value)} step="1" value="0" />
                                <div id="valBox" className="valBox">0</div>
                            </div>
                        </form>
                    </div> :
                    <div className='finish-profile_nomember-div'>
                        <Link className='finish-profile_nomember_back-link' to='/'><BiArrowBack className='finish-profile_nomember_back-ico' /></Link>
                        <p className='finish-profile_nomember-article'>We can't find your email in our database,
                            You have to visit the gym and get registered in order to complete your profile.
                        </p>
                        <p className='finish-profile_nomember-hint'>HINT!</p>
                        <p className='finish-profile_nomember-hint-content'>Use The Same Email Address  {`( ${currentUser.email} )`}</p>
                    </div>
            }
        </div>
    )
}

export default FinishProfile