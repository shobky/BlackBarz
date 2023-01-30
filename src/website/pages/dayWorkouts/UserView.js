import { collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase/Config';
import Nav from '../../components/Nav';
import './dayWorkouts.css'

const UserView = () => {

    const dayWorkoutsq = collection(db, 'gain')
    const [dayWorkoutsData] = useCollectionData(dayWorkoutsq)


    return (
        <div>
            <Link className='userView_back-link' to="/"><BsArrowLeft /></Link>
            <p className='userView_header'>Gain</p>
            <div className='userView-day-workouts'>
                <ul className='view-day-workouts-ul'>
                    {dayWorkoutsData?.map(document, index => (
                        <div key={index}>
                            <li className='view-day-workout_li' key={document.id}>
                                <p className='user-view_workou-header'>{document.name}
                                </p>
                                {
                                    document.strings.map((str, index) => (
                                        <p key={index} className='user-view_workou-list'>{str}</p>
                                    ))
                                }
                            </li>
                            <br />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
        // <>
        // <div className='user-view_nav-back'>
        // <Nav />

        // </div>
        //     <div className='userView-day-workouts'>
        //         <ul className='view-day-workouts-ul'>
        //             {dayWorkoutsData?.map(document => (
        //                 <>
        //                     <li className='view-day-workout_li' key={document.id}>
        //                         <h3 style={{ marginBottom: '10px' }}>{document.name}</h3>
        //                         {
        //                             document.strings.map((str) => (
        //                                 <p>{str}</p>
        //                             ))
        //                         }
        //                     </li>
        //                     <br />
        //                 </>
        //             ))}
        //         </ul>
        //     </div></>
    );
};

export default UserView;
