import React, { useEffect, useState } from 'react'

import useInput from './hooks/useInput'

import { auth } from './firebase/firebase'

import "./SignUpScreen.scss"
import { useDispatch, useSelector } from 'react-redux'
import { emailType, selectEmail } from './features/userSlice'
const SignUpScreen = (props) => {
    const { setSignIn } = props

    const [email, setEmail] = useInput("")
    const [password, setPassword] = useInput("")

    const dispatch = useDispatch()
    const emailRedux = useSelector(selectEmail)

    useEffect(() => {
        return () => {
            dispatch(emailType(""))
        }
    }, [])

    const register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(email || emailRedux, password)
            .then((authUser) => {
                console.log("authUser ", authUser)
            }).catch((error) => {
                alert(error.message)
            })
    }
    const signIn = () => {
        auth.signInWithEmailAndPassword(email || emailRedux, password)
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
                <input type="email" onChange={setEmail} value={email || emailRedux} placeholder="Email" />
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
