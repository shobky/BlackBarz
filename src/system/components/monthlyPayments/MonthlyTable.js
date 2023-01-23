import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import './monthPay.css'
import { useAuth } from '../../../contexts/AuthContext'

const MonthlyTable = () => {

    const [table, setTable] = useState([])
    const [dayTable, setdayTable] = useState([])

    const [msMonth, setMsMonth] = useState()
    const [msDay, setMsDay] = useState()


    const fireStoreMemberQuery = collection(db, `payments/months/${msMonth}`)
    const [firestoreMembers] = useCollectionData(fireStoreMemberQuery)

    const fireStoreMemberDaysQuery = collection(db, `payments/days/${msDay}`)
    const [firestoreMemberDayss] = useCollectionData(fireStoreMemberDaysQuery)

    const trainersQuery = collection(db, `trainers`)
    const [firestoretrainers] = useCollectionData(trainersQuery)


    console.log(firestoreMemberDayss)
    useEffect(() => {
        const getdate = () => {
            const currentdate = new Date();
            setMsMonth(currentdate.getMonth() + 1)
            setMsDay(currentdate.getDate())

        }
        getdate()
        return
    }, [])

    const createTable = async (members, trainers) => {
        // Create an empty table array
        const table = [];

        // Loop through the trainers array
        await trainers?.forEach((trainer) => {
            // Filter the members array to get all the members with the current trainer's name
            const filteredMembers = members?.filter((member) => member.trainer === trainer.name);
            // Calculate the total price of the filtered members
            const totalPrice = filteredMembers?.reduce((acc, cur) => acc + Number(cur.fees), 0);
            // Push a new object to the table array with the trainer's name and the total price of the filtered members
            table.push({ trainer: trainer.name, value: totalPrice, members: filteredMembers?.length });
        });

        setTable(table)
        return table;
    }
    useEffect(() => {
        createTable(firestoreMembers, firestoretrainers)

    }, [firestoreMembers, firestoretrainers])

    table.sort(
        (p1, p2) =>
            (p1.value < p2.value) ? 1 : (p1.value > p2.value) ? -1 : 0);

    const createDayTable = async (members, trainers) => {
        // Create an empty table array
        const table = [];

        // Loop through the trainers array
        await trainers?.forEach((trainer) => {
            // Filter the members array to get all the members with the current trainer's name
            const firestoreMemberDayss = members?.filter((member) => member.trainer === trainer.name);
            // Calculate the total price of the filtered members
            const totalPrice = firestoreMemberDayss?.reduce((acc, cur) => acc + Number(cur.plan.price), 0);
            // Push a new object to the table array with the trainer's name and the total price of the filtered members
            table.push({ trainer: trainer.name, value: totalPrice, members: firestoreMemberDayss?.length });
        });

        setdayTable(table)
        return table;
    }
    useEffect(() => {
        createDayTable(firestoreMemberDayss, firestoretrainers)

    }, [firestoreMemberDayss, firestoretrainers])



    return (
        <div className='monthPay_table'>
            <div className='monthPay_table_contents'>
                <div className='monthPay_table-head-div'>
                    <p className='monthPay_table-head'>Trainer</p>
                    <p className='monthPay_table-head'>Price</p>
                    <p className='monthPay_table-head'>Members</p>
                </div>
                {
                    table?.map((row) => (
                        <div className='monthPay_table_row' key={row.trainer}>
                            <p>{row.trainer}</p>
                            <p>{row.value}</p>
                            <p> {row.members}</p>
                        </div>
                    ))
                }
                <p className='monthPay_table-total'>{table?.reduce((acc, cur) => acc + cur.value, 0)} l.e</p>
            </div>

        </div>
    )
}

export default MonthlyTable