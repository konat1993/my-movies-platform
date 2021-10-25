import React from 'react'

import "./SubscribeOption.scss"

const styles = (current) => {
    return {
        backgroundColor: current ? "gray" : "#ff3838",
        cursor: current ? "initial" : "pointer"
    }
}
const SubscribeOption = (props) => {
    const { title, type, current, children } = props
    return (
        <div className="profileScreen__option">
            <p>
                <span>{title}</span><span>{type}</span>
            </p>
            <button name={current ? "current" : ""} style={styles(current)}>
                {children}
            </button>
        </div>
    )
}

export default SubscribeOption
