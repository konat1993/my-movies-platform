import React, { useState } from 'react'

import pureFlixLogo from "../../assets/newPureFlix.png"

import "./LoginScreen.scss"
export const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false)
    return (
        <div className="loginScreen" onClick={() => setSignIn(true)}>
            <div className="loginScreen__background">
                <img className="loginScreen__logo" src={pureFlixLogo} alt="pureFlixLogin" />
                <button className="loginScreen__button">Sign In</button>
                <div className="loginScreen__gradient"></div>
            </div>
            <div className="loginScreen__body">
                {
                    signIn ? (
                        // <SignInScreen />
                        <h1>SignInScreen</h1>
                    ) : (

                        <div>
                            <h1>Have faith
                                in your entertainment.

                            </h1>
                            <h2>
                                Watch anywhere. Cancel at any time.
                            </h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                            <div className="loginScreen__input">
                                <form action="">
                                    <input type="email" placeholder="Email Adress" />
                                    <button onClick={() => setSignIn(true)}>
                                        GET STARTED
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LoginScreen
