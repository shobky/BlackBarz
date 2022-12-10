import { collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BsArrowRightCircleFill, BsCalendarCheckFill } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { db } from '../../../firebase/Config'
import Nav from '../../components/nav/Nav'
import './findtrainer.css'
import noprofile from '../../../assets/noprofile.webp'
import { BiFilter } from 'react-icons/bi'


const FindTrainer = () => {
    const trainerQ = collection(db, `trainers`)
    const [TrainersDB] = useCollectionData(trainerQ)
    const [searchQ, setSearchQ] = useState('')
    const [filterq, setFilter] = useState('all')
    const [totalRenderedTrainers, setTRT] = useState(TrainersDB?.length)

    useEffect(() => {
        setTRT(
            TrainersDB?.filter((filteredMember) => {
                if (filterq.includes('all')) {
                    return filteredMember
                }
                else if (filterq === 'male' && (filteredMember.gender === 'Male' || filteredMember.gender === 'male')) {
                    return filteredMember
                }
                else if (filterq === 'female' && (filteredMember.gender === 'Female' || filteredMember.gender === 'female')) {
                    return filteredMember
                } else {

                }
            })
                .filter((filterd) => {
                    if (filterd.name.toLowerCase().includes(searchQ.toLowerCase())) {
                        return filterd
                    } else if (searchQ === "") {
                        return filterd
                    } else if (filterd.tid.includes(searchQ)) {
                        return filterd
                    } else {

                    }
                })
                .length
        )
    }, [TrainersDB, searchQ, filterq])

    const handleCheckingIn = (trainer) => {
        alert('hi')
    }
    return (
        <div className='find-member'>
            <Nav page={'findTrainer'} />
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
                <p className='find-member_main_header'>{`Trainers`}</p>
                <div className='find-member_main-filter-optoins'>
                    <div className='find-member_filter-btn-div'>
                        <div>
                            <button className='find-member_main-filter-option find-member_main-filter-option__filter'>Filters <BiFilter className='find-member_main_filter-ico' /></button>
                            <div className='find-member_main_filter_options_btns'>
                                <button onClick={() => setFilter('all')} className='find-member_main-filter-option find-member_main-filter-option__all'>{filterq === 'all' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}All</button>
                                <button onClick={() => setFilter('male')} className='find-member_main-filter-option find-member_main-filter-option__male'>{filterq === 'male' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Male</button>
                                <button onClick={() => setFilter('female')} className='find-member_main-filter-option find-member_main-filter-option__female'>{filterq === 'female' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Female</button>
                            </div>
                        </div>
                    </div>

                </div>
                <p className='find-member_main-total'>Total <span> {totalRenderedTrainers}</span></p>
                <div className='find-member_member-list-container'>
                    <ul className='find-member_member-list'>
                        <ul className='find-member_member-list_header'>
                            <li>Member : </li>
                            {/* <li>Email : </li> */}
                            <li>Phone number : </li>
                            <li>Joining date : </li>
                            <li>Status : </li>
                            <li>Actions : </li>
                            {/* <li>Last attended :     </li> */}
                        </ul>
                    </ul>
                    <ul className='find-member_members-mapped'>
                        {
                            TrainersDB?.filter((filteredMember) => {
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
                                } else if (filterd.tid.includes(searchQ)) {
                                    return filterd
                                } else {

                                }
                            }).map((member, index) => (
                                <li className='find-member-ul-li' key={index}>
                                    <div className='find-member-ul-li_member-ifo'>
                                        <Link ><img className='find-member_main_form_img' src={member.photoURL ?? noprofile} alt="profile-pix" /></Link>
                                        <div>
                                            <p><strong>{member.name}</strong></p>
                                            <p>#{member.tid}</p>
                                        </div>
                                    </div>
                                    <p>{member.number}</p>
                                    <p>{`${member.trainerJoiningDate.day ?? ""}/${member.trainerJoiningDate.month ?? ""}/${member.trainerJoiningDate.msYear ?? ""}`}</p>
                                    <p>Active</p>
                                    <button style={{ cursor: "pointer" }} onDoubleClick={() => handleCheckingIn(member)} className={member.checked === true ? 'find-member-ul-li_chk-in-btn__checked' : 'find-member-ul-li_chk-in-btn'}><BsCalendarCheckFill /></button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </main>



        </div>
    )
}

export default FindTrainer

