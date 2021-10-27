import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoading, selectUser, setLoading } from '../../features/userSlice'
import { auth } from '../../firebase/firebase'
import Nav from '../../Nav'
import SubscribePlans from '../../components/SubscribePlans/SubscribePlans'
import { Redirect } from 'react-router'
import { useDispatch } from 'react-redux'

import "./ProfileScreen.scss"
export const ProfileScreen = () => {
    const [redirect, setRedirect] = useState(false)

    const user = useSelector(selectUser)
    const isLoading = useSelector(selectIsLoading)
    const dispatch = useDispatch()

    const signOutHandler = () => {
        auth.signOut()
    }

    useEffect(() => {
        if (!user) {
            // dispatch(setLoading(false))
            setRedirect(true)
        }
    }, [])
    console.log("USER ", user)
    console.log("redirect ", redirect)
    return (
        <div className="profileScreen">
            {user && redirect ? <Redirect to="/" /> : !user ? (
                <Redirect to="/login" />
            ) : (
                <>
                    <Nav />
                    <div className="profileScreen__body">
                        <h1>Edit Profile</h1>
                        <div className="profileScreen__info">
                            <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="avatarLarge" />
                            <div className="profileScreen__details">
                                <h2>{user.email}</h2>
                                <SubscribePlans signOut={signOutHandler} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProfileScreen
