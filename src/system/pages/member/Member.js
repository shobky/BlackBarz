import React, { useEffect, useState } from 'react'
// import { BiArrowBack } from 'react-icons/bi'
// import { Link } from 'react-router-dom'
import Nav from '../../components/nav/Nav'
import './member.css'
import noPhoto from '../../../assets/noprofile.webp'

const Member = ({ member }) => {
    const [msMonth, setMsMonth] = useState()
    const [msDay, setMsDay] = useState()



    useEffect(() => {
        const getdate = () => {
            const currentdate = new Date();
            setMsMonth(currentdate.getMonth() + 1)
            setMsDay(currentdate.getDate())


        }
        getdate()
        return
    }, [])

    return (
        <div className='member'>
            <Nav page='findMember' />
            {/* <Link to='/dashboard/find-member' className='member_back_btn'><BiArrowBack className='member_back_ico' /></Link> */}
            <div className='member_content'>
                <header className='member_header'>
                    <div className='member_header_member-face'>
                        <img alt='' src={member.photoURL ?? noPhoto} className="member_photo" />
                        <h1 className='member_name '>{member.name}</h1>
                    </div>
                    <div className='member_header_member-info'>
                        <p className='member_contacts'>{member.number}</p>
                        <p className='member_contacts'>{member.email}</p>
                        <br />
                        <p className='member_joining-date'><strong>Joined on  :</strong> {`${member.memberShipDate?.day ?? ""}/${member.memberShipDate?.month ?? ""}/${member.memberShipDate?.msYear ?? ""}`}</p>
                        <p className='member_joining-date'><strong>Last payment :</strong> {`${member.lastPaid?.day ?? ""}/${member.lastPaid?.month ?? ""}/${member.lastPaid?.msYear ?? ""}`}</p>

                        {
                            member.frozen ?
                                <div>
                                    <p className='member_joining-date'><strong>Status : </strong> <span style={{ color: "#15e4ff" }}> Frozen</span></p>
                                    <p style={{ marginTop: "5px" }}><strong>Freeze date : </strong>{member.freezeDate.day}/{member.freezeDate.month}/{member.freezeDate.year}</p>
                                </div>

                                :
                                <div>
                                    <br />
                                    {
                                        member.unFreezeDate ?
                                            <p><strong>UnFreeze date: </strong>{member.unFreezeDate.day}/{member.unFreezeDate.month}/{member.unFreezeDate.year}</p>
                                            : ""
                                    }
                                    <p className='member_joining-date'><strong>Status : </strong> {member.session >= member.plan || (member.paymentmonth !== msMonth && member.paymentday <= msDay) ? <span style={{ color: "red" }}> Expired</span> : member.session >= (member.plan - 3) ? <span style={{ color: "orange" }}>Duo in {member.plan - member.session} sessions</span> : <span style={{ color: "rgb(0, 245, 102)" }}> Active</span>}</p>
                                </div>
                        }

                        <p className='member_joining-date'><strong>Sessions :</strong> {`${member.session ?? 0} / ${member.plan ?? 'NO PLAN'} `}</p>
                        {
                            member.session > member.plan ?
                                <p className='member_joining-date'><strong>Carry over :</strong> <span style={{ color: "red" }}>{`${member.session - member.plan} sesston/s`}</span></p>
                                : ""
                        }

                    </div>

                </header>
                <main className='member_main'>
                    <div className='member_main_info-div'>
                        <h2 className='member_main_head'>-Member info</h2>
                        <p className='member_main_info-p'><strong>Gender : </strong> {member.gender ?? 'N/A'}</p>
                        <p className='member_main_info-p'><strong>Weight : </strong> {member.weight ?? 'N/A'}</p>
                        <p className='member_main_info-p'><strong>Height : </strong> {member.height ?? 'N/A'}</p>
                    </div>
                    <div className='member_main_info-div'>
                        <h2 className='member_main_head'>-Preferences</h2>
                        <p className='member_main_info-p'><strong>City : </strong> {member.favs?.city[0] ?? 'N/A'}</p>
                        <p style={{ width: "30vw" }} className='member_main_info-p'><strong>Days : </strong> {member.favs?.days?.map((day) => (<span> {day}</span>))}</p>
                        <p className='member_main_info-p'><strong>Hours : </strong> {member.favs?.hours?.map((hour) => (<span> {hour} - </span>))}</p>
                    </div>
                    <div className='member_main_info-div'>
                        <h2 className='member_main_head'>-Membership</h2>
                        <p className='member_main_info-p'><strong>Plan : </strong> {member.plan ?? 'N/A'} days</p>
                        <p className='member_main_info-p'><strong>Trainer : </strong> {member.trainer ?? 'N/A'}</p>
                        <p className='member_main_info-p'><strong>Workout type : </strong> {member.type ?? 'N/A'}</p>
                    </div>
                </main>
            </div >
        </div >
    )
}

export default Member