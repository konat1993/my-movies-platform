import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { auth } from '../../firebase/firebase'
import Nav from '../../Nav'
import SubscribePlans from '../../components/SubscribePlans/SubscribePlans'

import "./ProfileScreen.scss"
export const ProfileScreen = () => {

    const user = useSelector(selectUser)

    const signOutHandler = () => {
        auth.signOut()
    }
    return (
        <div className="profileScreen">
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
        </div>
    )
}

export default ProfileScreen
