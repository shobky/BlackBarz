import React, { useEffect, useState } from 'react'
import noprofile from '../../../assets/noprofile.webp'
import { Link, useNavigate } from 'react-router-dom'
import CheckinBtn from './CheckinBtn'
import { MdOutlineDoNotDisturb } from 'react-icons/md'
import { GiEmptyHourglass } from 'react-icons/gi'
import { AiFillCheckCircle } from 'react-icons/ai'
import { GiTwoCoins } from 'react-icons/gi'


const Member = ({ member, date }) => {
    const [pay, setPay] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const startDate = new Date(`${member.lastPaid.year}-${member.lastPaid.month}-${member.lastPaid.day}`);
        const endDate = new Date();
        const diffInMs = endDate - startDate;
        const diffInDays = diffInMs / 1000 / 60 / 60 / 24;
        if (diffInDays >= 30) {
            setPay(true)
        } else {
            console.log("30 days have not passed");
        }

    }, [member])

    return (
        <li className='find-member-ul-li'>
            <div className='find-member-ul-li_member-ifo'>
                <Link to={`/${member.email}`}><img className='find-member_main_form_img' src={member.photoURL ?? noprofile} alt="profile-pix" /></Link>
                <div>
                    <p><strong>{member.name}</strong></p>
                    <p>#{member.mid}</p>
                </div>
            </div>
            <p>{member.email}</p>
            <p>{member.number}</p>
            <p>{`${member.memberShipDate.day ?? ""}/${member.memberShipDate.month ?? ""}/${member.memberShipDate.msYear ?? ""}`}</p>

            <p style={{ textAlign: "center" }}>
                {member.session >= member.plan.sessions || (member.paymentmonth !== date.msMonth && member.paymentday <= date.msDay) ?
                    <div style={{
                        color: "red",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center"
                    }}>
                        <p>
                            <MdOutlineDoNotDisturb style={{
                                position: 'relative',
                                top: "4px",
                                fontSize: "20px"
                            }} />Expired</p>
                        <p>{member.plan.sessions - member.session}</p>
                    </div>
                    :
                    member.session >= (member.plan.sessions - 6) ?
                        <span style={{ color: "orange" }}>
                            <GiEmptyHourglass style={{
                                position: 'relative',
                                top: "2px"
                            }} />
                            Duo in {member.plan.sessions - member.session}</span> :
                        <span style={{ color: "rgb(0, 245, 102)" }}>
                            <AiFillCheckCircle className='acit-find-me' />
                            Active</span>
                }</p>
            <CheckinBtn key={member.mid} member={member} />
            {
                member.session >= member.plan.sessions || member.lastPaid == null || pay ?
                    <button onClick={() => navigate(`/${member.email}`)} style={{ cursor: "pointer" }} className="find-member_payment-action"><GiTwoCoins /></button>
                    :
                    <button className="find-member_payment-action__disabled"><GiTwoCoins /></button>
            }


        </li>
    )
}

export default Member