import React, { useState, useEffect } from 'react';
import { collection, Firestore } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './viewDayWorkout.css'

const CollectionViewer = ({ collectionName }) => {

    const dayWorkoutsq = collection(db, collectionName)
    const [dayWorkoutsData] = useCollectionData(dayWorkoutsq)


    return (
        <div className='view-day-workots'>
            <ul className='view-day-workouts-ul'>
                {dayWorkoutsData?.map(document => (
                    <>
                        <li className='view-day-workout_li' key={document.id}>
                            <h3 style={{marginBottom:'10px'}}>{document.name}</h3>
                            {
                                document.strings.map((str) => (
                                    <p>{str}</p>
                                ))
                            }
                        </li>
                        <br />
                    </>
                ))}
            </ul>
        </div>
    );
};

export default CollectionViewer;
