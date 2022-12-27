import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useAuth } from '../../../contexts/AuthContext'
import noPhoto from '../../../assets/noprofile.webp'
import './userChangeProfile.css'
import { IoCheckmarkDoneCircle, IoClose } from 'react-icons/io5'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, storage } from '../../../firebase/Config'
import { IoIosCamera } from 'react-icons/io'
import { useNavigate } from 'react-router'
import PhotoCropper from '../../components/photoCropper/PhotoCropper'
import { updateProfile } from 'firebase/auth'

const UserChangeProfile = () => {
    const { currentUser } = useAuth()

    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL ?? null);
    const [isChoosing, setIsChoosing] = useState(false)

    const [croppedImage, setCroppedImage] = useState(null)
    const [imageSrc, setImageSrc] = React.useState(null)

    const [isCropping, setIsCropping] = useState(false)

    const navigate = useNavigate()

    // console.log({file: file})

    // const handleImgChange = (e) => {
    //     const file = e;
    //     if (file) {
    //         setFile(file);
    //         setPhotoURL(URL.createObjectURL(file));
    //         setIsChoosing(true)
    //     }
    // }

    const onFileChange = async (e) => {
        setCroppedImage(null)
        if (e.target.files && e.target.files.length > 0) {
            setIsCropping(true)
            const file = e.target.files[0]
            setFile(file)
            let imageDataUrl = await readFile(file)
            setImageSrc(imageDataUrl)
        }
    }

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    const croppedImageSetter = (img) => {
        setCroppedImage(img)
    }
    const croppingStatusSetter = () => {
        setIsCropping(false)
    }
    const handleUpload = () => {
        alert('hi')
        // const stoFile = new window.File([croppedImage], file.name, { type: file.type });
        if (file === null) {
            return;
        }
        setIsChoosing(false);
        const storageRef = ref(storage, `members/${file.name}`);
        uploadBytes(storageRef, file).then(async (snapshot) => {
            const url = await getDownloadURL(ref(storage, `members/${file.name ?? ""}`))
            updateProfile(auth.currentUser, {
                displayName:"ahmed",
                photoURL: url ?? ''
            })
        }).catch((err) => {
            console.log('no')
        })

    };
    return (
        <div className='edit_profile'>
            {
                isCropping ?
                    <PhotoCropper
                        imageSrc={imageSrc}
                        croppedImage={croppedImage}
                        croppedImageSetter={croppedImageSetter}
                        croppingStatusSetter={croppingStatusSetter} /> :
                    <>
                        <header className='edit-profile_header'>
                            <button onClick={() => navigate('/')} className='edit-profile_close-ico edit-profile_btn'><IoClose /></button>
                            <p className='edit-profile_head'>Edit profile</p>
                            <button onClick={handleUpload} className='edit-profile_save-btn edit-profile_btn'>Save</button>
                        </header>
                        <div className='edit-profile_info'>
                            <div className='edit-profile_info_img-div'>
                                <img src={croppedImage ? croppedImage : currentUser?.photoURL ?? noPhoto} alt="your_photo" className='edit-profile_user-photo' />
                                <button className='edit-profile_info-btn'>Change photo</button>

                                <input className='edit-image-input' onChange={(e) => onFileChange(e)} type="file" accept='image/*' id='profilePhoto' />

                            </div>
                            <input type='text' value={currentUser?.displayName ?? 'Name'} className='edit-profile_username' />
                        </div>

                        <p className='edit-profile_footer'> Note that changing it doesn't reflect on your gym profile only the account. </p>
                    </>
            }

        </div>
    )
}

export default UserChangeProfile
