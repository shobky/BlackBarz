import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import './findMember.css'
import { GoSearch } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import Member from './Member'
import FilteringBtns from './FilteringBtns'


const FindMember = ({ firestoreMembers, isClub }) => {
    const [searchQ, setSearchQ] = useState('')
    const [filterq, setFilter] = useState('all')
    const [totalRenderedMembers, setTRM] = useState(firestoreMembers?.length)
    const [msDay, setMsDay] = useState()
    const [msMonth, setMsMonth] = useState()
    const [msYear, setMsYear] = useState()


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


    const filterSetter = (fil) => {
        setFilter(fil)
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
                <FilteringBtns filterq={filterq} filterSetter={filterSetter} />
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
                                <Member
                                    member={member}
                                    key={index}
                                    date={{
                                        day: msDay,
                                        month: msMonth,
                                        year: msYear
                                    }}
                                />
                            ))
                        }
                    </ul>
                </div>
            </main>



        </div>
    )
}

export default FindMember

