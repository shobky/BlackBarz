import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { AiFillDelete } from 'react-icons/ai'
import { useAuth } from '../../../contexts/AuthContext'
import { db } from '../../../firebase/Config'
import { uuidv4 } from '@firebase/util'
import Nav from '../../components/nav/Nav'
import './addVarient.css'

const AddVarientsForm = () => {
    const { varient } = useAuth()

    const varientQ = collection(db, `${varient}`)
    const [varientsDB] = useCollectionData(varientQ)

    const planName = useRef()
    const planSess = useRef()
    const planPrice = useRef()
    const trainerNameRef = useRef()
    const trainerNumberRef = useRef()
    const workoutRef = useRef()

    const [msDay, setMsDay] = useState()
    const [msMonth, setMsMonth] = useState()
    const [msYear, setMsYear] = useState()

    useEffect(() => {
        const getdate = () => {
            const currentdate = new Date();
            setMsDay(currentdate.getDate())
            setMsMonth(currentdate.getMonth() + 1)
            setMsYear(currentdate.getFullYear())
        }
        getdate()
        return
    }, [])


    const onAddVarient = (e) => {
        e.preventDefault()
        if (varient === 'plans') {
            setDoc(doc(db, `plans/${planName.current.value}`), {
                name: planName.current.value,
                sessions: planSess.current.value,
                price: planPrice.current.value
            }).then(() => {
                document.getElementById('varientform').reset()
            })
        } else if (varient === 'trainers') {
            setDoc(doc(db, `trainers/${trainerNumberRef.current.value}`), {
                name: trainerNameRef.current.value,
                number: trainerNumberRef.current.value,
                tid: uuidv4().slice(-4),
                trainerJoiningDate: {
                    day: msDay,
                    month: msMonth,
                    msYear: msYear
                },

            }).then(() => {
                document.getElementById('varientform').reset()
            })
        } else {
            setDoc(doc(db, `workouts/${workoutRef.current.value}`), {
                workout: workoutRef.current.value
            })
        }
    }

    return (
        <div>
            <Nav />
            <main className='dashboard_varient-fomr_main'>
                <div>
                    {
                        varientsDB?.map((varientDb, index) => (
                            <div key={index}>
                                {
                                    varient === 'plans' ?
                                        <div className='s'>
                                            <div key={index} className='dashboard_varients_plans'>
                                                <p>Name : {varientDb.name}</p>
                                                <p>Sessions : {varientDb.sessions}</p>
                                                <p>Price : {varientDb.price ?? ""}</p>
                                                <button className='dashboard_plnas_var-delete-btn' type='button' onClick={() => deleteDoc(doc(db, `plans/${varientDb.name}`))}><AiFillDelete className='dashboard_plnas_var-delete' /></button>
                                            </div>
                                            <br />
                                        </div> :
                                        varient === 'trainers' ?
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "280px" }}>
                                                <p style={{ marginBottom: "15px" }}>Captain {varientDb.name}<span style={{ fontSize: '14px' }}> #{varientDb.tid}</span></p>
                                                <button className='dashboard_plnas_var-delete-btn' type='button' onClick={() => deleteDoc(doc(db, `trainers/${varientDb.number}`))}><AiFillDelete className='dashboard_plnas_var-delete' /></button>
                                            </div> :
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "280px" }}>
                                                <p style={{ marginBottom: "15px", color: "white" }}>{varientDb.workout}</p>
                                                <button className='dashboard_plnas_var-delete-btn' type='button' onClick={() => deleteDoc(doc(db, `workouts/${varientDb.workout}`))}><AiFillDelete className='dashboard_plnas_var-delete' /></button>
                                            </div>

                                }
                            </div>
                        ))
                    }
                </div>
                <form id='varientform' onSubmit={(e) => onAddVarient(e)} className='dashboard_varient'>
                    <div>
                        {
                            varient ?
                                varient === 'plans' ?
                                    <div className='add-varient-inputs-group'>
                                        <input className='add-varient_input' ref={planName} placeholder='Name ' />
                                        <input className='add-varient_input' ref={planSess} placeholder='Sessions' />
                                        <input type='number' className='add-varient_input' ref={planPrice} placeholder='Price' />

                                    </div> :
                                    varient === "trainers" ?
                                        <div id='trainerForm' style={{ display: "flex", flexDirection: "column" }}>
                                            <input required ref={trainerNameRef} placeholder='name' />
                                            <input required ref={trainerNumberRef} placeholder='number' />
                                        </div>
                                        : <input ref={workoutRef} placeholder='Add a Workout' /> : ''
                        }
                    </div>
                    <button className='dashboard_varient_btn'>SUBMIT</button>
                </form>
            </main>
        </div>
    )
}

export default AddVarientsForm