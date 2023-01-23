import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { BsCalendarCheckFill } from 'react-icons/bs'
import { db } from '../../../firebase/Config'
import { useAuth } from '../../../contexts/AuthContext'
const CheckinBtn = ({ member }) => {

    const { city } = useAuth()

    const handleCheckingIn = (member) => {
        if (member.checked === true) {
            updateDoc(doc(db, `members/${member.email}`), {
                checked: false,
                city: city
            }).then(() => {
                console.log('checked')
            }).catch(() => {
                alert('failed')
            })
        } else {
            updateDoc(doc(db, `members/${member.email}`), {
                checked: true,
                city: city,
                session: member.session ? (member.session + 1) : 1
            }).catch(() => {
                alert('failed')
            })
        }
    }
    return (
        <button
            style={{ cursor: "pointer" }}
            onDoubleClick={() => handleCheckingIn(member)}
            className={
                member.checked === true ?
                    'find-member-ul-li_chk-in-btn__checked' :
                    'find-member-ul-li_chk-in-btn'}>
            <BsCalendarCheckFill />
        </button>
    )
}

export default CheckinBtn