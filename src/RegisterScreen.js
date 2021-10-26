import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { emailType } from './features/userSlice'

import "./RegisterScreen.scss"
export const RegisterScreen = (props) => {
    const { setSignIn } = props

    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleButton = () => {
        dispatch(emailType(email))
        setSignIn(true)
    }

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
                <form>
                    <input type="email" placeholder="Email Adress" onChange={handleEmail} value={email} />
                    <button type="button" onClick={() => handleButton()}>
                        GET STARTED
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
