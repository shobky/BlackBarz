import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import './member.css'
import noPhoto from '../../../assets/noprofile.webp'
import { IoClose } from 'react-icons/io5'
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import './member.css';
import CheckinBtn from '../findMember/CheckinBtn'
import { GiTwoCoins } from 'react-icons/gi'

const Member = ({ member }) => {
    const { name, email, number, plan, trainer, session, memberShipDate, type } = member;

    const [date, setDate] = useState()

    useEffect(() => {
        const getdate = () => {
            const currentdate = new Date();
            setDate({
                month: currentdate.getMonth() + 1,
                day: currentdate.getDate(),
                year: currentdate.getFullYear()
            })
        }
        getdate()
        return
    }, [])

    const hadlesessionRenwal = async () => {
        if (member.lastPaid === null) {
            updateDoc(doc(db, `members/${member.email}`), {
                lastPaid: {
                    day: date.day,
                    month: date.month,
                    year: date.year
                }
            })
        } else {
            updateDoc(doc(db, `members/${member.email}`), {
                session: 0,
                lastPaid: {
                    day: date.day,
                    month: date.month,
                    year: date.year
                }
            })
        }
        const docRef = doc(db, `payments/months/${date.month}`, member.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            alert(member.email)
            updateDoc(doc(db, `payments/months/${date.month}`, member.email), {
                lastPaid: {
                    day: date.day,
                    month: date.month,
                    year: date.year
                },
                plan: member.plan,
                fees: increment(Number(member.plan.price))
            }).then(() => {
                console.log('yas')
            }).catch((err) => {
                alert(err.message)
            })
        } else {
            setDoc(doc(db, `payments/months/${date.month}`, member.email), {
                name: member.name,
                number: member.number,
                email: member.email,
                mid: member.mid,
                plan: member.plan,
                fees: member.plan.price,
                trainer: member.trainer,
                lastPaid: {
                    day: date.day,
                    month: date.month,
                    year: date.year
                }
            }).then(() => {
                console.log('yas')
            }).catch((err) => {
                alert(err.message)
            })
        }

    }

    return (
        <div className={`member-container`}>
            <Nav />
            <div className='member-content'>
                <h1 className='meber_header_name'>{name}</h1>
                <p> <span className='member_header-info'>MemberShip:</span> {memberShipDate.day}-{memberShipDate.month}-{memberShipDate.msYear}</p>
                <p> <span className='member_header-info'>Email:</span> {email}</p>
                <p> <span className='member_header-info'>Number:</span> {number}</p>
                <p> <span className='member_header-info'>Workout:</span> {type}</p>
                <p> <span className='member_header-info'>Trainer:</span> {trainer}</p>

                <h2 className='member_plan-header'>Plan</h2>
                <div className='member_plan-info'>
                    <p className='member_plan'>{plan.name}</p>
                    <p className='member_plan'>{plan.sessions} x Sessions</p>
                    <p className='member_plan'>{plan.price} L.e</p>
                    <br />

                </div>
                <h2 className='member_abbs_header'>Absence</h2>
                <div className='member_abbse-info'>
                    <p style={{ fontSize: '21px' }}>{session}/{plan.sessions}</p>
                    <CheckinBtn member={member} />
                </div>
                {
                    member.session >= member.plan.sessions || member.lastPaid == null || member.lastPaid?.month < date?.month ?
                        <button className="member_pay-btn" onClick={() => hadlesessionRenwal()} style={{ cursor: "pointer" }} >Renew</button>
                        : ""
                }

            </div>
        </div >
    );
};

export default Member;
