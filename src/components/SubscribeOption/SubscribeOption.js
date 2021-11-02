import React from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../features/userSlice'

import "./SubscribeOption.scss"

const styles = (isCurrentPackage) => {
    return {
        backgroundColor: isCurrentPackage ? "gray" : "#ff3838",
        cursor: isCurrentPackage ? "initial" : "pointer",
    }
}
const SubscribeOption = (props) => {
    const { name, description, isCurrentPackage, loadCheckout } = props
    const dispatch = useDispatch()

    const clickHandler = () => {
        !isCurrentPackage && dispatch(setLoading(true))
        loadCheckout()
    }
    return (
        <div className="SubscribeOption">
            <p>
                <span>{name}</span><span>{description}</span>
            </p>
            <button
                name={isCurrentPackage ? "current" : ""}
                onClick={clickHandler}
                style={styles(isCurrentPackage)}
            >
                {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
        </div>
    )
}

export default SubscribeOption
