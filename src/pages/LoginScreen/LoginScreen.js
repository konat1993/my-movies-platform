import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

import SignUpScreen from '../SignUpScreen/SignUpScreen'
import RegisterScreen from '../RegisterScreen/RegisterScreen'
import pureFlixLogo from "../../assets/newPureFlix.png"

import "./LoginScreen.scss"
export const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false)
    // const history = useHistory()
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

    return (
        <div className="loginScreen" >
            <div className="loginScreen__background">
                <img className="loginScreen__logo" src={pureFlixLogo} alt="pureFlixLogin" />
                <button className="loginScreen__button" onClick={() => setSignIn(true)}>Sign In</button>
                <div className="loginScreen__gradient"></div>
            </div>
            <div className="loginScreen__body">
                {
                    signIn ? (
                        <SignUpScreen />
                    ) : (
                        <RegisterScreen setSignIn={setSignIn} />
                    )
                }
            </div>
        </div>
    )
}

export default LoginScreen
