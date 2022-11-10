import React, { useContext, useEffect, useState } from "react"
import { auth, signInWithGoogle } from '../firebase/Config'
import { getRedirectResult, GoogleAuthProvider } from 'firebase/auth'

import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../firebase/Config'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fireStoreMemberQuery = collection(db, `members`)
    const [firestoreMembers] = useCollectionData(fireStoreMemberQuery)

    


    const login = () => {
        signInWithGoogle()
        getRedirectResult(auth)
            .then((res) => {
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

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
    }, [currentUser])

    const values = {
        login,
        currentUser,
        firestoreMembers
    }

    return (
        <AuthContext.Provider value={values}>
            {loading && children}
        </AuthContext.Provider>
    )
}
