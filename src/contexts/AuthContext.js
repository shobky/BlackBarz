import React, { useContext, useEffect, useState } from "react"
import { auth, signInWithGoogle } from '../firebase/Config'
import { createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { collection, doc, getDoc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../firebase/Config'
import { Navigate, useNavigate } from "react-router"

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState()
    const [member, setMember] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fireStoreMemberQuery = collection(db, `members`)
    const [firestoreMembers] = useCollectionData(fireStoreMemberQuery)

    const [varient, setVarient] = useState('')

    const [city, setCity] = useState('PS')
    const [authError, setAuthError] = useState('')
    const [buffer, setBuffer] = useState(false)

    useEffect(() => {
        const getMember = async () => {
            const docRef = doc(db, "members", currentUser?.email);
            const docSnap = await getDoc(docRef);
            setMember(docSnap.data());

        }
        getMember()
    }, [currentUser])

    const handleCity = () => {
        if (city === 'PS') {
            setCity('PF')
        } else {
            setCity('PS')
        }
    }

    const onSetVarient = (vrt) => {
        setVarient(vrt)
    }

    const EmailAndPasswordSignup = (email, password) => {
        setBuffer(true)
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/')
            setBuffer(false)
        }).catch((err) => {
            setAuthError(err.message)
            setBuffer(false)
        })
    }

    const EmailAndPasswordLogin = (email, password) => {
        setBuffer(true)
        signInWithEmailAndPassword(auth, email, password).then(() => {
            setBuffer(false)
            navigate('/')
        }).catch((error) => {
            setBuffer(false)
            setAuthError(error.message)
        })
    }

    const login = async () => {
        setBuffer(true)
        navigate('/')
        signInWithGoogle().then(() => {
            getRedirectResult(auth)
                .then(() => {
                    setLoading(true)
                    setBuffer(false)
                })
                .catch((err) => {
                    setError(err.message)
                    // const credential = GoogleAuthProvider.credentialFromError(err)
                    setLoading(true)
                    setBuffer(false)

                    //
                    console.log(error, 'er')

                })

        })


    }

    const logout = () => {
        signOut(auth).then(() => {
            navigate('/login')
        })
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
    }, [currentUser])

    const values = {
        login,
        EmailAndPasswordSignup,
        EmailAndPasswordLogin,
        currentUser,
        member,
        authError,
        firestoreMembers,
        logout,
        onSetVarient,
        varient,
        handleCity,
        city,
        buffer
    }

    return (
        <AuthContext.Provider value={values}>
            {loading && children}
        </AuthContext.Provider>
    )
}
