import React from 'react'
import { useSelector } from 'react-redux'
import SubscribeOption from '../../components/SubscribeOption/SubscribeOption'
import { selectUser } from '../../features/userSlice'
import { auth } from '../../firebase/firebase'
import Nav from '../../Nav'

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
                        <div className="profileScreen__plans">
                            <h3>Plans (Current plan: Premium)</h3>
                            <p>Renewal date: 04/03/2021</p>
                            <SubscribeOption title="Pureflix Standard" type="1080p" current={false}>Subscribe</SubscribeOption>
                            <SubscribeOption title="Pureflix Basic" type="480p" current={false}>Subscribe</SubscribeOption>
                            <SubscribeOption title="Pureflix Premium" type="4k+HDR" current={true}>Current Package</SubscribeOption>

                            <button onClick={signOutHandler} className="profileScreen__signOut">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
