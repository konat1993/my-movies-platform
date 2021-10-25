import React from 'react'

import "./RegisterScreen.scss"
export const RegisterScreen = (props) => {
    const { setSignIn } = props
    return (
        <div className="registerScreen">
            <h1>Have faith
                in your entertainment.

            </h1>
            <h2>
                Watch anywhere. Cancel at any time.
            </h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <div className="registerScreen__input">
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

export default RegisterScreen
