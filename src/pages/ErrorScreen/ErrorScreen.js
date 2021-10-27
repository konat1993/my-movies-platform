import React from 'react'

import { useDispatch } from 'react-redux'
import { setError } from '../../features/userSlice'

import "./ErrorScreen.scss"
const ErrorScreen = ({ message }) => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setError({
            status: false,
            message: ""
        }))
    }
    return (
        <div className="errorScreen">
            <div className="errorScreen__wrapper">
                <p>{message}</p>
                <button onClick={handleClick}>Back to login</button>
            </div>
        </div>
    )
}

export default ErrorScreen
