import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import { GiTwoCoins } from 'react-icons/gi'

const RenewBtn = ({ member, date, members }) => {
    const [SMember, setSMembers] = useState()

    const handleRenewalMsg = (email) => {
        const selected = members.find(i => i.email === email);
        setSMembers(selected)

        document.getElementById('findMemberFilterMsg').classList.remove('find-member_filter_hidden')
        document.getElementById('findMemberFilterMsg').classList.add('find-member_renewal-msg-filter')

    }

    const onCloseRenwalMsg = () => {
        document.getElementById('findMemberFilterMsg').classList.remove('find-member_renewal-msg-filter')
        document.getElementById('findMemberFilterMsg').classList.add('find-member_filter_hidden')

    }

    const hadlesessionRenwal = () => {

    }
    return (
        <div>
            {/* membership renewal msg */}
            <div id='findMemberFilterMsg' className='find-member_filter_hidden'>
                <div className='find-member_renewal-msg'>
                    <p><IoClose onClick={onCloseRenwalMsg} className='find-member_renwal_msg_close_ico' /></p>
                    <h2>Membership Renwal</h2>
                    <p>{SMember?.plan.price}</p>
                    <div>
                        <p>By clicking renew you will reset member sessions, and start a new month. </p>
                        <h3 style={{ textAlign: "center" }}>{SMember?.plan?.price}L.e</h3>
                        <br />
                    </div>
                    <button onClick={() => hadlesessionRenwal}>RENEW</button>
                </div>
            </div>
            {/* end */}

            {
                member.session >= member.plan.sessions || (member.paymentmonth !== date.msMonth && member.paymentday <= date.msDay) ?
                    <button onClick={() => handleRenewalMsg(member.email)} style={{ cursor: "pointer" }} className="find-member_payment-action"><GiTwoCoins /></button>
                    :
                    <button className="find-member_payment-action__disabled"><GiTwoCoins /></button>
            }

        </div>
    )
}

export default RenewBtn