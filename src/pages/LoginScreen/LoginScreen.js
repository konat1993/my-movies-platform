import React, { useState } from 'react'

import pureFlixLogo from "../../assets/newPureFlix.png"

import SignUpScreen from '../../SignUpScreen'
import RegisterScreen from '../../RegisterScreen'

import { selectUser } from '../../features/userSlice'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import "./LoginScreen.scss"
export const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false)

    const user = useSelector(selectUser)


    return (
        <div className="loginScreen" >
            {user ? <Redirect to="/" /> : (
                <>
                    <div className="loginScreen__background">
                        <img className="loginScreen__logo" src={pureFlixLogo} alt="pureFlixLogin" />
                        <button className="loginScreen__button" onClick={() => setSignIn(true)}>Sign In</button>
                        <div className="loginScreen__gradient"></div>
                    </div>
                    <div className="loginScreen__body">
                        {
                            signIn ? (
                                <SignUpScreen setSignIn={setSignIn} />
                            ) : (
                                <RegisterScreen setSignIn={setSignIn} />
                            )
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default LoginScreen
