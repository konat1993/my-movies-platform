import React from 'react'

import { auth } from '../../services/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

import Nav from '../../components/Nav/Nav'
import SubscribePlans from '../../components/SubscribePlans/SubscribePlans'
import netflixAvatar from '../../assets/netflixAvatar.png'
import "./ProfileScreen.scss"
export const ProfileScreen = () => {
    const user = useSelector(selectUser)
    const signOutHandler = () => {
        auth.signOut()
    }

    return (
        <div className="profileScreen">
            <>
                <Nav />
                <div className="profileScreen__body">
                    <h1>Edit Profile</h1>
                    <div className="profileScreen__info">
                        <img src={netflixAvatar} alt="avatarLarge" />
                        <div className="profileScreen__details">
                            <h2>{user?.email}</h2>
                            {user && < SubscribePlans signOut={signOutHandler} />}
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default ProfileScreen
