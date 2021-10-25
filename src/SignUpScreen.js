import React, { useState } from 'react'

import useInput from './hooks/useInput'

import { auth } from './firebase/firebase'

import "./SignUpScreen.scss"
const SignUpScreen = (props) => {
    const { setSignIn } = props

    const [email, setEmail] = useInput("")
    const [password, setPassword] = useInput("")

    const register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log("authUser ", authUser)
            }).catch((error) => {
                alert(error.message)
            })
    }
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log(authUser)
            }).catch((error) => {
                alert(error.message)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn()
    }
    return (
        <div className="signUpScreen">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <input type="email" onChange={setEmail} value={email} placeholder="Email" />
                <input type="password" onChange={setPassword} value={password} placeholder="Password" />
                <button type="submit">Sign In</button>
                <h4>
                    <span className="signUpScreen__gray">New to Pureflix? </span>
                    <span className="signUpScreen__link" onClick={register}>Sign up now.</span>
                </h4>
            </form>
        </div >
    )
}

export default SignUpScreen
