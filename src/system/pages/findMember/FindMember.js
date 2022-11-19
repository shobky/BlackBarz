import React, { useEffect, useState } from 'react'
import noprofile from '../../../assets/noprofile.webp'
import Nav from '../../components/nav/Nav'
import './findMember.css'
import { GoSearch } from 'react-icons/go'
import { BiFilter } from 'react-icons/bi'
import { GiEmptyHourglass, GiTwoCoins } from 'react-icons/gi'
import { GrMoney } from 'react-icons/gr'


import { AiFillCheckCircle } from 'react-icons/ai'
import { BsArrowRightCircleFill, BsCalendarCheckFill } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import { MdOutlineDoNotDisturb } from 'react-icons/md'






const FindMember = ({ firestoreMembers, isClub }) => {
    const [searchQ, setSearchQ] = useState('')
    const [filterq, setFilter] = useState('all')
    const [totalRenderedMembers, setTRM] = useState(firestoreMembers?.length)

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
            }).catch(() => {
                alert('failed')
            })
        }
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
            <br/>
            <main className='find-member_main'>
                <p className='find-member_main_header'>{isClub ? "Currently working out" : "Members"}</p>
                <div className='find-member_main-filter-optoins'>
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
                                } else if (filterd.memberShipDate.includes(searchQ)) {
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
                                    </div>
                                    <p>{member.email}</p>
                                    <p>{member.number}</p>
                                    <p>{member.memberShipDate}</p>
                                    <p style={{ textAlign: "center    " }}>{member.session >= member.plan ? <div style={{ color: "red", display: "flex", flexDirection: "column", textAlign: "center" }}> <p><MdOutlineDoNotDisturb style={{ position: 'relative', top: "4px", fontSize: "20px" }} />Expired</p><p>{member.plan - member.session}</p></div> : member.session >= (member.plan - 6) ? <span style={{ color: "orange" }}> <GiEmptyHourglass style={{ position: 'relative', top: "2px" }} />Duo in {member.plan - member.session}</span> : <span style={{ color: "rgb(0, 245, 102)" }}><AiFillCheckCircle className='acit-find-me' /> Active</span>}</p>


                                    <button style={{ cursor: "pointer" }} onDoubleClick={() => handleCheckingIn(member)} className={member.checked === true ? 'find-member-ul-li_chk-in-btn__checked' : 'find-member-ul-li_chk-in-btn'}><BsCalendarCheckFill /></button>
                                    {
                                        member.session <= member.plan - 7 ?
                                            <button className="find-member_payment-action__disabled"><GiTwoCoins /></button>
                                            :
                                            <button style={{ cursor: "pointer" }} className="find-member_payment-action"><GiTwoCoins /></button>

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