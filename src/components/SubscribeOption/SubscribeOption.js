import React from 'react'

import "./SubscribeOption.scss"

const styles = (isCurrentPackage) => {
    return {
        backgroundColor: isCurrentPackage ? "gray" : "#ff3838",
        cursor: isCurrentPackage ? "initial" : "pointer",
    }
}
const SubscribeOption = (props) => {
    const { name, description, isCurrentPackage, loadCheckout } = props
    return (
        <div className="SubscribeOption">
            <p>
                <span>{name}</span><span>{description}</span>
            </p>
            <button
                name={isCurrentPackage ? "current" : ""}
                onClick={loadCheckout}
                style={styles(isCurrentPackage)}
            >
                {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
        </div>
    )
}

export default SubscribeOption
