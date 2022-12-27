import React, { useEffect, useState } from 'react';
import TrainerTable from '../../components/trainerTable/TrainerTable';
import './schedule.css'
import { db } from '../../../firebase/Config';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import EditTrTable from '../../components/trainerTable/EditTrTable';
import { BiEditAlt } from 'react-icons/bi'
import { HiOutlineSave } from 'react-icons/hi';
import Loading from '../../../components/Loading';
import Nav from '../../components/Nav';

const Schedule = () => {

    const [edit, setEdit] = useState('show')
    // const [trainersState, setTrainers] = useState([
    //     { name: 'C/SAMEH', Monday: ["00-00", "00-00", "00-00", "00-00"], Tuesday: ["00-00", "00-00", "00-00", "00-00"], Wednesday: ["00-00", "00-00", "00-00", "00-00"], Thursday: ["00-00", "00-00", "00-00", "00-00"], Friday: ["00-00", "00-00", "00-00", "00-00"], Saturday: ["00-00", "00-00", "00-00", "00-00"], Sunday: ["00-00", "00-00", "00-00", "00-00"] },
    //     { name: 'C/BAKR', Monday: ["00-00", "00-00", "00-00", "00-00"], Tuesday: ["00-00", "00-00", "00-00", "00-00"], Wednesday: ["00-00", "00-00", "00-00", "00-00"], Thursday: ["00-00", "00-00", "00-00", "00-00"], Friday: ["00-00", "00-00", "00-00", "00-00"], Saturday: ["00-00", "00-00", "00-00", "00-00"], Sunday: ["00-00", "00-00", "00-00", "00-00"] },
    //     { name: 'C/ENAS', Monday: ["00-00", "00-00", "00-00", "00-00"], Tuesday: ["00-00", "00-00", "00-00", "00-00"], Wednesday: ["00-00", "00-00", "00-00", "00-00"], Thursday: ["00-00", "00-00", "00-00", "00-00"], Friday: ["00-00", "00-00", "00-00", "00-00"], Saturday: ["00-00", "00-00", "00-00", "00-00"], Sunday: ["00-00", "00-00", "00-00", "00-00"] },
    //     { name: 'C/DINA', Monday: ["00-00", "00-00", "00-00", "00-00"], Tuesday: ["00-00", "00-00", "00-00", "00-00"], Wednesday: ["00-00", "00-00", "00-00", "00-00"], Thursday: ["00-00", "00-00", "00-00", "00-00"], Friday: ["00-00", "00-00", "00-00", "00-00"], Saturday: ["00-00", "00-00", "00-00", "00-00"], Sunday: ["00-00", "00-00", "00-00", "00-00"] },
    //     { name: 'C/FARAHAT', Monday: ["00-00", "00-00", "00-00", "00-00"], Tuesday: ["00-00", "00-00", "00-00", "00-00"], Wednesday: ["00-00", "00-00", "00-00", "00-00"], Thursday: ["00-00", "00-00", "00-00", "00-00"], Friday: ["00-00", "00-00", "00-00", "00-00"], Saturday: ["00-00", "00-00", "00-00", "00-00"], Sunday: ["00-00", "00-00", "00-00", "00-00"] },
    //     { name: 'C/ELERAKY', Monday: ["00-00", "00-00", "00-00", "00-00"], Tuesday: ["00-00", "00-00", "00-00", "00-00"], Wednesday: ["00-00", "00-00", "00-00", "00-00"], Thursday: ["00-00", "00-00", "00-00", "00-00"], Friday: ["00-00", "00-00", "00-00", "00-00"], Saturday: ["00-00", "00-00", "00-00", "00-00"], Sunday: ["00-00", "00-00", "00-00", "00-00"] },
    //     { name: 'C/ESLAM', Monday: ["00-00", "00-00", "00-00", "00-00"], Tuesday: ["00-00", "00-00", "00-00", "00-00"], Wednesday: ["00-00", "00-00", "00-00", "00-00"], Thursday: ["00-00", "00-00", "00-00", "00-00"], Friday: ["00-00", "00-00", "00-00", "00-00"], Saturday: ["00-00", "00-00", "00-00", "00-00"], Sunday: ["00-00", "00-00", "00-00", "00-00"] },
    //     { name: 'C/LEBE', Monday: ["00-00", "00-00", "00-00", "00-00"], Tuesday: ["00-00", "00-00", "00-00", "00-00"], Wednesday: ["00-00", "00-00", "00-00", "00-00"], Thursday: ["00-00", "00-00", "00-00", "00-00"], Friday: ["00-00", "00-00", "00-00", "00-00"], Saturday: ["00-00", "00-00", "00-00", "00-00"], Sunday: ["00-00", "00-00", "00-00", "00-00"] },

    // ]);

    const CQ = collection(db, `C`)
    const [trainers] = useCollectionData(CQ)
    const [fxSh, setFxSh] = useState(trainers)

    useEffect(() => {
        setFxSh(trainers)
    }, [trainers])



    const handleChange = (e, i, field, j) => {
        const value = e.target.value;
        setFxSh((prevTrainers) => {
            const updatedTrainers = [...prevTrainers];
            if (typeof j === 'number') {
                updatedTrainers[i][field][j] = value;
            } else {
                updatedTrainers[i][field] = value;
            }
            return updatedTrainers;
        });
    };




    const storeTrainers = async () => {
        // Iterate over the trainers array and add each trainer as a document to the collection
        for (const trainer of fxSh) {
            try {
                await setDoc(doc(db, `${trainer.name}`), trainer)
                console.log(`${trainer.name} successfully added to Firestore`);
            } catch (error) {
                console.error(`Error adding ${trainer.name} to Firestore: ${error}`);
            }
        }
    };
    const handleSabeBtn = () => {
        if (edit === 'edit') {
            storeTrainers()
        }
        setEdit(edit === 'show' ? 'edit' : 'show')

    }

    return (
        <div className='sch'>
            {
                trainers ?
                    <div>
                        <Nav />
                        <header>
                            <p className='sch_head'>FX3 SCHEDULE</p>
                            <p className='sch_sub-head'>portsaid</p>
                            <button className='sch_edit-table-btn'
                                onClick={handleSabeBtn}>
                                {
                                    edit === 'show' ?
                                        <BiEditAlt /> : <HiOutlineSave />
                                }
                            </button>
                        </header>
                        <div className='trainer_tb-container'>

                            {
                                edit === 'show' ?
                                    <TrainerTable trainers={trainers} />
                                    :
                                    <EditTrTable edit={edit} trainers={fxSh} onChange={handleChange} />
                            }


                        </div></div>
                    : <Loading />
            }

        </div>
    );
};

export default Schedule;
