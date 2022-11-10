import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../components/nav/Nav'
import './addMember.css'
import noprofile from '../../../assets/noprofile.webp'
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/Config';
import { useNavigate } from 'react-router';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FiEdit } from 'react-icons/fi'
import { storage } from '../../../firebase/Config';

const AddMember = () => {
    const [memberID, setMemberId] = useState()
    const [fullDate, setFullDate] = useState()
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState(noprofile)
    const [isChoosing, setIsChoosing] = useState(false)
    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')


    const nameRef = useRef()
    const numberRef = useRef()
    const mailRef = useRef()
    const genderRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        setMemberId(uuidv4().slice(0, 4))
        return
    }, [])

    useEffect(() => {
        const getdate = () => {
            const currentdate = new Date();
            let date = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + '/'
                + (currentdate.getFullYear())
            setFullDate(date)
        }
        getdate()
        return
    }, [])
    console.log(fullDate)

    const handleImgChange = (e) => {
        const file = e;
        if (file) {
            setError('')
            setMsg('Uploading photo...')
            setFile(file);
            setPhotoURL(URL.createObjectURL(file));
            setIsChoosing(true)
            const storageRef = ref(storage, `members/${file.name}`);

            uploadBytes(storageRef, file).then((snapshot) => {
                setError('')
                setMsg('Photo uploaded sucsessfuly');

            }).catch((err) => {
                setMsg('')
                setError(`can't upload photo, try again`)
            })
        }
    }

    const onAddMember = async (e) => {
        e.preventDefault()
        const url = await getDownloadURL(ref(storage, `members/${file?.name ?? ""}`)).catch(() => {
            setDoc(doc(db, `members`, mailRef.current.value), {
                name: nameRef.current.value,
                number: numberRef.current.value,
                gender: genderRef.current.value,
                email: mailRef.current.value,
                mid: memberID,
                memberShipDate: fullDate
            }).then(() => {
                alert('member added successfully ')
                navigate(`/dashboard/members/${mailRef.current.value}`)
                document.getElementById('addMemberForm').reset()
            }).catch((err) => {
                setMsg('')
                setError('something went wrong, try again')
            })
        })
        setDoc(doc(db, `members`, mailRef.current.value), {
            name: nameRef.current.value,
            photoURL: url,
            number: numberRef.current.value,
            gender: genderRef.current.value,
            email: mailRef.current.value,
            mid: memberID,
            memberShipDate: fullDate
        }).then(() => {
            alert('member added successfully ')
            navigate(`/dashboard/members/${mailRef.current.value}`)
            document.getElementById('addMemberForm').reset()
        }).catch((err) => {
            setMsg('')
            setError('something went wrong, try again')
        })
    }

    return (
        <div className='add-member'>
            <Nav page="addMember" />
            <header>
                <h1 className='add-member_header'>Add Members</h1>
            </header>
            <main className='add-member_main'>
                <form id='addMemberForm' onSubmit={onAddMember} autoComplete='off' className='add-member_main_form'>

                    <div className='add-member_photo-sectoin'>
                        <img className='add-member_main_form_img' src={photoURL} alt="profile-pix" />
                        <input onChange={(e) => handleImgChange(e.target.files[0])} className='add-member_change-photo-input' type='file' />
                        <FiEdit className='add-member_change-photo_ico' />
                        <p className='add-member_main_form-error'>{error && error}</p>
                        <p className='add-member_main_form-msg'>{msg && msg}</p>

                    </div>
                    <div className='add-member_main_form_inputs'>
                        <label>Member Id,  <span className='add-member_main_form_mid'>#{memberID}</span></label>
                        <br />
                        <label>Name: </label>
                        <input ref={nameRef} required type='text' placeholder='Member Name' />

                        <label>Phone number: </label>
                        <input ref={numberRef} required type='number' placeholder='phone number' />

                        <label>Google mail: </label>
                        <input ref={mailRef} required type='email' placeholder='email' />

                        <label>Gender: </label>
                        <input ref={genderRef} required type='text' placeholder='gender' />

                        <button className='add-member_main_form_btn'>FINISH</button>

                    </div>

                    {/* <label>Name: </label>
                    <input  type='text' placeholder='Member Name' /> */}
                </form>
            </main>
        </div>
    )
}

export default AddMember