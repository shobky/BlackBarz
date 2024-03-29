import React, { useState, useEffect } from 'react';
import { collection, doc, Firestore } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './viewDayWorkout.css'
import { AiTwotoneDelete } from 'react-icons/ai';

const CollectionViewer = ({ collectionName, onDeleteCollectoin }) => {

    const dayWorkoutsq = collection(db, collectionName)
    const [dayWorkoutsData] = useCollectionData(dayWorkoutsq)


    return (
        <div className='view-day-workots'>
            <ul className='view-day-workouts-ul'>
                {dayWorkoutsData?.map(doc => (
                    <>
                        <li className='view-day-workout_li' key={doc.id}>
                            <h3 style={{ marginBottom: '10px' }}>{doc.name}
                                <AiTwotoneDelete style={{ color: "red", fontSize:"13spx", marginLeft:"15px", cursor:"pointer" }} onClick={() => onDeleteCollectoin(doc.name)} />
                            </h3>
                            {
                                doc.strings.map((str) => (
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
