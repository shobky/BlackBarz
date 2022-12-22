import React, { useContext, useEffect, useState } from "react"
import { auth, signInWithGoogle } from '../firebase/Config'
import { getRedirectResult, GoogleAuthProvider, signOut } from 'firebase/auth'

import { collection } from 'firebase/firestore'
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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fireStoreMemberQuery = collection(db, `members`)
    const [firestoreMembers] = useCollectionData(fireStoreMemberQuery)

    const [varient, setVarient] = useState('')

    const [city, setCity] = useState('PS')

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


    const login = () => {
        signInWithGoogle()
        getRedirectResult(auth)
            .then((res) => {
                navigate('/')
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                setCurrentUser(res.user);
                setLoading(true)


                //
                console.log({ currentUser, token, credential })
            })
            .catch((err) => {
                setError(err.message)
                // const credential = GoogleAuthProvider.credentialFromError(err)
                setLoading(true)

                //
                console.log(error, 'er')

            })

    }

    const logout = () => {
        signOut(auth).then(() => {
            navigate('/')
        })
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
    }, [currentUser])

    const values = {
        login,
        currentUser,
        firestoreMembers,
        logout,
        onSetVarient,
        varient,
        handleCity,
        city
    }

    return (
        <AuthContext.Provider value={values}>
            {loading && children}
        </AuthContext.Provider>
    )
}
