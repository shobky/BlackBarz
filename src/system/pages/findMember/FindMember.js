import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import noprofile from '../../../assets/noprofile.webp'
import Nav from '../../components/nav/Nav'
import './findMember.css'
import { GoSearch } from 'react-icons/go'
import { BiFilter } from 'react-icons/bi'
import { AiFillCheckCircle, AiOutlineArrowDown } from 'react-icons/ai'
import { SlOptions } from 'react-icons/sl'
import { BsArrowRightCircleFill, BsCircleFill } from 'react-icons/bs'
import { IoSettingsSharp } from 'react-icons/io5'
import { HiUserRemove } from 'react-icons/hi'
import { MdCancel } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'






const FindMember = () => {
    const [searchQ, setSearchQ] = useState('')
    const { firestoreMembers } = useAuth()
    const [filter, setFilter] = useState('all')
    const [moreDetails, setMoreDetails] = useState(false)
    const [totalRenderedMembers, setTRM] = useState(firestoreMembers?.length)

    const handleMoreOption = (key) => {
        setMoreDetails(prevstate => ({
            ...moreDetails,
            [key]: !prevstate[key]
        }))
    }

    useEffect(() => {
        setTRM(
            firestoreMembers?.filter((filterd) => {
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
    }, [firestoreMembers, searchQ])

    return (
        <div className='find-member'>
            <Nav page='findMember' />
            <header className='find-member_header'>
                {/* <h1 className='find-member_head'>Gym Members</h1> */}
                <div className='find-member_header_search-container'>
                    <GoSearch className='find-member_header_search-ico' />
                    <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder='Type in to search' className='find-member_header-search-input' />
                    <IoMdClose onClick={() => setSearchQ('')} className='find-member_header_search-delete-ico' />
                </div>
            </header>
            <main className='find-member_main'>
                <p className='find-member_main_header'>Members</p>
                <div className='find-member_main-filter-optoins'>
                    <button className='find-member_main-filter-option find-member_main-filter-option__filter'>Filters <BiFilter className='find-member_main_filter-ico' /></button>
                    <div className='find-member_main_filter_options_btns'>
                        <button onClick={() => setFilter('all')} className='find-member_main-filter-option find-member_main-filter-option__all'>{filter === 'all' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}All</button>
                        <button onClick={() => setFilter('exp')} className='find-member_main-filter-option find-member_main-filter-option__exp'>{filter === 'exp' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Expired</button>
                        <button onClick={() => setFilter('paid')} className='find-member_main-filter-option find-member_main-filter-option__paid'>{filter === 'paid' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Active</button>
                        <button onClick={() => setFilter('new')} className='find-member_main-filter-option find-member_main-filter-option__new'>{filter === 'new' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}New</button>
                        <button onClick={() => setFilter('male')} className='find-member_main-filter-option find-member_main-filter-option__male'>{filter === 'male' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Male</button>
                        <button onClick={() => setFilter('female')} className='find-member_main-filter-option find-member_main-filter-option__female'>{filter === 'female' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Female</button>
                    </div>

                </div>
                <p className='find-member_main-total'>Total <span> {totalRenderedMembers}</span></p>
                <div className='find-member_member-list-container'>
                    <ul className='find-member_member-list'>
                        <ul className='find-member_member-list_header'>
                            <li>Member : </li>
                            <li>Email : </li>
                            <li>Phone number : </li>
                            <li>Status : </li>
                            <li>Joining date : </li>

                            {/* <li>Last attended :     </li> */}
                        </ul>
                    </ul>
                    <ul className='find-member_members-mapped'>
                        {
                            firestoreMembers?.filter((filterd) => {
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
                                        <img className='find-member_main_form_img' src={member.photoURL ?? noprofile} alt="profile-pix" />
                                        <div>
                                            <p><strong>{member.name}</strong></p>
                                            <p>#{member.mid}</p>
                                        </div>
                                    </div>
                                    <p>{member.email}</p>
                                    <p>{member.number}</p>
                                    <p style={{ marginTop: '-7px' }}> <AiFillCheckCircle className='acit-find-me' />Active</p>
                                    <p>{member.memberShipDate}</p>
                                    {
                                        moreDetails ?
                                            <>
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: moreDetails[`${index}`]
                                                            ? "bolck"
                                                            : "none"
                                                    }}

                                                    id='findMemberMoreDetails' className='find-member_members-list-more-options'>
                                                    <p className='find-member_more_details_link  find-member_more-detailes_chk-in'><AiOutlineArrowDown />check-in</p>
                                                    <Link to={`/dashboard/members/${member.email}`} className=' find-member_more_details_link find-member_more-detailes-settings'><IoSettingsSharp />settings</Link>
                                                    <p className='find-member_more_details_link find-member_more-detailes-remove'><HiUserRemove />remove member</p>
                                                </div>
                                                <button onClick={() => setMoreDetails(false)} className='find-member-ul-li_buton-option'><SlOptions /></button>
                                            </>
                                            :
                                            <button onClick={() => handleMoreOption(index)} className='find-member-ul-li_buton-option'><SlOptions /></button>
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