import React, { useEffect, useState } from 'react'
import noprofile from '../../../assets/noprofile.webp'
import Nav from '../../components/nav/Nav'
import './findMember.css'
import { GoSearch } from 'react-icons/go'
import { BiFilter } from 'react-icons/bi'
import { GiEmptyHourglass, GiTwoCoins } from 'react-icons/gi'

import { AiFillCheckCircle } from 'react-icons/ai'
import { BsArrowRightCircleFill, BsCalendarCheckFill } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import { MdOutlineDoNotDisturb } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { FaStopwatch } from 'react-icons/fa'
import { useAuth } from '../../../contexts/AuthContext'






const FindMember = ({ firestoreMembers, isClub }) => {
    const [searchQ, setSearchQ] = useState('')
    const [filterq, setFilter] = useState('all')
    const [totalRenderedMembers, setTRM] = useState(firestoreMembers?.length)
    const [renewMember, setRenewMember] = useState()
    const [msDay, setMsDay] = useState()
    const [msMonth, setMsMonth] = useState()
    const [msYear, setMsYear] = useState()
    const [cost, setCost] = useState()
    const { city } = useAuth()

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


    useEffect(() => {
        setTRM(
            firestoreMembers?.filter((filteredMember) => {
                if (filterq.includes('all')) {
                    return filteredMember
                } else if (filterq === 'paid' && filteredMember.checked === true) {
                    return filteredMember
                }
                else if (filterq === 'male' && (filteredMember.gender === 'Male' || filteredMember.gender === 'male')) {
                    return filteredMember
                }
                else if (filterq === 'female' && (filteredMember.gender === 'Female' || filteredMember.gender === 'female')) {
                    return filteredMember
                } else {

                }
            }).filter((filterd) => {
                if (filterd.name.toLowerCase().includes(searchQ.toLowerCase())) {
                    return filterd
                } else if (searchQ === "") {
                    return filterd
                } else if (filterd.mid.includes(searchQ)) {
                    return filterd
                } else if (filterd.email.toLowerCase().includes(searchQ.toLowerCase())) {
                    return filterd
                } else {

                }
            }).length
        )
    }, [firestoreMembers, searchQ, filterq])

    const handleCheckingIn = (member) => {
        if (member.checked === true) {
            updateDoc(doc(db, `members/${member.email}`), {
                checked: false
            }).then(() => {
                updateDoc(doc(db, `dayCheckin${city}/${member.email}`), {
                    checked: false
                })
            }).then(() => {
                console.log('checked')
            }).catch(() => {
                alert('failed')
            })
        } else {
            updateDoc(doc(db, `members/${member.email}`), {
                checked: true,
                session: member.session ? (member.session + 1) : 1
            }).then(() => {
                console.log('checked')
                setDoc(doc(db, `dayCheckin${city}/${member.email}`), {
                    height: member.height,
                    type: member.type,
                    trainer: member.trainer,
                    plan: member.plan,
                    name: member.name,
                    number: member.number,
                    gender: member.gender,
                    email: member.email,
                    mid: member.mid,
                    memberShipDate: {
                        day: member.memberShipDate.day,
                        month: member.memberShipDate.month,
                        msYear: member.memberShipDate.msYear
                    },
                    favs: {
                        days: member.favs.days,
                        hours: member.favs.hours,
                        city: member.favs.city
                    },
                    checked: true,
                    session: member.session ? (member.session + 1) : 1
                })
            }).catch(() => {
                alert('failed')
            })
        }
    }

    const onResetSessions = (member) => {
        setRenewMember(member)
        setCost(member.plan === '24' ? '500' : member.plan === '12' ? '350' : member.plan === '1' ? '70' : "")
        document.getElementById('findMemberFilterMsg').classList.remove('find-member_filter_hidden')
        document.getElementById('findMemberFilterMsg').classList.add('find-member_renewal-msg-filter')

    }

    const onCloseRenwalMsg = () => {
        document.getElementById('findMemberFilterMsg').classList.remove('find-member_renewal-msg-filter')
        document.getElementById('findMemberFilterMsg').classList.add('find-member_filter_hidden')

    }
    const hadlesessionRenwal = () => {
        updateDoc(doc(db, `members/${renewMember.email}`), {
            session: 0,
            lastPaid: {
                day: msDay,
                month: msMonth,
                msYear: msYear
            },
            paymentmonth: msMonth,
            paymentday: msDay


        }).then(() => {
            setDoc(doc(db, `dayPayments${city}/${renewMember.email}`), {
                renewMember,
                price: renewMember.plan === 12 ? 350 : renewMember.plan === 24 ? 500 : 70
            })
        }).then(() => {
            updateDoc(doc(db, `dayCheckin${city}/${renewMember.email}`), {
                session: 0,
                lastPaid: {
                    day: msDay,
                    month: msMonth,
                    msYear: msYear
                },
                paymentmonth: msMonth,
                paymentday: msDay
            }).then(() => {
                onCloseRenwalMsg()
            }).catch(() => {
                onCloseRenwalMsg()

            })
        }).catch(() => {
            onCloseRenwalMsg()

        })
    }

    const handleResetDayMsg = () => {
        document.getElementById('resetDayMsg').classList.remove('find-member-reset-dat__hidden')
        document.getElementById('resetDayMsg').classList.add('find-member-reset-dat__show')
    }
    const handleCloseREsetMsg = () => {
        document.getElementById('resetDayMsg').classList.remove('find-member-reset-dat__show')
        document.getElementById('resetDayMsg').classList.add('find-member-reset-dat__hiden')

    }


    const handleResetDay = () => {
        firestoreMembers?.map((fmember) => {
            deleteDoc(doc(db, `dayCheckin${city}/${fmember.email}`))
                .then(() => {
                    deleteDoc(doc(db, `dayPayments${city}/${fmember.email}`)).then(() => {
                        handleCloseREsetMsg()
                    }).catch(() => {
                        handleCloseREsetMsg()
                    })
                }).catch(() => {
                    handleCloseREsetMsg()
                })
        })
    }

    const handleFreeze = (member) => {
        updateDoc(doc(db, `members/${member.email}`), {
            frozen: true,
            freezeDate: { day: msDay, month: msMonth, year: msYear }
        })

    }
    const handleRemoveFreeze = (member) => {
        updateDoc(doc(db, `members/${member.email}`), {
            frozen: false,
            unFreezeDate: { day: msDay, month: msMonth, year: msYear },
            paymentday: (msMonth === member.freezeDate.month ? msDay > member.freezeDate.day ? (msDay - member.freezeDate.day) + member.paymentday : member.freezeDate.day : msDay),
            paymentmonth: (msMonth > member.freezeDate.month ? member.paymentmonth + (msMonth - member.freezeDate.month) : msMonth)


        })
    }


    return (
        <div className='find-member'>
            <Nav page={isClub ? 'club' : 'findMember'} />
            <header className='find-member_header'>
                {/* <h1 className='find-member_head'>Gym Members</h1> */}
                <div className='find-member_header_search-container'>
                    <GoSearch className='find-member_header_search-ico' />
                    <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder='Type in to search' className='find-member_header-search-input' />
                    <IoMdClose onClick={() => setSearchQ('')} className='find-member_header_search-delete-ico' />
                </div>
            </header>
            <br />
            <main className='find-member_main'>
                <p className='find-member_main_header'>{isClub ? `Today Members ${msDay}/${msMonth}/${msYear} ` : "Members"}</p>
                <div className='find-member_main-filter-optoins'>
                    <div className='find-member_filter-btn-div'>
                        <div>
                            <button className='find-member_main-filter-option find-member_main-filter-option__filter'>Filters <BiFilter className='find-member_main_filter-ico' /></button>
                            <div className='find-member_main_filter_options_btns'>
                                <button onClick={() => setFilter('all')} className='find-member_main-filter-option find-member_main-filter-option__all'>{filterq === 'all' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}All</button>
                                <button onClick={() => setFilter('exp')} className='find-member_main-filter-option find-member_main-filter-option__exp'>{filterq === 'exp' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Expired</button>
                                <button onClick={() => setFilter('paid')} className='find-member_main-filter-option find-member_main-filter-option__paid'>{filterq === 'paid' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}checked</button>
                                <button onClick={() => setFilter('new')} className='find-member_main-filter-option find-member_main-filter-option__new'>{filterq === 'new' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}New</button>
                                <button onClick={() => setFilter('male')} className='find-member_main-filter-option find-member_main-filter-option__male'>{filterq === 'male' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Male</button>
                                <button onClick={() => setFilter('female')} className='find-member_main-filter-option find-member_main-filter-option__female'>{filterq === 'female' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Female</button>
                            </div>
                        </div>
                        {
                            isClub ?
                                <>
                                    <button onClick={handleResetDayMsg} className='find-member-today_resetDay'>Reset</button>

                                    <div id='resetDayMsg' className='find-member_filter_hidde'>
                                        <div className='find-member_reset-msg'>
                                            <p><IoClose onClick={handleCloseREsetMsg} className='find-member_renwal_msg_close_ico' /></p>
                                            <h2>Reset Day</h2>
                                            <div>
                                                <p>Are your sure you want to delete today's history and start a new day?  </p>
                                            </div>
                                            <button onClick={handleResetDay}>RESET</button>
                                        </div>
                                    </div></> : ""
                        }

                    </div>

                </div>
                <p className='find-member_main-total'>Total <span> {totalRenderedMembers}</span></p>
                <div className='find-member_member-list-container'>
                    <ul className='find-member_member-list'>
                        <ul className='find-member_member-list_header'>
                            <li>Member : </li>
                            <li>Email : </li>
                            <li>Phone number : </li>
                            <li>Joining date : </li>
                            <li>Status : </li>
                            <li>Actions : </li>



                            {/* <li>Last attended :     </li> */}
                        </ul>
                    </ul>
                    <ul className='find-member_members-mapped'>
                        {
                            firestoreMembers?.filter((filteredMember) => {
                                if (filterq.includes('all')) {
                                    return filteredMember
                                } else if (filterq === 'paid' && filteredMember.checked === true) {
                                    return filteredMember
                                }
                                else if (filterq === 'male' && (filteredMember.gender === 'Male' || filteredMember.gender === 'male')) {
                                    return filteredMember
                                }
                                else if (filterq === 'female' && (filteredMember.gender === 'Female' || filteredMember.gender === 'female')) {
                                    return filteredMember
                                }
                                else if (filterq === 'exp' && filteredMember.session >= filteredMember.plan) {
                                    return filteredMember
                                } else {

                                }
                            }).filter((filterd) => {
                                if (filterd.name.toLowerCase().includes(searchQ.toLowerCase())) {
                                    return filterd
                                } else if (searchQ === "") {
                                    return filterd
                                } else if (filterd.mid.includes(searchQ)) {
                                    return filterd
                                } else if (filterd.email.toLowerCase().includes(searchQ.toLowerCase())) {
                                    return filterd
                                } else if (filterd.number.includes(searchQ)) {
                                    return filterd
                                } else {

                                }
                            }).map((member, index) => (
                                <li className='find-member-ul-li' key={index}>
                                    <div className='find-member-ul-li_member-ifo'>
                                        <Link to={`/dashboard/find-member/${member.email}`}><img className='find-member_main_form_img' src={member.photoURL ?? noprofile} alt="profile-pix" /></Link>
                                        <div>
                                            <p><strong>{member.name}</strong></p>
                                            <p>#{member.mid}</p>
                                        </div>

                                        {/* membership renewal msg */}
                                        <div id='findMemberFilterMsg' className='find-member_filter_hidden'>
                                            <div className='find-member_renewal-msg'>
                                                <p><IoClose onClick={onCloseRenwalMsg} className='find-member_renwal_msg_close_ico' /></p>
                                                <h2>Membership Renwal</h2>
                                                <div>
                                                    <p>By clicking renew you will reset member sessions, and start a new month. </p>
                                                    <h3 style={{ textAlign: "center" }}>{cost}L.e</h3>
                                                    <br />
                                                </div>
                                                <button onClick={hadlesessionRenwal}>RENEW</button>
                                            </div>
                                        </div>
                                        {/* end */}

                                    </div>
                                    <p>{member.email}</p>
                                    <p>{member.number}</p>
                                    <p>{`${member.memberShipDate.day ?? ""}/${member.memberShipDate.month ?? ""}/${member.memberShipDate.msYear ?? ""}`}</p>
                                    {
                                        member.frozen ?
                                            <p style={{ textAlign: 'center', color: "#15e4ff" }}><FaStopwatch style={{ marginRight: "5px" }} /> Frozen</p>
                                            :
                                            <p style={{ textAlign: "center" }}>{member.session >= member.plan || (member.paymentmonth !== msMonth && member.paymentday <= msDay) ? <div style={{ color: "red", display: "flex", flexDirection: "column", textAlign: "center" }}> <p><MdOutlineDoNotDisturb style={{ position: 'relative', top: "4px", fontSize: "20px" }} />Expired</p><p>{member.plan - member.session}</p></div> : member.session >= (member.plan - 6) ? <span style={{ color: "orange" }}> <GiEmptyHourglass style={{ position: 'relative', top: "2px" }} />Duo in {member.plan - member.session}</span> : <span style={{ color: "rgb(0, 245, 102)" }}><AiFillCheckCircle className='acit-find-me' /> Active</span>}</p>


                                    }
                                    <button style={{ cursor: "pointer" }} onDoubleClick={() => handleCheckingIn(member)} className={member.checked === true ? 'find-member-ul-li_chk-in-btn__checked' : 'find-member-ul-li_chk-in-btn'}><BsCalendarCheckFill /></button>
                                    {/* {
                                        member.frozen ?
                                            <buttonn onDoubleClick={() => handleRemoveFreeze(member)} className='find-member_frozen' style={{ cursor: "pointer" }}><FaStopwatch /></buttonn>
                                            :
                                            <buttonn onDoubleClick={() => handleFreeze(member)} style={{ cursor: "pointer" }}><FaStopwatch /></buttonn>
                                    } */}
                                    {
                                        member.session >= member.plan || (member.paymentmonth !== msMonth && member.paymentday <= msDay && !member.frozen) ?
                                            <button onClick={() => onResetSessions(member)} style={{ cursor: "pointer" }} className="find-member_payment-action"><GiTwoCoins /></button>
                                            :
                                            <button className="find-member_payment-action__disabled"><GiTwoCoins /></button>
                                    }

                                </li>
                            ))
                        }
                    </ul>
                </div>
            </main>



        </div>
    )
}

export default FindMember