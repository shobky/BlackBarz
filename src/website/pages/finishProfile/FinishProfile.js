import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import logo from '../../../assets/logo.png'
import './finishProfile.css'
import TextField from '@mui/material/TextField';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'


const FinishProfile = () => {
    const { currentUser, firestoreMembers } = useAuth()
    const weightRef = useRef()
    const heightyRef = useRef()
    const injuryRef = useRef()
    const navigate = useNavigate('/')


    const [registerd, setRegistered] = useState(false)
    const [name, setName] = useState(currentUser?.displayName ?? '');
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [injury, setInjury] = useState();
    const [gender, setGender] = useState('female');

    useEffect(() => {
        firestoreMembers?.map((member) => {
            if (member.email === currentUser.email) {
                setRegistered(true)
            }
        })
    })

    const handleSubmitProfile = (e) => {
        e.preventDefault()
        updateDoc(doc(db, `members/${currentUser?.email}`), {
            name,
            weight,
            height,
            gender,
            injury: injury ?? '',
            finished: true
        }).then(() => {
            navigate('/')
        })
    }


    return (
        <div>
            {
                registerd ?
                    <div className='finish_profile-comelete-div'>
                        <form onSubmit={handleSubmitProfile} className='finish-profile_complete_form'>
                            <TextField
                                required
                                id="outlined-name"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className='compelete-form_wehi'>
                                <TextField
                                    type='number'
                                    onChange={(e) => setWeight(e.target.value)}
                                    ref={weightRef} required id="outlined-basic" label="Weight" variant="outlined" />
                                <TextField
                                    type='number'
                                    onChange={(e) => setHeight(e.target.value)}
                                    ref={heightyRef} required id="outlined-basic" label="Height" variant="outlined" />
                            </div>

                            <TextField
                                onChange={(e) => setInjury(e.target.value)}
                                ref={injuryRef}
                                id="outlined-name"
                                label="Injuries"
                            />
                            <div className='finish-profile_gender'>
                                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </div>
                            <button className='finsih_profile_compelete-sbmit-btn' type='submit'>submit</button>
                        </form>
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
                        <p className='finish-profile_nomember-hint-content'>Use The Same Email Address  {`( ${currentUser?.email} )`}</p>
                        <img alt="" src={logo} className="finish-profile_logo" />
                    </div>
            }
        </div>
    )
}

export default FinishProfile